import './style/index.css';

export default function addError(input, message, ms) {
  const toggleCssClass = (el, cssClass) => el.classList.toggle(cssClass);

  toggleCssClass(input, 'error-valid__input');
  input.insertAdjacentHTML(
    'beforebegin',
    `<div id="error-valid" class="error-valid__message" role="alert">${message}<div/>`
  );
  const error = document.getElementById('error-valid');

  if (error !== null) {
    setTimeout(() => {
      window.scrollBy({
        top: error.getBoundingClientRect().top - 50,
        behavior: 'smooth',
      });

      error.parentElement.style.position = 'relative';
      toggleCssClass(error, 'error-valid__message-active');
    }, 10);
    setTimeout(() => {
      error.parentElement.style.position = null;
      toggleCssClass(input, 'error-valid__input');
      toggleCssClass(error, 'error-valid__message-active');
    }, ms - 305);
    setTimeout(() => {
      error.remove();
    }, ms);
  }
}
