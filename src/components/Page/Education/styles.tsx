// Auxiliary Functions
import { convertInString } from '../../../auxiliary-functions/js/сonvert';
import { activeColor } from '../../../auxiliary-functions/ts/activeColor';
// Styles-module
import education from './education.module.scss';

const stItem = convertInString(
  education.item,
  ...activeColor('borderColor-1', 'gradient', 'boxShadow-1')
);
const stDesc = convertInString(education.desc, 'active-color-1');
const stSpeciality = convertInString(
  education.desc__speciality,
  'active-textShadow-1'
);
const stVideo = (index: number) =>
  convertInString(education.video, education[`video-${index + 1}`]);
const stLink = convertInString(
  education.diploma,
  ...activeColor('color-1', 'background-focus')
);
const stLine = convertInString(education.item__line, 'active-background-1');
const stIndicator = convertInString(
  education['item__line-indicator'],
  ...activeColor('borderColor-1', 'background-2')
);
const stDiplomaItem = convertInString(
  education.diploma__item,
  'active-color-1'
);

export {
  stItem,
  stDesc,
  stSpeciality,
  stVideo,
  stLink,
  stLine,
  stIndicator,
  stDiplomaItem,
};
