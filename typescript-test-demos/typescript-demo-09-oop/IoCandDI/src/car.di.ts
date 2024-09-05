import { Engine, AirBags } from './dependencies'

export class Car {
  public brand: string 
  public engine: Engine
  public airbugs: AirBags

  constructor(
    brand: string, 
    engine: Engine,  // 直接参数是已经构造好的对象
    airbags: AirBags
  ){
    this.brand = brand
    this.engine = engine
    this.airbugs = airbags
  }
}
