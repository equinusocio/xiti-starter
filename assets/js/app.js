import Turbolinks from 'turbolinks'

/**
 * Init Turbolinks within the site
 */
Turbolinks.start()

/**
 * Init ThemeSwitcher
 */
const html = document.documentElement
const themeSwitcher = document.getElementById('themeSwitcher')
const currentTheme = localStorage.getItem('theme') || 'auto';
themeSwitcher.value = currentTheme

const setTheme = (theme) => {
  html.dataset.theme = theme;
  localStorage.setItem('theme', theme)
}

themeSwitcher.addEventListener('change', () => {
  if (themeSwitcher.value === 'auto') {
    setTheme('auto')
  } else if (themeSwitcher.value === 'light') {
    setTheme('light')
  } else if (themeSwitcher.value === 'dark') {
    setTheme('dark')
  }
})
