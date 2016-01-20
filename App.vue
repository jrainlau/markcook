<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <toolbox></toolbox>
          <div class="pull-right">
            <button class="btn btn-sm btn-success btn-raised" @click='save'>本地缓存</button>
            <button class="btn btn-sm btn-info btn-raised" @click='read'>加载上次</button>
          </div>
        </div>
      </div>
      <div class="work-space row">
        <div class="col-xs-6">
          <div class="well">
            <hr>
            <textarea autofocus id="inputter" v-model="article"></textarea>
          </div>
        </div>
        <div class="col-xs-6">
          <div class="well">
            <hr>
            <output id="outputter" v-html="article | markify"></output>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import marked from '../lib/marked'
import toolbox from './components/toolbox'

Vue.filter('markify', function (val) {
  return marked(val)
})

export default {
  data: function () {
    return {
      article: ''
    }
  },
  components: {
    toolbox
  },
  methods: {
    save: function () {
      localStorage.article = this.article
      swal('本地缓存成功', '请勿清空浏览器信息', 'success')
    },
    read: function () {
      this.article = localStorage.article
    }
  }
}
</script>

<style lang=less>
body {
  font-family: microsoft yahei, Helvetica, sans-serif;
  background: #fff;
}
html,
body,
body > #app,
body > #app > .container-fluid {
  height: 100%;
  overflow: hidden;
}
#app > .container-fluid {
  position: relative;
  height: 100%;
  .work-space {
    height: 90%;
    .col-xs-6 {
      height: 100%;
      .well {
        height: 100%;
        #inputter,
        #outputter {
          width: 100%;
          height: 90%;
          border: none;
          resize: none;
          overflow-y: auto;
          overflow-x: hidden;
          &::-webkit-scrollbar {
            background-color: #eee;
            width: 5px;
            border-radius: 10px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }
        }
      }
    }
  }
}

</style>
