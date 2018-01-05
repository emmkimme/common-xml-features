export interface XPathEvaluate {
    (document: Document, expression: string, contextNode: Node, resolver: XPathNSResolver | null, type: number, result: XPathResult | null): XPathResult;
}

export interface XMLFeaturesWrapper {
    DOMImplementation?: DOMImplementation;

    DOMParser?: {
        prototype: DOMParser;
        new (): DOMParser;
    };

    XMLSerializer?: {
        prototype: XMLSerializer;
        new (): XMLSerializer;
    };

    XPathResult?: XPathResult;
    XPathExpression?: XPathExpression;
    XPathNSResolver?: XPathNSResolver;
}