import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

// Interfaces for system-specific details

interface RefrigerationDetails {
  amount: number;
  bottleNumber: string;
  reclaimed: number;
  rechargeReason: string;
  indoorUnitModel: string;
  indoorUnitSerial: string;
  outdoorUnitModel: string;
  outdoorUnitSerial: string;
  filterDetails: string;
  errorCodes: string;
  fgasChecklist: string;
  siteSafetyNotes: string;
  specialistRequirements: string;
}

interface VRFDetails {
  indoorUnitCount: number;
  outdoorUnitModel: string;
  zoningDetails: string;
  refrigerantType: string;
  indoorUnitModel: string;
  indoorUnitSerial: string;
  outdoorUnitSerial: string;
  filterDetails: string;
  errorCodes: string;
  fgasChecklist: string;
  siteSafetyNotes: string;
  specialistRequirements: string;
}

interface SplitDetails {
  indoorUnitModel: string;
  outdoorUnitModel: string;
  coolingCapacity: string;
  installationNotes: string;
  indoorUnitSerial: string;
  outdoorUnitSerial: string;
  filterDetails: string;
  errorCodes: string;
  fgasChecklist: string;
  siteSafetyNotes: string;
  specialistRequirements: string;
}

interface AHUDetails {
  airflowRate: string;
  noiseLevel: string;
  filterStatus: string;
  temperatureDifferential: string;  // e.g., supply/return delta in °F
  humidityLevel: string;           // as a percentage
  beltCondition: string;           // e.g., Good, Worn, Needs Replacement
  coilCondition: string;           // e.g., Clean, Dirty, Damaged
  condensateDrain: string;         // e.g., Clear, Blocked
  electricalStatus: string;        // e.g., OK, Faulty
  ductInspection: string;          // notes on duct condition
  lubricationCheck: string;        // maintenance notes on lubrication
  sensorCalibration: string;       // calibration results/comments
  // Additional Unit & Safety Details
  indoorUnitModel: string;
  indoorUnitSerial: string;
  outdoorUnitModel: string;
  outdoorUnitSerial: string;
  filterDetails: string;
  errorCodes: string;
  fgasChecklist: string;
  siteSafetyNotes: string;
  specialistRequirements: string;
}

interface MVHRDetails {
  heatRecoveryEfficiency: string;  // percentage
  filterCondition: string;         // e.g., Clean, Dirty
  ductIntegrity: string;           // inspection comments
  airflowMeasurement: string;      // measured airflow (CFM)
  supplyAirTemperature: string;    // in °F
  returnAirTemperature: string;    // in °F
  fanStatus: string;               // e.g., OK, Noisy, Needs Repair
  noiseLevel: string;              // in dB
  condensateDrain: string;         // e.g., Clear, Blocked
  controlPanelStatus: string;      // e.g., Operational, Faulty
  cleaningStatus: string;          // cleaning observations
  // Additional Unit & Safety Details
  indoorUnitModel: string;
  indoorUnitSerial: string;
  outdoorUnitModel: string;
  outdoorUnitSerial: string;
  filterDetails: string;
  errorCodes: string;
  fgasChecklist: string;
  siteSafetyNotes: string;
  specialistRequirements: string;
}

interface ASHPDetails {
  coefficientOfPerformance: string;
  heatingOutput: string;
  defrostCycle: string;
  indoorUnitModel: string;
  indoorUnitSerial: string;
  outdoorUnitModel: string;
  outdoorUnitSerial: string;
  filterDetails: string;
  errorCodes: string;
  fgasChecklist: string;
  siteSafetyNotes: string;
  specialistRequirements: string;
}

// Main JobVisitLog interface including all sub-categories
interface JobVisitLog {
  date: string;
  time: string;
  technician: string;
  jobType: string; // e.g., "Service Call", "Breakdown", "Callout"
  systemType: string; // Options: "VRF", "Split", "Refrigeration", "MVHR", "AHU", "ASHP"
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  description: string;
  issuesFound: string;
  workDone: string;
  timeOnSite: number;
  partsUsed: string;
  additionalComments: string;
  refrigerationDetails?: RefrigerationDetails;
  vrfDetails?: VRFDetails;
  splitDetails?: SplitDetails;
  ahuDetails?: AHUDetails;
  mvhrDetails?: MVHRDetails;
  ashpDetails?: ASHPDetails;
  photos?: File[];
  signature?: string;
}

const JobVisitLogForm: React.FC = () => {
  const [formData, setFormData] = useState<JobVisitLog>({
    date: "",
    time: "",
    technician: "",
    jobType: "Service Call",
    systemType: "Refrigeration", // default; user may change this
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    description: "",
    issuesFound: "",
    workDone: "",
    timeOnSite: 0,
    partsUsed: "",
    additionalComments: "",
    refrigerationDetails: {
      amount: 0,
      bottleNumber: "",
      reclaimed: 0,
      rechargeReason: "",
      indoorUnitModel: "",
      indoorUnitSerial: "",
      outdoorUnitModel: "",
      outdoorUnitSerial: "",
      filterDetails: "",
      errorCodes: "",
      fgasChecklist: "",
      siteSafetyNotes: "",
      specialistRequirements: ""
    },
    vrfDetails: {
      indoorUnitCount: 0,
      outdoorUnitModel: "",
      zoningDetails: "",
      refrigerantType: "",
      indoorUnitModel: "",
      indoorUnitSerial: "",
      outdoorUnitSerial: "",
      filterDetails: "",
      errorCodes: "",
      fgasChecklist: "",
      siteSafetyNotes: "",
      specialistRequirements: ""
    },
    splitDetails: {
      indoorUnitModel: "",
      outdoorUnitModel: "",
      coolingCapacity: "",
      installationNotes: "",
      indoorUnitSerial: "",
      outdoorUnitSerial: "",
      filterDetails: "",
      errorCodes: "",
      fgasChecklist: "",
      siteSafetyNotes: "",
      specialistRequirements: ""
    },
    ahuDetails: {
      airflowRate: "",
      noiseLevel: "",
      filterStatus: "",
      temperatureDifferential: "",
      humidityLevel: "",
      beltCondition: "",
      coilCondition: "",
      condensateDrain: "",
      electricalStatus: "",
      ductInspection: "",
      lubricationCheck: "",
      sensorCalibration: "",
      indoorUnitModel: "",
      indoorUnitSerial: "",
      outdoorUnitModel: "",
      outdoorUnitSerial: "",
      filterDetails: "",
      errorCodes: "",
      fgasChecklist: "",
      siteSafetyNotes: "",
      specialistRequirements: ""
    },
    mvhrDetails: {
      heatRecoveryEfficiency: "",
      filterCondition: "",
      ductIntegrity: "",
      airflowMeasurement: "",
      supplyAirTemperature: "",
      returnAirTemperature: "",
      fanStatus: "",
      noiseLevel: "",
      condensateDrain: "",
      controlPanelStatus: "",
      cleaningStatus: "",
      indoorUnitModel: "",
      indoorUnitSerial: "",
      outdoorUnitModel: "",
      outdoorUnitSerial: "",
      filterDetails: "",
      errorCodes: "",
      fgasChecklist: "",
      siteSafetyNotes: "",
      specialistRequirements: ""
    },
    ashpDetails: {
      coefficientOfPerformance: "",
      heatingOutput: "",
      defrostCycle: "",
      indoorUnitModel: "",
      indoorUnitSerial: "",
      outdoorUnitModel: "",
      outdoorUnitSerial: "",
      filterDetails: "",
      errorCodes: "",
      fgasChecklist: "",
      siteSafetyNotes: "",
      specialistRequirements: ""
    },
    photos: [],
    signature: ""
  });

  // Ref for the signature pad
  const sigPadRef = useRef<SignatureCanvas>(null);

  // Unified input change handler supporting nested fields via dot notation
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: isNaN(parseFloat(value)) ? value : parseFloat(value)
        }
      }));
    } else {
      const currentVal = (formData as any)[name];
      setFormData((prev) => ({
        ...prev,
        [name]: typeof currentVal === "number" ? (parseFloat(value) || 0) : value
      }));
    }
  };

  // Handler for file input (photos)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        photos: Array.from(files)
      }));
    }
  };

  // Signature pad functions
  const clearSignature = () => {
    sigPadRef.current?.clear();
  };

  const saveSignature = () => {
    if (sigPadRef.current) {
      const dataUrl = sigPadRef.current.getTrimmedCanvas().toDataURL("image/png");
      setFormData((prev) => ({
        ...prev,
        signature: dataUrl
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job Visit Log submitted:", formData);
    alert("Job visit log submitted!");
    // Further processing can be added here.
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-3xl font-bold mb-6 text-center">Comprehensive HVAC Job Visit Log</h2>
      
      {/* Basic Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input type="time" id="time" name="time" value={formData.time} onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label htmlFor="technician" className="block text-sm font-medium text-gray-700">Technician Name</label>
          <input type="text" id="technician" name="technician" value={formData.technician} onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
          <select id="jobType" name="jobType" value={formData.jobType} onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
            <option value="Service Call">Service Call</option>
            <option value="Breakdown">Breakdown</option>
            <option value="Callout">Callout</option>
          </select>
        </div>
        <div>
          <label htmlFor="systemType" className="block text-sm font-medium text-gray-700">System Type</label>
          <select id="systemType" name="systemType" value={formData.systemType} onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
            <option value="Refrigeration">Refrigeration</option>
            <option value="VRF">VRF</option>
            <option value="Split">Split</option>
            <option value="MVHR">MVHR</option>
            <option value="AHU">AHU</option>
            <option value="ASHP">ASHP</option>
          </select>
        </div>
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">Customer Address</label>
          <input type="text" id="customerAddress" name="customerAddress" value={formData.customerAddress} onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">Customer Phone</label>
          <input type="tel" id="customerPhone" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
      </div>

      {/* General Service Details */}
      <div className="mt-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description of Service</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={3} required></textarea>
      </div>
      <div className="mt-4">
        <label htmlFor="issuesFound" className="block text-sm font-medium text-gray-700">Issues Found</label>
        <textarea id="issuesFound" name="issuesFound" value={formData.issuesFound} onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={3} required></textarea>
      </div>
      <div className="mt-4">
        <label htmlFor="workDone" className="block text-sm font-medium text-gray-700">Work Done</label>
        <textarea id="workDone" name="workDone" value={formData.workDone} onChange={handleInputChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={3} required></textarea>
      </div>

      {/* Additional Job Information */}
      <fieldset className="mt-6 border p-4 rounded">
        <legend className="text-xl font-medium text-gray-700 mb-2">Additional Job Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="timeOnSite" className="block text-sm font-medium text-gray-700">
              Time on Site (hours)
            </label>
            <input type="number" id="timeOnSite" name="timeOnSite" step="0.1" value={formData.timeOnSite}
              onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="partsUsed" className="block text-sm font-medium text-gray-700">
              Parts and Materials Used
            </label>
            <textarea id="partsUsed" name="partsUsed" value={formData.partsUsed} onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2} placeholder="List parts/materials used"></textarea>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700">
              Additional Comments / Notes
            </label>
            <textarea id="additionalComments" name="additionalComments" value={formData.additionalComments} onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2} placeholder="Any other remarks?"></textarea>
          </div>
        </div>
      </fieldset>

      {/* System-Specific Sections */}
      {/* Refrigeration */}
      {formData.systemType === "Refrigeration" && formData.refrigerationDetails && (
        <fieldset className="mt-6 border p-4 rounded">
          <legend className="text-xl font-medium text-gray-700 mb-2">Refrigeration Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="refrigerationDetails.amount" className="block text-sm font-medium text-gray-700">
                Refrigerant Added (kg)
              </label>
              <input type="number" id="refrigerationDetails.amount" name="refrigerationDetails.amount" step="0.01"
                value={formData.refrigerationDetails.amount} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="refrigerationDetails.bottleNumber" className="block text-sm font-medium text-gray-700">
                Bottle Number
              </label>
              <input type="text" id="refrigerationDetails.bottleNumber" name="refrigerationDetails.bottleNumber"
                value={formData.refrigerationDetails.bottleNumber} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="refrigerationDetails.reclaimed" className="block text-sm font-medium text-gray-700">
                Reclaimed Refrigerant (kg)
              </label>
              <input type="number" id="refrigerationDetails.reclaimed" name="refrigerationDetails.reclaimed" step="0.01"
                value={formData.refrigerationDetails.reclaimed} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="refrigerationDetails.rechargeReason" className="block text-sm font-medium text-gray-700">
                Reason for Recharge
              </label>
              <textarea id="refrigerationDetails.rechargeReason" name="refrigerationDetails.rechargeReason"
                value={formData.refrigerationDetails.rechargeReason} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
          </div>
        </fieldset>
      )}

      {/* VRF */}
      {formData.systemType === "VRF" && formData.vrfDetails && (
        <fieldset className="mt-6 border p-4 rounded">
          <legend className="text-xl font-medium text-gray-700 mb-2">VRF System Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vrfDetails.indoorUnitCount" className="block text-sm font-medium text-gray-700">
                Indoor Unit Count
              </label>
              <input type="number" id="vrfDetails.indoorUnitCount" name="vrfDetails.indoorUnitCount"
                value={formData.vrfDetails.indoorUnitCount} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="vrfDetails.outdoorUnitModel" className="block text-sm font-medium text-gray-700">
                Outdoor Unit Model
              </label>
              <input type="text" id="vrfDetails.outdoorUnitModel" name="vrfDetails.outdoorUnitModel"
                value={formData.vrfDetails.outdoorUnitModel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="vrfDetails.zoningDetails" className="block text-sm font-medium text-gray-700">
                Zoning Details
              </label>
              <textarea id="vrfDetails.zoningDetails" name="vrfDetails.zoningDetails"
                value={formData.vrfDetails.zoningDetails} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
            <div>
              <label htmlFor="vrfDetails.refrigerantType" className="block text-sm font-medium text-gray-700">
                Refrigerant Type
              </label>
              <input type="text" id="vrfDetails.refrigerantType" name="vrfDetails.refrigerantType"
                value={formData.vrfDetails.refrigerantType} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>
        </fieldset>
      )}

      {/* Split */}
      {formData.systemType === "Split" && formData.splitDetails && (
        <fieldset className="mt-6 border p-4 rounded">
          <legend className="text-xl font-medium text-gray-700 mb-2">Split System Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="splitDetails.indoorUnitModel" className="block text-sm font-medium text-gray-700">
                Indoor Unit Model
              </label>
              <input type="text" id="splitDetails.indoorUnitModel" name="splitDetails.indoorUnitModel"
                value={formData.splitDetails.indoorUnitModel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="splitDetails.outdoorUnitModel" className="block text-sm font-medium text-gray-700">
                Outdoor Unit Model
              </label>
              <input type="text" id="splitDetails.outdoorUnitModel" name="splitDetails.outdoorUnitModel"
                value={formData.splitDetails.outdoorUnitModel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="splitDetails.coolingCapacity" className="block text-sm font-medium text-gray-700">
                Cooling Capacity
              </label>
              <input type="text" id="splitDetails.coolingCapacity" name="splitDetails.coolingCapacity"
                value={formData.splitDetails.coolingCapacity} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="splitDetails.installationNotes" className="block text-sm font-medium text-gray-700">
                Installation Notes
              </label>
              <textarea id="splitDetails.installationNotes" name="splitDetails.installationNotes"
                value={formData.splitDetails.installationNotes} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="splitDetails.indoorUnitSerial" className="block text-sm font-medium text-gray-700">
                Indoor Unit Serial Number
              </label>
              <input type="text" id="splitDetails.indoorUnitSerial" name="splitDetails.indoorUnitSerial"
                value={formData.splitDetails.indoorUnitSerial} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="splitDetails.outdoorUnitSerial" className="block text-sm font-medium text-gray-700">
                Outdoor Unit Serial Number
              </label>
              <input type="text" id="splitDetails.outdoorUnitSerial" name="splitDetails.outdoorUnitSerial"
                value={formData.splitDetails.outdoorUnitSerial} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="splitDetails.filterDetails" className="block text-sm font-medium text-gray-700">
                Filter Sizes / Type
              </label>
              <textarea id="splitDetails.filterDetails" name="splitDetails.filterDetails"
                value={formData.splitDetails.filterDetails} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="List filter details"></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="splitDetails.errorCodes" className="block text-sm font-medium text-gray-700">
                Error Codes (if available)
              </label>
              <input type="text" id="splitDetails.errorCodes" name="splitDetails.errorCodes"
                value={formData.splitDetails.errorCodes} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="splitDetails.fgasChecklist" className="block text-sm font-medium text-gray-700">
                FGAS Compliant Checklist
              </label>
              <textarea id="splitDetails.fgasChecklist" name="splitDetails.fgasChecklist"
                value={formData.splitDetails.fgasChecklist} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="List checklist items"></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="splitDetails.siteSafetyNotes" className="block text-sm font-medium text-gray-700">
                Site-Based Safety Notes
              </label>
              <textarea id="splitDetails.siteSafetyNotes" name="splitDetails.siteSafetyNotes"
                value={formData.splitDetails.siteSafetyNotes} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="splitDetails.specialistRequirements" className="block text-sm font-medium text-gray-700">
                Specialist Access / Tool Requirements
              </label>
              <textarea id="splitDetails.specialistRequirements" name="splitDetails.specialistRequirements"
                value={formData.splitDetails.specialistRequirements} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
          </div>
        </fieldset>
      )}

      {/* AHU Section with Expanded Inputs */}
      {formData.systemType === "AHU" && formData.ahuDetails && (
        <fieldset className="mt-6 border p-4 rounded">
          <legend className="text-xl font-medium text-gray-700 mb-2">AHU System Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic AHU parameters */}
            <div>
              <label htmlFor="ahuDetails.airflowRate" className="block text-sm font-medium text-gray-700">
                Airflow Rate (CFM)
              </label>
              <input type="text" id="ahuDetails.airflowRate" name="ahuDetails.airflowRate" value={formData.ahuDetails.airflowRate}
                onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="ahuDetails.noiseLevel" className="block text-sm font-medium text-gray-700">
                Fan Noise Level (dB)
              </label>
              <input type="text" id="ahuDetails.noiseLevel" name="ahuDetails.noiseLevel" value={formData.ahuDetails.noiseLevel}
                onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="ahuDetails.filterStatus" className="block text-sm font-medium text-gray-700">
                Filter Status
              </label>
              <input type="text" id="ahuDetails.filterStatus" name="ahuDetails.filterStatus" value={formData.ahuDetails.filterStatus}
                onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            {/* Expanded inputs */}
            <div>
              <label htmlFor="ahuDetails.temperatureDifferential" className="block text-sm font-medium text-gray-700">
                Temperature Differential (Supply/Return, °F)
              </label>
              <input type="text" id="ahuDetails.temperatureDifferential" name="ahuDetails.temperatureDifferential"
                value={formData.ahuDetails.temperatureDifferential} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g. 15°F" />
            </div>
            <div>
              <label htmlFor="ahuDetails.humidityLevel" className="block text-sm font-medium text-gray-700">
                Humidity Level (%)
              </label>
              <input type="text" id="ahuDetails.humidityLevel" name="ahuDetails.humidityLevel"
                value={formData.ahuDetails.humidityLevel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g. 45%" />
            </div>
            <div>
              <label htmlFor="ahuDetails.beltCondition" className="block text-sm font-medium text-gray-700">
                Belt Condition
              </label>
              <select id="ahuDetails.beltCondition" name="ahuDetails.beltCondition"
                value={formData.ahuDetails.beltCondition} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Select</option>
                <option value="Good">Good</option>
                <option value="Worn">Worn</option>
                <option value="Needs Replacement">Needs Replacement</option>
              </select>
            </div>
            <div>
              <label htmlFor="ahuDetails.coilCondition" className="block text-sm font-medium text-gray-700">
                Coil Condition
              </label>
              <select id="ahuDetails.coilCondition" name="ahuDetails.coilCondition"
                value={formData.ahuDetails.coilCondition} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Select</option>
                <option value="Clean">Clean</option>
                <option value="Dirty">Dirty</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>
            <div>
              <label htmlFor="ahuDetails.condensateDrain" className="block text-sm font-medium text-gray-700">
                Condensate Drain Check
              </label>
              <select id="ahuDetails.condensateDrain" name="ahuDetails.condensateDrain"
                value={formData.ahuDetails.condensateDrain} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Select</option>
                <option value="Clear">Clear</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label htmlFor="ahuDetails.electricalStatus" className="block text-sm font-medium text-gray-700">
                Electrical Connection Status
              </label>
              <select id="ahuDetails.electricalStatus" name="ahuDetails.electricalStatus"
                value={formData.ahuDetails.electricalStatus} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Select</option>
                <option value="OK">OK</option>
                <option value="Needs Attention">Needs Attention</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.ductInspection" className="block text-sm font-medium text-gray-700">
                Duct Inspection Findings
              </label>
              <textarea id="ahuDetails.ductInspection" name="ahuDetails.ductInspection"
                value={formData.ahuDetails.ductInspection} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="Describe duct conditions, obstructions, etc."></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.lubricationCheck" className="block text-sm font-medium text-gray-700">
                Lubrication Check & Maintenance
              </label>
              <textarea id="ahuDetails.lubricationCheck" name="ahuDetails.lubricationCheck"
                value={formData.ahuDetails.lubricationCheck} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="Detail lubrication tasks performed"></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.sensorCalibration" className="block text-sm font-medium text-gray-700">
                Sensor Calibration & Verification
              </label>
              <textarea id="ahuDetails.sensorCalibration" name="ahuDetails.sensorCalibration"
                value={formData.ahuDetails.sensorCalibration} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="Record sensor calibration results and adjustments"></textarea>
            </div>
            {/* Additional Unit & Safety Details for AHU */}
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.indoorUnitModel" className="block text-sm font-medium text-gray-700">
                Indoor Unit Model
              </label>
              <input type="text" id="ahuDetails.indoorUnitModel" name="ahuDetails.indoorUnitModel"
                value={formData.ahuDetails.indoorUnitModel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.indoorUnitSerial" className="block text-sm font-medium text-gray-700">
                Indoor Unit Serial Number
              </label>
              <input type="text" id="ahuDetails.indoorUnitSerial" name="ahuDetails.indoorUnitSerial"
                value={formData.ahuDetails.indoorUnitSerial} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.outdoorUnitModel" className="block text-sm font-medium text-gray-700">
                Outdoor Unit Model
              </label>
              <input type="text" id="ahuDetails.outdoorUnitModel" name="ahuDetails.outdoorUnitModel"
                value={formData.ahuDetails.outdoorUnitModel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.outdoorUnitSerial" className="block text-sm font-medium text-gray-700">
                Outdoor Unit Serial Number
              </label>
              <input type="text" id="ahuDetails.outdoorUnitSerial" name="ahuDetails.outdoorUnitSerial"
                value={formData.ahuDetails.outdoorUnitSerial} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.filterDetails" className="block text-sm font-medium text-gray-700">
                Filter Sizes / Type
              </label>
              <textarea id="ahuDetails.filterDetails" name="ahuDetails.filterDetails"
                value={formData.ahuDetails.filterDetails} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="List filter details"></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.errorCodes" className="block text-sm font-medium text-gray-700">
                Error Codes (if available)
              </label>
              <input type="text" id="ahuDetails.errorCodes" name="ahuDetails.errorCodes"
                value={formData.ahuDetails.errorCodes} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.fgasChecklist" className="block text-sm font-medium text-gray-700">
                FGAS Compliant Checklist
              </label>
              <textarea id="ahuDetails.fgasChecklist" name="ahuDetails.fgasChecklist"
                value={formData.ahuDetails.fgasChecklist} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="List items or mark compliance"></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.siteSafetyNotes" className="block text-sm font-medium text-gray-700">
                Site-Based Safety Notes
              </label>
              <textarea id="ahuDetails.siteSafetyNotes" name="ahuDetails.siteSafetyNotes"
                value={formData.ahuDetails.siteSafetyNotes} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ahuDetails.specialistRequirements" className="block text-sm font-medium text-gray-700">
                Specialist Access / Tool Requirements
              </label>
              <textarea id="ahuDetails.specialistRequirements" name="ahuDetails.specialistRequirements"
                value={formData.ahuDetails.specialistRequirements} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
          </div>
        </fieldset>
      )}

      {/* MVHR Section with Expanded Inputs */}
      {formData.systemType === "MVHR" && formData.mvhrDetails && (
        <fieldset className="mt-6 border p-4 rounded">
          <legend className="text-xl font-medium text-gray-700 mb-2">MVHR System Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mvhrDetails.heatRecoveryEfficiency" className="block text-sm font-medium text-gray-700">
                Heat Recovery Efficiency (%)
              </label>
              <input type="text" id="mvhrDetails.heatRecoveryEfficiency" name="mvhrDetails.heatRecoveryEfficiency"
                value={formData.mvhrDetails.heatRecoveryEfficiency} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., 75%" />
            </div>
            <div>
              <label htmlFor="mvhrDetails.filterCondition" className="block text-sm font-medium text-gray-700">
                Filter Condition
              </label>
              <input type="text" id="mvhrDetails.filterCondition" name="mvhrDetails.filterCondition"
                value={formData.mvhrDetails.filterCondition} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., Clean" />
            </div>
            <div>
              <label htmlFor="mvhrDetails.ductIntegrity" className="block text-sm font-medium text-gray-700">
                Duct Integrity
              </label>
              <textarea id="mvhrDetails.ductIntegrity" name="mvhrDetails.ductIntegrity"
                value={formData.mvhrDetails.ductIntegrity} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="Describe duct conditions"></textarea>
            </div>
            <div>
              <label htmlFor="mvhrDetails.airflowMeasurement" className="block text-sm font-medium text-gray-700">
                Airflow Measurement (CFM)
              </label>
              <input type="text" id="mvhrDetails.airflowMeasurement" name="mvhrDetails.airflowMeasurement"
                value={formData.mvhrDetails.airflowMeasurement} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., 500 CFM" />
            </div>
            <div>
              <label htmlFor="mvhrDetails.supplyAirTemperature" className="block text-sm font-medium text-gray-700">
                Supply Air Temperature (°F)
              </label>
              <input type="text" id="mvhrDetails.supplyAirTemperature" name="mvhrDetails.supplyAirTemperature"
                value={formData.mvhrDetails.supplyAirTemperature} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., 68°F" />
            </div>
            <div>
              <label htmlFor="mvhrDetails.returnAirTemperature" className="block text-sm font-medium text-gray-700">
                Return Air Temperature (°F)
              </label>
              <input type="text" id="mvhrDetails.returnAirTemperature" name="mvhrDetails.returnAirTemperature"
                value={formData.mvhrDetails.returnAirTemperature} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., 75°F" />
            </div>
            <div>
              <label htmlFor="mvhrDetails.fanStatus" className="block text-sm font-medium text-gray-700">
                Fan Operation Status
              </label>
              <select id="mvhrDetails.fanStatus" name="mvhrDetails.fanStatus"
                value={formData.mvhrDetails.fanStatus} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Select</option>
                <option value="OK">OK</option>
                <option value="Noisy">Noisy</option>
                <option value="Needs Repair">Needs Repair</option>
              </select>
            </div>
            <div>
              <label htmlFor="mvhrDetails.noiseLevel" className="block text-sm font-medium text-gray-700">
                Noise Level (dB)
              </label>
              <input type="text" id="mvhrDetails.noiseLevel" name="mvhrDetails.noiseLevel"
                value={formData.mvhrDetails.noiseLevel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., 55 dB" />
            </div>
            <div>
              <label htmlFor="mvhrDetails.condensateDrain" className="block text-sm font-medium text-gray-700">
                Condensate Drain Condition
              </label>
              <select id="mvhrDetails.condensateDrain" name="mvhrDetails.condensateDrain"
                value={formData.mvhrDetails.condensateDrain} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="">Select</option>
                <option value="Clear">Clear</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label htmlFor="mvhrDetails.controlPanelStatus" className="block text-sm font-medium text-gray-700">
                Control Panel Status
              </label>
              <input type="text" id="mvhrDetails.controlPanelStatus" name="mvhrDetails.controlPanelStatus"
                value={formData.mvhrDetails.controlPanelStatus} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., Operational" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.cleaningStatus" className="block text-sm font-medium text-gray-700">
                Cleaning Status and Recommendations
              </label>
              <textarea id="mvhrDetails.cleaningStatus" name="mvhrDetails.cleaningStatus"
                value={formData.mvhrDetails.cleaningStatus} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="Notes on cleaning and maintenance"></textarea>
            </div>
            {/* Additional Unit & Safety Details for MVHR */}
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.indoorUnitModel" className="block text-sm font-medium text-gray-700">
                Indoor Unit Model
              </label>
              <input type="text" id="mvhrDetails.indoorUnitModel" name="mvhrDetails.indoorUnitModel"
                value={formData.mvhrDetails.indoorUnitModel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.indoorUnitSerial" className="block text-sm font-medium text-gray-700">
                Indoor Unit Serial Number
              </label>
              <input type="text" id="mvhrDetails.indoorUnitSerial" name="mvhrDetails.indoorUnitSerial"
                value={formData.mvhrDetails.indoorUnitSerial} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.outdoorUnitModel" className="block text-sm font-medium text-gray-700">
                Outdoor Unit Model
              </label>
              <input type="text" id="mvhrDetails.outdoorUnitModel" name="mvhrDetails.outdoorUnitModel"
                value={formData.mvhrDetails.outdoorUnitModel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.outdoorUnitSerial" className="block text-sm font-medium text-gray-700">
                Outdoor Unit Serial Number
              </label>
              <input type="text" id="mvhrDetails.outdoorUnitSerial" name="mvhrDetails.outdoorUnitSerial"
                value={formData.mvhrDetails.outdoorUnitSerial} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.filterDetails" className="block text-sm font-medium text-gray-700">
                Filter Sizes / Type
              </label>
              <textarea id="mvhrDetails.filterDetails" name="mvhrDetails.filterDetails"
                value={formData.mvhrDetails.filterDetails} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="List filter details"></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.errorCodes" className="block text-sm font-medium text-gray-700">
                Error Codes (if available)
              </label>
              <input type="text" id="mvhrDetails.errorCodes" name="mvhrDetails.errorCodes"
                value={formData.mvhrDetails.errorCodes} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.fgasChecklist" className="block text-sm font-medium text-gray-700">
                FGAS Compliant Checklist
              </label>
              <textarea id="mvhrDetails.fgasChecklist" name="mvhrDetails.fgasChecklist"
                value={formData.mvhrDetails.fgasChecklist} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="List checklist items"></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.siteSafetyNotes" className="block text-sm font-medium text-gray-700">
                Site-Based Safety Notes
              </label>
              <textarea id="mvhrDetails.siteSafetyNotes" name="mvhrDetails.siteSafetyNotes"
                value={formData.mvhrDetails.siteSafetyNotes} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="mvhrDetails.specialistRequirements" className="block text-sm font-medium text-gray-700">
                Specialist Access / Tool Requirements
              </label>
              <textarea id="mvhrDetails.specialistRequirements" name="mvhrDetails.specialistRequirements"
                value={formData.mvhrDetails.specialistRequirements} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
          </div>
        </fieldset>
      )}

      {/* ASHP Section */}
      {formData.systemType === "ASHP" && formData.ashpDetails && (
        <fieldset className="mt-6 border p-4 rounded">
          <legend className="text-xl font-medium text-gray-700 mb-2">ASHP System Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ashpDetails.coefficientOfPerformance" className="block text-sm font-medium text-gray-700">
                Coefficient of Performance
              </label>
              <input type="text" id="ashpDetails.coefficientOfPerformance" name="ashpDetails.coefficientOfPerformance"
                value={formData.ashpDetails.coefficientOfPerformance} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="ashpDetails.heatingOutput" className="block text-sm font-medium text-gray-700">
                Heating Output
              </label>
              <input type="text" id="ashpDetails.heatingOutput" name="ashpDetails.heatingOutput"
                value={formData.ashpDetails.heatingOutput} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label htmlFor="ashpDetails.defrostCycle" className="block text-sm font-medium text-gray-700">
                Defrost Cycle Information
              </label>
              <textarea id="ashpDetails.defrostCycle" name="ashpDetails.defrostCycle"
                value={formData.ashpDetails.defrostCycle} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
            {/* Additional Unit & Safety Details for ASHP */}
            <div className="md:col-span-2">
              <label htmlFor="ashpDetails.indoorUnitModel" className="block text-sm font-medium text-gray-700">
                Indoor Unit Model
              </label>
              <input type="text" id="ashpDetails.indoorUnitModel" name="ashpDetails.indoorUnitModel"
                value={formData.ashpDetails.indoorUnitModel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ashpDetails.indoorUnitSerial" className="block text-sm font-medium text-gray-700">
                Indoor Unit Serial Number
              </label>
              <input type="text" id="ashpDetails.indoorUnitSerial" name="ashpDetails.indoorUnitSerial"
                value={formData.ashpDetails.indoorUnitSerial} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ashpDetails.outdoorUnitModel" className="block text-sm font-medium text-gray-700">
                Outdoor Unit Model
              </label>
              <input type="text" id="ashpDetails.outdoorUnitModel" name="ashpDetails.outdoorUnitModel"
                value={formData.ashpDetails.outdoorUnitModel} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ashpDetails.outdoorUnitSerial" className="block text-sm font-medium text-gray-700">
                Outdoor Unit Serial Number
              </label>
              <input type="text" id="ashpDetails.outdoorUnitSerial" name="ashpDetails.outdoorUnitSerial"
                value={formData.ashpDetails.outdoorUnitSerial} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ashpDetails.filterDetails" className="block text-sm font-medium text-gray-700">
                Filter Sizes / Type
              </label>
              <textarea id="ashpDetails.filterDetails" name="ashpDetails.filterDetails"
                value={formData.ashpDetails.filterDetails} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="List filter details"></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ashpDetails.errorCodes" className="block text-sm font-medium text-gray-700">
                Error Codes (if available)
              </label>
              <input type="text" id="ashpDetails.errorCodes" name="ashpDetails.errorCodes"
                value={formData.ashpDetails.errorCodes} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ashpDetails.fgasChecklist" className="block text-sm font-medium text-gray-700">
                FGAS Compliant Checklist
              </label>
              <textarea id="ashpDetails.fgasChecklist" name="ashpDetails.fgasChecklist"
                value={formData.ashpDetails.fgasChecklist} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}
                placeholder="List checklist items"></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ashpDetails.siteSafetyNotes" className="block text-sm font-medium text-gray-700">
                Site-Based Safety Notes
              </label>
              <textarea id="ashpDetails.siteSafetyNotes" name="ashpDetails.siteSafetyNotes"
                value={formData.ashpDetails.siteSafetyNotes} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="ashpDetails.specialistRequirements" className="block text-sm font-medium text-gray-700">
                Specialist Access / Tool Requirements
              </label>
              <textarea id="ashpDetails.specialistRequirements" name="ashpDetails.specialistRequirements"
                value={formData.ashpDetails.specialistRequirements} onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" rows={2}></textarea>
            </div>
          </div>
        </fieldset>
      )}

      {/* Photos and Signature Section */}
      <fieldset className="mt-6 border p-4 rounded">
        <legend className="text-xl font-medium text-gray-700 mb-2">Photos and Signature</legend>
        <div className="mb-4">
          <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
            Upload Photos
          </label>
          <input type="file" id="photos" name="photos" accept="image/*" multiple onChange={handleFileChange}
            className="mt-1 block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Signature</label>
          <div className="border p-2">
            <SignatureCanvas
              ref={sigPadRef}
              penColor="black"
              canvasProps={{ className: "signatureCanvas", width: 400, height: 200, style: { border: "1px solid #e2e8f0" } }}
            />
          </div>
          <div className="mt-2 flex space-x-2">
            <button type="button" onClick={clearSignature} className="py-1 px-3 bg-gray-300 rounded">
              Clear Signature
            </button>
            <button type="button" onClick={saveSignature} className="py-1 px-3 bg-blue-600 text-white rounded">
              Save Signature
            </button>
          </div>
        </div>
      </fieldset>

      <button type="submit" className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
        Submit Job Log
      </button>
    </form>
  );
};

export default JobVisitLogForm;
