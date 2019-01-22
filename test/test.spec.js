const test = require('tape');
const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');
const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const DOM = new JSDOM(html);
global.document = DOM.window.document;
const frontEndCode = require('../scripts/script.js');
