import React from 'react';
import './shopping-cart-table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinus, faTrash  } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import actions from '../../actions';

const plus = <FontAwesomeIcon icon={faPlusSquare}  className="shopping__icon"/>
const minus = <FontAwesomeIcon icon={faMinus}  className="shopping__icon"/>
const trash = <FontAwesomeIcon icon={faTrash}  className="shopping__icon"/>

const ShoppingCartTable = ({items, total, allProductsRemovedToCart, productRemovedToCart, productAddedToCart}) => {
    const renderRow = (item, idx) =>{
        const {id, name, count, total, color, processor, geheugen, newId}  = item
        return(
        <tr key={`${newId}_${id}_${name}_${color}_${processor}`}>
            <td>{idx+1}</td>
            <td>{name}</td>
            <td>{color}</td>
            <td>{processor}</td>
            <td>{geheugen}</td>
            <td>{count}</td>
            <td>{total}</td>
            <td>
            <button className="shopping__button button-remove"
            onClick={()=> productRemovedToCart(newId)}>
                {minus}
            </button>
            <button className="shopping__button button-add"
            onClick={()=> productAddedToCart(newId)}>
                {plus}
            </button>
            <button className="shopping__button button-delete"
            onClick={()=> allProductsRemovedToCart(newId)}>
                {trash}
            </button>
            </td>
        </tr>
    )}
    return (
        <div className="shopping__cart-table">
            <h2>Your Order</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Смартфон</th>
                    <th>Цвет</th>
                    <th>Процессор</th>
                    <th>Объем встроенной памяти</th>
                    <th>Кол-во</th>
                    <th>Цена</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {
                        items.map(renderRow)
                    }
                </tbody>
            </table>

            <div className="total">
                Total: {total}
            </div>
        </div>
    );
};


const mapStateToProps = (state) =>({
    items: state.products.cartItems,
    total: state.products.orderTotal
})



export default connect(mapStateToProps, actions)(ShoppingCartTable);
