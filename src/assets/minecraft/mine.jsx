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
                    <h1 className={styles.new}>Minecraft</h1>
             <div className={styles.sections}>
              <Link to="/cs">Counter-Strike</Link>  
              <Link to="/mine">Minecraft</Link>
              <Link to="/">ortga qaytish</Link>
             </div>
             <select onChange={changeType}>
              <option value="All">Xammasi</option>
              <option value="survival">omon qolish</option>
              <option value="pvp">pvp</option>
              <option value="anarchy">anarhiya</option>
              <option value="battle_royale">battle_royale</option>
             </select>

         


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

export default Mine