import './App.css';
import { useEffect, useState } from 'react';
import MapView from './components/Map/MapView'
import { Card, Header, Loading } from './components';
import { getData, getIpPublic } from './services/ipService';
import { AxiosError } from 'axios';

function App() {

  // VARIABLES
  const [init,setInit] = useState(false);
  const [ip, setIp] = useState("");
  const [data,setData] = useState<DataDTO|null>(null);
  const [error,setError] = useState("");

  // METODO DE SERVICIO
  const service = async() =>{
    try{
      if(!init){
        setTimeout(async()=>{
          const ip = await getIpPublic();
          setIp(ip);
          setInit(true);
        },3000)
      }
      if(ip){
        const data = await getData(ip);
        console.log(data);
        if(data){setData(data)}
      }

    }catch(error){
      if(error as AxiosError){
        setError("Error del servidor")
        console.log("Error: ",error)
      }
    }
  }

  useEffect(()=>{
    service();
  },[ip])
  
  return (
    <div className="container">
      {data || error ? 
        (
          <>
            <Header setIp={setIp} ip={ip}/>
            <MapView data={data}/>
            <Card data={data}/>
          </>
        ) : (
          <Loading/>
        )
      }
    </div>
  )
}

export default App
