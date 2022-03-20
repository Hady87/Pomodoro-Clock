import React, { useContext } from "react";
import { FaArrowUp, FaArrowDown, FaPlay, FaStop } from "react-icons/fa";
import ClockContext from "../context/ClockContext.js";

function MainComponent() {
  const {
    breakLength,
    sessionLength,
    sec,
    minutes,
    timer,
    setPlay,
    boxClass,
    incrementBreack,
    decrementBreack,
    incrementSession,
    decrementSession,
    refresh,
    handlePlay,
    handleStop,
    decimalFormat,
  } = useContext(ClockContext);
  return (
    <>
      <div className="container w-75">
        <h1>25 + 5 Clock</h1>
        <div className="row ">
          <div className=" col-xs-8 col-sm-4 text-nowrap mx-auto  gy-5  text-center mx-auto">
            <h2>Break Length</h2>

            <FaArrowUp
              className="iconClass"
              size={25}
              onClick={incrementBreack}
            />
            <span>{breakLength}</span>
            <FaArrowDown
              className="iconClass"
              size={25}
              onClick={decrementBreack}
            />
          </div>

          <div className=" col-xs-6 col-sm-4 text-nowrap  gy-5 text-center mx-auto">
            <h2>Session Length</h2>

            <FaArrowUp
              className="iconClass"
              size={25}
              onClick={incrementSession}
            />
            <span>{sessionLength}</span>
            <FaArrowDown
              className="iconClass"
              size={25}
              onClick={decrementSession}
            />
          </div>
        </div>
        <div className="row ">
          <div className="  col-8 text-nowrap  gy-5 text-center mx-auto">
            <div className={boxClass}>
              <h2>{timer}</h2>
              <span>
                {decimalFormat(minutes)}:{decimalFormat(sec)}
              </span>
            </div>
          </div>
          <div className=" col-8  text-nowrap  text-center mx-auto">
            <FaPlay className="iconClass" size={25} onClick={handlePlay} />{" "}
            <FaStop
              className="iconClass "
              size={25}
              onClick={handleStop}
            />
            <i className="fa fa-refresh iconClass m-3 " onClick={refresh}></i>
          </div>
        </div>
        <audio
          id="bip"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    </>
  );
}

export default MainComponent;
