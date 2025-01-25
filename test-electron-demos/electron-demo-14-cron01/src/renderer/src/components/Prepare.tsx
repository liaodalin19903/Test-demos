import { M2RMsg } from '@shared/@types'
import React, { useEffect } from 'react'

export default function Prepare() {

  useEffect(() => {
    window.electron.ipcRenderer.on('m2r', (event, data: M2RMsg) => {
      console.log(data)
    })
  }, [])

  return (
    <></>
  )
}
