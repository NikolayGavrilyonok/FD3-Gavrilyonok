import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './productForm.css';

class ProductForm extends React.Component {
    state = {
        formLines: this.buildFormLines()
    }

    buildFormLines() {
        return (
                <div className = 'formLines'>
                    <span key = 'flsn' className = 'formLine'>Product name</span>
                    <span key = 'flsp' className = 'formLine'>Price</span>
                    <span key = 'flsu' className = 'formLine'>URL</span>
                    <span key = 'flsr' className = 'formLine'>Remaining</span>
                </div>
            );
    }

    buildInputs = (validationResult) => {
        return {
            name: validationResult.name
                    ? null
                    : {id: 'errorName', title: 'Field must not be empty'},
            price: validationResult.price
                    ? null
                    : {id: 'errorPrice', title: 'Digits only. Field must not be empty'},
            href: validationResult.href
                    ? null
                    : {id: 'errorUrl', title: 'Field must not be empty'},
            remaining: validationResult.remaining
                    ? null
                    : {id: 'errorRemaining', title: 'Digits only. Field must not be empty'}
        };
    }

    callBackPush = () => {
        let name = this.state.nameAdd;
        let price = this.state.priceAdd;
        let href = this.state.hrefAdd;
        let remaining = this.state.remainingAdd;

        if (!name || !price || !href ||!remaining) {
            return alert('Fill in all the fields of the form.');
        }
        if (confirm('Save changes?')) {
        // Validate values
            let result = this.validate(name, price, href,remaining);
        // Buil an object of inputs with errors
            let markedInput = this.buildInputs(result);
            if (!result.name || !result.price || !result.href || !result.remaining) {
                this.setState( {markedInput: markedInput} );
                return alert('Fill out the form with the correct data.\nHover the mouse pointer over the field to see a tooltip.');
            }
        // Continue if validation has been successful
            this.props.callBackPush(name, price, href, remaining);
        }
    }

    callBackDiscard = () => {
        if (confirm('Discard changes?')) {
            this.props.callBackDiscard();
        }
    }

    callBackSave = (event) => {
        if (confirm('Save changes?')) {
            let name = this.state.name === undefined ? this.props.product[0].text : this.state.name;
            let price = this.state.price === undefined ? this.props.product[1].text : this.state.price;
            let href = this.state.href === undefined ? this.props.product[2].href : this.state.href;
            let remaining = this.state.remaining === undefined ? this.props.product[3].text : this.state.remaining;
        // Validate values
            let result = this.validate(name, price, href,remaining);
        // Build an object of inputs with errors
            let markedInput = this.buildInputs(result);
        // Return with alert if validation failed
            if (!result.name || !result.price || !result.href || !result.remaining) {
                this.setState( {markedInput: markedInput} );
                return alert('Fill out the form with the correct data.\nHover the mouse pointer over the field to see a tooltip.');
            }
        // Continue if validation has been successful
            let productKey = this.props.productKey;
            this.props.callBackSave(productKey, name, price, href, remaining);
        }
    }

    validateString = (value) => {
        if (!value.trim().length) {
            return false;
        }
        return true;
    }

    validateNumber = (value) => {
        if (!Number(value) || value < 1) {
            return false;
        }
        return true;
    }

    validate = (name, price, href, remaining) => {
        return {
            name: this.validateString(name),
            price: this.validateNumber(price),
            href: this.validateString(href),
            remaining: this.validateNumber(remaining)
        };
    }

    callBackOnChange = (event) => {
        if (event.target.className === 'formLineAdd') {
            let key = event.target.name + 'Add';
            return this.setState( {[key]: event.target.value} );
        }
        this.setState( {[event.target.name]: event.target.value} );
    }

    render() {
        if (!this.props.workMode) {
            return null;
        }

        let formLines = this.state.formLines;
        let markedInput = this.state.markedInput;
        let productInfo = null;

        let saveButton =
            <input key = 'pfis' className = 'saveButton' type = 'button'
            value = 'Save' onClick = {this.callBackSave}></input>;
        let discardButton =
            <input key = 'pfid' className = 'discardButton' type = 'button'
            value = 'Discard' onClick = {this.callBackDiscard}></input>;
        let addButton =
            <input key = 'pfia' className = 'formAddButton' type = 'button'
            value = 'Add' onClick = {this.callBackPush}></input>;

        if (this.props.workMode === 'view') {
            productInfo =
                <div className = 'productInfo'>
                    {
                        this.props.product.map( (value) =>
                            <span key = {value.key} className = 'formLine'>
                                {
                                    value.href
                                    ? <a href = {value.href}>{value.href}</a>
                                    : value.text
                                }
                            </span>
                        )
                    }
                </div>;
        }
        if (this.props.workMode === 'edit') {
            productInfo =
                <div className = 'productInfo'>
                    {
                        this.props.product.map( (value) =>
                            <input key = {value.key} className = 'formLine'
                            type = 'text' name = {value.className}
                            onChange = {this.callBackOnChange}
                            defaultValue = {
                                    value.href && value.href || value.text
                                }
                            id = {
                                    ( markedInput && markedInput[value.className] )
                                    && markedInput[value.className].id
                                }
                            title = {
                                    ( markedInput && markedInput[value.className] )
                                    && markedInput[value.className].title
                                }
                            >
                            </input>
                        )
                    }
                    {saveButton}
                    {discardButton}
                </div>;
        }
        if (this.props.workMode === 'add') {
            productInfo =
                <div className = 'productInfo'>
                    <input key = 'pfan' className = 'formLineAdd' type = 'text'
                        name = 'name' onChange = {this.callBackOnChange}
                        id = {
                            ( markedInput && markedInput.name )
                            && markedInput.name.id
                        }
                        title = {
                            ( markedInput && markedInput.name )
                            && markedInput.name.title
                        }>
                    </input>
                    <input key = 'pfap' className = 'formLineAdd' type = 'text'
                        name = 'price' onChange = {this.callBackOnChange}
                        id = {
                            ( markedInput && markedInput.price )
                            && markedInput.price.id
                        }
                        title = {
                            ( markedInput && markedInput.price )
                            && markedInput.price.title
                        }>
                    </input>
                    <input key = 'pfau' className = 'formLineAdd' type= 'text'
                        name = 'href' onChange = {this.callBackOnChange}
                        id = {
                            ( markedInput && markedInput.href )
                            && markedInput.href.id
                        }
                        title = {
                            ( markedInput && markedInput.href )
                            && markedInput.href.title
                        }>
                    </input>
                    <input key = 'pfar' className = 'formLineAdd' type = 'text'
                        name = 'remaining' onChange = {this.callBackOnChange}
                        id = {
                            ( markedInput && markedInput.remaining )
                            && markedInput.remaining.id
                        }
                        title = {
                            ( markedInput && markedInput.remaining )
                            && markedInput.remaining.title
                        }
                    >
                    </input>
                    {addButton}
                    {discardButton}
                </div>;
        }

        return (
                <div className = 'productFormBlock'>
                    <form className = 'productForm'>
                        {formLines}
                        {productInfo}
                    </form>
                </div>
            );
    }
}

export default ProductForm;