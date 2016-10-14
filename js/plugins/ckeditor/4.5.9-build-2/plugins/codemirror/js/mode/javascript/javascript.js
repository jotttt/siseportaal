(function(q){"object"==typeof exports&&"object"==typeof module?q(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],q):q(CodeMirror)})(function(q){function aa(q,r,p){return/^(?:operator|sof|keyword c|case|new|[\[{}\(,;:]|=>)$/.test(r.lastType)||"quasi"==r.lastType&&/\{\s*$/.test(q.string.slice(0,q.pos-(p||0)))}q.defineMode("javascript",function(qa,r){function p(a,d,f){B=a;J=f;return d}function x(a,d){var f=a.next();if('"'==f||"'"==f)return d.tokenize=
ra(f),d.tokenize(a,d);if("."==f&&a.match(/^\d+(?:[eE][+\-]?\d+)?/))return p("number","number");if("."==f&&a.match(".."))return p("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(f))return p(f);if("\x3d"==f&&a.eat("\x3e"))return p("\x3d\x3e","operator");if("0"==f&&a.eat(/x/i))return a.eatWhile(/[\da-f]/i),p("number","number");if("0"==f&&a.eat(/o/i))return a.eatWhile(/[0-7]/i),p("number","number");if("0"==f&&a.eat(/b/i))return a.eatWhile(/[01]/i),p("number","number");if(/\d/.test(f))return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),
p("number","number");if("/"==f){if(a.eat("*"))return d.tokenize=K,K(a,d);if(a.eat("/"))return a.skipToEnd(),p("comment","comment");if(aa(a,d,1)){a:for(var f=!1,c,b=!1;null!=(c=a.next());){if(!f){if("/"==c&&!b)break a;"["==c?b=!0:b&&"]"==c&&(b=!1)}f=!f&&"\\"==c}a.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);return p("regexp","string-2")}a.eatWhile(L);return p("operator","operator",a.current())}if("`"==f)return d.tokenize=S,S(a,d);if("#"==f)return a.skipToEnd(),p("error","error");if(L.test(f))return a.eatWhile(L),
p("operator","operator",a.current());if(T.test(f))return a.eatWhile(T),f=a.current(),(c=ba.propertyIsEnumerable(f)&&ba[f])&&"."!=d.lastType?p(c.type,c.style,f):p("variable","variable",f)}function ra(a){return function(d,b){var c=!1,e;if(M&&"@"==d.peek()&&d.match(sa))return b.tokenize=x,p("jsonld-keyword","meta");for(;null!=(e=d.next())&&(e!=a||c);)c=!c&&"\\"==e;c||(b.tokenize=x);return p("string","string")}}function K(a,d){for(var b=!1,c;c=a.next();){if("/"==c&&b){d.tokenize=x;break}b="*"==c}return p("comment",
"comment")}function S(a,d){for(var b=!1,c;null!=(c=a.next());){if(!b&&("`"==c||"$"==c&&a.eat("{"))){d.tokenize=x;break}b=!b&&"\\"==c}return p("quasi","string-2",a.current())}function U(a,d){d.fatArrowAt&&(d.fatArrowAt=null);var b=a.string.indexOf("\x3d\x3e",a.start);if(!(0>b)){for(var c=0,e=!1,b=b-1;0<=b;--b){var h=a.string.charAt(b),g="([{}])".indexOf(h);if(0<=g&&3>g){if(!c){++b;break}if(0==--c)break}else if(3<=g&&6>g)++c;else if(T.test(h))e=!0;else{if(/["'\/]/.test(h))return;if(e&&!c){++b;break}}}e&&
!c&&(d.fatArrowAt=b)}}function ca(a,d,b,c,e,h){this.indented=a;this.column=d;this.type=b;this.prev=e;this.info=h;null!=c&&(this.align=c)}function g(){for(var a=arguments.length-1;0<=a;a--)e.cc.push(arguments[a])}function b(){g.apply(null,arguments);return!0}function C(a){function d(b){for(;b;b=b.next)if(b.name==a)return!0;return!1}var b=e.state;e.marked="def";b.context?d(b.localVars)||(b.localVars={name:a,next:b.localVars}):!d(b.globalVars)&&r.globalVars&&(b.globalVars={name:a,next:b.globalVars})}
function D(){e.state.context={prev:e.state.context,vars:e.state.localVars};e.state.localVars=ta}function E(){e.state.localVars=e.state.context.vars;e.state.context=e.state.context.prev}function m(a,b){var f=function(){var c=e.state,f=c.indented;if("stat"==c.lexical.type)f=c.lexical.indented;else for(var h=c.lexical;h&&")"==h.type&&h.align;h=h.prev)f=h.indented;c.lexical=new ca(f,e.stream.column(),a,null,c.lexical,b)};f.lex=!0;return f}function k(){var a=e.state;a.lexical.prev&&(")"==a.lexical.type&&
(a.indented=a.lexical.indented),a.lexical=a.lexical.prev)}function n(a){function d(f){return f==a?b():";"==a?g():b(d)}return d}function t(a,d){return"var"==a?b(m("vardef",d.length),V,n(";"),k):"keyword a"==a?b(m("form"),l,t,k):"keyword b"==a?b(m("form"),t,k):"{"==a?b(m("}"),N,k):";"==a?b():"if"==a?("else"==e.state.lexical.info&&e.state.cc[e.state.cc.length-1]==k&&e.state.cc.pop()(),b(m("form"),l,t,k,da)):"function"==a?b(w):"for"==a?b(m("form"),ea,t,k):"variable"==a?b(m("stat"),ua):"switch"==a?b(m("form"),
l,m("}","switch"),n("{"),N,k,k):"case"==a?b(l,n(":")):"default"==a?b(n(":")):"catch"==a?b(m("form"),D,n("("),W,n(")"),t,k,E):"class"==a?b(m("form"),va,k):"export"==a?b(m("stat"),wa,k):"import"==a?b(m("stat"),xa,k):"module"==a?b(m("form"),v,m("}"),n("{"),N,k,k):g(m("stat"),l,n(";"),k)}function l(a){return fa(a,!1)}function u(a){return fa(a,!0)}function fa(a,d){if(e.state.fatArrowAt==e.stream.start){var f=d?ga:ha;if("("==a)return b(D,m(")"),F(v,")"),k,n("\x3d\x3e"),f,E);if("variable"==a)return g(D,
v,n("\x3d\x3e"),f,E)}f=d?O:G;return ya.hasOwnProperty(a)?b(f):"function"==a?b(w,f):"keyword c"==a?b(d?ia:X):"("==a?b(m(")"),X,P,n(")"),k,f):"operator"==a||"spread"==a?b(d?u:l):"["==a?b(m("]"),za,k,f):"{"==a?H(ja,"}",null,f):"quasi"==a?g(Q,f):"new"==a?b(Aa(d)):b()}function X(a){return a.match(/[;\}\)\],]/)?g():g(l)}function ia(a){return a.match(/[;\}\)\],]/)?g():g(u)}function G(a,d){return","==a?b(l):O(a,d,!1)}function O(a,d,f){var c=0==f?G:O,e=0==f?l:u;if("\x3d\x3e"==a)return b(D,f?ga:ha,E);if("operator"==
a)return/\+\+|--/.test(d)?b(c):"?"==d?b(l,n(":"),e):b(e);if("quasi"==a)return g(Q,c);if(";"!=a){if("("==a)return H(u,")","call",c);if("."==a)return b(Ba,c);if("["==a)return b(m("]"),X,n("]"),k,c)}}function Q(a,d){return"quasi"!=a?g():"${"!=d.slice(d.length-2)?b(Q):b(l,Ca)}function Ca(a){if("}"==a)return e.marked="string-2",e.state.tokenize=S,b(Q)}function ha(a){U(e.stream,e.state);return g("{"==a?t:l)}function ga(a){U(e.stream,e.state);return g("{"==a?t:u)}function Aa(a){return function(d){return"."==
d?b(a?Da:Ea):g(a?u:l)}}function Ea(a,d){if("target"==d)return e.marked="keyword",b(G)}function Da(a,d){if("target"==d)return e.marked="keyword",b(O)}function ua(a){return":"==a?b(k,t):g(G,n(";"),k)}function Ba(a){if("variable"==a)return e.marked="property",b()}function ja(a,d){if("variable"==a||"keyword"==e.style)return e.marked="property","get"==d||"set"==d?b(Fa):b(I);if("number"==a||"string"==a)return e.marked=M?"property":e.style+" property",b(I);if("jsonld-keyword"==a)return b(I);if("modifier"==
a)return b(ja);if("["==a)return b(l,n("]"),I);if("spread"==a)return b(l)}function Fa(a){if("variable"!=a)return g(I);e.marked="property";return b(w)}function I(a){if(":"==a)return b(u);if("("==a)return g(w)}function F(a,d){function f(c){return","==c?(c=e.state.lexical,"call"==c.info&&(c.pos=(c.pos||0)+1),b(a,f)):c==d?b():b(n(d))}return function(c){return c==d?b():g(a,f)}}function H(a,d,f){for(var c=3;c<arguments.length;c++)e.cc.push(arguments[c]);return b(m(d,f),F(a,d),k)}function N(a){return"}"==
a?b():g(t,N)}function ka(a){if(la&&":"==a)return b(Ga)}function Ha(a,d){if("\x3d"==d)return b(u)}function Ga(a){if("variable"==a)return e.marked="variable-3",b()}function V(){return g(v,ka,Y,Ia)}function v(a,d){if("modifier"==a)return b(v);if("variable"==a)return C(d),b();if("spread"==a)return b(v);if("["==a)return H(v,"]");if("{"==a)return H(Ja,"}")}function Ja(a,d){if("variable"==a&&!e.stream.match(/^\s*:/,!1))return C(d),b(Y);"variable"==a&&(e.marked="property");return"spread"==a?b(v):"}"==a?g():
b(n(":"),v,Y)}function Y(a,d){if("\x3d"==d)return b(u)}function Ia(a){if(","==a)return b(V)}function da(a,d){if("keyword b"==a&&"else"==d)return b(m("form","else"),t,k)}function ea(a){if("("==a)return b(m(")"),Ka,n(")"),k)}function Ka(a){return"var"==a?b(V,n(";"),R):";"==a?b(R):"variable"==a?b(La):g(l,n(";"),R)}function La(a,d){return"in"==d||"of"==d?(e.marked="keyword",b(l)):b(G,R)}function R(a,d){return";"==a?b(ma):"in"==d||"of"==d?(e.marked="keyword",b(l)):g(l,n(";"),ma)}function ma(a){")"!=a&&
b(l)}function w(a,d){if("*"==d)return e.marked="keyword",b(w);if("variable"==a)return C(d),b(w);if("("==a)return b(D,m(")"),F(W,")"),k,t,E)}function W(a){return"spread"==a?b(W):g(v,ka,Ha)}function va(a,d){if("variable"==a)return C(d),b(na)}function na(a,d){if("extends"==d)return b(l,na);if("{"==a)return b(m("}"),y,k)}function y(a,d){if("variable"==a||"keyword"==e.style){if("static"==d)return e.marked="keyword",b(y);e.marked="property";return"get"==d||"set"==d?b(Ma,w,y):b(w,y)}if("*"==d)return e.marked=
"keyword",b(y);if(";"==a)return b(y);if("}"==a)return b()}function Ma(a){if("variable"!=a)return g();e.marked="property";return b()}function wa(a,d){return"*"==d?(e.marked="keyword",b(oa,n(";"))):"default"==d?(e.marked="keyword",b(l,n(";"))):g(t)}function xa(a){return"string"==a?b():g(Z,oa)}function Z(a,d){if("{"==a)return H(Z,"}");"variable"==a&&C(d);"*"==d&&(e.marked="keyword");return b(Na)}function Na(a,d){if("as"==d)return e.marked="keyword",b(Z)}function oa(a,d){if("from"==d)return e.marked=
"keyword",b(l)}function za(a){return"]"==a?b():g(u,Oa)}function Oa(a){return"for"==a?g(P,n("]")):","==a?b(F(ia,"]")):g(F(u,"]"))}function P(a){if("for"==a)return b(ea,P);if("if"==a)return b(l,P)}var z=qa.indentUnit,pa=r.statementIndent,M=r.jsonld,A=r.json||M,la=r.typescript,T=r.wordCharacters||/[\w$\xa1-\uffff]/,ba=function(){function a(a){return{type:a,style:"keyword"}}var b=a("keyword a"),f=a("keyword b"),c=a("keyword c"),e=a("operator"),h={type:"atom",style:"atom"},b={"if":a("if"),"while":b,"with":b,
"else":f,"do":f,"try":f,"finally":f,"return":c,"break":c,"continue":c,"new":a("new"),"delete":c,"throw":c,"debugger":c,"var":a("var"),"const":a("var"),let:a("var"),"function":a("function"),"catch":a("catch"),"for":a("for"),"switch":a("switch"),"case":a("case"),"default":a("default"),"in":e,"typeof":e,"instanceof":e,"true":h,"false":h,"null":h,undefined:h,NaN:h,Infinity:h,"this":a("this"),"class":a("class"),"super":a("atom"),yield:c,"export":a("export"),"import":a("import"),"extends":c};if(la){var f=
{type:"variable",style:"variable-3"},c={"interface":a("class"),"implements":c,namespace:c,module:a("module"),"enum":a("module"),"public":a("modifier"),"private":a("modifier"),"protected":a("modifier"),"abstract":a("modifier"),as:e,string:f,number:f,"boolean":f,any:f},g;for(g in c)b[g]=c[g]}return b}(),L=/[+\-*&%=<>!?|~^]/,sa=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,B,J,ya={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"jsonld-keyword":!0},
e={state:null,column:null,marked:null,cc:null},ta={name:"this",next:{name:"arguments"}};k.lex=!0;return{startState:function(a){a={tokenize:x,lastType:"sof",cc:[],lexical:new ca((a||0)-z,0,"block",!1),localVars:r.localVars,context:r.localVars&&{vars:r.localVars},indented:a||0};r.globalVars&&"object"==typeof r.globalVars&&(a.globalVars=r.globalVars);return a},token:function(a,b){a.sol()&&(b.lexical.hasOwnProperty("align")||(b.lexical.align=!1),b.indented=a.indentation(),U(a,b));if(b.tokenize!=K&&a.eatSpace())return null;
var f=b.tokenize(a,b);if("comment"==B)return f;b.lastType="operator"!=B||"++"!=J&&"--"!=J?B:"incdec";a:{var c=B,g=J,h=b.cc;e.state=b;e.stream=a;e.marked=null;e.cc=h;e.style=f;b.lexical.hasOwnProperty("align")||(b.lexical.align=!0);for(;;)if((h.length?h.pop():A?l:t)(c,g)){for(;h.length&&h[h.length-1].lex;)h.pop()();if(e.marked){f=e.marked;break a}if(c="variable"==c)b:{for(c=b.localVars;c;c=c.next)if(c.name==g){c=!0;break b}for(h=b.context;h;h=h.prev)for(c=h.vars;c;c=c.next)if(c.name==g){c=!0;break b}c=
void 0}if(c){f="variable-2";break a}break a}}return f},indent:function(a,b){if(a.tokenize==K)return q.Pass;if(a.tokenize!=x)return 0;var f=b&&b.charAt(0),c=a.lexical;if(!/^\s*else\b/.test(b))for(var e=a.cc.length-1;0<=e;--e){var g=a.cc[e];if(g==k)c=c.prev;else if(g!=da)break}"stat"==c.type&&"}"==f&&(c=c.prev);pa&&")"==c.type&&"stat"==c.prev.type&&(c=c.prev);e=c.type;g=f==e;return"vardef"==e?c.indented+("operator"==a.lastType||","==a.lastType?c.info+1:0):"form"==e&&"{"==f?c.indented:"form"==e?c.indented+
z:"stat"==e?(f=c.indented,c="operator"==a.lastType||","==a.lastType||L.test(b.charAt(0))||/[,.]/.test(b.charAt(0)),f+(c?pa||z:0)):"switch"!=c.info||g||0==r.doubleIndentSwitch?c.align?c.column+(g?0:1):c.indented+(g?0:z):c.indented+(/^(?:case|default)\b/.test(b)?z:2*z)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:A?null:"/*",blockCommentEnd:A?null:"*/",lineComment:A?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:A?"json":"javascript",jsonldMode:M,jsonMode:A,
expressionAllowed:aa,skipExpression:function(a){var b=a.cc[a.cc.length-1];b!=l&&b!=u||a.cc.pop()}}});q.registerHelper("wordChars","javascript",/[\w$]/);q.defineMIME("text/javascript","javascript");q.defineMIME("text/ecmascript","javascript");q.defineMIME("application/javascript","javascript");q.defineMIME("application/x-javascript","javascript");q.defineMIME("application/ecmascript","javascript");q.defineMIME("application/json",{name:"javascript",json:!0});q.defineMIME("application/x-json",{name:"javascript",
json:!0});q.defineMIME("application/ld+json",{name:"javascript",jsonld:!0});q.defineMIME("text/typescript",{name:"javascript",typescript:!0});q.defineMIME("application/typescript",{name:"javascript",typescript:!0})});
