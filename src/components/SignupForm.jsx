import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const onSubmit = (data) => {
    axios.post(`${import.meta.env.VITE_BASE_URL}/user`,data).then(response=>{
      console.log('API Response:', response.data); // Log the entire response
      console.log(`USER ID========>${response.data._id}`);
      localStorage.setItem('userId', response.data._id);
      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate(`/home/hotels`);
    }).catch(error=>console.log(error))
  }


  console.log(watch("example"))


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
   <>
     <ToastContainer />
    <form onSubmit={handleSubmit(onSubmit)}>

<label htmlFor="username" className="block text-white text-sm font-bold mb-2">Name</label>
<input type="username" id="username" {...register("name", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"/>

<label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email Id</label>
            <input type="email" id="email" {...register("email", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"/>

            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" {...register("password", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline "/>
           
            <label htmlFor="cpassword" className="block text-white text-sm font-bold mb-2">Confirm Password</label>
            <input type="cpassword" id="cpassword" {...register("confirm_password", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline "/>
            
            <label htmlFor="mobilenumber" className="block text-white text-sm font-bold mb-2">Mobile Number</label>
            <input type="mobilenumber" id="mobilenumber" {...register("mobile_number", { required: true })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"/>



      <input className="w-full bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mb-4" type="submit" value={"SIGN UP"} />
    </form>
   </>
  )
}