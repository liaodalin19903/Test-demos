import { Store } from './index'

/** util */
const initUserId = async (): Promise<Store['userId']> => {
    const fetchUserId = async(): Promise<Store['userId']> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return new Promise((resolve, _reject) => {
        setTimeout(() => {
          const userId = '222';
          resolve(userId);
        }, 1000);
      })
    }
  
    const userId = await fetchUserId()
    return userId 
  }
/** util */
  
  
interface StateSetters {
  setUserId: ((arg0: Store['userId']) => void);
  setStateA: ((arg0: string) => void);
  setStateB: ((arg0: number) => void);
}

export const initStates = async (
  setters: Partial<StateSetters>
) => {

  if (setters.setUserId) {
      const userId = await initUserId();
      setters.setUserId(userId);
  }

  if (setters.setStateA) {
      setters.setStateA('123');
  }

  if (setters.setStateB) {
      setters.setStateB(123);
  }
};