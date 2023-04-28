import { useEffect, useState } from 'react';
import './Game.styles.css';
import Box from './Box';
import Header from './Header';
import popSFX from '../assets/Pop Item Appear.wav';
import { MdPlayCircleOutline, MdStop } from 'react-icons/md';

function Game() {
  //Define Audio SFX
  const pop = new Audio(popSFX);

  //Array of Boxes/Possible Targets in-game canvas
  const [boxesArray, setBoxesArray] = useState([]);

  //Track Game Session
  const [sessionStarted, setSessionStarted] = useState(false);

  //Track Randomly Picked Number
  const [lastPickedNumber, setLastPickedNumber] = useState(0);

  //Reset All to array of boxes with 16 boxes
  const drawBoxes = () => {
    const newBoxesArray = [];
    for (let i = 1; i <= 16; i++) {
      newBoxesArray.push({
        index: i,
      });
    }
    setBoxesArray(newBoxesArray);
  };

  //TrackScore
  const [score, setScore] = useState(0);

  //Fill Initial Array of boxes with 16 boxes (Easy Mode)
  useEffect(() => {
    drawBoxes();
  }, []);

  //Init the random select of a target box
  const newTarget = () => {
    pop.play();
    let randomlyPickedBox = 0;
    //Pick Random Number between 1 & 16
    while (randomlyPickedBox === lastPickedNumber || randomlyPickedBox === 0) {
      randomlyPickedBox = Math.floor(Math.random() * 16) + 1;
    }

    //Keep Track of the picked number
    setLastPickedNumber(randomlyPickedBox);

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

  //Start Game Session
  const handleStartSession = () => {
    console.log('Game Session Started');
    setScore(0);
    setSessionStarted(true);
    newTarget();
  };

  //Stop Game Session
  const handleStopSession = () => {
    console.log('Game Session Stopped');
    setSessionStarted(false);
    drawBoxes();
  };

  return (
    <>
      <div className='container'>
        <div className='game_ui-container'>
          <Header />
          <div className='game_controls'>
            <div className='game_controls_left-box'>
              <button className={`game_btn ${sessionStarted ? 'btn_inactive' : ''}`} onClick={handleStartSession}>
                <MdPlayCircleOutline />
              </button>
              <button
                className={`game_btn ${sessionStarted ? 'btn_active' : 'btn_inactive'}`}
                onClick={handleStopSession}
              >
                <MdStop />
              </button>
            </div>
            <div className='game_score'>
              Score: <span>{score}</span>
            </div>
          </div>
          <div className='stats_container'></div>
          <div className='trainer_container'>
            {boxesArray.map((box) => (
              <Box
                key={box.index}
                index={box.index}
                random={box.random}
                targetClicked={newTarget}
                setScore={setScore}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
