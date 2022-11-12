import regExp from './regular-expression';
import addError from './add-error';

function debounce(fun, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    isCooldown = true;
    fun.apply(this, arguments);
    setTimeout(() => (isCooldown = false), ms);
  };
}
const animationMessage = debounce(addError, 5000);

export default function checkError(input) {
  // Props input
  const {
    type,
    value,
    name,
    placeholder,
    checked,
    required,
    lang,
    maxLength,
    minLength,
  } = input;
  // Props option
  const _name = placeholder || placeholder !== '' ? placeholder : name;
  const _max = maxLength;
  const _min = minLength;
  const _value = value.trim();
  const _length = _value.length;
  const _type = (val) => type === val;
  const _excep = input.dataset.excep;
  const letter = lang === 'ru' ? 'русского' : lang === 'en' && 'латинского';
  const testValue = _value !== '' || required;

  function errorСheckingСondition(condition, message) {
    if (condition) {
      animationMessage(input, `Поле «${_name}» ${message}`, 5000);
      return true;
    }
    return false;
  }

  return [
    errorСheckingСondition(_length < 1 && required, `не указано!`),
    errorСheckingСondition(
      (_min !== -1 || _max !== -1) &&
        _length >= 1 &&
        (_length < _min || _length > _max),
      `не должно быть ${
        _min && !_max
          ? `менее ${_min}`
          : _max && !_min
          ? `более ${_max}`
          : _min &&
            _max &&
            (_min === _max
              ? `менее и более ${_min}`
              : `${_min} и более ${_max}`)
      } символов!`
    ),
    errorСheckingСondition(
      lang !== '' && regExp(lang, _value, _excep),
      `может содержать в себе только: буквы ${letter} алфавита!`
    ),
    errorСheckingСondition(
      (_type('radio') || _type('checkbox')) && !checked && required,
      `не выбрано!`
    ),
    errorСheckingСondition(
      _type('number') && regExp(type, _value) && testValue,
      `содержит символы не являющиеся цифрами!`
    ),
    errorСheckingСondition(
      _type('email') && regExp(type, _value) && testValue,
      `указано не правильно, или имеет некорректную формулировку!`
    ),
    errorСheckingСondition(
      _type('tel') && regExp(type, _value) && testValue,
      `может содержать в себе только следующую маску ввода: +«Код страны»(«Код оператора»)«Номер телефона через тире»!`
    ),
  ].includes(true);
}
