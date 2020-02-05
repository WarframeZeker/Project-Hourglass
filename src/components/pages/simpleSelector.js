import React, {useState} from 'react';
import Header from '../header/index';
import { LargeButton } from '../buttons/largeButton';
import { ArrowButton } from '../buttons/arrowButton';

const inline_block = {
  display: 'block',
};

const SimpleSelector = ({ pageStatus, title, type, next, back }) => {

  return (
    <div id="simple_selector_container" class="simple_selector_container">
      <Header 
        pageStatus={pageStatus}
        title={title}
      />
      <div id="body" className="body">
        {type.map(option => (
          <div id="inline_button_container" style={inline_block}>
          <LargeButton 
            classType={'meeting'}
            type={'default'}
            name={option}
            action={next}
          />
          </div>
        ))}
      </div>
      <ArrowButton 
        classType={'back'}
        type={'default'}
        name={'<'}
        action={back}
      />
    </div>
  )
};

export default SimpleSelector;