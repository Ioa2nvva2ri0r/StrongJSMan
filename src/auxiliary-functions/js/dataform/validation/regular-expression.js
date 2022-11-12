export default function regExp(type, value, exception = '') {
  const newRegExp = (val, flags) => new RegExp(`[^${val}${exception}]`, flags);

  switch (type) {
    case 'email':
      return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
        value
      );
    case 'tel':
      return !/^\+\d{1,3}\(\d{2,3}\)\d{2,3}-\d{2}-\d{2}$/.test(value);
    case 'number':
      return newRegExp('0-9').test(value);
    case 'ru':
      return newRegExp('а-яё', 'gi').test(value);
    case 'en':
      return newRegExp('a-z', 'gi').test(value);
  }
}
