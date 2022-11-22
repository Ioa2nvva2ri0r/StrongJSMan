export function smoothScrollUpBtn(el, indent = 100, display = 'block') {
  const btn =
    Object.getPrototypeOf(el.constructor) === HTMLElement
      ? el
      : document.querySelector(`${el}`);

  const visibleBtn = () => {
    if (window.pageYOffset > indent) btn.style.display = display;
    else btn.style.display = 'none';
  };

  if (btn !== null) {
    window.addEventListener('load', visibleBtn, {
      passive: true,
    });
    window.addEventListener('scroll', visibleBtn, {
      passive: true,
    });

    btn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  } else return;
}
