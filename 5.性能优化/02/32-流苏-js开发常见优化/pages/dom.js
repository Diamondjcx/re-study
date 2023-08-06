import React,{useEffect} from 'react';
import styles from './dom.css';
import fastdom from "fastdom";
export default function Page() {
    // useEffect(() => {
    //     let cards = document.getElementsByClassName("card");
    //     const update = (timestamp) => {
    //         for (let i = 0; i <cards.length; i++) {
    //             let top = cards[i].offsetTop;
    //             cards[i].style.width = ((Math.sin(cards[i].offsetTop + timestamp / 100 + 1) * 500) + 'px')
    //         }
    //         window.requestAnimationFrame(update)
    //     }
    //     update(1000);
    // }, [])
    useEffect(() => {
        let cards = document.getElementsByClassName("card");
        const update = (timestamp) => {
            for (let i = 0; i < cards.length; i++) {
                fastdom.measure(() => {
                    let top = cards[i].offsetTop;
                    fastdom.mutate(() => {
                        cards[i].style.width =
                            Math.sin(top + timestamp / 100 + 1) * 500 + "px";
                    });
                });
            }
            window.requestAnimationFrame(update)
        }
        update(1000);
    }, [])
  return (
    <div>
      <h1 className={styles.title}>Page dom</h1>

        <div style={{display: 'flex', flexWrap: 'wrap'}} >
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
            <img className='card' src={'https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF'} width={200} height={200} style={{margin: 20}}/>
        </div>
    </div>
  );
}
