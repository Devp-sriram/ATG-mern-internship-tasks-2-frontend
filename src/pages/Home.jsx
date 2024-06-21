import React , { useEffect , useState} from 'react'
import { Container , Button} from 'react-bootstrap'
import "../styles/Home.css";
import Update from './Update'
import axios from 'axios'
import API_URL from '../../config/global';


const Home = () => {
const [res , setRes]  = useState({})



useEffect(()=>{
     const user =JSON.parse(localStorage.getItem('userInfo')); 
     if(user && user.token){
          getData(user.token)
     }
},[]);

     const getData = async (token)=>{
          try{
               const config = {
                    headers:{
                         authorization : token
                    }
               }
          const response = await axios.get(`${API_URL}/home`, config); 
          console.log(response);

          if(response.data === 'Invalid Token'){
               alert("Please Login Again");
          // }else if(response.data ='server busy'){
          //      alert("get data server busy")
          }else if(response?.status){
               setRes(response.data)
               alert('login sucessfully')
          }
          }catch(e){
               console.log(e)
         
     }};
   

  return (
     <>
     <nav className='w-full flex justify-end border-2 border-gray-300 p-5 rounded-2xl'>
     
          <div>
               <h1>Welcome {res.name}</h1>
          </div>
     
     </nav>
     
   <Update/>
   </>


  )};

export default Home