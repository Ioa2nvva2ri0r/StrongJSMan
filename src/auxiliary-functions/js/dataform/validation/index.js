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

export default function checkError(input, documentLanguage) {
  // Props input
  const {
    type,
    value,
    name,
    placeholder,
    required,
    lang,
    maxLength,
    minLength,
  } = input;
  // Props option
  const language = documentLanguage === 'ru';
  const _name = placeholder || placeholder !== '' ? placeholder : name;
  const _max = maxLength;
  const _min = minLength;
  const _value = value.trim();
  const _length = _value.length;
  const _type = (val) => type === val;
  const _excep = input.dataset.excep;
  const letter =
    lang === 'ru'
      ? language
        ? 'русского'
        : 'russian'
      : lang === 'en' && (language ? 'латинского' : 'latin');
  const testValue = _value !== '' || required;

  function errorСheckingСondition(condition, message) {
    if (condition) {
      animationMessage(
        input,
        `${language ? 'Поле' : 'Field'} «${_name}» ${message}`,
        5000
      );
      return true;
    }
    return false;
  }

  return [
    errorСheckingСondition(
      _length < 1 && required,
      language ? 'не указано!' : 'is not specified!'
    ),
    errorСheckingСondition(
      (_min !== -1 || _max !== -1) &&
        _length >= 1 &&
        (_length < _min || _length > _max),
      `${language ? 'не должно быть' : 'should not be'} ${
        _min && !_max
          ? `${language ? 'менее' : 'less than'} ${_min}`
          : _max && !_min
          ? `${language ? 'более' : 'more than'} ${_max}`
          : _min &&
            _max &&
            (_min === _max
              ? `${language ? 'менее и более' : 'than or more than'} ${_min}`
              : `${_min} ${language ? 'и более' : 'and more than'} ${_max}`)
      } ${language ? 'символов' : 'symbols'}!`
    ),
    errorСheckingСondition(
      lang !== '' && regExp(lang, _value, _excep),
      language
        ? `может содержать в себе только: буквы ${letter} алфавита!`
        : `can contain only: letters of the ${letter} alphabet!`
    ),
    errorСheckingСondition(
      _type('email') && regExp(type, _value) && testValue,
      language
        ? 'указано не правильно, или имеет некорректную формулировку!'
        : 'is not correct, or has incorrect wording!'
    ),
    errorСheckingСondition(
      _type('tel') && regExp(type, _value) && testValue,
      language
        ? 'может содержать в себе только следующую маску ввода: +«Код страны»(«Код оператора»)«Номер телефона через тире»!'
        : 'can contain only the following input mask: +«Country code»(«Operator code»)«Phone number separated by a dash»!'
    ),
  ].includes(true);
}
