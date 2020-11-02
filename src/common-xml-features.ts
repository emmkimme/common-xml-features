//import * as XMLInterfaces from './common-xml-interfaces';

export { getParserError } from './xml/domParsererror';

// XML
let DOMParser: any;
let XMLSerializer: any;

let DOMException: any;
let Node: any;

let domImplementation: DOMImplementation;

// XPath
let XPathResult: any;
let XPathExpression: any;
let XPathNSResolver: any;

function InitializeAliases() {
    const xmldomParser = require('./xml/domParser');
    DOMParser/*: DOMParser*/ = xmldomParser.DOMParserFixed;

    const xmldom = require('./xmldom/dom');
    XMLSerializer/*: XMLSerializer*/ = xmldom.XMLSerializer;

    DOMException = xmldom.DOMException as DOMException;
    Node = xmldom.Node as Node;

    const DOMImplementation = xmldom.DOMImplementation;
    domImplementation = new DOMImplementation() as DOMImplementation;

    const xpath = require('./xpath/xpath');

    XPathResult = xpath.XPathResult as XPathResult;
    XPathExpression = xpath.XPathExpression as XPathExpression;
    XPathNSResolver =xpath.XPathNSResolver as XPathNSResolver;

    // XMLFeaturesWrapper.XPathEvaluator = xpath.XPath;

    // Inject evaluate and other XPath functions
    const xmlDoc = domImplementation.createDocument(null, null, null);
    let xmldocProto = Object.getPrototypeOf(xmlDoc);
    xmldocProto['evaluate'] = function (expression: string, contextNode: Node, resolver: XPathNSResolver | null, type: number, result: XPathResult | null): XPathResult {
        contextNode = contextNode || this;
        return xpath.evaluate(expression, contextNode, resolver, type, result);
    };
    xmldocProto['createNSResolver'] = function (nodeResolver: Node): XPathNSResolver {
        return xpath.createNSResolver(nodeResolver);
    };
    xmldocProto['createExpression'] = function (expression: string, resolver: XPathNSResolver): XPathExpression {
        return xpath.createExpression(expression, resolver);
    };
}

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