import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data, { withCredentials: true })
      .then(response => {
        localStorage.setItem('userId', response.data.data._id);
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate(`/home/hotels`);
      })
      .catch(error => {
        console.log(error);
        toast.error("Login Failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  console.log(watch("example")); 

  return (
    <>
    
      <ToastContainer />

      
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email Id</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        {errors.email && <span className="text-white text-sm font-bold">This field is required</span>}

        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && <span className="text-white text-sm font-bold">This field is required</span>}

        <input
          className="w-full bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          type="submit"
          value="LOGIN"
        />
      </form>
    </>
  );
}
