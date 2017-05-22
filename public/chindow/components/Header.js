import { h, Component } from 'preact';
import closeIcon from './../assets/close-icon.png';


class Header extends Component {

  render(props) {
    return (
      <div className="sc-header">
        <img className="sc-header--img" src={props.imageUrl} alt="" />
        <div className="sc-header--team-name"> {props.teamName} </div>
        <div className="sc-header--close-button" onClick={this.props.onClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
    );
  }
}

export default Header;
