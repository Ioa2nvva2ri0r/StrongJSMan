// Auxiliary Functions
import { convertInString } from '../../auxiliary-functions/js/сonvert';
import { activeColor } from '../../auxiliary-functions/ts/activeColor';
// Styles-module
import header from './header.module.scss';

const stModal = convertInString(header.modal, 'active-gradient');
const stHeader = (screenSize: boolean) =>
  convertInString(
    header.main,
    ...activeColor('borderColor-1', 'background-3', 'boxShadow-2'),
    screenSize && header.main__close
  );
const stLogo = convertInString(
  header.nav__logo,
  ...activeColor('borderColor-1', 'background-2', 'boxShadow-2')
);
const stBtnBurger = convertInString(header.main__btn, 'active-color-1');
const stBurger = (active: boolean) =>
  convertInString(
    header['main__btn-burger'],
    active && header['main__btn-burger-active']
  );
const stLogoDesc = convertInString(
  header['nav__logo-desc'],
  'active-color-effect'
);
const stCopyright = convertInString(header.copyright, 'active-color-effect');
const stLink = (value: string, active: string, screenSize: boolean) =>
  convertInString(
    header.link,
    'active-borderColor-1',
    !screenSize && 'active-background-focus',
    ...(value === active
      ? [header.link__active, !screenSize && 'active-background-2']
      : [])
  );
const stLinkDesc = convertInString(header.link__desc, 'active-color-effect');

export {
  stModal,
  stHeader,
  stLogo,
  stBtnBurger,
  stBurger,
  stLogoDesc,
  stCopyright,
  stLink,
  stLinkDesc,
};
