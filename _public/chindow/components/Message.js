import { h, render, Component } from 'preact';


class Message extends Component {


  render (props, state) {
    let contentClassList = [
      "sc-message--content",
      (props.message.author === "me" ? "sent" : "received")
    ];
    return (
      <div class="sc-message">
        <div class={contentClassList.join(" ")}>
          <div class="sc-message--avatar"></div>
          <div class="sc-message--body" >{props.message.body}</div>
        </div>
      </div>)
  }
}

export default Message