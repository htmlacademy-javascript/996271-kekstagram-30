// Функция для проверки длины строки

function lengthCheck(stringName, maxlength) {
  if (stringName.length <= maxlength) {
    return true;
  }
  return false;
}

lengthCheck('123', 3);

// Функция на проверку полиндрома

function isPalindrome(string) {
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
}

isPalindrome('Hannah');


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

getNumber('2023 год');
