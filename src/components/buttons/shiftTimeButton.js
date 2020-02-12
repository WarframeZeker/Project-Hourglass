import React, {useState} from 'react';

const untoggledStyles = {
  width: '100%',
  border: 'none', 
};

const toggledStyles = {
  width: '100%',
  border: 'none',
  backgroundColor: '#AEE274',
};

const ShiftTimeButton = ({ time, action }) => {
  const [toggled, setToggle] = useState(false);
  
  const [buttonStyle, setStyle] = useState(untoggledStyles);
  
  const alterColor = () => {
    if (!toggled) {
      setStyle(untoggledStyles);
      return;
    } else {
      setStyle(toggledStyles);
      return;
    }
  };

  return (
    <button 
      style={buttonStyle} 
      onClick={() => {
        alterColor();
        action(time, toggled);
      }}>{time}
    </button>
  )
};

export default ShiftTimeButton;