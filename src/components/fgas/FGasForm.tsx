import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';
import { useAuth } from '../auth/AuthContext';
import { supabase } from '../../lib/supabase';
import { FGasFormData } from '../../types/fgas';
import { generatePDF } from '../../utils/pdfGenerator';
import Header from '../layout/Header';
import TechnicianSection from './sections/TechnicianSection';
import SiteSection from './sections/SiteSection';
import SystemSection from './sections/SystemSection';
import BottleSection from './sections/BottleSection';
import RecoverySection from './sections/RecoverySection';
import PressureTestSection from './sections/PressureTestSection';
import EvacuationSection from './sections/EvacuationSection';
import RechargeSection from './sections/RechargeSection';

const backgroundImages = [
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=80'
];

const initialFormData: FGasFormData = {
  status: 'draft',
  technician: {
    name: '',
    certificationNumber: '',
  },
  site: {
    clientName: '',
    siteAddress: '',
    contactPerson: '',
    contactNumber: '',
    jobReference: '',
  },
  system: {
    manufacturer: '',
    model: '',
    serialNumber: '',
    systemType: '',
    capacity: 0,
    initialCharge: 0,
    refrigerantType: '',
  },
  bottles: [{
    bottleNumber: '',
    refrigerantType: '',
    weightBefore: 0,
    weightAfter: 0,
  }],
  recovery: {
    startTime: '',
    endTime: '',
    amountRecovered: 0,
    equipment: '',
  },
  pressureTest: {
    pressure: 0,
    duration: 0,
    passed: false,
    comments: '',
  },
  evacuation: {
    startTime: '',
    endTime: '',
    targetVacuum: 0,
    achievedVacuum: 0,
    comments: '',
  },
  recharge: {
    startTime: '',
    endTime: '',
    amountRecharged: 0,
    finalCharge: 0,
  },
  signature: '',
};

export default function FGasForm() {
  const [formData, setFormData] = useState<FGasFormData>(initialFormData);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const signaturePadRef = React.useRef<SignaturePad>(null);
  
  const backgroundImage = React.useMemo(() => 
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)],
    []
  );

  const updateFormData = (section: keyof FGasFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const handleSave = async (asDraft: boolean = true) => {
    try {
      setIsSaving(true);
      setError('');

      const signatureData = signaturePadRef.current?.toDataURL();
      
      if (!asDraft && !signatureData) {
        setError('Signature is required to complete the form');
        setIsSaving(false);
        return;
      }

      const status = asDraft ? 'draft' : 'completed';
      const completedAt = asDraft ? null : new Date().toISOString();

      const formDataToSave = {
        ...formData,
        signature: signatureData || '',
        status,
        completed_at: completedAt,
        updated_at: new Date().toISOString(),
      };

      const { error: dbError } = await supabase
        .from('fgas_logs')
        .upsert(formDataToSave);

      if (dbError) throw dbError;

      if (!asDraft && signatureData) {
        const pdfBlob = await generatePDF({
          ...formData,
          signature: signatureData,
          completedAt
        });
        
        const { error: storageError } = await supabase.storage
          .from('fgas-pdfs')
          .upload(`${formData.id || 'new'}/report.pdf`, pdfBlob);

        if (storageError) throw storageError;
      }

      navigate('/');
    } catch (err) {
      setError('Failed to save form. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">F-Gas Compliance Form</h2>

          {error && (
            <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <div className="space-y-12">
            <section className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Technician & Site Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TechnicianSection
                  data={formData.technician}
                  onChange={(data) => updateFormData('technician', data)}
                />
                <SiteSection
                  data={formData.site}
                  onChange={(data) => updateFormData('site', data)}
                />
              </div>
            </section>

            <section className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">System Details</h3>
              <SystemSection
                data={formData.system}
                onChange={(data) => updateFormData('system', data)}
              />
            </section>

            <section className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Refrigerant Management</h3>
              <div className="space-y-8">
                <BottleSection
                  bottles={formData.bottles}
                  onChange={(bottles) => updateFormData('bottles', bottles)}
                />
                <RecoverySection
                  data={formData.recovery}
                  onChange={(data) => updateFormData('recovery', data)}
                />
              </div>
            </section>

            <section className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Testing & Evacuation</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PressureTestSection
                  data={formData.pressureTest}
                  onChange={(data) => updateFormData('pressureTest', data)}
                />
                <EvacuationSection
                  data={formData.evacuation}
                  onChange={(data) => updateFormData('evacuation', data)}
                />
              </div>
            </section>

            <section className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">System Recharge</h3>
              <RechargeSection
                data={formData.recharge}
                onChange={(data) => updateFormData('recharge', data)}
              />
            </section>

            <section className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Completion</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technician Signature
                </label>
                <div className="border border-gray-300 rounded-md bg-white">
                  <SignaturePad
                    ref={signaturePadRef}
                    canvasProps={{
                      className: 'w-full h-40',
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => signaturePadRef.current?.clear()}
                  className="mt-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear Signature
                </button>
              </div>
            </section>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              Complete & Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}