import Vue from 'vue'
import Vuex from 'vuex'

const marked = require('marked')

Vue.use(Vuex)

const createID = () => {
	let t = ''
  for(let i = 0; i < 15; i++) { 
      t += Math.floor(Math.random() * 10) 
  }
  return t
}

const saveID = (state) => {
	let idArr = []
	for (let i = 0, len = state.textInput.length; i < len; i++) {
		idArr.push(state.textInput[i].id)
		localStorage.setItem('idArr', idArr.join(','))
	}
}

export default new Vuex.Store({
	state: {
		showMenu: false,
		textInput: [
			{
				id: createID(),
				content: 'Untitled\n---\n',
				current: true
			}
		]
	},
	mutations: {
		SHOW_MENU (state) {
			state.showMenu === false ? state.showMenu = true : state.showMenu = false
		},
		TEXT_INPUT (state, txt) {
			for (let i = 0, len = state.textInput.length; i < len; i++) {
				if (state.textInput[i].current) {
					state.textInput[i].content = txt
				}
			}
		},
		SAVE_TO_CACHE (state) {
			for (let i = 0, len = state.textInput.length; i < len; i++) {
				if (state.textInput[i].current) {
					localStorage.setItem(state.textInput[i].id, state.textInput[i].content)
					saveID(state)
				}
			}
		},
		READ_FROM_CACHE (state) {
			for (let i = 0, len = state.textInput.length; i < len; i++) {
				if (state.textInput[i].current) {
					state.textInput[i].content = localStorage.getItem(state.textInput[i].id)
				}
			}
		},
		SELECT_THIS (state, index) {
			for (let i = 0, len = state.textInput.length; i < len; i++) {
				state.textInput[i].current = false
			}
			state.textInput[index].current = true
		},
		NEW_ARTICLE (state) {
			for (let i = 0, len = state.textInput.length; i < len; i++) {
				state.textInput[i].current = false
			}
			
			let newOne = {
				id: createID(),
				content: 'Untitled\n---',
				current: true
			}
			state.textInput.push(newOne)
		},
		DELETE_THIS (state, index) {
			if (state.textInput.length > 1) {
				let idArr = localStorage.getItem('idArr').split(',')
				let loc = idArr.indexOf(state.textInput[index].id)
				idArr.splice(loc, 1)
				localStorage.setItem('idArr', idArr)

				localStorage.removeItem(state.textInput[index].id)
				state.textInput.splice(index, 1)

				for (let i = 0, len = state.textInput.length; i < len; i++) {
					state.textInput[i].current = false
				}
				state.textInput[0].current = true
			}
		},
		READ_LIST_FROM_LOCAL (state) {
			if (localStorage.getItem('idArr')) {
				state.textInput = null
				let idArr = localStorage.getItem('idArr').split(',')
				let articleArr = []
				for (let i = 0, len = idArr.length; i < len; i++) {
					let articlObj = {
						id: '',
						content: '',
						current: false
					}
					articlObj.id = idArr[i]
					articlObj.content = localStorage.getItem(idArr[i])
					articleArr.push(articlObj)
				}
				state.textInput = articleArr
				state.textInput[0].current = true
			}
		},
		SYNC_SCROLL (state, scrollTop) {
			state.scrollTop = scrollTop
		}
	},
	actions: {
		showMenu ({ commit }) {
			commit('SHOW_MENU')
		},
		inputText ({ commit }, txt) {
			commit('TEXT_INPUT', txt)
		},
		selectThis ({ commit }, index) {
			commit('SELECT_THIS', index)
		},
		newArticle ({ commit }) {
			commit('NEW_ARTICLE')
		},
		deleteThis ({ commit }, index) {
			commit('DELETE_THIS', index)
		},
		saveToCache ({ commit }) {
			commit('SAVE_TO_CACHE')
		},
		readFromCache ({ commit }) {
			commit('READ_FROM_CACHE')
		},
		loadCache ({ commit }) {
			commit('READ_LIST_FROM_LOCAL')
		}
	},
	getters: {
		getCount: state => {
			return state.count
		},
		textInput: state => {
			let content = ''
			for (let i = 0, len = state.textInput.length; i < len; i++) {
				if (state.textInput[i].current) {
					content = state.textInput[i].content
				}
			}
			return content
		},
		textOutput: (state, getters) => {
			return marked(getters.textInput)
		},
		articleList: state => {
			return state.textInput
		}
	}
})