const modules = import.meta.glob('./src/*.js', { eager: true })

const _ = Object.entries(modules).reduce((prev, [path, loader]) => {
  const name = path.match(/\.\/src\/(.*)\.js$/)[1]
  prev[name] = loader.default
  return prev
}, {})

window._ = window.myLodash = _

export default _
