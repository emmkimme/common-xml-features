//import * as XMLInterfaces from './common-xml-interfaces';

export { getParserError } from './xml/domParsererror';

// XML
export const XMLSerializer = require('./xmldom/dom').XMLSerializer as XMLSerializer;

import { DOMParserFixed } from './xml/domParser';
export const DOMParser: DOMParser = DOMParserFixed as any; // a bit ugly

const DOMImplementation = require('./xmldom/dom').DOMImplementation;
export const domImplementation = new DOMImplementation() as DOMImplementation;

export const DOMException = require('./xmldom/dom').DOMException as DOMException;
export const Node = require('./xmldom/dom').Node as Node;

// XPath
export const XPathResult = require('./xpath/xpath').XPathResult as XPathResult;
export const XPathExpression = require('./xpath/xpath').XPathExpression as XPathExpression;
export const XPathNSResolver = require('./xpath/xpath').XPathNSResolver as XPathNSResolver;

// XMLFeaturesWrapper.XPathEvaluator = xpath.XPath;

// Inject evaluate and other XPath functions
{
    const xpath = require('./xpath/xpath');
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

