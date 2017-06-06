import { h, Component } from 'preact';
import SendIcon from './icons/SendIcon';
import EmojiIcon from './icons/EmojiIcon';


class UserInput extends Component {

  constructor() {
    super();
    this.state = { inputValue: '', inputActive: false };
  }

  handleKey(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();
      const messageText = this.userInput.textContent;
      this.props.onSubmit(messageText);
      this.setState({ inputValue: '' });
    }
  }

  render() {
    return (
      <form className={"sc-input-field" + (this.state.inputActive ? " active" : "")}>
        <div
          onFocus={() => { this.setState({ inputActive: true }); }}
          onBlur={() => { this.setState({ inputActive: false }); }}
          ref={(e) => this.userInput = e}
          onKeyDown={this.handleKey.bind(this)}
          contentEditable="true"
          placeholder="Write a reply..."
          className="sc-input-field--input"
        >
          {this.state.inputValue}
        </div>
        <div className="sc-input-field--buttons">
          <EmojiIcon />
          <SendIcon />
        </div>
      </form>
    );
  }
}

export default UserInput;
