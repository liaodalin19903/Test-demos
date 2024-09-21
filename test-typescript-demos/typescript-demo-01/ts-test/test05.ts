const initUserId = async (): Promise<string> => {
    const fetchUserId = async(): Promise<string> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return new Promise((resolve, _reject) => {
        setTimeout(() => {
          const userId = '222';
          resolve(userId);
        }, 1000);
      })
    }
  
    const userId = await fetchUserId()
    return userId 
  }

initUserId().then(res => {
    console.log(res)
})

const res = await initUserId()

console.log(res)

export {}

