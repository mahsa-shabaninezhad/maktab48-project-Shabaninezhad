import axios from "axios";
import { toast } from "react-toastify";


const productAxios = axios.create({
    baseURL: 'http://localhost:5000/products'
})

// productAxios.defaults.headers.post["Content-type"] = "application/json"

productAxios.interceptors.response.use(function (response) {
    if(response.status === 200 || response.status === 201){
        console.log(response.data);
        switch (response.config.method) {
            case 'post':
                toast.success(`${response.data.title} با موفقیت اضافه شد.`)
                break;
            case 'put':
                toast.success(`${response.data.title} با موفقیت به روزرسانی شد.`)
                break;
            case 'delete':
                toast.success(`حذف با موفقیت انجام شد.`)
                break;        
            default:
                break;
        }
    }
    // console.log(response);
    return response
    
}, function (error) {
    if (error.response) {
        console.log(error.response.data.error);
        toast.error('مشکلی پیش آمده، لطفا دوباره تلاش کنید.')
    }

    return Promise.reject(error)
})

export default productAxios