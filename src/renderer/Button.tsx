import {ipcRenderer} from 'electron';
import React from 'react';

export default class Title extends React.Component<{label: string}, {}> {
    public render() {
        return (<button onClick={this.handleClick}>{this.props.label}</button>);
    }

    private handleClick(e: React.MouseEvent<HTMLElement>) {
        ipcRenderer.send('buttonChannel');
    }
}
