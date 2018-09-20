import React from 'react';
import ReactDom from 'react-dom';
import Title from './Title';

const container = document.getElementById('contents');

ReactDom.render(
    <Title title="ts-electron" />,
    container,
);
