import React, { useLayoutEffect } from 'react';
// Readux
import { useAppSelector } from '../../../redux/hooks';
// Auxiliary Functions
import { convertInString } from '../../../auxiliary-functions/js/сonvert';
// Components
import Picture from '../../Common/Picture';
// Styles-module
import about from './about.module.scss';
// Image
import I from '../../../assets/image/about/I.webp';

const About: React.FC<{ active: boolean }> = ({ active }) => {
  // Redux
  const { animate, data } = useAppSelector((state) => state.active);
  // React LayoutEffect
  useLayoutEffect(() => {
    active && setTimeout(() => paragraphActive(1), animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const paragraphActive = (numder: number) =>
    document
      .getElementById(`paragraph-${numder}`)
      ?.classList.add(about.desc__active);
  const lastChild = (array: string[]) =>
    array.lastIndexOf(array.at(-1) as string);

  return (
    <>
      <div className={about.container}>
        <div className={about.img__box}>
          <Picture
            alt="My photo"
            src={I}
            cssClasses={{ img: about.img }}
            lazyload={false}
          />
        </div>
        <div className={about.desc__box}>
          {(data as DataAbout).map((desc, index, array) => (
            <React.Fragment key={`about-paragraph-${index + 1}`}>
              <p
                id={`paragraph-${index + 1}`}
                className={convertInString(about.desc, 'active-color-effect')}
                dangerouslySetInnerHTML={{
                  __html: desc
                    .split('')
                    .map((el, i, arr) => {
                      if (active && lastChild(arr) === i)
                        setTimeout(
                          () => paragraphActive(index + 2),
                          lastChild(arr) * 10 + animate * 2
                        );

                      return `<span style="transition-delay: ${
                        i / 100
                      }s">${el}</span>`;
                    })
                    .join(''),
                }}
              ></p>
              {lastChild(array) !== index && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
// \Hello, my name is Ivan and I am a Frontend developer from Belarus

// -  Я хорошо организовываю свою работу, умею быстро разбираться с новыми задачами с навязчивым вниманием к деталям и делаю это с минимальным количеством ошибок. Постоянно развиваюсь и обучаюсь чему-то новому. Готов на долгосрочное сотрудничество, чтобы заниматься любимым делом в перспективной компании.

// Я универсальный веб-разработчик. Я старший программист с хорошим знанием методов фронтенда. Я люблю структуру и порядок, и я также выступаю за качество. Я люблю тратить время на исправление мелких деталей и оптимизацию веб-приложений. Также мне нравится работать в команде, так быстрее учишься и многое другое. Как говорится: «две головы лучше, чем одна».
