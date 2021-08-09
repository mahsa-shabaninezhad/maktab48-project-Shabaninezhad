import React, { useEffect, useState } from 'react'
import { Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useHistory } from 'react-router-dom';
import useQuery from '../hooks/useQuery'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '3rem'
    },
    btn: {
        minWidth: 10,
        padding: theme.spacing(1, 2),
        backgroundColor: '#DADAD9',
        borderRadius: '50%',
        marginRight: theme.spacing(),
        '&:hover': {
            backgroundColor: theme.palette.info.main
        }
    },
    active: {
        backgroundColor: theme.palette.info.light,
        '&:hover': {
            backgroundColor: theme.palette.info.main
        }
    }
    
}))

const StorePagination = ({ paginateInfo={} }) => {
    const {paginationLinks, pagesNumber} = paginateInfo
    const classes = useStyles()

    const query = useQuery()
    const history = useHistory()

    //next and prev key functionality
    const goToNextPage = () => {
        history.push(paginationLinks.next)
    }
    
    const goToPrevPage = () => {
        history.push(paginationLinks.prev)
    }

    //create 3 item base on current page
    const createPaginationItems = (start, finish) => {
        const pagesArr = []
        for (let page = start; page <= finish ; page++) {
            pagesArr.push(
                <Button 
                    id={page}
                    variant='contained'  
                    className={clsx(classes.btn, {[classes.active]: page == query.get('_page')})}
                    onClick = {() => {
                        query.set('_page', page)
                        history.push(`products?${query.toString()}`)
                    }}
                >
                    {page}
                </Button>
            )
        }
        /* revese array because of rtl direction */
        return pagesArr.reverse()
    }

    const showPaginationItemsBaseOnCurrentPage = (curPage) => {
        curPage = Number(curPage)
        switch (curPage) {
            case 1:
                const finish = pagesNumber < 3 ? pagesNumber : curPage + 2
                return(createPaginationItems(1, finish))
            case pagesNumber:
                const start = pagesNumber-2 > 0 ? pagesNumber-2 : 1
                return(createPaginationItems(start , pagesNumber))
        
            default:
                return(createPaginationItems(curPage - 1, curPage + 1))
        }
    }
    
    return (
        <div className={classes.root}>
            <IconButton onClick={goToNextPage} disabled={!paginationLinks?.next}>
                <ArrowRightIcon/>
            </IconButton>
            {pagesNumber && showPaginationItemsBaseOnCurrentPage(query.get('_page'))}
            <IconButton onClick={goToPrevPage} disabled={!paginationLinks?.prev}>
                <ArrowLeftIcon/>
            </IconButton>
        </div>
    )
}

export default StorePagination
