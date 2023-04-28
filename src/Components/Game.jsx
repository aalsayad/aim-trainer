import { useEffect, useState } from 'react';
import './Game.styles.css';
import Box from './Box';

function Game() {
  //Array of Boxes/Possible Targets in-game canvas
  const [boxesArray, setBoxesArray] = useState([]);
  //Track Game Session
  const [sessionStarted, setSessionStarted] = useState(false);

  //Fill Initial Array of boxes with 16 boxes (Easy Mode)
  useEffect(() => {
    const newBoxesArray = [];
    for (let i = 1; i <= 16; i++) {
      newBoxesArray.push({
        index: i,
      });
    }
    setBoxesArray(newBoxesArray);
  }, []);

  //Init the random select of a target box
  const newTarget = () => {
    console.log('Started Generating Random Number for next Box');
    //Pick Random Number between 1 & 16
    let randomlyPickedBox = Math.floor(Math.random() * 16) + 1;

    //Update State of Boxes to assign "random: true" kv pair to a random box in the game canvas
    setBoxesArray(
      boxesArray.map((exsistingBox) => {
        if (exsistingBox.index === randomlyPickedBox) {
          return {
            index: exsistingBox.index,
            random: true,
          };
        } else {
          return {
            index: exsistingBox.index,
          };
        }
      })
    );
  };

  //

  return (
    <>
      <div className='game'>
        <button onClick={newTarget}>Start Trainer</button>
        <div className='stats_container'></div>
        <div className='trainer_container'>
          {boxesArray.map((box) => (
            <Box key={box.index} index={box.index} random={box.random} targetClicked={newTarget} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Game;
