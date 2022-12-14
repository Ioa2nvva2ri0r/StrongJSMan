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
  let countAnimate: number = 0;
  // Redux
  const { lang, animate, data } = useAppSelector((state) => state.active);
  // React LayoutEffect
  useLayoutEffect(() => {
    active && setTimeout(() => paragraphActive(1, about.desc__active), animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  // Add active css class paragraph
  const paragraphActive = (numder: number, cssClass: string) =>
    document.getElementById(`paragraph-${numder}`)?.classList.add(cssClass);
  // Search last child array string
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
          {(data[lang.code] as DataAbout).map((desc, index) => (
            <React.Fragment key={`about-paragraph-${index + 1}`}>
              <p
                id={`paragraph-${index + 1}`}
                className={about.desc}
                dangerouslySetInnerHTML={{
                  __html: desc
                    .split('')
                    .map((el, i, arr) => {
                      if (active && lastChild(arr) === i) {
                        setTimeout(
                          () => paragraphActive(index + 2, about.desc__active),
                          (countAnimate += i * 10 + animate)
                        );
                      }

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
