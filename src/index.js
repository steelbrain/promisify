/* @flow */

function promisify(callback: Function, throwError: boolean = true): Function {
  return function promisified(...parameters) {
    let promise = new Promise((resolve, reject) => {
      parameters.push(function(error, data) {
        if (error) {
          reject(error)
        } else resolve(data)
      })
      callback.apply(this, parameters)
    })
    if (!throwError) {
      promise = promise.then(function(result) {
        return typeof result === 'undefined' ? true : result
      }).catch(function() {
        return false
      })
    }
    return promise
  }
}

function promisifyAll(object: Object, throwError: boolean = true): Object {
  const duplicate = Object.assign({}, object)
  for (const item in duplicate) {
    if (
      !{}.hasOwnProperty.call(duplicate, item) ||
      typeof duplicate[item] !== 'function'
    ) {
      continue
    }
    duplicate[`${item}Async`] = promisify(duplicate[item], throwError)
  }
  return duplicate
}

export default promisify
export { promisify, promisifyAll }
