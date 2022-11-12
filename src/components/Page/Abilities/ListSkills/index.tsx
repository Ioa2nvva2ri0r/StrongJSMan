import React from 'react';
// Auxiliary Functions
import { convertInString } from '../../../../auxiliary-functions/js/сonvert';
// Components
import Skill from '../Skill';

type arrayData = {
  skill: string;
  stars: number;
  parent: string;
  child?: [];
}[];
type styles = {
  list: string[];
  item: string[];
};

const ListSkills: React.FC<{ data: arrayData; cssClasses: styles }> = ({
  data,
  cssClasses,
}) => {
  return (
    <ul className={convertInString(...cssClasses.list)}>
      {data.map((obj) => (
        <li
          key={`skill-${obj.skill}`}
          className={convertInString(...cssClasses.item)}
        >
          <Skill {...obj} />
        </li>
      ))}
    </ul>
  );
};

export default ListSkills;
