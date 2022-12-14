import React from 'react';
// Redux
import { useAppSelector } from '../../../redux/hooks';
// Auxiliary Functions
import { activeColor } from '../../../auxiliary-functions/ts/activeColor';
// Components
import UsTitle from '../../Common/UsTitle';
import ListSkills from './ListSkills';
// Styles-module
import abilities from './abilities.module.scss';
import { stContainer, stItem, stSubTitle } from './styles';

const Abilities: React.FC = () => {
  // Redux
  const { lang, data } = useAppSelector((state) => state.active);
  // Animate
  const calcAnimate = (i: number) =>
    (((i === 0 ? 0.2 : i) + 1) / 3.5).toFixed(1);

  return (
    <>
      {(data as DataAbilities).map(({ title, abbr, data }) => (
        <div key={abbr} className={stContainer}>
          {abbr === 'hard' ? (
            <>
              <UsTitle
                level={2}
                cssClass={abilities[`${abbr}__title`]}
                content={typeof title === 'object' ? title[lang.code] : title}
              />
              <ul className={abilities[`${abbr}__list`]}>
                {(data as OSubSkill[]).map(
                  ({ subtitle, skills }, i: number) => (
                    <li
                      key={`${abbr}-${i + 1}`}
                      className={stItem(abbr)}
                      style={{
                        animationDuration: `${calcAnimate(i)}s`,
                      }}
                    >
                      <h3 className={stSubTitle(abbr)}>
                        {typeof subtitle === 'object'
                          ? subtitle[lang.code]
                          : subtitle}
                      </h3>
                      <ListSkills
                        data={skills as OSkill[]}
                        cssClasses={{
                          list: [abilities[`${abbr}__sublist`]],
                          item: [abilities[`${abbr}__subitem`]],
                        }}
                      />
                    </li>
                  )
                )}
              </ul>
            </>
          ) : (
            <>
              <UsTitle
                level={2}
                cssClass={abilities[`${abbr}__title`]}
                content={typeof title === 'object' ? title[lang.code] : title}
              />
              <div className={abilities[`${abbr}__box`]}>
                <ListSkills
                  data={data as OSkill[]}
                  cssClasses={{
                    list: [
                      abilities[`${abbr}__list`],
                      ...activeColor('background-1', 'boxShadow-2'),
                    ],
                    item: [abilities[`${abbr}__item`]],
                  }}
                />
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default React.memo(Abilities);
