export interface TechnicianDetails {
  name: string;
  certificationNumber: string;
}

export interface SiteDetails {
  clientName: string;
  siteAddress: string;
  contactPerson: string;
  contactNumber: string;
  jobReference: string;
}

export interface SystemDetails {
  manufacturer: string;
  model: string;
  serialNumber: string;
  systemType: string;
  capacity: number;
  initialCharge: number;
  refrigerantType: string;
}

export interface BottleData {
  bottleNumber: string;
  refrigerantType: string;
  weightBefore: number;
  weightAfter: number;
}

export interface RecoveryData {
  startTime: string;
  endTime: string;
  amountRecovered: number;
  equipment: string;
}

export interface PressureTest {
  pressure: number;
  duration: number;
  passed: boolean;
  comments: string;
}

export interface EvacuationData {
  startTime: string;
  endTime: string;
  targetVacuum: number;
  achievedVacuum: number;
  comments: string;
}

export interface RechargeData {
  startTime: string;
  endTime: string;
  amountRecharged: number;
  finalCharge: number;
}

export interface FGasFormData {
  id?: string;
  status: 'draft' | 'completed';
  technician: TechnicianDetails;
  site: SiteDetails;
  system: SystemDetails;
  bottles: BottleData[];
  recovery: RecoveryData;
  pressureTest: PressureTest;
  evacuation: EvacuationData;
  recharge: RechargeData;
  signature: string;
  completedAt?: string;
}