/* global React */
/* global ReactDOM */
'use strict';

let productsArray = [
    {code: 0, name: 'Product name', price: 'Price', remaining: 'Remaining', url: 'URL'},
    {code: 1, name: 'Axe', price: 20, remaining: 52, url: 'Link', href: 'https://www.google.com'},
    {code: 2, name: 'Accordion', price: 15, remaining: 21, url: 'Link', href: 'https://www.google.com'},
    {code: 3, name: 'Brick', price: 22, remaining: 98, url: 'Link', href: 'https://www.google.com'},
    {code: 4, name: 'Aircraft', price: 31, remaining: 16, url: 'Link', href: 'https://www.google.com'},
    {code: 5, name: 'Submarine', price: 45, remaining: 21, url: 'Link', href: 'https://www.google.com'},
    {code: 6, name: 'Slippers', price: 15, remaining: 22, url: 'Link', href: 'https://www.google.com'},
    {code: 7, name: 'Scissors', price: 5, remaining: 68, url: 'Link', href: 'https://www.google.com'},
    {code: 8, name: 'Printer', price: 18, remaining: 27, url: 'Link', href: 'https://www.google.com'},
    {code: 9, name: 'Headphones', price: 7, remaining: 32, url: 'Link', href: 'https://www.google.com'},
    {code: 10, name: 'Grenade', price: 61, remaining: 95, url: 'Link', href: 'https://www.google.com'},
    ];

const ProductsBlock = React.createClass({
    displayName: 'testName',

    propTypes: {
        products: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                    code: React.PropTypes.number.isRequired,
                    name: React.PropTypes.string.isRequired,
                    price: React.PropTypes.any.isRequired,
                    remaining: React.PropTypes.any.isRequired,
                    url: React.PropTypes.string.isRequired,
                })
            )
    },

    render: function() {
        let productRow = this.props.products.map( value =>
            React.DOM.div( {key: value.code, className: 'row'},
                React.DOM.span( {className: 'name'}, value.name ),
                React.DOM.span( {className: 'price'}, value.price ),
                React.DOM.span( {className: 'url'},
                    value.href ? React.DOM.a ( {className: 'link', href: value.href}, value.url ) : value.url ),
                React.DOM.span( {className: 'remaining'}, value.remaining ),
            )
        );

        return React.DOM.div( {className: 'productsBlock'}, productRow );
    },
});

ReactDOM.render(
    React.createElement( ProductsBlock, {products: productsArray} ),
    document.querySelector( '.container' )
);