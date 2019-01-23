const test = require('tape');
const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');
const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const DOM = new JSDOM(html);
global.document = DOM.window.document;
const frontEndCode = require('../scripts/script.js');

test('Test append function', function(t) {
  frontEndCode.Expression.append("1");
  let actual = frontEndCode.Expression.exp;
  let expected = "1";
  t.equal(actual, expected, 'should append the text "1" to exp attribute of Expression');

  frontEndCode.Expression.append("2");
  actual = frontEndCode.Expression.exp;
  expected = "12";
  t.equal(actual, expected, 'should append the text "2" to exp attribute of Expression');

  frontEndCode.Expression.append("+");
  actual = frontEndCode.Expression.exp;
  expected = "12+";
  t.equal(actual, expected, 'should append the text "+" to exp attribute of Expression');

  frontEndCode.Expression.append("3");
  actual = frontEndCode.Expression.exp;
  expected = "12+3";
  t.equal(actual, expected, 'should append the text "3" to exp attribute of Expression');
  t.end();
});

test('Test removeLast function', function(t){
  frontEndCode.Expression.exp = "123456";

  frontEndCode.Expression.removeLast();
  let actual = frontEndCode.Expression.exp;
  let expected = "12345";
  t.equal(actual, expected, 'should remove the "6" from "123456" and give "12345"');

  frontEndCode.Expression.removeLast();
  actual = frontEndCode.Expression.exp;
  expected = "1234";
  t.equal(actual, expected, 'should remove the "5" from "12345" and give "1234"');

  frontEndCode.Expression.removeLast();
  actual = frontEndCode.Expression.exp;
  expected = "123";
  t.equal(actual, expected, 'should remove the "4" from "1234" and give "123"');

  frontEndCode.Expression.removeLast();
  actual = frontEndCode.Expression.exp;
  expected = "12";
  t.equal(actual, expected, 'should remove the "3" from "123" and give "12"');

  frontEndCode.Expression.removeLast();
  actual = frontEndCode.Expression.exp;
  expected = "1";
  t.equal(actual, expected, 'should remove the "2" from "12" and give "1"');

  frontEndCode.Expression.removeLast();
  actual = frontEndCode.Expression.exp;
  expected = "";
  t.equal(actual, expected, 'should remove the "1" from "1" and give ""');

  frontEndCode.Expression.removeLast();
  actual = frontEndCode.Expression.exp;
  expected = "";
  t.equal(actual, expected, 'should give empty string');
  t.end();
});

test('Test allClear function', function(t){
  frontEndCode.Expression.exp = "123456";

  frontEndCode.Expression.allClear();
  let actual = frontEndCode.Expression.exp;
  let expected = "";
  t.equal(actual, expected, 'Should clear "123456" from exp');

  frontEndCode.Expression.allClear();
  actual = frontEndCode.Expression.exp;
  expected = "";
  t.equal(actual, expected, 'should leave an empty string empty');
  t.end();
});

test('Test input function', function(t){
  frontEndCode.Expression.exp = "";

  let expressionElements = ["1","2","3","4","5","6","7","8","9","0","X","/","+","-",".","E"];

  let actual = "";
  let expected = "";

  expressionElements.map(function(element) {
    frontEndCode.Expression.exp = "";
    frontEndCode.Expression.input(element);
    actual = frontEndCode.Expression.exp;
    expected = element;
    t.equal(actual, expected, `exp attribute of Expression should be ${element}`);
  });

  frontEndCode.Expression.exp = "1234";
  frontEndCode.Expression.input("DEL");
  actual = frontEndCode.Expression.exp;
  expected = "123";
  t.equal(actual, expected, 'exp attribute of Expression should be "123"');

  frontEndCode.Expression.input("AC");
  actual = frontEndCode.Expression.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Expression should be ""');

  frontEndCode.Expression.exp = "";
  frontEndCode.Expression.input("a");
  actual = frontEndCode.Expression.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Expression should be ""');

  frontEndCode.Expression.input("'");
  actual = frontEndCode.Expression.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Expression should be ""');

  frontEndCode.Expression.input('"');
  actual = frontEndCode.Expression.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Expression should be ""');

  frontEndCode.Expression.input("");
  actual = frontEndCode.Expression.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Expression should be ""');
  t.end();
});
