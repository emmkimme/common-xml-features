import { XMLFeaturesWrapper } from './xml/xmlFeatures';

let localXMLFeatures: XMLFeaturesWrapper = {};

const windowLocal: any = window;
localXMLFeatures.DOMParser = windowLocal.DOMParser;
localXMLFeatures.XMLSerializer = windowLocal.XMLSerializer;
localXMLFeatures.DOMImplementation = document.implementation;

localXMLFeatures.XPathResult = windowLocal.XPathResult;
localXMLFeatures.Evaluate = (doc, expression, contextNode, resolver, type, result) => {
    return doc.evaluate(expression, contextNode, resolver, type, result);
};

let XMLFeatures = localXMLFeatures;

export default XMLFeatures;
