import React, {useState} from 'react';
import ShiftTimeSelector from '../dropDowns/shiftTimeSelector';

const shiftSelectorButtonStyles = {
  width: '115px',
  height: '40px',
  border: 'solid', 
  position: 'relative',
  display: 'inline-block',
};

const shiftToggleButtonStyles = {
  width: '9.95px',
  height: '6.5px',
  // transform: 'rotate(-180deg)',
}; 

const ShiftSelectorButton = ({ classType, type, name, actio, times }) => {
  const [renderDropDown, setStatus] = useState(false);

  return (
    <div className="shift_selector_button" style={shiftSelectorButtonStyles}>
      <div id={`shift_selector_button_${classType}`}>{name}</div>
      {!renderDropDown ? 
        <button
          id="shift_selector_dd_toggle_button_toggle"
          style={shiftToggleButtonStyles} 
          onClick={() => setStatus(true)}>
        </button>
        : 
        <button
          id="shift_selector_dd_toggle_button_untoggle"
          style={shiftToggleButtonStyles} 
          onClick={() => setStatus(false)}>
        </button>
      }
      {renderDropDown ? 
        <ShiftTimeSelector 
          times={times} 
        />
        : 
        null
      }
    </div>
  )
};

export default ShiftSelectorButton;