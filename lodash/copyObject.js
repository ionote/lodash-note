import assignValue from './assignValue'
import baseAssignValue from './baseAssignValue'

/**
 * 拷贝对象
 * @param {*} source
 * @param {*} props
 * @param {*} object
 * @param {*} customizer 自定义拷贝函数
 * @returns
 *
 */
function copyObject(source, props, object, customizer) {
  const isNew = !object
  object || (object = {})

  for (const key in props) {
    let newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined

    if (newValue === undefined) {
      newValue = source[key]
    }

    // TODO: 没看懂
    if (isNew) {
      baseAssignValue(object, key, newValue)
    } else {
      assignValue(object, key, newValue)
    }
  }

  return object
}

export default copyObject
