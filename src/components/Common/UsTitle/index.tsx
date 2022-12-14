import React from 'react';
// Auxiliary Functions
import { convertInString } from '../../../auxiliary-functions/js/сonvert';
// Styles
import title from './title.module.scss';
// Types
interface Props {
  level: number;
  cssClass: string;
  content: string;
}

const UsTitle: React.FC<Props> = ({ level, cssClass, content }) => {
  return React.createElement(`h${level}`, {
    className: convertInString(title.main, 'active-borderColor-1', cssClass),
    dangerouslySetInnerHTML: {
      __html: `<span class="active-color-effect"><i class="active-background-3 active-borderColor-1"></i>${content}</span>`,
    },
  });
};

export default UsTitle;
