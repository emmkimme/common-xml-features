import { XMLFeaturesWrapper } from './xml/xmlFeatures';
import { getParserError } from './xml/domParsererror';

const windowLocal: any = window;
XMLFeaturesWrapper.DOMParser = windowLocal.DOMParser;
XMLFeaturesWrapper.XMLSerializer = windowLocal.XMLSerializer;
XMLFeaturesWrapper.DOMImplementation = windowLocal.DOMImplementation;

XMLFeaturesWrapper.XPathResult = windowLocal.XPathResult;
XMLFeaturesWrapper.XPathExpression = windowLocal.XPathExpression;
XMLFeaturesWrapper.XPathNSResolver = windowLocal.XPathNSResolver;
// XMLFeaturesWrapper.XPathEvaluator = windowLocal.XPathEvaluator;

XMLFeaturesWrapper.getParserError = getParserError;

export default XMLFeaturesWrapper;
