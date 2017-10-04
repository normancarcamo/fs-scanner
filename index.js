const fs = require('fs')
const { resolve, join } = require('path')

class Scanner {
  constructor(options) {

    if (this.isObject(options)) {
      const _options = Object.assign({ path: __dirname, ignore: null, index: '_', prefix: null, suffix: null }, options)
      this._path = _options.path
      this._ignore = _options.ignore
      this._index = _options.index
      this._prefix = _options.prefix
      this._suffix = _options.suffix
    } else {
      const _options = { path: __dirname, ignore: null, index: '_', prefix: null, suffix: null };
      this._path = _options.path
      this._ignore = _options.ignore
      this._index = _options.index
      this._prefix = _options.prefix
      this._suffix = _options.suffix
    }

    this._cwd = process.cwd().split('/').pop()
    this._directory = null
    this._isIgnored = false
    this._tree = {}
    this._collection = []

    this.inspeccionar(this.path, this.collection, this.tree)
  }

  // ------------------------------------------------------ Path
  get path() {
    return this._path
  }

  set path(str) {
    this._path = str
  }

  // ------------------------------------------------------ Prefix
  get prefix() {
    return this._prefix
  }

  set prefix(prefix) {
    if (this.isObject(prefix)) {
      this._prefix = prefix
    } else {
      throw 'The prefix must be an object with keys and values, the key is used to match on each directory found during the loop.'
    }
  }

  setPrefix(path) {
    if (this.isObject(this._prefix)) {
      let prefixed = Object.keys(this._prefix).reduce((initial, key) => {
        if (key && this.isString(key) && this.isString(this._prefix[key]) && path.includes(key)) {
          initial = path.replace(key, `${join(this._prefix[key], key)}`)
        }
        return initial
      }, null)

      if (prefixed) {
        path = prefixed
      }
    }

    return path
  }

  // ------------------------------------------------------ Suffix
  get suffix() {
    return this._suffix
  }

  set suffix(suffix) {
    if (this.isObject(suffix)) {
      this._suffix = suffix
    } else {
      throw 'The suffix must be an object with keys and values, the key is used to match on each directory found during the loop.'
    }
  }

  setSuffix(path) {
    if (this.isObject(this._suffix)) {
      let suffixed = Object.keys(this._suffix).reduce((initial, key) => {
        if (key && this.isString(key) && this.isString(this._suffix[key]) && path.includes(key)) {
          initial = path.replace(key, `${join(key, this._suffix[key])}`)
        }
        return initial
      }, null)

      if (suffixed) {
        path = suffixed
      }
    }

    return path
  }

  // ------------------------------------------------------ Index
  get index() {
    return this._index
  }

  set index(index) {
    if (isString(index) || isBoolean(index)) {
      if (isString(index)) {
        this._index = index
      } else if (isBoolean(index) && index) {
        this._index = 'root'
      }
    }
  }

  addIndexToTree(index, object, path) {
    object = { [index]: path }
    if (index) {
      if (isString(index)) {
        // custom
        object = { [index]: path }
      } else if (isBoolean(index)) {
        // default
        object = { root: path }
      }
    }

    return object
  }

  // ------------------------------------------------------ CWD
  get cwd() {
    return this._cwd
  }

  set cwd(cwd) {
    this._cwd = cwd
  }

  isCwd(directory) {
    return directory === this._cwd
  }

  addCwd() {
    let parts = this._path.split('/')
  }

  // ------------------------------------------------------ Actual Directory
  get directory() {
    return this._directory
  }

  set directory(directory) {
    this._directory = directory
  }

  // ------------------------------------------------------ Ignoring directories
  ignore(path, string, directory) {
    let ignore = false

    if (this.isString(string) && string.length) {
      if (string === directory) {
        ignore = true
      } else if ((`${string}/` === `${directory}/`) || (`${string}` === `${directory}/`)) {
        ignore = true
      } else if (`${string}*` === `${directory}*` || `${string}` === `${directory}*`) {
        ignore = true
      } else if (string.includes('/*')) {
        let splitted = string.split('/')[0]
        if (splitted !== directory) {
          if (path.includes(splitted)) {
            ignore = true
          }
        }
      } else if (path.includes(string)) {
        ignore = true
      }
    } else {
      if (this.isArray(string) && string.length) {
        if (string.indexOf(directory) > -1) {
          ignore = true
        } else if (string.indexOf(`${directory}/`) > -1) {
          ignore = true
        } else if (string.indexOf(`${directory}*`) > -1) {
          ignore = true
        } else {
          for (let i = 0; i < string.length; i++) {
            if (string[i].includes('/*')) {
              let splitted = string[i].split('/')[0]
              if (splitted !== directory) {
                if (path.includes(splitted)) {
                  ignore = true
                }
              }
            } else if (path.includes(string[i])) {
              ignore = true
            }
          }
        }
      }
    }

    return {_path: path, _ignore: ignore}
  }

  isIgnored() {
    return this._isIgnored
  }

  // ------------------------------------------------------ Collection
  get collection() {
    return this._collection
  }

  set collection(array) {
    this._collection = array
  }


  // ------------------------------------------------------ Tree
  get tree() {
    return this._tree
  }

  set tree(str) {
    if (this.isString(str)) {
      this._tree[str] = {
        [this.index]: this.path
      }
    }
  }

  setTree(object, directory) {
    if (this.isString(directory)) {
      object[directory] = {
        [this.index]: this.path
      }
    }
    return object
  }

  // ------------------------------------------------------ Utils
  isString(input) {
    return (typeof input === 'string') ? true : false
  }

  isArray(o) {
    return !!o && typeof o === "object" && o.length !== undefined
  }

  isObject(value) {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
      return false
    } else {
      var prototype = Object.getPrototypeOf(value)
      return prototype === null || prototype === Object.prototype
    }
  }

  isBoolean(value) {
    return !!(typeof value === 'boolean')
  }

  inspeccionar(ruta, lista, arbol) {
    let path = ruta
    let stats = fs.statSync(path)

    if (stats.isDirectory()) {
      let parts = path.split('/')
      let directory = parts[parts.length-1]

      if (this.isCwd(directory)) {
        directory = 'cwd'
      }

      let {_path, _ignore} = this.ignore(path, this._ignore, directory)
      path = _path

      if (!_ignore) {
        path = this.setPrefix(path)
        path = this.setSuffix(path)

        lista.push(path)
        arbol[directory] = { [this.index]: path }

        let innerDirectories = fs.readdirSync(ruta)

        for (let i = 0; i < innerDirectories.length; i++) {
          let innerPath = join(ruta, innerDirectories[i])
          if (fs.statSync(innerPath).isDirectory()) {
            this.inspeccionar(innerPath, lista, arbol[directory])
          }
        }
      }
    }

    return {collection: lista, tree: arbol}
  }
}

module.exports = Scanner