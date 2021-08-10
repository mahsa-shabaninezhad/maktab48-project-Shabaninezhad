import React, { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import useAxios from '../../hooks/useAxios'
import { Grid } from '@material-ui/core';
import laptop from '../../assets/images/zenBook-Pro-Duo-15.png'
import camera from '../../assets/images/zfc-34l.png'
import phone from '../../assets/images/note-20-ultra.png'
import { makeStyles } from '@material-ui/styles';
import Carousel from '../../components/Carousel';
import '../../assets/css/carousel.css'
import Loading from '../../components/Loading'

const useStyles = makeStyles(theme => ({
    root: {
        overflowX: 'hidden', 
        width: '100%', 
        height:`calc(100vh - 70px)`
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    CategoryContainer: {
        height: '100%',
        '@media (min-width: 600px) and (max-width: 960px)': {
            height: '50%'
        }
    },
    category:{
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (min-width: 600px) and (max-width: 960px)': {
            height: '100%'
        }
    },
    laptop: {
        backgroundColor: theme.palette.secondary.light,
    },
    camera: {
        backgroundColor: '#DADAD9',
    },
    phone: {
        backgroundColor: theme.palette.primary.light,
    }
}))


const LandingPage = () => {
    const classes = useStyles()
    //getting all admin's favorite products
    const {response, errors, isLoading} = useAxios({url:'/products?favorite=true'})
    
    //state for changing carousel cards category 
    const [category, setCategory] = useState('گوشی موبایل')

    //filtering just 6 last favorite product base on category which user choosed
    const handleCategoryChange = (category) => {
        const products = response?.filter(product => product.category === category)
        return products?.slice(products.length-6) 
    }
    if (errors) {
        return null
    }else{

        return (
            <div className={classes.root}>
                {
                isLoading?
                <Loading isLoading={isLoading} /> 
                :<Grid container direction='row-reverse' style={{ height:'100%'}}>
                    <Grid item md={9} xs={12}>
                        
                            
                            <SwitchTransition>
                                <CSSTransition
                                  key={category}
                                  addEndListener={(node, done) => {
                                    node.addEventListener("transitionend", done, false);
                                  }}
                                  appear
                                  classNames="scale"
                                >
                                    <Carousel products={handleCategoryChange(category)} category={category}/>
                                </CSSTransition>
                            </SwitchTransition>
                        
                    </Grid>
                    <Grid md={3} xs={12} container item  className={classes.CategoryContainer} >
                        {category !== 'لپ تاپ' && 
                            <Grid md={12} sm={6} xs={12} className={`${classes.laptop} ${classes.category}`} onClick={() => setCategory('لپ تاپ')}>
                                <img src={laptop} alt="" className={classes.image}/>
                            </Grid>}
                        {category !== 'دوربین' && 
                            <Grid md={12} sm={6} xs={12} className={`${classes.camera} ${classes.category}`} onClick={() => setCategory('دوربین')}>
                                <img src={camera} alt="" className={classes.image}/>
                            </Grid>}
                        {category !== 'گوشی موبایل' && 
                            <Grid md={12} sm={6} xs={12} className={`${classes.phone} ${classes.category}`} onClick={() => setCategory('گوشی موبایل')}>
                                <img src={phone} alt="" className={classes.image}/>
                            </Grid>}
                    </Grid>
                </Grid>
                }
            </div>
        )
    }
    }
    

export default LandingPage