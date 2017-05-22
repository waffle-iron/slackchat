import './../styles/index';
import './jscolor.min';


// Items in the dropdown are not clickable using hrefs
// since the menu closes too quickly. Use data-route instead.
document.querySelectorAll('a[data-route]').forEach((el) => {
  el.addEventListener('click', () => {
    window.location.href = el.getAttribute('data-route');
  });
});

const copyScriptButton = document.querySelector('#sc-copy-script-button');
const copyScriptInput = document.querySelector('#sc-copy-script-input');
if (copyScriptButton) {
  copyScriptButton.addEventListener('click', () => {
    copyScriptInput.select();
    document.execCommand('copy');
  });
}
