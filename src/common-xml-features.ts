import { XMLFeaturesWrapper } from './xml/xmlFeatures';
import { DOMParserFixed } from './xml/domParser';
import { getParserError } from './xml/domParsererror';

const xmldom = require('./xmldom/dom-parser');
XMLFeaturesWrapper.DOMParser = DOMParserFixed;
XMLFeaturesWrapper.XMLSerializer = xmldom.XMLSerializer;
XMLFeaturesWrapper.domImplementation = new xmldom.DOMImplementation();

const xpath = require('./xpath/xpath');
XMLFeaturesWrapper.XPathResult = xpath.XPathResult;
XMLFeaturesWrapper.XPathExpression = xpath.XPathExpression;
XMLFeaturesWrapper.XPathNSResolver = xpath.XPathNSResolver;
// XMLFeaturesWrapper.XPathEvaluator = xpath.XPath;

XMLFeaturesWrapper.getParserError = getParserError;

// Inject evaluate and other XPath functions
{
    let domImplementation = new xmldom.DOMImplementation();
    let xmlDoc = domImplementation.createDocument(null, null, null);
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

export default XMLFeaturesWrapper;
