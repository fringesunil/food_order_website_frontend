import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";


export default function EditaddressCard(props) {
    const address=props.useraddress
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {
    axios.patch(`${import.meta.env.VITE_BASE_URL}/address/${address._id}`,data).then(response=>{
        navigate(`/home/profile/address`)
      }).catch(error=>console.log(error))
   
  }


  console.log(watch("example")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div className="mb-2 px-36 py-2">
            <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Name</label>
            <input defaultValue={address.name} type="name" id="name" {...register("name", )} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="flatno" className="block text-black text-sm font-bold mb-2">Flat no</label>
            <input defaultValue={address.flat_no} type="flatno" id="flatno" {...register("flat_no",)} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="area" className="block text-black text-sm font-bold mb-2">Area</label>
            <input defaultValue={address.street} type="area" id="area" {...register("street",)} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="Landmark" className="block text-black text-sm font-bold mb-2">Landmark</label>
            <input defaultValue={address.land_mark} type="Landmark" id="Landmark" {...register("land_mark", )} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
         <div className='flex'>
         <div className="mb-2 px-36 py-2">
            <label htmlFor="city" className="block text-black text-sm font-bold mb-2">Town/City</label>
            <input defaultValue={address.city} type="city" id="city" {...register("city", )} className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-4 py-2">
            <label htmlFor="state" className="block text-black text-sm font-bold mb-2">State</label>
            <input defaultValue={address.state} type="state" id="state" {...register("state", )} className="shadow appearance-none border rounded w-[30rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
         </div>
         <div className="flex items-center justify-between py-2 px-36">
         <input className="w-[70rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value={"Update"}/>
            </div>
    </form>
  )
}