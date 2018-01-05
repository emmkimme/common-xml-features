import { XMLFeaturesWrapper } from './xml/xmlFeatures';
import { XMLSerializerFixed } from './xml/xmlSerializer'
import { DOMParserFixed } from './xml/domParser';

let localXMLFeatures: XMLFeaturesWrapper = {};

try {
    let shouldInstall_xmldom = true;
    try {
        if (typeof window === 'object') {
            const windowLocal: any = window;
            if (windowLocal.XMLSerializer && windowLocal.DOMParser && document.implementation) {
                localXMLFeatures.DOMParser = windowLocal.DOMParser;
                localXMLFeatures.XMLSerializer = windowLocal.XMLSerializer;
                localXMLFeatures.DOMImplementation = document.implementation;
                shouldInstall_xmldom = false;
            }

            if (document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('XPath', null)) {
                localXMLFeatures.XPathResult = windowLocal.XPathResult;
                localXMLFeatures.XPathExpression = windowLocal.XPathExpression;
                localXMLFeatures.XPathNSResolver = windowLocal.XPathNSResolver;

                const xpath = require('xpath');
                Document.prototype.evaluate = function(expression, contextNode, resolver, type, result) {
                    contextNode = contextNode || this;
                    return xpath.evaluate(expression, contextNode, resolver, type, result);
                };
                Document.prototype.createNSResolver = function(node: any) {
                    return xpath.createNSResolver(node);
                };
                Document.prototype.createExpression = function(xpathText: any, namespaceURLMapper: any) {
                    return xpath.createExpression(xpathText, namespaceURLMapper);
                };
            }
        }
    }
    catch (e) {
    }

    if (shouldInstall_xmldom) {
        const xmldom = require('xmldom');
        localXMLFeatures.DOMParser = DOMParserFixed;
        localXMLFeatures.XMLSerializer = XMLSerializerFixed;
        localXMLFeatures.DOMImplementation = new xmldom.DOMImplementation();

        const xpath = require('xpath');
        localXMLFeatures.XPathResult = xpath.XPathResult;
        localXMLFeatures.XPathExpression = xpath.XPathExpression;
        localXMLFeatures.XPathNSResolver = xpath.XPathNSResolver;

        // Inject evaluate
        let domImplementation = new xmldom.DOMImplementation();
        let xmlDoc = domImplementation.createDocument(null, null, null);
        let xmldocProto = Object.getPrototypeOf(xmlDoc);
        xmldocProto['evaluate'] = function(expression: any, contextNode: any, resolver: any, type: any, result: any) {
            contextNode = contextNode || this;
            return xpath.evaluate(expression, contextNode, resolver, type, result);
        };
        xmldocProto['createNSResolver'] = function(node: any) {
            return xpath.createNSResolver(node);
        };
        xmldocProto['createExpression'] = function(xpathText: any, namespaceURLMapper: any) {
            return xpath.createExpression(xpathText, namespaceURLMapper);
        };
    }
}
catch (e) {
}

let XMLFeatures = localXMLFeatures;

export default XMLFeatures;
