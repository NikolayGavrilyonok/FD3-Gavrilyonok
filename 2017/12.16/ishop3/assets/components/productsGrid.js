import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ProductRow from './productRow';
import './productsGrid.css';

class ProductsGrid extends React.Component {
    static propTypes = {
        callBackAdd: PropTypes.func.isRequired,
        callBackDelete: PropTypes.func.isRequired,
        callBackEdit: PropTypes.func.isRequired,
        callBackView: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired
    }

    callBackAdd = () => {
        this.props.callBackAdd('add');
    }

    callBackView = (productKey, product, workMode) => {
        this.props.callBackView(productKey, product, workMode);
    }

    callBackEdit = (productKey, product, workMode) => {
        this.props.callBackEdit(productKey, product, workMode);
    }

    callBackDelete = (productKey) => {
        this.props.callBackDelete(productKey);
    }

    render() {
    // Build table header
        let tableHeader =
            <div className = 'row tableHeader'>
                <input type = 'button' className = 'addButton'
                    value = 'Add' onClick = {this.callBackAdd}/>
                <span className = 'name'>Product name</span>
                <span className = 'price'>Price</span>
                <span className = 'href'>URL</span>
                <span className = 'remaining'>Remaining</span>
            </div>;
    // Build rows of products
        let rows = this.props.products.map( (value) =>
                <ProductRow
                    key = {value.key} row = {value}
                    id = {value.key === this.props.productKey && 'marked'}
                    callBackView = {this.callBackView}
                    callBackEdit = {this.callBackEdit}
                    callBackDelete = {this.callBackDelete}
                />
            );

        return (
                <div className = 'productsGrid'>
                    {tableHeader}
                    {rows}
                </div>
            );
    }
}

export default ProductsGrid;