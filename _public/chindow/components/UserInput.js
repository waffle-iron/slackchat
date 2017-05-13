import { h, Component } from 'preact';

class UserInput extends Component {

  constructor() {
    super();
    this.state = {inputValue: ''};
  }

  handleKey(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
        event.preventDefault();
        let messageText = this.userInput.textContent;
        this.props.onSubmit(messageText);
        this.setState({inputValue: ''});
    }
  }

  render () {
    return (
      <form className="sc-input-field">
        <div
          ref={(e) => this.userInput = e}
          onKeyDown={this.handleKey.bind(this)}
          contentEditable="true"
          placeholder="Write a reply..."
          className="sc-input-field--input">
          {this.state.inputValue}
        </div>
      </form>
    )
  }
}

export default UserInput