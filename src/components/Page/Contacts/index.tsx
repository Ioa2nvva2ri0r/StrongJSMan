import React, { useEffect, useRef, useState } from 'react';
// Redux
import { useAppSelector } from '../../../redux/hooks';
// Axios
import axios from 'axios';
// Yandex Map
import { YMaps, Map, Placemark } from 'react-yandex-maps';
// Skeleton
import ContentLoader from 'react-content-loader';
// Auxiliary Functions
import dataForm from '../../../auxiliary-functions/js/dataform';
// Components
import Blockquote from '../../Common/Blockquote';
import UsTitle from '../../Common/UsTitle';
import IconPreloader from '../../Common/Icon/IconPreloader';
import IconContacts from '../../Common/Icon/IconContacts';
// Styles-module
import contacts from './contacts.module.scss';
import {
  stContactBox,
  stContactLink,
  stForm,
  stFormBtn,
  stFormDesc,
  stFormInput,
  stFormMessage,
} from './styles';
// Image
import placemarkMap from '../../../assets/image/placemark.svg';

const Contacts: React.FC = () => {
  // .env
  const env = process.env;
  // Redux
  const { animate, data } = useAppSelector((state) => state.active);
  // React State
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [mapTimeout, setMapTimeout] = useState<boolean>(true);
  const [mapLoad, setMapLoad] = useState<boolean>(true);
  // React Ref
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  // React Effect
  useEffect(() => {
    setTimeout(() => setMapTimeout(false), animate);
  });
  // Submit Form
  const submitForm = async () => {
    const path = env.REACT_APP__PATH_POST_DATA;
    // Get data from a form
    const data = dataForm(formRef.current);

    if (data !== null && path) {
      setLoading(true);

      try {
        const response = await axios(path, {
          method: 'POST',
          data: { path: env.PUBLIC_URL, ...data },
        });

        if (response.status >= 200 && response.status <= 299)
          return setMessage(
            'Data sent successfully, I will contact you shortly!'
          );

        throw new Error('An error occurred, please try again later!');
      } catch (error) {
        error instanceof Error && setMessage(error.message);
      } finally {
        const messageEl = messageRef.current?.classList;

        setLoading(false);

        messageEl?.add(contacts['form__message-active']);

        setTimeout(() => {
          messageEl?.remove(contacts['form__message-active']);
          setTimeout(() => setMessage(''), 400);
        }, 5000);
      }
    }
  };
  // Preload map
  const mapLoader = () => (
    <ContentLoader
      speed={1}
      width={1200}
      height={600}
      viewBox="0 0 1200 600"
      backgroundColor="#1b2735"
      foregroundColor="#38495a"
    >
      <rect x="0" y="0" rx="0" ry="0" width="1200" height="600" />
    </ContentLoader>
  );

  return (
    <>
      <Blockquote
        blockquote="Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning."
        author="Albert Einstein"
        cssClasses={{
          box: contacts.blockquote__box,
        }}
      />
      <ul className={contacts.container__contactsSocials}>
        {(data as DataContacts).map(({ title, group, data }, i) => (
          <li key={`contact-box-${i + 1}`} className={stContactBox(group)}>
            <UsTitle
              level={2}
              cssClass={contacts[`${group}__title`]}
              content={title}
            />
            <ul className={contacts[`${group}__list`]}>
              {data.map((obj, i) => (
                <li
                  key={`contact-item-${i + 1}`}
                  className={contacts[`${group}__item`]}
                >
                  <a className={stContactLink(group)} {...obj}>
                    <IconContacts
                      icon={obj.name}
                      backgroundColor="active-fill-2"
                      iconColor="active-fill-1"
                    />
                    <span className={contacts[`${group}__link-desc`]}>
                      {group === 'social' ? obj.name : obj.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className={contacts.container__formMap}>
        <form ref={formRef} className={stForm}>
          <UsTitle
            level={2}
            cssClass={contacts.form__title}
            content="Write me"
          />
          <div className={contacts['form__box-input']}>
            <p className={stFormDesc}>
              Fields marked with an asterisk are required!
            </p>
            <ul className={contacts.form__list}>
              {[
                {
                  type: 'text',
                  name: 'name',
                  lang: 'en',
                  minLength: 2,
                  maxLength: 20,
                  placeholder: 'Name*',
                  required: true,
                  'data-excep': '-',
                },
                {
                  type: 'email',
                  name: 'email',
                  lang: 'en',
                  placeholder: 'E-mail*',
                  required: true,
                },
                {
                  type: 'tel',
                  name: 'tel',
                  placeholder: 'Phone number',
                },
              ].map((obj, index) => (
                <li
                  key={`contacts-item-${1 + index}`}
                  className={contacts.form__item}
                >
                  <input className={stFormInput} {...obj} autoComplete="off" />
                </li>
              ))}
              <li className={contacts.form__item}>
                <textarea
                  className={stFormInput}
                  name="message"
                  placeholder="Сomment"
                />
              </li>
            </ul>
          </div>
          <div className={contacts['form__box-btn']}>
            <button
              type="button"
              className={stFormBtn}
              onClick={() => submitForm()}
            >
              {loading && <IconPreloader cssClass="active-stroke-1" />}
              <span className="active-color-effect">Submit</span>
            </button>
            <p ref={messageRef} className={stFormMessage} role="alert">
              {message}
            </p>
          </div>
        </form>
        <div className={contacts.map__box}>
          {mapTimeout ? (
            mapLoader()
          ) : (
            <YMaps>
              {mapLoad && mapLoader()}
              <Map
                onLoad={() => setMapLoad(false)}
                defaultState={{
                  center: [53.897491757579516, 27.569602765625],
                  zoom: 5,
                }}
                className={contacts.map}
              >
                <Placemark
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: placemarkMap,
                    iconImageSize: [40, 40],
                    iconImageOffset: [-20, -34],
                  }}
                  geometry={[52.10841813121317, 23.702415265625]}
                />
              </Map>
            </YMaps>
          )}
        </div>
      </div>
    </>
  );
};

export default Contacts;
