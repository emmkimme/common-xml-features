export { getParserError } from './xml/domParsererror';

export const XMLSerializer = require('./xmldom/dom').XMLSerializer ;
export const DOMParser = require('./xml/domParser').DOMParserFixed;
// export let DOMParser = require('./xmldom/dom-parser');

const DOMImplementation = require('./xmldom/dom').DOMImplementation;
export const domImplementation = new DOMImplementation();

export const XPathResult = require('./xpath/xpath').XPathResult;
export const XPathExpression = require('./xpath/xpath').XPathExpression;
export const XPathNSResolver = require('./xpath/xpath').XPathNSResolver;

// XMLFeaturesWrapper.XPathEvaluator = xpath.XPath;

// Inject evaluate and other XPath functions
{
    const xpath = require('./xpath/xpath');
    const domImplementation = new DOMImplementation();
    const xmlDoc = domImplementation.createDocument(null, null, null);
    let xmldocProto = Object.getPrototypeOf(xmlDoc);
    xmldocProto['evaluate'] = function(expression: string, contextNode: Node, resolver: XPathNSResolver | null, type: number, result: XPathResult | null): XPathResult {
        contextNode = contextNode || this;
        return xpath.evaluate(expression, contextNode, resolver, type, result);
    };
    xmldocProto['createNSResolver'] = function(nodeResolver: Node): XPathNSResolver {
        return xpath.createNSResolver(nodeResolver);
    };
    xmldocProto['createExpression'] = function(expression: string, resolver: XPathNSResolver): XPathExpression {
        return xpath.createExpression(expression, resolver);
    };
}

