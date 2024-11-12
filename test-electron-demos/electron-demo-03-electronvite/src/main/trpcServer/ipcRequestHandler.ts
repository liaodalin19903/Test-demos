import { AnyRouter, inferRouterContext } from '@trpc/server'
import { IpcRequest, IpcResponse } from '@shared/types'
import { resolveHTTPResponse as resolveResponse, HTTPRequest } from '@trpc/server/http'

export async function ipcRequestHandler<TRouter extends AnyRouter>(opts: {
  req: IpcRequest
  router: TRouter
  allowBatching?: boolean
  onError?: (o: { error: Error; req: IpcRequest }) => void
  endpoint: string
  createContext?: (params: { req: IpcRequest }) => Promise<inferRouterContext<TRouter>>
}): Promise<IpcResponse> {
  const createContext = async () => {
    return opts.createContext?.({ req: opts.req })
  }

  // adding a fake "https://electron" to the URL so it can be parsed
  const url = new URL('https://electron' + opts.req.url)
  const path = url.pathname.slice(opts.endpoint.length + 1)

  const res_req: HTTPRequest = {
    method: opts.req.method,
    query: opts.req.query,
    headers: opts.req.headers,
    body: opts.req.body
  }

  // HTTPRequest(
  //   url, {
  //     query: 1,
  //     method: opts.req.method,
  //     headers: opts.req.headers,
  //     body: opts.req.body,
  //   },

  // ),

  const response = await resolveResponse({
    req: res_req,
    createContext,
    path,
    router: opts.router,
    //allowBatching: opts.allowBatching,
    onError(o) {
      opts?.onError?.({ ...o, req: opts.req })
    },
    error: null
  })

  // 假设 headersObj 是一个对象，用于存储头部信息
  const headersObj: Record<string, string> = {};

  // 检查 response.headers 是否存在
  if (response.headers) {
    // 使用 entries() 方法获取可迭代的键值对
    for (const [key, value] of response.headers.entries()) {
      // 确保 value 是字符串
      if (typeof value === 'string') {
        headersObj[key] = value;
      } else if (Array.isArray(value)) {
        // 如果 value 是数组，选择第一个元素（或根据需要处理）
        headersObj[key] = value[0]; // 或者根据需求处理数组
      }
    }
  } else {
    console.warn("response.headers is undefined");
  }

  const body = response.body

  return {
    body: body,
    headers: headersObj,
    status: response.status
  }
}
