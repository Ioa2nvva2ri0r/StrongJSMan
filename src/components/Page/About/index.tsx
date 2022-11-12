import React from 'react';
// Styles-module
import about from './about.module.scss';
// Image
import I from '../../../assets/image/about/I.webp';

const About: React.FC = () => {
  return (
    <div>
      <picture>
        <source className={about.img} srcSet={I} />
        <img className={about.img} src={I} alt="" />
      </picture>
    </div>
  );
};

export default About;
