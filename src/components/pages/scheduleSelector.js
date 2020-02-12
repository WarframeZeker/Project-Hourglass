import React, {useState} from 'react';
import Header from '../header/index';
import BackContButtons from '../pages/backContButtons';
import ShiftSelectorButton from'../buttons/shiftSelectorButton';

const ScheduleSelector = ({ pageStatus, title, meetings, next, back, action, times }) => {

  return (
    <div>
      <Header 
        pageStatus={pageStatus}
        title={title}
      />
      <div id="body" className="body">
        <table>
          <tbody>
            {
              meetings.map(rows => (
                <tr>
                  {rows.map(meetingType => (
                    <td>
                      <ShiftSelectorButton 
                        classType={meetingType}
                        type={'default'}
                        name={meetingType}
                        action={action}
                        times={times}
                      />
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <BackContButtons 
        next={next}
        back={back}
      />
    </div>
  );
};

export default ScheduleSelector;