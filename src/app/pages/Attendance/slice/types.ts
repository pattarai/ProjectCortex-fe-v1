/* --- STATE --- */
export interface Attendance {
  id: number;
  sno: number;
  name: string;
  status: string;
}

export interface AttendanceState extends Array<Attendance> {}
