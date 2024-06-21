//hooks
import React ,{ useState} from 'react';
import { useNavigate } from "react-router-dom";
//styles
import {Container,Form, Button} from "react-bootstrap";
import "../styles/Login.css";
//dependencies
import axios from 'axios'
import API_URL from '../../config/global';


const Login = () => {
    const [formData, setFormData] =useState({
        email:"",
        password:"",
});
const navigate = useNavigate();

const handleChange = (e) => {
    const{name,value}=e.target
    setFormData({...formData,[name]:value});
};

const handleSubmit = async (e) =>{
        e.preventDefault();
        try{const response = await axios.post(`${API_URL}/login`, formData); 
        console.log(response);
        if(response.data === 'invalid username or password'){
            alert('Invalid Credentials')
        }else if(response.data === 'function server busy'){
            alert('not comfirmed user ');
        }else if(response.data === 'error occur while auth - user'){
            alert('make sure to click the link on email');
        }else if(response?.status){
        localStorage.setItem("userInfo" , JSON.stringify(response.data));
        navigate("/home")}
        }catch(error){
            console.log(error)
        }}

     
  return (
    <Container>
    <h1>Login </h1>
    <Form onSubmit={handleSubmit}>
         <Form.Group>
             <Form.Label>Email</Form.Label>
             
             <Form.Control 
             type ="email" 
             name="email" 
             value ={formData.email} 
             onChange = {handleChange} 
             required >
             </Form.Control>
         </Form.Group>

         <Form.Group>
             <Form.Label>Password</Form.Label>
             <Form.Control 
             type ="password" 
             name="password" 
             value ={formData.password} 
             onChange = {handleChange} 
             required >
             </Form.Control>
         </Form.Group>
     <Button variant='primary' type = "submit">
         Login
     </Button>
     <a 
     onClick={()=>navigate('/ForgotPassword')}
     className='cursor-pointer ml-64 text-blue-700'
    >Forgot Password</a>
     <p className='mt-5'>Users who activate their account by clicking the link in the email will be able to log in.</p>
     </Form> 
  </Container>
);
}

export default Login;