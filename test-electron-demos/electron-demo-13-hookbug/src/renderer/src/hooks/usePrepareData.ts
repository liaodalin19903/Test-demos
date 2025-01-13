import { useEffect } from "react";

import { useStore } from '../common/store'

export const usePrepareData = (): string[] => {

  const { projs } = useStore()

  useEffect(() => {
    //console.log(projs)

    console.log('exe: usePrepareData')
  }, [])


  return ['1', '2', '3']
}
