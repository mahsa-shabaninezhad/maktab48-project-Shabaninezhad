import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import AdminPanelLayout from './Layouts/AdminPanelLayout'
import StoreLayout from './Layouts/StoreLayout'


export const AdminPanelRoute = ({component: Component, ...rest}) => {
    
    const isAdminLogedIn = useSelector(state => state.admin.isLogedIn)

    return ( 
        <Route {...rest}
            render={
                props => {
                    if(isAdminLogedIn){
                        return (<AdminPanelLayout>
                                    <Component {...props}/>
                                </AdminPanelLayout>)
                    } else{
                        return (
                        <Redirect to={{
                            pathname:"/login",
                            state:{
                                from: props.location,
                            }
                        }}/>)
                    }
                }
            }

        />
    )
}


export const StoreRoute = ({component: Component, ...rest}) => {
    
    return ( 
        <Route {...rest}
            render={
                props => <StoreLayout>
                            <Component {...props}/>
                        </StoreLayout>
            }

        />
    )
}

