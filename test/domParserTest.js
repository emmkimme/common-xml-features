const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const XMLFeatures = require('../lib/common-xml-features').default;

// see https://www.w3schools.com/xml/note_error.xml
let xmlSingleLine = 
'<?xml version="1.0" encoding="UTF-8"?>' +
'<note>' +
'  <to>Tove</to>' +
'  <from>Jani</Ffrom>' +
'  <heading>Reminder</heading>' +
"  <body>Don't forget me this weekend!</body>" +
'</note>';

let xmlLinuxMultiLinesString = 
'<?xml version="1.0" encoding="UTF-8"?>\n' +
'<note>\n' +
'  <to>Tove</to>\n' +
'  <from>Jani</Ffrom>\n' +
'  <heading>Reminder</heading>\n' +
"  <body>Don't forget me this weekend!</body>\n" +
'</note>';

let xmlWindowsMultiLinesString = 
'<?xml version="1.0" encoding="UTF-8"?>\r\n' +
'<note>\r\n' +
'  <to>Tove</to>\r\n' +
'  <from>Jani</Ffrom>\r\n' +
'  <heading>Reminder</heading>\r\n' +
"  <body>Don't forget me this weekend!</body>\r\n" +
'</note>';

describe('DOMParser', () => {
  it('xml error single line content', (done) => {
    let dom = new XMLFeatures.DOMParser();
    let xmlDoc = dom.parseFromString(xmlSingleLine, 'text/xml');
    let xmlSerializer = new XMLFeatures.XMLSerializer()
    console.log(xmlSerializer.serializeToString(xmlDoc));
    expect(xmlDoc.documentElement.tagName === 'parsererror');
    expect(XMLFeatures.getParserError(xmlDoc) != null);
    done();
  });
  it('xml error Unix lines content', (done) => {
    let dom = new XMLFeatures.DOMParser();
    let xmlDoc = dom.parseFromString(xmlLinuxMultiLinesString, 'text/xml');
    let xmlSerializer = new XMLFeatures.XMLSerializer()
    console.log(xmlSerializer.serializeToString(xmlDoc));
    expect(xmlDoc.documentElement.tagName === 'parsererror');
    expect(XMLFeatures.getParserError(xmlDoc) != null);
    done();
  });
  it('xml error Windows lines content', (done) => {
    let dom = new XMLFeatures.DOMParser();
    let xmlDoc = dom.parseFromString(xmlWindowsMultiLinesString, 'text/xml');
    let xmlSerializer = new XMLFeatures.XMLSerializer()
    console.log(xmlSerializer.serializeToString(xmlDoc));
    expect(xmlDoc.documentElement.tagName === 'parsererror');
    expect(XMLFeatures.getParserError(xmlDoc) != null);
    done();
  });
});

