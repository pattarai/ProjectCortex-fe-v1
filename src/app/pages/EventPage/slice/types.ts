/* --- STATE --- */
interface Events {
  id: number;
  name: string;
  dateTime: string;
  phase: number;
}

export interface EventsState extends Array<Events> {}
