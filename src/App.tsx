import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
// Router
import { Route, Routes, useLocation } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { activeData, activeLanguage } from './redux/slices/activeSectionSlice';
// Auxiliary Functions
import smoothScroll from './auxiliary-functions/js/smoothScroll';
import { smoothScrollUpBtn } from './auxiliary-functions/js/smoothScrollUpBtn';
import {
  convertInString,
  capitalizedString,
} from './auxiliary-functions/js/сonvert';
import { activeColor } from './auxiliary-functions/ts/activeColor';
// Components
import Header from './components/Header';
import About from './components/Page/About';
import Abilities from './components/Page/Abilities';
import Education from './components/Page/Education';
import Projects from './components/Page/Projects';
import Contacts from './components/Page/Contacts';
import Greeting from './components/Greeting';
import IconArrow from './components/Common/Icon/IconArrow';
import IconLanguage from './components/Common/Icon/IconLanguage';
// Styles
const stTitle = convertInString(
  'title',
  ...activeColor('borderColor-1', 'color', 'color-effect')
);

const App: React.FC = () => {
  // Router
  const search = useLocation().search;
  // Redux
  const dispatch = useAppDispatch();
  const { lang, animate, path } = useAppSelector((state) => state.active);
  const time = animate * 5.3;
  // React State
  const [visible, setVisible] = useState<boolean>(true);
  // React Ref
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnScrollRef = useRef<HTMLButtonElement>(null);
  // React Effect
  useEffect(() => {
    // Change active data
    dispatch(activeData(search));
    const title = titleRef.current;

    if (title) {
      title.classList.add('title__active');
      setTimeout(() => title?.classList.remove('title__active'), 1000);
      smoothScroll(title, 100);
    }
  }, [dispatch, search]);
  // React LayoutEffect
  useLayoutEffect(() => {
    // Active smooth scroll up by click button
    btnScrollRef.current && smoothScrollUpBtn(btnScrollRef.current, 150);
    // Remove preloader welcome
    window.document.getElementById('welcome')?.remove();
    // Hidden modal greeting
    setTimeout(() => setVisible(false), time);
  });
  // Get active section
  const section = (value: string, element: React.ReactElement) =>
    value === path ? element : null;

  return (
    <>
      {visible && <Greeting animateTime={time - 400} />}
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <section className="section">
                <h1 ref={titleRef} className={stTitle}>
                  {capitalizedString(path)}
                </h1>
                {section('about me', <About active={!visible} />) ||
                  section('abilities', <Abilities />) ||
                  section('education', <Education />) ||
                  section('projects', <Projects />) ||
                  section('contacts', <Contacts />)}
              </section>
            </main>
          }
        />
      </Routes>
      <button
        className="btn-language active-color-1"
        onClick={() => {
          dispatch(activeLanguage(lang.bool ? 'en' : 'ru'));
        }}
        aria-label={lang.bool ? 'Язык' : 'Language'}
      >
        {lang.bool ? 'Русский' : 'English'}
        <IconLanguage />
      </button>
      <button
        ref={btnScrollRef}
        className="btn-scroll"
        aria-label={lang.bool ? 'Вверх' : 'Up'}
      >
        <IconArrow />
      </button>
    </>
  );
};

export default App;
