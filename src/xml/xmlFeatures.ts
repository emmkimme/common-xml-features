// export interface XMLFeaturesWrapper {
//     DOMImplementation: {
//         prototype: DOMImplementation;
//         new(): DOMImplementation;
//     };
    
//     DOMParser: {
//         prototype: DOMParser;
//         new (): DOMParser;
//     };

//     XMLSerializer: {
//         prototype: XMLSerializer;
//         new (): XMLSerializer;
//     };

//     XPathResult: {
//         prototype: XPathResult;
//         new(): XPathResult;
//         readonly ANY_TYPEs: number;
//         readonly ANY_UNORDERED_NODE_TYPE: number;
//         readonly BOOLEAN_TYPE: number;
//         readonly FIRST_ORDERED_NODE_TYPE: number;
//         readonly NUMBER_TYPE: number;
//         readonly ORDERED_NODE_ITERATOR_TYPE: number;
//         readonly ORDERED_NODE_SNAPSHOT_TYPE: number;
//         readonly STRING_TYPE: number;
//         readonly UNORDERED_NODE_ITERATOR_TYPE: number;
//         readonly UNORDERED_NODE_SNAPSHOT_TYPE: number;
//     };

//     XPathExpression: {
//         prototype: XPathExpression;
//         new(): XPathExpression;
//     };    

//     XPathNSResolver: {
//         prototype: XPathNSResolver;
//         new(): XPathNSResolver;
//     }

//     getParserError(doc: Document): any;
// }

export namespace XMLFeaturesWrapper {
    export interface DOMImplementation {
        createDocument(namespaceURI: string | null, qualifiedName: string | null, doctype: DocumentType | null): Document;
        createDocumentType(qualifiedName: string, publicId: string, systemId: string): DocumentType;
        createHTMLDocument(title: string): Document;
        hasFeature(feature: string | null, version: string | null): boolean;
    }

    export var DOMImplementation: {
        prototype: DOMImplementation;
        new(): DOMImplementation;
    };

    export interface DOMParser {
        parseFromString(source: string, mimeType: string): Document;
    }

    export var DOMParser: {
        prototype: DOMParser;
        new(): DOMParser;
    };

    // export interface XPathEvaluator {
    //     createExpression(expression: string, resolver: XPathNSResolver): XPathExpression;
    //     createNSResolver(nodeResolver?: Node): XPathNSResolver;
    //     evaluate(expression: string, contextNode: Node, resolver: XPathNSResolver | null, type: number, result: XPathResult | null): XPathResult;
    // }
    
    // export var XPathEvaluator: {
    //     prototype: XPathEvaluator;
    //     new(): XPathEvaluator;
    // };
    
    export interface XMLSerializer {
        serializeToString(target: Node): string;
    }
    
    export var XMLSerializer: {
        prototype: XMLSerializer;
        new(): XMLSerializer;
    };
    
    export interface XPathEvaluator {
        createExpression(expression: string, resolver: XPathNSResolver): XPathExpression;
        createNSResolver(nodeResolver?: Node): XPathNSResolver;
        evaluate(expression: string, contextNode: Node, resolver: XPathNSResolver | null, type: number, result: XPathResult | null): XPathResult;
    }
    
    export var XPathEvaluator: {
        prototype: XPathEvaluator;
        new(): XPathEvaluator;
    };
    
    export interface XPathExpression {
        evaluate(contextNode: Node, type: number, result: XPathResult | null): XPathResult;
    }
    
    export var XPathExpression: {
        prototype: XPathExpression;
        new(): XPathExpression;
    };
    
    export interface XPathNSResolver {
        lookupNamespaceURI(prefix: string): string;
    }
    
    export var XPathNSResolver: {
        prototype: XPathNSResolver;
        new(): XPathNSResolver;
    };
    
    export interface XPathResult {
        readonly booleanValue: boolean;
        readonly invalidIteratorState: boolean;
        readonly numberValue: number;
        readonly resultType: number;
        readonly singleNodeValue: Node;
        readonly snapshotLength: number;
        readonly stringValue: string;
        iterateNext(): Node;
        snapshotItem(index: number): Node;
        readonly ANY_TYPE: number;
        readonly ANY_UNORDERED_NODE_TYPE: number;
        readonly BOOLEAN_TYPE: number;
        readonly FIRST_ORDERED_NODE_TYPE: number;
        readonly NUMBER_TYPE: number;
        readonly ORDERED_NODE_ITERATOR_TYPE: number;
        readonly ORDERED_NODE_SNAPSHOT_TYPE: number;
        readonly STRING_TYPE: number;
        readonly UNORDERED_NODE_ITERATOR_TYPE: number;
        readonly UNORDERED_NODE_SNAPSHOT_TYPE: number;
    }
    
    export var XPathResult: {
        prototype: XPathResult;
        new(): XPathResult;
        readonly ANY_TYPE: number;
        readonly ANY_UNORDERED_NODE_TYPE: number;
        readonly BOOLEAN_TYPE: number;
        readonly FIRST_ORDERED_NODE_TYPE: number;
        readonly NUMBER_TYPE: number;
        readonly ORDERED_NODE_ITERATOR_TYPE: number;
        readonly ORDERED_NODE_SNAPSHOT_TYPE: number;
        readonly STRING_TYPE: number;
        readonly UNORDERED_NODE_ITERATOR_TYPE: number;
        readonly UNORDERED_NODE_SNAPSHOT_TYPE: number;
    };

    export function getParserError(doc: Document): any {
    }
}