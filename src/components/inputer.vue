<template>
	<div>
		<textarea id="inputer" :value='rawTxt' @input='inputting' @scroll='syncStroll' autofocus></textarea>
	</div>
</template>

<script>
	export default {
		computed: {
			rawTxt () {
				return this.$store.getters.articleRaw
			}
		},
		mounted () {
			// enable to load a file by dragging
	    let self = this
	    let dropbox;
	    dropbox = document.querySelector("#inputer");
	    dropbox.addEventListener("dragenter", dragenter, false);
	    dropbox.addEventListener("dragover", dragover, false);
	    dropbox.addEventListener("drop", drop, false);
	    function dragenter(e) {
	      e.stopPropagation();
	      e.preventDefault();
	    }
	    function dragover(e) {
	      e.stopPropagation();
	      e.preventDefault();
	    }
	    function drop(e) {
	      e.stopPropagation();
	      e.preventDefault();
	      let dt = e.dataTransfer;
	      let files = dt.files;
	      let fileReader = new FileReader();
	      fileReader.readAsText(files[0], 'UTF-8');
	      fileReader.onloadend = function (e) {
	        dropbox.value = e.target.result
	        self.$store.dispatch('textInput', dropbox.value)
	      }
	    }
		},
		methods: {
			inputting (e) {
				this.$store.dispatch('textInput', e.target.value)
				this.$store.dispatch('saveToCache')
			},
			syncStroll (e) {
				let outputer = document.querySelector('.outputer')
				outputer.scrollTop = e.target.scrollTop
			}
		}
	}
</script>

<style scoped lang="less">
	div {
		width: 50%;
		height: 100%;
		margin-right: 10px;
		textarea {
			box-sizing: border-box;
			height: 100%;
			width: 100%;
	    vertical-align: top;
	    padding: 15px;
	    resize: none;
	    border: none;
	    background-color: #f5f5f5;
	    outline: none;
	    font-family: inherit;
	    font-size: 18px;
	    color: #616161;
	    box-shadow: 4px 5px 3px #aaa;
	    transition: all ease .3s;
		}
	}
</style>