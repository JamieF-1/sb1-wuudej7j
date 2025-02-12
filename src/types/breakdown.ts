export interface CustomerDetails {
  name: string;
  address: string;
  contactName: string;
  contactNumber: string;
  email: string;
  purchaseOrder: string;
}

export interface SystemDetails {
  manufacturer: string;
  model: string;
  serialNumber: string;
  systemType: string;
  location: string;
  installationDate?: string;
  lastServiceDate?: string;
}

export interface FaultDetails {
  reportedFault: string;
  faultCategory: 'mechanical' | 'electrical' | 'refrigerant' | 'controls' | 'other';
  faultFound: string;
  rootCause: string;
  actionTaken: string;
  partsUsed: {
    partNumber: string;
    description: string;
    quantity: number;
  }[];
  additionalPartsRequired: string;
}

export interface SystemReadings {
  supplyTemp: number;
  returnTemp: number;
  superheat: number;
  subcooling: number;
  suctionPressure: number;
  dischargePressure: number;
  ambientTemp: number;
  refrigerantAdded: {
    type: string;
    amount: number;
    bottleNumber: string;
  } | null;
}

export interface LaborDetails {
  arrivalTime: string;
  departureTime: string;
  travelTime: number;
  numberOfEngineers: number;
  overtimeHours: number;
}

export interface BreakdownFormData {
  id?: string;
  status: 'draft' | 'completed';
  reference: string;
  date: string;
  customer: CustomerDetails;
  system: SystemDetails;
  fault: FaultDetails;
  readings: SystemReadings;
  labor: LaborDetails;
  recommendations: string;
  followUpRequired: boolean;
  followUpDetails?: string;
  engineerName: string;
  engineerSignature: string;
  customerSignature: string;
  photos: string[];
  completedAt?: string;
}