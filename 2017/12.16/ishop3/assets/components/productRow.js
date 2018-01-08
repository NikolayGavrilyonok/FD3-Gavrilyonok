import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './productRow.css';

class ProductRow extends React.Component {
    static propTypes = {
        row: PropTypes.object.isRequired,
        callBackView: PropTypes.func.isRequired,
        callBackEdit: PropTypes.func.isRequired,
        callBackDelete: PropTypes.func.isRequired
    }

    state = {
        productKey: this.props.row.key,
        row: this.props.row,
        product: this.props.row.product
    }

    callBackView = (event) => {
        if (event.target.className === 'name') {
            let productKey = this.props.row.key;
            let product = this.props.row.product;
            this.props.callBackView(productKey, product, 'view');
        }
    }

    callBackEdit = (event) => {
        if (event.target.tagName === 'INPUT') {
            let productKey = this.props.row.key;
            let product = this.props.row.product;
            this.props.callBackEdit(productKey, product, 'edit');
        }
    }

    callBackDelete = (event) => {
        if (confirm('Delete product?')) {
            this.props.callBackDelete(this.state.productKey);
        }
    }

    render() {
        let row = this.state.row;
    // Build buttons
        let editButton =
            <input key = {row.editKey} className = 'editButton' type = 'button'
                value = 'Edit' onClick = {this.callBackEdit}/>;
        let deleteButton =
            <input key = {row.deleteKey} className = 'deleteButton' type = 'button'
                value = 'Delete' onClick = {this.callBackDelete}/>;
    // Build product
        let product = row.product.map( (value) =>
                <span key = {value.key} className = {value.className} onClick = {this.callBackView}>
                    {
                        value.href
                        && <a href = {value.href}>{value.text}</a>
                        || value.text
                    }
                </span>
            );

        return (
                <div className = 'row productRow' id = {this.props.id || null}>
                    {editButton}
                    {deleteButton}
                    {product}
                </div>

            );
    }
}

export default ProductRow;