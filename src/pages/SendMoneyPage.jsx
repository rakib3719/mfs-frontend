'use client'
import { useAuth } from "@/providers/AuthProvider";
import axiosInstance from "@/utils/axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2'

const TransactionPage = ({type}) => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
const {user,refreshUser, isLoading} = useAuth();

// const user = {

//   mobileNumber: '0287493847',
  
// }

if(isLoading){
  return <h1>loading...</h1>
}

if(!user){
  return <h1>Null</h1>
}



const title = type === 'send-money'? 'Send Money': type === 'cash-out' ? "Cash Out" : type === "cash-in" ? 'Cash In' : "" 


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle send money logic here
    console.log("Sending to:", number, "with PIN:", pin);
    // type, recipientMobile, senderMobile, amount, pin 
const data = {
type: type,
senderMobile:user?.mobileNumber,
recipientMobile: number,
amount: parseInt(amount),
pin: pin
}
console.log(data,'ekbar dkehi');




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
  try {
    const resp = await axiosInstance.post('/transaction/', data);
console.log(resp, 'send money dtails');
if(resp?.data?.success){
  refreshUser();

    Swal.fire({
      title: `${type} Success`,
      text: `Transaction Id: ${resp?.data?.transaction?.id
      }`,
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
        <h2 className="text-xl font-semibold text-center text-[#2b97a3] mb-6">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <ToastContainer/>
            <label className="block text-sm font-medium text-gray-700 mb-1">
           {type === 'send-money'? 'Recipient Number': type === 'cash-out' ? 'agent number' :type === 'cash-in' ? 'Recipient Number' : ''}
            </label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2b97a3]"
            />
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

export default TransactionPage;
