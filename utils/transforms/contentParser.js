const jsdom = require('@tbranyen/jsdom')
const { JSDOM } = jsdom
const slugify = require('slugify')
const eleventyConfig = require('../../src/_data/config.json')

function setClass(element, list) {
  list.map(item => element.classList.add(item))
}

module.exports = function(value, outputPath) {
  if (outputPath.endsWith('.html')) {
    /**
     * Create the document model
     */
    const DOM = new JSDOM(value)
    const document = DOM.window.document

    /**
     * Get all the images from the post
     */
    const images = [...document.querySelectorAll('main article img')]
    if (images.length) {
      images.forEach(image => {
        /**
         * Set the loading attribute to all
         * the images to be lazy loaded (if supported)
         */
        image.setAttribute('loading', 'lazy')
        /**
         * Replace images with title with figure and figcaption
         */
        if (image.hasAttribute('title')) {
          /**
           * Create figure and figcaption elements
           */
          const figure = document.createElement('figure')
          const figCaption = document.createElement('figcaption')
          /**
           * Set figcaption content from image title
           * then remove the title attribute
           */
          figCaption.innerHTML = `<small>${image.getAttribute('title')}</small>`
          image.removeAttribute('title')
          /**
           * Add a custom class to the figure elements inside posts
           */
          setClass(figure, eleventyConfig.figureClass)
          /**
           * Clone image inside figure
           * and add the figcaption element
           */
          figure.appendChild(image.cloneNode(true))
          figure.appendChild(figCaption)
          /**
           * Replace the original image with title
           * with the generated figure
           */
          image.replaceWith(figure)
        }
      })
    }
    /**
     * Get all the headings inside the post
     */
    const articleHeadings = [
      ...document.querySelectorAll(
        'article h2, article h3, article h4, article h5, article h6'
      ),
    ]
    if (articleHeadings.length) {
      /**
       * Create an anchor element inside each post heading
       * to link to the section
       */
      articleHeadings.forEach(heading => {
        // Create the anchor element
        const anchor = document.createElement('a')
        // Create the anchor slug
        const headingSlug = slugify(heading.textContent.toLowerCase())
        // Set the anchor href based on the generated slug
        anchor.setAttribute('href', `#${headingSlug}`)
        // Add class and content to the anchor
        setClass(anchor, eleventyConfig.permalinkClass)
        anchor.innerHTML = '#'
        // Set the ID attribute with the slug
        heading.setAttribute('id', `${headingSlug}`)
        // Appen che anchor element to the heading
        heading.appendChild(anchor)
      })
    }
    /**
     * Get all the iframes inside the article
     * and wrap them inside a class
     */
    const articleEmbeds = [...document.querySelectorAll('main article iframe')]
    if (articleEmbeds.length) {
      articleEmbeds.forEach(embed => {
        const wrapper = document.createElement('div')
        embed.setAttribute('loading', 'lazy')
        setClass(wrapper, eleventyConfig.iframeClass)
        wrapper.appendChild(embed.cloneNode(true))
        embed.replaceWith(wrapper)
      })
    }
    /**
     * Get all the code snippets and wrap them
     * inside a div to apply a custom style
     */
    const codeSnippets = [...document.querySelectorAll('pre[class^="language"')]
    if (codeSnippets.length) {
      codeSnippets.forEach(embed => {
        const wrapper = document.createElement('div')
        setClass(wrapper, eleventyConfig.codeClass)
        wrapper.appendChild(embed.cloneNode(true))
        embed.replaceWith(wrapper)
      })
    }

    /**
     * Get all links with explicit href
     * and add noopener rel value
     */
    const links = [...document.querySelectorAll('a[href]')]
    if (links.length) {
      links.forEach(link => {
        /**
         * For each link found get all the original attributes
         * and apply them to the custom link element
         */
        const externalLink = document.createElement('a')
        if (link.hasAttributes()) {
          const linkAttributes = link.attributes
          for (let i = linkAttributes.length; i--; ) {
            externalLink.setAttribute(
              linkAttributes[i].name,
              linkAttributes[i].value
            )
          }
        }
        /**
         * If the link starts with http or https
         * append a "noopener" value to the rel attribute
         */
        const getHref = link.getAttribute('href')
        const currentRel = link.getAttribute('rel')
        const isExternal =
          getHref.startsWith('http') || getHref.startsWith('https')
        if (isExternal) {
          externalLink.setAttribute(
            'rel',
            currentRel && !currentRel.includes('noopener')
              ? `${currentRel} noopener noreferrer`
              : 'noopener noreferrer'
          )
        }
        externalLink.innerHTML = link.innerHTML
        link.replaceWith(externalLink.cloneNode(true))
      })
    }

    return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML
  }
  return value
}
