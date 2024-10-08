import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CouponForm({ cartId }) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [copiedCoupon, setCopiedCoupon] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

 
  const onSubmit = (data) => {
    const body = {
      ...data,
      cartId: cartId,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/coupon/apply-coupon`, body)
      .then((response) => {
        if (response.status === 200) {
          navigate(`/home/cart`);
        }
      })
      .catch((error) => console.log(error));
  };

  
  const openDialog = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/coupon`)
      .then((response) => {
        setDialogContent(response.data); 
        setIsDialogOpen(true); 
      })
      .catch((error) => console.log(error));
  };

  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogContent(null);
  };

  
  const copyToClipboard = (couponCode) => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopiedCoupon(couponCode); 
      setTimeout(() => setCopiedCoupon(""), 2000); 
    });
  };

  console.log(watch("couponCode")); 

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="couponcode"
            {...register("couponCode", { required: true })}
            className="shadow appearance-none border rounded w-[20rem] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter coupon code"
          />

          <button
            type="button"
            onClick={openDialog}
            className="shadow appearance-none  rounded w-[14rem] py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-[#A5B5BF] border-2 border-black text-black font-bold"
          >
            View Coupons
          </button>
        </div>

        <input
          className="w-full bg-[#A5B5BF] text-black font-bold py-2 px-4 rounded-full border-2 border-black"
          type="submit"
          value="Apply"
        />
      </form>

      {isDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={closeDialog}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-2">Available Coupons</h2>

            {dialogContent ? (
              <div className="grid grid-cols-1 gap-4">
                {dialogContent.map((coupon, index) => (
                  <div key={index} className="bg-gray-100 shadow-md rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-700">{coupon.coupon_code}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                        {coupon.discount_percentage}% OFF
                      </span>
                      <button
                        onClick={() => copyToClipboard(coupon.coupon_code)}
                        className="bg-gray-300 text-gray-800 px-2 py-1 rounded"
                      >
                        {copiedCoupon === coupon.coupon_code ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}

            <button
              onClick={closeDialog}
              className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
