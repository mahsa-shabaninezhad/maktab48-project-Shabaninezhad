import { makeStyles } from '@material-ui/core'
import { Button, Typography, Divider } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/actions/modalActions'
import { deleteAProduct } from '../../store/actions/productAtions'

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1, 3)
    },
    title: {
        marginBottom: theme.spacing(1),
        fontSize: '16px'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

const DeleteModal = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const deletedProduct = useSelector(state => state.products.deletedProduct)

    return (
        <div className={classes.container}>
            <Typography variant='p' component='p' className={classes.title}>
                {`آیا از حذف مطمئن هستید؟`}
            </Typography>
            <Divider variant="middle" />
            <div className={classes.buttons}>
                <Button color='secondary' onClick={() => dispatch(closeModal())}>خیر</Button>
                <Button color='primary' onClick={() => dispatch(deleteAProduct(deletedProduct))}>بله</Button>
            </div>
        </div>
    )
}

export default DeleteModal
