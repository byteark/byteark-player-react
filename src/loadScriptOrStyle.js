const ScriptCache = new Map()
const LoadCache = new Set()

function tryResolveSrcType(src) {
  if (src.endsWith('.js')) {
    return 'script'
  } else if (src.endsWith('.css')) {
    return 'style'
  }
  return null
}

function createScriptTag(id, src) {
  const cacheKey = id || src

  // check if script is already load
  if (cacheKey && LoadCache.has(cacheKey)) {
    return
  }

  // check if contents of this script are already loading/loaded
  if (ScriptCache.has(src)) {
    LoadCache.add(cacheKey)
    // Execute onLoad since the script loading has begun
    return
  }

  return new Promise((resolve, reject) => {
    const body = document.getElementsByTagName('head')[0]

    const tag = document.createElement('script')
    tag.id = id
    tag.async = false
    tag.src = src

    tag.addEventListener('load', () => {
      tag.setAttribute('data-load-completed', new Date().getTime())
      resolve()
    })
    tag.addEventListener('error', (err) => {
      body.removeChild(tag)
      reject(err)
    })
    body.appendChild(tag)
  })
}

function createLinkStyleTag(id, src) {
  return new Promise((resolve, reject) => {
    const body = document.getElementsByTagName('head')[0]

    const tag = document.createElement('link')
    tag.id = id
    tag.async = false

    tag.setAttribute('rel', 'stylesheet')
    tag.setAttribute('type', 'text/css')
    tag.setAttribute('href', src)
    tag.addEventListener('load', () => {
      tag.setAttribute('data-load-completed', new Date().getTime())
      resolve()
    })
    tag.addEventListener('error', (err) => {
      body.removeChild(tag)
      reject(err)
    })
    body.appendChild(tag)
  })
}

async function waitForTagLoad(tag) {
  return new Promise((resolve, reject) => {
    if (tag.getAttribute('data-load-completed')) {
      resolve()
    }
    tag.addEventListener('load', () => resolve())
    tag.addEventListener('error', (err) => reject(err))
  })
}

export default async function loadScriptOrStyle(id, src, type = null) {
  const existingElement = document.getElementById(id)
  if (existingElement) {
    return waitForTagLoad(existingElement)
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
