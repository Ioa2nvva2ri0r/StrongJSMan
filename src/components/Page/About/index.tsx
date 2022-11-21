import React, { useLayoutEffect } from 'react';
// Readux
import { useAppSelector } from '../../../redux/hooks';
// Components
import Picture from '../../Common/Picture';
// Styles-module
import about from './about.module.scss';
// Image
import I from '../../../assets/image/about/I.webp';

const About: React.FC<{ active: boolean }> = ({ active }) => {
  // Redux
  const { lang, animate, data } = useAppSelector((state) => state.active);
  // React LayoutEffect
  useLayoutEffect(() => {
    active && setTimeout(() => paragraphActive(1, about.desc__active), animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const paragraphActive = (numder: number, cssClass: string) =>
    document.getElementById(`paragraph-${numder}`)?.classList.add(cssClass);
  const lastChild = (array: string[]) =>
    array.lastIndexOf(array.at(-1) as string);

  return (
    <>
      <div className={about.container}>
        <Picture
          alt="My photo"
          src={I}
          cssClasses={{ img: about.img }}
          lazyload={false}
        />
        <div className={about.desc__box}>
          {(data as DataAbout)[lang].map((desc, index) => (
            <React.Fragment key={`about-paragraph-${index + 1}`}>
              <p
                id={`paragraph-${index + 1}`}
                className={about.desc}
                dangerouslySetInnerHTML={{
                  __html: desc
                    .split('')
                    .map((el, i, arr) => {
                      if (active && lastChild(arr) === i)
                        setTimeout(
                          () => paragraphActive(index + 2, about.desc__active),
                          lastChild(arr) * 10 + animate * 2
                        );

                      return `<span class="active-color-1" style="transition-delay: ${
                        i / 100
                      }s">${el}</span>`;
                    })
                    .join(''),
                }}
              ></p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(About);

// -  Я хорошо организовываю свою работу, умею быстро разбираться с новыми задачами с навязчивым вниманием к деталям и делаю это с минимальным количеством ошибок. Постоянно развиваюсь и обучаюсь чему-то новому. Готов на долгосрочное сотрудничество, чтобы заниматься любимым делом в перспективной компании.

//  Также мне нравится работать в команде, так быстрее учишься и многое другое. Как говорится: «две головы лучше, чем одна».
