import React from 'react';

export const LargeButton = ({ classType, type, name, action }) => {

  const convertTypeToStyle = (setting) => {
    if (setting === 'default') {
      return '#FFFFFF';
    } else if (setting === 'pressed') {
      return '#F1F1F1';
    } else {
      return '#7DDF92';
    }
  };

  const temp_lrgBtnStyle = {
    width: '200px',
    height: '48px',
    backgroundColor: convertTypeToStyle(type),
  };

  return (
    <button
      id={`${name}_large_button`}
      className={`${classType}_button`} 
      style={temp_lrgBtnStyle}
      value={name}
      onClick={() => action(event)}>{name}
    </button>
  )
};

