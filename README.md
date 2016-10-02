Markcook2.0
---

A smart and beautiful markdown editor.

Use it in [HERE](http://jrainlau.github.io/markcook)！

## What's new in Markcook2.0?
As you can see, markcook is an editor for writting `markdown`.

The 2.0 version rebuilt it totally by new UI  [Google material design](https://design.google.com/) and new JS framwork [VueJS 2.0](https://vuejs.org/), which makes it much more beautiful and smarter.

Markcook2.0 allows you to open more than one markdown file, you can switch them from the side menu easily.
![Img](https://imgly.net/img/qfy.gif)

What's more, you could open your markdown file by dragging it into Markcook's input area. After editting finished, you can save it as markdown file or html file from the side menu.
![Img](https://imgly.net/img/qf1.gif)

The most important part of the new version is the smarter tool bar. You could insert a markdown format string such as `**Bold**` and `*Italic*`, or you could format a string to markdown -- all you need to do is to click a button from the tool bar.
![Img](https://imgly.net/img/qf9.gif)

You may be confused why Markcook doesn't have the "save button" like the other editor dose? The reason is that Markcook could save your input automatically when you are typing. Even thought you have close it, the next time you open Markcook, you would find that all your works are still in there!
![Img](https://imgly.net/img/qfj.gif)

## Deep in Markcook2.0
Thanks to [VueJS2.0](https://vuejs.org/) and [Vuex2.0](https://vuex.vuejs.org/en/index.html), Markcook was developed by components and the components are decoupled, and all the state are managed by a store -- which means it's easy to maintain and customize.

```
 |__ index.html
   |__ src
     |__ App.vue
     |__ components
       |__ inputer.vue
       |__ navBar.vue
       |__ outputer.vue
       |__ sideMenu.vue
     |__ main.js
   |__ vuex
     |__ store.js
```

## Run and build
Install
```
git clone https://github.com/jrainlau/markcook.git

cd markcook && npm install
```
Dev
```
npm run dev
```
Build
```
npm run build
```

## License
MIT

