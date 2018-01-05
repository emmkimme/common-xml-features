const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const XMLFeatures = require('../lib/common-xml-features').default;

// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_using_XPath_in_JavaScript
let xmlString = 
'<?xmlString version="1.0"?>' + 
'<people>' + 
'  <person>' + 
'	<name first="george" last="bush" />' + 
'	<address street="1600 pennsylvania avenue" city="washington" country="usa"/>' + 
'	<phoneNumber>202-456-1111</phoneNumber>' + 
'  </person>' + 
'  <person>' + 
'	<name first="tony" last="blair" />' + 
'	<address street="10 downing street" city="london" country="uk"/>' + 
'	<phoneNumber>020 7925 0918</phoneNumber>' + 
'  </person>' + 
'</people>';

describe('xpath', () => {
  it('xmldom evaluate', (done) => {
    let dom = new XMLFeatures.DOMParser();
    let xmlDoc = dom.parseFromString(xmlString, 'text/xmlString');
    var personIterator = xmlDoc.evaluate('//person', xmlDoc, null, XMLFeatures.XPathResult.ANY_TYPE, null );
    let person;
    while (person = personIterator.iterateNext()) {
    }
    done();
  });
});

