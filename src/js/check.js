'use strict';

function getMessage(a, b) {
  if (typeof a === 'boolean') {
    return a ? 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров' : 'Переданное GIF-изображение не анимировано';
  } else if (typeof a === 'number') {
    console.log('number a = ' + a);
    console.log('number b = ' + b);
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';
  } else if (Array.isArray(a) && !Array.isArray(b)) {
    var amountOfRedPoints = a.reduce(function(sum, val) {
      sum = sum + val;
      return sum;
    }, 0);
    return 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  } else if (Array.isArray(a) && Array.isArray(b)) {
    var artifactsSquare = 0;
    for (var i = 0; i < a.length; i++) {
      artifactsSquare += a[i] * b[i];
    }
    return 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
  } else {
    return 'Переданы некорректные данные';
  }
}
