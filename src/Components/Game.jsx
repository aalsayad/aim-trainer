import { useEffect, useState } from 'react';
import './Game.styles.css';
import Box from './Box';
import Header from './Header';
import { MdPlayCircleOutline, MdStop } from 'react-icons/md';
import TextButton from './TextButton';
import successSFX from '../assets/Pop Item Appear.wav';
import failSFX from '../assets/miss.wav';

const timerCount = 30;
function Game() {
  //Array of Boxes/Possible Targets in-game canvas
  const [boxesArray, setBoxesArray] = useState([]);
  //Track Game Session
  const [sessionStarted, setSessionStarted] = useState(false);
  //Track Game Time
  const [sessionTimer, setSessionTimer] = useState(timerCount);
  //Track Randomly Picked Number
  const [lastPickedNumber, setLastPickedNumber] = useState(0);
  //Track Player Score
  const [score, setScore] = useState(0);
  //Display Scoreboard after game session
  const [scoreboard, setScoreboard] = useState(false);

  //Difficulty Settings
  const [difficulty, setDifficulty] = useState([
    { name: 'Easy', targets: 49, selected: true },
    { name: 'Medium', targets: 100, selected: false },
    { name: 'Hard', targets: 169, selected: false },
    { name: 'Pro', targets: 289, selected: false },
  ]);
  //track success
  const [success, setSuccess] = useState(1);

  //Set difficulty
  const [numberOfTargets, setNumberOfTargets] = useState(difficulty[0].targets);

  //Reset All to array of boxes with the corresponding number of boxes in accordance to difficulty
  const drawBoxes = () => {
    const newBoxesArray = [];
    for (let i = 1; i <= numberOfTargets; i++) {
      newBoxesArray.push({
        index: i,
      });
    }
    setBoxesArray(newBoxesArray);
  };

  //Fill Initial Array of boxes with the corresponding number of boxes in accordance to difficulty
  useEffect(() => {
    drawBoxes();
  }, [difficulty]);

  //Play Music
  useEffect(() => {
    if (success) {
      const successFx = new Audio(successSFX);
      successFx.play();
    } else {
      const failFx = new Audio(failSFX);
      failFx.play();
    }
  }, [success]);

  //Stop Game Session when timer reaches 0
  useEffect(() => {
    if (sessionTimer === 0) {
      handleStopSession();
    }
  }, [sessionTimer]);

  //Interval timer / Count down of the game timer
  useEffect(() => {
    let sessionInterval;
    if (sessionStarted) {
      sessionInterval = setInterval(() => {
        setSessionTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setScoreboard(true);
      handleStopSession();
      setSessionTimer(timerCount);
      clearInterval(sessionInterval);
    }

    return () => clearInterval(sessionInterval);
  }, [sessionStarted]);

  //Init the random select of a target box
  const newTarget = () => {
    let randomlyPickedBox = 0;
    //Pick Random Number between 1 & set number of boxes according to difficulty
    while (randomlyPickedBox === lastPickedNumber || randomlyPickedBox === 0) {
      randomlyPickedBox = Math.floor(Math.random() * numberOfTargets) + 1;
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
    setScoreboard(false);
    setScore(0);
    setSessionStarted(true);
    newTarget();
  };

  //Stop Game Session
  const handleStopSession = () => {
    setSessionStarted(false);
    drawBoxes();
  };

  return (
    <>
      <div className='container'>
        <div className='game_ui-container'>
          <Header />
          <div className='game_controls'>
            <div className={!sessionStarted ? 'game_controls-group' : 'game_controls-group menu_inactive'}>
              {difficulty.map((mode, index) => (
                <TextButton
                  key={index}
                  name={mode.name}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  selected={mode.selected}
                  targets={mode.targets}
                  setNumberOfTargets={setNumberOfTargets}
                  setScoreboard={setScoreboard}
                />
              ))}
            </div>

            <div className='game_controls-group'>
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
              Timer: <span>{sessionTimer}</span>
            </div>

            <div className='game_score'>
              Score: <span>{score}</span>
            </div>
          </div>
          <div className='stats_container'></div>
          <div
            className='trainer_container'
            style={{
              gridTemplateColumns: `repeat(${Math.sqrt(numberOfTargets)}, 1fr)`,
              gridTemplateRows: `repeat(${Math.sqrt(numberOfTargets)}, 1fr)`,
            }}
          >
            {scoreboard && (
              <div className='trainer_scoreboard'>
                Your Score: <span>{score}</span>
              </div>
            )}

            {boxesArray.map((box) => (
              <Box
                key={box.index}
                index={box.index}
                random={box.random}
                targetClicked={newTarget}
                setScore={setScore}
                setSuccess={setSuccess}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
