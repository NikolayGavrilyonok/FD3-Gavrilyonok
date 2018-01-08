'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import ProductsBlock from '../components/productsBlock';

const productsElements = require('../json/productsElements.json');

ReactDOM.render(
        <ProductsBlock products = {productsElements}/>,
        document.querySelector('.container')
    );