const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const XMLFeatures = require('../lib/common-xml-features').default;

// see https://www.w3schools.com/xml/note_error.xml
let xmlString = 
'<?xml version="1.0" encoding="UTF-8"?>' +
'<note>' +
'  <to>Tove</to>' +
'  <from>Jani</Ffrom>' +
'  <heading>Reminder</heading>' +
"  <body>Don't forget me this weekend!</body>" +
'</note>';

describe('DOMParser', () => {
  it('xml error', (done) => {
    let dom = new XMLFeatures.DOMParser();
    let xmlDoc = dom.parseFromString(xmlString, 'text/xml');
    let xmlSerializer = new XMLFeatures.XMLSerializer()
    console.log(xmlSerializer.serializeToString(xmlDoc));
    expect(xmlDoc.documentElement.tagName === 'parsererror');
    done();
  });
});

