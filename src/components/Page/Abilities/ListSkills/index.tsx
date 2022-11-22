import React from 'react';
// Auxiliary Functions
import { convertInString } from '../../../../auxiliary-functions/js/сonvert';
// Components
import Skill from '../Skill';
// Types
interface Props {
  data: OSkill[];
  cssClasses: {
    list: string[];
    item: string[];
  };
}

const ListSkills: React.FC<Props> = ({ data, cssClasses }) => {
  return (
    <ul className={convertInString(...cssClasses.list)}>
      {data.map((obj, i) => (
        <li
          key={`skill-${i + 1}`}
          className={convertInString(...cssClasses.item)}
        >
          <Skill {...obj} />
        </li>
      ))}
    </ul>
  );
};

export default ListSkills;
