import './../styles/index';
import './jscolor.min';
import './analytics';


// Items in the dropdown are not clickable using hrefs
// since the menu closes too quickly. Use data-route instead.
document.querySelectorAll('a[data-route]').forEach((el) => {
  el.addEventListener('click', () => {
    window.location.href = el.getAttribute('data-route');
  });
});

// [
//   document.querySelector('#sc-all-chats-tab'),
//   document.querySelector('#sc-missed-chats-tab'),
//   document.querySelector('#sc-visitors-tab'),
// ].forEach((tab) => {
//   if (tab) {
//     tab.addEventListener('click', () => {
//       tab.classList.toggle('active');
//     });
//   }
// });

const copyScriptButton = document.querySelector('#sc-copy-script-button');
const copyScriptInput = document.querySelector('#sc-copy-script-input');
if (copyScriptButton) {
  copyScriptButton.addEventListener('click', () => {
    copyScriptInput.select();
    document.execCommand('copy');
  });
}

const settingsForm = document.querySelector('#sc-settings-form');
if (settingsForm) {
  const updateSettingsButton = settingsForm.querySelector('#sc-update-settings-button');
  const inputs = [...settingsForm.getElementsByTagName('input')];
  inputs.forEach((el) => {
    el.addEventListener('change', () => {
      updateSettingsButton.disabled = false;
    });
    el.addEventListener('keyup', () => {
      updateSettingsButton.disabled = false;
    });
  });
}
