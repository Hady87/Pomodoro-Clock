import { createContext, useState, useEffect } from "react";

const ClockContext = createContext();

export const ClockCProvider = ({ children }) => {
  const [breakLength, setBreakLenth] = useState(5);
  const [sessionLength, setSessionLenth] = useState(25);
  const [sec, setSec] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [play, setPlay] = useState(false);

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

  const handlePlay = () => {
    setPlay(true);
  };
const handleStop = () => {
    setPlay(false);
  };
  return (
    <ClockContext.Provider
      value={{
        breakLength,
        sessionLength,
        sec,
        minutes,
        play,
        timer,
        boxClass,
        incrementBreack,
        decrementBreack,
        incrementSession,
        decrementSession,
        refresh,
        countdown,
        decimalFormat,
        handlePlay,
        handleStop,
      }}
    >
      {children}
    </ClockContext.Provider>
  );
};
export default ClockContext;
