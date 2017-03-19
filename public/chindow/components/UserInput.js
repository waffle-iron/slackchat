import { h, Component } from 'preact';

class UserInput extends Component {

  constructor() {
    super();
    this.state = {inputValue: '', textareaRow: 1};
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: "" });
  }

  handleInputChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleKey(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
        event.preventDefault();
        this.props.onSubmit(this.state.inputValue);
        this.setState({inputValue: ''});
    } else if (event.keyCode == 13) {
      this.setState({textareaRow: ++this.state.textareaRow})
    }
  }

  render () {
    return (
      <form className="sc-input-field" onSubmit={this.handleSubmit.bind(this)}>
        <div
          contentEditable="true"
          className="sc-input-field--input">
          {this.state.inputValue}
        </div>
        {/*<textarea
          placeholder="Write a reply"
          rows={this.state.textareaRow}
          value={this.state.inputValue}
          onKeyDown={this.handleKey.bind(this)}
          onInput={this.handleInputChange.bind(this)} 
          className="sc-input-field--input" 
          autocomplete="off"/>*/}
      </form>
    )
  }
}

export default UserInput