(function(h){"object"==typeof exports&&"object"==typeof module?h(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],h):h(CodeMirror)})(function(h){function x(c){c=c.search(p);return-1==c?0:c}var A={},p=/[^\s\u00a0]/,l=h.Pos;h.commands.toggleComment=function(c){c.toggleComment()};h.defineExtension("toggleComment",function(c){c||(c=A);for(var d=Infinity,a=this.listSelections(),e=null,b=a.length-1;0<=b;b--){var f=a[b].from(),g=a[b].to();f.line>=d||
(g.line>=d&&(g=l(d,0)),d=f.line,null==e?this.uncomment(f,g,c)?e="un":(this.lineComment(f,g,c),e="line"):"un"==e?this.uncomment(f,g,c):this.lineComment(f,g,c))}});h.defineExtension("lineComment",function(c,d,a){a||(a=A);var e=this,b=e.getModeAt(c),f=a.lineComment||b.lineComment;if(!f){if(a.blockCommentStart||b.blockCommentStart)a.fullLines=!0,e.blockComment(c,d,a)}else if(null!=e.getLine(c.line)){var g=Math.min(0!=d.ch||d.line==c.line?d.line+1:d.line,e.lastLine()+1),n=null==a.padding?" ":a.padding,
h=a.commentBlankLines||c.line==d.line;e.operation(function(){if(a.indent){for(var d=null,b=c.line;b<g;++b){var k=e.getLine(b),k=k.slice(0,x(k));if(null==d||d.length>k.length)d=k}for(b=c.line;b<g;++b){var k=e.getLine(b),q=d.length;if(h||p.test(k))k.slice(0,q)!=d&&(q=x(k)),e.replaceRange(d+f+n,l(b,0),l(b,q))}}else for(b=c.line;b<g;++b)(h||p.test(e.getLine(b)))&&e.replaceRange(f+n,l(b,0))})}});h.defineExtension("blockComment",function(c,d,a){a||(a=A);var e=this,b=e.getModeAt(c),f=a.blockCommentStart||
b.blockCommentStart,g=a.blockCommentEnd||b.blockCommentEnd;if(f&&g){var n=Math.min(d.line,e.lastLine());n!=c.line&&0==d.ch&&p.test(e.getLine(n))&&--n;var h=null==a.padding?" ":a.padding;c.line>n||e.operation(function(){if(0!=a.fullLines){var m=p.test(e.getLine(n));e.replaceRange(h+g,l(n));e.replaceRange(f+h,l(c.line,0));var y=a.blockCommentLead||b.blockCommentLead;if(null!=y)for(var k=c.line+1;k<=n;++k)(k!=n||m)&&e.replaceRange(y+h,l(k,0))}else e.replaceRange(g,d),e.replaceRange(f,c)})}else(a.lineComment||
b.lineComment)&&0!=a.fullLines&&e.lineComment(c,d,a)});h.defineExtension("uncomment",function(c,d,a){a||(a=A);var e=this,b=e.getModeAt(c),f=Math.min(0!=d.ch||d.line==c.line?d.line:d.line-1,e.lastLine()),g=Math.min(c.line,f),h=a.lineComment||b.lineComment,x=[],m=null==a.padding?" ":a.padding,y;a:if(h){for(var k=g;k<=f;++k){var q=e.getLine(k),u=q.indexOf(h);-1<u&&!/comment/.test(e.getTokenTypeAt(l(k,u+1)))&&(u=-1);if(-1==u&&(k!=f||k==g)&&p.test(q))break a;if(-1<u&&p.test(q.slice(0,u)))break a;x.push(q)}e.operation(function(){for(var a=
g;a<=f;++a){var c=x[a-g],b=c.indexOf(h),d=b+h.length;0>b||(c.slice(d,d+m.length)==m&&(d+=m.length),y=!0,e.replaceRange("",l(a,b),l(a,d)))}});if(y)return!0}var v=a.blockCommentStart||b.blockCommentStart,t=a.blockCommentEnd||b.blockCommentEnd;if(!v||!t)return!1;var C=a.blockCommentLead||b.blockCommentLead,z=e.getLine(g),w=f==g?z:e.getLine(f),B=z.indexOf(v),r=w.lastIndexOf(t);-1==r&&g!=f&&(w=e.getLine(--f),r=w.lastIndexOf(t));if(-1==B||-1==r||!/comment/.test(e.getTokenTypeAt(l(g,B+1)))||!/comment/.test(e.getTokenTypeAt(l(f,
r+1))))return!1;b=z.lastIndexOf(v,c.ch);a=-1==b?-1:z.slice(0,c.ch).indexOf(t,b+v.length);if(-1!=b&&-1!=a&&a+t.length!=c.ch)return!1;a=w.indexOf(t,d.ch);c=w.slice(d.ch).lastIndexOf(v,a-d.ch);b=-1==a||-1==c?-1:d.ch+c;if(-1!=a&&-1!=b&&b!=d.ch)return!1;e.operation(function(){e.replaceRange("",l(f,r-(m&&w.slice(r-m.length,r)==m?m.length:0)),l(f,r+t.length));var a=B+v.length;m&&z.slice(a,a+m.length)==m&&(a+=m.length);e.replaceRange("",l(g,B),l(g,a));if(C)for(a=g+1;a<=f;++a){var c=e.getLine(a),b=c.indexOf(C);
if(-1!=b&&!p.test(c.slice(0,b))){var d=b+C.length;m&&c.slice(d,d+m.length)==m&&(d+=m.length);e.replaceRange("",l(a,b),l(a,d))}}});return!0})});
