import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material'; 
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    setLoading(true); 
    axios.post(`${import.meta.env.VITE_BASE_URL}/user`, data)
      .then(response => {
        localStorage.setItem('userId', response.data._id);
        toast.success("Sign-up Successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate(`/home/hotels`);
      })
      .catch(error => {
        console.error(error);
        toast.error("Sign-up Failed!", {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="username" className="block text-white text-sm font-bold mb-2">Name</label>
        <input 
          type="text" 
          id="username" 
          {...register("name", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />

        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email Id</label>
        <input 
          type="email" 
          id="email" 
          {...register("email", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />

        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
        <input 
          type="password" 
          id="password" 
          {...register("password", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="cpassword" className="block text-white text-sm font-bold mb-2">Confirm Password</label>
        <input 
          type="password" 
          id="cpassword" 
          {...register("confirm_password", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="mobilenumber" className="block text-white text-sm font-bold mb-2">Mobile Number</label>
        <input 
          type="text" 
          id="mobilenumber" 
          {...register("mobile_number", { required: true })} 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
        />

     
        {loading ? (
          <div className="flex justify-center mt-4 mb-4">
            <CircularProgress />
          </div>
        ) : (
          <input 
            className="w-full bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mb-4" 
            type="submit" 
            value="SIGN UP" 
          />
        )}
      </form>
    </>
  );
}
