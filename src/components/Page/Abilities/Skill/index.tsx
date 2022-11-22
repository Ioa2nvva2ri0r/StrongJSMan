import React from 'react';
// Redux
import { useAppSelector } from '../../../../redux/hooks';
// Components
import IconStar from '../../../Common/Icon/IconStar';
// Styles-module
import styles from './skill.module.scss';
import { stContainer, stChilds, stSkill, stStar } from './styles';

const Skill: React.FC<OSkill> = ({ skill, stars = 0, parent, child }) => {
  // Redux
  const lang = useAppSelector((state) => state.active.lang);
  // Amount active stars
  const amount: number =
    stars <= 0 ? (0 as const) : stars > 5 ? (5 as const) : stars;
  // Level skill
  const lavel: { [key: number]: string } = {
    0: lang.bool ? 'Неизвестно' : 'Unknown',
    1: lang.bool ? 'Начальный' : 'Beginner',
    2: lang.bool ? 'Базовый' : 'Base',
    3: lang.bool ? 'Средний' : 'Intermediate',
    4: lang.bool ? 'Продвинутый' : 'Advanced',
    5: lang.bool ? 'В совершенстве' : 'Proficiency',
  };
  // Checking on value
  const checkSkill = typeof skill === 'object' ? skill[lang.code] : skill;

  return (
    <>
      <div
        className={stContainer}
        data-parent={parent ? parent : `${checkSkill}_MAIN`}
      >
        <strong
          className={stSkill}
          aria-label={`${lang.bool ? 'Навык' : 'Skill'}`}
        >
          {checkSkill}
        </strong>
        <div
          className={styles.stars__box}
          aria-label={`${lang.bool ? 'Уровень знания' : 'Skill lavel'} - ${
            lavel[amount]
          }`}
        >
          {[...new Array(5)].map((_, i) => (
            <span
              className={stStar(amount >= i + 1)}
              key={`${checkSkill}-rating-${i + 1}`}
            >
              <IconStar
                name={checkSkill}
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
              <Skill key={`${checkSkill}-child-${index + 1}`} {...obj} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Skill;
