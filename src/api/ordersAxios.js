import axios from "axios";
import { toast } from "react-toastify";

//using axios instance for login api call
const ordersAxios = axios.create({
    baseURL:'http://localhost:5000/orders',
})

//using axios interceptor for showing notifications to user after each call
ordersAxios.interceptors.response.use(function (response) {
    if(response.status === 200 || response.status === 201){
        switch (response.config.method) {
            case 'put':
                toast.success('تغییرات با موفقیت اعمال شد.')
                break;      
            default:
                break;
        }
    }
    return response

}, function (error) {
    if (error.response) {
        toast.error(error.response.data.error)
    }
    
    toast.error('اتصال با سرور برقرار نشد. لطفا اتصال اینترنت خود را چک کنید.')
    return Promise.reject(error)
})

export default ordersAxios