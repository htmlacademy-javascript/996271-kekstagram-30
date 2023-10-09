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
    //console.log('Это палиндром');
    return string === reversedString;
  }
  //console.log('Это не палиндром');
}

isPalindrome('Hannah');
