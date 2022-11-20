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
  lazyload?: boolean;
}

const Picture: React.FC<Props> = ({
  src,
  alt,
  cssClasses,
  lazyload = true,
}) => {
  // Styles-module
  const stImage = convertInString(
    picture.img,
    cssClasses?.img,
    lazyload && 'lazyload'
  );
  // Path Image
  const srcSource = {
    ...(lazyload ? { srcSet: lazyImg, 'data-srcset': src } : { srcSet: src }),
  };
  const srcImg = {
    ...(lazyload ? { src: lazyImg, 'data-src': src, alt } : { src, alt }),
  };

  return (
    <picture className={convertInString(picture.img__box, cssClasses?.box)}>
      <source className={stImage} {...srcSource} />
      <img className={stImage} {...srcImg} />
    </picture>
  );
};

export default Picture;
