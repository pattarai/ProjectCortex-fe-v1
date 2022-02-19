/* --- STATE --- */
export interface Events {
  eventId: number;
  eventName: string;
  eventDate: string | null;
  eventType: string;
  conductedBy: string;
  speaker: string;
  phase: number;
}
export interface EventsState {
  error: boolean;
  committee: string[];
  projects: string[];
  phaseList: number[];
  events: Events[];
}
