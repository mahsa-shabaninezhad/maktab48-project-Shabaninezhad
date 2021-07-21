import React, { useState } from 'react'
import { Button, TextField, MenuItem, InputBase } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useForm from '../../hooks/useForm'
import Form from '../Form'
import ModalContainer from './ModalContainer'
import { addAProduct, editAProduct } from '../../store/actions/productAtions'
import { handleUploadingImage } from '../../utils/uploadImage'
import PhoneDetails from './PhoneDetails'
import LaptopDetails from './LaptopDetails'
import CameraDetails from './CameraDetails'
import { useMediaQuery } from '@material-ui/core'

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
    const dispatch = useDispatch()
    const phones = useMediaQuery('(max-width: 450px')

    const [image, setImage] = useState(neadEditProduct?.image || null)

    //open modal for adding details of each category product
    const [openModal, setOpenModal] = useState(false)
    //storing data of modal
    const [details, setDetails] = useState(neadEditProduct?.properties || null)

    //--------------------------------INITIALIZE USEFORM HOOK----------------------------------

    //initial state according to edit mode or add mode
    const initialValues = neadEditProduct
    ?{
        title: neadEditProduct.title,
        model: neadEditProduct.model,
        category: neadEditProduct.category,
        brand: neadEditProduct.brand,
        description: neadEditProduct.description
    } 
    :{
        title: '',
        model: '',
        category: 'گوشی موبایل',
        brand: '',
        description: ''
    }

    const validations = {
            title:{
                required: {
                    value: true,
                    message: 'نام کالا الزامی می باشد.'
                }
            },
            model:{
                required: {
                    value: true,
                    message: 'مدل الزامی می باشد.'
                }
            },
            brand:{
                required: {
                    value: true,
                    message: 'نام برند الزامی می باشد.'
                }
            }
        }

    //form validation hook
    const {data, errors, handleChange, handleSubmit} = useForm({
        initialValues,
        validations, 
        onSubmit: () => handleSave() 
    })

    //--------------------------------------------------------------------------------------------//
    //--------------------------------------------------------------------------------------------//

    //checkig which action needs to be dispach edit or add
    const handleSave = () => {
        neadEditProduct ? dispatch(editAProduct(neadEditProduct.id, {...neadEditProduct, ...data, properties:{...details}, image})) : dispatch(addAProduct({...data, properties: {...details}, image}))
    }

    const handleTransformImageToBase64 = (e) => {
        const file = e.target.files[0]
        console.log(file.name);
        handleUploadingImage(file).then(res => {
          console.log(res);
          setImage(res)
        })
    }
    
    
    //open modal
    const handleOpen = () => {
        setOpenModal(true)
    }
    //close and save data if neaded
    const handleClose = (data) => {
        setOpenModal(false)
        data && setDetails(data)
    }

    //render proper modal by category that user choose
    const renderModalByCategory = () => {
        switch (data['category']) {
            case "گوشی موبایل":
                return <PhoneDetails properties={neadEditProduct?.properties} save={handleClose}/>
            case "لپ تاپ":
                return <LaptopDetails properties={neadEditProduct?.properties} save={handleClose}/>
            case "دوربین":
                return <CameraDetails properties={neadEditProduct?.properties} save={handleClose}/>
        
            default:
                break;
        }
    }
    

    return (
        <>
            <Form onSubmit={handleSubmit} width={phones? '200px':'350px'}>
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
                    label="مدل" 
                    type='text'
                    required
                    variant="outlined" 
                    value={data['model'] || ''}
                    onChange={handleChange('model')}
                    error={Boolean(errors['model']) || false} 
                    helperText={errors['model'] || ''}
                    fullWidth={true} 
                    margin='dense'
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
                <Button type='button' color="primary"  onClick={handleOpen} style={{alignSelf: 'flex-start', minWidth: '0px', margin: '8px 0'}}>افزودن جزئیات</Button>
                <Button type='submit' color="primary" variant='contained' >ذخیره</Button>
            </Form>
            {openModal && <ModalContainer close={handleClose} isOpen={openModal}>
                {renderModalByCategory()}
            </ModalContainer>}
        </>
    )
}

export default AddOrEditProductModal
