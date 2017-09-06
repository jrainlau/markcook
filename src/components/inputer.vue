<template>
	<div>
		<textarea id="inputer" :value='rawTxt' @input='inputting' @scroll='syncStroll' @drop.stop.prevent='dragging' autofocus></textarea>
	</div>
</template>

<script>
	import { setContent, upDateContent } from './utils.js'

	export default {
		computed: {
			rawTxt () {
				return this.$store.getters.articleRaw
			}
		},
		methods: {
			inputting (e) {
				this.$store.dispatch('textInput', e.target.value)
				this.$store.dispatch('saveToCache')
			},
			syncStroll (e) {
				const outputer = document.querySelector('.outputer')
				outputer.scrollTop = e.target.scrollTop
			},
			dragging (e) {
				const self = this
	      const files = e.dataTransfer.files;
				const fileReader = new FileReader();
				const inputer = document.querySelector('#inputer')
				const startPosition = inputer.selectionStart
				const endPosition = inputer.selectionEnd
				const oldContent = inputer.value
				if (files[0].type === 'text/markdown') {
					fileReader.readAsText(files[0], 'UTF-8');
					fileReader.onloadend = function (e) {
						const value = e.target.result
						self.$store.dispatch('textInput', value)
						self.$store.dispatch('saveToCache')
					}
				} else if (/image/.test(files[0].type)) {
					const newContent = setContent(inputer, oldContent, '', `![](${files[0].path})`, endPosition, 7, 1)
					self.$store.dispatch('textInput', newContent)
					self.$store.dispatch('saveToCache')
				}		
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