'use client'
import { useAuth } from "@/providers/AuthProvider";
import axiosInstance from "@/utils/axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2'

const WidthDrawPage = () => {
  // const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
const {user,refreshUser, isLoading} = useAuth()




const type = 'Widthdraw'


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle send money logic here
    // console.log("Sending to:", number, "with PIN:", pin);
    // type, recipientMobile, senderMobile, amount, pin 
const data = {
type: type,
agentNumber:user.mobileNumber,
// recipientMobile: number,
amount: parseInt(amount),
pin: pin
}
console.log(data,'ekbar dkehi');


if(amount > user.balance){
  return toast.error('Insuficinet Balance')
}



Swal.fire({
  title: "Are you sure?",
  text: `Are you sure for ${type}!`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes!"
}).then((result) => {
  if (result.isConfirmed) {


moneyOparation(data)

  }
});




  };


const moneyOparation = async(data)=>{


  // const resp = await axiosInstance.post('/widthDraw/', data);
  // console.log(resp, 'widthdraw Details');
  

  try {
    const resp = await axiosInstance.post('/widthDraw/', data);
console.log(resp, 'widthdraw Details');


if(resp?.data?.success){
  refreshUser();

    Swal.fire({
      title: `${type} Success`,
      text: ` Withdrawal request created successfully`,
      icon: "success"
    });

  // Swal.fire({

  //   icon: "success",
  //   title: `${title} Success`,
  //   showConfirmButton: true,
  
  // });
}
    
  } catch (error) {
    console.log(error.response.data.error, 'error asca');
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.error || 'Something went wrong!'}`,
      // footer: '<a href="#">Pleaes send valid informaiton</a>'
    });
    
    
  }




}



  return (
    <div className="mt-4  flex items-center justify-center px-4">
      <div className="border-2 p-4 rounded-3xl px-6  shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-[#2b97a3] mb-6">Widthdraw</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <ToastContainer/>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
              Widthdraw
         
            </label> */}
            {/* <input
              type="tel"
              placeholder="01XXXXXXXXX"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b97a3]"
            /> */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Amount
            </label>
            <input
              type="number"
              placeholder="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b97a3]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PIN
            </label>
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b97a3]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2b97a3] text-white py-2 rounded-lg hover:bg-[#247e8a] transition duration-300"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default WidthDrawPage;
