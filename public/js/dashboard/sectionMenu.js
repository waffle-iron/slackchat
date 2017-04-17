document.querySelectorAll('.ch-section-menu-item').forEach(link => {
  link.addEventListener('click', function () {
    console.log('OKOK')
    const route = this.getAttribute('data-route');
    window.location.href = route;
  }, true); 
});