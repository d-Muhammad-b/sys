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
                    <h1 className={styles.new}>Serverla</h1>
             <div className={styles.sections}>
              <Link to="/cs">cs 1.6</Link>  
              <Link to="/mine">Minecraft</Link>
              <Link to="/">WotBlits</Link>
             </div>

         


          {data&& data.map((d,i)=>{
            return  <div key={i} className={styles.yanglik}>
            <img src={d.img} alt="" />
            <div className={styles.t}>
            <h1>{d.name}</h1>
            <h2>{"turi : "+d.type}</h2>
            <h3>{"IP : "+d.ip}</h3>
            <h4>{d.info}</h4>
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