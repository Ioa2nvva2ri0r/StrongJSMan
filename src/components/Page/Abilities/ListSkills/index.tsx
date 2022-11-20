import React from 'react';
// Auxiliary Functions
import { convertInString } from '../../../../auxiliary-functions/js/сonvert';
// Components
import Skill from '../Skill';
// Types
interface Props {
  data: {
    skill: string;
    stars: number;
    parent: string;
    child?: [];
  }[];
  lang: string | undefined;
  cssClasses: {
    list: string[];
    item: string[];
  };
}

const ListSkills: React.FC<Props> = ({ data, lang, cssClasses }) => {
  return (
    <ul className={convertInString(...cssClasses.list)}>
      {data.map((obj) => (
        <li
          key={`skill-${obj.skill}`}
          className={convertInString(...cssClasses.item)}
        >
          <Skill {...obj} lang={lang} />
        </li>
      ))}
    </ul>
  );
};

export default ListSkills;
