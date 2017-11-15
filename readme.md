# Introduction
When working on Electron, you may have the same code executed in the renderer process and in the master/node process. 

It could be an issue if you have to manage XML : 
- Which XML libraries to use in a node process ? 
- How our code could be compliant in the both contexts (renderer, node) ? 
- Impact of the XML libraries in the size of the browserify'ied files ?

Many browser supports natively XML features like DOMParser, XMLSerializer,... it would be a shame to not use Chrome's implementations when hosted in a renderer process.

# Purposes
Purposes of this package are :
- whatever the context, provide a common API for accessing XM features
- when loaded in a node context uses [xmldom](https://www.npmjs.com/package/xmldom) and [xpath](https://www.npmjs.com/package/xpath) packages
- when loaded in a node context fix XMLSerializer issue of xmldom ('>' is not escaped !) 
- when loaded in a renderer context fallbacks to native implementation and prevent xmldom and xmlpath to be inlined by browserify

# API
You have to use factory functions to redirect to the right objects.
- XMLFeatures.DOMImplementation
- XMLFeatures.DOMParser
- XMLFeatures.XMLSerializer
Interface of these objects are supposed to be equivalent.

Some types are exported as well
- XMLFeatures.XPathResult

and finally the function *evaluate* is overriden (https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate)
- XMLFeatures.Evaluate(document, xpathExpression, contextNode, namespaceResolver, resultType, result)

# Samples
```ts
import XMLFeatures from 'common-xml-features';

let xmlDoc = new XMLFeatures.DOMParser().parseFromString(result, 'text/xml');
let entityResult = XMLFeatures.Evaluate(xmlDoc, '//html//body//iframe//@src', null, null, XMLFeatures.XPathResult.FIRST_ORDERED_NODE_TYPE, null);
...
let xmlDoc = XMLFeatures.DOMImplementation.createDocument(null, null, null);
let xmlSerializer = new XMLFeatures.XMLSerializer();
let transferData = xmlSerializer.serializeToString(xmlDoc);
```

# Next
1.
When xmldom meets an issue it does not generated an error document ([MDN DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser))
```
<parsererror xmlns="http://www.mozilla.org/newlayout/xml/parsererror.xml">
(error description)
<sourcetext>(a snippet of the source XML)</sourcetext>
</parsererror>
```

2.
Not sure XPathNSResolver is properly managed
- XMLFeatures.XPathNSResolver ?

3.
Support another browsers : IE, Edge, Safari, ...