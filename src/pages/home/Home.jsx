import { useState } from 'react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import styles from './home.module.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Info from '../../components/info/info';


function Home() {
   const [data,setData]=useState(null);


   function getData(){
    try {
      fetch("https://682815d56b7628c52912205f.mockapi.io/sys")
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        setData(data);
        
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


             <div className={styles.sections}>
              <Link to="/cs">Counter-Strike</Link>  
              <Link to="/mine">Minecraft</Link>
              <Link to="/">Ortga qaytish</Link>
             </div>
               
               
               <Info></Info>

{/*                
          <h1 className={styles.new}>Serverla</h1>
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
          })} */}

          </section>

        </main>

        <Footer></Footer>
    </div>
  )
}

export default Home