import asyncio
import threading

def blocking_task():
    print("Blocking task running in thread:", threading.current_thread().name)
    import time
    time.sleep(5)
    print("Blocking task completed.")

async def async_task():
    print("Async task running in event loop:", asyncio.get_running_loop())
    await asyncio.sleep(2)
    print("Async task completed.")

async def main():
    loop = asyncio.get_running_loop()
    thread = threading.Thread(target=blocking_task)
    thread.start()
    await async_task()
    thread.join()

asyncio.run(main())
