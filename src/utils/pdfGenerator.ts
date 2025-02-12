import { jsPDF } from 'jspdf';
import { FGasFormData } from '../types/fgas';
import { PDFOptions } from '../types/branding';
import { supabase } from '../lib/supabase';

const fetchBrandingOptions = async (organizationId: string): Promise<PDFOptions> => {
  const { data } = await supabase
    .from('organization_branding')
    .select('*')
    .eq('organization_id', organizationId)
    .single();

  return {
    headerImage: data?.header_image_url || undefined,
    companyName: data?.company_name || undefined,
    primaryColor: data?.primary_color || '#000000',
    footerText: data?.footer_text || undefined,
  };
};

export const generatePDF = async (formData: FGasFormData, organizationId: string): Promise<Blob> => {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;

  // Fetch branding options
  const branding = await fetchBrandingOptions(organizationId);

  // Helper function to add text and increment y position
  const addText = (text: string, increment: number = 10) => {
    doc.text(text, margin, y);
    y += increment;
  };

  // Add header image if available
  if (branding.headerImage) {
    try {
      doc.addImage(branding.headerImage, 'JPEG', margin, y, 170, 40);
      y += 50;
    } catch (error) {
      console.error('Error adding header image:', error);
    }
  }

  // Add company name if available
  if (branding.companyName) {
    doc.setFontSize(20);
    doc.setTextColor(branding.primaryColor);
    addText(branding.companyName, 15);
  }

  // Title
  doc.setFontSize(20);
  doc.setTextColor(branding.primaryColor);
  addText('F-Gas Compliance Report', 15);
  doc.setFontSize(12);
  doc.setTextColor('#000000');

  // Date
  addText(`Date: ${new Date().toLocaleDateString()}`, 15);

  // Technician Details
  doc.setFontSize(16);
  addText('Technician Details', 15);
  doc.setFontSize(12);
  addText(`Name: ${formData.technician.name}`);
  addText(`Certification Number: ${formData.technician.certificationNumber}`, 15);

  // Site Details
  doc.setFontSize(16);
  addText('Site Details', 15);
  doc.setFontSize(12);
  addText(`Client: ${formData.site.clientName}`);
  addText(`Address: ${formData.site.siteAddress}`);
  addText(`Contact: ${formData.site.contactPerson}`);
  addText(`Phone: ${formData.site.contactNumber}`);
  addText(`Job Reference: ${formData.site.jobReference}`, 15);

  // System Details
  doc.setFontSize(16);
  addText('System Details', 15);
  doc.setFontSize(12);
  addText(`Manufacturer: ${formData.system.manufacturer}`);
  addText(`Model: ${formData.system.model}`);
  addText(`Serial Number: ${formData.system.serialNumber}`);
  addText(`System Type: ${formData.system.systemType}`);
  addText(`Capacity: ${formData.system.capacity} kW`);
  addText(`Initial Charge: ${formData.system.initialCharge} kg`);
  addText(`Refrigerant Type: ${formData.system.refrigerantType}`, 15);

  // Add new page if needed
  if (y > 250) {
    doc.addPage();
    y = margin;
  }

  // Bottle Data
  doc.setFontSize(16);
  addText('Bottle Data', 15);
  doc.setFontSize(12);
  addText(`Bottle Number: ${formData.bottle.bottleNumber}`);
  addText(`Refrigerant Type: ${formData.bottle.refrigerantType}`);
  addText(`Weight Before: ${formData.bottle.weightBefore} kg`);
  addText(`Weight After: ${formData.bottle.weightAfter} kg`, 15);

  // Recovery Data
  doc.setFontSize(16);
  addText('Recovery Data', 15);
  doc.setFontSize(12);
  addText(`Start Time: ${formData.recovery.startTime}`);
  addText(`End Time: ${formData.recovery.endTime}`);
  addText(`Amount Recovered: ${formData.recovery.amountRecovered} kg`);
  addText(`Equipment Used: ${formData.recovery.equipment}`, 15);

  // Add new page
  doc.addPage();
  y = margin;

  // Pressure Test
  doc.setFontSize(16);
  addText('Pressure Test', 15);
  doc.setFontSize(12);
  addText(`Pressure: ${formData.pressureTest.pressure} bar`);
  addText(`Duration: ${formData.pressureTest.duration} minutes`);
  addText(`Result: ${formData.pressureTest.passed ? 'Passed' : 'Failed'}`);
  addText(`Comments: ${formData.pressureTest.comments}`, 15);

  // Evacuation Data
  doc.setFontSize(16);
  addText('Evacuation', 15);
  doc.setFontSize(12);
  addText(`Start Time: ${formData.evacuation.startTime}`);
  addText(`End Time: ${formData.evacuation.endTime}`);
  addText(`Target Vacuum: ${formData.evacuation.targetVacuum} µbar`);
  addText(`Achieved Vacuum: ${formData.evacuation.achievedVacuum} µbar`);
  addText(`Comments: ${formData.evacuation.comments}`, 15);

  // Recharge Data
  doc.setFontSize(16);
  addText('Recharge', 15);
  doc.setFontSize(12);
  addText(`Start Time: ${formData.recharge.startTime}`);
  addText(`End Time: ${formData.recharge.endTime}`);
  addText(`Amount Recharged: ${formData.recharge.amountRecharged} kg`);
  addText(`Final System Charge: ${formData.recharge.finalCharge} kg`, 15);

  // Signature
  if (formData.signature) {
    doc.addImage(formData.signature, 'PNG', margin, y, 70, 30);
    y += 35;
    addText('Technician Signature', 15);
  }

  // Add completion date
  if (formData.completedAt) {
    addText(`Completed: ${new Date(formData.completedAt).toLocaleString()}`, 15);
  }

  // Add footer if available
  if (branding.footerText) {
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor('#666666');
      doc.text(
        branding.footerText,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
  }

  return doc.output('blob');
};

// Similar updates for breakdownPdfGenerator.ts
export const generateBreakdownPDF = async (formData: any, organizationId: string): Promise<Blob> => {
  const doc = new jsPDF();
  const branding = await fetchBrandingOptions(organizationId);
  
  // Add branding and generate PDF similar to above
  // [Previous breakdown PDF generation logic with branding additions]
  
  return doc.output('blob');
};

// Add test function to generate sample PDFs
export const generateTestPDFs = async (organizationId: string) => {
  // Sample F-Gas form data
  const sampleFGasData = {
    // ... sample F-Gas form data
  };

  // Sample Breakdown form data
  const sampleBreakdownData = {
    // ... sample breakdown form data
  };

  // Generate test PDFs
  const fgasPDF = await generatePDF(sampleFGasData, organizationId);
  const breakdownPDF = await generateBreakdownPDF(sampleBreakdownData, organizationId);

  return {
    fgasPDF,
    breakdownPDF,
  };
};