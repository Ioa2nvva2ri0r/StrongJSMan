// Auxiliary Functions
import { convertInString } from '../../../auxiliary-functions/js/сonvert';
import { activeColor } from '../../../auxiliary-functions/ts/activeColor';
// Styles-module
import abilities from './abilities.module.scss';

const stContainer = convertInString(
  abilities.container,
  'active-borderColor-1'
);
const stItem = (value: string) =>
  convertInString(
    abilities[`${value}__item`],
    ...activeColor('background-1', 'boxShadow-2')
  );
const stSubTitle = (value: string) =>
  convertInString(abilities[`${value}__subtitle`], 'active-colorEffect');

export { stContainer, stItem, stSubTitle };
