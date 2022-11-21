import React from 'react';
// Redux
import { useAppSelector } from '../../../redux/hooks';
// Auxiliary Functions
import { toggleClassEl } from '../../../auxiliary-functions/ts/toggleClassEl';
import { addPropToArrayObj } from '../../../auxiliary-functions/ts/addPropToArrayObj';
// Swiper-Slider
import { A11y, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Styles Swiper-Slider
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
// Styles-module
import styles from './projects.module.scss';
import { stStack, stStackContent, stStackTitle } from './styles';
// Components
import Blockquote from '../../Common/Blockquote';
import UsTitle from '../../Common/UsTitle';
import Picture from '../../Common/Picture';
import IconArrow from '../../Common/Icon/IconArrow';
// Image
import sourceProjects from '../../../assets/image/projects';
// types
type ViewLink = (value: string, path: string, title: string) => JSX.Element;

const Projects: React.FC = () => {
  // Redux
  const { path, projects }: DataProjects = useAppSelector(
    (state) => state.active.data
  );
  // Remove active css-classes
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
  // Create source link
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
        {addPropToArrayObj<
          OProject,
          { [key: string]: SourceImage[] },
          OProject
        >(projects, { source: sourceProjects }).map(
          ({ name, online, stack, source }, i) => (
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
                  <SwiperSlide key={`${name}-${i + 1}`}>
                    <Picture
                      src={path}
                      alt={`${name}-${i + 1}`}
                      cssClasses={{ img: styles.img }}
                    />
                  </SwiperSlide>
                ))}
                <div
                  id={`content-box-${name}`}
                  className={styles.content__box}
                  aria-label={name}
                  onMouseLeave={() => {
                    removeActiveClass(name);
                    document.getElementById(`content-btn-${name}`)?.blur();
                  }}
                >
                  <button
                    id={`content-btn-${name}`}
                    className={styles.content__btn}
                    onClick={() =>
                      toggleClassEl(
                        ...Array.from(['box', 'btn'], (el) => {
                          return {
                            selector: `#content-${el}-${name}`,
                            cssClass: styles[`content__${el}-active`],
                          };
                        })
                      )
                    }
                    aria-label="Open description"
                  >
                    <IconArrow />
                  </button>
                  <div className={styles.content__logo}>{source?.logo}</div>
                  <div className={styles.content}>
                    <div className={stStackContent}>
                      <UsTitle
                        level={2}
                        content="Core technology stack"
                        cssClass={stStackTitle}
                      />
                      <ul className={styles['content__stack-list']}>
                        {stack.map((value, i) => (
                          <li
                            key={`stack-${i + 1}`}
                            className={styles['content__stack-item']}
                          >
                            <strong className={stStack} lang="en">
                              - {value}
                            </strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles['content__link-box']}>
                      {online && viewLink('online', path.online, name)}
                      {viewLink('source', path.source, name)}
                    </div>
                  </div>
                </div>
              </Swiper>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default React.memo(Projects);
