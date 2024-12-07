import axios from "axios";

const API = "https://geo.ipify.org/api/v2/country,city?apiKey=at_dnVCi3KX2P5sim6RTNvmvSQ7r92CA&ipAddress=";
const IP_PUBLIC = "https://api.ipify.org?format=json";

const getIpPublic = async()=>{
  try{
    const response = await axios.get(IP_PUBLIC);
    const ip = response.data.ip;
    return ip;

  }catch(error){
    return error;
  }
}

const getData = async(ip:string) =>{
  try{
      const response = await axios.get(`${API}${ip}`)
      const data = response.data
      return data;

  }catch(error){
    return error;
  }
}

export {getIpPublic,getData}