class Singleton {
  private static instance: Singleton;
  private _temperature: number;
  private constructor() { }
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
      Singleton.instance._temperature = 0;
    }
    return Singleton.instance;
  }
  get temperature(): number {
    return this._temperature;
  }
  set temperature(score) {
    this._temperature = score;
  }
  increaseTemperature(): number {
    return this._temperature += 1;
  }
  decreaseTemperature(): number {
    return this._temperature -= 1;
  }
}
const myInstance = Singleton.getInstance();
console.log(myInstance.temperature); // 0


