import axios from "axios";
import { toast } from "react-toastify";

//using axios instance for login api call
const login = axios.create({
    baseURL:'https://reqres.in',
    headers: { "content-type": "application/json" }
})

//using axios interceptor for showing notifications to user after each call
login.interceptors.response.use(function (response) {
    if(response.status === 200 || response.status === 201){
        localStorage.setItem("token", response.data.token);
        toast.success('خوش آمدید')
    }
    return response

}, function (error) {
    if (error.response) {
        toast.error(error.response.data.error)
    }else{
        toast.error('مشکلی پیش آمده است. دوباره تلاش کنید.')
    }
    return Promise.reject(error)
})

export default login