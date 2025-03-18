import { Progress } from 'antd'
import './index.less'

const MyNode = () => {

  return (
    <div className="react-node">
      <Progress type="circle" percent={30} size={80} />
    </div>
  )
}

export default MyNode