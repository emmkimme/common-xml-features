const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const XMLFeatures = require('../lib/common-xml-features').default;

// see https://www.w3schools.com/xml/note_error.xml
let docError = 
'<?xml version="1.0" encoding="UTF-8"?>' +
'<note>' +
'  <to>Tove</to>' +
'  <from>Jani</Ffrom>' +
'  <heading>Reminder</heading>' +
"  <body>Don't forget me this weekend!</body>" +
'</note>';

describe('DOMParser', function () {
  describe('error', function () {
    let dom = new XMLFeatures.DOMParser();
    let doc = dom.parseFromString(docError, 'text/xml');
    let xmlSerializer = new XMLFeatures.XMLSerializer()
    console.log(xmlSerializer.serializeToString(doc));
  });
});

