import React, {useState} from 'react';
import ShiftTimeButton from '../buttons/shiftTimeButton';

const selectorStyles = {
  display: 'block',
  backgroundColor: '#f9f9f9',
  minWidth: '160px',
  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  zIndex: 1,
};

const dropdownStyles = {
  position: 'relative',
  display: 'inline-block',
};

const buttonStyles = {
  width: '80%',
  border: 'none', 
};

const altButtonStyles = {
  width: '80%',
  border: 'none',
  backgroundColor: '#AEE274',
};

const ShiftTimeSelector = ({ times }) => {
  const [triggerStyle, setStyle] = useState(buttonStyles);
  
  const [selectedTimes, addTime] = useState([]);

  /** remove time when a box becomes unchecked */
  const addNRemoveTime = (value, boolean) => {
    console.log('invoked');
  };

  return (
    <div className="drop_down" style={selectorStyles}>
      {times.map(time => (
        <div style={selectorStyles}>
          <ShiftTimeButton
            time={time}
            action={addNRemoveTime}
          />
        </div>
      ))}
    </div>
  );
};

export default ShiftTimeSelector;