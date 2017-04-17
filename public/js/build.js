document.querySelectorAll('.link').forEach(link => {
  link.addEventListener('click', function () {
    const route = this.getAttribute('data-route');
    window.location.href = route;
  }, true); 
});