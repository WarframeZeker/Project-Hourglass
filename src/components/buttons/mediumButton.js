import React from 'react';

export const MediumButton = ({ classType, type, name, action }) => {

  const convertTypeToStyle = (setting) => {
    if (setting === 'default') {
      return '#7DDF92';
    } else {
      return '#F1F1F1';
    }
  };

  const temp_mdBtnStyle = {
    width: '160px',
    height: '48px',
    backgroundColor: convertTypeToStyle(type),
  };

  return (
    <button
      id={`${name}_medium_button`}
      className={`${classType}_button`} 
      style={temp_mdBtnStyle} 
      onClick={() => action()}>{name}
    </button>
  )
};
