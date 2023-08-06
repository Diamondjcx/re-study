import React from 'react';
import styles from './react-window.css';


import { FixedSizeList } from 'react-window';
/**
 * 每个列表项的组件
 * @param index：列表项的下标；style：列表项的样式（此参数必须传入列表项的组件中，否则会出现滚动到下方出现空白的情况）
 **/
const Row = ({ index, style }) => (
    <div style={style}>Row {index}</div>
);

const Example = () => (
    <FixedSizeList
        height={150} // 列表可视区域的高度
        itemCount={10000} // 列表数据长度
        itemSize={35} // 列表行高
        //列表可视区域的宽度
    >
        {Row}
    </FixedSizeList>
);

const Example2 = () => {
    return new Array(10000).fill(0).map((_, index) => {
        return <div>Row {index}</div>
    })
}

export default function Page() {
  return (
    <div style={{height: 300, overflow: 'auto'}}>
      <Example/>
        {/*<Example2/>*/}
    </div>
  );
}
