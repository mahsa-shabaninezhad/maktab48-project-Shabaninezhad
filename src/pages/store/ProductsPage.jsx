import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import CustomGrid from '../../components/CustomGrid'
import useAxios from '../../hooks/useAxios'
import { useLocation } from 'react-router-dom'
import Card from '../../components/ProductCard'
import Filter from '../../components/Filter'
import { parseLinkHeader } from '../../utils/pagination'
import Pagination from '../../components/StorePagination'
import Loading from '../../components/Loading'
import useQuery from '../../hooks/useQuery'

const useStyles = makeStyles(theme => ({
    main: {
      width: '100%',
      height: `calc(100vh - 70px)`,
      overflow: 'auto'
    },

    filterBox: {
      marginBottom: theme.spacing(7),
      paddingTop: '3rem',
      background: `linear-gradient(to bottom, #e6e6e6 0, #e6e6e6 70%, transparent 70%)`,
     
    }
}))


const ProductsPage = () => {
    const classes = useStyles()

    //GET SEARCH PARAMS
    const query = useQuery()
    
    //SPECIFY FILTER OPTION BASE ON URL
    const turnUrlToFilter = () => {
      const filterObj = {}
      for(var pair of query.entries()) {
        filterObj[pair[0]] = pair[1]
      }
      return filterObj
    }

    //SPECIFY URL BASE ON FILTERS
    const turnFilterToUrl = () => {
        let url = '/products?'
        for (const key in filter) {
          if(filter[key]){
            url = `${url}${key}=${filter[key]}&`
          }
        }
        return url
    }
    
    const {pathname, search} = useLocation()
    const [filter, setFilter] = useState({...turnUrlToFilter()})
    const [url, setUrl] = useState(turnFilterToUrl().slice(1,-1))
    const {response, isLoading, headers} = useAxios({url})
    
    
    useEffect(() => {
      if(search){
        setUrl(pathname+search)

      }
    },[search])

    return (
        <>
        <div className={classes.main}>
          <div className={classes.filterBox}>
            <Filter category={query.get('category')} />
          </div>
          {!isLoading? 
          <>
            <CustomGrid 
              cellWidth="250px" 
              rowGap='4rem'
            >
              {
                response.length > 0?
                response?.map(product => <Card key={product.id} product={product} />) 
                :<p>موردی یافت نشد</p>
              }

            </CustomGrid>
            <Pagination paginateInfo={parseLinkHeader(headers?.link)}/>
          </>
          :<Loading isLoading={isLoading}/>
          }
        </div>
        </>
    )
  }
  
export default ProductsPage
