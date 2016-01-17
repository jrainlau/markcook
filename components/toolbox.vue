<template>
	<div class="btn-group btn-group-xs" role="group" aria-label="...">
	    <button type="button" class="btn btn-default btn-raised" @click='insert("#")'>标题</button>
	    <button type="button" class="btn btn-default btn-raised" @click='insert(">")'>引用</button>
	    <button type="button" class="btn btn-default btn-raised" @click='insert("\n- ")'>列表</button>
	    <button type="button" class="btn btn-default btn-raised" @click='insert("\n    ")'>代码快</button>
	    <button type="button" class="btn btn-default btn-raised" @click='insert("\n***\n")'>分割线</button>
	    <button type="button" class="btn btn-default btn-raised" @click='insert("[描述](http://example.com/)")'>链接</button>
	    <button type="button" class="btn btn-default btn-raised" @click='insert("*content*")'>斜体</button>
	    <button type="button" class="btn btn-default btn-raised" @click='insert("**content**")'>强调</button>
	    <button type="button" class="btn btn-default btn-raised" @click='insert("`code`")'>代码</button>
	    <button type="button" class="btn btn-default btn-raised" @click='insert("![替代文字](example.img)")'>图片</button>
    </div>
</template>

<script>
	export default {
		methods: {
	    insert: function (myValue) {
	      //IE support 
	      var myField = document.getElementById('inputter')
	      if (document.selection) { 
	        myField.focus() 
	        sel = document.selection.createRange() 
	        sel.text = myValue 
	        sel.select() 
	      } 
	      //MOZILLA/NETSCAPE support 
	      else if (myField.selectionStart || myField.selectionStart == '0') { 
	        var startPos = myField.selectionStart 
	        var endPos = myField.selectionEnd 
	        // save scrollTop before insert 
	        var restoreTop = myField.scrollTop 
	        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos,myField.value.length) 
	        if (restoreTop > 0) { 
	          // restore previous scrollTop 
	          myField.scrollTop = restoreTop 
	        } 
	          myField.focus() 
	          myField.selectionStart = startPos + myValue.length 
	          myField.selectionEnd = startPos + myValue.length 
	      } else { 
	          myField.value += myValue 
	          myField.focus() 
	        } 
	    }
	  }
	}
</script>