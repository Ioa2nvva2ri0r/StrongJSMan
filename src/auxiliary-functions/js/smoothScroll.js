export default function smoothScroll(el, topOffset) {
  const anhor =
    Object.getPrototypeOf(el.constructor) === HTMLElement
      ? el
      : document.querySelector(`${el}`);
  if (anhor !== null)
    return window.scrollTo({
      top: anhor.getBoundingClientRect().top - topOffset,
      behavior: 'smooth',
    });
  return window.scrollTo(0, 0);
}
