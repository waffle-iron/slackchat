import { h, Component } from 'preact';

class UserInput extends Component {

  constructor() {
    super();
    this.state = {inputValue: ''};
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: "" });
  }

  handleInputChange(e) {
    this.setState({inputValue: e.target.value});
  }

  render () {
    return (
      <form className="sc-input-field" onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          value={this.state.inputValue} 
          onInput={this.handleInputChange.bind(this)} 
          className="sc-input-field--input" 
          autocomplete="off"></input>
      </form>
    )
  }
}

export default UserInput