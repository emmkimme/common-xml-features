// import { assert } from 'chai';
import { expect } from 'chai';

import * as XMLFeatures from '../lib/common-xml-features';

describe('DOMParser', () => {
  describe('XML', () => {
    // see https://www.w3schools.com/xml/note_error.xml
    let xmlSingleLine =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<note>' +
      '  <to>Tove</to>' +
      '  <from>Jani</Ffrom>' +
      '  <heading>Reminder</heading>' +
      "  <body>Don't forget me this weekend!</body>" +
      '</note>';

    let xmlLinuxMultiLinesString =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<note>\n' +
      '  <to>Tove</to>\n' +
      '  <from>Jani</Ffrom>\n' +
      '  <heading>Reminder</heading>\n' +
      "  <body>Don't forget me this weekend!</body>\n" +
      '</note>';

    let xmlWindowsMultiLinesString =
      '<?xml version="1.0" encoding="UTF-8"?>\r\n' +
      '<note>\r\n' +
      '  <to>Tove</to>\r\n' +
      '  <from>Jani</Ffrom>\r\n' +
      '  <heading>Reminder</heading>\r\n' +
      "  <body>Don't forget me this weekend!</body>\r\n" +
      '</note>';

    it('xml error single line content', (done) => {
      let dom = new XMLFeatures.DOMParser();
      let xmlDoc = dom.parseFromString(xmlSingleLine, 'text/xml');
      let xmlSerializer = new XMLFeatures.XMLSerializer()
      console.log(xmlSerializer.serializeToString(xmlDoc));
      expect(xmlDoc.documentElement.tagName === 'parsererror');
      expect(XMLFeatures.getParserError(xmlDoc) != null);
      done();
    });
    it('xml error Unix lines content', (done) => {
      let dom = new XMLFeatures.DOMParser();
      let xmlDoc = dom.parseFromString(xmlLinuxMultiLinesString, 'text/xml');
      let xmlSerializer = new XMLFeatures.XMLSerializer()
      console.log(xmlSerializer.serializeToString(xmlDoc));
      expect(xmlDoc.documentElement.tagName === 'parsererror');
      expect(XMLFeatures.getParserError(xmlDoc) != null);
      done();
    });
    it('xml error Windows lines content', (done) => {
      let dom = new XMLFeatures.DOMParser();
      let xmlDoc = dom.parseFromString(xmlWindowsMultiLinesString, 'text/xml');
      let xmlSerializer = new XMLFeatures.XMLSerializer()
      console.log(xmlSerializer.serializeToString(xmlDoc));
      expect(xmlDoc.documentElement.tagName === 'parsererror');
      expect(XMLFeatures.getParserError(xmlDoc) != null);
      done();
    });
  });
  describe('XML', () => {
    let htmlAttributWithoutValue =
      '<p data-modal-target>Hover over me for an inline modal!</p>' +
      '<div data-modal-content data-modal-align="right" data-modal-trigger="hover" data-modal-offset="10px">' +
      '</div>';

    let htmlEmptyTag =
      '<!DOCTYPE html><html><body><p>' +
      'To break lines<br>in a text,<br>use the br element.' +
      '</p></body></html>';

    it('html no error when parses an attribut without value', (done) => {
      let dom = new XMLFeatures.DOMParser();
      let xmlDoc = dom.parseFromString(htmlAttributWithoutValue, 'text/html');
      let xmlSerializer = new XMLFeatures.XMLSerializer()
      console.log(xmlSerializer.serializeToString(xmlDoc));
      expect(xmlDoc.documentElement.tagName !== 'parsererror');
      expect(XMLFeatures.getParserError(xmlDoc) == null);
      done();
    });

    it('html no error when a tag is not ended (<br>)', (done) => {
      let dom = new XMLFeatures.DOMParser();
      let xmlDoc = dom.parseFromString(htmlEmptyTag, 'text/html');
      let xmlSerializer = new XMLFeatures.XMLSerializer()
      console.log(xmlSerializer.serializeToString(xmlDoc));
      expect(xmlDoc.documentElement.tagName !== 'parsererror');
      expect(XMLFeatures.getParserError(xmlDoc) == null);
      done();
    });
  });
});

