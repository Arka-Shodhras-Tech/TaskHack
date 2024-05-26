import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import hackthonImg from './hacthonimg.jpg'
import './main.css';
import { Button } from '@chakra-ui/react';
const Hackathon = () => {
  const Login=()=>{
    window.location.href='home'
  }
  const Register=()=>{
    window.location.href="register"
  }
  return (
    <div className='main'>
      <div className='imgdiv'>
        <img className='hacthonimg' src={hackthonImg} />
      </div>
      <div className='hacthongrid'>
        <div className='hacthonlist'>
          <SimpleGrid minChildWidth='220px' spacing='40px'>
            <Button>Register</Button>
            <Button onClick={Login}>Login</Button>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export default Hackathon;
