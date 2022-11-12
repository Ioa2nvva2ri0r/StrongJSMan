import React, { useRef } from 'react';
// Router
import { useLocation, useNavigate } from 'react-router-dom';
// Redux
import { useAppSelector } from '../../redux/hooks';
// Auxiliary Functions
import { capitalizedString } from '../../auxiliary-functions/js/сonvert';
// Components
import IconNav from '../Common/Icon/IconNav';
import IconSuperMan from '../Common/Icon/IconSuperMan';
// Styles-module
import header from './header.module.scss';
import { stHeader, stLink, stLinkDesc, stModal } from './styles';

const Header: React.FC = () => {
  // Router
  const navigate = useNavigate();
  const parameterSearch = useLocation().search;
  // Redux
  const { path, paths } = useAppSelector((state) => state.active);
  // React Ref
  const headerModalRef = useRef<HTMLDivElement>(null);

  const onClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const modal = headerModalRef.current;
    const href = `?${new URL(e.currentTarget.href).searchParams.toString()}`;

    if (modal && parameterSearch !== href) {
      modal?.classList.add(header.modal__active);
      setTimeout(() => {
        modal?.classList.remove(header.modal__active);
        navigate(`/${href}`);
      }, 1205);
    }
  };

  return (
    <header className={stHeader}>
      <nav className={header.nav}>
        <ul className={header.list}>
          {paths.map((href, i) => (
            <li key={`nav-link-${i + 1}`} className={header.item}>
              <a
                href={`${process.env.REACT_APP__PARAMETER_SEARCH}${href}`}
                className={stLink(href, path)}
                onClick={onClickLink}
                onMouseLeave={(e) => e.currentTarget.blur()}
              >
                <IconNav icon={href} cssClass="active-fill-1" />
                <span className={stLinkDesc}>{capitalizedString(href)}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className={header.nav__super}>
          <IconSuperMan
            backgroundColor="active-fill-2"
            iconColor="active-fill-1"
          />
        </div>
      </nav>
      <div ref={headerModalRef} className={stModal}></div>
    </header>
  );
};

export default Header;
