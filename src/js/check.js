'use strict';

(function getMessage(a, b) {
  if (typeof a === 'boolean') {
    return a ? 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров' : 'Переданное GIF-изображение не анимировано';
  } else if (typeof a === 'number') {
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';
  } else if (Array.isArray(a) && !Array.isArray(b)) {

    var amountOfRedPoints = a.reduce(function(sum, val) {
      return sum + val;
    }, 0);

    return 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  } else if (Array.isArray(a) && Array.isArray(b)) {

    var artifactsSquare = a.reduce(function(sum, val, i) {
      return sum + val * b[i];
    }, 0);

    return 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
  } else {
    return 'Переданы некорректные данные';
  }
})();
