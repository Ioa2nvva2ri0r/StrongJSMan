import React from 'react';
// Redux
import { useAppSelector } from '../../../redux/hooks';
// Auxiliary Functions
import { toggleClassEl } from '../../../auxiliary-functions/ts/toggleClassEl';
// Swiper-Slider
import { A11y, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Styles -> Swiper-Slider
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
// Styles -> Main
import styles from './projects.module.scss';
// Components
import Blockquote from '../../Common/Blockquote';
import IconArrow from '../../Common/Icon/IconArrow';
// Image
import sourceProjects from '../../../assets/image/projects';

type ViewLink = (value: string, path: string, title: string) => JSX.Element;

const Projects: React.FC = () => {
  // Redux
  const { path, projects }: DataProjects = useAppSelector(
    (state) => state.active.data
  );

  const removeActiveClass = (value: string) =>
    toggleClassEl(
      ...Array.from(['box', 'btn'], (el) => {
        return {
          selector: `#content-${el}-${value}`,
          cssClass: styles[`content__${el}-active`],
          act: 'remove',
        };
      })
    );

  const viewLink: ViewLink = (value, path, title) => (
    <a
      id={`${title}-${value}`}
      className={styles.content__link}
      href={`${path}${title}`}
      target="blanck"
      onClick={() => removeActiveClass(title)}
      onBlur={(e) =>
        e.currentTarget.id === `${title}-source` && removeActiveClass(title)
      }
    >
      View {value}
    </a>
  );

  return (
    <>
      <Blockquote
        blockquote="Success is the ability to go from failure to failure without losing
          your enthusiasm."
        author="Winston Churchill"
      />
      <ul className={styles.list}>
        {[...projects]
          .map((obj) => {
            return {
              ...obj,
              source: sourceProjects.filter(
                ({ name }) => name === obj.title
              )[0],
            };
          })
          .map(({ title, online, stack, source }, i) => (
            <li
              key={`project-${i + 1}`}
              className={styles.item}
              style={{
                animationDuration: `${((i + 1.2) / 2).toFixed(1)}s`,
              }}
            >
              <Swiper
                modules={[A11y, Autoplay, EffectFade]}
                loop={true}
                allowTouchMove={false}
                effect={'fade'}
                onSwiper={(swiper) => {
                  // @ts-ignore
                  swiper.params.speed = 500;
                  // @ts-ignore
                  swiper.params.autoplay.delay = 1000;
                  // @ts-ignore
                  swiper.params.autoplay.disableOnInteraction = false;

                  swiper.el.addEventListener('mouseenter', () =>
                    swiper.autoplay?.start()
                  );
                  swiper.el.addEventListener('mouseleave', () => {
                    if (swiper.autoplay) {
                      swiper.autoplay.stop();
                      return swiper.slideTo(1, 1000);
                    }
                  });
                }}
              >
                {source?.images.map((path, i) => (
                  <SwiperSlide key={`${title}-${i + 1}`}>
                    <picture>
                      <source className={styles.img} srcSet={path} />
                      <img
                        className={styles.img}
                        src={path}
                        alt={`${title}-${i + 1}`}
                      />
                    </picture>
                  </SwiperSlide>
                ))}
                <div
                  id={`content-box-${title}`}
                  className={styles.content__box}
                  aria-label={title}
                  onMouseLeave={() => {
                    removeActiveClass(title);
                    document.getElementById(`content-btn-${title}`)?.blur();
                  }}
                >
                  <button
                    id={`content-btn-${title}`}
                    className={styles.content__btn}
                    onClick={() =>
                      toggleClassEl(
                        ...Array.from(['box', 'btn'], (el) => {
                          return {
                            selector: `#content-${el}-${title}`,
                            cssClass: styles[`content__${el}-active`],
                          };
                        })
                      )
                    }
                  >
                    <IconArrow />
                  </button>
                  <div className={styles.content__logo}>{source?.logo}</div>
                  <div className={styles.content}>
                    <div className={styles['content__stack-container']}>
                      <h3 className={styles['content__stack-title']}>
                        <span>Core technology stack</span>
                      </h3>
                      <ul className={styles['content__stack-list']}>
                        {stack.map((value, i) => (
                          <li
                            key={`stack-${i + 1}`}
                            className={styles['content__stack-item']}
                          >
                            <strong className={styles.content__stack}>
                              - {value}
                            </strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles['content__link-box']}>
                      {online && viewLink('online', path.online, title)}
                      {viewLink('source', path.source, title)}
                    </div>
                  </div>
                </div>
              </Swiper>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Projects;
