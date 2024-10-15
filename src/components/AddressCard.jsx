import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";


export default function AddressCart({ fromCart }) {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {
    const body = {
        ...data,
        user_id: userId    
    }
axios.post(`${import.meta.env.VITE_BASE_URL}/address`,body).then(response=>{
  if(fromCart===true){
    navigate(`/home/cart`)
  }else{
    navigate(`/home/profile`)
  }

  }).catch(error=>console.log(error))
  }


  console.log(watch("example")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div className="mb-2 px-36 py-2">
            <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Name</label>
            <input type="name" id="name" {...register("name", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="flatno" className="block text-black text-sm font-bold mb-2">Flat no</label>
            <input type="flatno" id="flatno" {...register("flat_no", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="area" className="block text-black text-sm font-bold mb-2">Area</label>
            <input type="area" id="area" {...register("street", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="Landmark" className="block text-black text-sm font-bold mb-2">Landmark</label>
            <input type="Landmark" id="Landmark" {...register("land_mark", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
         <div className='flex'>
         <div className="mb-2 px-36 py-2">
            <label htmlFor="city" className="block text-black text-sm font-bold mb-2">Town/City</label>
            <input type="city" id="city" {...register("city", { required: true })} className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-4 py-2">
            <label htmlFor="state" className="block text-black text-sm font-bold mb-2">State</label>
            <input type="state" id="state" {...register("state", { required: true })} className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
         </div>
         <div className="flex items-center justify-between py-2 px-36">
         <input className="w-[70rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value={"Save"}/>
            </div>
    </form>
  )
}