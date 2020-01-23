import React, {useEffect, useState, useCallback} from 'react'
import {connect} from 'react-redux'
import {withProductService} from '../hoc'
import actions from '../../actions'
import FilterItem from '../filter-item'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import './filter.scss'

const check = <FontAwesomeIcon icon={faCheck}  className="filter__icon top"/>
const check2 = <FontAwesomeIcon icon={faCheck}  className="filter__icon bottom"/>

const useFilter = ({products, productstoreService, productsLoaded, }) => {

    const data = useCallback(()=>productstoreService.getProducts(),[products])

    
    const [state, setState] = useState({})
 


    useEffect(() => {
        ()=> productsLoaded(data)
        if(products){
            let group = []
            let color = []
            let processor = []
            let geheugen = []
            let price = []

            products.map((product)=>{
                
                group.push(product.group)
                color.push(product.color)
                processor.push(product.processor)
                geheugen.push(product.geheugen)
                price.push(product.price)
            })
            const newGroup = new Set(group)
            const newColor = new Set(color.flat())
            const newProcessor = new Set(processor.flat())
            const newGeheugen = new Set(geheugen.flat())
            const newPrice= new Set(price.flat())
    
            let data = {
                group: [...newGroup],
                color: [...newColor],
                processor: [...newProcessor],
                geheugen: [...newGeheugen], 
                price: [...newPrice],
            }

            
                setState(data)


        }
        
    }, [products ])

    if(Object.keys(state).length > 0) {
        return state
    }
    

}   

const Filter = ({products, productstoreService, productsLoaded, addFilters, addFilterSearch}) =>{


    const [newFilter, setNewFilter] = useState({})
    const [priceState, setPriceState] = useState({
        min: 30000,
        max: 50000
    })
    const [searchState, setSearchState] = useState(false)
    

    const filters = useFilter({products, productstoreService, productsLoaded})
    useEffect(() => {
        addFilters(filterClear(newFilter))
    }, [newFilter, filters])

    const filterClear = (state) => {
        let data = {}
        for(let keys in state){
            if(state[keys].length != 0){
                data[keys] = state[keys]
            }
        }
        return data
    }


    const handleGroup = (e) =>{
        
        let newItem = null
        let group = null
        let value = null
        const {min, max} = priceState

        if(e.target === undefined) {
            group = 'price'
            value = [min, max]
        } else{
            newItem = e.target.value.split("_")
            group = newItem[0]
            value = newItem[1]
        }

        if(searchState) {
            if(newFilter.hasOwnProperty(group) && group != 'price'){
            let index = newFilter[group].findIndex((item) => item === value)

            
            if(index === -1) {
                setNewFilter({
                    ...newFilter, 
                    [group] : [...newFilter[group],value]
                })
            } else{
                setNewFilter({
                    ...newFilter, 
                    [group] : [...newFilter[group].slice(0, index),...newFilter[group].slice(index + 1)]
                })
            }
        } else{

            setNewFilter({
                ...newFilter, 
                [group] : [value]
            })
        }
        } else{
            if(newFilter.hasOwnProperty(group) && group != 'price'){
                let index = newFilter[group].findIndex((item) => item === value)
    
                
                if(index === -1) {
                    setNewFilter({
                        ...newFilter, 
                        [group] : [value]
                    })
                } 
                else{
                    setNewFilter({
                        ...newFilter, 
                        [group] : [...newFilter[group].slice(0, index),...newFilter[group].slice(index + 1)]
                    })
                }
            } else{
    
                setNewFilter({
                    ...newFilter, 
                    [group] : [value]
                })
            }
        }
    }
    
    
    const RenderGroup = ({filters, newFilter}) => {
        let items = []
        for(let keys in filters){
            keys != 'price' && items.push(
                <FilterItem filterGroup={filters[keys]} handleGroup={handleGroup}
                    group={keys}
                    key={keys}
                    filterChecked={newFilter[keys]}
                    />
            )
        }
        return items
    }
    
 
   


    return(
        <div className="filter">
            <>
                <button 
                className="filter__search"
                onClick={()=>{
                    setSearchState(!searchState) 
                    setNewFilter({})
                    addFilterSearch()
                }}>
                    Режим
                    <br/> 
                    сравнения
                    <span className={searchState ? "filter__search-wrapper" : "filter__search-wrapper search--true"}>
                        <span className="filter__search-item">                        
                            {check}
                            {check2}
                        </span>
                    </span>

                    </button>
                <RenderGroup filters={filters} newFilter={newFilter}
                />
                <InputRange
                className='filter__input-range'
                draggableTrack
                maxValue={100000}
                minValue={0}
                formatLabel={value => `${value} руб.`}
                value={priceState}
                onChange={(value) =>{
                    
                    handleGroup(value)
                    setPriceState(value)
                }}
                />
            </>
        </div>
    )
}



const mapStateToProps = ({products: {products},}) => {
    return{ products,  }
}
export default  withProductService()(connect(mapStateToProps, actions)(Filter))


