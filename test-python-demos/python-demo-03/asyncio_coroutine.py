import asyncio

async def my_coroutine():
    print("Coroutine started.")
    await asyncio.sleep(1)
    print("Coroutine finished after sleep.")

async def main():
    loop = asyncio.get_event_loop()
    # 将协程函数注册到事件循环
    loop.create_task(my_coroutine())
    print("Main function continues while coroutine is running.")
    await asyncio.sleep(1)
    print("Main function finished.")

asyncio.run(main())