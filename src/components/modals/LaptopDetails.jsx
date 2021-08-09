import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import Form from '../Form'
import { TextField, MenuItem, FormControlLabel , FormLabel, FormControl, 
RadioGroup, Radio, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    formGroup: {
        flexDirection: 'row',
    },
    
}))

const LaptopDetails = ({properties, save}) => {
    const classes = useStyles()
    const phones = useMediaQuery('(max-width: 450px')
    //--------------------------------INITIALIZE USEFORM HOOK----------------------------------

    //form initialValues
    const initialValues = properties ?{
        'نوع': properties['نوع'],
        'سیستم عامل': properties['سیستم عامل'],
        'اندازه صفحه نمایش': properties['اندازه صفحه نمایش'],
        'دقت صفحه نمایش': properties['دقت صفحه نمایش'],
        'سازنده پردازنده گرافیکی': properties['سازنده پردازنده گرافیکی'],
        'سری پردازنده': properties['سری پردازنده'],
        'نوع حافظه RAM': properties['نوع حافظه RAM'],
        'ظرفیت حافظه RAM': properties['ظرفیت حافظه RAM'],
        'ظرفیت حافظه داخلی': properties['ظرفیت حافظه داخلی'],
        'پورت HDMI': properties['پورت HDMI'],
        'ضد آب': properties['ضد آب'],
        'صفحه نمایش لمسی': properties['صفحه نمایش لمسی'],
        'صفحه نمایش مات': properties['صفحه نمایش مات'],
    }:{
        'نوع': 'نوت بوک (لپ تاپ)',
        'سیستم عامل': '',
        'اندازه صفحه نمایش': '',
        'دقت صفحه نمایش': '',
        'سازنده پردازنده گرافیکی': 'NVIDIA',
        'سری پردازنده': 'core i7',
        'نوع حافظه RAM': 'DDR4',
        'ظرفیت حافظه RAM': '16 گیگابایت',
        'ظرفیت حافظه داخلی': '1 ترابایت',
        'صفحه نمایش لمسی': 'خیر',
        'صفحه نمایش مات': 'خیر',
        'ضد آب': 'خیر',
        'پورت HDMI': 'خیر',
    }
    
    //form validations
    const validations = {
        'سیستم عامل': {
            required:{
                value: true,
                message: 'سیستم عامل الزامی است.'
            }
        },
        'اندازه صفحه نمایش': {
            required: {
              value: true,
              message: 'اندازه صفحه نمایش الزامی می باشد.'
            },
        },
        'دقت صفحه نمایش': {
            required: {
              value: true,
              message: 'دقت صفحه نمایش الزامی می باشد.'
            },
        },
    }

    const onSubmit = () => {
      save(data)
    }
    //useForm hook
    const {data, errors, handleChange, handleSubmit} = useForm({initialValues, validations, onSubmit})

    //--------------------------------------------------------------------------------------------//
    //--------------------------------------------------------------------------------------------//

    return (
        <Form width={phones? '200px':'350px'} height='380px' justifyContent='flex-start' padding='0 1rem' onSubmit={handleSubmit}>
            <TextField
                label="نوع" 
                variant="outlined" 
                select
                fullWidth={true} 
                margin='dense'
                value={data['نوع'] || 'نوت بوک (لپ تاپ)'}
                onChange={handleChange('نوع')}
                color='secondary'
            >
              <MenuItem value='نوت بوک (لپ تاپ)'>
                نوت بوک (لپ تاپ)
              </MenuItem>
              <MenuItem value='آلترابوک'>
                آلترابوک
              </MenuItem>
              <MenuItem value='نت بوک'>
                نت بوک 
              </MenuItem>
              <MenuItem value='کروم بوک'>
                کروم بوک
              </MenuItem>
            </TextField>

            
            <TextField  
              label='سیستم عامل' 
              variant="outlined" 
              required
              fullWidth={true}
              margin='dense'
              value={data['سیستم عامل'] || ''}
              onChange={handleChange('سیستم عامل')}
              error={Boolean(errors['سیستم عامل']) || false} 
              helperText={errors['سیستم عامل'] || ''}
              color='secondary'
            />

            <TextField  
              label='دقت صفحه نمایش'
              variant="outlined" 
              required
              fullWidth={true}
              margin='dense'
              value={data['دقت صفحه نمایش'] || ''}
              onChange={handleChange('دقت صفحه نمایش')}
              error={Boolean(errors['دقت صفحه نمایش']) || false} 
              helperText={errors['دقت صفحه نمایش'] || ''}
              color='secondary'
            />
            <TextField  
              label='اندازه صفحه نمایش'
              variant="outlined" 
              required
              fullWidth={true}
              margin='dense'
              value={data['اندازه صفحه نمایش'] || ''}
              onChange={handleChange('اندازه صفحه نمایش')}
              error={Boolean(errors['اندازه صفحه نمایش']) || false} 
              helperText={errors['اندازه صفحه نمایش'] || ''}
              color='secondary'
            />

            <TextField
                label='سازنده پردازنده گرافیکی' 
                variant="outlined" 
                select
                fullWidth={true} 
                margin='dense'
                value={data['سازنده پردازنده گرافیکی'] || 'NVIDIA'}
                onChange={handleChange('سازنده پردازنده گرافیکی')}
                color='secondary'
            >
              <MenuItem value='NVIDIA'>
                NVIDIA
              </MenuItem>
              <MenuItem value='Intel'>
                Intel
              </MenuItem>
              <MenuItem value='Apple'>
                Apple
              </MenuItem>
              <MenuItem value='AMD'>
                AMD
              </MenuItem>
              <MenuItem value='AIT'>
                AIT
              </MenuItem>
              <MenuItem value='Rockchip'>
                Rockchip
              </MenuItem>
            </TextField>

            <TextField
                label='سری پردازنده' 
                variant="outlined" 
                select
                fullWidth={true} 
                margin='dense'
                value={data['سری پردازنده'] || 'core i7'}
                onChange={handleChange('سری پردازنده')}
                color='secondary'
            >
              <MenuItem value='core i9'>
                core i9
              </MenuItem>
              <MenuItem value='core i7'>
                core i7
              </MenuItem>
              <MenuItem value='core i5'>
                core i5
              </MenuItem>
              <MenuItem value='core i3'>
                core i3
              </MenuItem>
              <MenuItem value='celereon'>
                celereon
              </MenuItem>
              <MenuItem value='pentium'>
                pentium
              </MenuItem>
              <MenuItem value='Ryzen 7'>
                Ryzen 7
              </MenuItem>
              <MenuItem value='Ryzen 5'>
                Ryzen 5
              </MenuItem>
              <MenuItem value='Ryzen 3'>
                Ryzen 3
              </MenuItem>
              <MenuItem value='M1'>
                M1
              </MenuItem>
            </TextField>
            
            <TextField
                label='نوع حافظه RAM' 
                variant="outlined" 
                select
                fullWidth={true} 
                margin='dense'
                value={data['نوع حافظه RAM'] || 'DDR4'}
                onChange={handleChange('نوع حافظه RAM')}
                color='secondary'
            >
              <MenuItem value='DDR4'>
                DDR4
              </MenuItem>
              <MenuItem value='DDR3'>
                DDR3
              </MenuItem>
              <MenuItem value='DDR2'>
                DDR2
              </MenuItem>
              <MenuItem value='Unified'>
                Unified
              </MenuItem>
              <MenuItem value='LPDDR4X'>
                LPDDR4X
              </MenuItem>
              <MenuItem value='LPDDR4'>
                LPDDR4
              </MenuItem>
              <MenuItem value='LPDDR3'>
                LPDDR3
              </MenuItem>
            </TextField>

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">ظرفیت حافظه RAM</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="memory" value={data['ظرفیت حافظه RAM'] || '16 گیگابایت'} onChange={handleChange('ظرفیت حافظه RAM')}>
                <FormControlLabel value="64 گیگابایت" control={<Radio />} label="64 گیگابایت" />
                <FormControlLabel value="32 گیگابایت" control={<Radio />} label="32 گیگابایت" />
                <FormControlLabel value="16 گیگابایت" control={<Radio />} label="16 گیگابایت" />
                <FormControlLabel value="12 گیگابایت" control={<Radio />} label="12 گیگابایت" />
                <FormControlLabel value="8 گیگابایت" control={<Radio />} label="8 گیگابایت" />
                <FormControlLabel value="4 گیگابایت" control={<Radio />} label="4 گیگابایت" />
                <FormControlLabel value="2 گیگابایت" control={<Radio />} label="2 گیگابایت" />
              </RadioGroup>
            </FormControl>
            
            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">ظرفیت حافظه داخلی</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="memory" value={data['ظرفیت حافظه داخلی'] || '1 ترابایت'} onChange={handleChange('ظرفیت حافظه داخلی')}>
                <FormControlLabel value="2 ترابایت" control={<Radio />} label="2 ترابایت" />
                <FormControlLabel value="1 ترابایت" control={<Radio />} label="1 ترابایت" />
                <FormControlLabel value="512 گیگابایت" control={<Radio />} label="512 گیگابایت" />
                <FormControlLabel value="256 گیگابایت" control={<Radio />} label="256 گیگابایت" />
                <FormControlLabel value="128 گیگابایت" control={<Radio />} label="128 گیگابایت" />
              </RadioGroup>
            </FormControl>
        
            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">صفحه نمایش لمسی</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['صفحه نمایش لمسی'] || 'خیر'} onChange={handleChange('صفحه نمایش لمسی')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">صفحه نمایش مات</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['صفحه نمایش مات'] || 'خیر'} onChange={handleChange('صفحه نمایش مات')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">پورت HDMI</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['پورت HDMI'] || 'خیر'} onChange={handleChange('پورت HDMI')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">ضد آب</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['ضد آب'] || 'خیر'} onChange={handleChange('ضد آب')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
              </RadioGroup>
            </FormControl>
            
          <Button type='submit'>ذخیره</Button>
        </Form>
    )
}

export default LaptopDetails
