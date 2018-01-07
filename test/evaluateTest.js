const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const XMLFeatures = require('../lib/common-xml-features').default;

describe('xpath', () => {
  let xmlDoc;
  before(done => {
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

    let dom = new XMLFeatures.DOMParser();
    xmlDoc = dom.parseFromString(xmlString, 'text/xmlString');
    done();
  });

  it('xmldom evaluate ANY_TYPE', (done) => {
    var personResult = xmlDoc.evaluate('//person', xmlDoc, null, XMLFeatures.XPathResult.ANY_TYPE, null);
    let person;
    while (person = personResult.iterateNext()) {
    }
    done();
  });

  it('xmldom evaluate ORDERED_NODE_SNAPSHOT_TYPE', (done) => {
    var personResult = xmlDoc.evaluate('//person', xmlDoc, null, XMLFeatures.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    let person;
    for (let i = 0, len = personResult.snapshotLength; i < len; ++i) {
      person = personResult.snapshotItem(i);
    }
    done();
  });

  it('xmldom evaluate xFIRST_ORDERED_NODE_TYPE', (done) => {
    var personResult = xmlDoc.evaluate('//person', xmlDoc, null, XMLFeatures.XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    let person = personResult.singleNodeValue;
    done();
  });
});

describe('xpath with namespace', () => {
  let xmlDoc;
  before(done => {
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_using_XPath_in_JavaScript
    let xmlString =
      '<?xmlString version="1.0"?>' +
      '<people xmlns:xul = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" >' +
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

    let dom = new XMLFeatures.DOMParser();
    xmlDoc = dom.parseFromString(xmlString, 'text/xmlString');
    done();
  });
  it('xmldom evaluate ANY_TYPE', (done) => {
    done();
  });
});

    // it('xmldom evaluate NS xml without NSResolver failed', (done) => {
  //   let dom = new XMLFeatures.DOMParser();
  //   let xmlDoc = dom.parseFromString(xmlNSString, 'text/xmlString');
  //   var personResult = xmlDoc.evaluate('//person', xmlDoc, null, XMLFeatures.XPathResult.ANY_TYPE, null );
  //   let person;
  //   while (person = personResult.iterateNext()) {
  //   }
  //   done();
  // });
  // it('xmldom evaluate NS xml with NSResolver succeeded', (done) => {
  //   let dom = new XMLFeatures.DOMParser();
  //   let xmlDoc = dom.parseFromString(xmlNSString, 'text/xmlString');
  //   var nsResolver = xmlDoc.createNSResolver( xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
  //   var personResult = xmlDoc.evaluate('//person', xmlDoc, nsResolver, XMLFeatures.XPathResult.ANY_TYPE, null );
  //   let person;
  //   while (person = personResult.iterateNext()) {
  //   }
  //   done();
  // });
