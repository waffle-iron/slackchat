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

  render() {
    const classList = [
      'sc-launcher',
      (this.state.active ? ' active' : ''),
    ];
    return (
      <div>
        <div className={classList.join(' ')} onClick={this.handleClick.bind(this)} ></div>
        <ChatWindow active={this.state.active} onClose={this.handleClick.bind(this)} />
      </div>
    );
  }
}

export default Launcher;
