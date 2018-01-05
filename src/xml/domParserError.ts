export function getParserError(doc: Document) {
    // Firefox
    if (doc.documentElement.tagName === 'parsererror' &&
        doc.documentElement.namespaceURI === 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
        return doc.documentElement;
    }

    // Chrome, Safari
    if ((doc.documentElement.tagName === 'xml' || doc.documentElement.tagName === 'html') &&
        doc.documentElement.childNodes &&
        doc.documentElement.childNodes.length > 0 &&
        doc.documentElement.childNodes[0].nodeName === 'parsererror') {
        return doc.documentElement.childNodes[0];
    }

    // PhantomJS
    if (doc.documentElement.tagName === 'html' &&
        doc.documentElement.childNodes &&
        doc.documentElement.childNodes.length > 0 &&
        doc.documentElement.childNodes[0].nodeName === 'body' &&
        doc.documentElement.childNodes[0].childNodes &&
        doc.documentElement.childNodes[0].childNodes.length &&
        doc.documentElement.childNodes[0].childNodes[0].nodeName === 'parsererror') {
        return doc.documentElement.childNodes[0].childNodes[0];
    }
    return null;
};
