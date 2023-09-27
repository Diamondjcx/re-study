import React,{useState, useRef, useMemo} from 'react';
import styles from './svg.css';

const RECT = 'rect'
const offset = {
  x:0,
  y: 0
}
function sleep(time) {
  let start = new Date().getTime()
  while (new Date().getTime()-start <time) {}
}
// diff算法里，比较
// 收集更新的阶段 - （同步代码的阶段）
// key相同， 就不做更新-react的优化
const Header = ({data}) => {
  console.log('header render')
  return (
    <div>header</div>
  )
}
const Footer = ({data}) => {
  console.log('footer render')
  return (
    <div>footer</div>
  )
}

const MemoShape = ({item}) => {
  useMemo(() => {
    if(item.type=== RECT){
      return <rect
        key={item.id}
        x={item.x}
        y={item.y}
        width={item.width}
        height={item.height}
        fill='transparent'
        stroke={picked === item.id ? 'red' : 'black'}
        onMouseDown={e => {
          setPicked(item.id)
          offset.x = e.pageX - item.x
          offset.y = e.pageY - item.y
        }}
      />
    }
  }, Object.values(item))
  return
}

const Box =({data, setData, picked, setPicked}) => {
  const [id, setId] = useState(0)
  const update = () => {
    setId(id+1)
  }
  const nodes = data.map((item, index) => {
    return <MemoShape item={item}/>
  })
  return (
    <svg
      style={{border: '1px solid black'}}
      width={1000}
      height={800}
      onMouseUp={e => {
        setPicked('')
        let x = e.pageX
        let y = e.pageY
        // sleep(11)
        setData
      }}
      onMouseMove={e => {
        let elementIndex = data.findIndex(item => item.id === picked)
        if(elementIndex === -1) {
          return;
        }
        let x = e.pageX
        let y = e.pageY
        sleep(5)
        data[elementIndex].x = x - offset.x
        data[elementIndex].y = y - offset.y
        update()
      }}
    >
      {nodes}
    </svg>
  )
}

const getId = () => {
  return Math.random() + '-'+  new Date().getTime()
}
export default function Page() {
  const [data, setData] = useState([
    {
      type: RECT,
      x: 220,
      y: 20,
      width: 50,
      height: 20,
      id: getId()
    },
    {
      type: RECT,
      x: 220,
      y: 20,
      width: 50,
      height: 20,
      id: getId()
    }
  ])
  const [picked,setPicked] = useState('')

  return (
    <div>
      <Header data={data}/>
      <Box data={data} setData={setData} picked={picked} setPicked={setPicked}/>
      <div>
        <button>添加矩形</button>
      </div>
      <Footer data={data}/>

    </div>
  );
}
