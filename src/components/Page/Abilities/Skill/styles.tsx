// Auxiliary Functions
import { convertInString } from '../../../../auxiliary-functions/js/сonvert';
import { activeColor } from '../../../../auxiliary-functions/ts/activeColor';
// Styles-module
import skill from './skill.module.scss';

const stContainer = convertInString(skill.container, 'active-background-1');
const stSkill = convertInString(
  skill.skill,
  ...activeColor('textShadow-2', 'color-3')
);
const stStar = (active: boolean) =>
  convertInString(skill.stars, active && skill.stars__active);
const stChilds = convertInString(skill.childs, 'active-borderColor-2');

export { stContainer, stSkill, stStar, stChilds };
