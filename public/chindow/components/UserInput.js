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
    console.log(e);
    this.setState({inputValue: e.target.value});
  }

  render () {
    return (
      <form className="sc-input-field" onSubmit={this.handleSubmit.bind(this)}>
        <textarea
          placeholder="Write a reply"
          rows="1"
          value={this.state.inputValue} 
          onChange={this.handleInputChange.bind(this)} 
          className="sc-input-field--input" 
          autocomplete="off"></textarea>
      </form>
    )
  }
}

export default UserInput