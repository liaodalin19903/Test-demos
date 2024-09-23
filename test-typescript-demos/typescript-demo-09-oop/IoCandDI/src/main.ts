
import { Car } from './car.normal'


import { AirBags, Engine } from './dependencies'

const engine =  new Engine(8, 1000)
const airbugs =  new AirBags(4, 30)

const car = new Car(
  'benzi',
  1, 1000,
  8, 10 
)