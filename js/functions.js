// Функция для проверки длины строки

const lengthCheck = (string, maxlength) => string.length <= maxlength;

// Cтрока короче 20 символов
lengthCheck('проверяемая строка', 20);
// Длина строки ровно 18 символов
lengthCheck('проверяемая строка', 18);
// Строка длиннее 10 символов
lengthCheck('проверяемая строка', 10);

// Функция на проверку полиндрома

const isPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(/ /g, ''); // Приводим строку к нижнему регистру и удаляем все пробелы
  const stringArray = [...string]; // Записываем строку в массив
  const newArray = []; // Создаем пустой массив
  stringArray.forEach((index) => { // С помощью цикла и метода unshift перезаписываем строку в пустой массив
    newArray.unshift(index);
  });
  const reversedString = newArray.join(''); // Создаем новую переменную и записываем результат из цикла
  if (string === reversedString) { // Сравниваем и возвращаем результат
    return string === reversedString;
  }
  return false;
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


// Функция для перезписи чисел из строки в целое число

const getNumber = (string) => {
  string = String(string);
  const maxlength = string.length;
  let number = '';
  for (let i = 0; i < maxlength; i++) {
    for (let j = 0; j < 10; j++) {
      if (string.at(i) === String(j)) {
        number = number + String(j);
      }
    }
  }
  number = parseInt(number, 10);
  if (Number.isNaN(number)) {
    return 'NaN';
  }
  return number;
};

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN
getNumber(2023); // 2023
getNumber(-1); // 1
getNumber(1.5); // 15
