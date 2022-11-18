import React from 'react';
// Types
interface Props {
  name: string;
  index: number;
  active: number;
  cssClass: string;
}

const IconStar: React.FC<Props> = ({ name, index, active, cssClass }) => {
  const id = `${name.replace(/[^0-9a-z-_]/gi, '').toLowerCase()}-star-${
    index + 1
  }`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="255px"
      height="240px"
      viewBox="0 0 51 48"
    >
      <defs>
        <linearGradient id={id}>
          <stop offset="0" className={cssClass} />
          <stop offset="100%" stopColor="#DFE0E0">
            <animate
              attributeName="offset"
              from="0"
              to="1"
              dur="2.5s"
              repeatCount="1"
              fill="freeze"
            />
          </stop>
        </linearGradient>
      </defs>
      <path
        fill={active >= index + 1 ? `url(#${id})` : '#DFE0E0'}
        d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
      />
    </svg>
  );
};

export default IconStar;
