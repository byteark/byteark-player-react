function tryResolveSrcType(src: string) {
  if (src.endsWith('.js')) {
    return 'script'
  } else if (src.endsWith('.css')) {
    return 'style'
  }
  return null
}

function createScriptTag(id: string, src: string) {
  return new Promise<void>((resolve, reject) => {
    const body = document.getElementsByTagName('head')[0]

    const tag = document.createElement('script')
    tag.id = id
    tag.async = false
    tag.src = src

    tag.addEventListener('load', () => {
      tag.setAttribute('data-load-completed', `${new Date().getTime()}`)
      resolve()
    })
    tag.addEventListener('error', (err) => {
      body.removeChild(tag)
      reject(err)
    })
    body.appendChild(tag)
  })
}

function createLinkStyleTag(id: string, src: string) {
  return new Promise<void>((resolve, reject) => {
    const body = document.getElementsByTagName('head')[0]

    const tag = document.createElement('link')
    tag.id = id

    tag.setAttribute('rel', 'stylesheet')
    tag.setAttribute('type', 'text/css')
    tag.setAttribute('href', src)
    tag.addEventListener('load', () => {
      tag.setAttribute('data-load-completed', `${new Date().getTime()}`)
      resolve()
    })
    tag.addEventListener('error', (err) => {
      body.removeChild(tag)
      reject(err)
    })
    body.appendChild(tag)
  })
}

async function waitForTagLoad(tag: HTMLElement): Promise<void> {
  return new Promise((resolve, reject) => {
    if (tag.getAttribute('data-load-completed')) {
      resolve()
    }
    tag.addEventListener('load', () => resolve())
    tag.addEventListener('error', (err) => reject(err))
  })
}

export default async function loadScriptOrStyle(id: string, src: string, type: string): Promise<void | Error> {
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
