import { useState } from 'react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import styles from './cs.module.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Cs() {
   const [data,setData]=useState(null);


   function getData(){
    try {
      fetch("https://682815d56b7628c52912205f.mockapi.io/sys")
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        setData(data.filter(d=> d.game=="cs"));
        
      })
    } catch (error) {
      console.log(error);
      
    }
   }
  useEffect(()=>{
    getData()
  },[]);
  return (
    <div>
        <Header></Header>
        <main className={styles.container}>
          <section className={styles.newnews}>
             <h1 className={styles.new}>Counter-Strike</h1>
           <div className={styles.sections}>
            <Link to="/cs">Counter-Strike</Link>  
            <Link to="/mine">Minecraft</Link>
            <Link to="/">ortga qaytish</Link>
           </div>

          {data&& data.map((d,i)=>{
            return  <div key={i} className={styles.yanglik}>
            <img src={d.img} alt="" />
            <div className={styles.t}>
            <h1>{d.name}</h1>
            <h3><b>turi : </b>{d.type}</h3>
            <h3>{d.info}</h3>
            <h3><b>IP : </b>{d.ip}</h3>
            </div>
            </div>
            
          })}
          </section>
             
        </main>
        <Footer></Footer>
    </div>
  )
}

export default Cs