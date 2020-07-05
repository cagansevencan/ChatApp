import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

class Chat extends Component {

    state = {chats: []}  //Initialize the state with an empty chats array property

    componentDidMount() {

        this.pusher = new Pusher(process.env.PUSHER_APP_KEY, {
            cluster: process.env.PUSHER_APP_CLUSTER,
            encrypted: true
        });

        this.channel = this.pusher.subscribe('chat-room');

        this.channel.bind('new-message', ({chat = null}) => {
            const {chats} = this.state;
            chat && chats.push(chat);
            this.setState({chats});
        });

        this.pusher.connection.bind('connected', () => {
            axios.post('/messages') //Fetch all chat messages from history by
                // making a POST /messages HTTP request using the axios library.
                .then(response => {
                    const chats = response.data.messages;
                    this.setState({chats}); //populate the chats prop by response.
                });
        });
    }

    componentWillUnmount() {
        this.pusher.disconnect();
    }


    handleKeyUp = evt => {
        const value = evt.target.value;

        if (evt.keyCode === 13 && !evt.shiftKey) {
            const {activeUser: user} = this.props;  //activeUser prop to identify the current user.
            const chat = {user, message: value, timestamp: +new Date}; //Date.now()

            evt.target.value = ' ';
            axios.post('/message', chat);
        }
    }

    render() {
        return (this.props.activeUser && <Fragment>

            <div className="border-bottom border-gray w-100 d-flex align-items-center bg-white"
                 style={{height: 90}}>
                <h2 className="text-dark mb-0 mx-4 px-2">{this.props.activeUser}</h2>
            </div>

            <div className="border-top border-gray w-100 px-4 d-flex align-items-center bg-light"
                 style={{minHeight: 90}}>
                <textarea className="form-control px-3 py-2" onKeyUp={this.handleKeyUp}
                          placeholder="Enter your message" style={{resize: 'none'}}></textarea>
            </div>

        </Fragment>)
    }

};

export default Chat;
