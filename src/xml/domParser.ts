const xmldom = require('../xmldom/dom-parser');

export class DOMParserFixed implements DOMParser {
    constructor() {
    }

    parseFromString(source: string, mimeType: string): Document {
        let domOptions: any = {
            /**
            * locator is always need for error position info
            */
            locator: {},
            
            /**
             * you can override the errorHandler for xml parser
             * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
             */
            errorHandler : {
                warning: function(error: string) {
                    // HTML is more permissive than XML, so we do not care of warnings
                    if (mimeType !== 'text/html') {
                        let msg = error; // `[xmldom warning]\t${error}, ${DOMParserFixed._locator(domOptions.locator)}`;
                        if (domOptions.error == null) {
                            domOptions.error = { level: "warning", message: error };
                        }
                        throw msg;
                    }
                },
                error: function(error: string) {
                    let msg = error; // `[xmldom error]\t${error}, ${DOMParserFixed._locator(domOptions.locator)}`;
                    if (domOptions.error == null) {
                        domOptions.error = { level: "error", message: error };
                    }
                    throw msg;
                },
                fatalError: function(error: string) {
                    let msg = error; // `[xmldom fatalError]\t${error}, ${DOMParserFixed._locator(domOptions.locator)}`;
                    if (domOptions.error == null) {
                        domOptions.error = { level: "fatalError", message: error };
                    }
                    throw msg;
                }
            }
        };
        let domParser: DOMParser = new xmldom.DOMParser(domOptions);
        try {
            return domParser.parseFromString(source, mimeType);
        }
        catch(err) {
            if (domOptions.error == null) {
                domOptions.error = { level: "exception", message: err };
            }
            return DOMParserFixed._createParseErrorDoc(domOptions, source);
        }
    }

// <parsererror xmlns="http://www.mozilla.org/newlayout/xml/parsererror.xml">
// (error description)
// <sourcetext>(a snippet of the source XML)</sourcetext>
// </parsererror>
    private static _createParseErrorDoc(domOptions: any, source: string): Document {
        let description = domOptions.error.message;
        let index0 = description.indexOf(']\t');
        if (index0 >= 0) {
            let index1 = description.indexOf('\n@');
            if (index1 >= index0) {
                description = description.substr(index0 + 2, index1 - index0 - 3);
                description = `${description} at line ${domOptions.locator.lineNumber}, column ${domOptions.locator.columnNumber}`;
            }
        }
        let domImplementation = new xmldom.DOMImplementation();
        let xmlDoc = domImplementation.createDocument(null, null, null);
        let parseErrorElt = xmlDoc.createElementNS('http://www.mozilla.org/newlayout/xml/parsererror.xml', 'parsererror');
        parseErrorElt.textContent = description;
        xmlDoc.appendChild(parseErrorElt);

        // Could be a pain for large xml !
        if (domOptions.locator && source && source.length) {
            let line = 1;
            let index0 = 0;
            let index1 = source.indexOf('\n', index0);
            while ((index1 >= 0) && (line < domOptions.locator.lineNumber)) {
                index0 = index1 + 1;
                index1 = source.indexOf('\n', index0);
                ++line;
            }
            let sourcetTextElt = xmlDoc.createElement('sourcetext');
            index0 += domOptions.locator.columnNumber;
            if (index1 < 0) {
                index1 = index0 + 20;
            }
            else if (source[index1 - 1] === '\r') {
                --index1;
            }
            sourcetTextElt.textContent = source.substr(index0, index1 - index0);
            parseErrorElt.appendChild(sourcetTextElt);
        }
        return xmlDoc;
    }
}

