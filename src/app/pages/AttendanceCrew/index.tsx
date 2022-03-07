// /**
//  *
//  * AttendanceCrew
//  *
//  */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { axiosPost } from '../../requests';
import { Loader } from '../../components/Loader';

export function AttendanceCrew(props: any) {
  interface EventsList {
    eventId: number;
    status: number;
    events: {
      eventName: string;
    };
  }

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventsList[]>([]);
  const [eventsStatus, setEventsStatus] = useState<number[]>([]);

  async function fetchData() {
    const { data } = await axiosPost('/users/attendance', {
      userId: 1,
      phase: 4,
    });
    setEvents(data.requestedPhaseEvents);
    setEventsStatus(data.statusCount);
    setLoading(false);
  }

  function calColor(val: number) {
    if (val === 0) {
      return '#FFA3A3';
    } else if (val === 1) {
      return ' #93ffc4';
    } else {
      return '#FFDBA5';
    }
  }
  function calStatusText(indexVal: number) {
    if (indexVal === 0) {
      return 'Absent';
    } else if (indexVal === 1) {
      return 'Present';
    } else {
      return 'Informed';
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  } else if (events.length === 0) {
    return <h1>No events to display</h1>;
  } else {
    return (
      <>
        <div className="d-flex mb-5">
          {eventsStatus.map((status, index) => (
            <div
              className="card-shadow p-3 me-3 w-md-50"
              key={`${status}-${index}`}
            >
              <div className="d-flex align-items-center justify-content-between">
                <h3>{calStatusText(index)}</h3>
                <CircularProgress
                  sx={{
                    color: calColor(index),
                  }}
                  variant="determinate"
                  value={(status / events.length) * 100}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <h3 className="mt-5 mb-3">Attendance report</h3>
          {events.map((event, index) => (
            <div
              className="card-shadow p-3 my-3"
              style={{
                backgroundColor: calColor(event.status),
              }}
              key={`${event.events.eventName}-${index}`}
            >
              <h3>{event.events.eventName}</h3>
            </div>
          ))}
        </div>
      </>
    );
  }
}
