import React from 'react'
import {ProductServiceConsumer} from '../productstore-service-context'

const withProductService = () =>(Wrapped)=>{


    return (props) => { 
        return (
            <ProductServiceConsumer>
                {
                    (productstoreService) => {
                        return (<Wrapped {...props} productstoreService={productstoreService}/>)
                    }
                }
            </ProductServiceConsumer>
        )

    }
}

export default withProductService

