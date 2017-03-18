import { h, render, Component } from 'preact';
import MessageList from './MessageList'
import UserInput from './UserInput'
import messageBroker from './../services/messageBroker';


class ChatWindow extends Component {
    constructor() {
      super();
      this.state = { messages: [] };
      this.messageBroker = messageBroker;
      this.messageBroker.init();
      this.messageBroker.onMessageReceived(this.onMessageReceived.bind(this));
    }

    onUserInputSubmit(userInput) {
      const msg = {author: 'me', body: userInput};
      this.setState({messages: [...this.state.messages, msg]});
      this.messageBroker.sendMessage(msg);
    }

    onMessageReceived(msg) {
      this.setState({messages: [...this.state.messages, msg]});
    }

    render() {
        return (
          <div className="sc-chat-window">
            <MessageList messages={this.state.messages}/>
            <UserInput onSubmit={this.onUserInputSubmit.bind(this)}/>
          </div>
        );
    }
}

export default ChatWindow;