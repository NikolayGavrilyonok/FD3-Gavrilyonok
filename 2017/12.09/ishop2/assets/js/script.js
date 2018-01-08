/* global React */
/* global ReactDOM */
'use strict';

// Elements
const tableHeaderElements = [
    {key: 'thsn', className: 'name', text: 'Product name'},
    {key: 'thsp', className: 'price', text: 'Price'},
    {key: 'thsu', className: 'href', text: 'URL'},
    {key: 'thsr', className: 'remaining', text: 'Remaining'}];

const productsElements = [
    {
        key: 'pr1',
        editKey: 'pr1ebl',
        deleteKey: 'pr1dbl',
        product: [
            {key: 'pr1sn', className: 'name', text: 'Product 1'},
            {key: 'pr1sp', className: 'price', text: 100},
            {key: 'pr1su', className: 'href', href: 'https://www.google.com', text: 'Link'},
            {key: 'pr1sr', className: 'remaining', text: 10}]
    },
    {
        key: 'pr2',
        editKey: 'pr2ebl',
        deleteKey: 'pr2dbl',
        product: [
            {key: 'pr2sn', className: 'name', text: 'Product 2'},
            {key: 'pr2sp', className: 'price', text: 200},
            {key: 'pr2su', className: 'href', href: 'https://www.google.com', text: 'Link'},
            {key: 'pr2sr', className: 'remaining', text: 20}]
    },
    {
        key: 'pr3',
        editKey: 'pr3ebl',
        deleteKey: 'pr3dbl',
        product: [
            {key: 'pr3sn', className: 'name', text: 'Product 3'},
            {key: 'pr3sp', className: 'price', text: 300},
            {key: 'pr3su', className: 'href', href: 'https://www.google.com', text: 'Link'},
            {key: 'pr3sr', className: 'remaining', text: 30}]
    },
    {
        key: 'pr4',
        editKey: 'pr4ebl',
        deleteKey: 'pr4dbl',
        product: [
            {key: 'pr4sn', className: 'name', text: 'Product 4'},
            {key: 'pr4sp', className: 'price', text: 400},
            {key: 'pr4su', className: 'href', href: 'https://www.google.com', text: 'Link'},
            {key: 'pr4sr', className: 'remaining', text: 40}]
    },
    {
        key: 'pr5',
        editKey: 'pr5ebl',
        deleteKey: 'pr5dbl',
        product: [
            {key: 'pr5sn', className: 'name', text: 'Product 5'},
            {key: 'pr5sp', className: 'price', text: 500},
            {key: 'pr5su', className: 'href', href: 'https://www.google.com', text: 'Link'},
            {key: 'pr5sr', className: 'remaining', text: 50}]
    },
    {
        key: 'pr6',
        editKey: 'pr6ebl',
        deleteKey: 'pr6dbl',
        product: [
            {key: 'pr6sn', className: 'name', text: 'Product 6'},
            {key: 'pr6sp', className: 'price', text: 600},
            {key: 'pr6su', className: 'href', href: 'https://www.google.com', text: 'Link'},
            {key: 'pr6sr', className: 'remaining', text: 60}]
    },
    {
        key: 'pr7',
        editKey: 'pr7ebl',
        deleteKey: 'pr7dbl',
        product: [
            {key: 'pr7sn', className: 'name', text: 'Product 7'},
            {key: 'pr7sp', className: 'price', text: 700},
            {key: 'pr7su', className: 'href', href: 'https://www.google.com', text: 'Link'},
            {key: 'pr7sr', className: 'remaining', text: 70}]
    },
    {
        key: 'pr8',
        editKey: 'pr8ebl',
        deleteKey: 'pr8dbl',
        product: [
            {key: 'pr8sn', className: 'name', text: 'Product 8'},
            {key: 'pr8sp', className: 'price', text: 800},
            {key: 'pr8su', className: 'href', href: 'https://www.google.com', text: 'Link'},
            {key: 'pr8sr', className: 'remaining', text: 80}]
    },
    {
        key: 'pr9',
        editKey: 'pr9ebl',
        deleteKey: 'pr9dbl',
        product: [
            {key: 'pr9sn', className: 'name', text: 'Product 9'},
            {key: 'pr9sp', className: 'price', text: 900},
            {key: 'pr9su', className: 'href', href: 'https://www.google.com', text: 'Link'},
            {key: 'pr9sr', className: 'remaining', text: 90}]
    },
    ];

// Components
const TableHeader = React.createClass({
    displayName: 'tableHeader',

    propTypes: {
        header: React.PropTypes.arrayOf(
                React.PropTypes.shape( {
                    key: React.PropTypes.string.isRequired,
                    className: React.PropTypes.string.isRequired,
                    text: React.PropTypes.string.isRequired,
                } ).isRequired
            ),
        callBackAdd: React.PropTypes.func.isRequired
    },

    callBackAdd: function() {
        this.props.callBackAdd('add');
    },

    render: function() {
        let header = this.props.header;

        let input = React.DOM.input(
            {key: 'thi', className: 'addButton', type: 'button',
            value: 'Add', onClick: this.callBackAdd} );

        let headers = header.map( (value) =>
                React.DOM.span( {key: value.key, className: value.className},
                    value.text )
            );

        return React.DOM.div( {className: 'row tableHeader'}, input, headers );
    },
});

const ProductRow = React.createClass({
    displayName: 'productRow',

    propTypes: {
        row: React.PropTypes.object.isRequired,
        callBackView: React.PropTypes.func.isRequired,
        callBackEdit: React.PropTypes.func.isRequired,
        callBackDelete: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            productKey: this.props.row.key,
            row: this.props.row,
            product: this.props.row.product
        };
    },

    callBackView: function(event) {
        if (event.target.className === 'name') {
            let productKey = this.props.row.key;
            let product = this.props.row.product;
            this.props.callBackView(productKey, product, 'view');
        }
    },

    callBackEdit: function(event) {
        if (event.target.tagName === 'INPUT') {
            let productKey = this.props.row.key;
            let product = this.props.row.product;
            this.props.callBackEdit(productKey, product, 'edit');
        }
    },

    callBackDelete: function() {
        if (confirm('Delete product?')) {
            this.props.callBackDelete(this.state.productKey);
        }
    },

    render: function() {
        let row = this.state.row;
        let editButton = React.DOM.input(
                {key: row.editKey, className: 'editButton', type: 'button',
                value: 'Edit', onClick: this.callBackEdit} );
        let deleteButton = React.DOM.input(
                {key: row.deleteKey, className: 'deleteButton', type: 'button',
                value: 'Delete', onClick: this.callBackDelete} );

        let rows = this.state.row.product.map( (value) =>
                React.DOM.span( {key: value.key, className: value.className},
                        value.href
                        ? React.DOM.a( {href: value.href}, value.text )
                        : value.text )
            );

        return React.DOM.div(
                {className: 'row productRow', onClick: this.callBackView,
                id: this.props.id}, editButton, deleteButton, rows );
    }
});

const ProductsGrid = React.createClass({
    displayName: 'productGrid',

    propTypes: {
        callBackAdd: React.PropTypes.func.isRequired,
        callBackDelete: React.PropTypes.func.isRequired,
        callBackEdit: React.PropTypes.func.isRequired,
        callBackView: React.PropTypes.func.isRequired,
        products: React.PropTypes.array.isRequired
    },

    callBackAdd: function(workMode) {
        this.props.callBackAdd(workMode);
    },

    callBackView: function(productKey, product, workMode) {
        this.props.callBackView(productKey, product, workMode);
    },

    callBackEdit: function(productKey, product, workMode) {
        this.props.callBackEdit(productKey, product, workMode);
    },

    callBackDelete: function(productKey) {
        this.props.callBackDelete(productKey);
    },

    render: function() {
        let rows = this.props.products.map( (value) =>
                React.createElement(
                    ProductRow,
                    {key: value.key, row: value,
                    id: (value.key === this.props.productKey)
                        ? 'marked'
                        : null,
                    callBackView: this.callBackView,
                    callBackEdit: this.callBackEdit,
                    callBackDelete: this.callBackDelete} )
            );

        return React.DOM.div( {className: 'productGrid'},
                React.createElement(
                    TableHeader,
                    {header: tableHeaderElements,
                    callBackAdd: this.callBackAdd} ),
                    rows
            );
    }
});

const ProductForm = React.createClass({
    displayName: 'productForm',

    propTypes: {
        callBackDiscard: React.PropTypes.func.isRequired,
        callBackPush: React.PropTypes.func.isRequired,
        callBackSave: React.PropTypes.func.isRequired,
        product: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            formLines: this.buildFormLines(),
        };
    },

    buildFormLines: function() {
        return React.DOM.div( {className: 'formLines'},
                React.DOM.span( {key: 'flsn', className: 'formLine'},
                    'Product name' ),
                React.DOM.span( {key: 'flsp', className: 'formLine'},
                    'Price' ),
                React.DOM.span( {key: 'flsu', className: 'formLine'},
                    'URL' ),
                React.DOM.span( {key: 'flsr', className: 'formLine'},
                    'Remaining' ),
            );
    },

    buildInputs: function(validationResult) {
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
    },

    callBackPush: function() {
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
    },

    callBackDiscard: function() {
        if (confirm('Discard changes?')) {
            this.props.callBackDiscard();
        }
    },

    callBackSave: function(event) {
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
    },

    validateString: function(value) {
        if (!value.trim().length) {
            return false;
        }
        return true;
    },

    validateNumber: function(value) {
        if (!Number(value) || value < 1) {
            return false;
        }
        return true;
    },

    validate: function(name, price, href, remaining) {
        return {
            name: this.validateString(name),
            price: this.validateNumber(price),
            href: this.validateString(href),
            remaining: this.validateNumber(remaining)
        };
    },

    callBackOnChange: function(event) {
        if (event.target.className === 'formLineAdd') {
            let key = event.target.name + 'Add';
            return this.setState( {[key]: event.target.value} );
        }
        this.setState( {[event.target.name]: event.target.value} );
    },

    render: function() {
        if (!this.props.workMode) {
            return null;
        }

        let formLines = this.state.formLines;
        let markedInput = this.state.markedInput;
        let productInfo = null;
        let saveButton = React.DOM.input(
                {key: 'pfis', className: 'saveButton', type: 'button',
                value: 'Save', onClick: this.callBackSave} );
        let discardButton = React.DOM.input(
                {key: 'pfid', className: 'discardButton', type: 'button',
                value: 'Discard', onClick: this.callBackDiscard} );
        let addButton = React.DOM.input(
                {key: 'pfia', className: 'formAddButton', type: 'button',
                value: 'Add', onClick: this.callBackPush}, );

        if (this.props.workMode === 'view') {
            productInfo = React.DOM.div( {className: 'productInfo'},
                this.props.product.map( (value) =>
                        React.DOM.span(
                            {key: value.key, className: 'formLine'},
                            value.href
                            ? React.DOM.a( {href: value.href}, value.href)
                            : value.text )
                    )
                );
        }
        if (this.props.workMode === 'edit') {
            productInfo = React.DOM.div( {className: 'productInfo'},
                    this.props.product.map( (value) =>
                            React.DOM.input(
                                {key: value.key, className: 'formLine',
                                type: 'text', name: value.className,
                                onChange: this.callBackOnChange,
                                defaultValue: value.href
                                            ? value.href
                                            : value.text,
                                id: markedInput && markedInput[value.className]
                                    ? markedInput[value.className].id
                                    : null,
                                title: markedInput && markedInput[value.className]
                                        ? markedInput[value.className].title
                                        : null},
                                null )
                        ),
                    saveButton,
                    discardButton
                );
        }
        if (this.props.workMode === 'add') {
            productInfo = React.DOM.div( {className: 'productInfo'},
                    React.DOM.input(
                        {key: 'pfan', className: 'formLineAdd', type: 'text',
                        name: 'name', onChange: this.callBackOnChange,
                        id: markedInput && markedInput.name
                            ? markedInput.name.id
                            : null,
                        title: markedInput && markedInput.name
                            ? markedInput.name.title
                            : null},
                        null ),
                    React.DOM.input(
                        {key: 'pfap', className: 'formLineAdd', type: 'text',
                        name: 'price', onChange: this.callBackOnChange,
                        id: markedInput && markedInput.price
                            ? markedInput.price.id
                            : null,
                        title: markedInput && markedInput.price
                            ? markedInput.price.title
                            : null},
                        null ),
                    React.DOM.input(
                        {key: 'pfau', className: 'formLineAdd', type: 'text',
                        name: 'href', onChange: this.callBackOnChange,
                        id: markedInput && markedInput.href
                            ? markedInput.href.id
                            : null,
                        title: markedInput && markedInput.href
                            ? markedInput.href.title
                            : null},
                        null ),
                    React.DOM.input(
                        {key: 'pfar', className: 'formLineAdd', type: 'text',
                        name: 'remaining', onChange: this.callBackOnChange,
                        id: markedInput && markedInput.remaining
                            ? markedInput.remaining.id
                            : null,
                        title: markedInput && markedInput.remaining
                            ? markedInput.remaining.title
                            : null},
                        null ),
                    addButton,
                    discardButton
                );
        }

        return React.DOM.div( {className: 'productFormBlock'},
                React.DOM.form( {className: 'productForm'},
                        formLines,
                        productInfo
                    )
            );
    },
});

const ProductsBlock = React.createClass({
    displayName: 'productsBlock',

    propTypes: {
        products: React.PropTypes.arrayOf(
                React.PropTypes.shape( {
                    deleteKey: React.PropTypes.string.isRequired,
                    editKey: React.PropTypes.string.isRequired,
                    key: React.PropTypes.string.isRequired,
                    product: React.PropTypes.arrayOf(
                            React.PropTypes.shape( {
                                className: React.PropTypes.string.isRequired,
                                key: React.PropTypes.string.isRequired,
                                text: React.PropTypes.any.isRequired
                            } )
                        ).isRequired
                } ).isRequired
            )
    },

    getInitialState: function() {
        return {
            products: this.props.products,
            productFormWorkMode: false,
        };
    },

    callBackAdd: function(workMode) {
        if (!this.state.productFormWorkMode) {
            return this.setState( {productFormWorkMode: workMode} );
        }
        else if (confirm('Add new product?\nUnsaved data might be lost.')) {
            this.setState( {productFormWorkMode: workMode, productKey: null} );
        }
    },

    callBackPush: function(name, price, href, remaining) {
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
    },

    callBackView: function(productKey, product, workMode) {
        if (this.state.product === product
            && this.state.productFormWorkMode === workMode) {
            workMode = false;
        }
        this.setState( {productFormWorkMode: workMode} );
        workMode
        ? this.setState( {product: product, productKey: productKey} )
        : this.setState( {productKey: null} );
    },

    callBackEdit: function(productKey, product, workMode) {
        this.setState( {productFormWorkMode: workMode,
                        productKey: productKey, product: product,} );
    },

    callBackDelete: function(productKey) {
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
    },

    callBackSave: function(productKey, name, price, href, remaining) {
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
    },

    callBackDiscard: function() {
        this.setState( {productFormWorkMode: false} );
    },

    render: function() {
        let form = this.state.productFormWorkMode;
        return React.DOM.div( {className: 'productsBlock'},
                React.createElement(
                    ProductsGrid,
                    {products: this.state.products,
                    productKey: form ? this.state.productKey : null,
                    callBackView: this.callBackView,
                    callBackEdit: this.callBackEdit,
                    callBackDelete: this.callBackDelete,
                    callBackAdd: this.callBackAdd} ),
                form
                ? React.createElement(
                    ProductForm,
                    {productKey: this.state.productKey,
                    product: this.state.product, workMode: form,
                    callBackDiscard: this.callBackDiscard,
                    callBackSave: this.callBackSave,
                    callBackPush: this.callBackPush} )
                : null
            );
    }
});

// Initiate
ReactDOM.render(
        React.createElement( ProductsBlock, {products: productsElements} ),
        document.querySelector('.container')
    );