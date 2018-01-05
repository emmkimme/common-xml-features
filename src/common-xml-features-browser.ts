import { XMLFeaturesWrapper } from './xml/xmlFeatures';

let localXMLFeatures: XMLFeaturesWrapper = {};

const windowLocal: any = window;
localXMLFeatures.DOMParser = windowLocal.DOMParser;
localXMLFeatures.XMLSerializer = windowLocal.XMLSerializer;
localXMLFeatures.DOMImplementation = document.implementation;

localXMLFeatures.XPathResult = windowLocal.XPathResult;
localXMLFeatures.XPathExpression = windowLocal.XPathExpression;
localXMLFeatures.XPathNSResolver = windowLocal.XPathNSResolver;
let XMLFeatures = localXMLFeatures;

export default XMLFeatures;
