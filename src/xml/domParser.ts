const xmldom = require('xmldom');

/** @internal */
interface DOMParserError {
    locator?: any;
    message: string;
    level: string;
}

/** @internal */
export class DOMParserFixed implements DOMParser {
    private _domParser: DOMParser; 
    private _domParserError: DOMParserError;
    
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
                let msg = error; // `[xmldom warning]\t${error}, ${DOMParserFixed._locator(domOptions.locator)}`;
                if (this._domParserError == null) {
                    this._domParserError = { level: "warning", message: error, locator: domOptions.locator };
                }
                throw msg;
            },
            error: (error: string) => {
                let msg = error; // `[xmldom error]\t${error}, ${DOMParserFixed._locator(domOptions.locator)}`;
                if (this._domParserError == null) {
                    this._domParserError = { level: "error", message: error, locator: domOptions.locator };
                }
                throw msg;
            },
            fatalError: (error: string) => {
                let msg = error; // `[xmldom fatalError]\t${error}, ${DOMParserFixed._locator(domOptions.locator)}`;
                if (this._domParserError == null) {
                    this._domParserError = { level: "fatalError", message: error, locator: domOptions.locator };
                }
                throw msg;
            }
        };
        this._domParser = new xmldom.DOMParser(domOptions);
    }

    parseFromString(source: string, mimeType: string): Document {
        this._domParserError = null;
        try {
            return this._domParser.parseFromString(source, mimeType);
        }
        catch(err) {
            if (this._domParserError == null) {
                this._domParserError = { level: "exception", message: err };
            }
            return DOMParserFixed._createParseErrorDoc(this._domParserError, source);
        }
    }

// <parsererror xmlns="http://www.mozilla.org/newlayout/xml/parsererror.xml">
// (error description)
// <sourcetext>(a snippet of the source XML)</sourcetext>
// </parsererror>
    private static _createParseErrorDoc(domParserError: DOMParserError, source: string): Document {
        let description = domParserError.message;
        let index0 = description.indexOf(']\t');
        if (index0 >= 0) {
            let index1 = description.indexOf('\n@');
            if (index1 >= index0) {
                description = description.substr(index0 + 2, index1 - index0 - 3);
                description = `${description} at line ${domParserError.locator.lineNumber}, column ${domParserError.locator.columnNumber}`;
            }
        }
        let domImplementation = new xmldom.DOMImplementation();
        let xmlDoc = domImplementation.createDocument(null, null, null);
        let parseErrorElt = xmlDoc.createElement('parsererror');
        parseErrorElt.textContent = description;
        xmlDoc.appendChild(parseErrorElt);

        if (domParserError.locator && source && source.length) {
            let line = 1;
            let index0 = 0;
            let index1 = source.indexOf('\n', index0);
            while ((index1 >= 0) && (line > domParserError.locator.lineNumber)) {
                index0 = index1 + 1;
                index1 = source.indexOf('\n', index0);
            }
            let sourcetTextElt = xmlDoc.createElement('sourcetext');
            index0 += domParserError.locator.columnNumber;
            if (index1 < 0) {
                index1 = index0 + 20;
            }
            sourcetTextElt.textContent = source.substr(index0, index1 - index0);
            parseErrorElt.appendChild(sourcetTextElt);
        }
        return xmlDoc;
    }
}

