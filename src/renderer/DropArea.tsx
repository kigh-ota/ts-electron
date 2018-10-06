// import {ipcRenderer} from 'electron';
import React from 'react';

interface Props {}

interface State {
    text: string;
}

export default class DropArea extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {text: ''};
    }

    public render() {
        return (
            <div
                style={{width: 300, height: 200, backgroundColor: '#ccc'}}
                onDragOver={(e) => e.preventDefault()}
                onDrop={this.handleDrop.bind(this)}
            >
                {this.state.text}
            </div>
        );
    }

    private handleDrop(e: React.DragEvent<HTMLElement>) {
        const fileList = e.dataTransfer.files;
        const names = [];
        for (const file of fileList) {
            names.push(file.name);
        }
        this.setState({text: names.join(',')});
    }
}
