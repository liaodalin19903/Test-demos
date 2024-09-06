import { Container } from 'inversify'
import { ConfigService } from '../db/service/config.service'
//import { IConfig } from '../db/interfaces/interfaces'
import { IConfig } from '@main/'

const container = new Container()
container.bind<IConfig>(IConfig).to(ConfigService)

export { container }
