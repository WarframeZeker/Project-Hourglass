import React from 'react';

const ProgressBar = ({pageStatus}) => {

  const temp_pb_outer = {
    width: '240px',
    height: '12px',
  };

  const temp_pb_inner = {
    width: `${pageStatus * 16.667}%`,
    height: '100%',
    backgroundColor: '#51D7B0',
  };

  return (
    <div className="progress_bar"> 
      <div id="progress_bar_outer" className="inner_container" style={temp_pb_outer}>
        <div id="progress_bar_inner" className="outer_container" style={temp_pb_inner}></div>
      </div>
    </div>
  );
};

export default ProgressBar;