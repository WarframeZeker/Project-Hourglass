import React from 'react';
import { MediumButton } from '../buttons/mediumButton';
import { ArrowButton } from '../buttons/arrowButton';

const BackContButtons = ({ next, back }) => {
  return (
    <div id="back_continue_container" className="back_continue_container">
      <ArrowButton
        classType={'back'}
        type={'default'}
        name={'<'}
        action={back}
      /> 
      <MediumButton
        classType={'continue'}
        type={'default'}
        name={'Continue'}
        action={next}
      />
    </div>
  );
};

export default BackContButtons;