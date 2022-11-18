// Auxiliary Functions
import { convertInString } from '../../../auxiliary-functions/js/сonvert';
import { activeColor } from '../../../auxiliary-functions/ts/activeColor';
// Styles-module
import projects from './projects.module.scss';

const stStackContent = convertInString(
  projects['content__stack-container'],
  'active-borderColor-2'
);
const stStackTitle = convertInString(
  projects['content__stack-title'],
  'active-borderColor-2'
);
const stStack = convertInString(
  projects.content__stack,
  ...activeColor('color-3', 'textShadow-1')
);

export { stStackContent, stStackTitle, stStack };
