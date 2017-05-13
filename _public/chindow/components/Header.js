import { h, Component } from 'preact';


class Header extends Component {
  render (props) {
    return (
      <div class="sc-header">
        <img class="sc-header--img" src={props.imageUrl}/>
        <div class="sc-header--team-name"> {props.teamName} </div>
      </div>
    )
  }
}

export default Header