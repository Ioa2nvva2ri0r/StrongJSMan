import React, { useState, useRef, useLayoutEffect } from 'react';
// Router
import { useLocation, useNavigate } from 'react-router-dom';
// Redux
import { useAppSelector } from '../../redux/hooks';
// Components
import IconNav from '../Common/Icon/IconNav';
import IconLogo from '../Common/Icon/IconLogo';
import IconBurger from '../Common/Icon/IconBurger';
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

const Header: React.FC = () => {
  // Router
  const navigate = useNavigate();
  const parameterSearch = useLocation().search;
  // Redux
  const { lang, animate, path, paths, sections } = useAppSelector(
    (state) => state.active
  );
  // React State
  const [screenWidth, setScreenWidth] = useState<boolean>(
    window.innerWidth <= 800
  );
  const [burger, setBurger] = useState<boolean>(true);
  // React Ref
  const headerRef = useRef<HTMLElement>(null);
  const headerModalRef = useRef<HTMLDivElement>(null);
  const btnMenuRef = useRef<HTMLButtonElement>(null);
  // Ref elements
  const elHeader = headerRef.current;
  const elModal = headerModalRef.current;
  const elBtnMenu = btnMenuRef.current;
  // React LayoutEffect
  useLayoutEffect(() => {
    window.addEventListener('resize', () =>
      setScreenWidth(window.innerWidth <= 800)
    );

    const timer = screenWidth
      ? setInterval(() => setBurger(!burger), animate * 5)
      : 1;
    const handleClick = (e: MouseEvent) => {
      const checkEl = (el: Node | null): boolean =>
        !el?.contains(e.target as Node);

      if (checkEl(elHeader) && checkEl(elBtnMenu)) return closeMenu();
    };

    if (screenWidth) document.body.addEventListener('click', handleClick);

    return () => {
      clearInterval(timer);
      document.body.removeEventListener('click', handleClick);
    };
  });
  // Visible button menu and hidden menu
  const closeMenu = () => {
    elBtnMenu?.classList.remove(header['main__btn-hidden']);
    elHeader?.classList.add(header.main__close);
  };
  // Following a link
  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = `?${new URL(e.currentTarget.href).searchParams.toString()}`;

    if (parameterSearch !== href)
      if (screenWidth) {
        navigate(`/${href}`);
        setTimeout(() => screenWidth && closeMenu(), animate - 300);
      } else {
        elModal?.classList.add(header.modal__active);
        setTimeout(() => {
          elModal?.classList.remove(header.modal__active);
          navigate(`/${href}`);
        }, animate + 10);
      }
  };
  const thisYear = new Date().getFullYear();

  return (
    <>
      {screenWidth && (
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
            animateTime={(animate * 5) / 1000}
          />
          {lang.bool ? '??????????????????' : 'Navigation'}
        </button>
      )}
      <header ref={headerRef} className={stHeader(screenWidth)}>
        <nav className={header.nav}>
          <div className={stLogo}>
            <IconLogo
              backgroundColor={{
                1: 'active-stopColor-3',
                2: 'active-stopColor-2',
              }}
              iconColor="#38495a"
            />
            <p
              className={stLogoDesc}
              style={{
                fontSize: lang.bool ? '0.6rem' : '0.8rem',
              }}
            >
              {lang.bool
                ? '?????????????????? ?????????????????? ?? ???????????????????? ????????????????????????...'
                : 'The galaxy needs a creative developer...'}
            </p>
          </div>
          <ul className={header.list}>
            {paths.map((href, i) => (
              <li key={`nav-link-${i + 1}`} className={header.item}>
                <a
                  href={`${process.env.REACT_APP__PARAMETER_SEARCH}${href}`}
                  className={stLink(href, path, screenWidth)}
                  onClick={onClickLink}
                  onMouseLeave={(e) => e.currentTarget.blur()}
                >
                  <IconNav icon={href} cssClass="active-fill-1" />
                  <span className={stLinkDesc}>
                    {sections[href][lang.code]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {!screenWidth && (
          <p className={stCopyright} translate="no">
            <strong>StrongJSMan??</strong>{' '}
            <time dateTime={String(thisYear)}>{thisYear}</time>
          </p>
        )}
        {!screenWidth && (
          <div
            ref={headerModalRef}
            className={stModal}
            style={{
              transitionDuration: `${animate / 1000}s`,
              animationDuration: `${animate / 1000}s`,
            }}
          ></div>
        )}
      </header>
    </>
  );
};

export default Header;
