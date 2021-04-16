/**
 * Init Turbolinks within the site
 */

/**
 * Init ThemeSwitcher
 */
const themeSwitcher = document.getElementById('themeSwitcher')

/* Set the activated theme to root and save it to localStorage */
function setTheme(theme) {
  const root = document.documentElement

  root.dataset.theme = theme
  localStorage.setItem('theme', theme)
}

;(function () {
  const root = document.documentElement
  const currentTheme = localStorage.getItem('theme')

  if (currentTheme) {
    localStorage.setItem('theme', currentTheme)
    themeSwitcher.value = currentTheme
    root.dataset.theme = currentTheme
  }

  themeSwitcher.addEventListener('change', ({ target }) => {
    setTheme(target.value)
  })
})()
