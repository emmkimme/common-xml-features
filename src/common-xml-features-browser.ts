export { getParserError } from './xml/domParsererror';

const windowLocal: any = window;
export const DOMParser = windowLocal.DOMParser;
export const XMLSerializer = windowLocal.XMLSerializer;

const documentLocal: any = document;
export const domImplementation = documentLocal.implementation;

export const XPathResult = windowLocal.XPathResult;
export const XPathExpression = windowLocal.XPathExpression;
export const XPathNSResolver = windowLocal.XPathNSResolver;
// XMLFeaturesWrapper.XPathEvaluator = windowLocal.XPathEvaluator;

