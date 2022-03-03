/* --- STATE --- */
export interface CrewAttendanceType {
  userId: number;
  eventId: number;
  status: number;
  users: {
    firstName: string;
    lastName: string;
  };
}

interface ExternalAttendanceType {
  externalId?: number;
  eventId?: number;
  name: string;
}

export interface AttendanceState {
  error: boolean;
  crewAttendance: CrewAttendanceType[];
  externalAttendance: ExternalAttendanceType[];
  eventId: number;
  isExist: boolean;
}
