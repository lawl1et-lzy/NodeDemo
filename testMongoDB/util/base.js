let base = {
  isObject: (param) => {
    if(param && !Array.isArray(param) && param instanceof Object) {
      return true
    }
    return false
  }
}

module.exports = base