import React, {useEffect, useState, useMemo} from 'react'
import "./product-list-item.scss"

const ProductListItem = ({product, filters, onAddedToCart, isSearch}) =>{
    
    const {id,
        name,
        group,
        color,
        processor,
        geheugen,
        price,
        src} = product
    
     

        const nameItem = {
            name: null,
            color: 'Цвет',
            processor: 'Процессор',
            geheugen: 'Объем встроенной памяти',
            price: null
        }

        useEffect(() => {

        }, [])


        const newColor = (arr, id, filterArr = []) =>{
            
            let result =  arr.map((e,i)=>{
                let classItem = 'box__item-color'
                classItem = filterArr.indexOf(e) != -1 ? classItem += ' color-active' : classItem 
                return <span className={classItem} key={`${e}_${id}`}>{e} </span>
            })
            return result
        }

        

        const RenderItem = () => {
            let arr = []

            for(let key in nameItem){
                const classItem = 'box__item'
                if(filters && filters[key] != undefined ){
                    classItem += ' active'
                }
                if(key === 'color'){
                    classItem = 'box__item'
                    let colorList = null 
                    let filterColor = (filters && filters[key] != undefined) ? filters[key] : undefined

                    colorList = newColor(product[key],id,filterColor)
                    arr.push(
                    <li  key={`${id}__${key}`} className={classItem}>{`${nameItem[key]}: `}{colorList}</li>
                        )
                    continue 
                }
                

                const title = nameItem[key] != null ? `${nameItem[key]}:` : undefined
                const text  = title != undefined ? `${title}: ${product[key]}` : product[key]
                arr.push(
                        <li key={`${id}__${key}`}  className={classItem}>{title}<span className="box__info">
                           {title != undefined ? ` ${product[key]}`: product[key]} </span></li>
                )

            }
            
            return arr
        }






    return(
        <div className="product__item box">
            <div className="box__left">
                <img src={src} className="box__img"/>
            </div>
            <div className="box__right">
                <ul className="box__list list">
                    <RenderItem/>
                </ul>
                <button className="box__button"
                disabled = {isSearch}
                onClick={()=> {
                    onAddedToCart(id,filters)
                }}>В корзину</button>
            </div>
        </div>
    )

}

export default ProductListItem