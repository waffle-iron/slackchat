import './../styles/index';
import './jscolor.min';


document.querySelectorAll('a[data-route]').forEach((el) => {
  el.addEventListener('click', () => {
    window.location.href = el.getAttribute('data-route');
  });
});
