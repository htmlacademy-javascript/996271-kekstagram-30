function lengthCheck(stringName, maxlength) {
  if (stringName.length <= maxlength) {
    return true;
  }
  return false;
}

lengthCheck('123', 3);


