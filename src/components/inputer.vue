<template>
	<div>
		<textarea id="inputer" :value='rawTxt' @input='inputting' @scroll='syncStroll' autofocus></textarea>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				scrollTrigger: false
			}
		},
		computed: {
			rawTxt () {
				return this.$store.getters.textInput
			}
		},
		methods: {
			inputting (e) {
				this.$store.dispatch('inputText', e.target.value)
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