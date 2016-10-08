Markcook, a smart and beautiful markdown editor
---
![Img](https://github.com/jrainlau/markcook/blob/2.0/Illustration/logo.png)

> [中文文档](https://segmentfault.com/a/1190000007062371?_ea=1225335)

> Desktop App (for windows): [markcook2.0-win32-x64.zip](https://coding.net/s/2138109d-89e4-4791-ac02-eeb2d4294b3e)

## What's Markcook?
Markcook is a markdown editor, you can play it [HERE](http://jrainlau.github.io/markcook/)

By now, Markcook has updated to version 2.0, which was redesigned by Google Material Design, rebuilt by VueJS 2.0 and Vuex 2.0. All the works made Markcook much more beautiful and smarter.

## About it's name and design
Why it names “Markcook” and why should you choose it? For me, good food cooked by good cook, and I would like my editor could “cook” the markdown good, so I gave this name to it.

Google Material Design is my favorite style, not only it looks beautiful, but also makes me feel comfortable.

![Img](https://github.com/jrainlau/markcook/blob/2.0/Illustration/1.gif)

As an editor, it should be easy to use. Markcook has tried its best to improve the user experience. The color is low contrast and low saturability so that your eyes wouldn’t be hurt; all your operations would be as smooth as the transition and the animation dose.

![Img](https://github.com/jrainlau/markcook/blob/2.0/Illustration/2.gif)

## Features
Thought Markcook is an online markdown editor and back-end free, it could do as good as a local application.

You can open more than one markdown file and switch them conveniently from the side menu, just like Sublime Text or Atom, etc.

![Img](https://github.com/jrainlau/markcook/blob/2.0/Illustration/3.gif)

Files could be loaded by dragging.

![Img](https://github.com/jrainlau/markcook/blob/2.0/Illustration/4.gif)

You can save the article as a markdown file or a html file, the article title would be set by the string above the cutting line automatically, and the file name would be same to the title, too.

![Img](https://github.com/jrainlau/markcook/blob/2.0/Illustration/5.gif)

Using the tool bar could make you markdown editing very easy. By clicking to the button on the tool bar, you could insert a markdown string to your article, or just format a normal string to markdown.

![Img](https://github.com/jrainlau/markcook/blob/2.0/Illustration/6.gif)

Don’t ever be afraid of loosing your work while using Markcook. It could save your work to local storage automatically. Even thought you have shut down the browser, you would find all your works are still in there the next time you open Markdown by the same browser.

![Img](https://github.com/jrainlau/markcook/blob/2.0/Illustration/7.gif)

## Deep in Markcook
Thanks to VueJS 2.0 and Vuex 2.0, Markcook was developed by components and the components are decoupled, and all the state are managed by a store — which means it’s easy to maintain and customize.
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
The main logic was handle by store.js, and the components mostly in charge of input and output, or just showing the states. More information you could find them in the [source code](https://github.com/jrainlau/markcook/blob/2.0/vuex/store.js).

# Run and build
You could run Markcook locally by cloning it.
```
git clone https://github.com/jrainlau/markcook.git

cd markcook && npm install
```

For developing mode:
```
npm run dev
```
For building mode:

```
npm run build
```

If you enjoy Markcook, it would be great to fork it, star it, and send issues or pull requests to it.
Thank you very much!

## License
MIT

