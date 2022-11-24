import React, { useState, useLayoutEffect } from 'react';
// Redux
import { useAppSelector } from '../../../redux/hooks';
// Auxiliary Functions
import {
  capitalizedString,
  convertInString,
} from '../../../auxiliary-functions/js/сonvert';
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
// Components
import Blockquote from '../../Common/Blockquote';
import UsTitle from '../../Common/UsTitle';
import Picture from '../../Common/Picture';
import IconArrow from '../../Common/Icon/IconArrow';
// Styles-module
import styles from './projects.module.scss';
import { stBtnVisible, stStack, stStackContent, stStackTitle } from './styles';
// Image
import sourceProjects from '../../../assets/image/projects';
// types
type ViewLink = (value: string, path: string, title: string) => JSX.Element;

const Projects: React.FC = () => {
  // Redux
  const { lang, data } = useAppSelector((state) => state.active);
  const { path, projects }: DataProjects = data;
  // React State
  const [screenWidth, setScreenWidth] = useState<boolean>(
    window.innerWidth <= 1141
  );
  const [animateActive, setAnimateActive] = useState<boolean>(false);
  const [itemHidden, setItemHidden] = useState<boolean>(screenWidth);
  // React LayoutEffect
  useLayoutEffect(() => {
    window.addEventListener('resize', () =>
      setScreenWidth(window.innerWidth <= 1141)
    );
    setTimeout(() => setAnimateActive(true), 300);
  }, []);
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
      {capitalizedString(
        value === 'online'
          ? lang.bool
            ? 'онлайн'
            : value
          : lang.bool
          ? 'исходный код'
          : value
      )}
    </a>
  );

  return (
    <>
      <Blockquote
        blockquote={
          lang.bool
            ? 'Успех — это способность идти от неудачи к неудаче, не теряя энтузиазма'
            : 'Success is the ability to go from failure to failure without losing your enthusiasm'
        }
        author={lang.bool ? 'Уинстон Черчилль' : 'Winston Churchill'}
      />
      <ul className={styles.list}>
        {addPropToArrayObj<
          OProject,
          { [key: string]: SourceImage[] },
          OProject
        >(projects, { source: sourceProjects })
          .slice(itemHidden ? 0 : undefined, itemHidden ? 3 : undefined)
          .map(({ name, online, stack, source }, i) => (
            <li
              key={`project-${i + 1}`}
              className={convertInString(
                styles.item,
                animateActive && styles.item__active
              )}
              style={{
                transitionDelay: `${(i / 3).toFixed(1)}s`,
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
                    aria-label={
                      lang.bool ? 'Открыть описание' : 'Open description'
                    }
                  >
                    <IconArrow />
                  </button>
                  <div className={styles.content__logo}>
                    {source?.logo}
                    <span className={styles.content__view} role="note">
                      {lang.bool ? 'быстрый просмотр' : 'quick view'}
                    </span>
                  </div>
                  <div className={styles.content}>
                    <div className={stStackContent}>
                      <UsTitle
                        level={2}
                        content={
                          lang.bool ? 'Стек технологий' : 'Technology stack'
                        }
                        cssClass={stStackTitle}
                      />
                      <ul className={styles['content__stack-list']}>
                        {stack.map((value, i) => (
                          <li
                            key={`stack-${i + 1}`}
                            className={styles['content__stack-item']}
                          >
                            <strong
                              className={stStack}
                              translate="no"
                              lang="en"
                            >
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
          ))}
      </ul>
      {itemHidden && (
        <button
          className={stBtnVisible}
          onClick={() => {
            setItemHidden(false);
          }}
        >
          {lang.bool ? 'Показать ещё' : 'Show more'}
        </button>
      )}
    </>
  );
};

export default React.memo(Projects);
