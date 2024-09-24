import axios from "axios"
import { useForm } from "react-hook-form"


export default function CouponForm({cartId }) {
    console.log(cartId)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {
    const body = {
        ...data,
        cartId:cartId
    }
    axios.post(`${import.meta.env.VITE_BASE_URL}/coupon/apply-coupon`,body).
    then(response=>{
        if (response.status === 200) {
            window.location.reload();
        }
    }).catch(error=>console.log(error))
  }


  console.log(watch("example")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
         <input type="text" id="couponcode"  {...register("couponCode", { required: true })}className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  placeholder="Enter coupon code"/>
     
      <input className="w-full bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded-full border-2 border-black"  type="submit" value={"Apply"}/>
    </form>
  )
}