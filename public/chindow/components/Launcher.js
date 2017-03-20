import { h, render, Component } from 'preact';
import ChatWindow from './ChatWindow';


class Launcher extends Component {

  constructor() {
    super();
    this.state = { active: false };
  }

  handleClick() {
    this.setState({ active: !this.state.active });
  }  

  render () {
    let classList = [
      "sc-launcher",
      (this.state.active ? " active" : "")
    ]
    return (
      <div>
        <div class={classList.join(' ')} onClick={this.handleClick.bind(this)} ></div>
        <ChatWindow active={this.state.active}/>
      </div>
    )
  }
}

export default Launcher