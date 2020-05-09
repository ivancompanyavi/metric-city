class Router {
  push(data, title, url) {
    history.pushState(data, title, url)
    document.dispatchEvent(
      new CustomEvent('router-change', { detail: { data, title, url } }),
    )
  }
}

const router = new Router()

export { router }
