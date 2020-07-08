export { getParserError } from './xml/domParsererror';

const windowLocal: any = window;
export const DOMParser: DOMParser = windowLocal.DOMParser;
export const XMLSerializer: XMLSerializer = windowLocal.XMLSerializer;

export const DOMException: DOMException = windowLocal.DOMException;
export const Node: Node = windowLocal.Node;

const documentLocal: any = document;
export const domImplementation: DOMImplementation = documentLocal.implementation;

export const XPathResult: XPathResult = windowLocal.XPathResult;
export const XPathExpression: XPathExpression = windowLocal.XPathExpression;
export const XPathNSResolver: XPathNSResolver = windowLocal.XPathNSResolver;
// XMLFeaturesWrapper.XPathEvaluator = windowLocal.XPathEvaluator;

