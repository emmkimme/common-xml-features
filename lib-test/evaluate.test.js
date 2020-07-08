"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XMLFeatures = require("..");
describe('xpath', () => {
    let xmlDoc;
    before(done => {
        let xmlString = '<?xmlString version="1.0"?>' +
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
        xmlDoc = dom.parseFromString(xmlString, 'text/xml');
        done();
    });
    it('xmldom evaluate ANY_TYPE', (done) => {
        var personResult = xmlDoc.evaluate('//person', xmlDoc, null, XMLFeatures.XPathResult.ANY_TYPE, null);
        let person;
        while (person = personResult.iterateNext()) {
        }
        person;
        done();
    });
    it('xmldom evaluate ORDERED_NODE_SNAPSHOT_TYPE', (done) => {
        var personResult = xmlDoc.evaluate('//person', xmlDoc, null, XMLFeatures.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        let person;
        for (let i = 0, len = personResult.snapshotLength; i < len; ++i) {
            person = personResult.snapshotItem(i);
        }
        person;
        done();
    });
    it('xmldom evaluate xFIRST_ORDERED_NODE_TYPE', (done) => {
        var personResult = xmlDoc.evaluate('//person', xmlDoc, null, XMLFeatures.XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        let person = personResult.singleNodeValue;
        person;
        done();
    });
});
describe('xpath with namespace', () => {
    describe('xml', () => {
        let xmlDoc;
        before(done => {
            let xmlString = '<?xmlString version="1.0"?>' +
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
            xmlDoc = dom.parseFromString(xmlString, 'text/xml');
            done();
        });
        it('xmldom evaluate ANY_TYPE', (done) => {
            var nsResolver = xmlDoc.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
            var personResult = xmlDoc.evaluate('//person', xmlDoc, nsResolver, XMLFeatures.XPathResult.ANY_TYPE, null);
            let person;
            while (person = personResult.iterateNext()) {
            }
            person;
            done();
        });
    });
    describe('html', () => {
        let xmlDoc;
        before(done => {
            let xmlString = '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<script type="text/javascript">function setParentContainerParams() { notFoundStatusCode = ""; notFoundMsg = ""; }</script>' +
                '<style> html, body { width: 100%; height: 100%; margin:0; padding:0; font-size:0; } </style>' +
                '<title>Eikon</title>' +
                '</head>' +
                '<body>' +
                '<!-- Technical Info -->' +
                '<!-- Served By: Eikon App Server -->' +
                '<!-- Machine Name: C372KCZDPUITK -->' +
                '<iframe name="AppFrame" src="/Apps/ElectronAppFrame/1.0.109/web/index.html" seamless  height="100%" width="100%" frameBorder="0"></iframe>' +
                '</body>' +
                '</html>';
            let dom = new XMLFeatures.DOMParser();
            xmlDoc = dom.parseFromString(xmlString, 'text/html');
            done();
        });
        it('xmldom evaluate ANY_TYPE', (done) => {
            let nsResolver = {
                lookupNamespaceURI: (prefix) => {
                    const ns = {
                        's': 'http://www.w3.org/1999/xhtml'
                    };
                    return ns[prefix] || null;
                }
            };
            let entityResult = xmlDoc.evaluate('//html//body//iframe//@src', xmlDoc, nsResolver, XMLFeatures.XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            if (entityResult.singleNodeValue && entityResult.singleNodeValue.nodeValue) {
            }
            done();
        });
    });
});
//# sourceMappingURL=evaluate.test.js.map