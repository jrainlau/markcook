<template>
  <div id="app" :class="[showMenu ? 'show-menu' : '', 'app']">
    <sideMenu />
    <main>
      <navBar /> 
      <section>
        <inputer />
        <outputer />
      </section>
    </main>
  </div>
</template>

<script>
import sideMenu from './components/sideMenu.vue'
import navBar from './components/navBar.vue'
import inputer from './components/inputer.vue'
import outputer from './components/outputer.vue'

export default {
  components: {
    sideMenu,
    navBar,
    inputer,
    outputer
  },
  mounted () {
    this.$store.dispatch('loadCache')
    
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
        self.$store.dispatch('inputText', dropbox.value)
      }
    }
    
  },
  computed: {
    showMenu () {
      return this.$store.state.showMenu
    }
  }
}
</script>

<style lang="less">
  @import url('../static/markdown.less');
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: Microsoft Yahei, "PingHei", "Helvetica Neue", "Helvetica", "STHeitiSC-Light", "Arial", sans-serif;
    height: 100%;
    overflow: hidden;
    background-color: #e0e0e0;
  }
  .app {
    position: relative;
    left: -220px;
    height: 100%;
    transition: all ease .5s;
    &.show-menu {
      left: 0;
      main {
        section {
          padding-right: 230px;
        }
      }
    }
    main {
      margin-left: 220px;
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
      section {
        box-sizing: border-box;
        height: 100%;
        padding: 10px;
        padding-bottom: 55px;
        display: flex;
        justify-content: center;
        transition: all ease .5s;
      }
    }
  }

  *::-webkit-scrollbar {
      display: block;
      width: 5px;
      background: #FAFAFA;
  }
  *::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #E0E0E0;
  }
  *::-webkit-scrollbar-thumb:hover {
      background: #BDBDBD;
  }
</style>
