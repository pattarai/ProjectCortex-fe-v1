/* --- STATE --- */
interface Events {
  event_id: number;
  event_name: string;
  event_date: string;
  phase: number;
}
export interface EventsState {
  error: boolean;
  events: Events[];
}
