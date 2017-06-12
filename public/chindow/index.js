import React from 'react';
import ReactDOM from 'react-dom';
import './styles/emojiPicker.css';
import './styles/index.css';
import './styles/launcher.css';
import './styles/header.css';
import './styles/message.css';
import Launcher from './components/Launcher';


const elemDiv = document.createElement('div');
document.body.appendChild(elemDiv);

ReactDOM.render(<Launcher />, elemDiv);
