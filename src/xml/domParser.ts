const xmldom = require('xmldom');

/** @internal */
export class DOMParserFixed implements DOMParser {
    private _DOMParser: DOMParser; 
    private _docParseError: Document;
    
    constructor() {
        let domOptions: any = {};
        /**
        * locator is always need for error position info
        */
        domOptions.locator = {};
        
        /**
         * you can override the errorHandler for xml parser
         * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
         */
        domOptions.errorHandler = {
            warning: (error: string) => {
                let msg = `[xmldom warning]\t${error}, ${DOMParserFixed._locator(domOptions.locator)}`;
                console.error(msg);
                this._docParseError = DOMParserFixed._createParseErrorDoc(msg);
            },
            error: (error: string) => {
                let msg = `[xmldom error]\t${error}, ${DOMParserFixed._locator(domOptions.locator)}`;
                console.error(msg);
                this._docParseError = DOMParserFixed._createParseErrorDoc(msg);
            },
            fatalError: (error: string) => {
                let msg = `[xmldom fatalError]\t${error}, ${DOMParserFixed._locator(domOptions.locator)}`;
                console.error(msg);
                this._docParseError = DOMParserFixed._createParseErrorDoc(msg);
            }
        };
        this._DOMParser = new xmldom.DOMParser(domOptions);
    }

    parseFromString(source: string, mimeType: string): Document {
        this._docParseError = null;
        let doc = this._DOMParser.parseFromString(source, mimeType);
        if (this._docParseError) {
            return this._docParseError;
        }
        return doc;
    }

    private static _locator(l: any): string {
        if (l) {
            return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']'
        }
        return '';
    }

// <parsererror xmlns="http://www.mozilla.org/newlayout/xml/parsererror.xml">
// (error description)
// <sourcetext>(a snippet of the source XML)</sourcetext>
// </parsererror>

    private static _createParseErrorDoc(error: string): Document {
        let domImplementation = new xmldom.DOMImplementation();
        let xmlDoc = domImplementation.createDocument(null, null, null);
        let rootNode = xmlDoc.createElement('parsererror');
        xmlDoc.appendChild(rootNode);
        return xmlDoc;
    }
}

