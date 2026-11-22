import { useNavigate, useSearchParams } from "react-router-dom"
import "./Verify.css"
import axios from "axios";
import { useEffect } from "react";
const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate()
    
    const verifyPayment =  async() => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/verify-order`,{success,orderId})
        if(response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/")       
    }
}
    useEffect(()=>{
        verifyPayment()
    },[])   
  return (
    <div className="verify">
        <div className="spinner">

        </div>
        
    </div>
  )
}

export default Verify;
