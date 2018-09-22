import {ipcRenderer} from 'electron';
import React from 'react';

interface Props {
    label: string;
}

interface State {
    count: number;
}

export default class Button extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {count: 0};
    }

    public componentWillMount() {
        ipcRenderer.on('buttonChannel-reply', (event: any, count: number) => {
            this.setState({count});
        });
    }

    public componentWillUnmount() {
        ipcRenderer.removeAllListeners('buttonChannel-reply');
    }

    public render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.props.label}</button>
                <span>{this.state.count}</span>
            </div>
        );
    }

    private handleClick(e: React.MouseEvent<HTMLElement>) {
        ipcRenderer.send('buttonChannel');
    }
}
