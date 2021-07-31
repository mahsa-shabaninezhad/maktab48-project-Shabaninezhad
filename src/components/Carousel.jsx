import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Button, Radio, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import CarouselCard from './CarouselCard';

const useStyles = makeStyles(theme => {
    const state = {
        'لپ تاپ': {
            color: theme.palette.primary.light,
            backgroundColor: theme.palette.secondary.light
        },
        'دوربین': {
            color: theme.palette.secondary.main,
            backgroundColor: '#DADAD9'
        },
        'گوشی موبایل': {
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.light
        }
    }
    return({
    root: {
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-around', 
        flexGrow: 1,
        height: '100%',
        padding: theme.spacing(1, 0),
        color: props => state[props.category].color || '#000',
        backgroundColor: props => state[props.category].backgroundColor || '#fff',
    },
})})

const Carousel = ({products, ...props}) => {
    const classes = useStyles(props)
    const [showingProductId, setShowingProductId] = useState(products[0].id)
    const carousel = useRef()
    const timer = useRef()
    
    let n = 0;
    useEffect(() => {
        //start auto play 
        timer.current = setInterval(() => {
            n = n<5? ++n : 0
            setShowingProductId(products[n].id)
        },3500)

        //pause auto play each time mouse is on carousel
        const pauseTimer = () => {
            clearInterval(timer.current)
        }
        carousel.current.addEventListener('mouseenter', pauseTimer)
        return () => {
            clearInterval(timer)
            // carousel.current.removeEventListener('mouseenter', pauseTimer)
        }
    }, [])

    useEffect(() => {
        //resume auto play each time mouse is out of carousel
        const resumeTimer = () => timer.current = setInterval(() => {
            n = n<5? ++n : 0
            setShowingProductId(products[n].id)
        },3500)
        
        carousel.current.addEventListener('mouseleave', resumeTimer)
        return () => {
            // carousel.current.removeEventListener('mouseleave', resumeTimer)
        }
    }, [])

    const productChanged = (id) => {
        const productIndex = products.findIndex(item => item.id == id)
        return products[productIndex]
    }

    //change card when choosing each radio button
    const handleChange = (e) => {
        clearInterval(timer.current)
        setShowingProductId(Number(e.target.value))
    }


    return (
        <div ref={carousel} className={classes.root}>
            <SwitchTransition>
                <CSSTransition
                  key={showingProductId}
                  addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                  }}
                  appear
                  classNames="fade"
                >
                  <div className="button-container">
                      <CarouselCard product={productChanged(showingProductId)}/>
                  </div>
                </CSSTransition>
            </SwitchTransition>
            <Box textAlign='center' width='100%'>
                {products?.map(item => <Radio
                        key={item.id}
                        checked={item.id == showingProductId}
                        onChange={handleChange}
                        value={item.id}
                        name={item.model}
                        inputProps={{ 'aria-label': item.model }}
                        color={props.category==='لپ تاپ'? 'primary' : 'secondary'}
                    />
                )}
            </Box>
            <Button component={RouterLink} to={`/products?category=${props.category}`} variant='contained' color={props.category==='لپ تاپ'? 'primary' : 'secondary'} style={{margin: '1rem auto', textAlign: 'center'}}>همه محصولات</Button>
        </div>
    )
}

export default Carousel
