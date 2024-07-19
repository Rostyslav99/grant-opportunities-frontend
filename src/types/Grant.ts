export enum GrantStatus {
  APPLIED = 'APPLIED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface Grant {
  id: number;
  title: string;
  description: string;
  deadlineDate: string;
  matchDate: string;
  avgAmount: number;
  location: string;
  companyName: string;
  status: GrantStatus;
  feedback?: string;
}
