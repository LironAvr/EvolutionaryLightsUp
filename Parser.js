var htmlParser = require('html-parser-0.2');

var html = '<!doctype html><html><body onload="alert(\'hello\');">Hello<br />world</body></html>';
htmlParser.parse(html, {
    openElement: function(name) { console.log('open: %s', name); },
    closeOpenedElement: function(name, token, unary) { console.log('token: %s, unary: %s', token, unary); },
    closeElement: function(name) { console.log('close: %s', name); },
    comment: function(value) { console.log('comment: %s', value); },
    cdata: function(value) { console.log('cdata: %s', value); },
    attribute: function(name, value) { console.log('attribute: %s=%s', name, value); },
    docType: function(value) { console.log('doctype: %s', value); },
    text: function(value) { console.log('text: %s', value); }
});
