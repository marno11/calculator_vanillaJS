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
