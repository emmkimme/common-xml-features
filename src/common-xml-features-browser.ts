export { getParserError } from './xml/domParsererror';

let DOMParser: any;
let XMLSerializer: any;

let DOMException: any;
let Node: any;

let domImplementation: DOMImplementation;

let XPathResult: any;
let XPathExpression: any;
let XPathNSResolver: any;

function InitializeAliases() {
    DOMParser = window.DOMParser;
    XMLSerializer = window.XMLSerializer;

    DOMException = window.DOMException;
    Node = window.Node;

    domImplementation = window.document.implementation;

    XPathResult = window.XPathResult;
    XPathExpression = window.XPathExpression;
    XPathNSResolver = (window as any).XPathNSResolver;
    // XPathEvaluator = window.XPathEvaluator;
}

// After a load, we may have to refresh initializations (happen in Electron preload in sandbox)
window.addEventListener('load', () => {
    InitializeAliases();
});
InitializeAliases();


export { 
    DOMParser,
    XMLSerializer,
    DOMException,
    Node,
    domImplementation,
    XPathResult,
    XPathExpression,
    XPathNSResolver
};