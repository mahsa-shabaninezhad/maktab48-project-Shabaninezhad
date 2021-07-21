import React from 'react'
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

const CameraDetails = ({properties, save}) => {
    const classes = useStyles()
    const phones = useMediaQuery('(max-width: 450px')

    //--------------------------------INITIALIZE USEFORM HOOK----------------------------------

    //form initialValues
    const initialValues = properties ?{
        'نوع': properties['نوع'],
        'قطع حسگر': properties['قطع حسگر'],
        'محدوده دقت حسگر': properties['محدوده دقت حسگر'],
        'محدوده زوم': properties['محدوده زوم'],
        'رزولوشن فیلم': properties['رزولوشن فیلم'],
        'سایز صفحه نمایش': properties['سایز صفحه نمایش'],
        'قابلیت هوشمند': properties['قابلیت هوشمند'],
        'خروجی HDMI': properties['خروجی HDMI'],
        'خروجی USB': properties['خروجی USB'],
        'لرزشگیر تصویر': properties['لرزشگیر تصویر'],
        'ضد آب': properties['ضد آب'],
        'چشمی': properties['چشمی'],
        'تصویر زنده (Live View)': properties['تصویر زنده'],
        'صفحه نمایش لمسی': properties['صفحه نمایش لمسی'],
        'تکنولوژی بی سیم': properties['تکنولوژی بی سیم'],
    }:{
        'نوع': 'DSLR',
        'قطع حسگر': 'Full Frame',
        'محدوده دقت حسگر': '',
        'محدوده زوم': '',
        'رزولوشن فیلم': '',
        'سایز صفحه نمایش': '',
        'قابلیت هوشمند': 'خیر',
        'خروجی HDMI': 'خیر',
        'خروجی USB': 'خیر',
        'لرزشگیر تصویر': 'خیر',
        'ضد آب': 'خیر',
        'چشمی': 'خیر',
        'تصویر زنده (Live View)': 'خیر',
        'صفحه نمایش لمسی': 'خیر',
        'تکنولوژی بی سیم': 'خیر',

    }
    
    //form validations
    const validations = {
        'محدوده دقت حسگر': {
            required:{
                value: true,
                message: 'محدوده دقت حسگر الزامی است.'
            }
        },
        'محدوده زوم': {
            required: {
              value: true,
              message: 'محدوده زوم الزامی می باشد.'
            },
        },
        'رزولوشن فیلم': {
            required: {
              value: true,
              message: 'رزولوشن فیلم الزامی می باشد.'
            },
        },
        'سایز صفحه نمایش': {
            required: {
              value: true,
              message: 'سایز صفحه نمایش الزامی می باشد.'
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
                value={data['نوع'] || 'DSLR'}
                onChange={handleChange('نوع')}
            >
              <MenuItem value='کامپکت'>
                کامپکت
              </MenuItem>
              <MenuItem value='DSLR'>
                DSLR
              </MenuItem>
              <MenuItem value='بدون آینه'>
                بدون آینه
              </MenuItem>
              <MenuItem value='چاپ سریع'>
                چاپ سریع
              </MenuItem>
            </TextField>

            <TextField
                label="قطع حسگر" 
                variant="outlined" 
                select
                fullWidth={true} 
                margin='dense'
                value={data['قطع حسگر'] || 'Full Frame'}
                onChange={handleChange('قطع حسگر')}
            >
              <MenuItem value='Full Frame'>
                Full Frame
              </MenuItem>
              <MenuItem value='Crop Frame'>
                Crop Frame
              </MenuItem>
            </TextField>

            <TextField  
              label="محدوده دقت حسگر" 
              variant="outlined" 
              required
              fullWidth={true}
              margin='dense'
              value={data['محدوده دقت حسگر'] || ''}
              onChange={handleChange('محدوده دقت حسگر')}
              error={Boolean(errors['محدوده دقت حسگر']) || false} 
              helperText={errors['محدوده دقت حسگر'] || ''}
            />
            <TextField  
              label='رزولوشن فیلم'
              variant="outlined" 
              required
              fullWidth={true}
              margin='dense'
              value={data['رزولوشن فیلم'] || ''}
              onChange={handleChange('رزولوشن فیلم')}
              error={Boolean(errors['رزولوشن فیلم']) || false} 
              helperText={errors['رزولوشن فیلم'] || ''}
            />
            <TextField  
              label='محدوده زوم'
              variant="outlined" 
              required
              fullWidth={true}
              margin='dense'
              value={data['محدوده زوم'] || ''}
              onChange={handleChange('محدوده زوم')}
              error={Boolean(errors['محدوده زوم']) || false} 
              helperText={errors['محدوده زوم'] || ''}
            />
            <TextField  
              label='سایز صفحه نمایش'
              variant="outlined" 
              required
              fullWidth={true}
              margin='dense'
              value={data['سایز صفحه نمایش'] || ''}
              onChange={handleChange('سایز صفحه نمایش')}
              error={Boolean(errors['سایز صفحه نمایش']) || false} 
              helperText={errors['سایز صفحه نمایش'] || ''}
            />

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">قابلیت هوشمند</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['قابلیت هوشمند'] || 'خیر'} onChange={handleChange('قابلیت هوشمند')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">خروجی HTMI</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['خروجی HTMI'] || 'خیر'} onChange={handleChange('خروجی HTMI')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">خروجی USB</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['خروجی USB'] || 'خیر'} onChange={handleChange('خروجی USB')}>
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

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">لرزشگیر تصویر</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['لرزشگیر تصویر'] || 'خیر'} onChange={handleChange('لرزشگیر تصویر')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">چشمی</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['چشمی'] || 'خیر'} onChange={handleChange('چشمی')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" fullWidth={true}>
              <FormLabel component="legend">تصویر زنده (Live View)</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['تصویر زنده (Live View)'] || 'خیر'} onChange={handleChange('تصویر زنده (Live View)')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
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
              <FormLabel component="legend">تکنولوزی بی سیم</FormLabel>
              <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['تکنولوزی بی سیم'] || 'خیر'} onChange={handleChange('تکنولوزی بی سیم')}>
                <FormControlLabel value='بله' control={<Radio />} label="بله" />
                <FormControlLabel value='خیر' control={<Radio />} label="خیر" />
              </RadioGroup>
            </FormControl>

            
          <Button type='submit'>ذخیره</Button>
        </Form>
    )
}

export default CameraDetails
