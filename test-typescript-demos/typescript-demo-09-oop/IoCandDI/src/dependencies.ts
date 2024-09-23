export class AirBags {
  public count: number
  public delay: number 

  constructor(count: number, delay: number) {
    console.log(`construct ${count} airbags`) 

    this.count = count
    this.delay = delay
  }

  deploy(event: string) {
    console.log(`${this.count} Airbag deployed ${event}`)
  }
}


export class Engine {
  public displacement: number
  public cylinder: number 
  public status: 'started' | 'stoped' = 'stoped'

  constructor(displacement: number, cylinder: number) {
    
  }
}