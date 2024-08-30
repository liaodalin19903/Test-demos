import React, {forwardRef, useImperativeHandle} from 'react'
import { CAIDataType } from '@nts-wrap/types'


interface ClassInheritanceDiagramProps {
  type: 'Full' | 'Simple',
  cais: CAIDataType[]
}

const ClassInheritanceDiagram = forwardRef((props: ClassInheritanceDiagramProps, ref) => {

  useImperativeHandle(ref, () => ({
    // TODO：还未想到需要哪些方法
  }))

  return (
    <div>ClassInheritanceDiagram</div>
  )
})

export default ClassInheritanceDiagram


