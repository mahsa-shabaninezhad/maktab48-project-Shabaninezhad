import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import RouterLink from '../../components/RouterLink';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex', 
        minHeight: `calc(100vh - 82px)`,
        backgroundImage: `linear-gradient(to left, 
            ${theme.palette.primary.dark} 0%, 
            ${theme.palette.primary.dark} 75%, 
            transparent 75%)`,
            '@media (max-width: 1060px)': {
                flexDirection: 'column',
                backgroundImage: `linear-gradient(to top, 
                    ${theme.palette.primary.dark} 0%, 
                    ${theme.palette.primary.dark} 75%, 
                    transparent 75%)`,
            }
    },
    image: {
        width: 500,
        objectFit: 'contain',
        backgroundImage: `linear-gradient(to left,
            ${theme.palette.primary.dark}  0%, 
            ${theme.palette.primary.dark} 50%, 
            transparent 50%)`,
        margin: '0 1rem',
        '@media (max-width: 1200px)': {
            width: 380,
        },
        '@media (max-width: 1060px)': {
            width: '100%',
            maxHeight: 400,
            alignSelf: 'center',
            backgroundImage: 'none',
            backgroundImage: `linear-gradient(to top,
            ${theme.palette.primary.dark}  0%, 
            ${theme.palette.primary.dark} 50%, 
            transparent 50%)`,
            margin: '1rem 0',
        }
    },
    addBox: {
        display: 'flex',
        flexDirection: 'column', 
        margin: '0 2rem',
        minWidth: 200,
        '& > *': {
            marginBottom: '1rem'
        },
        '@media (max-width: 650px)': {
            margin: '2rem 0',
            alignSelf: 'center'
        }
    },
    title: {
        marginBottom: '1rem',
    },
    content: {
        display:'flex',
        justifyContent:'space-between',
        alignItems:'flex-start',
        flexWrap:'wrap',
        '@media (max-width: 650px)': {
            flexDirection: 'column-reverse'
        }
    },
    price: {
        '@media (max-width: 400px)': {
            fontSize: '1.8rem'
        }
    }
}))

const ProductPage = () => {
    const classes = useStyles()
    const {id}= useParams()
    //for showing less properties at first
    const [seeMore, setSeeMore] = useState(true)
    
    //get product
    const {response, isLoading} = useAxios({url: `products/${id}`})

    /*loop over properties in product object and make array of html element 
    because each category has different properties*/
    const properties = []
    for (const key in response?.properties) {
        properties.push(<p><strong dir='rtl'>{`${key}: `}</strong>{`${response.properties[key]}`}</p>)
    }

    return (
        <>
        {isLoading?
        <div style={{textAlign: 'center'}}>
            ...Loading
        </div>
        :<Box className={classes.root}>
            <img src={response.image} className={classes.image}/>
            <Box flexGrow='1' p='3rem 2rem 0'>
                <Typography variant='h1' className={classes.title}>{response.title}</Typography>
                <Box display='flex' marginBottom='1rem'>
                    <RouterLink to={`/products?category=${response.category}`}>
                        {response.category}
                    </RouterLink> 
                    <ArrowLeftIcon/> 
                    <RouterLink to={`/products?category=${response.category}&brand=${response.brand}`}>
                        {response.brand}
                    </RouterLink>
                </Box>
                <Box className={classes.content}>
                    <Box>
                        <Typography variant='h3'>ویژگی های کالا:</Typography>
                        <Box overflow='hidden' height={seeMore? '320px' : 'min-content' }>
                            {properties}
                        </Box>
                        <Button onClick={() => setSeeMore(!seeMore)}>{seeMore? 'مشاهده بیشتر': 'مشاهده کمتر'}</Button>
                    </Box>
                    <Box className={classes.addBox}>
                        {response.inventory &&<Typography variant='h4' component='p' className={classes.price}>
                            { (response.price)?.toLocaleString('ar-EG')}
                            <Typography component='subtitle1'>تومان</Typography>
                        </Typography>}
                        <Button variant='contained' color='secondary' disabled={!response.inventory}>{response.inventory?'افزودن به سبد خرید' : 'ناموجود'}</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
        }

        </>
    )
}

export default ProductPage
