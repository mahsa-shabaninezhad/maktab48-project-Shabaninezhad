import React from 'react'
import { Button, Box, makeStyles, Paper, Typography, Link } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { useContext } from 'react';
import { BasketContext } from '../context/BasketContext/BasketContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        border: `1px solid #DADAD9`,
        borderRadius: 20,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4),
        minHeight: 170,
        background: ` linear-gradient(15deg, #ffffff, #d5d5d5);`,
        boxShadow:  `-25px 25px 50px #e8e8e8,
            25px -25px 50px #ffffff`,
        '@media screen and (max-width:600px)': {
            flexDirection: 'column'
        },      
    },
    title: {
        cursor: 'pointer',
        width: '100%',
        margin: theme.spacing(2,0,4)
    },
    btn: {
        minWidth: 20,
    },
    input: {
        width: 50,
        textAlign: 'center',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        objectFit:'contain',
        margin: theme.spacing(0,2)
    },
    quantity: {
        display: 'flex',
        width: '90px',
        marginRight: theme.spacing(2)
    },
    price: {
        marginLeft: 'auto',
        '@media screen and (max-width: 395px)': {
            marginTop: theme.spacing(2)
        }
    }
}))

const BasketCard = ({product, number, inventory}) => {
    const classes = useStyles()
    const {addToCart, deleteAProductFromCart, deleteAllProductOfOneTypeFromCart} = useContext(BasketContext)
    const history = useHistory()

    /*when there is one product it must be removed from array of basket
    and when it is more than one just need to reduce its number*/
    const handleDeleteAProduct = () => {
        if(number !== 1){
            deleteAProductFromCart(product.id)
        }else{
            deleteAllProductOfOneTypeFromCart(product.id)
        }
    }
    return (
        <div className={classes.root}>
            <img src={product?.image} alt={product?.model} className={classes.image}/>
            <Box display='flex' flexWrap='wrap' justifyContent='space-between' flexGrow={1}>
                <Link 
                    color='secondary' 
                    className={classes.title} 
                    onClick={() => history.push(`/product/${product.brand}/${product.id}`)}
                >
                    {product.title}
                </Link>
                <Paper className={classes.quantity}>
                    <Button className={classes.btn} onClick={() => addToCart(product.id)} disabled={number >= inventory}>+</Button>
                    <Box className={classes.input}>{number}</Box>
                    <Button className={classes.btn} onClick={handleDeleteAProduct} disabled={!number}>-</Button>
                </Paper>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteAllProductOfOneTypeFromCart(product.id)}
                >
                    حذف
                </Button>
                <Typography 
                    className={classes.price} 
                    variant='h3' 
                    component='p'
                >
                    {(product.price)?.toLocaleString('ar-EG')}<Box fontSize='1rem' component='span'>تومان</Box>
                </Typography>
            </Box>
        </div>
    )
}

export default BasketCard
