import './TextButton.styles.css';

function TextButton(props) {
  console.log();
  const handleDifficultySelect = () => {
    props.setScoreboard(false);
    props.setNumberOfTargets(props.targets);
    props.setDifficulty(
      props.difficulty.map((option) => {
        if (option.name === props.name) {
          return {
            ...option,
            selected: true,
          };
        } else {
          return {
            ...option,
            selected: false,
          };
        }
      })
    );
  };
  return (
    <button onClick={handleDifficultySelect} className={`game_btn btn_text ${props.selected && 'btn_active'}`}>
      {props.name}
    </button>
  );
}

export default TextButton;
