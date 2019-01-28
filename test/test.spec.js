const test = require('tape');
const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');
const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const DOM = new JSDOM(html);
global.document = DOM.window.document;
const frontEndCode = require('../scripts/script.js');

test('Test append function', function(t) {
  frontEndCode.Calculator.append("1", function(){});
  let actual = frontEndCode.Calculator.exp;
  let expected = "1";
  t.equal(actual, expected, 'should append the text "1" to exp attribute of Calculator');

  frontEndCode.Calculator.append("2", function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "12";
  t.equal(actual, expected, 'should append the text "2" to exp attribute of Calculator');

  frontEndCode.Calculator.append("+", function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "12+";
  t.equal(actual, expected, 'should append the text "+" to exp attribute of Calculator');

  frontEndCode.Calculator.append("3", function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "12+3";
  t.equal(actual, expected, 'should append the text "3" to exp attribute of Calculator');
  t.end();
});

test('Test removeLast function', function(t){
  frontEndCode.Calculator.exp = "123456";

  frontEndCode.Calculator.removeLast(function(){});
  let actual = frontEndCode.Calculator.exp;
  let expected = "12345";
  t.equal(actual, expected, 'should remove the "6" from "123456" and give "12345"');

  frontEndCode.Calculator.removeLast(function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "1234";
  t.equal(actual, expected, 'should remove the "5" from "12345" and give "1234"');

  frontEndCode.Calculator.removeLast(function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "123";
  t.equal(actual, expected, 'should remove the "4" from "1234" and give "123"');

  frontEndCode.Calculator.removeLast(function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "12";
  t.equal(actual, expected, 'should remove the "3" from "123" and give "12"');

  frontEndCode.Calculator.removeLast(function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "1";
  t.equal(actual, expected, 'should remove the "2" from "12" and give "1"');

  frontEndCode.Calculator.removeLast(function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "";
  t.equal(actual, expected, 'should remove the "1" from "1" and give ""');

  frontEndCode.Calculator.removeLast(function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "";
  t.equal(actual, expected, 'should give empty string');
  t.end();
});

test('Test allClear function', function(t){
  frontEndCode.Calculator.exp = "123456";

  frontEndCode.Calculator.allClear(function(){});
  let actual = frontEndCode.Calculator.exp;
  let expected = "";
  t.equal(actual, expected, 'Should clear "123456" from exp');

  frontEndCode.Calculator.allClear(function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "";
  t.equal(actual, expected, 'should leave an empty string empty');
  t.end();
});

test('Test input function', function(t){
  frontEndCode.Calculator.exp = "";

  let expressionElements = ["1","2","3","4","5","6","7","8","9","0","X","/","+","-",".","E"];

  let actual = "";
  let expected = "";

  expressionElements.map(function(element) {
    frontEndCode.Calculator.exp = "";
    frontEndCode.Calculator.input(element, function(){});
    actual = frontEndCode.Calculator.exp;
    expected = element;
    t.equal(actual, expected, `exp attribute of Calculator should be ${element}`);
  });

  frontEndCode.Calculator.exp = "1234";
  frontEndCode.Calculator.input("DEL", function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "123";
  t.equal(actual, expected, 'exp attribute of Calculator should be "123"');

  frontEndCode.Calculator.input("AC", function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Calculator should be ""');

  frontEndCode.Calculator.exp = "";
  frontEndCode.Calculator.input("a", function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Calculator should be ""');

  frontEndCode.Calculator.input("'", function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Calculator should be ""');

  frontEndCode.Calculator.input('"', function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Calculator should be ""');

  frontEndCode.Calculator.input("", function(){});
  actual = frontEndCode.Calculator.exp;
  expected = "";
  t.equal(actual, expected, 'exp attribute of Calculator should be ""');
  t.end();
});

test("Test operate function, 'simple format expressions'", function(t){
  frontEndCode.Calculator.operate("2+2", function(){});
  let actual = frontEndCode.Calculator.ans;
  let expected = "4";
  t.equal(actual, expected, 'ans attribute of Calculator should be "4"');

  frontEndCode.Calculator.operate("2+2+1+4+5+7", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "21";
  t.equal(actual, expected, 'ans attribute of Calculator should be "21"');

  frontEndCode.Calculator.operate("2+2+1+4+5+7-5-0-9-3", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "4";
  t.equal(actual, expected, 'ans attribute of Calculator should be "4"');

  frontEndCode.Calculator.operate("2+4-0+5+7-5-9+2+1-3", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "4";
  t.equal(actual, expected, 'ans attribute of Calculator should be "4"');

  frontEndCode.Calculator.operate("2*2", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "4";
  t.equal(actual, expected, 'ans attribute of Calculator should be "4"');

  frontEndCode.Calculator.operate("2*2*1*4*5*7", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "560";
  t.equal(actual, expected, 'ans attribute of Calculator should be "560"');

  frontEndCode.Calculator.operate("2*2*1*4*5*7/5/4", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "28";
  t.equal(actual, expected, 'ans attribute of Calculator should be "28"');

  frontEndCode.Calculator.operate("2*4*5*7/5/4*2*1", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "28";
  t.equal(actual, expected, 'ans attribute of Calculator should be "28"');

  frontEndCode.Calculator.operate("25+20", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "45";
  t.equal(actual, expected, 'ans attribute of Calculator should be "45"');

  frontEndCode.Calculator.operate("25+0", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "25";
  t.equal(actual, expected, 'ans attribute of Calculator should be "25"');

  frontEndCode.Calculator.operate("21+254+1", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "276";
  t.equal(actual, expected, 'ans attribute of Calculator should be "276"');

  frontEndCode.Calculator.operate("21+254+1-5-23-111", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "137";
  t.equal(actual, expected, 'ans attribute of Calculator should be "4"');

  frontEndCode.Calculator.operate("2+4-0+5+7-5-9+2+1-3", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "4";
  t.equal(actual, expected, 'ans attribute of Calculator should be "4"');

  frontEndCode.Calculator.operate("2*2", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "4";
  t.equal(actual, expected, 'ans attribute of Calculator should be "4"');

  frontEndCode.Calculator.operate("2*2*1*4*5*7", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "560";
  t.equal(actual, expected, 'ans attribute of Calculator should be "560"');

  frontEndCode.Calculator.operate("2*2*1*4*5*7/5/4", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "28";
  t.equal(actual, expected, 'ans attribute of Calculator should be "28"');

  frontEndCode.Calculator.operate("2*4*5*7/5/4*2*1", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "28";
  t.equal(actual, expected, 'ans attribute of Calculator should be "28"');
  t.end();
});

test("Test Operate Function, 'hard format expressions'", function(t) {
  frontEndCode.Calculator.operate("+2", function(){});
  let actual = frontEndCode.Calculator.ans;
  let expected = "2";
  t.equal(actual, expected, 'ans attribute of Calculator should be 2');

  frontEndCode.Calculator.operate("-2", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "-2";
  t.equal(actual, expected, 'ans attribute of Calculator should be -2');

  frontEndCode.Calculator.operate("2*+2", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "4";
  t.equal(actual, expected, 'ans attribute of Calculator should be -2');

  frontEndCode.Calculator.operate("2*-2", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "-4";
  t.equal(actual, expected, 'ans attribute of Calculator should be -2');
  t.end()
});

test("Test Operate Function, 'incorrectly formatted expressions'", function(t) {
  frontEndCode.Calculator.operate("*2", function(){});
  let actual = frontEndCode.Calculator.ans;
  let expected = "Err";
  t.equal(actual, expected, 'ans attribute of Calculator should be "Err"');

  frontEndCode.Calculator.operate("/2", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "Err";
  t.equal(actual, expected, 'ans attribute of Calculator should be "Err"');

  frontEndCode.Calculator.operate("2-/2", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "Err";
  t.equal(actual, expected, 'ans attribute of Calculator should be "Err"');

  frontEndCode.Calculator.operate("2+*2", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "Err";
  t.equal(actual, expected, 'ans attribute of Calculator should be "Err"');

  frontEndCode.Calculator.operate("2*/2", function(){});
  actual = frontEndCode.Calculator.ans;
  expected = "Err";
  t.equal(actual, expected, 'ans attribute of Calculator should be "Err"');
  t.end()
});
