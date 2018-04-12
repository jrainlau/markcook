<template>
	<div class="inputer-container" :class="{'fullscreen': fullscreen, 'preview': preview}">
		<div class="inputer-content">
			<textarea id="inputer" :value='rawTxt' @input='inputting' @scroll='syncStroll' @drop.stop.prevent='dragging' autofocus>
			</textarea>
			<line-number/>
		</div>
	</div>
</template>

<script>
	import lineNumber from './lineNumber.vue';

	export default {
		components:{
			lineNumber
		},
		computed: {
			rawTxt () {
				return this.$store.getters.articleRaw
			},
			fullscreen() {
				return this.$store.state.fullscreen;
			},
			preview() {
				return this.$store.state.preview;
			}
		},
		methods: {
			inputting (e) {
				this.$store.dispatch('textInput', e.target.value)
				this.$store.dispatch('saveToCache')
			},
			syncStroll (e) {
				let outputer = document.querySelector('.outputer')
				let lineContainer = document.querySelector('.line-container')
				console.log(e.target.scrollTop);
				outputer.scrollTop = e.target.scrollTop
				console.log(lineContainer.style.top );
				lineContainer.style.top = -e.target.scrollTop + 'px';
			},
			dragging (e) {
				let self = this
	      		let dt = e.dataTransfer;
	      		let files = dt.files;
	      		let fileReader = new FileReader();
	      ileReader.readAsText(files[0], 'UTF-8');
	      fileReader.onloadend = function (e) {
	        let value = e.target.result
	        self.$store.dispatch('textInput', value)
	        self.$store.dispatch('saveToCache')
	      }
			}
		}
	}
</script>

<style scoped lang="less">
    div.inputer-container.fullscreen{
    	width:100%;
    }
	div.inputer-container.preview{
    	display:none;
    }
	div.inputer-container {
		position:relative;
		width: 50%;
		height: 100%;
		margin-right: 10px;
		overflow:hidden;
		div.inputer-content{
			margin-left:45px;
			height:100%;
			textarea {
				position:relative;
				z-index:99999;
				box-sizing: border-box;
				height: 100%;
				width: 100%;
	    		vertical-align: top;
	    		padding: 15px 15px 15px 10px;
	    		resize: none;
	    		border: none;
	    		background-color: #f5f5f5;
	    		outline: none;
	    		font-family: inherit;
	    		font-size: 18px;
	    		color: #616161;
	    		box-shadow: 4px 5px 3px #aaa;
	    		transition: all ease .3s;
	    		line-height:26px;
			}
		}
	}
</style>