import React, { Component } from 'react';
import jsonData from 'emoji-datasource-emojione/emoji.json';
import EmojiConvertor from 'emoji-js';


class EmojiPicker extends Component {

  constructor() {
    super();
    this.emojiConvertor = new EmojiConvertor();
    this.emojiConvertor.init_env();
    this.shortNames = jsonData.map(emoji => `:${emoji.short_names[0]}:`);
  }

  componentDidMount() {
    // Get the components DOM node
    const elem = this.domNode;
    // Set the opacity of the element to 0
    elem.style.opacity = 0;
    window.requestAnimationFrame(() => {
      // Now set a transition on the opacity
      elem.style.transition = 'opacity 350ms';
      // and set the opacity to 1
      elem.style.opacity = 1;
    });
  }

  render() {
    return (
      <div className="sc-emoji-picker" ref={(e) => { this.domNode = e; }} >
        {this.shortNames.map((shortName) => {
          return this.emojiConvertor.replace_colons(shortName);
        })}
      </div>
    );
  }
}

export default EmojiPicker;
