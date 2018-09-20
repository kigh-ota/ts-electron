import React from 'react';
import ReactDom from 'react-dom';
import Button from './Button';
import Title from './Title';

const container = document.getElementById('contents');

ReactDom.render(
    <div>
        <Title title="ts-electron" />
        <Button label="BUTTON"/>
    </div>,
    container,
);
