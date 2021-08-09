import React from 'react'
import { makeStyles } from '@material-ui/styles'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Icon from './Icon'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const uesStyles = makeStyles(theme => {
    return({
    container: {
        width: 250,
        minHeight: 380,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        padding: theme.spacing(0, 3),
        transition: 'transform .5s',
        textDecoration: 'none',
        color: theme.palette.text.primary,

        '&::after': {
            transition: 'all .5s',
            content: '""',
            position: 'absolute',
            zIndex: -1,
            top: '8rem',
            left: 0,
            bottom: 0,
            right: 0,
            overflow: 'hidden',
            borderRadius: 20,
            background: ` linear-gradient(315deg, #ffffff, #e6e6e6);`,
            boxShadow:  `-25px 25px 50px #e8e8e8,
            25px -25px 50px #ffffff`,
            contain: 'strict'
            
            
        },
        
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.05)',
            '& $likeIcon': {
                visibility: 'visible'
            }
        },
        '&:hover::after': {
            background: ` linear-gradient(315deg, #ffffff, #d5d5d5);`,
            boxShadow:  `-25px 25px 50px #d5d5d5,
            25px -25px 50px #ffffff`,
            top: '-1rem',

        },

    },
    image: {
        width: 200,
        height: 150,
        objectFit: 'contain',
        marginBottom: '1rem'
    },
    button: {
        border: 'none',
        padding: theme.spacing(1.3,3),
        marginTop: 'auto',
        marginBottom: '1rem',
        color: '#fff',
        backgroundColor: '#000',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 34,
        fontFamily: 'Yekan'
    }, 
    likeIcon: {
        alignSelf: 'flex-start',
        visibility: 'hidden',
        
    }
})})

const ProductCard = ({product}) => {
    const [like, setLike] = useState(false)
    const classes = uesStyles()

    return (
        <Link to={`product/${product.brand}/${product.id}`}  className={classes.container} onDoubleClick={() => setLike(!like)}>
            {<span className={classes.likeIcon} onClick={(e)=> {
                e.stopPropagation()
                e.preventDefault()
                setLike(!like)
                }}>
                <Icon component={FavoriteIcon} color={like?'red':'gray'} />
            </span>}
            <img src={product.image} alt={product.model} className={classes.image} />
            <h4 style={{textAlign: 'center', margin: 0}}>{product.title}</h4>
            <button className={classes.button}>سفارش دهید</button>
        </Link>
    )
}

export default ProductCard
