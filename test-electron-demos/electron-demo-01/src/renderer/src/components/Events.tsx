
import { M2RMsg } from '@shared/@types';
import React, { useEffect } from 'react'

export default function Events() {

  useEffect(() => {

    window.electron.ipcRenderer.on('m-r', (e, data: M2RMsg) => {
      console.log(data)
    })
  }, [])

  return (
    <>1122</>
  )
}
