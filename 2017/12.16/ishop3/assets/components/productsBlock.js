import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ProductsGrid from './productsGrid';
import ProductForm from './productForm';

import './productsBlock.css';

class ProductsBlock extends React.Component {
    static propTypes = {
        products: PropTypes.arrayOf(
                PropTypes.shape( {
                    deleteKey: PropTypes.string.isRequired,
                    editKey: PropTypes.string.isRequired,
                    key: PropTypes.string.isRequired,
                    product: PropTypes.arrayOf(
                            PropTypes.shape( {
                                className: PropTypes.string.isRequired,
                                key: PropTypes.string.isRequired,
                                text: PropTypes.any.isRequired
                            } )
                        ).isRequired
                } ).isRequired
            )
    }

    state = {
        products: this.props.products,
        productFormWorkMode: false
    }

    callBackAdd = (workMode) => {
        if (!this.state.productFormWorkMode) {
            return this.setState( {productFormWorkMode: workMode} );
        }
        else if (confirm('Add new product?\nUnsaved data might be lost.')) {
            this.setState( {productFormWorkMode: workMode, productKey: null} );
        }
    }

    callBackPush = (name, price, href, remaining) => {
        let newProduct = {
            deleteKey: 'dk' + name,
            editKey: 'ek' + name,
            key: 'k' + name,
            product: [
                {className: 'name', key: 'sn' + name, text: name},
                {className: 'price', key: 'sp' + name, text: price},
                {className: 'href', key: 'sh' + name, href: href, text: 'Link'},
                {className: 'remaining', key: 'sr' + name, text: remaining},]
        };
        let products = this.state.products;
        products.push(newProduct);
        this.setState( {products: products, productFormWorkMode: false} );
    }

    callBackView = (productKey, product, workMode) => {
        if (this.state.product === product
            && this.state.productFormWorkMode === workMode) {
            workMode = false;
        }
        this.setState( {productFormWorkMode: workMode} );
        workMode
        ? this.setState( {product: product, productKey: productKey} )
        : this.setState( {productKey: null} );
    }

    callBackEdit = (productKey, product, workMode) => {
        this.setState( {productFormWorkMode: workMode,
                        productKey: productKey, product: product,} );
    }

    callBackDelete = (productKey) => {
        let products = this.state.products;
        for (let i = 0; i < products.length; i++) {
            if (products[i].key === productKey) {
                products.splice(i, 1);
                return this.setState(
                        {products: products, productFormWorkMode: false,
                        productKey: null}
                    );
            }
        }
    }

    callBackSave = (productKey, name, price, href, remaining) => {
        let modifiedProducts = this.state.products.map( (value) => {
            if (value.key === productKey) {
                value.product.map( (product) => {
                    switch (product.className) {
                        case 'name':
                            if (name) {
                                product.text = name;
                            }
                            return product;
                        case 'price':
                            if (price) {
                                product.text = price;
                            }
                            return product;
                        case 'href':
                            if (href) {
                                product.href = href;
                            }
                            return product;
                        case 'remaining':
                            if (remaining) {
                                product.text = remaining;
                            }
                            return product;
                    }
                });
                return value;
            }
            else {
                return value;
            }
        });
        this.setState( {products: modifiedProducts,
                        productFormWorkMode: false,
                        productKey: null} );
    }

    callBackDiscard = () => {
        this.setState( {productFormWorkMode: false} );
    }

    render() {
        let form = this.state.productFormWorkMode;
        return (
                <div className = 'productsBlock'>
                    <ProductsGrid products = {this.state.products}
                        productKey = {form && this.state.productKey || null}
                        callBackView = {this.callBackView}
                        callBackEdit = {this.callBackEdit}
                        callBackDelete = {this.callBackDelete}
                        callBackAdd = {this.callBackAdd}
                    />
                    {
                        form &&
                        <ProductForm
                            productKey = {this.state.productKey}
                            product = {this.state.product} workMode = {form}
                            callBackDiscard = {this.callBackDiscard}
                            callBackSave = {this.callBackSave}
                            callBackPush = {this.callBackPush}
                        />
                    }
                </div>
            );
    }
}

export default ProductsBlock;