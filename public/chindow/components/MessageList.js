import { h, render, Component } from 'preact';


class MessageList extends Component {


  render () {
    return (
      <div className="sc-message-list">
        {this.props.messages.map(msg => {
          return (<div class={`sc-message--${msg.author}`}>{msg.body}</div>)
        })}
      </div>)
  }
}

export default MessageList