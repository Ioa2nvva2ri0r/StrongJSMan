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
  const data: DataEducation[] = useAppSelector((state) => state.active.data);
  // React State
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  // Check Screen Size
  const screenSize = screenWidth <= 1138;
  // React LayoutEffect
  useLayoutEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
  });
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
        { [key: string]: SourceVideo[] | SourceDiplomas[] },
        DataEducation
      >(data, { video: videoEducation }, { diplomas: diplomasEducation }).map(
        (obj, i) => (
          <li
            key={`education-${i + 1}`}
            className={stItem}
            style={{
              animationDuration: `${((i + 2) / 2).toFixed(1)}s`,
            }}
          >
            <div
              className={education.content}
              onMouseOver={(e) =>
                obj.video && toggleVideo(e, obj.video?.name, 'play')
              }
              onMouseOut={(e) =>
                obj.video && toggleVideo(e, obj.video?.name, 'pause')
              }
            >
              {title('Educational institution')}
              <p className={stDesc(false)}>{obj.institution}</p>
              {title('Specialization')}
              <p className={stDesc(false)}>
                {obj.specialization}
                <br />
                <strong className={stSpeciality}>{obj.speciality}</strong>
              </p>
              {title('Period of study')}
              <p className={stDesc(!obj.diplomas)}>
                <strong>
                  Year of admission: <span>{obj.start}</span>
                </strong>
                <br />
                <strong>
                  Year of ending: <span>{obj.ending}</span>
                </strong>
              </p>
              {obj.diplomas && (
                <>
                  {title('Diploma / Certificate')}
                  <ul className={education.diploma__list}>
                    {obj.diplomas.data.map((obj, i) => (
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
              <video className={stVideo(i)} {...obj.video} muted loop />
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

export default Education;
