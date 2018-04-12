<template>
	<div class="line-container">
		<ul>
			<li v-for="(line, index) in lineArr" class="line-item">
				<span class="line-number">{{index + 1}}</span>
				<pre class="line-content">{{line === '' ? ' ' : line}}</pre>
			</li>
		</ul>
	</div>
</template>


<script>
	export default{
		name: 'lineNumber',
		computed: {
			lineArr: function() {
				return this.$store.getters.articleLineRaw
			}
		}
	}
</script>

<style scoped lang="less">
	div.line-container{
		position: absolute;
		top: 0px;
		left: 0px;
		min-height:100%;
		width: 100%;
		margin:0;
		padding-top:15px;
		background:#cecece;
		.line-bar{
			position: absolute;

		}
		.line-content{
			visibility: hidden;
		}
		ul{
			height: 100%;
    		padding: 0;
    		margin-top: 0;
			li{
				list-style:none;
				position:relative;
				.line-number{
					position: absolute;
    				font-size: 14px;
    				width: 35px;
    				padding:0 5px;
    				line-height:26px;
    				text-align:right;
    				overflow: hidden;
    				color:#777;
				}
				.line-content{
					font-size: 18px;
    				line-height: 26px;
    				margin: 0 17px 0 55px;
    				padding: 0;
    				display: inline-block;
    				word-wrap: break-word;
    				white-space: pre-wrap;
    				word-break: normal;
    				border: none;
    				border-radius: 0;
				}
			}
		}
	}
</style>