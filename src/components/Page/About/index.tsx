import React, { useLayoutEffect, useState } from 'react';
// Components
import Picture from '../../Common/Picture';
// Styles-module
import about from './about.module.scss';
// Image
import I from '../../../assets/image/about/I.webp';
import { convertInString } from '../../../auxiliary-functions/js/сonvert';

const About: React.FC = () => {
  const [anim, setAnim] = useState(false);
  const [as, setAs] = useState(false);
  useLayoutEffect(() => {
    setTimeout(() => setAnim(true), 1000);
  });

  return (
    <>
      <div className={about.container}>
        <div className={about.img__box}>
          <Picture alt="My photo" src={I} cssClasses={{ img: about.img }} />
        </div>
        <div className={about.desc__box}>
          <p
            className={convertInString(
              about.desc,
              anim && about.desc__active,
              'active-color-1'
            )}
            dangerouslySetInnerHTML={{
              __html:
                'Привет, Меня зовут Иван и я Frontend разработчик из Беларуси. В основном cпециализируюсь на web-вёрстке и разработке Frontend части проектов на основе языка JavaScript. Имею опыт в разработке пользовательских интерфейсов, SPA приложений, а так же взаимодействия с серверным API для хранения, обработки и редактирования информации.'
                  .split('')
                  .map((el, i, array) => {
                    setTimeout(
                      () => setAs(true),
                      array.lastIndexOf(array.at(-1) || '') * 10 + 1000
                    );

                    return `<span style="transition-delay: ${
                      i / 100
                    }s">${el}</span>`;
                  })
                  .join(''),
            }}
          />
          <p
            className={convertInString(
              about.desc,
              as && about.desc__active,
              'active-color-1'
            )}
            dangerouslySetInnerHTML={{
              __html:
                'Мне нравится использовать свое навязчивое внимание к деталям, люблю тратить время на исправление мелких деталей и их оптимизацию. Я хорошо организовываю свою работу, люблю порядок и прилагаю максимум своих усилий для реализации высокого качества выполнения работы.'
                  .split('')
                  .map(
                    (el, i) =>
                      `<span style="transition-delay: ${i / 100}s">${el}</span>`
                  )
                  .join(''),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default About;
// \Hello, my name is Ivan and I am a Frontend developer from Belarus

// -  Я хорошо организовываю свою работу, умею быстро разбираться с новыми задачами с навязчивым вниманием к деталям и делаю это с минимальным количеством ошибок. Постоянно развиваюсь и обучаюсь чему-то новому. Готов на долгосрочное сотрудничество, чтобы заниматься любимым делом в перспективной компании.

// Я универсальный веб-разработчик. Я старший программист с хорошим знанием методов фронтенда. Я люблю структуру и порядок, и я также выступаю за качество. Я люблю тратить время на исправление мелких деталей и оптимизацию веб-приложений. Также мне нравится работать в команде, так быстрее учишься и многое другое. Как говорится: «две головы лучше, чем одна».
