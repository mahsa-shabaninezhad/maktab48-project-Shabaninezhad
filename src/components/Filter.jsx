import { makeStyles, Paper, Divider, Select, FormControl, MenuItem } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router';
import { filterOptions } from '../utils/filter'
import useQuery from '../hooks/useQuery';
// import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    container:{
        width: '50%',
        height: 65,
        margin: '0 auto',
        display: 'flex',
        '@media (max-width: 1024px)':{
            width: '70%'
        },
        '@media (max-width: 500px)':{
            width: '60%',
            height: 130,
            flexDirection: 'column'
        },
    },
    formControl: {
        minWidth: 150,
    },
    
    select:{
        paddingLeft: 10,
        height: 65,
    },
    options: {
      flexGrow: 1
    },
  
}))


const Filter = ({category}) => {
    const classes = useStyles()
    const {search} = useLocation()

    const query = useQuery()

    //SPECIFY FILTER OPTION BASE ON URL
    const turnUrlToFilter = () => {
      const filterObj = {}
      for(var pair of query.entries()) {
        filterObj[pair[0]] = pair[1]
      }
      return filterObj
    }

    const [field, setField] = useState('')
    const [filters, setFilters] = useState({...turnUrlToFilter()})
    // const [chips, setChips] = useState([])

    useEffect(() => {
        setField('')
        setFilters({...turnUrlToFilter()})
    }, [category])

    // useEffect(() => {
    //     setChips([])
    // }, [query.get('brand'), category])

    useEffect(() => {
        setFilters({...turnUrlToFilter()})
    }, [search])

    const creatInputOptions = (options) => {
        return options?.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)
    }


    const listOfFilterField = () => {
        const filtersfields = []
        for (const option in filterOptions[category]) {
            filtersfields.push(<MenuItem key={option} value={option}>{option.replace('properties.','')}</MenuItem>)
        }
        return filtersfields
    }

    const handleFieldChange =  (e) => {
        setField(e.target.value)
    }
    
    const handleFilterChange =  (e) => {
        setFilters({...filters, [field]: e.target.value})
        history.push(turnFilterToUrl(field, e.target.value))
        // addChip(field, e.target.value)
    }

    // const addChip = (field, label) => {
    //     const chip = <Chip
    //         id={field}
    //         label={label}
    //         onDelete={(e) => deleteChip(e)}
    //     />
    //     const newChips = chips.filter((chip)=> chip.props.id !== field)
    //     setChips([...newChips, chip])
    // }
    
    // const deleteChip = (e) => {
    //     const id = e.target.parentElement.parentElement.id
    //     const newChips = chips.filter((chip)=> chip.props.id !== id)
    //     setFilters({...filters, [id]: ''})
    //     setChips(newChips)
    //     query.delete(id)
    //     history.push(`products?${query.toString()}`)
    // }

    //SPECIFY URL BASE ON FILTERS
    const turnFilterToUrl = (field, filter) => {
        let url = '/products?'
        //when changing filter we expect to search from first page
        filters._page = 1
        for (const key in filters) {
            if(filters[key] && key !== field){
                url = `${url}${key}=${filters[key]}&`
            }
        }
        return filter?`${url}${field}=${filter}`: url
    }


    const history = useHistory()


    return (
        <>
        <Paper className={classes.container}>
            <FormControl className={classes.formControl}>
                <Select
                  value={field}
                  onChange={handleFieldChange}
                  displayEmpty
                  className={classes.select}
                >
                  <MenuItem value="">
                    <em>جستجو پیشرفته</em>
                  </MenuItem>
                  {listOfFilterField()}
                </Select>
            </FormControl>

            <Divider orientation="vertical" flexItem className={classes.divider}/>

            {field && <FormControl className={classes.options}>
                <Select
                    value={filters[field] || ''}
                    onClick={handleFilterChange}
                    displayEmpty
                    className={classes.select}
                >
                    <MenuItem value="">
                      <em>انتخاب کنید</em>
                    </MenuItem>
                    {creatInputOptions(filterOptions[category][field])}
                </Select>
                
            </FormControl>}
        </Paper>
        {/* {chips} */}
        </>
    )
}

export default Filter
