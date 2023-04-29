import './Box.styles.css';

function Box(props) {
  const handleTargetAttempt = (e) => {
    e.preventDefault();

    if (props.random === true) {
      props.targetClicked();
      props.setScore((prev) => prev + 1);
      props.setSuccess((prev) => prev + 1);
    } else {
      props.setSuccess(0);
    }
  };

  return (
    <>
      <div
        draggable='false'
        onMouseDown={handleTargetAttempt}
        key={props.index}
        className={`box ${props.random && 'box_random'}`}
      ></div>
    </>
  );
}

export default Box;
