import { XMLFeaturesWrapper } from './xml/xmlFeatures';
import { XMLSerializerFixed } from './xml/xmlSerializer'
import { DOMParserFixed } from './xml/domParser';
import { getParserError } from './xml/domParsererror';

let localXMLFeatures: any = {};

const xmldom = require('xmldom');
localXMLFeatures.DOMParser = DOMParserFixed;
localXMLFeatures.XMLSerializer = XMLSerializerFixed;
localXMLFeatures.DOMImplementation = new xmldom.DOMImplementation();

const xpath = require('xpath');
localXMLFeatures.XPathResult = xpath.XPathResult;
localXMLFeatures.XPathExpression = xpath.XPathExpression;
localXMLFeatures.XPathNSResolver = xpath.XPathNSResolver;

localXMLFeatures.getParserError = getParserError;

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

export default localXMLFeatures as XMLFeaturesWrapper;
