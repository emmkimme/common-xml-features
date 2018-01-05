import { XMLFeaturesWrapper } from './xml/xmlFeatures';
import { getParserError } from './xml/domParsererror';

let localXMLFeatures: any = {};

const windowLocal: any = window;
localXMLFeatures.DOMParser = windowLocal.DOMParser;
localXMLFeatures.XMLSerializer = windowLocal.XMLSerializer;
localXMLFeatures.DOMImplementation = document.implementation;

localXMLFeatures.XPathResult = windowLocal.XPathResult;
localXMLFeatures.XPathExpression = windowLocal.XPathExpression;
localXMLFeatures.XPathNSResolver = windowLocal.XPathNSResolver;

localXMLFeatures.getParserError = getParserError;

export default localXMLFeatures as XMLFeaturesWrapper;
