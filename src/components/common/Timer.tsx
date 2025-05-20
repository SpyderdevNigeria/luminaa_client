import { useRef, useState, useEffect } from "react";

type TimerProps = {
  clearTimer: () => void;
  registerInterval: (id: number) => void;
  id: unknown;
  onExpire?: () => void; // ✅ new optional callback
};

export const Timer = ({ clearTimer, registerInterval, id, onExpire }: TimerProps) => {
  const Ref = useRef<number | null>(null);
  const [timer, setTimer] = useState("02:00");

  const getTimeRemaining = (e: Date) => {
    const total = e.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: Date) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearTimer?.();
      if (Ref.current !== null) {
        clearInterval(Ref.current);
        Ref.current = null;
      }
      onExpire?.(); // ✅ notify parent
    }
  };

  const clearTimerInternal = (e: Date) => {
    setTimer("02:00");

    if (Ref.current) clearInterval(Ref.current);
    const intervalId = window.setInterval(() => {
      startTimer(e);
    }, 1000);

    registerInterval?.(intervalId);
    Ref.current = intervalId;
  };

  const getDeadTime = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };

  useEffect(() => {
    clearTimerInternal(getDeadTime());
  }, [id]);

  return (
    <div className="App">
      <h5 className="reset-password-otp-resend2">{timer}</h5>
    </div>
  );
};
