function lengthCheck(stringName, maxlength) {
  if (stringName.length <= maxlength) {
    return true;
  }
  return false;
}

lengthCheck('123', 3);

function isPalindrome(string) {
  string = string.toLowerCase().replaceAll(/ /g, '');
  const stringArray = [...string];
  const newArray = [];
  stringArray.forEach((index) => {
    newArray.unshift(index);
  });
  const reversedString = newArray.join('');
  if (string === reversedString) {
    //console.log('Это палиндром');
    return string === reversedString;
  }
  //console.log('Это не палиндром');
}

isPalindrome('Hannah');
