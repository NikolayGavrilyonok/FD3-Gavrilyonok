/* global React */
/* global ReactDOM */
'use strict';

let stringsArray = [
    'word',
    'another word',
    'string',
    'boolean',
    'true',
    'false',
    'null',
    'undefined',
    'number',
    'array',
    'object',
    'function',
    'event'];

const Filter = React.createClass({
    displayName: 'filter',

    propTypes: {
        strings: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    },

    getInitialState: function() {
        return {
            sort: false,
            searchMatch: '',
            array: this.props.strings,
        };
    },

    searchMatch: function(event) {
        event = event || window.event;
        let sort = this.state.sort;
        let searchMatch = event.target.value;
        this.setState( {searchMatch: searchMatch,
                        array: this.buildArray(sort, searchMatch)}
            );
    },

    sort: function(event) {
        event = event || window.event;
        let sort = event.target.checked;
        let searchMatch = this.state.searchMatch;
        this.setState( {sort: sort,
                        array: this.buildArray(sort, searchMatch)}
            );
    },

    compare: function(a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    },

    buildArray: function(sortFlag, searchMatch) {
    // Get array of strings
        let strings = this.props.strings.slice();
    // Search for substring in each string of array
        if (searchMatch !== '') {
            strings = strings.filter( (string) => {
                return string.indexOf(searchMatch) >= 0;
            } );
        }
    // Sort strings in array
        if (sortFlag) {
            strings = strings.sort(this.compare);
        }
        return strings;
    },

    render: function() {
    // Create input elements
        let inputs = React.DOM.div( {className: 'inputsBlock'},
                React.DOM.input( {key: '1', type: 'checkbox', onChange: this.sort, id: 'filterButton_id'} ),
                React.DOM.input( {key: '2', type: 'text', onChange: this.searchMatch, id: 'searchField_id'} )
            );
    // Build array of elements
        let row = this.state.array.map( (value) =>
            React.DOM.div( {key: value, className: 'row'},
                React.DOM.span( {className: 'string'}, value )
            )
        );
    // Build HTML
        return React.DOM.div( {className: 'filter'},
                inputs,
                React.DOM.div( {className: 'stringsBlock'}, row )
            );
    },
});

ReactDOM.render(
    React.createElement(Filter, {strings: stringsArray}),
    document.querySelector('.container')
);