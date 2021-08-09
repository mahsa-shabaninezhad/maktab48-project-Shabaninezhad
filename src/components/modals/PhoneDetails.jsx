import React from 'react'
import Form from '../Form'
import { TextField, MenuItem, FormControlLabel , FormLabel, FormControl, 
RadioGroup, Radio, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import useForm from '../../hooks/useForm'
import { useMediaQuery } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  formGroup: {
      flexDirection: 'row',
  },
}))

const PhoneDetails = ({properties, save}) => {
  const classes = useStyles()
  const phones = useMediaQuery('(max-width: 450px')
  //--------------------------------INITIALIZE USEFORM HOOK----------------------------------

  //form initialValues
  const initialValues = properties ? {
      'سیستم عامل': properties['سیستم عامل'],
      'نسخه سیستم عامل': properties['نسخه سیستم عامل'],
      'فناوری صفحه نمایش': properties['فناوری صفحه نمایش'],
      'تعداد سیم کارت': properties['تعداد سیم کارت'],
      'اندازه': properties['اندازه'],
      'دوربین های پشت گوشی': properties['دوربین های پشت گوشی'],
      'رزولوشن عکس': properties['رزولوشن عکس'],
      'حافظه داخلی': properties['حافظه داخلی'],
      'مقدار RAM': properties['مقدار RAM'],
      'شبکه ارتباطی': properties['شبکه ارتباطی']
  }:{
    'سیستم عامل': 'android',
    'نسخه سیستم عامل': '',
    'فناوری صفحه نمایش': '',
    'تعداد سیم کارت': 'تک',
    'اندازه':  '',
    'دوربین های پشت گوشی': "4 ماژول دوربین",
    'رزولوشن عکس': '12 مگاپیکسل',
    'حافظه داخلی': '128 گیگابایت',
    'مقدار RAM':  '4 گیگابایت',
    'شبکه ارتباطی': '4G'
  }

  //form validations
  const validations = {
    'نسخه سیستم عامل': {
      required: {
        value: true,
        message: 'نسخه سیستم عامل الزامی می باشد.'
      },
    },
    'فناوری صفحه نمایش': {
      required: {
        value: true,
        message: 'فناوری صفحه نمایش الزامی می باشد.'
      },
    },
    'اندازه': {
      required: {
        value: true,
        message: 'اندازه الزامی می باشد.'
      },
    },
  }

  const onSubmit = () => {
    save(data)
  }

  //hook for validating 
  const {data, errors, handleChange, handleSubmit} = useForm({initialValues, validations, onSubmit})

  //--------------------------------------------------------------------------------------------//
  //--------------------------------------------------------------------------------------------//

  return (
    <Form width={phones? '200px':'350px'} height='380px' justifyContent='flex-start' padding='0 1rem' onSubmit={handleSubmit}>
          <TextField
              label="سیستم عامل" 
              variant="outlined" 
              select
              fullWidth={true} 
              margin='dense'
              value={data['سیستم عامل'] || 'android'}
              onChange={handleChange('سیستم عامل')}
              color='secondary'
          >
            <MenuItem value='android'>
              android
            </MenuItem>
            <MenuItem value='ios'>
              ios
            </MenuItem>
          </TextField>
          
          <TextField  
            label="نسخه سیستم عامل" 
            variant="outlined" 
            required
            fullWidth={true}
            margin='dense'
            value={data['نسخه سیستم عامل'] || ''}
            onChange={handleChange('نسخه سیستم عامل')}
            error={Boolean(errors['نسخه سیستم عامل']) || false} 
            helperText={errors['نسخه سیستم عامل'] || ''}
            color='secondary'
          />

          <TextField  
            label="فناوری صفحه نمایش"
            variant="outlined" 
            required
            fullWidth={true}
            margin='dense'
            value={data['فناوری صفحه نمایش'] || ''}
            onChange={handleChange('فناوری صفحه نمایش')}
            error={Boolean(errors['فناوری صفحه نمایش']) || false} 
            helperText={errors['فناوری صفحه نمایش'] || ''}
            color='secondary'
          />
          <TextField  
            label="اندازه"
            variant="outlined" 
            required
            fullWidth={true}
            margin='dense'
            value={data['اندازه'] || ''}
            onChange={handleChange('اندازه')}
            error={Boolean(errors['اندازه']) || false} 
            helperText={errors['اندازه'] || ''}
            color='secondary'
          />
        
          <TextField
              label="دوربین های پشت گوشی"
              variant="outlined" 
              select
              fullWidth={true} 
              margin='dense'
              value={data['دوربین های پشت گوشی'] || "4 ماژول دوربین"}
              onChange={handleChange('دوربین های پشت گوشی')}
              color='secondary'
          >
            <MenuItem value="4 ماژول دوربین">
              4 ماژول دوربین
            </MenuItem>
            <MenuItem value="3 ماژول دوربین">
              3 ماژول دوربین
            </MenuItem>
            <MenuItem value="2 ماژول دوربین">
              2 ماژول دوربین
            </MenuItem>
            <MenuItem value="1 ماژول دوربین">
              1 ماژول دوربین
            </MenuItem>
          </TextField>
          <TextField
              label="رزولوشن عکس" 
              variant="outlined" 
              select
              fullWidth={true} 
              margin='dense'
              value={data['رزولوشن عکس'] || '12 مگاپیکسل'}
              onChange={handleChange('رزولوشن عکس')}
              color='secondary'
          >
            <MenuItem value='12 مگاپیکسل'>
              12 مگاپیکسل
            </MenuItem>
            <MenuItem value='16 مگاپیکسل'>
              16 مگاپیکسل
            </MenuItem>
            <MenuItem value='48 مگاپیکسل'>
              48 مگاپیکسل
            </MenuItem>
            <MenuItem value='64 مگاپیکسل'>
              64 مگاپیکسل
            </MenuItem>
          </TextField>
          <FormControl component="fieldset" fullWidth={true}>
            <FormLabel component="legend">تعداد سیم کارت</FormLabel>
            <RadioGroup aria-label="gender" className={classes.formGroup} name="simNumber" value={data['تعداد سیم کارت'] || "تک"} onChange={handleChange('تعداد سیم کارت')}>
              <FormControlLabel value='تک' control={<Radio />} label="تک" />
              <FormControlLabel value='دو' control={<Radio />} label="دو" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" fullWidth={true}>
            <FormLabel component="legend">حافظه داخلی</FormLabel>
            <RadioGroup aria-label="gender" className={classes.formGroup} name="memory" value={data['حافظه داخلی'] || '128 گیگابایت'} onChange={handleChange('حافظه داخلی')}>
              <FormControlLabel value="1 ترابایت" control={<Radio />} label="1 ترابایت" />
              <FormControlLabel value="512 گیگابایت" control={<Radio />} label="512 گیگابایت" />
              <FormControlLabel value="256 گیگابایت" control={<Radio />} label="256 گیگابایت" />
              <FormControlLabel value="128 گیگابایت" control={<Radio />} label="128 گیگابایت" />
              <FormControlLabel value="64 گیگابایت" control={<Radio />} label="64 گیگابایت" />
              <FormControlLabel value="32 گیگابایت" control={<Radio />} label="32 گیگابایت" />
              <FormControlLabel value="16 گیگابایت" control={<Radio />} label="16 گیگابایت" />
              <FormControlLabel value="8 گیگابایت"control={<Radio />} label="8 گیگابایت" />
              <FormControlLabel value="4 گیگابایت" control={<Radio />} label="4 گیگابایت" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" fullWidth={true}>
            <FormLabel component="legend">حافظه RAM</FormLabel>
            <RadioGroup aria-label="gender" className={classes.formGroup} name="RAM" value={data['مقدار RAM'] || '4 گیگابایت'} onChange={handleChange('مقدار RAM')}>
              <FormControlLabel value="16 گیگابایت" control={<Radio />} label="16 گیگابایت" />
              <FormControlLabel value="12 گیگابایت" control={<Radio />} label="12 گیگابایت" />
              <FormControlLabel value="8 گیگابایت" control={<Radio />} label="8 گیگابایت" />
              <FormControlLabel value="6 گیگابایت" control={<Radio />} label="6 گیگابایت" />
              <FormControlLabel value="4 گیگابایت" control={<Radio />} label="4 گیگابایت" />
              <FormControlLabel value="2 گیگابایت" control={<Radio />} label="2 گیگابایت" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" fullWidth={true}>
            <FormLabel component="legend">شبکه ارتباطی</FormLabel>
            <RadioGroup aria-label="gender" className={classes.formGroup} name="cellularTech" value={data['شبکه ارتباطی'] || '4G'} onChange={handleChange('شبکه ارتباطی')}>
              <FormControlLabel value="5G" control={<Radio />} label="5G" />
              <FormControlLabel value="4G" control={<Radio />} label="4G" />
              <FormControlLabel value="3G" control={<Radio />} label="3G" />
              <FormControlLabel value="2G" control={<Radio />} label="2G" />
            </RadioGroup>
          </FormControl>
        <Button type='submit'>ذخیره</Button>
      </Form>
  )
}

export default PhoneDetails
