import React from 'react';

export const SmallButton = ({ classType, type, name, action }) => {

  const convertTypeToStyle = (setting) => {
    if (setting === 'default') {
      return '#FFFFFF';
    } else if (setting === 'pressed') {
      return '#F1F1F1';
    } else {
      return '#7DDF92';
    }
  };

  const temp_smBtnStyle = {
    width: '104px',
    height: '48px',
    backgroundColor: convertTypeToStyle(type),
  };

  const temp_breakStyles = {
    width: '104px',
    height: '48px',
    backgroundColor: convertTypeToStyle(type),
    whiteSpace: 'pre-wrap',
  };

  return (
    <button
      id={`${name}_small_button`}
      className={`${classType}_button`}
      value={name} 
      style={classType === 'break_time' ? temp_breakStyles : temp_smBtnStyle} 
      onClick={() => action(event)}>{name}
    </button>
  )
};