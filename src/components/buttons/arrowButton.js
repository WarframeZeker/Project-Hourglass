import React from 'react';

export const ArrowButton = ({ classType, type, name, action }) => {

  const convertTypeToStyle = (setting) => {
    if (setting === 'default') {
      return '#FFFFFF';
    } else {
      return '#F1F1F1';
    }
  };

  const temp_arrowBtnStyle = {
    width: '48px',
    height: '48px',
    backgroundColor: convertTypeToStyle(type),
  };

  return (
    <button
      id={`${name}_arrow_button`}
      className={`${classType}_button`} 
      style={temp_arrowBtnStyle} 
      onClick={action}>{name}
    </button>
  )
};