/** @type {Array} */
const data = await fetch('albums.json').then(res => res.json())
const container = document.getElementById('container')
/** @type {HTMLTemplateElement} */
const template = document.getElementById('template')
let index = 0

new IntersectionObserver(([entry], observer) => {
  if (!entry.isIntersecting) {
    return
  }

  /** @type {DocumentFragment} */
  const fragment = template.content.cloneNode(true)
  const iframe = fragment.querySelector('iframe')
  const { album, link, title } = data[index++]

  iframe.src += album
  iframe.textContent = `<a href="${link}">${title}</a>`

  container.append(fragment)
  observer.unobserve(entry.target)
  observer.observe(iframe)

  if (index === data.length) {
    return observer.disconnect()
  }
}).observe(container)
