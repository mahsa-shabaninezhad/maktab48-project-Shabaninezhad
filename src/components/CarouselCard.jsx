import { makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    carouselCard: {
        width: '100%',
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    image: {
        width: '400px', 
        height:'300px', 
        objectFit: 'contain',
        '@media screen and (max-width: 425px)':{
            width: '90%'
        }
    },
    title: {
        padding: theme.spacing(0, 1)
    }
}))

const CarouselCard = ({product}) => {
    const classes = useStyles()
    return(
        <div className={classes.carouselCard}>
            <img src={product.image} alt={product.model} className={classes.image}/>
            <Typography variant='h1' className={classes.title}>{product.model}</Typography>
        </div>
    )
}

export default CarouselCard