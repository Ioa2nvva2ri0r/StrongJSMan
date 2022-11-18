import React, { useState, useRef, useLayoutEffect } from 'react';
// Router
import { useLocation, useNavigate } from 'react-router-dom';
// Redux
import { useAppSelector } from '../../redux/hooks';
// Auxiliary Functions
import { capitalizedString } from '../../auxiliary-functions/js/сonvert';
// Components
import IconNav from '../Common/Icon/IconNav';
import IconLogo from '../Common/Icon/IconLogo';
// Styles-module
import header from './header.module.scss';
import {
  stBtnBurger,
  stBurger,
  stCopyright,
  stHeader,
  stLink,
  stLinkDesc,
  stLogo,
  stLogoDesc,
  stModal,
} from './styles';
import IconBurger from '../Common/Icon/IconBurger';

const Header: React.FC = () => {
  // .env
  const animateTime = process.env.REACT_APP__ANIMATE_PAGE_FLIP;
  const time = Number(animateTime ? animateTime : 1000);
  // Router
  const navigate = useNavigate();
  const parameterSearch = useLocation().search;
  // Redux
  const { path, paths } = useAppSelector((state) => state.active);
  // React State
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [burger, setBurger] = useState<boolean>(true);
  // React Ref
  const headerRef = useRef<HTMLElement>(null);
  const headerModalRef = useRef<HTMLDivElement>(null);
  const btnMenuRef = useRef<HTMLButtonElement>(null);
  // Check Screen Size
  const screenSize = screenWidth <= 800;
  // Ref elements
  const elHeader = headerRef.current;
  const elModal = headerModalRef.current;
  const elBtnMenu = btnMenuRef.current;
  // React LayoutEffect
  useLayoutEffect(() => {
    window.addEventListener('resize', () => setScreenWidth(window.innerWidth));

    const timer = screenSize
      ? setInterval(() => setBurger(!burger), time * 5)
      : 1;
    const handleClick = (e: MouseEvent) => {
      const checkEl = (el: Node | null): boolean =>
        !el?.contains(e.target as Node);

      if (checkEl(elHeader) && checkEl(elBtnMenu)) return closeMenu();
    };

    if (screenSize) document.body.addEventListener('click', handleClick);

    return () => {
      clearInterval(timer);
      document.body.removeEventListener('click', handleClick);
    };
  });

  const closeMenu = () => {
    elBtnMenu?.classList.remove(header['main__btn-hidden']);
    elHeader?.classList.add(header.main__close);
  };
  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = `?${new URL(e.currentTarget.href).searchParams.toString()}`;

    if (parameterSearch !== href)
      if (screenSize) {
        navigate(`/${href}`);
        setTimeout(() => screenSize && closeMenu(), time - 300);
      } else {
        elModal?.classList.add(header.modal__active);
        setTimeout(() => {
          elModal?.classList.remove(header.modal__active);
          navigate(`/${href}`);
        }, time + 10);
      }
  };

  return (
    <>
      {screenSize && (
        <button
          ref={btnMenuRef}
          className={stBtnBurger}
          onClick={(e) => {
            e.currentTarget.classList.toggle(header['main__btn-hidden']);
            elHeader?.classList.toggle(header.main__close);
          }}
        >
          <IconBurger
            cssClasses={{
              main: stBurger(burger),
              topLine: header['main__btn-burger-top'],
              bottomLine: header['main__btn-burger-bottom'],
            }}
            animateTime={(time * 5) / 1000}
          />
          Navigation
        </button>
      )}
      <header ref={headerRef} className={stHeader(screenSize)}>
        <nav className={header.nav}>
          <div className={stLogo}>
            <IconLogo
              backgroundColor={{
                1: 'active-stopColor-3',
                2: 'active-stopColor-2',
              }}
              iconColor={{
                1: 'active-stopColor-1',
                2: 'active-stopColor-2',
                3: 'active-stopColor-3',
              }}
            />
            <p className={stLogoDesc}>
              The galaxy needs a creative developer...
            </p>
          </div>
          <ul className={header.list}>
            {paths.map((href, i) => (
              <li key={`nav-link-${i + 1}`} className={header.item}>
                <a
                  href={`${process.env.REACT_APP__PARAMETER_SEARCH}${href}`}
                  className={stLink(href, path, screenSize)}
                  onClick={onClickLink}
                  onMouseLeave={(e) => e.currentTarget.blur()}
                >
                  <IconNav icon={href} cssClass="active-fill-1" />
                  <span className={stLinkDesc}>{capitalizedString(href)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {!screenSize && (
          <p className={stCopyright}>
            <strong>StrongJSMan®</strong> <time dateTime="2022">2022</time>
          </p>
        )}
        {!screenSize && (
          <div
            ref={headerModalRef}
            className={stModal}
            style={{
              transitionDuration: `${time / 1000}s`,
              animationDuration: `${time / 1000}s`,
            }}
          ></div>
        )}
      </header>
    </>
  );
};

export default Header;
