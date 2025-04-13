import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const LoginModal = () => {
  const navigate = useNavigate();
  const { showLoginModal, setShowLoginModal, setIsAuthenticated, setUser } = useAuth();
  const [btnText, setBtnText] = useState('Login');
  const [isSignin, setIsSignIn] = useState(true)
  const modalRef = useRef();
  const [formValue, setFormValue] = useState({name: '', phone: '', email: '', password: '', resume: ''});

  const handleChange = (event)=>{
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  }

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      navigate('/')
      setShowLoginModal(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setFormValue({ ...formValue, resume: reader.result.split(',')[1] });
  }

  const handleLogin = () => {
    const user = {
    
      "name": "shubham kumar",
      "email": "krsubam4u@gmail.com",
      "phone": "7254050024",
      "password": "$2b$10$ujmwY1ibPInXANRhyCdlfujzAb7x.9yp2Cb6tyn21HHj8.nRFeZYu",
      "favorites":  ['1738563928','1738558322', '1738556369' ] 
    }
    console.log(formValue);
    setUser(user)
    setBtnText(user.name.trim().split(" ").map(word => word[0]).slice(0,2).join(""))
    setIsAuthenticated(true)
    setShowLoginModal(false);

  }

  const handleSignup =async() => {
    try {
      const response = await axios.post('http://localhost:5000/register', formValue)
      console.log(response.data);
      toast.success(" User created successfully");
      setIsAuthenticated(true);
      localStorage.setItem('isLogin', true);
      setUser(formValue)
      console.log();
      
      setTimeout(()=>{
        setShowLoginModal(false);
      }, 3000);
      // setShowLoginModal(false);
      } catch (error) {
        toast.error(error.message)
        }
  }



  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur" onClick={handleOverlayClick}>
      <ToastContainer/>
      <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="bg-white p-8 rounded-lg shadow-lg relative min-w-84">

        <button className="absolute top-0 right-0 bg-transparent px-4 py-4 font-semibold text-2xl rounded text-blue-600/70 hover:text-red-600" onClick={() => {
          setShowLoginModal(false)
          navigate('/')
        }}>X</button>
        <div>
          <h2 className="text-xl font-bold ">{isSignin ? "Create Your Account" : "Welcome Back "}</h2>
          <p className="inline text-xsm font-mono font-semibold text-black/60">{isSignin ? "Already have a account ?" : "New user ?"}</p>
          <span className='px-4 text-blue-600 font-semibold cursor-pointer hover:underline' onClick={() => setIsSignIn(!isSignin)}>{isSignin ? "login" : "Register now"}</span>
        </div>

        <form className="mt-6 " onSubmit={(e)=>e.preventDefault()}>
          {
            isSignin && (
              <div className="flex flex-col space-y-4">
                <label htmlFor="nam" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                <input type="text" id="nam" className="w-full p-2 border border-gray-400 rounded mb-4 outline-none focus:border-2 focus:border-blue-600" value={formValue.name} onChange={(e)=> setFormValue({...formValue, name: e.target.value})}  />
              </div>
            )
          }
          <div className="flex flex-col space-y-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
            <input type="email" id="email" className="w-full p-2 border border-gray-400 rounded mb-4 outline-none focus:border-2 focus:border-blue-600" value={formValue.email} onChange={(e)=>setFormValue({...formValue, email: e.target.value})} />
          </div>
          {
            isSignin && (
              <div className="flex flex-col space-y-4">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                <input type="tel" id="phone" className="w-full p-2 border border-gray-400 rounded mb-4 outline-none focus:border-2 focus:border-blue-600 " value={formValue.phone} onChange={(e)=>setFormValue({...formValue, phone: e.target.value})} />
              </div>
            )
          }
          <div className="flex flex-col space-y-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
            <input type="password" id="password" className="w-full p-2 border border-gray-400 rounded mb-4 outline-none focus:border-2 focus:border-blue-600" value={formValue.password} onChange={(e)=>setFormValue({...formValue, password: e.target.value})} />
          </div>
          {
            isSignin && (
              <div className="flex flex-col space-y-4">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Resume</label>
                <input type="file" accept=".pdf" onChange={handleFileUpload}  className="w-full p-2 border border-gray-400 rounded mb-4 outline-none focus:border-2 focus:border-blue-600 " />
              </div>
            )
          }
          {
            isSignin ? (
              <div className="flex flex-col space-y-4">
                <button onClick={handleSignup} className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded">Register</button>
              </div>
            ):
            (
              <div className="flex flex-col space-y-4">
                <button onClick={handleLogin} className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded">Login</button>
              </div>
            )
          }
   </form>
  



      </div>
    </div>
  );
};

export default LoginModal;
