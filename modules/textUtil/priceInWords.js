// borrowed from http://javascript.ru/forum/misc/40642-summa-propisyu-2.html

module.exports = function(_number) {
  var _arr_numbers = new Array();
  _arr_numbers[1] = new Array('', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать');
  _arr_numbers[2] = new Array('', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто');
  _arr_numbers[3] = new Array('', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот');
  function number_parser(_num, _desc) {
    var _string = '';
    var _num_hundred = '';
    if (_num.length == 3) {
      _num_hundred = _num.substr(0, 1);
      _num = _num.substr(1, 3);
      _string = _arr_numbers[3][_num_hundred] + ' ';
    }
    if (_num < 20) _string += _arr_numbers[1][parseFloat(_num)] + ' ';
    else {
      var _first_num = _num.substr(0, 1);
      var _second_num = _num.substr(1, 2);
      _string += _arr_numbers[2][_first_num] + ' ' + _arr_numbers[1][_second_num] + ' ';
    }
    switch (_desc){
    case 0:
      var last = _num.length - 1;
      var _last_num = parseFloat(_num.charAt(last));
      var _slice_num = _num.slice(0, -1);
      var _pre_last_num = parseFloat(_slice_num);
      if (_last_num == 1 && 1 != _pre_last_num) _string += 'рубль';
      else if (_last_num > 1 && _last_num < 5 && 1 != _pre_last_num)  _string += 'рубля';
      else if ("" !=  _slice_num) _string += 'рублей';
      else if (1 == _pre_last_num) _string += 'рублей';
      else if ("" !=  _slice_num && _last_num  > 4) _string += 'рублей';
      else if ("" ==  _slice_num && _last_num  > 4) _string += 'рублей';
      else if ("" == _slice_num && 0 == _last_num) _string += 'Ноль рублей';
      else _string += 'рубль';
      break;

    case 1:
      var last = _num.length - 1;
      var _last_num = parseFloat(_num.charAt(last));
      var _slice_num = _num.slice(0, -1);
      var _pre_last_num = parseFloat(_slice_num);
      if (_last_num == 1 && 1 != _pre_last_num) _string += 'тысяча ';
      else if (_last_num == 1 && 1 == _pre_last_num.toString().length) _string += 'тысяча ';
      else if (_last_num > 1 && _last_num < 5 && 1 != _pre_last_num) _string += 'тысячи ';
      else if (parseFloat(_num) != 0) _string += 'тысяч ';
      _string = _string.replace('один ', 'одна ');
      _string = _string.replace('два ', 'две ');
      break;

    case 2:
      var _last_num = parseFloat(_num.substr(-1));
      var last = _num.length - 1;
      var _last_num = parseFloat(_num.charAt(last));
      var _slice_num = _num.slice(0, -1);
      var _pre_last_num = parseFloat(_slice_num);
      if (_last_num == 1 && 1 != _pre_last_num) _string += 'миллион ';
      else if (_last_num == 1 && 1 == _pre_last_num.toString().length) _string += 'миллион ';
      else if (_last_num > 1 && _last_num < 5 && 1 != _pre_last_num) _string += 'миллиона ';
      else _string += 'миллионов ';
      break;
    case 3:
      var _last_num = parseFloat(_num.substr(-1));
      var last = _num.length - 1;
      var _last_num = parseFloat(_num.charAt(last));
      var _slice_num = _num.slice(0, -1);
      var _pre_last_num = parseFloat(_slice_num);
      if (_last_num == 1 && 1 != _pre_last_num) _string += 'миллиард ';
      else if (_last_num == 1 && 1 == _pre_last_num.toString().length) _string += 'миллиард ';
      else if (_last_num > 1 && _last_num < 5 && 1 != _pre_last_num) _string += 'миллиарда ';
      else _string += 'миллиардов ';
      break;
    }
    _string = _string.replace('  ', ' ');
    return _string;
  }
  function decimals_parser(_num) {
    var _first_num = _num.substr(0, 1);
    var _second_num = parseFloat(_num.substr(1, 2));
    var _string = ' ' + _first_num + _second_num;
    if (_second_num == 1 && 1 != _first_num) _string += ' копейка';
    else if (_second_num > 1 && _second_num < 5 && 1 != _first_num) _string += ' копейки';
    else _string += ' копеек';
    return _string;
  }
  if (!_number || _number == 0) return 'Ноль рублей';
  if (typeof _number !== 'number') {
    _number = _number.replace(',', '.');
    _number = parseFloat(_number);
    if (isNaN(_number)) return 'Ноль рублей';
  }
  _number = _number.toFixed(2);
  if(_number.indexOf('.') != -1) {
    var _number_arr = _number.split('.');
    var _number = _number_arr[0];
    var _number_decimals = _number_arr[1];
  }
  var _number_length = _number.length;
  var _string = '';
  var _num_parser = '';
  var _count = 0;
  for (var _p = (_number_length - 1); _p >= 0; _p--) {
    var _num_digit = _number.substr(_p, 1);
    _num_parser = _num_digit +  _num_parser;
    if ((_num_parser.length == 3 || _p == 0) && !isNaN(parseFloat(_num_parser))) {
      _string = number_parser(_num_parser, _count) + _string;
      _num_parser = '';
      _count++;
    }
  }
  if (_number_decimals) _string += decimals_parser(_number_decimals);
  _string=_string.charAt(0).toUpperCase() + _string.substr(1).toLowerCase();
  return _string;
};

