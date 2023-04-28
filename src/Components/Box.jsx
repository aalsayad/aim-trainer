import React from 'react';
import './Box.styles.css';

function Box(props) {
  if (props.random) {
    console.log(
      `I am box ${props.index} & I am random`
    );
  }

  const handleTargetAttempt = () => {
    if (props.random === true) {
      console.log(
        'Correct Target Clicked! LETS GO!'
      );
      props.targetClicked();
    } else {
      console.log('Target Missed');
    }
  };

  return (
    <>
      <div
        draggable='false'
        onClick={handleTargetAttempt}
        key={props.index}
        className={`box ${
          props.random && 'box_random'
        }`}
      >
        {/* {props.index} */}
      </div>
    </>
  );
}

export default Box;
