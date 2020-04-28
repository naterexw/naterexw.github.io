$(document).ready(function () {
  window.onload = function () { document.body.classList.remove('is-preload'); }
  window.ontouchmove = function () { return false; }
  window.onorientationchange = function () { document.body.scrollTop = 0; }

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'UA-72835954-1');
});
