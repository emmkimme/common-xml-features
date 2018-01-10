//import * as XMLInterfaces from './common-xml-interfaces';

export { getParserError } from './xml/domParsererror';

const XMLSerializerClass: XMLSerializer = require('./xmldom/dom').XMLSerializer;
export const XMLSerializer = XMLSerializerClass;

import { DOMParserFixed } from './xml/domParser';
export const DOMParser = DOMParserFixed;
// export let DOMParser = require('./xmldom/dom-parser');

const DOMImplementationClass = require('./xmldom/dom').DOMImplementation;
export const domImplementation: DOMImplementation = new DOMImplementationClass();

const XPathResultClass: XPathResult = require('./xpath/xpath').XPathResult;
export const XPathResult = XPathResultClass;

const XPathExpressionClass: XPathExpression = require('./xpath/xpath').XPathExpression;
export const XPathExpression = XPathExpressionClass;

const XPathNSResolverClass: XPathNSResolver = require('./xpath/xpath').XPathNSResolver;
export const XPathNSResolver = XPathNSResolverClass;

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

