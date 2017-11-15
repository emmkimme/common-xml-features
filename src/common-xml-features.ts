import { XMLFeaturesWrapper } from './xml/xmlFeatures';
import { XMLSerializerFixed } from './xml/xmlSerializer'

let localXMLFeatures: XMLFeaturesWrapper = {};

try {
    let shouldInstall_xpath = true;
    let shouldInstall_xmldom = true;
    try {
        if (typeof window === 'object') {
            const windowLocal: any = window;
            if (windowLocal.XMLSerializer && windowLocal.DOMParser && document.implementation) {
                localXMLFeatures.DOMParser = windowLocal.DOMParser;
                localXMLFeatures.XMLSerializer = windowLocal.XMLSerializer;
                localXMLFeatures.DOMImplementation = document.implementation;
                shouldInstall_xmldom = false;
            }

            if (document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('XPath', null)) {
                localXMLFeatures.XPathResult = windowLocal.XPathResult;
                localXMLFeatures.Evaluate = (doc, expression, contextNode, resolver, type, result) => {
                    return doc.evaluate(expression, contextNode, resolver, type, result);
                };
                shouldInstall_xpath = false;
            }
        }
    }
    catch (e) {
    }

    if (shouldInstall_xmldom) {
        const xmldom = require('xmldom');
        // class xmldomDOMParser extends xmldom.DOMParser {
        //     constructor() {
        //         super({ locator:{},
        //                 errorHandler:{error:callback,fatalError:callback}
        //         })
        // };

        localXMLFeatures.DOMParser = xmldom.DOMParser;
        // localXMLFeatures.XMLSerializer = xmldom.XMLSerializer;
        localXMLFeatures.XMLSerializer = XMLSerializerFixed;
        localXMLFeatures.DOMImplementation = new xmldom.DOMImplementation();
    }
    if (shouldInstall_xpath) {
        const xpath = require('xpath');
        localXMLFeatures.XPathResult = xpath.XPathResult;
        localXMLFeatures.Evaluate = (doc: Document, expression: string, contextNode: Node, resolver: XPathNSResolver | null, type: number, result: XPathResult | null): XPathResult => {
            contextNode = contextNode || doc;
            return xpath.evaluate(expression, contextNode, resolver, type, result);
        };
    }
}
catch (e) {
}

let XMLFeatures = localXMLFeatures;

export default XMLFeatures;
