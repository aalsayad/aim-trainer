import './Box.styles.css';
import missSFX from '../assets/miss.wav';

function Box(props) {
  const miss = new Audio(missSFX);

  const handleTargetAttempt = () => {
    if (props.random === true) {
      props.targetClicked();
      props.setScore((prev) => prev + 1);
    } else {
      miss.play();
    }
  };

  return (
    <>
      <div
        draggable='false'
        onClick={handleTargetAttempt}
        key={props.index}
        className={`box ${props.random && 'box_random'}`}
      ></div>
    </>
  );
}

export default Box;
