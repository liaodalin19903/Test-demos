import { Engine, AirBags } from "./dependencies";


export class Car {
  public brand: string 
  public engine: Engine
  public airbugs: AirBags

  constructor(brand: string, 
    displacement: number, cylinder: number,
    count: number, delay: number
  ){
    this.brand = brand
    this.engine = new Engine(displacement, cylinder)    
    this.airbugs = new AirBags(count, delay)
  }
}

