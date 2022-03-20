import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaPlay, FaStop } from "react-icons/fa";

function MainComponent() {
  const [breakLength, setBreakLenth] = useState(5);
  const [sessionLength, setSessionLenth] = useState(25);
  const [sec, setSec] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(true);
  const [timer, setTimer] = useState("Session");

  const boxClass = minutes < 1 ? "boxTimerWarning" : "boxTimer";

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        countdown();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  const incrementBreack = () => {
    if (breakLength < 60 && !play) {
      setBreakLenth((prev) => prev + 1);
    }
  };
  const decrementBreack = () => {
    if (breakLength > 1 && !play) {
      setBreakLenth((prev) => prev - 1);
    }
  };
  const incrementSession = (e) => {
    e.stopPropagation();
    if (sessionLength < 60 && !play) {
      setSessionLenth((prev) => prev + 1);
      if (timer === "Session") {
        setMinutes(sessionLength + 1);
        setSec(0);
      }
    }
  };
  const decrementSession = (e) => {
    e.stopPropagation();
    if (sessionLength > 1 && !play) {
      setSessionLenth((prev) => prev - 1);
    }
    if (timer === "Session" && sessionLength > 1) {
      setMinutes(sessionLength - 1);
      setSec(0);
    }
  };
  const refresh = () => {
    setSessionLenth(25);
    setBreakLenth(5);
    setMinutes(25);
    setSec(0);
    setTimer("Session");
    setPlay(false);
  };
  const countdown = () => {
    if (sec === 0) {
      if (minutes === 0) {
        const audio = document.getElementById("bip");

        setTimeout(() => {
          audio.play();
        }, 100);

        setMinutes(breakLength);
        if (timer === "Session") {
          setTimer("Break");
        }
        if (timer === "Break") {
          setTimer("Session");
        }
      } else {
        setSec(59);
        setMinutes(minutes - 1);
      }
    } else setSec(sec - 1);
  };
  const decimalFormat = (deci) => {
    deci = deci < 10 ? "0" + deci : deci;

    return deci;
  };

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
            <FaPlay
              className="iconClass"
              size={25}
              onClick={() => setPlay(true)}
            />{" "}
            <FaStop
              className="iconClass "
              size={25}
              onClick={() => setPlay(false)}
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
