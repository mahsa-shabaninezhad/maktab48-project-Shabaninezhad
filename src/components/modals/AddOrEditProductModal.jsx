import React, { useState } from 'react'
import { Button, TextField, MenuItem, InputBase } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useForm from '../../hooks/useForm'
import Form from '../Form'

import { addAProduct, editAProduct } from '../../store/actions/productAtions'
import { handleUploadingImage } from '../../utils/uploadImage'

const categories = [
    {
        value: 'گوشی موبایل',
        label: 'گوشی موبایل'
    },
    {
        value: 'لپ تاپ',
        label: 'لپ تاپ'
    },
    {
        value: 'دوربین',
        label: 'دوربین'
    },
]


const AddOrEditProductModal = ({neadEditProduct}) => {
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()

    //initial state according to edit mode or add mode
    const initialValues = neadEditProduct
    ?{
        title: neadEditProduct.title,
        category: neadEditProduct.category,
        brand: neadEditProduct.brand,
        description: neadEditProduct.description
    } 
    :{
        title: '',
        category: 'گوشی موبایل',
        brand: '',
        description: ''
    }

    console.log("initialValues: ", initialValues);
    //form validation hook
    const {data, errors, handleChange, handleSubmit} = useForm({
        initialValues,
        validations: {
            title:{
                required: {
                    value: true,
                    message: 'نام کالا الزامی می باشد.'
                }
            },
            brand:{
                required: {
                    value: true,
                    message: 'نام برند الزامی می باشد.'
                }
            }
        }, 
        onSubmit: () => handleSave() 
    })
    console.log("data: ", data);

    //checkig which action needs to be dispach edit or add
    const handleSave = () => {
        neadEditProduct ? dispatch(editAProduct(neadEditProduct.id, {...neadEditProduct, ...data, image})) : dispatch(addAProduct({...data, image}))
    }

    const handleTransformImageToBase64 = (e) => {
        const file = e.target.files[0]
        console.log(file.name);
        handleUploadingImage(file).then(res => {
          console.log(res);
          setImage(res)
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputBase 
                label="تصویر" 
                type='file'
                onChange={e => handleTransformImageToBase64(e)}
                style={{alignSelf: 'flex-start'}}
            />
            <TextField 
                label="نام کالا" 
                type='text'
                required
                variant="outlined" 
                value={data['title'] || ''}
                onChange={handleChange('title')}
                error={Boolean(errors['title']) || false} 
                helperText={errors['title'] || ''}
                fullWidth={true} 
                margin='dense'
                autoFocus
            />
            <TextField
                label="دسته بندی" 
                variant="outlined" 
                select
                value={data['category'] || 'گوشی موبایل'}
                onChange={handleChange('category')}
                fullWidth={true} 
                margin='dense'
            >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
                label="برند" 
                variant="outlined" 
                value={data['brand'] || ''}
                onChange={handleChange('brand')}
                fullWidth={true} 
                margin='dense'
                error={Boolean(errors['brand']) || false} 
                helperText={errors['brand'] || ''}
            />
            <Button type='submit' color="primary" variant='contained' >ذخیره</Button>
        </Form>
    )
}

export default AddOrEditProductModal
