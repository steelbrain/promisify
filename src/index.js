'use strict'

/* @flow */

module.exports = function promisify(callback: Function, throwError: boolean = true): Function {
  return function promisified(){
    const parameters = Array.from ? Array.from(arguments) : Array.prototype.slice.call(arguments)
    const parametersLength = parameters.length + 1
    let promise = new Promise((resolve, reject) => {
      parameters.push(function(error, data) {
        if (error) {
          reject(error)
        } else resolve(data)
      })
      if (parametersLength === 1) {
        callback.call(this, parameters[0])
      } else if (parametersLength === 2) {
        callback.call(this, parameters[0], parameters[1])
      } else if (parametersLength === 3) {
        callback.call(this, parameters[0], parameters[1], parameters[2])
      } else if (parametersLength === 4) {
        callback.call(this, parameters[0], parameters[1], parameters[2], parameters[3])
      } else {
        callback.apply(this, parameters)
      }
    })
    if (!throwError) {
      promise = promise.catch(function() {
        return null
      })
    }
    return promise
  }
}
