<template>
	<div class="menu">
		<h1>
			<img src="../../img/logo.png" alt="">
		</h1>
		<ul class="files">
			<template v-for='i in articleList.length'>
				<li :class='{"current": articleList[i - 1].current}'>
					<span @click='selectThis(i)'>{{ articleList[i - 1].content.split('\n')[0] }}</span>
					<button v-if='articleList.length > 1' class="delete-btn" @click='deleteThis(i)'><i class="fa fa-times"></i></button>
				</li>
			</template>
		</ul>
		<ul class="options">
			<li>
				<button class="add-one-btn" @click='newArticle'>
					<i class="fa fa-plus"></i>
				</button>
			</li>
			<li>
				<a :href='htmlDataUrl' :download='titleHtml' @mouseenter='createUrl("html")'>
					<i class="fa fa-html5"></i>
					Save as .html
				</a>
			</li>
			<li>
				<a :href='mdDataUrl' :download='titleMd' @mouseenter='createUrl("md")'>
					<i class="fa fa-download"></i>
					Save as .md
				</a>
			</li>
		</ul>
		<div class="copy-right">
			Copyright © 2016 Jrain Lau
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				htmlDataUrl: '',
      	mdDataUrl: ''
			}
		},
		computed: {
			articleList () {
				return this.$store.getters.articleList
			},
			titleHtml () {
				return this.$store.getters.articleRaw.split('\n')[0] + '.html'
			},
			titleMd () {
				return this.$store.getters.articleRaw.split('\n')[0] + '.md'
			}
		},
		methods: {
			selectThis (i) {
				this.$store.dispatch('selectThis', i - 1)
			},
			newArticle () {
				let filesBox = document.querySelector('.files')
				this.$store.dispatch('newArticle')
				setTimeout(() => {
					filesBox.scrollTop = filesBox.scrollHeight + 180
				}, 100)
			},
			deleteThis (i) {
				this.$store.dispatch('deleteThis', i - 1)
			},
			saveToCache () {
				this.$store.dispatch('saveToCache')
			},
			readFromCache () {
				this.$store.dispatch('readFromCache')
			},
			createUrl (mode) {
	      let self = this
	      let val = ''
	      if (mode === 'md') {
	        val = self.$store.getters.articleRaw
	        let blobObj = new Blob([val])
	        let objectURL = URL.createObjectURL(blobObj)
	        self.mdDataUrl = objectURL
	      } else {
	        val = self.$store.getters.articleMd
	        let blobObj = new Blob([val])
	        let objectURL = URL.createObjectURL(blobObj)
	        self.htmlDataUrl = objectURL
	      }
	    }
		}
	}
</script>

<style scoped lang="less">
	.menu {
		box-sizing: border-box;
		position: relative;
		float: left;
		height: 100%;
		width: 220px;
		box-shadow: 4px 5px 3px #aaa;
		background-color: #f5f5f5;
		h1 {
			margin: 0;
			height: 75px;
			line-height: 75px;
			text-align: center;
			img {
				width: 125px;
				vertical-align: middle;
			}
		}
		.files {
			padding: 10px 0 0 0;
			margin: 0;
			max-height: 295px;
			list-style: none;
			border-bottom: 1px solid #bdbdbd;
			overflow-y: scroll;
			li {
				position: relative;
				padding: 0;
				color: #9E9E9E;
				transition: all ease .3s;
				cursor: default;
				span {
					box-sizing: border-box;
					display: inline-block;
					width: 100%;
					height: 100%;
					padding: 15px;
					white-space: normal;
					word-break: break-all;
				}
				.delete-btn {
					position: absolute;
			    top: 0;
			    right: 0;
			    height: 100%;
					display: none;
					background: none;
					border: none;
					outline: none;
					&:hover {
						background: #EF5350;
						.fa {
							color: #fff;
						}
					}
					&:active {
						background: #F44336;
						.fa {
							color: #fff;
						}
					}
				}
				&.current {
					color: #616161;
					border-left: 6px solid #009688;
				}
				&:hover {
					background: #eee;
					.delete-btn {
						display: inline-block;
					}
				}
			}
		}
		.options {
			padding: 0;
			margin: 0;
			list-style: none;
			li {
				color: #616161;
				transition: all ease .3s;
				padding: 0 5px;
				height: 55px;
				line-height: 55px;
				&:hover {
					background: #e0e0e0;
				}
				&:active {
					background: #bdbdbd;
				}
				button,
				a {
					display: inline-block;
					padding: 0 5px;
					width: 100%;
					height: 100%;
					background: none;
					border: none;
					outline: none;
					text-align: left;
					color: inherit;
					font-size: 16px;
					text-decoration: none;
					cursor: default;
					&.add-one-btn {
						text-align: center;
					}
					.fa {
						display: inline-block;
    				width: 24px;
						font-size: 24px;
						margin: 0 15px;
					}
				}
			}
		}
		.copy-right {
			position: absolute;
			bottom: 10px;
			width: 100%;
			font-size: 12px;
			text-align: center;
			color: #9E9E9E;
		}
	}
</style>