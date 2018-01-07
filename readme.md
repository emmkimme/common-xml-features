# Introduction
When working on Electron, you may have the same code executed in the renderer process and in the master/node process. 

It could be an issue if you have to manage XML : 
- Which XML libraries to use in a node process ? 
- How code could be the same in both contexts (renderer, node) ? 
- Impact of the XML libraries in the size of the browserify'ied files ?

Many browser supports natively XML features like DOMParser, XMLSerializer,... it would be a shame to not use Chrome's implementations when hosted in a renderer process.

# Purposes
Purposes of this package are :
- whatever the context, provide a common API for accessing XM features
- when loaded in a node context 
    - uses [xmldom](https://www.npmjs.com/package/xmldom) and [xpath](https://www.npmjs.com/package/xpath) packages
    - fix XMLSerializer issue of xmldom ('>' is not escaped !) 
    - generates a standard <parsererror> document when xmldom meets an issue  ([MDN DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser))
    - enhances xmldom Document interface with XPath functions : [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate), [createExpression](https://developer.mozilla.org/en-US/docs/Web/API/Document/createExpression), [createNSResolver](https://developer.mozilla.org/en-US/docs/Web/API/Document/createNSResolver)
- when loaded in a renderer context
    - fallbacks to native implementation and prevent xmldom and xmlpath to be inlined by browserify

# API
You have to use factory functions to be redirected to the right objects.
- XMLFeatures.DOMImplementation
- XMLFeatures.DOMParser
- XMLFeatures.XMLSerializer
Interface of these objects are supposed to be equivalent.

Some types are exported as well
- XMLFeatures.XPathResult
- XMLFeatures.XPathExpression
- XMLFeatures.XPathNSResolver

An helper function for checking if the document is a <parsererror> content
- XMLFeatures.getParserError


# Samples
```ts
import XMLFeatures from 'common-xml-features';

let xmlDoc = new XMLFeatures.DOMParser().parseFromString(result, 'text/xml');
if (XMLFeatures.getParserError(xmlDoc)) {
    // we are in trouble !
}

let entityResult = xmlDoc.evaluate('//html//body//iframe//@src', null, null, XMLFeatures.XPathResult.FIRST_ORDERED_NODE_TYPE, null);
...
let xmlDoc = XMLFeatures.DOMImplementation.createDocument(null, null, null);
let xmlSerializer = new XMLFeatures.XMLSerializer();
let transferData = xmlSerializer.serializeToString(xmlDoc);
```

# Next
1. Support another browsers : IE, Edge, Safari, ...
2. Fork xpath in order to fix wrong xpath typescript definition file.
3. Fork xmldom in order to fix xmlserializer and enhance error handling.