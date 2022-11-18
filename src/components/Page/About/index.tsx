import React from 'react';
// Styles-module
import about from './about.module.scss';
// Image
import I from '../../../assets/image/about/I.webp';
import Picture from '../../Common/Picture';

const About: React.FC = () => {
  return (
    <>
      <div className={about.container}>
        <div className={about.img__box}>
          <Picture
            alt="My photo"
            src={I}
            cssClasses={{ box: about.img__box, img: about.img }}
          />
        </div>
      </div>
      <p></p>
    </>
  );
};

export default About;
