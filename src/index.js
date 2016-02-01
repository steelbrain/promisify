'use babel'

/* @flow */

export default function promisify(callback: Function): Function {
  return function promisified(){
    const parameters = arguments
    const parametersLength = arguments.length + 1
    return new Promise((resolve, reject) => {
      Array.prototype.push.call(parameters, function(error, data) {
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
  }
}
