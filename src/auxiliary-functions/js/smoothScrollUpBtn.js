export function smoothScrollUpBtn(el, indent = 100, display = 'block') {
  const btn =
    Object.getPrototypeOf(el.constructor) === HTMLElement
      ? el
      : document.querySelector(`${el}`);

  const visibleBtn = (type) =>
    window.addEventListener(
      type,
      () =>
        window.pageYOffset >= indent
          ? (btn.style.display = display)
          : (btn.style.display = 'none'),
      {
        passive: true,
      }
    );

  if (btn !== null) {
    visibleBtn('load');
    visibleBtn('scroll');

    btn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  } else return;
}
