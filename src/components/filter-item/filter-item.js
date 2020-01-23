import React from 'react'
import './filter-tems.scss'

const FilterItem = ({filterGroup, handleGroup, group, filterChecked}) =>{
    const nameTitle = {
        group: 'Смартфон',
        color: 'Цвет',
        processor: 'Процессор',
        geheugen: 'Объем встроенной памяти',
        price: 'Стоимость'
    }

    const sortFucn = () =>{
        filterGroup = filterGroup.sort()
        const result = filterGroup.sort((a,b)=>{
            if(parseFloat(a) === NaN){
                return 
            }
            return parseInt(a) - parseInt(b)
        })
        return result
    }
    
    return(
        <div className="filter__box">
            <h2 className="filter__box-title">{nameTitle[group]}</h2>
            {
                sortFucn().map((filter)=>{
                    
                    const check = filterChecked === undefined ? false : filterChecked.find((item)=> item === filter)
                    let classItem = "filter__box-label"
                    classItem = check ? classItem += ' active' : classItem
                    return(
                        <label key={filter} className={classItem}>
                        {filter[0].toUpperCase() + filter.substring(1)}
                        <input type="checkbox"
                        value={`${group}_${filter}`}
                        onChange={handleGroup}
                        checked={check}
                        />
                    </label>
                    )
                })
            }
        </div>
    )
}

export default FilterItem