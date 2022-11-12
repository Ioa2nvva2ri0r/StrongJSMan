// Auxiliary Functions
import { convertInString } from '../../auxiliary-functions/js/сonvert';
import { activeColor } from '../../auxiliary-functions/ts/activeColor';
// Styles-module
import header from './header.module.scss';

const stModal = convertInString(header.modal, 'active-gradient');
const stHeader = convertInString(
  header.main,
  ...activeColor('background-3', 'boxShadow-2')
);
const stLink = (value: string, active: string) =>
  convertInString(
    header.link,
    ...activeColor('borderColor-1', 'background-focus'),
    ...(value === active ? [header.link__active, 'active-background-2'] : [])
  );
const stLinkDesc = convertInString(header.link__desc, 'active-colorEffect');

export { stModal, stHeader, stLink, stLinkDesc };
