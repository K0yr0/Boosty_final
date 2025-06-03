
import { useState, useEffect, useRef } from 'react';

interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  currentCycle: number;
  lastUpdated: number;
}

export const usePersistentTimer = (squadId: number | null) => {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const STORAGE_KEY = `pomodoro_timer_${squadId}`;

  // Load timer state from localStorage
  useEffect(() => {
    if (squadId) {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const state: TimerState = JSON.parse(savedState);
        const timePassed = Math.floor((Date.now() - state.lastUpdated) / 1000);
        
        if (state.isRunning) {
          const newTimeRemaining = Math.max(0, state.timeRemaining - timePassed);
          setPomodoroTime(newTimeRemaining);
          setIsRunning(newTimeRemaining > 0);
          setCurrentCycle(state.currentCycle);
        } else {
          setPomodoroTime(state.timeRemaining);
          setIsRunning(false);
          setCurrentCycle(state.currentCycle);
        }
      }
    }
  }, [squadId]);

  // Save timer state to localStorage
  const saveTimerState = (running: boolean, time: number, cycle: number) => {
    if (squadId) {
      const state: TimerState = {
        isRunning: running,
        timeRemaining: time,
        currentCycle: cycle,
        lastUpdated: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  };

  // Timer logic
  useEffect(() => {
    if (isRunning && pomodoroTime > 0) {
      intervalRef.current = setInterval(() => {
        setPomodoroTime(prev => {
          const newTime = prev - 1;
          saveTimerState(true, newTime, currentCycle);
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, pomodoroTime, currentCycle, squadId]);

  // Handle timer completion
  useEffect(() => {
    if (pomodoroTime === 0 && isRunning) {
      setIsRunning(false);
      setPomodoroTime(25 * 60);
      setCurrentCycle(prev => prev + 1);
      saveTimerState(false, 25 * 60, currentCycle + 1);
    }
  }, [pomodoroTime, isRunning, currentCycle]);

  const startTimer = () => {
    setIsRunning(true);
    saveTimerState(true, pomodoroTime, currentCycle);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    saveTimerState(false, pomodoroTime, currentCycle);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setPomodoroTime(25 * 60);
    setCurrentCycle(1);
    if (squadId) {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    pomodoroTime,
    isRunning,
    currentCycle,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
