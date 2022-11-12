import checkError from './validation';

export default function dataForm(form) {
  if (form.constructor === HTMLFormElement) {
    const elements = [
      ...new Set(
        Object.values(form.elements).filter(
          (el) => el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA'
        )
      ),
    ];

    let data = {};

    for (const [index, elem] of Object.entries(elements)) {
      const { type, name, value, checked } = elem;
      const checkType = type === 'radio' || type === 'checkbox';

      if (checkError(elem) === true) return null;

      if (checkType && checked) data[name] = value;
      if (!checkType && value !== '') data[name] = value;

      if (Number(index) === elements.length - 1)
        elements.forEach((el) => {
          const _checkType = el.type === 'radio' || el.type === 'checkbox';

          if (_checkType) el.checked = false;
          if (!_checkType) el.value = '';
        });
    }

    return data;
  } else throw new Error('Passed parameter is not a HTML-form!');
}
