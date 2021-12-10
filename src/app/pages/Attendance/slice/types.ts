/* --- STATE --- */
export interface MemberAttendanceType {
  id: number;
  name: string;
  status: string;
}

interface Attendance {
  id: number;
  eventName: string;
  eventDate: string | Date;
  members: MemberAttendanceType[];
}

export interface AttendanceState extends Array<Attendance> {}
