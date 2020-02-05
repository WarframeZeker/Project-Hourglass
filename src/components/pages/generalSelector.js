import React, {useState, useEffect} from 'react';
import Header from '../header/index';
import BackContButtons from './backContButtons';
import { SmallButton } from '../buttons/smallButton';



const inline_block = {
  display: 'block',
};

const GeneralSelector = ({ pageStatus, title, data, next, back, action, }) => {
  /** Utility Function */
  const convertListToPairs = (listOfAdvisors) => {
    let newList = [];

    for (let i = 0; i < listOfAdvisors.length; i += 2) {
      if (!listOfAdvisors[i + 1]) {
        !newList.push([listOfAdvisors[i]]);
        break;
      } else {
        newList.push([listOfAdvisors[i], listOfAdvisors[i + 1]]);
      }
    }

    return newList;
  };

  return (
    <div id="general_selector_container" className="general_selector_container">
      <Header 
        pageStatus={pageStatus}
        title={title}
      />
      <div id="body" className="body" >
        <table>
          <tbody>
            {
              convertListToPairs(data).map(rows => (
                <tr>
                  {rows.map(advisor => (
                    <td>
                    <SmallButton 
                      classType={advisor}
                      type={'default'}
                      name={advisor}
                      action={action}
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
  )
};

export default GeneralSelector;