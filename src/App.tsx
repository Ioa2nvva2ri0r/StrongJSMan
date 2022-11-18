import React, { useEffect, useRef } from 'react';
// Router
import { Route, Routes, useLocation } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { activeData } from './redux/slices/activeSectionSlice';
// Auxiliary Functions
import smoothScroll from './auxiliary-functions/js/smoothScroll';
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
  const path = useAppSelector((state) => state.active.path);
  // React Ref
  const titleRef = useRef<HTMLHeadingElement>(null);
  // React Effect
  useEffect(() => {
    // Change active data
    dispatch(activeData(search));
    const title = titleRef.current;

    if (title) {
      title.classList.add('title__active');
      setTimeout(() => {
        title?.classList.remove('title__active');
      }, 1000);
      smoothScroll(title, 100);
    }
  }, [dispatch, search]);
  // Get active section
  const section = (value: string, element: React.ReactElement) =>
    value === path ? element : null;

  return (
    <>
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
                {section('about', <About />) ||
                  section('abilities', <Abilities />) ||
                  section('education', <Education />) ||
                  section('projects', <Projects />) ||
                  section('contacts', <Contacts />)}
              </section>
            </main>
          }
        />
      </Routes>
      {[...Array(3)].map((_, i) => (
        <div key={`stars-${i + 1}`} id={`stars-${i + 1}`}></div>
      ))}
    </>
  );
};

export default App;
