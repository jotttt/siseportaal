(function(){function a(a){test.mode(a,b,Array.prototype.slice.call(arguments,1))}var b=CodeMirror.getMode({indentUnit:2},"text/x-c");a("indent","[variable-3 void] [def foo]([variable-3 void*] [variable a], [variable-3 int] [variable b]) {","  [variable-3 int] [variable c] [operator \x3d] [variable b] [operator +]","    [number 1];","  [keyword return] [operator *][variable a];","}");a("indent_switch","[keyword switch] ([variable x]) {","  [keyword case] [number 10]:","    [keyword return] [number 20];",
"  [keyword default]:",'    [variable printf]([string "foo %c"], [variable x]);',"}");a("def","[variable-3 void] [def foo]() {}","[keyword struct] [def bar]{}","[variable-3 int] [variable-3 *][def baz]() {}");a("double_block","[keyword for] (;;)","  [keyword for] (;;)","    [variable x][operator ++];","[keyword return];");a("preprocessor","[meta #define FOO 3]","[variable-3 int] [variable foo];","[meta #define BAR\\]","[meta 4]","[variable-3 unsigned] [variable-3 int] [variable bar] [operator \x3d] [number 8];",
"[meta #include \x3cbaz\x3e ][comment // comment]");var c=CodeMirror.getMode({indentUnit:2},"text/x-c++src");(function(a){test.mode(a,c,Array.prototype.slice.call(arguments,1))})("cpp14_literal","[number 10'000];","[number 0b10'000];","[number 0x10'000];","[string '100000'];")})();
