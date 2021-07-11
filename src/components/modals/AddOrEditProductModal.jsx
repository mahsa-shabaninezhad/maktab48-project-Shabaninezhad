import React, { useState } from 'react'
import { Button, TextField, MenuItem, InputBase, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
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


const AddOrEditProductModal = props => {
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()

    //geting neadEditProduct from state to figure out if editing existing product or adding new one
    const neadEditing = useSelector(state => state.products.needEditProduct)

    //initial state according to edit mode or add mode
    const initialValues = neadEditing
    ?{
        model: neadEditing.model,
        category: neadEditing.category,
        brand: neadEditing.brand,
        description: neadEditing.description
    } 
    :{
        model: '',
        category: 'گوشی موبایل',
        brand: '',
        description: ''
    }

    console.log("initialValues: ", initialValues);
    //form validation hook
    const {data, errors, handleChange, handleSubmit} = useForm({
        initialValues,
        validations: {
            model:{
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
        neadEditing ? dispatch(editAProduct(neadEditing.id, {...neadEditing, ...data, image})) : dispatch(addAProduct({...data, image}))
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
                value={data['model'] || ''}
                onChange={handleChange('model')}
                error={Boolean(errors['model']) || false} 
                helperText={errors['model'] || ''}
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
