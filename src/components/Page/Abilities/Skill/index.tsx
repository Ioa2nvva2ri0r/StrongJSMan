import React from 'react';
// Components
import IconStar from '../../../Common/Icon/IconStar';
// Styles-module
import styles from './skill.module.scss';
import { stContainer, stChilds, stSkill, stStar } from './styles';
// Types
interface Props {
  skill: string;
  stars: number;
  lang?: string;
  parent?: string;
  child?: Props[];
}

const Skill: React.FC<Props> = ({ skill, stars = 0, lang, parent, child }) => {
  // Amount active stars
  const amount: number =
    stars <= 0 ? (0 as const) : stars > 5 ? (5 as const) : stars;
  const langDocument: boolean = document.documentElement.lang === 'ru';
  // Level skill
  const lavel: { [key: number]: string } = {
    0: langDocument ? 'Неизвестно' : 'Unknown',
    1: langDocument ? 'Начальный' : 'Beginner',
    2: langDocument ? 'Базовый' : 'Base',
    3: langDocument ? 'Средний' : 'Intermediate',
    4: langDocument ? 'Продвинутый' : 'Advanced',
    5: langDocument ? 'В совершенстве' : 'Proficiency',
  };

  return (
    <>
      <div
        className={stContainer}
        data-parent={parent ? parent : `${skill}_MAIN`}
      >
        <strong
          className={stSkill}
          lang={lang}
          aria-label={`${langDocument ? 'Навык' : 'Skill'}`}
        >
          {skill}
        </strong>
        <div
          className={styles.stars__box}
          aria-label={`${langDocument ? 'Уровень знания' : 'Skill lavel'} - ${
            lavel[amount]
          }`}
        >
          {[...new Array(5)].map((_, i) => (
            <span
              className={stStar(amount >= i + 1)}
              key={`${skill}-rating-${i + 1}`}
            >
              <IconStar
                name={skill}
                index={i}
                active={amount}
                cssClass="active-stopColor-3"
              />
            </span>
          ))}
        </div>
      </div>
      {child && (
        <div className={stChilds}>
          {child.length === 1 ? (
            <Skill {...child[0]} />
          ) : (
            child.map((obj, index) => (
              <Skill key={`${skill}-child-${index + 1}`} {...obj} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Skill;
