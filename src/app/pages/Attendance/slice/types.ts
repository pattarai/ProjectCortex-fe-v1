/* --- STATE --- */
interface MemberAttendanceType {
  id: number;
  name: string;
  status: string;
}

export interface Attendance {
  id: number;
  eventName: string;
  eventDate: Date | null;
  members: MemberAttendanceType[];
}

export interface AttendanceState extends Array<Attendance> {}
