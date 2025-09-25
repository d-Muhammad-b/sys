import { useState } from 'react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import styles from './mine.module.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Mine() {
   const [data,setData]=useState(null);
   const [alldata,setAllData]=useState(null);
   
   function changeType(e){

    if(e.target.value=="All"){
      setData(alldata)
    }else{

      const d=alldata.filter(a=> a.type==e.target.value);
      setData(d)
    }
   }

   function getData(){
    try {
      fetch("https://682815d56b7628c52912205f.mockapi.io/sys")
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        setData(data.filter(d=> d.game=="minecraft"));
        setAllData(data.filter(d=> d.game=="minecraft"));
        
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
             <select onChange={changeType}>
              <option value="All">All</option>
              <option value="survival">survival</option>
              <option value="pvp">pvp</option>
              <option value="anarchy">anarchy</option>
              <option value="battle_royale">battle_royale</option>
             </select>

         


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

export default Mine