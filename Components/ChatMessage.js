import React, { Component } from 'react';

class ChatMessage extends Component {
    render() {
        const { position = 'left', message} = this.props;
        const isRight = position.toLowerCase() === 'right';

        const align = isRight ? 'text-right' : 'text-left';
        const justify = isRight ? 'justify-content-end' : "justify-content-start";

        const messageBoxStyle = {
            maxWidth: '70%',
            flexGrow: 0
        };

        const messageStyle = {
            fontWeight: 500,
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap'
        };

        return <div className={`w-100 my-1 d-flex ${justify}`} >
            <div className="bg-light rounded border border-gray p-2" style={messageBoxStyle}>
                <span className={`d-block text-secondary ${align}`} style={messageStyle}>
                    {message}
                </span>
            </div>
        </div>
    }
}
export default ChatMessage;
