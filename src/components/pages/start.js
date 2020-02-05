import React, {useState} from 'react';
import Header from '../header/index';
import { LargeButton } from '../buttons/largeButton';

const temp = {
  width:'258px',
  height:'163px',
  left:'1345px',
  top:'737px'
};

const inline_block = {
  display: 'block',
};

const Start = ({ pageStatus, next, selectStaffRoster }) => {
  const [options, setOptions] = useState(['SF Day', 'SF Swing', 'PHX Day', 'PHX Graveyard']);

  return (
    <div id="start_container" class="start_container">
      <Header 
        pageStatus={pageStatus}
        title={'Select a shift'}
      />
      <div id="body" className="body">
        {options.map(option => (
          <div id="inline_button_container" style={inline_block}>
          <LargeButton 
            classType={'shift'}
            type={'default'}
            name={option}
            // action={next}
            action={(event) => {
              selectStaffRoster(event);
              next();
            }}
          />
          </div>
        ))}
      </div>
      <div id="start_image" className="container_image">
        <img src="https://www.freeiconspng.com/uploads/no-image-icon-15.png" style={temp}/>
      </div>
    </div>
  )
};

export default Start;