// Auxiliary Functions
import { convertInString } from '../../../auxiliary-functions/js/сonvert';
import { activeColor } from '../../../auxiliary-functions/ts/activeColor';
// Styles-module
import contacts from './contacts.module.scss';

const stContactBox = (value: string) =>
  convertInString(
    contacts[`${value}__box`],
    ...activeColor('borderColor-1', 'gradient', 'boxShadow-1')
  );
const stContactLink = (value: string) =>
  convertInString(
    contacts[`${value}__link`],
    ...activeColor('color-1', 'color-focus')
  );
const stForm = convertInString(
  contacts.form,
  ...activeColor('borderColor-1', 'gradient', 'boxShadow-1')
);
const stFormDesc = convertInString(
  contacts.form__desc,
  ...activeColor('color-1', 'textShadow-1')
);
const stFormInput = convertInString(
  contacts.form__input,
  ...activeColor('borderColor-2', 'background-1', 'background-focus')
);
const stFormBtn = convertInString(
  contacts.form__btn,
  ...activeColor('borderColor-1', 'background-3', 'background-focus')
);
const stFormMessage = convertInString(contacts.form__message, 'active-color-1');

export {
  stContactBox,
  stContactLink,
  stForm,
  stFormDesc,
  stFormInput,
  stFormBtn,
  stFormMessage,
};
