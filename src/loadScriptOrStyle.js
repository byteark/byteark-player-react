function tryResolveSrcType(src) {
  if (src.endsWith('.js')) {
    return 'script'
  } else if (src.endsWith('.css')) {
    return 'style'
  }
  return null
}

function createScriptTag(id, src) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement('script')
    tag.id = id
    tag.async = false
    tag.src = src

    tag.addEventListener('load', () => resolve())
    tag.addEventListener('error', (err) => reject(err))

    const body = document.getElementsByTagName('head')[0]
    body.appendChild(tag)
  })
}

function createLinkStyleTag(id, src) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement('link')
    tag.id = id
    tag.async = false

    tag.setAttribute('rel', 'stylesheet')
    tag.setAttribute('type', 'text/css')
    tag.setAttribute('href', src)
    tag.addEventListener('load', () => resolve())
    tag.addEventListener('error', (err) => reject(err))

    const body = document.getElementsByTagName('head')[0]
    body.appendChild(tag)
  })
}

export default async function loadScriptOrStyle(id, src, type = null) {
  const existingElement = document.getElementById(id)
  if (existingElement) {
    return Promise.resolve()
  }

  const resolvedType = type || tryResolveSrcType(src)
  switch (resolvedType) {
    case 'script':
      return createScriptTag(id, src)
    case 'style':
      return createLinkStyleTag(id, src)
    default:
      throw new Error('Not supported resource type')
  }
}
