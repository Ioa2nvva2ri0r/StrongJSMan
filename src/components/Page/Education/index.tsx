import React from 'react';
// Redux
import { useAppSelector } from '../../../redux/hooks';
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
  const data: DataEducation = useAppSelector((state) => state.active.data);

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

  const title = (value: string): JSX.Element => (
    <UsTitle level={2} cssClass={education.title} content={value} />
  );

  // console.log(
  //   addPropToArrayObj(
  //     data,
  //     { video: videoEducation },
  //     { diplomas: diplomasEducation }
  //   )
  // );

  return (
    <ul className={education.list}>
      {[...data]
        .map((obj) => {
          return {
            ...obj,
            video: videoEducation.filter(({ name }) => name === obj.name)[0],
            diplomas: diplomasEducation.filter(
              ({ name }) => name === obj.name
            )[0],
          };
        })
        .map(
          (
            {
              institution,
              specialization,
              speciality,
              start,
              ending,
              video,
              diplomas,
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
                onMouseOver={(e) => toggleVideo(e, video?.name, 'play')}
                onMouseOut={(e) => toggleVideo(e, video?.name, 'pause')}
              >
                {title('Educational institution')}
                <p className={stDesc}>{institution}</p>
                {title('Specialization')}
                <p className={stDesc}>
                  {specialization}
                  <br />
                  <strong className={stSpeciality}>{speciality}</strong>
                </p>
                {title('Period of study')}
                <p className={stDesc}>
                  <strong>
                    Year of admission: <span>{start}</span>
                  </strong>
                  <br />
                  <strong>
                    Year of ending: <span>{ending}</span>
                  </strong>
                </p>
                {diplomas && (
                  <>
                    {title('Diploma / Certificate')}
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
              <span className={stLine}>
                <span className={stIndicator}></span>
              </span>
            </li>
          )
        )}
    </ul>
  );
};

export default Education;
