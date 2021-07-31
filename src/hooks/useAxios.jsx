import axios from 'axios';
import { useState, useEffect } from 'react';

const useAxios = (config, resFunc, rejFunc) => {
    const [response, setResponse] = useState(null);
    const [errors, setErrors] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        console.log('running');
        
        setIsLoading(true)
        doApiCall()
        .then(res => {
            setResponse(res.data)
            setIsLoading(false)
            if(resFunc){
                resFunc()
            }
        }).catch(err => {
            setErrors(err)
            setIsLoading(false)
            if(rejFunc){
                rejFunc()
            }
        })
    }, [config.url])
    
    const doApiCall  = async () => {
        const res = await axios({
            method: 'get',
            baseURL: 'http://localhost:5000',
            headers: {
                "Content-type": "application/json"
            },
            ...config
        })
        return res
    } 

    return {response, errors, isLoading}
}

export default useAxios
