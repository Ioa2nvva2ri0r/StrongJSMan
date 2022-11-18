import React from 'react';
// Auxiliary Functions
import { convertInString } from '../../../auxiliary-functions/js/сonvert';
// lazysizes Image
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
// Styles-module
import picture from './picture.module.scss';
// Icon
import lazyImg from './lazy-img.svg';
// Types
interface Props {
  src: string;
  alt: string;
  cssClasses?: { box?: string | string[]; img?: string | string[] };
}

const Picture: React.FC<Props> = ({ src, alt, cssClasses }) => {
  // Styles-module
  const stImage = convertInString(picture.img, cssClasses?.img, 'lazyload');

  return (
    <picture className={convertInString(picture.img__box, cssClasses?.box)}>
      <source className={stImage} srcSet={lazyImg} data-srcset={src} />
      <img className={stImage} src={lazyImg} data-src={src} alt={alt} />
    </picture>
  );
};

export default Picture;
