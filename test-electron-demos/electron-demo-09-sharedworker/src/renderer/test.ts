import { EventEmitter } from 'events'
import { BrowserWindow } from 'electron' // 假设你使用的是 Electron

const events = ['EVENT_A', 'EVENT_B', 'EVENT_C']

interface IMappedWindow {}

interface IEventSubscribedWindows {}

class WindowsManager extends EventEmitter {
  private mapWindows: IMappedWindow = {}
  private eventSubscribedWindows: IEventSubscribedWindows = {}

  constructor() {
    super()

    // 初始化事件订阅对象
    events.forEach((event) => {
      this.eventSubscribedWindows[event] = []
    })
  }

  // 订阅事件
  subscribe(event: string, window: BrowserWindow): void {
    if (events.includes(event)) {
      if (!this.eventSubscribedWindows[event].includes(window)) {
        this.eventSubscribedWindows[event].push(window)
        this.on(event, (...args) => this.notify(event, ...args))
      }
    } else {
      console.error(`Event ${event} is not supported.`)
    }
  }

  // 发布事件
  notify(event: string, ...args: unknown[]): void {
    if (this.eventSubscribedWindows[event]) {
      this.eventSubscribedWindows[event].forEach((window: BrowserWindow) => {
        // 这里你可以根据 window 对象执行一些操作，例如发送消息等
        console.log(`Window subscribed to ${event} received notification with args:`, args)

        // 发送消息给渲染进程
        window.webContents.send(event, ...args)
      })
    } else {
      console.error(`No subscribers for event ${event}.`)
    }
  }
}
