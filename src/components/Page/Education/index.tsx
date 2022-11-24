import React, { useState, useLayoutEffect } from 'react';
// Redux
import { useAppSelector } from '../../../redux/hooks';
// Auxiliary Functions
import { addPropToArrayObj } from '../../../auxiliary-functions/ts/addPropToArrayObj';
// Components
import UsTitle from '../../Common/UsTitle';
// Styles-module
import education from './education.module.scss';
import {
  stDesc,
  stDiplomaItem,
  stIndicator,
  stItem,
  stLine,
  stLink,
  stSpeciality,
  stVideo,
} from './styles';
// Video
import videoEducation from '../../../assets/video/education';
// Image
import diplomasEducation from '../../../assets/diplomas';

const Education: React.FC = () => {
  // Redux
  const { lang, data } = useAppSelector((state) => state.active);
  // React State
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  // Check Screen Size
  const screenSize = screenWidth <= 1138;
  // React LayoutEffect
  useLayoutEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
  }, []);
  // Play video on hover
  const toggleVideo = (
    event: React.MouseEvent<HTMLDivElement>,
    children: string,
    act: string = 'play'
  ) => {
    const videoEl = event.currentTarget.children?.namedItem(
      children
    ) as HTMLVideoElement;

    return act === 'pause' ? videoEl.pause() : videoEl.play();
  };
  // Create us-title
  const title = (value: string): JSX.Element => (
    <UsTitle level={2} cssClass={education.title} content={value} />
  );

  return (
    <ul className={education.list}>
      {addPropToArrayObj<
        DataEducation,
        KeyObj<string, SourceVideo[] | SourceDiplomas[]>,
        DataEducation
      >(
        data as DataEducation[],
        { video: videoEducation },
        { diplomas: diplomasEducation }
      ).map(
        (
          {
            institution,
            specialization,
            speciality,
            start,
            ending,
            diplomas,
            video,
          },
          i
        ) => (
          <li
            key={`education-${i + 1}`}
            className={stItem}
            style={{
              animationDuration: `${((i + 2) / 2).toFixed(1)}s`,
            }}
          >
            <div
              className={education.content}
              onMouseOver={(e) => video && toggleVideo(e, video?.name, 'play')}
              onMouseOut={(e) => video && toggleVideo(e, video?.name, 'pause')}
            >
              {title(
                lang.bool
                  ? 'Образовательное учреждение'
                  : 'Educational institution'
              )}
              <p className={stDesc(false)}>{institution[lang.code]}</p>
              {title(lang.bool ? 'Специализация' : 'Specialization')}
              <p className={stDesc(false)}>
                {specialization[lang.code]}
                <br />
                <strong className={stSpeciality}>
                  «{speciality[lang.code]}»
                </strong>
              </p>
              {title(lang.bool ? 'Период обучения' : 'Period of study')}
              <p className={stDesc(!diplomas)}>
                <strong>
                  {lang.bool ? 'Год поступления' : 'Year of admission'}:{' '}
                  <time dateTime={String(start)}>{start}</time>
                </strong>
                <br />
                <strong>
                  {lang.bool ? 'Год окончания' : 'Year of ending'}:{' '}
                  <time dateTime={String(ending)}>{ending}</time>
                </strong>
              </p>
              {diplomas && (
                <>
                  {title(
                    lang.bool ? 'Диплом / Сертификат' : 'Diploma / Certificate'
                  )}
                  <ul className={education.diploma__list}>
                    {diplomas.data.map((obj, i) => (
                      <li
                        key={`education-diploma-${i + 1}`}
                        className={stDiplomaItem}
                      >
                        <a className={stLink} {...obj} target="blank">
                          {obj.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <video className={stVideo(i)} {...video} muted loop />
            </div>
            {!screenSize && (
              <span className={stLine}>
                <span className={stIndicator}></span>
              </span>
            )}
          </li>
        )
      )}
    </ul>
  );
};

export default React.memo(Education);
