import { h, Component } from 'preact';


class Header extends Component {
  render (props) {
    return (
      <div class="sc-header">
        {props.teamName}
      </div>
    )
  }
}

export default Header