import React, { useState } from 'react'

export const PaymentContext = React.createContext({payInfo: null, setPayInfo: () => {} })

export const PaymentProvider = ({children}) => {
    const [payInfo, setPayInfo] = useState(null)
    return (
        <PaymentContext.Provider value={{payInfo, setPayInfo: (info) => setPayInfo(info)}}>
            {children}
        </PaymentContext.Provider>
    )
}

