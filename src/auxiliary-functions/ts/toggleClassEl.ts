type Props = {
  selector: string | HTMLElement;
  cssClass: string;
  act?: string;
}[];

export function toggleClassEl(...arrayAction: Props) {
  arrayAction.forEach(({ selector, cssClass, act }) => {
    const el =
      typeof selector === 'string'
        ? document.querySelector(selector)?.classList
        : selector?.classList;
    el &&
      (act === 'add'
        ? el?.add(cssClass)
        : act === 'remove'
        ? el?.remove(cssClass)
        : el?.toggle(cssClass));
  });
}
