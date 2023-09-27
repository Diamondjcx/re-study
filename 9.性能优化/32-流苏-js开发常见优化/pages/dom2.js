import React,{useEffect} from 'react';
import styles from './dom2.css';

export default function Page() {
  useEffect(() => {
    let start1 = performance.now()
    for (let i=0;i<10000;i++){
      let p = document.createElement('p')
      p.innerHTML = i
      document.body.appendChild(p)
    }
    let end1 = performance.now()
    console.log(end1 - start1)
  }, [])

  //
  // useEffect(() => {
  //   let start1 = performance.now()
  //   let fragment = document.createDocumentFragment()
  //   for (let i=0;i<100000;i++){
  //     let p = document.createElement('p')
  //     p.innerHTML = i
  //     fragment.appendChild(p)
  //   }
  //   document.body.appendChild(fragment)
  //   let end1 = performance.now()
  //   console.log(end1 - start1)
  // }, [])
  return (
    <div>
      <h1 className={styles.title}>Page dom2</h1>
    </div>
  );
}
