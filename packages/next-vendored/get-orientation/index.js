;(() => {
  var e = {
    547: (e, r, t) => {
      r = e.exports = t(891)
      r.log = log
      r.formatArgs = formatArgs
      r.save = save
      r.load = load
      r.useColors = useColors
      r.storage =
        'undefined' != typeof chrome && 'undefined' != typeof chrome.storage
          ? chrome.storage.local
          : localstorage()
      r.colors = [
        'lightseagreen',
        'forestgreen',
        'goldenrod',
        'dodgerblue',
        'darkorchid',
        'crimson',
      ]
      function useColors() {
        if (
          typeof window !== 'undefined' &&
          window.process &&
          window.process.type === 'renderer'
        ) {
          return true
        }
        return (
          (typeof document !== 'undefined' &&
            document.documentElement &&
            document.documentElement.style &&
            document.documentElement.style.WebkitAppearance) ||
          (typeof window !== 'undefined' &&
            window.console &&
            (window.console.firebug ||
              (window.console.exception && window.console.table))) ||
          (typeof navigator !== 'undefined' &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
            parseInt(RegExp.$1, 10) >= 31) ||
          (typeof navigator !== 'undefined' &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        )
      }
      r.formatters.j = function (e) {
        try {
          return JSON.stringify(e)
        } catch (e) {
          return '[UnexpectedJSONParseError]: ' + e.message
        }
      }
      function formatArgs(e) {
        var t = this.useColors
        e[0] =
          (t ? '%c' : '') +
          this.namespace +
          (t ? ' %c' : ' ') +
          e[0] +
          (t ? '%c ' : ' ') +
          '+' +
          r.humanize(this.diff)
        if (!t) return
        var s = 'color: ' + this.color
        e.splice(1, 0, s, 'color: inherit')
        var n = 0
        var i = 0
        e[0].replace(/%[a-zA-Z%]/g, function (e) {
          if ('%%' === e) return
          n++
          if ('%c' === e) {
            i = n
          }
        })
        e.splice(i, 0, s)
      }
      function log() {
        return (
          'object' === typeof console &&
          console.log &&
          Function.prototype.apply.call(console.log, console, arguments)
        )
      }
      function save(e) {
        try {
          if (null == e) {
            r.storage.removeItem('debug')
          } else {
            r.storage.debug = e
          }
        } catch (e) {}
      }
      function load() {
        var e
        try {
          e = r.storage.debug
        } catch (e) {}
        if (!e && typeof process !== 'undefined' && 'env' in process) {
          e = process.env.DEBUG
        }
        return e
      }
      r.enable(load())
      function localstorage() {
        try {
          return window.localStorage
        } catch (e) {}
      }
    },
    891: (e, r, t) => {
      r = e.exports = createDebug.debug = createDebug['default'] = createDebug
      r.coerce = coerce
      r.disable = disable
      r.enable = enable
      r.enabled = enabled
      r.humanize = t(111)
      r.names = []
      r.skips = []
      r.formatters = {}
      var s
      function selectColor(e) {
        var t = 0,
          s
        for (s in e) {
          t = (t << 5) - t + e.charCodeAt(s)
          t |= 0
        }
        return r.colors[Math.abs(t) % r.colors.length]
      }
      function createDebug(e) {
        function debug() {
          if (!debug.enabled) return
          var e = debug
          var t = +new Date()
          var n = t - (s || t)
          e.diff = n
          e.prev = s
          e.curr = t
          s = t
          var i = new Array(arguments.length)
          for (var a = 0; a < i.length; a++) {
            i[a] = arguments[a]
          }
          i[0] = r.coerce(i[0])
          if ('string' !== typeof i[0]) {
            i.unshift('%O')
          }
          var o = 0
          i[0] = i[0].replace(/%([a-zA-Z%])/g, function (t, s) {
            if (t === '%%') return t
            o++
            var n = r.formatters[s]
            if ('function' === typeof n) {
              var a = i[o]
              t = n.call(e, a)
              i.splice(o, 1)
              o--
            }
            return t
          })
          r.formatArgs.call(e, i)
          var c = debug.log || r.log || console.log.bind(console)
          c.apply(e, i)
        }
        debug.namespace = e
        debug.enabled = r.enabled(e)
        debug.useColors = r.useColors()
        debug.color = selectColor(e)
        if ('function' === typeof r.init) {
          r.init(debug)
        }
        return debug
      }
      function enable(e) {
        r.save(e)
        r.names = []
        r.skips = []
        var t = (typeof e === 'string' ? e : '').split(/[\s,]+/)
        var s = t.length
        for (var n = 0; n < s; n++) {
          if (!t[n]) continue
          e = t[n].replace(/\*/g, '.*?')
          if (e[0] === '-') {
            r.skips.push(new RegExp('^' + e.substr(1) + '$'))
          } else {
            r.names.push(new RegExp('^' + e + '$'))
          }
        }
      }
      function disable() {
        r.enable('')
      }
      function enabled(e) {
        var t, s
        for (t = 0, s = r.skips.length; t < s; t++) {
          if (r.skips[t].test(e)) {
            return false
          }
        }
        for (t = 0, s = r.names.length; t < s; t++) {
          if (r.names[t].test(e)) {
            return true
          }
        }
        return false
      }
      function coerce(e) {
        if (e instanceof Error) return e.stack || e.message
        return e
      }
    },
    372: (e, r, t) => {
      if (typeof process !== 'undefined' && process.type === 'renderer') {
        e.exports = t(547)
      } else {
        e.exports = t(217)
      }
    },
    217: (e, r, t) => {
      var s = t(224)
      var n = t(837)
      r = e.exports = t(891)
      r.init = init
      r.log = log
      r.formatArgs = formatArgs
      r.save = save
      r.load = load
      r.useColors = useColors
      r.colors = [6, 2, 3, 4, 5, 1]
      r.inspectOpts = Object.keys(process.env)
        .filter(function (e) {
          return /^debug_/i.test(e)
        })
        .reduce(function (e, r) {
          var t = r
            .substring(6)
            .toLowerCase()
            .replace(/_([a-z])/g, function (e, r) {
              return r.toUpperCase()
            })
          var s = process.env[r]
          if (/^(yes|on|true|enabled)$/i.test(s)) s = true
          else if (/^(no|off|false|disabled)$/i.test(s)) s = false
          else if (s === 'null') s = null
          else s = Number(s)
          e[t] = s
          return e
        }, {})
      var i = parseInt(process.env.DEBUG_FD, 10) || 2
      if (1 !== i && 2 !== i) {
        n.deprecate(function () {},
        'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
      }
      var a =
        1 === i
          ? process.stdout
          : 2 === i
          ? process.stderr
          : createWritableStdioStream(i)
      function useColors() {
        return 'colors' in r.inspectOpts
          ? Boolean(r.inspectOpts.colors)
          : s.isatty(i)
      }
      r.formatters.o = function (e) {
        this.inspectOpts.colors = this.useColors
        return n
          .inspect(e, this.inspectOpts)
          .split('\n')
          .map(function (e) {
            return e.trim()
          })
          .join(' ')
      }
      r.formatters.O = function (e) {
        this.inspectOpts.colors = this.useColors
        return n.inspect(e, this.inspectOpts)
      }
      function formatArgs(e) {
        var t = this.namespace
        var s = this.useColors
        if (s) {
          var n = this.color
          var i = '  [3' + n + ';1m' + t + ' ' + '[0m'
          e[0] = i + e[0].split('\n').join('\n' + i)
          e.push('[3' + n + 'm+' + r.humanize(this.diff) + '[0m')
        } else {
          e[0] = new Date().toUTCString() + ' ' + t + ' ' + e[0]
        }
      }
      function log() {
        return a.write(n.format.apply(n, arguments) + '\n')
      }
      function save(e) {
        if (null == e) {
          delete process.env.DEBUG
        } else {
          process.env.DEBUG = e
        }
      }
      function load() {
        return process.env.DEBUG
      }
      function createWritableStdioStream(e) {
        var r
        var n = process.binding('tty_wrap')
        switch (n.guessHandleType(e)) {
          case 'TTY':
            r = new s.WriteStream(e)
            r._type = 'tty'
            if (r._handle && r._handle.unref) {
              r._handle.unref()
            }
            break
          case 'FILE':
            var i = t(147)
            r = new i.SyncWriteStream(e, { autoClose: false })
            r._type = 'fs'
            break
          case 'PIPE':
          case 'TCP':
            var a = t(808)
            r = new a.Socket({ fd: e, readable: false, writable: true })
            r.readable = false
            r.read = null
            r._type = 'pipe'
            if (r._handle && r._handle.unref) {
              r._handle.unref()
            }
            break
          default:
            throw new Error('Implement me. Unknown stream file type!')
        }
        r.fd = e
        r._isStdio = true
        return r
      }
      function init(e) {
        e.inspectOpts = {}
        var t = Object.keys(r.inspectOpts)
        for (var s = 0; s < t.length; s++) {
          e.inspectOpts[t[s]] = r.inspectOpts[t[s]]
        }
      }
      r.enable(load())
    },
    780: (e, r) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      var t
      ;(function (e) {
        e[(e['TOP_LEFT'] = 1)] = 'TOP_LEFT'
        e[(e['TOP_RIGHT'] = 2)] = 'TOP_RIGHT'
        e[(e['BOTTOM_RIGHT'] = 3)] = 'BOTTOM_RIGHT'
        e[(e['BOTTOM_LEFT'] = 4)] = 'BOTTOM_LEFT'
        e[(e['LEFT_TOP'] = 5)] = 'LEFT_TOP'
        e[(e['RIGHT_TOP'] = 6)] = 'RIGHT_TOP'
        e[(e['RIGHT_BOTTOM'] = 7)] = 'RIGHT_BOTTOM'
        e[(e['LEFT_BOTTOM'] = 8)] = 'LEFT_BOTTOM'
      })((t = r.Orientation || (r.Orientation = {})))
    },
    330: (e, r, t) => {
      'use strict'
      Object.defineProperty(r, '__esModule', { value: true })
      const s = t(781)
      const n = t(300)
      class StreamParserWritableClass extends s.Writable {
        constructor() {
          super()
          n(this)
        }
      }
      r.StreamParserWritable = StreamParserWritableClass
    },
    111: (e) => {
      var r = 1e3
      var t = r * 60
      var s = t * 60
      var n = s * 24
      var i = n * 365.25
      e.exports = function (e, r) {
        r = r || {}
        var t = typeof e
        if (t === 'string' && e.length > 0) {
          return parse(e)
        } else if (t === 'number' && isNaN(e) === false) {
          return r.long ? fmtLong(e) : fmtShort(e)
        }
        throw new Error(
          'val is not a non-empty string or a valid number. val=' +
            JSON.stringify(e)
        )
      }
      function parse(e) {
        e = String(e)
        if (e.length > 100) {
          return
        }
        var a =
          /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
            e
          )
        if (!a) {
          return
        }
        var o = parseFloat(a[1])
        var c = (a[2] || 'ms').toLowerCase()
        switch (c) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return o * i
          case 'days':
          case 'day':
          case 'd':
            return o * n
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return o * s
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return o * t
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return o * r
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return o
          default:
            return undefined
        }
      }
      function fmtShort(e) {
        if (e >= n) {
          return Math.round(e / n) + 'd'
        }
        if (e >= s) {
          return Math.round(e / s) + 'h'
        }
        if (e >= t) {
          return Math.round(e / t) + 'm'
        }
        if (e >= r) {
          return Math.round(e / r) + 's'
        }
        return e + 'ms'
      }
      function fmtLong(e) {
        return (
          plural(e, n, 'day') ||
          plural(e, s, 'hour') ||
          plural(e, t, 'minute') ||
          plural(e, r, 'second') ||
          e + ' ms'
        )
      }
      function plural(e, r, t) {
        if (e < r) {
          return
        }
        if (e < r * 1.5) {
          return Math.floor(e / r) + ' ' + t
        }
        return Math.ceil(e / r) + ' ' + t + 's'
      }
    },
    300: (e, r, t) => {
      var s = t(491)
      var n = t(372)('stream-parser')
      e.exports = Parser
      var i = -1
      var a = 0
      var o = 1
      var c = 2
      function Parser(e) {
        var r = e && 'function' == typeof e._transform
        var t = e && 'function' == typeof e._write
        if (!r && !t)
          throw new Error('must pass a Writable or Transform stream in')
        n('extending Parser into stream')
        e._bytes = _bytes
        e._skipBytes = _skipBytes
        if (r) e._passthrough = _passthrough
        if (r) {
          e._transform = transform
        } else {
          e._write = write
        }
      }
      function init(e) {
        n('initializing parser stream')
        e._parserBytesLeft = 0
        e._parserBuffers = []
        e._parserBuffered = 0
        e._parserState = i
        e._parserCallback = null
        if ('function' == typeof e.push) {
          e._parserOutput = e.push.bind(e)
        }
        e._parserInit = true
      }
      function _bytes(e, r) {
        s(!this._parserCallback, 'there is already a "callback" set!')
        s(
          isFinite(e) && e > 0,
          'can only buffer a finite number of bytes > 0, got "' + e + '"'
        )
        if (!this._parserInit) init(this)
        n('buffering %o bytes', e)
        this._parserBytesLeft = e
        this._parserCallback = r
        this._parserState = a
      }
      function _skipBytes(e, r) {
        s(!this._parserCallback, 'there is already a "callback" set!')
        s(e > 0, 'can only skip > 0 bytes, got "' + e + '"')
        if (!this._parserInit) init(this)
        n('skipping %o bytes', e)
        this._parserBytesLeft = e
        this._parserCallback = r
        this._parserState = o
      }
      function _passthrough(e, r) {
        s(!this._parserCallback, 'There is already a "callback" set!')
        s(e > 0, 'can only pass through > 0 bytes, got "' + e + '"')
        if (!this._parserInit) init(this)
        n('passing through %o bytes', e)
        this._parserBytesLeft = e
        this._parserCallback = r
        this._parserState = c
      }
      function write(e, r, t) {
        if (!this._parserInit) init(this)
        n('write(%o bytes)', e.length)
        if ('function' == typeof r) t = r
        u(this, e, null, t)
      }
      function transform(e, r, t) {
        if (!this._parserInit) init(this)
        n('transform(%o bytes)', e.length)
        if ('function' != typeof r) {
          r = this._parserOutput
        }
        u(this, e, r, t)
      }
      function _data(e, r, t, s) {
        if (e._parserBytesLeft <= 0) {
          return s(new Error('got data but not currently parsing anything'))
        }
        if (r.length <= e._parserBytesLeft) {
          return function () {
            return process(e, r, t, s)
          }
        } else {
          return function () {
            var n = r.slice(0, e._parserBytesLeft)
            return process(e, n, t, function (i) {
              if (i) return s(i)
              if (r.length > n.length) {
                return function () {
                  return _data(e, r.slice(n.length), t, s)
                }
              }
            })
          }
        }
      }
      function process(e, r, t, s) {
        e._parserBytesLeft -= r.length
        n('%o bytes left for stream piece', e._parserBytesLeft)
        if (e._parserState === a) {
          e._parserBuffers.push(r)
          e._parserBuffered += r.length
        } else if (e._parserState === c) {
          t(r)
        }
        if (0 === e._parserBytesLeft) {
          var o = e._parserCallback
          if (o && e._parserState === a && e._parserBuffers.length > 1) {
            r = Buffer.concat(e._parserBuffers, e._parserBuffered)
          }
          if (e._parserState !== a) {
            r = null
          }
          e._parserCallback = null
          e._parserBuffered = 0
          e._parserState = i
          e._parserBuffers.splice(0)
          if (o) {
            var u = []
            if (r) {
              u.push(r)
            } else {
            }
            if (t) {
              u.push(t)
            }
            var f = o.length > u.length
            if (f) {
              u.push(trampoline(s))
            }
            var l = o.apply(e, u)
            if (!f || s === l) return s
          }
        } else {
          return s
        }
      }
      var u = trampoline(_data)
      function trampoline(e) {
        return function () {
          var r = e.apply(this, arguments)
          while ('function' == typeof r) {
            r = r()
          }
          return r
        }
      }
    },
    491: (e) => {
      'use strict'
      e.exports = require('assert')
    },
    147: (e) => {
      'use strict'
      e.exports = require('fs')
    },
    808: (e) => {
      'use strict'
      e.exports = require('net')
    },
    781: (e) => {
      'use strict'
      e.exports = require('stream')
    },
    224: (e) => {
      'use strict'
      e.exports = require('tty')
    },
    837: (e) => {
      'use strict'
      e.exports = require('util')
    },
  }
  var r = {}
  function __nccwpck_require__(t) {
    var s = r[t]
    if (s !== undefined) {
      return s.exports
    }
    var n = (r[t] = { exports: {} })
    var i = true
    try {
      e[t](n, n.exports, __nccwpck_require__)
      i = false
    } finally {
      if (i) delete r[t]
    }
    return n.exports
  }
  if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/'
  var t = {}
  ;(() => {
    'use strict'
    var e = t
    Object.defineProperty(e, '__esModule', { value: true })
    const r = __nccwpck_require__(781)
    const s = __nccwpck_require__(780)
    e.Orientation = s.Orientation
    const n = __nccwpck_require__(330)
    const noop = () => {}
    class EXIFOrientationParser extends n.StreamParserWritable {
      constructor() {
        super()
        this._bytes(4, this.onSignature.bind(this))
      }
      onSignature(e) {
        const r = e.readUInt16BE(0)
        const t = e.readUInt16BE(2)
        if (r === 65496) {
          this.onJPEGMarker(e.slice(2))
        } else if ((r === 18761 && t === 10752) || (r === 19789 && t === 42)) {
          this._bytes(4, (r) => {
            this.onTIFFHeader(Buffer.concat([e, r]))
          })
        } else {
          this._skipBytes(Infinity, noop)
        }
      }
      onJPEGMarker(e) {
        const r = e.readUInt16BE(0)
        if (r === 65505) {
          this._bytes(8, (e) => {
            const r =
              e.readUInt16BE(2) === 17784 &&
              e.readUInt16BE(4) === 26982 &&
              e.readUInt16BE(6) === 0
            if (r) {
              this._bytes(8, this.onTIFFHeader.bind(this))
            } else {
              const r = e.readUInt16BE(0)
              const t = r - 6
              this._skipBytes(t, () => {
                this._bytes(2, this.onJPEGMarker.bind(this))
              })
            }
          })
        } else if (65504 <= r && r <= 65519) {
          this._bytes(2, (r) => {
            const t = r.readUInt16BE(0)
            const s = t - e.length
            this._skipBytes(s, () => {
              this._bytes(2, this.onJPEGMarker.bind(this))
            })
          })
        } else {
          this._skipBytes(Infinity, noop)
        }
      }
      onTIFFHeader(e) {
        const r = e.readUInt16BE(0) === 18761
        const readUInt16 = (e, t) => (r ? e.readUInt16LE(t) : e.readUInt16BE(t))
        const readUInt32 = (e, t) => (r ? e.readUInt32LE(t) : e.readUInt32BE(t))
        const t = readUInt32(e, 4)
        const s = t - e.length
        const consumeIDFBlock = () => {
          this._bytes(2, (e) => {
            let r = readUInt16(e, 0)
            const consumeIFDFields = () => {
              if (r-- > 0) {
                this._bytes(12, (e) => {
                  const r = readUInt16(e, 0)
                  if (r === 274) {
                    const r = e.slice(8, 12)
                    const t = readUInt16(r, 0)
                    if (1 <= t && t <= 8) {
                      this.emit('orientation', t)
                    } else {
                      this.emit(
                        'error',
                        new Error('Unexpected Orientation value')
                      )
                    }
                    this._skipBytes(Infinity, noop)
                  } else {
                    consumeIFDFields()
                  }
                })
              } else {
                this._skipBytes(Infinity, noop)
              }
            }
            consumeIFDFields()
          })
        }
        if (s > 0) {
          this._skipBytes(s, consumeIDFBlock)
        } else {
          consumeIDFBlock()
        }
      }
    }
    e.EXIFOrientationParser = EXIFOrientationParser
    function getOrientation(e) {
      return new Promise((t, n) => {
        const i = new EXIFOrientationParser()
          .once('error', onError)
          .once('finish', onFinish)
          .once('orientation', onOrientation)
        let a = false
        function onError(e) {
          i.removeListener('finish', onFinish)
          i.removeListener('orientation', onOrientation)
          if (!a) {
            a = true
            n(e)
          }
        }
        function onFinish() {
          i.removeListener('error', onError)
          i.removeListener('orientation', onOrientation)
          if (!a) {
            a = true
            t(s.Orientation.TOP_LEFT)
          }
        }
        function onOrientation(e) {
          i.removeListener('error', onError)
          i.removeListener('finish', onFinish)
          if (!a) {
            a = true
            t(e)
          }
        }
        if (Buffer.isBuffer(e)) {
          i.end(e)
        } else if (e instanceof r.Readable) {
          e.pipe(i)
        } else {
          throw new TypeError('Unexpected input type')
        }
      })
    }
    e.getOrientation = getOrientation
  })()
  module.exports = t
})()