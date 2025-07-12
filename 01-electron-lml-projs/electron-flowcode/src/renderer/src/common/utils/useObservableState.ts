import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';

type Listener<T> = (newValue: T, oldValue: T | undefined) => void;

/**
 * 创建可观察的状态，支持添加监听器
 */
function useObservableState<T>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const listeners = useRef<Listener<T>[]>([]);
  const prevValue = useRef<T>();

  // 状态变化时通知所有监听器
  useEffect(() => {
    listeners.current.forEach(listener => {
      listener(state, prevValue.current);
    });
    prevValue.current = state;
  }, [state]);

  // 添加/移除监听器的方法
  const subscribe = (listener: Listener<T>) => {
    listeners.current.push(listener);
    return () => {
      listeners.current = listeners.current.filter(l => l !== listener);
    };
  };

  return {
    state,
    setState,
    subscribe
  };
}

export default useObservableState;  
