import React, {useState, useEffect} from 'react';
import Header from '../header/index';
import BackContButtons from './backContButtons';
import { SmallButton } from '../buttons/smallButton';

const inline_block = {
  display: 'block',
};

const Breaks = ({ pageStatus, title, next, back }) => {
  /** Temporary list of times and labels */
  const [times, noChanges] = useState([
    [
      ['09:00am 09:15am', '09:15am 09:30am'],
      ['09:30am 09:45am', '09:45am 10:00am'], 
      ['10:00am 10:15am', '10:15am 10:30am']
    ], 
    [
      ['11:05am 11:35am', '11:35am 12:05pm'], 
      ['12:05pm 12:35pm', '12:35pm 01:05pm']
    ], 
    [
      ['02:00pm 02:15pm', '02:15pm 02:30pm'], 
      ['02:30pm 02:45pm', '02:45pm 03:00pm'], 
      ['03:00pm 03:15am', '03:15pm 03:30pm']
    ]
  ]);

  const [labels, noLabelChanges] = useState(["Break 1", "Lunch", "Break 2"]);

  return (
    <div id="breaks_container" className="breaks_container">
      <Header 
        pageStatus={pageStatus}
        title={title}
      />
      <div id="body" className="body" >
        {
          times.map(listOfTimes => (
            <table>
              <tbody>
                {listOfTimes.map(timePairs => (
                  <tr>
                    {timePairs.map(timeSlot => (
                      <td>
                        <SmallButton 
                          classType={'break_time'}
                          type={'default'}
                          name={timeSlot}
                          action={() => console.log('clicked')}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ))
        }
      </div>
      <BackContButtons 
        next={next}
        back={back}
      />
    </div>
  )
};

export default Breaks;