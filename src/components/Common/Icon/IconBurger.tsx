import React from 'react';
// Types
interface Props {
  cssClasses?: {
    main?: string;
    topLine?: string;
    middleLine?: string;
    bottomLine?: string;
  };
  animateTime: number;
}

const IconBurger: React.FC<Props> = ({ animateTime, cssClasses }) => {
  return (
    <svg
      className={cssClasses?.main}
      style={{
        animationDuration: `${animateTime}s`,
        animationTimingFunction: 'ease-in-out',
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="80"
    >
      <path
        className={cssClasses?.topLine}
        style={{
          animationDuration: `${animateTime}s`,
          animationTimingFunction: 'ease-in-out',
        }}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeDasharray="40 82"
        stroke="#fff"
        fill="none"
        d="m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429"
      />
      <path
        className={cssClasses?.middleLine}
        strokeWidth="5.5"
        strokeLinecap="round"
        stroke="#fff"
        fill="none"
        d="m 70,50 h -40"
      />
      <path
        className={cssClasses?.bottomLine}
        style={{
          animationDuration: `${animateTime}s`,
          animationTimingFunction: 'ease-in-out',
        }}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeDasharray="40 82"
        stroke="#fff"
        fill="none"
        d="m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429"
      />
    </svg>
  );
};

export default IconBurger;
