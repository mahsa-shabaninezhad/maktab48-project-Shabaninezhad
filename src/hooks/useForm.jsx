import { useState } from 'react'

//each input can have 3 type of validation option like this:
const defaultValidations = {key: {
    required: {
        value: false,
        message: ''
    },
    pattern: {
        value: '',
        message: ''
    },
    custom: {
        isValid: null,
        message: ''
    }
}}

const useForm = ({initialValues = {}, validations = defaultValidations, onSubmit = null}) => {
    const [data, setData] = useState(initialValues)
    const [errors, setErrors] = useState({})
    
    //transformData is a function for changing data types if needed
    const handleChange =(key, transformData) => (e) => {
        const value = transformData? transformData(e.target.value) : e.target.value
        setData({...data, [key]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(validations){
            let isValid = true
            let newErrors = {}

            for (const key in validations) {
                //each input value
                const value = data[key]
                //each input validations rule
                const validation = validations[key]

                //if required validation passed to hook
                const required = validation?.required
                if(required?.value && !value){
                    isValid = false;
                    newErrors[key] = required.message
                }
                
                //if pattern validation passed to hook
                const pattern = validation?.pattern
                if( pattern?.value && !RegExp(pattern.value).test(value) ){
                    isValid = false;
                    newErrors[key] = pattern.message
                }
                
                //if custom validation passed to hook
                const custom = validation?.custom;
                if (custom?.isValid && !custom.isValid(value)) {
                    isValid = false;
                    newErrors[key] = custom.message
                }
            }

            if (!isValid) {
                setErrors({...newErrors})
                return
            }
        }

        setErrors({})

        if(onSubmit){
            onSubmit()
        }
    }
    
    return {data, errors, handleChange, handleSubmit}
}

export default useForm
