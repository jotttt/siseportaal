(function(){CKEDITOR.dialog.add("unsave",function(c){return{title:"Unsave",minWidth:400,minHeight:75,contents:[{id:"tab-basic",label:"Basic Settings",elements:[{type:"html",html:"\x3cdiv\x3e\x3cp\x3e"+c.lang.unsave.confirm+"\x3c/p\x3e\x3c/div\x3e"}]}],onOk:function(){var a;a=localStorage.getItem("unsaveData");a=null!=a?JSON.parse(LZString.decompressFromUTF16(a)):"";var b=c.element.$.id,b=b.substring(6,b.length),b=b.replace(/_/gi,":");a.dataId==b&&c.loadSnapshot(a.data)}}})})();