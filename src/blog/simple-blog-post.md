---
title: Simple blog post
date: '2020-01-25'
tags:
  - sample-content
  - code
  - native-elements
---

This is a sample blog post to demonstrate how posts look with the Native Elements. All the content of this article is inside a Markdown file. [Eleventy](https://www.11ty.dev/ "Eleventy, a simpler static site generator") transforms that file into an HTML page.

This starter uses [Native Elements](https://native-elements.stackblitz.io) CSS to add a basic style to native HTML elements without any extra framework. You can customize it by setting their global custom properties inside the `:root` CSS selector.

For example, this is a `blockquote` with a basic style:

> Less is more. Isn't it?
> <cite>by Someone</cite>

Bullet list with some typography elements:

- Sed posuere consectetur est at lobortis
- Aenean lacinia <del>bibendum</del> <ins>nulla</ins> sed consectetur
- Sed posuere consectetur <s>est at lobortis</s>
- Lorem ipsum dolor <mark>sit amet</mark> consectetur
- Press <kbd>⌥</kbd> **+** <kbd>↩</kbd>

---

## Code highlights

XITY provides code highlighting using [Prism](https://prismjs.com/). By default it uses the [Material Theme Lighter](https://github.com/PrismJS/prism-themes/tree/master/themes) as a color scheme. If you want to change the theme, put the `css` file inside the `assets/css` folder and set the name inside `_data/config.json`.

```jsx
const MyComponent = props => (
  <Fragment>
    <p>Hello {props.name}</p>
  </Fragment>
)
```

... and here are some CSS code with a line highlight:

```css/1,3-4
:root {
  --background-color: white;

  .MyComponent {
    background-color: var(--background-color);
  }
}
```
