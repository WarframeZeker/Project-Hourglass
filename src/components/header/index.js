import React from 'react';
import ProgressBar from './progressBar';

const Header = ({ pageStatus, title }) => {
  return (
    <div id="header" className="header">
      <div id="start_progress" className="progress">0{pageStatus}/06</div>
      <div id="start_progress-bar" className="progress_bar"></div>
      <ProgressBar 
        pageStatus={pageStatus}
      />
      <div className="title">{title}</div>
    </div>
  )
};

export default Header;