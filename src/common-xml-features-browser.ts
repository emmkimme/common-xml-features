export { getParserError } from './xml/domParsererror';

const windowLocal: any = window;
export const DOMParser: any = windowLocal.DOMParser;
export const XMLSerializer: any = windowLocal.XMLSerializer;

export const Element: any = windowLocal.Element;
export const Node: any = windowLocal.Node;

const documentLocal: any = document;
export const domImplementation: DOMImplementation = documentLocal.implementation;

export const XPathResult: any = windowLocal.XPathResult;
export const XPathExpression: any = windowLocal.XPathExpression;
export const XPathNSResolver: any = windowLocal.XPathNSResolver;
// XMLFeaturesWrapper.XPathEvaluator = windowLocal.XPathEvaluator;

