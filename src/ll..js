!(function (e) {
  window.LibAVWebCodecs = e()
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).LibAVWebCodecs = e();
  }
})(function () {
  var e = {};
  Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.EncodedAudioChunk = void 0);
  var t = (function () {
    function e(e) {
      (this.type = e.type),
        (this.timestamp = e.timestamp),
        (this.duration = e.duration || 0);
      var t = (this._data = new Uint8Array(
        e.data.buffer || e.data,
        e.data.byteOffset || 0
      ));
      this.byteLength = t.byteLength;
    }
    return (
      (e.prototype._libavGetData = function () {
        return this._data;
      }),
      (e.prototype.copyTo = function (e) {
        new Uint8Array(e.buffer || e, e.byteOffset || 0).set(this._data);
      }),
      e
    );
  })();
  e.EncodedAudioChunk = t;
  var r = {};
  Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.isInterleaved = r.AudioData = void 0);
  var n = (function () {
    function e(e) {
      var t = (this.format = e.format),
        r = (this.sampleRate = e.sampleRate),
        n = (this.numberOfFrames = e.numberOfFrames);
      (this.numberOfChannels = e.numberOfChannels),
        (this.timestamp = e.timestamp);
      this._data = o(t, e.data.buffer || e.data, e.data.byteOffset || 0);
      this.duration = (n / r) * 1e6;
    }
    return (
      (e.prototype._libavGetData = function () {
        return this._data;
      }),
      (e.prototype.allocationSize = function (e) {
        if (null === this._data)
          throw new DOMException("Detached", "InvalidStateError");
        var t = this._computeCopyElementCount(e),
          r = this.format;
        return e.format && (r = e.format), i(r) * t;
      }),
      (e.prototype._computeCopyElementCount = function (e) {
        var t = this.format;
        e.format && (t = e.format);
        var r = a(t);
        if (r) {
          if (e.planeIndex > 0) throw new RangeError("Invalid plane");
        } else if (e.planeIndex >= this.numberOfChannels)
          throw new RangeError("Invalid plane");
        if (this.format !== t && "f32-planar" !== t)
          throw new DOMException(
            "Only conversion to f32-planar is supported",
            "NotSupportedError"
          );
        var n = this.numberOfFrames,
          o = e.frameOffset || 0;
        if (o >= n) throw new RangeError("Frame offset out of range");
        var i = n - o;
        if ("frameCount" in e) {
          if (e.frameCount >= i)
            throw new RangeError("Frame count out of range");
          i = e.frameCount;
        }
        var s = i;
        return r && (s *= this.numberOfChannels), s;
      }),
      (e.prototype.copyTo = function (e, t) {
        if (null === this._data)
          throw new DOMException("Detached", "InvalidStateError");
        var r = this._computeCopyElementCount(t),
          n = this.format;
        if ((t.format && (n = t.format), i(n) * r > e.byteLength))
          throw new RangeError("Buffer too small");
        var s = this._data.subarray(t.planeIndex * this.numberOfFrames),
          c = t.frameOffset || 0,
          u = this.numberOfChannels;
        if (this.format === n) {
          var d = o(n, e.buffer || e, e.byteOffset || 0);
          a(n)
            ? d.set(s.subarray(c * u, c * u + r))
            : d.set(s.subarray(c, c + r));
        } else {
          var l = o(n, e.buffer || e, e.byteOffset || 0),
            f = 0,
            h = 1;
          switch (this.format) {
            case "u8":
            case "u8-planar":
              (f = 128), (h = 128);
              break;
            case "s16":
            case "s16-planar":
              h = 32768;
              break;
            case "s32":
            case "s32-planar":
              h = 2147483648;
          }
          if (a(this.format))
            for (var p = t.planeIndex + c * u, _ = 0; _ < r; p += u, _++)
              l[_] = (s[p] - f) / h;
          else for (p = c, _ = 0; _ < r; p++, _++) l[_] = (s[p] - f) / h;
        }
      }),
      (e.prototype.clone = function () {
        if (null === this._data)
          throw new DOMException("Detached", "InvalidStateError");
        return new e({
          format: this.format,
          sampleRate: this.sampleRate,
          numberOfFrames: this.numberOfFrames,
          numberOfChannels: this.numberOfChannels,
          timestamp: this.timestamp,
          data: this._data,
        });
      }),
      (e.prototype.close = function () {
        this._data = null;
      }),
      e
    );
  })();
  function o(e, t, r) {
    switch (e) {
      case "u8":
      case "u8-planar":
        return new Uint8Array(t, r);
      case "s16":
      case "s16-planar":
        return new Int16Array(t, r);
      case "s32":
      case "s32-planar":
        return new Int32Array(t, r);
      case "f32":
      case "f32-planar":
        return new Float32Array(t, r);
      default:
        throw new TypeError("Invalid AudioSampleFormat");
    }
  }
  function i(e) {
    switch (e) {
      case "u8":
      case "u8-planar":
        return 1;
      case "s16":
      case "s16-planar":
        return 2;
      case "s32":
      case "s32-planar":
      case "f32":
      case "f32-planar":
        return 4;
      default:
        throw new TypeError("Invalid AudioSampleFormat");
    }
  }
  function a(e) {
    switch (e) {
      case "u8":
      case "s16":
      case "s32":
      case "f32":
        return !0;
      case "u8-planar":
      case "s16-planar":
      case "s32-planar":
      case "f32-planar":
        return !1;
      default:
        throw new TypeError("Invalid AudioSampleFormat");
    }
  }
  (r.AudioData = n), (r.isInterleaved = a);
  var s = {},
    c =
      (this && this.__awaiter) ||
      function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              c(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          c((n = n.apply(e, t || [])).next());
        });
      },
    u =
      (this && this.__generator) ||
      function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: s(0), throw: s(1), return: s(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function s(s) {
          return function (c) {
            return (function (s) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i && ((i = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & s[0]
                          ? n.return
                          : s[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, s[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                    case 0:
                    case 1:
                      o = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (n = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !((o = a.trys),
                        (o = o.length > 0 && o[o.length - 1]) ||
                          (6 !== s[0] && 2 !== s[0]))
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = s);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(s);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = t.call(e, a);
                } catch (e) {
                  (s = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, c]);
          };
        }
      };
  Object.defineProperty(s, "__esModule", { value: !0 }),
    (s.encoder =
      s.decoder =
      s.load =
      s.free =
      s.get =
      s.setLibAVOptions =
      s.encoders =
      s.decoders =
        void 0);
  var d = [],
    l = {};
  function f() {
    return c(this, void 0, void 0, function () {
      return u(this, function (e) {
        switch (e.label) {
          case 0:
            return d.length ? [2, d.shift()] : [4, LibAV.LibAV(l)];
          case 1:
            return [2, e.sent()];
        }
      });
    });
  }
  function h(e) {
    d.push(e);
  }
  function p(e) {
    return c(this, void 0, void 0, function () {
      var t, r, n, o, i, a, s;
      return u(this, function (c) {
        switch (c.label) {
          case 0:
            return [4, f()];
          case 1:
            (t = c.sent()),
              (r = []),
              (n = 0),
              (o = [
                ["flac", "flac"],
                ["libopus", "opus"],
                ["libvorbis", "vorbis"],
                ["libaom-av1", "av01"],
                ["libvpx-vp9", "vp09"],
                ["libvpx", "vp8"],
              ]),
              (c.label = 2);
          case 2:
            return n < o.length
              ? ((i = o[n]),
                (a = i[0]),
                (s = i[1]),
                e ? [4, t.avcodec_find_encoder_by_name(a)] : [3, 4])
              : [3, 7];
          case 3:
            return c.sent() && r.push(s), [3, 6];
          case 4:
            return [4, t.avcodec_find_decoder_by_name(a)];
          case 5:
            c.sent() && r.push(s), (c.label = 6);
          case 6:
            return n++, [3, 2];
          case 7:
            return h(t), [2, r];
        }
      });
    });
  }
  (s.decoders = null),
    (s.encoders = null),
    (s.setLibAVOptions = function (e) {
      l = e;
    }),
    (s.get = f),
    (s.free = h),
    (s.load = function () {
      return c(this, void 0, void 0, function () {
        return u(this, function (e) {
          switch (e.label) {
            case 0:
              return [4, p(!1)];
            case 1:
              return (s.decoders = e.sent()), [4, p(!0)];
            case 2:
              return (s.encoders = e.sent()), [2];
          }
        });
      });
    }),
    (s.decoder = function (e) {
      if ("string" == typeof e) {
        var t = (e = e.replace(/\..*/, ""));
        switch (e) {
          case "flac":
            break;
          case "opus":
            t = "libopus";
            break;
          case "vorbis":
            t = "libvorbis";
            break;
          case "av01":
            t = "libaom-av1";
            break;
          case "vp09":
            t = "libvpx-vp9";
            break;
          case "vp8":
            t = "libvpx";
            break;
          case "mp3":
          case "mp4a":
          case "ulaw":
          case "alaw":
          case "avc1":
            return null;
          default:
            throw new TypeError("Unrecognized codec");
        }
        return s.decoders.indexOf(e) >= 0 ? { codec: t } : null;
      }
      return e.libavjs;
    }),
    (s.encoder = function (e, t) {
      if ("string" == typeof e) {
        var r = e.split("."),
          n = (e = r[0]),
          o = {},
          i = {},
          a = !1;
        switch (e) {
          case "flac":
            (o.sample_fmt = 2), (o.bit_rate = 0);
            break;
          case "opus":
            (n = "libopus"), (o.sample_fmt = 3), (o.sample_rate = 48e3);
            break;
          case "vorbis":
            (n = "libvorbis"), (o.sample_fmt = 8);
            break;
          case "av01":
            if (
              ((a = !0),
              (n = "libaom-av1"),
              "realtime" === t.latencyMode &&
                ((i.usage = "realtime"), (i["cpu-used"] = "8")),
              !(function (e, t) {
                if (e[1]) {
                  var r = +e[1];
                  if (!(r >= 0 && r <= 2))
                    throw new TypeError("Invalid AV1 profile");
                  t.profile = r;
                }
                if (e[2]) {
                  var n = +e[2];
                  if (!(n >= 0 && n <= 23))
                    throw new TypeError("Invalid AV1 level");
                  t.level = n;
                }
                if (e[3])
                  switch (e[3]) {
                    case "M":
                      break;
                    case "H":
                      if (t.level >= 8) return !1;
                      throw new TypeError(
                        "The AV1 high tier is only available for level 4.0 and up"
                      );
                    default:
                      throw new TypeError("Invalid AV1 tier");
                  }
                if (e[4]) {
                  var o = +e[3];
                  if (10 === o || 12 === o) return !1;
                  if (8 !== o) throw new TypeError("Invalid AV1 bit depth");
                }
                if (e[5])
                  switch (e[5]) {
                    case "0":
                      break;
                    case "1":
                      return !1;
                    default:
                      throw new TypeError("Invalid AV1 monochrome flag");
                  }
                if (e[6])
                  switch (e[6]) {
                    case "000":
                      t.pix_fmt = 5;
                      break;
                    case "100":
                      t.pix_fmt = 4;
                      break;
                    case "110":
                      t.pix_fmt = 0;
                      break;
                    case "111":
                      return !1;
                    default:
                      throw new TypeError("Invalid AV1 subsampling mode");
                  }
                return !0;
              })(r, o))
            )
              return null;
            break;
          case "vp09":
            if (
              ((a = !0),
              (n = "libvpx-vp9"),
              "realtime" === t.latencyMode &&
                ((i.quality = "realtime"), (i["cpu-used"] = "8")),
              !(function (e, t) {
                if (e[1]) {
                  var r = +e[1];
                  if (!(r >= 0 && r <= 3))
                    throw new TypeError("Invalid VP9 profile");
                  t.profile = r;
                }
                if (e[2]) {
                  var n = [+e[2][0], +e[2][1]];
                  if (n[0] >= 1 && n[0] <= 4) {
                    if (!(n[1] >= 0 && n[1] <= 1))
                      throw new TypeError("Invalid VP9 level");
                  } else {
                    if (!(n[0] >= 5 && n[0] <= 6))
                      throw new TypeError("Invalid VP9 level");
                    if (!(n[1] >= 0 && n[1] <= 2))
                      throw new TypeError("Invalid VP9 level");
                  }
                  t.level = +e[2];
                }
                if (e[3]) {
                  var o = +e[3];
                  if (10 === o || 12 === o) return !1;
                  if (8 !== o) throw new TypeError("Invalid VP9 bit depth");
                }
                if (e[4]) {
                  switch (+e[4]) {
                    case 0:
                    case 1:
                      t.pix_fmt = 0;
                      break;
                    case 2:
                      t.pix_fmt = 4;
                      break;
                    case 3:
                      t.pix_fmt = 5;
                      break;
                    default:
                      throw new TypeError(
                        "Invalid VP9 chroma subsampling format"
                      );
                  }
                }
                return !0;
              })(r, o))
            )
              return null;
            break;
          case "vp8":
            (a = !0),
              (n = "libvpx"),
              "realtime" === t.latencyMode &&
                ((i.quality = "realtime"), (i["cpu-used"] = "8"));
            break;
          case "mp3":
          case "mp4a":
          case "ulaw":
          case "alaw":
          case "avc1":
            return null;
          default:
            throw new TypeError("Unrecognized codec");
        }
        if (!(s.encoders.indexOf(e) >= 0)) return null;
        if (a) {
          "number" != typeof o.pix_fmt && (o.pix_fmt = 0);
          var c = (o.width = t.width),
            u = (o.height = t.height);
          t.framerate &&
            ((o.framerate_num = Math.round(t.framerate)),
            (o.framerate_den = 1));
          var d = t.displayWidth || t.width,
            l = t.displayHeight || t.height;
          (d === c && l === u) ||
            ((o.sample_aspect_ratio_num = d * u),
            (o.sample_aspect_ratio_den = l * c));
        } else if (
          (o.sample_rate || (o.sample_rate = t.sampleRate || 48e3),
          t.numberOfChannels)
        ) {
          var f = t.numberOfChannels;
          o.channel_layout = 1 === f ? 4 : (1 << f) - 1;
        }
        return (
          "number" != typeof o.bit_rate &&
            t.bitrate &&
            (o.bit_rate = t.bitrate),
          { codec: n, ctx: o, options: i }
        );
      }
      return e.libavjs;
    });
  var _ = {};
  Object.defineProperty(_, "__esModule", { value: !0 }),
    (_.cloneConfig = void 0),
    (_.cloneConfig = function (e, t) {
      for (var r = {}, n = 0, o = t; n < o.length; n++) {
        var i = o[n];
        i in e && (r[i] = e[i]);
      }
      return r;
    });
  var v = {},
    b =
      (this && this.__awaiter) ||
      function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              c(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          c((n = n.apply(e, t || [])).next());
        });
      },
    m =
      (this && this.__generator) ||
      function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: s(0), throw: s(1), return: s(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function s(s) {
          return function (c) {
            return (function (s) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i && ((i = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & s[0]
                          ? n.return
                          : s[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, s[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                    case 0:
                    case 1:
                      o = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (n = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !((o = a.trys),
                        (o = o.length > 0 && o[o.length - 1]) ||
                          (6 !== s[0] && 2 !== s[0]))
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = s);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(s);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = t.call(e, a);
                } catch (e) {
                  (s = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, c]);
          };
        }
      };
  Object.defineProperty(v, "__esModule", { value: !0 }),
    (v.AudioDecoder = void 0);
  var w = (function () {
    function e(e) {
      (this._output = e.output),
        (this._error = e.error),
        (this.state = "unconfigured"),
        (this.decodeQueueSize = 0),
        (this._p = Promise.all([])),
        (this._libav = null),
        (this._codec = this._c = this._pkt = this._frame = 0);
    }
    return (
      (e.prototype.configure = function (e) {
        var t = this,
          r = this;
        if ("closed" === this.state)
          throw new DOMException("Decoder is closed", "InvalidStateError");
        this._libav &&
          (this._p = this._p.then(function () {
            return t._free();
          })),
          (this.state = "configured"),
          (this._p = this._p
            .then(function () {
              return b(this, void 0, void 0, function () {
                var t, n, o, i;
                return m(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return (t = s.decoder(e.codec))
                        ? ((o = r), [4, s.get()])
                        : [3, 4];
                    case 1:
                      return [
                        4,
                        (n = o._libav = a.sent()).ff_init_decoder(t.codec),
                      ];
                    case 2:
                      return (
                        (i = a.sent()),
                        (r._codec = i[0]),
                        (r._c = i[1]),
                        (r._pkt = i[2]),
                        (r._frame = i[3]),
                        [4, n.AVCodecContext_time_base_s(r._c, 1, 1e3)]
                      );
                    case 3:
                      return a.sent(), [3, 5];
                    case 4:
                      r._closeAudioDecoder(
                        new DOMException(
                          "Unsupported codec",
                          "NotSupportedError"
                        )
                      ),
                        (a.label = 5);
                    case 5:
                      return [2];
                  }
                });
              });
            })
            .catch(this._error));
      }),
      (e.prototype._free = function () {
        return b(this, void 0, void 0, function () {
          return m(this, function (e) {
            switch (e.label) {
              case 0:
                return this._c
                  ? [
                      4,
                      this._libav.ff_free_decoder(
                        this._c,
                        this._pkt,
                        this._frame
                      ),
                    ]
                  : [3, 2];
              case 1:
                e.sent(),
                  (this._codec = this._c = this._pkt = this._frame = 0),
                  (e.label = 2);
              case 2:
                return (
                  this._libav && (s.free(this._libav), (this._libav = null)),
                  [2]
                );
            }
          });
        });
      }),
      (e.prototype._closeAudioDecoder = function (e) {
        var t = this;
        this._resetAudioDecoder(e),
          (this.state = "closed"),
          (this._p = this._p.then(function () {
            return t._free();
          })),
          "AbortError" !== e.name &&
            (this._p = this._p.then(function () {
              t._error(e);
            }));
      }),
      (e.prototype._resetAudioDecoder = function (e) {
        var t = this;
        if ("closed" === this.state)
          throw new DOMException("Decoder closed", "InvalidStateError");
        (this.state = "unconfigured"),
          (this._p = this._p.then(function () {
            return t._free();
          }));
      }),
      (e.prototype.decode = function (e) {
        var t = this;
        if ("configured" !== this.state)
          throw new DOMException("Unconfigured", "InvalidStateError");
        this.decodeQueueSize++,
          (this._p = this._p
            .then(function () {
              return b(this, void 0, void 0, function () {
                var r, n, o, i, a, s, c, u, d, l;
                return m(this, function (f) {
                  switch (f.label) {
                    case 0:
                      (r = t._libav),
                        (n = t._c),
                        (o = t._pkt),
                        (i = t._frame),
                        (a = null),
                        (f.label = 1);
                    case 1:
                      return (
                        f.trys.push([1, 3, , 4]),
                        (s = Math.floor(e.timestamp / 1e3)),
                        (c = s % 4294967296),
                        (u = ~~(s / 4294967296)),
                        (d = {
                          data: e._libavGetData(),
                          pts: c,
                          ptshi: u,
                          dts: c,
                          dtshi: u,
                        }),
                        e.duration &&
                          ((d.duration = Math.floor(e.duration / 1e3)),
                          (d.durationhi = 0)),
                        [4, r.ff_decode_multi(n, o, i, [d])]
                      );
                    case 2:
                      return (a = f.sent()), [3, 4];
                    case 3:
                      return (
                        (l = f.sent()),
                        (t._p = t._p.then(function () {
                          t._closeAudioDecoder(l);
                        })),
                        [3, 4]
                      );
                    case 4:
                      return (
                        t.decodeQueueSize--, a && t._outputAudioData(a), [2]
                      );
                  }
                });
              });
            })
            .catch(this._error));
      }),
      (e.prototype._outputAudioData = function (e) {
        for (var t = this._libav, n = 0, o = e; n < o.length; n++) {
          var i = o[n],
            a = void 0,
            s = !1;
          switch (i.format) {
            case t.AV_SAMPLE_FMT_U8:
              a = "u8";
              break;
            case t.AV_SAMPLE_FMT_S16:
              a = "s16";
              break;
            case t.AV_SAMPLE_FMT_S32:
              a = "s32";
              break;
            case t.AV_SAMPLE_FMT_FLT:
              a = "f32";
              break;
            case t.AV_SAMPLE_FMT_U8P:
              (a = "u8"), (s = !0);
              break;
            case t.AV_SAMPLE_FMT_S16P:
              (a = "s16"), (s = !0);
              break;
            case t.AV_SAMPLE_FMT_S32P:
              (a = "s32"), (s = !0);
              break;
            case t.AV_SAMPLE_FMT_FLTP:
              (a = "f32"), (s = !0);
              break;
            default:
              throw new DOMException(
                "Unsupported libav format!",
                "EncodingError"
              );
          }
          var c = i.sample_rate,
            u = i.nb_samples,
            d = i.channels,
            l = 1e3 * (4294967296 * i.ptshi + i.pts),
            f = void 0;
          if (s) {
            for (var h = 0, p = 0; p < i.data.length; p++)
              h += i.data[p].length;
            (f = new i.data[0].constructor(h)), (h = 0);
            for (p = 0; p < i.data.length; p++) {
              var _ = i.data[p];
              f.set(_, h), (h += _.length);
            }
          } else f = i.data;
          var v = new r.AudioData({
            format: a,
            sampleRate: c,
            numberOfFrames: u,
            numberOfChannels: d,
            timestamp: l,
            data: f,
          });
          this._output(v);
        }
      }),
      (e.prototype.flush = function () {
        var e = this,
          t = this._p.then(function () {
            return b(this, void 0, void 0, function () {
              var t, r, n, o, i, a;
              return m(this, function (s) {
                switch (s.label) {
                  case 0:
                    if (!e._c) return [2];
                    (t = e._libav),
                      (r = e._c),
                      (n = e._pkt),
                      (o = e._frame),
                      (i = null),
                      (s.label = 1);
                  case 1:
                    return (
                      s.trys.push([1, 3, , 4]),
                      [4, t.ff_decode_multi(r, n, o, [], !0)]
                    );
                  case 2:
                    return (i = s.sent()), [3, 4];
                  case 3:
                    return (
                      (a = s.sent()),
                      (e._p = e._p.then(function () {
                        e._closeAudioDecoder(a);
                      })),
                      [3, 4]
                    );
                  case 4:
                    return i && e._outputAudioData(i), [2];
                }
              });
            });
          });
        return (this._p = t), t;
      }),
      (e.prototype.reset = function () {
        this._resetAudioDecoder(new DOMException("Reset", "AbortError"));
      }),
      (e.prototype.close = function () {
        this._closeAudioDecoder(new DOMException("Close", "AbortError"));
      }),
      (e.isConfigSupported = function (e) {
        return b(this, void 0, void 0, function () {
          var t, r, n, o, i, a, c;
          return m(this, function (u) {
            switch (u.label) {
              case 0:
                return (
                  (t = s.decoder(e.codec)), (r = !1), t ? [4, s.get()] : [3, 8]
                );
              case 1:
                (n = u.sent()), (u.label = 2);
              case 2:
                return (
                  u.trys.push([2, 5, , 6]), [4, n.ff_init_decoder(t.codec)]
                );
              case 3:
                return (
                  (o = u.sent()),
                  (i = o[1]),
                  (a = o[2]),
                  (c = o[3]),
                  [4, n.ff_free_decoder(i, a, c)]
                );
              case 4:
                return u.sent(), (r = !0), [3, 6];
              case 5:
                return u.sent(), [3, 6];
              case 6:
                return [4, s.free(n)];
              case 7:
                u.sent(), (u.label = 8);
              case 8:
                return [
                  2,
                  {
                    supported: r,
                    config: _.cloneConfig(e, [
                      "codec",
                      "sampleRate",
                      "numberOfChannels",
                    ]),
                  },
                ];
            }
          });
        });
      }),
      e
    );
  })();
  v.AudioDecoder = w;
  var y = {},
    g =
      (this && this.__awaiter) ||
      function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              c(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          c((n = n.apply(e, t || [])).next());
        });
      },
    A =
      (this && this.__generator) ||
      function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: s(0), throw: s(1), return: s(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function s(s) {
          return function (c) {
            return (function (s) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i && ((i = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & s[0]
                          ? n.return
                          : s[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, s[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                    case 0:
                    case 1:
                      o = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (n = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !((o = a.trys),
                        (o = o.length > 0 && o[o.length - 1]) ||
                          (6 !== s[0] && 2 !== s[0]))
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = s);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(s);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = t.call(e, a);
                } catch (e) {
                  (s = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, c]);
          };
        }
      };
  Object.defineProperty(y, "__esModule", { value: !0 }),
    (y.AudioEncoder = void 0);
  var E = (function () {
    function t(e) {
      (this._output = e.output),
        (this._error = e.error),
        (this.state = "unconfigured"),
        (this.encodeQueueSize = 0),
        (this._p = Promise.all([])),
        (this._libav = null),
        (this._codec = this._c = this._frame = this._pkt = 0),
        (this._filter_in_ctx = this._filter_out_ctx = null),
        (this._filter_graph = this._buffersrc_ctx = this._buffersink_ctx = 0);
    }
    return (
      (t.prototype.configure = function (e) {
        var t = this,
          r = this;
        if ("closed" === this.state)
          throw new DOMException("Encoder is closed", "InvalidStateError");
        this._libav &&
          (this._p = this._p.then(function () {
            return t._free();
          })),
          (this.state = "configured"),
          (this._p = this._p
            .then(function () {
              return g(this, void 0, void 0, function () {
                var t, n, o, i, a;
                return A(this, function (c) {
                  switch (c.label) {
                    case 0:
                      return (
                        (t = s.encoder(e.codec, e)),
                        (r._outputMetadata = {
                          decoderConfig: {
                            codec: e.codec,
                            sampleRate: 0,
                            numberOfChannels: 0,
                          },
                        }),
                        (r._outputMetadataFilled = !1),
                        t ? ((o = r), [4, s.get()]) : [3, 4]
                      );
                    case 1:
                      return (
                        (n = o._libav = c.sent()),
                        (i = void 0),
                        [4, n.ff_init_encoder(t.codec, t)]
                      );
                    case 2:
                      return (
                        (a = c.sent()),
                        (r._codec = a[0]),
                        (r._c = a[1]),
                        (r._frame = a[2]),
                        (r._pkt = a[3]),
                        (i = a[4]),
                        (r._pts = 0),
                        [
                          4,
                          n.AVCodecContext_time_base_s(
                            r._c,
                            1,
                            t.ctx.sample_rate
                          ),
                        ]
                      );
                    case 3:
                      return (
                        c.sent(),
                        (r._filter_out_ctx = {
                          sample_rate: t.ctx.sample_rate,
                          sample_fmt: t.ctx.sample_fmt,
                          channel_layout: t.ctx.channel_layout,
                          frame_size: i,
                        }),
                        [3, 5]
                      );
                    case 4:
                      r._closeAudioEncoder(
                        new DOMException(
                          "Unsupported codec",
                          "NotSupportedError"
                        )
                      ),
                        (c.label = 5);
                    case 5:
                      return [2];
                  }
                });
              });
            })
            .catch(this._error));
      }),
      (t.prototype._free = function () {
        return g(this, void 0, void 0, function () {
          return A(this, function (e) {
            switch (e.label) {
              case 0:
                return this._filter_graph
                  ? [4, this._libav.avfilter_graph_free_js(this._filter_graph)]
                  : [3, 2];
              case 1:
                e.sent(),
                  (this._filter_in_ctx = this._filter_out_ctx = null),
                  (this._filter_graph =
                    this._buffersrc_ctx =
                    this._buffersink_ctx =
                      0),
                  (e.label = 2);
              case 2:
                return this._c
                  ? [
                      4,
                      this._libav.ff_free_encoder(
                        this._c,
                        this._frame,
                        this._pkt
                      ),
                    ]
                  : [3, 4];
              case 3:
                e.sent(),
                  (this._codec = this._c = this._frame = this._pkt = 0),
                  (e.label = 4);
              case 4:
                return (
                  this._libav && (s.free(this._libav), (this._libav = null)),
                  [2]
                );
            }
          });
        });
      }),
      (t.prototype._closeAudioEncoder = function (e) {
        var t = this;
        this._resetAudioEncoder(e),
          (this.state = "closed"),
          (this._p = this._p.then(function () {
            return t._free();
          })),
          "AbortError" !== e.name &&
            (this._p = this._p.then(function () {
              t._error(e);
            }));
      }),
      (t.prototype._resetAudioEncoder = function (e) {
        var t = this;
        if ("closed" === this.state)
          throw new DOMException("Encoder closed", "InvalidStateError");
        (this.state = "unconfigured"),
          (this._p = this._p.then(function () {
            return t._free();
          }));
      }),
      (t.prototype.encode = function (e) {
        var t = this;
        if (null === e._libavGetData()) throw new TypeError("Detached");
        if ("configured" !== this.state)
          throw new DOMException("Unconfigured", "InvalidStateError");
        var n = e.clone();
        this.encodeQueueSize++,
          (this._p = this._p
            .then(function () {
              return g(this, void 0, void 0, function () {
                var e,
                  o,
                  i,
                  a,
                  s,
                  c,
                  u,
                  d,
                  l,
                  f,
                  h,
                  p,
                  _,
                  v,
                  b,
                  m,
                  w,
                  y,
                  g,
                  E,
                  V,
                  x,
                  k;
                return A(this, function (A) {
                  switch (A.label) {
                    case 0:
                      (e = t._libav),
                        (o = t._c),
                        (i = t._pkt),
                        (a = t._frame),
                        (s = null),
                        (A.label = 1);
                    case 1:
                      if (
                        (A.trys.push([1, 12, , 13]),
                        (c = n._libavGetData()),
                        (u = n.numberOfFrames),
                        !r.isInterleaved(n.format))
                      ) {
                        for (d = [], l = 0; l < n.numberOfChannels; l++)
                          d.push(c.subarray(l * u, (l + 1) * u));
                        c = d;
                      }
                      switch (((f = void 0), n.format)) {
                        case "u8":
                          f = e.AV_SAMPLE_FMT_U8;
                          break;
                        case "s16":
                          f = e.AV_SAMPLE_FMT_S16;
                          break;
                        case "s32":
                          f = e.AV_SAMPLE_FMT_S32;
                          break;
                        case "f32":
                          f = e.AV_SAMPLE_FMT_FLT;
                          break;
                        case "u8-planar":
                          f = e.AV_SAMPLE_FMT_U8P;
                          break;
                        case "s16-planar":
                          f = e.AV_SAMPLE_FMT_S16P;
                          break;
                        case "s32-planar":
                          f = e.AV_SAMPLE_FMT_S32P;
                          break;
                        case "f32-planar":
                          f = e.AV_SAMPLE_FMT_FLTP;
                          break;
                        default:
                          throw new TypeError("Invalid AudioSampleFormat");
                      }
                      return (
                        (h = Math.floor(n.timestamp / 1e3)),
                        (p = h % 4294967296),
                        (_ = ~~(h / 4294967296)),
                        (v = n.numberOfChannels),
                        (b = 1 === v ? 4 : (1 << v) - 1),
                        (m = n.sampleRate),
                        (w = {
                          data: c,
                          format: f,
                          pts: p,
                          ptshi: _,
                          channel_layout: b,
                          sample_rate: m,
                        }),
                        (y = null),
                        t._filter_in_ctx
                          ? (E = t._filter_in_ctx).sample_fmt === w.format &&
                            E.channel_layout === w.channel_layout &&
                            E.sample_rate === w.sample_rate
                            ? [3, 5]
                            : [4, t._filter([], !0)]
                          : [3, 5]
                      );
                    case 2:
                      return (g = A.sent()), [4, e.ff_encode_multi(o, a, i, g)];
                    case 3:
                      return (
                        (y = A.sent()),
                        [4, e.avfilter_graph_free_js(t._filter_graph)]
                      );
                    case 4:
                      A.sent(),
                        (t._filter_in_ctx = null),
                        (t._filter_graph =
                          t._buffersrc_ctx =
                          t._buffersink_ctx =
                            0),
                        (A.label = 5);
                    case 5:
                      return t._filter_graph
                        ? [3, 7]
                        : ((E = t._filter_in_ctx =
                            {
                              sample_rate: w.sample_rate,
                              sample_fmt: w.format,
                              channel_layout: w.channel_layout,
                            }),
                          [
                            4,
                            e.ff_init_filter_graph(
                              "anull",
                              E,
                              t._filter_out_ctx
                            ),
                          ]);
                    case 6:
                      (k = A.sent()),
                        (t._filter_graph = k[0]),
                        (t._buffersrc_ctx = k[1]),
                        (t._buffersink_ctx = k[2]),
                        (A.label = 7);
                    case 7:
                      return [4, t._filter([w])];
                    case 8:
                      return (V = A.sent()), [4, e.ff_encode_multi(o, a, i, V)];
                    case 9:
                      return (
                        (s = A.sent()),
                        y && (s = y.concat(s)),
                        s.length && !t._outputMetadataFilled && V && V.length
                          ? [4, t._getOutputMetadata(V[0])]
                          : [3, 11]
                      );
                    case 10:
                      A.sent(), (A.label = 11);
                    case 11:
                      return [3, 13];
                    case 12:
                      return (
                        (x = A.sent()),
                        (t._p = t._p.then(function () {
                          t._closeAudioEncoder(x);
                        })),
                        [3, 13]
                      );
                    case 13:
                      return (
                        t.encodeQueueSize--,
                        s && t._outputEncodedAudioChunks(s),
                        [2]
                      );
                  }
                });
              });
            })
            .catch(this._error));
      }),
      (t.prototype._filter = function (e, t) {
        return (
          void 0 === t && (t = !1),
          g(this, void 0, void 0, function () {
            var r, n, o, i;
            return A(this, function (a) {
              switch (a.label) {
                case 0:
                  return [
                    4,
                    this._libav.ff_filter_multi(
                      this._buffersrc_ctx,
                      this._buffersink_ctx,
                      this._frame,
                      e,
                      t
                    ),
                  ];
                case 1:
                  for (r = a.sent(), n = 0, o = r; n < o.length; n++)
                    ((i = o[n]).pts = this._pts),
                      (i.ptshi = 0),
                      (this._pts += i.nb_samples);
                  return [2, r];
              }
            });
          })
        );
      }),
      (t.prototype._getOutputMetadata = function (e) {
        return g(this, void 0, void 0, function () {
          var t, r, n, o, i;
          return A(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (t = this._libav),
                  (r = this._c),
                  [4, t.AVCodecContext_extradata(r)]
                );
              case 1:
                return (n = a.sent()), [4, t.AVCodecContext_extradata_size(r)];
              case 2:
                return (
                  (o = a.sent()),
                  (i = null),
                  n && o ? [4, t.copyout_u8(n, o)] : [3, 4]
                );
              case 3:
                (i = a.sent()), (a.label = 4);
              case 4:
                return (
                  (this._outputMetadata.decoderConfig.sampleRate =
                    e.sample_rate),
                  (this._outputMetadata.decoderConfig.numberOfChannels =
                    e.channels),
                  i && (this._outputMetadata.decoderConfig.description = i),
                  (this._outputMetadataFilled = !0),
                  [2]
                );
            }
          });
        });
      }),
      (t.prototype._outputEncodedAudioChunks = function (t) {
        this._libav;
        for (
          var r = this._filter_out_ctx.sample_rate, n = 0, o = t;
          n < o.length;
          n++
        ) {
          var i = o[n],
            a = 1 & i.flags ? "key" : "delta",
            s = Math.floor(((4294967296 * i.ptshi + i.pts) / r) * 1e6);
          s < 0 && (s = 0);
          var c = new e.EncodedAudioChunk({
            type: a,
            timestamp: s,
            data: i.data,
          });
          this._outputMetadataFilled
            ? this._output(c, this._outputMetadata)
            : this._output(c);
        }
      }),
      (t.prototype.flush = function () {
        var e = this,
          t = this._p.then(function () {
            return g(this, void 0, void 0, function () {
              var t, r, n, o, i, a, s, c;
              return A(this, function (u) {
                switch (u.label) {
                  case 0:
                    if (!e._c) return [2];
                    (t = e._libav),
                      (r = e._c),
                      (n = e._frame),
                      (o = e._pkt),
                      (i = e._buffersrc_ctx),
                      e._buffersink_ctx,
                      (a = null),
                      (u.label = 1);
                  case 1:
                    return (
                      u.trys.push([1, 7, , 8]),
                      (s = null),
                      i ? [4, e._filter([], !0)] : [3, 3]
                    );
                  case 2:
                    (s = u.sent()), (u.label = 3);
                  case 3:
                    return [4, t.ff_encode_multi(r, n, o, s || [], !0)];
                  case 4:
                    return (
                      (a = u.sent()),
                      !e._outputMetadataFilled && s && s.length
                        ? [4, e._getOutputMetadata(s[0])]
                        : [3, 6]
                    );
                  case 5:
                    u.sent(), (u.label = 6);
                  case 6:
                    return [3, 8];
                  case 7:
                    return (
                      (c = u.sent()),
                      (e._p = e._p.then(function () {
                        e._closeAudioEncoder(c);
                      })),
                      [3, 8]
                    );
                  case 8:
                    return a && e._outputEncodedAudioChunks(a), [2];
                }
              });
            });
          });
        return (this._p = t), t;
      }),
      (t.prototype.reset = function () {
        this._resetAudioEncoder(new DOMException("Reset", "AbortError"));
      }),
      (t.prototype.close = function () {
        this._closeAudioEncoder(new DOMException("Close", "AbortError"));
      }),
      (t.isConfigSupported = function (e) {
        return g(this, void 0, void 0, function () {
          var t, r, n, o, i, a, c;
          return A(this, function (u) {
            switch (u.label) {
              case 0:
                return (
                  (t = s.encoder(e.codec, e)),
                  (r = !1),
                  t ? [4, s.get()] : [3, 8]
                );
              case 1:
                (n = u.sent()), (u.label = 2);
              case 2:
                return (
                  u.trys.push([2, 5, , 6]), [4, n.ff_init_encoder(t.codec, t)]
                );
              case 3:
                return (
                  (o = u.sent()),
                  (i = o[1]),
                  (a = o[2]),
                  (c = o[3]),
                  [4, n.ff_free_encoder(i, a, c)]
                );
              case 4:
                return u.sent(), (r = !0), [3, 6];
              case 5:
                return u.sent(), [3, 6];
              case 6:
                return [4, s.free(n)];
              case 7:
                u.sent(), (u.label = 8);
              case 8:
                return [
                  2,
                  {
                    supported: r,
                    config: _.cloneConfig(e, [
                      "codec",
                      "sampleRate",
                      "numberOfChannels",
                      "bitrate",
                    ]),
                  },
                ];
            }
          });
        });
      }),
      t
    );
  })();
  y.AudioEncoder = E;
  var V = {};
  Object.defineProperty(V, "__esModule", { value: !0 }),
    (V.EncodedVideoChunk = void 0),
    (V.EncodedVideoChunk = e.EncodedAudioChunk);
  var x = {},
    k =
      (this && this.__awaiter) ||
      function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              c(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          c((n = n.apply(e, t || [])).next());
        });
      },
    S =
      (this && this.__generator) ||
      function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: s(0), throw: s(1), return: s(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function s(s) {
          return function (c) {
            return (function (s) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i && ((i = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & s[0]
                          ? n.return
                          : s[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, s[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                    case 0:
                    case 1:
                      o = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (n = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !((o = a.trys),
                        (o = o.length > 0 && o[o.length - 1]) ||
                          (6 !== s[0] && 2 !== s[0]))
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = s);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(s);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = t.call(e, a);
                } catch (e) {
                  (s = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, c]);
          };
        }
      };
  Object.defineProperty(x, "__esModule", { value: !0 }),
    (x.verticalSubSamplingFactor =
      x.horizontalSubSamplingFactor =
      x.sampleBytes =
      x.numPlanes =
      x.VideoFrame =
        void 0);
  var M = null,
    D = (function () {
      function e(e, t) {
        e instanceof ArrayBuffer || e.buffer instanceof ArrayBuffer
          ? this._constructBuffer(e, t)
          : this._constructCanvas(e, t);
      }
      return (
        (e.prototype._constructCanvas = function (e, t) {
          null === M &&
            (((M = document.createElement("canvas")).style.display = "none"),
            document.body.appendChild(M));
          var r = 0,
            n = 0;
          if (
            (e.naturalWidth
              ? ((r = e.naturalWidth), (n = e.naturalHeight))
              : e.videoWidth
              ? ((r = e.videoWidth), (n = e.videoHeight))
              : e.width && ((r = e.width), (n = e.height)),
            !r || !n)
          )
            throw new DOMException(
              "Could not determine dimensions",
              "InvalidStateError"
            );
          (M.width = r), (M.height = n);
          var o = M.getContext("2d");
          o.clearRect(0, 0, r, n),
            o.drawImage(e, 0, 0),
            this._constructBuffer(o.getImageData(0, 0, r, n).data, {
              format: "RGBA",
              codedWidth: r,
              codedHeight: n,
              timestamp: t.timestamp,
              duration: t.duration || 0,
              layout: [{ offset: 0, stride: 4 * r }],
              displayWidth: t.displayWidth || r,
              displayHeight: t.displayHeight || n,
            });
        }),
        (e.prototype._constructBuffer = function (e, t) {
          var r = (this.format = t.format),
            n = (this.codedWidth = t.codedWidth),
            o = (this.codedHeight = t.codedHeight);
          this.visibleRect = new DOMRect(0, 0, n, o);
          var i = (this.displayWidth = t.displayWidth || t.codedWidth),
            a = (this.displayHeight = t.displayHeight || t.codedHeight);
          if (
            (i !== n || a !== o
              ? ((this._nonSquarePixels = !0),
                (this._sar_num = i * o),
                (this._sar_den = a * n))
              : (this._nonSquarePixels = !1),
            (this.timestamp = t.timestamp),
            t.duration && (this.duration = t.duration),
            t.layout)
          )
            this._layout = t.layout;
          else {
            for (var s = I(r), c = [], u = 0, d = 0; d < s; d++) {
              var l = P(r, d),
                f = F(r, d),
                h = ~~(n / l);
              c.push({ offset: u, stride: h }), (u += h * ~~(o / f));
            }
            this._layout = c;
          }
          this._data = new Uint8Array(e.buffer || e, e.byteOffset || 0);
        }),
        (e.prototype._libavGetData = function () {
          return this._data;
        }),
        (e.prototype.allocationSize = function (e) {
          if ((void 0 === e && (e = {}), null === this._data))
            throw new DOMException("Detached", "InvalidStateError");
          if (null === this.format)
            throw new DOMException("Not supported", "NotSupportedError");
          return this._parseVideoFrameCopyToOptions(e).allocationSize;
        }),
        (e.prototype._parseVideoFrameCopyToOptions = function (e) {
          var t = this.visibleRect,
            r = e.rect
              ? new DOMRect(e.rect.x, e.rect.y, e.rect.width, e.rect.height)
              : null,
            n = this._parseVisibleRect(t, r),
            o = e.layout || null;
          return this._computeLayoutAndAllocationSize(n, o);
        }),
        (e.prototype._parseVisibleRect = function (e, t) {
          var r = e;
          if (t) {
            if (0 === t.width || 0 === t.height)
              throw new TypeError("Invalid rectangle");
            if (t.x + t.width > this.codedWidth)
              throw new TypeError("Invalid rectangle");
            if (t.y + t.height > this.codedHeight)
              throw new TypeError("Invalid rectangle");
            r = t;
          }
          if (!this._verifyRectSampleAlignment(r))
            throw new TypeError("Invalid alignment");
          return r;
        }),
        (e.prototype._computeLayoutAndAllocationSize = function (e, t) {
          var r = I(this.format);
          if (t && t.length !== r) throw new TypeError("Invalid layout");
          for (var n = 0, o = [], i = [], a = 0; a < r; ) {
            var s = C(this.format, a),
              c = P(this.format, a),
              u = F(this.format, a),
              d = c * s,
              l = {
                destinationOffset: 0,
                destinationStride: 0,
                sourceTop: ~~(e.y / u),
                sourceHeight: ~~(e.height / u),
                sourceLeftBytes: ~~(e.x / d),
                sourceWidthBytes: ~~(e.width / d),
              };
            if (t) {
              var f = t[a];
              if (f.stride < l.sourceWidthBytes)
                throw new TypeError("Invalid stride");
              (l.destinationOffset = f.offset),
                (l.destinationStride = f.stride);
            } else
              (l.destinationOffset = n),
                (l.destinationStride = l.sourceWidthBytes);
            var h = l.destinationStride * l.sourceHeight,
              p = h + l.destinationOffset;
            if (h >= 4294967296 || p >= 4294967296)
              throw new TypeError("Plane too large");
            i.push(p), p > n && (n = p);
            for (var _ = 0; _ < a; ) {
              if (!(p <= o[_].destinationOffset || i[_] <= l.destinationOffset))
                throw new TypeError("Invalid plane layout");
              _++;
            }
            o.push(l), a++;
          }
          return { computedLayouts: o, allocationSize: n };
        }),
        (e.prototype._verifyRectSampleAlignment = function (e) {
          if (!this.format) return !0;
          for (var t = 0, r = I(this.format); t < r; ) {
            var n = P(this.format, t),
              o = F(this.format, t),
              i = e.x / n;
            if (i !== ~~i) return !1;
            var a = e.width / n;
            if (a !== ~~a) return !1;
            var s = e.y / o;
            if (s !== ~~s) return !1;
            var c = e.height / o;
            if (c !== ~~c) return !1;
            t++;
          }
          return !0;
        }),
        (e.prototype.copyTo = function (e, t) {
          return (
            void 0 === t && (t = {}),
            k(this, void 0, void 0, function () {
              var r, n, o, i, a, s, c, u, d, l;
              return S(this, function (f) {
                if (
                  ((r = new Uint8Array(e.buffer || e, e.byteOffset || 0)),
                  null === this._data)
                )
                  throw new DOMException("Detached", "InvalidStateError");
                if (!this.format)
                  throw new DOMException("No format", "NotSupportedError");
                if (
                  ((n = this._parseVideoFrameCopyToOptions(t)),
                  e.byteLength < n.allocationSize)
                )
                  throw new TypeError("Insufficient space");
                for (
                  o = [], I(this.format), i = 0;
                  i < n.computedLayouts.length;

                ) {
                  for (
                    a = this._layout[i].stride,
                      s = n.computedLayouts[i],
                      c = s.sourceTop * a,
                      c += s.sourceLeftBytes,
                      u = s.destinationOffset,
                      d = s.sourceWidthBytes,
                      l = 0;
                    l < s.sourceHeight;

                  )
                    r.set(this._data.subarray(c, c + d), u),
                      (c += a),
                      (u += s.destinationStride),
                      l++;
                  i++,
                    o.push({
                      offset: s.destinationOffset,
                      stride: s.destinationStride,
                    });
                }
                return [2, o];
              });
            })
          );
        }),
        (e.prototype.clone = function () {
          return new e(this._data, {
            format: this.format,
            codedWidth: this.codedWidth,
            codedHeight: this.codedHeight,
            timestamp: this.timestamp,
            duration: this.duration,
            layout: this._layout,
          });
        }),
        (e.prototype.close = function () {
          this._data = null;
        }),
        e
      );
    })();
  function I(e) {
    switch (e) {
      case "I420":
      case "I422":
      case "I444":
        return 3;
      case "I420A":
        return 4;
      case "NV12":
        return 2;
      case "RGBA":
      case "RGBX":
      case "BGRA":
      case "BGRX":
        return 1;
      default:
        throw new DOMException(
          "Unsupported video pixel format",
          "NotSupportedError"
        );
    }
  }
  function C(e, t) {
    switch (e) {
      case "I420":
      case "I420A":
      case "I422":
      case "I444":
        return 1;
      case "NV12":
        return 1 === t ? 2 : 1;
      case "RGBA":
      case "RGBX":
      case "BGRA":
      case "BGRX":
        return 4;
      default:
        throw new DOMException(
          "Unsupported video pixel format",
          "NotSupportedError"
        );
    }
  }
  function P(e, t) {
    if (0 === t) return 1;
    switch (e) {
      case "I420":
      case "I422":
        return 2;
      case "I420A":
        return 3 === t ? 1 : 2;
      case "I444":
        return 1;
      case "NV12":
        return 2;
      case "RGBA":
      case "RGBX":
      case "BGRA":
      case "BGRX":
        return 1;
      default:
        throw new DOMException(
          "Unsupported video pixel format",
          "NotSupportedError"
        );
    }
  }
  function F(e, t) {
    if (0 === t) return 1;
    switch (e) {
      case "I420":
        return 2;
      case "I420A":
        return 3 === t ? 1 : 2;
      case "I422":
      case "I444":
        return 1;
      case "NV12":
        return 2;
      case "RGBA":
      case "RGBX":
      case "BGRA":
      case "BGRX":
        return 1;
      default:
        throw new DOMException(
          "Unsupported video pixel format",
          "NotSupportedError"
        );
    }
  }
  (x.VideoFrame = D),
    (x.numPlanes = I),
    (x.sampleBytes = C),
    (x.horizontalSubSamplingFactor = P),
    (x.verticalSubSamplingFactor = F);
  var O = {},
    T =
      (this && this.__awaiter) ||
      function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              c(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          c((n = n.apply(e, t || [])).next());
        });
      },
    R =
      (this && this.__generator) ||
      function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: s(0), throw: s(1), return: s(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function s(s) {
          return function (c) {
            return (function (s) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i && ((i = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & s[0]
                          ? n.return
                          : s[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, s[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                    case 0:
                    case 1:
                      o = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (n = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !((o = a.trys),
                        (o = o.length > 0 && o[o.length - 1]) ||
                          (6 !== s[0] && 2 !== s[0]))
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = s);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(s);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = t.call(e, a);
                } catch (e) {
                  (s = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, c]);
          };
        }
      };
  Object.defineProperty(O, "__esModule", { value: !0 }),
    (O.VideoDecoder = void 0);
  var B = (function () {
    function e(e) {
      (this._output = e.output),
        (this._error = e.error),
        (this.state = "unconfigured"),
        (this.decodeQueueSize = 0),
        (this._p = Promise.all([])),
        (this._libav = null),
        (this._codec = this._c = this._pkt = this._frame = 0);
    }
    return (
      (e.prototype.configure = function (e) {
        var t = this,
          r = this;
        if ("closed" === this.state)
          throw new DOMException("Decoder is closed", "InvalidStateError");
        this._libav &&
          (this._p = this._p.then(function () {
            return t._free();
          })),
          (this.state = "configured"),
          (this._p = this._p
            .then(function () {
              return T(this, void 0, void 0, function () {
                var t, n, o, i;
                return R(this, function (a) {
                  switch (a.label) {
                    case 0:
                      return (t = s.decoder(e.codec))
                        ? ((o = r), [4, s.get()])
                        : [3, 4];
                    case 1:
                      return [
                        4,
                        (n = o._libav = a.sent()).ff_init_decoder(t.codec),
                      ];
                    case 2:
                      return (
                        (i = a.sent()),
                        (r._codec = i[0]),
                        (r._c = i[1]),
                        (r._pkt = i[2]),
                        (r._frame = i[3]),
                        [4, n.AVCodecContext_time_base_s(r._c, 1, 1e3)]
                      );
                    case 3:
                      return a.sent(), [3, 5];
                    case 4:
                      r._closeVideoDecoder(
                        new DOMException(
                          "Unsupported codec",
                          "NotSupportedError"
                        )
                      ),
                        (a.label = 5);
                    case 5:
                      return [2];
                  }
                });
              });
            })
            .catch(this._error));
      }),
      (e.prototype._free = function () {
        return T(this, void 0, void 0, function () {
          return R(this, function (e) {
            switch (e.label) {
              case 0:
                return this._c
                  ? [
                      4,
                      this._libav.ff_free_decoder(
                        this._c,
                        this._pkt,
                        this._frame
                      ),
                    ]
                  : [3, 2];
              case 1:
                e.sent(),
                  (this._codec = this._c = this._pkt = this._frame = 0),
                  (e.label = 2);
              case 2:
                return (
                  this._libav && (s.free(this._libav), (this._libav = null)),
                  [2]
                );
            }
          });
        });
      }),
      (e.prototype._closeVideoDecoder = function (e) {
        var t = this;
        this._resetVideoDecoder(e),
          (this.state = "closed"),
          (this._p = this._p.then(function () {
            return t._free();
          })),
          "AbortError" !== e.name &&
            (this._p = this._p.then(function () {
              t._error(e);
            }));
      }),
      (e.prototype._resetVideoDecoder = function (e) {
        var t = this;
        if ("closed" === this.state)
          throw new DOMException("Decoder closed", "InvalidStateError");
        (this.state = "unconfigured"),
          (this._p = this._p.then(function () {
            return t._free();
          }));
      }),
      (e.prototype.decode = function (e) {
        var t = this;
        if ("configured" !== this.state)
          throw new DOMException("Unconfigured", "InvalidStateError");
        this.decodeQueueSize++,
          (this._p = this._p
            .then(function () {
              return T(this, void 0, void 0, function () {
                var r, n, o, i, a, s, c, u, d, l;
                return R(this, function (f) {
                  switch (f.label) {
                    case 0:
                      (r = t._libav),
                        (n = t._c),
                        (o = t._pkt),
                        (i = t._frame),
                        (a = null),
                        (f.label = 1);
                    case 1:
                      return (
                        f.trys.push([1, 3, , 4]),
                        (s = Math.floor(e.timestamp / 1e3)),
                        (c = s % 4294967296),
                        (u = ~~(s / 4294967296)),
                        (d = {
                          data: e._libavGetData(),
                          pts: c,
                          ptshi: u,
                          dts: c,
                          dtshi: u,
                        }),
                        e.duration &&
                          ((d.duration = Math.floor(e.duration / 1e3)),
                          (d.durationhi = 0)),
                        [4, r.ff_decode_multi(n, o, i, [d])]
                      );
                    case 2:
                      return (a = f.sent()), [3, 4];
                    case 3:
                      return (
                        (l = f.sent()),
                        (t._p = t._p.then(function () {
                          t._closeVideoDecoder(l);
                        })),
                        [3, 4]
                      );
                    case 4:
                      return (
                        t.decodeQueueSize--, a && t._outputVideoFrames(a), [2]
                      );
                  }
                });
              });
            })
            .catch(this._error));
      }),
      (e.prototype._outputVideoFrames = function (e) {
        for (var t = this._libav, r = 0, n = e; r < n.length; r++) {
          var o = n[r],
            i = void 0;
          switch (o.format) {
            case t.AV_PIX_FMT_YUV420P:
              i = "I420";
              break;
            case t.AV_PIX_FMT_YUVA420P:
              i = "I420A";
              break;
            case t.AV_PIX_FMT_YUV422P:
              i = "I422";
              break;
            case t.AV_PIX_FMT_YUV444P:
              i = "I444";
              break;
            case t.AV_PIX_FMT_NV12:
              i = "NV12";
              break;
            case t.AV_PIX_FMT_RGBA:
              i = "RGBA";
              break;
            case t.AV_PIX_FMT_BGRA:
              i = "BGRA";
              break;
            default:
              throw new DOMException(
                "Unsupported libav format!",
                "EncodingError"
              );
          }
          var a = o.width,
            s = o.height,
            c = a,
            u = s;
          if (o.sample_aspect_ratio[0]) {
            var d = o.sample_aspect_ratio;
            d[0] > d[1]
              ? (c = ~~((a * d[0]) / d[1]))
              : (u = ~~((s * d[1]) / d[0]));
          }
          for (
            var l = 1e3 * (4294967296 * o.ptshi + o.pts),
              f = void 0,
              h = 0,
              p = 0;
            p < o.data.length;
            p++
          )
            for (var _ = o.data[p], v = 0; v < _.length; v++) h += _[v].length;
          (f = new Uint8Array(h)), (h = 0);
          for (p = 0; p < o.data.length; p++)
            for (_ = o.data[p], v = 0; v < _.length; v++) {
              var b = _[v];
              f.set(b, h), (h += b.length);
            }
          console.log("We have output....", f);
          var m = new x.VideoFrame(f, {
            format: i,
            codedWidth: a,
            codedHeight: s,
            displayWidth: c,
            displayHeight: u,
            timestamp: l,
          });
          this._output(m);
        }
      }),
      (e.prototype.flush = function () {
        var e = this,
          t = this._p.then(function () {
            return T(this, void 0, void 0, function () {
              var t, r, n, o, i, a;
              return R(this, function (s) {
                switch (s.label) {
                  case 0:
                    if (!e._c) return [2];
                    (t = e._libav),
                      (r = e._c),
                      (n = e._pkt),
                      (o = e._frame),
                      (i = null),
                      (s.label = 1);
                  case 1:
                    return (
                      s.trys.push([1, 3, , 4]),
                      [4, t.ff_decode_multi(r, n, o, [], !0)]
                    );
                  case 2:
                    return (i = s.sent()), [3, 4];
                  case 3:
                    return (
                      (a = s.sent()),
                      (e._p = e._p.then(function () {
                        e._closeVideoDecoder(a);
                      })),
                      [3, 4]
                    );
                  case 4:
                    return i && e._outputVideoFrames(i), [2];
                }
              });
            });
          });
        return (this._p = t), t;
      }),
      (e.prototype.reset = function () {
        this._resetVideoDecoder(new DOMException("Reset", "AbortError"));
      }),
      (e.prototype.close = function () {
        this._closeVideoDecoder(new DOMException("Close", "AbortError"));
      }),
      (e.isConfigSupported = function (e) {
        return T(this, void 0, void 0, function () {
          var t, r, n, o, i, a, c;
          return R(this, function (u) {
            switch (u.label) {
              case 0:
                return (
                  (t = s.decoder(e.codec)), (r = !1), t ? [4, s.get()] : [3, 8]
                );
              case 1:
                (n = u.sent()), (u.label = 2);
              case 2:
                return (
                  u.trys.push([2, 5, , 6]), [4, n.ff_init_decoder(t.codec)]
                );
              case 3:
                return (
                  (o = u.sent()),
                  (i = o[1]),
                  (a = o[2]),
                  (c = o[3]),
                  [4, n.ff_free_decoder(i, a, c)]
                );
              case 4:
                return u.sent(), (r = !0), [3, 6];
              case 5:
                return u.sent(), [3, 6];
              case 6:
                return [4, s.free(n)];
              case 7:
                u.sent(), (u.label = 8);
              case 8:
                return [
                  2,
                  {
                    supported: r,
                    config: _.cloneConfig(e, [
                      "codec",
                      "codedWidth",
                      "codedHeight",
                    ]),
                  },
                ];
            }
          });
        });
      }),
      e
    );
  })();
  O.VideoDecoder = B;
  var G = {},
    U =
      (this && this.__awaiter) ||
      function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              c(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          c((n = n.apply(e, t || [])).next());
        });
      },
    X =
      (this && this.__generator) ||
      function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: s(0), throw: s(1), return: s(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function s(s) {
          return function (c) {
            return (function (s) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i && ((i = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & s[0]
                          ? n.return
                          : s[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, s[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                    case 0:
                    case 1:
                      o = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (n = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !((o = a.trys),
                        (o = o.length > 0 && o[o.length - 1]) ||
                          (6 !== s[0] && 2 !== s[0]))
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = s);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(s);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = t.call(e, a);
                } catch (e) {
                  (s = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, c]);
          };
        }
      };
  Object.defineProperty(G, "__esModule", { value: !0 }),
    (G.VideoEncoder = void 0);
  var L = (function () {
    function e(e) {
      (this._output = e.output),
        (this._error = e.error),
        (this.state = "unconfigured"),
        (this.encodeQueueSize = 0),
        (this._p = Promise.all([])),
        (this._libav = null),
        (this._codec = this._c = this._frame = this._pkt = 0);
    }
    return (
      (e.prototype.configure = function (e) {
        var t = this,
          r = this;
        if ("closed" === this.state)
          throw new DOMException("Encoder is closed", "InvalidStateError");
        this._libav &&
          (this._p = this._p.then(function () {
            return t._free();
          })),
          (this.state = "configured"),
          (this._p = this._p
            .then(function () {
              return U(this, void 0, void 0, function () {
                var t, n, o, i, a, c, u, d;
                return X(this, function (l) {
                  switch (l.label) {
                    case 0:
                      return (t = s.encoder(e.codec, e))
                        ? ((o = r), [4, s.get()])
                        : [3, 4];
                    case 1:
                      return (
                        (n = o._libav = l.sent()),
                        (r._metadata = { decoderConfig: { codec: t.codec } }),
                        [4, n.ff_init_encoder(t.codec, t)]
                      );
                    case 2:
                      return (
                        (d = l.sent()),
                        (r._codec = d[0]),
                        (r._c = d[1]),
                        (r._frame = d[2]),
                        (r._pkt = d[3]),
                        (r._extradataSet = !1),
                        (r._extradata = null),
                        [4, n.AVCodecContext_time_base_s(r._c, 1, 1e3)]
                      );
                    case 3:
                      return (
                        l.sent(),
                        (i = e.width),
                        (a = e.height),
                        (r._sws = 0),
                        (r._swsFrame = 0),
                        (r._swsOut = {
                          width: i,
                          height: a,
                          format: t.ctx.pix_fmt,
                        }),
                        (c = e.displayWidth || i),
                        (u = e.displayHeight || a),
                        c !== i || u !== a
                          ? ((this._nonSquarePixels = !0),
                            (this._sar_num = c * a),
                            (this._sar_den = u * i))
                          : (this._nonSquarePixels = !1),
                        [3, 5]
                      );
                    case 4:
                      r._closeVideoEncoder(
                        new DOMException(
                          "Unsupported codec",
                          "NotSupportedError"
                        )
                      ),
                        (l.label = 5);
                    case 5:
                      return [2];
                  }
                });
              });
            })
            .catch(this._error));
      }),
      (e.prototype._free = function () {
        return U(this, void 0, void 0, function () {
          return X(this, function (e) {
            switch (e.label) {
              case 0:
                return this._sws
                  ? [4, this._libav.av_frame_free_js(this._swsFrame)]
                  : [3, 3];
              case 1:
                return e.sent(), [4, this._libav.sws_freeContext(this._sws)];
              case 2:
                e.sent(),
                  (this._sws = this._swsFrame = 0),
                  (this._swsIn = this._swsOut = null),
                  (e.label = 3);
              case 3:
                return this._c
                  ? [
                      4,
                      this._libav.ff_free_encoder(
                        this._c,
                        this._frame,
                        this._pkt
                      ),
                    ]
                  : [3, 5];
              case 4:
                e.sent(),
                  (this._codec = this._c = this._frame = this._pkt = 0),
                  (e.label = 5);
              case 5:
                return (
                  this._libav && (s.free(this._libav), (this._libav = null)),
                  [2]
                );
            }
          });
        });
      }),
      (e.prototype._closeVideoEncoder = function (e) {
        var t = this;
        this._resetVideoEncoder(e),
          (this.state = "closed"),
          (this._p = this._p.then(function () {
            return t._free();
          })),
          "AbortError" !== e.name &&
            (this._p = this._p.then(function () {
              t._error(e);
            }));
      }),
      (e.prototype._resetVideoEncoder = function (e) {
        var t = this;
        if ("closed" === this.state)
          throw new DOMException("Encoder closed", "InvalidStateError");
        (this.state = "unconfigured"),
          (this._p = this._p.then(function () {
            return t._free();
          }));
      }),
      (e.prototype.encode = function (e, t) {
        void 0 === t && (t = {});
        var r = this;
        if (null === e._libavGetData()) throw new TypeError("Detached");
        if ("configured" !== this.state)
          throw new DOMException("Unconfigured", "InvalidStateError");
        var n = e.clone();
        this.encodeQueueSize++,
          (this._p = this._p
            .then(function () {
              return U(this, void 0, void 0, function () {
                var e,
                  o,
                  i,
                  a,
                  s,
                  c,
                  u,
                  d,
                  l,
                  f,
                  h,
                  p,
                  _,
                  v,
                  b,
                  m,
                  w,
                  y,
                  g,
                  A,
                  E,
                  V,
                  k,
                  S,
                  M,
                  D,
                  I,
                  C,
                  P,
                  F,
                  O,
                  T,
                  R,
                  B;
                return X(this, function (G) {
                  switch (G.label) {
                    case 0:
                      (e = r._libav),
                        (o = r._c),
                        (i = r._pkt),
                        (a = r._frame),
                        (s = r._swsOut),
                        (c = null),
                        (G.label = 1);
                    case 1:
                      switch (
                        (G.trys.push([1, 17, , 18]), (u = void 0), n.format)
                      ) {
                        case "I420":
                          u = e.AV_PIX_FMT_YUV420P;
                          break;
                        case "I420A":
                          u = e.AV_PIX_FMT_YUVA420P;
                          break;
                        case "I422":
                          u = e.AV_PIX_FMT_YUV422P;
                          break;
                        case "I444":
                          u = e.AV_PIX_FMT_YUV444P;
                          break;
                        case "NV12":
                          u = e.AV_PIX_FMT_NV12;
                          break;
                        case "RGBA":
                        case "RGBX":
                          u = e.AV_PIX_FMT_RGBA;
                          break;
                        case "BGRA":
                        case "BGRX":
                          u = e.AV_PIX_FMT_BGRA;
                          break;
                        default:
                          throw new TypeError("Invalid VideoPixelFormat");
                      }
                      for (
                        d = n._libavGetData(),
                          l = 0,
                          f = [],
                          h = x.numPlanes(n.format),
                          p = 0;
                        p < h;
                        p++
                      )
                        for (
                          _ = [],
                            f.push(_),
                            v = x.sampleBytes(n.format, p),
                            b = x.horizontalSubSamplingFactor(n.format, p),
                            m = x.verticalSubSamplingFactor(n.format, p),
                            w = ~~((n.codedWidth * v) / b),
                            y = ~~(n.codedHeight / m),
                            g = 0;
                          g < y;
                          g++
                        )
                          _.push(d.subarray(l, l + w)), (l += w);
                      return (
                        (A = Math.floor(n.timestamp / 1e3)),
                        (k = {
                          data: f,
                          format: u,
                          pts: (E = A % 4294967296),
                          ptshi: (V = ~~(A / 4294967296)),
                          width: n.codedWidth,
                          height: n.codedHeight,
                          key_frame: t.keyFrame ? 1 : 0,
                          pict_type: t.keyFrame ? 1 : 0,
                        }).width === s.width &&
                        k.height === s.height &&
                        k.format === s.format
                          ? [3, 12]
                          : (n._nonSquarePixels &&
                              (k.sample_aspect_ratio = [
                                n._sar_num,
                                n._sar_den,
                              ]),
                            (S = r._sws),
                            (M = r._swsIn),
                            (D = r._swsFrame),
                            S &&
                            k.width === M.width &&
                            k.height === M.height &&
                            k.format === M.format
                              ? [3, 6]
                              : S
                              ? [4, e.sws_freeContext(S)]
                              : [3, 3])
                      );
                    case 2:
                      G.sent(), (G.label = 3);
                    case 3:
                      return (
                        (M = {
                          width: k.width,
                          height: k.height,
                          format: k.format,
                        }),
                        [
                          4,
                          e.sws_getContext(
                            M.width,
                            M.height,
                            M.format,
                            s.width,
                            s.height,
                            s.format,
                            2,
                            0,
                            0,
                            0
                          ),
                        ]
                      );
                    case 4:
                      return (
                        (S = G.sent()),
                        (r._sws = S),
                        (r._swsIn = M),
                        D ? [3, 6] : ((I = r), [4, e.av_frame_alloc()])
                      );
                    case 5:
                      (I._swsFrame = D = G.sent()), (G.label = 6);
                    case 6:
                      return [
                        4,
                        Promise.all([
                          e.ff_copyin_frame(a, k),
                          e.sws_scale_frame(S, D, a),
                          this._nonSquarePixels
                            ? e.AVFrame_sample_aspect_ratio_s(
                                D,
                                this._sar_num,
                                this._sar_den
                              )
                            : null,
                          e.AVFrame_pts_s(D, E),
                          e.AVFrame_ptshi_s(D, V),
                          e.AVFrame_key_frame_s(D, t.keyFrame ? 1 : 0),
                          e.AVFrame_pict_type_s(D, t.keyFrame ? 1 : 0),
                          e.avcodec_send_frame(o, D),
                        ]),
                      ];
                    case 7:
                      if (
                        ((C = G.sent()), (P = C[1]), (F = C[7]), P < 0 || F < 0)
                      )
                        throw new Error("Encoding failed!");
                      (c = []), (G.label = 8);
                    case 8:
                      return [4, e.avcodec_receive_packet(o, i)];
                    case 9:
                      if ((O = G.sent()) === -e.EAGAIN) return [3, 11];
                      if (O < 0) throw new Error("Encoding failed!");
                      return (R = (T = c).push), [4, e.ff_copyout_packet(i)];
                    case 10:
                      return R.apply(T, [G.sent()]), [3, 8];
                    case 11:
                      return [3, 14];
                    case 12:
                      return (
                        this._nonSquarePixels &&
                          (k.sample_aspect_ratio = [
                            this._sar_num,
                            this._sar_den,
                          ]),
                        [4, e.ff_encode_multi(o, a, i, [k])]
                      );
                    case 13:
                      (c = G.sent()), (G.label = 14);
                    case 14:
                      return !c.length || r._extradataSet
                        ? [3, 16]
                        : [4, r._getExtradata()];
                    case 15:
                      G.sent(), (G.label = 16);
                    case 16:
                      return [3, 18];
                    case 17:
                      return (
                        (B = G.sent()),
                        (r._p = r._p.then(function () {
                          r._closeVideoEncoder(B);
                        })),
                        [3, 18]
                      );
                    case 18:
                      return (
                        r.encodeQueueSize--,
                        c && r._outputEncodedVideoChunks(c),
                        [2]
                      );
                  }
                });
              });
            })
            .catch(this._error));
      }),
      (e.prototype._getExtradata = function () {
        return U(this, void 0, void 0, function () {
          var e, t, r, n, o, i;
          return X(this, function (a) {
            switch (a.label) {
              case 0:
                return (
                  (e = this._libav),
                  (t = this._c),
                  [4, e.AVCodecContext_extradata(t)]
                );
              case 1:
                return (r = a.sent()), [4, e.AVCodecContext_extradata_size(t)];
              case 2:
                return (
                  (n = a.sent()),
                  r && n
                    ? ((o = this._metadata.decoderConfig),
                      (i = this),
                      [4, e.copyout_u8(r, n)])
                    : [3, 4]
                );
              case 3:
                (o.description = i._extradata = a.sent()), (a.label = 4);
              case 4:
                return (this._extradataSet = !0), [2];
            }
          });
        });
      }),
      (e.prototype._outputEncodedVideoChunks = function (e) {
        this._libav;
        for (var t = 0, r = e; t < r.length; t++) {
          var n = r[t],
            o = 1 & n.flags ? "key" : "delta",
            i = Math.floor(1e3 * (4294967296 * n.ptshi + n.pts));
          i < 0 && (i = 0);
          var a = new V.EncodedVideoChunk({
            type: o,
            timestamp: i,
            data: n.data,
          });
          this._extradataSet
            ? this._output(a, this._metadata)
            : this._output(a);
        }
      }),
      (e.prototype.flush = function () {
        var e = this,
          t = this._p.then(function () {
            return U(this, void 0, void 0, function () {
              var t, r, n, o, i, a;
              return X(this, function (s) {
                switch (s.label) {
                  case 0:
                    if (!e._c) return [2];
                    (t = e._libav),
                      (r = e._c),
                      (n = e._frame),
                      (o = e._pkt),
                      (i = null),
                      (s.label = 1);
                  case 1:
                    return (
                      s.trys.push([1, 5, , 6]),
                      [4, t.ff_encode_multi(r, n, o, [], !0)]
                    );
                  case 2:
                    return (
                      (i = s.sent()),
                      e._extradataSet ? [3, 4] : [4, e._getExtradata()]
                    );
                  case 3:
                    s.sent(), (s.label = 4);
                  case 4:
                    return [3, 6];
                  case 5:
                    return (
                      (a = s.sent()),
                      (e._p = e._p.then(function () {
                        e._closeVideoEncoder(a);
                      })),
                      [3, 6]
                    );
                  case 6:
                    return i && e._outputEncodedVideoChunks(i), [2];
                }
              });
            });
          });
        return (this._p = t), t;
      }),
      (e.prototype.reset = function () {
        this._resetVideoEncoder(new DOMException("Reset", "AbortError"));
      }),
      (e.prototype.close = function () {
        this._closeVideoEncoder(new DOMException("Close", "AbortError"));
      }),
      (e.isConfigSupported = function (e) {
        return U(this, void 0, void 0, function () {
          var t, r, n, o, i, a, c;
          return X(this, function (u) {
            switch (u.label) {
              case 0:
                return (
                  (t = s.encoder(e.codec, e)),
                  (r = !1),
                  t ? [4, s.get()] : [3, 8]
                );
              case 1:
                (n = u.sent()), (u.label = 2);
              case 2:
                return (
                  u.trys.push([2, 5, , 6]), [4, n.ff_init_encoder(t.codec, t)]
                );
              case 3:
                return (
                  (o = u.sent()),
                  (i = o[1]),
                  (a = o[2]),
                  (c = o[3]),
                  [4, n.ff_free_encoder(i, a, c)]
                );
              case 4:
                return u.sent(), (r = !0), [3, 6];
              case 5:
                return u.sent(), [3, 6];
              case 6:
                return [4, s.free(n)];
              case 7:
                u.sent(), (u.label = 8);
              case 8:
                return [
                  2,
                  {
                    supported: r,
                    config: _.cloneConfig(e, [
                      "codec",
                      "width",
                      "height",
                      "bitrate",
                      "framerate",
                      "latencyMode",
                    ]),
                  },
                ];
            }
          });
        });
      }),
      e
    );
  })();
  G.VideoEncoder = L;
  var W = {},
    H =
      (this && this.__awaiter) ||
      function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              c(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          c((n = n.apply(e, t || [])).next());
        });
      },
    z =
      (this && this.__generator) ||
      function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: s(0), throw: s(1), return: s(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function s(s) {
          return function (c) {
            return (function (s) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i && ((i = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & s[0]
                          ? n.return
                          : s[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, s[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                    case 0:
                    case 1:
                      o = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (n = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !((o = a.trys),
                        (o = o.length > 0 && o[o.length - 1]) ||
                          (6 !== s[0] && 2 !== s[0]))
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = s);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(s);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = t.call(e, a);
                } catch (e) {
                  (s = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, c]);
          };
        }
      };
  Object.defineProperty(W, "__esModule", { value: !0 }),
    (W.createImageBitmap = W.canvasDrawImage = W.load = void 0);
  var j = null,
    N = null,
    Y = null,
    Q = null;
  function q(e, t, r, n, o, i, a, s, c, u) {
    if (!(t instanceof x.VideoFrame))
      return Y.apply(e, Array.prototype.slice.call(arguments, 1));
    void 0 === o
      ? ((a = r), (s = n), (r = void 0), (n = void 0))
      : void 0 === a &&
        ((a = r),
        (s = n),
        (c = o),
        (u = i),
        (r = void 0),
        (n = void 0),
        (o = void 0),
        (i = void 0)),
      void 0 === c && ((c = t.codedWidth), (u = t.codedHeight));
    var d = j.AV_PIX_FMT_RGBA;
    switch (t.format) {
      case "I420":
        d = j.AV_PIX_FMT_YUV420P;
        break;
      case "I420A":
        d = j.AV_PIX_FMT_YUVA420P;
        break;
      case "I422":
        d = j.AV_PIX_FMT_YUV422P;
        break;
      case "I444":
        d = j.AV_PIX_FMT_YUV444P;
        break;
      case "NV12":
        d = j.AV_PIX_FMT_NV12;
        break;
      case "RGBA":
      case "RGBX":
        d = j.AV_PIX_FMT_RGBA;
        break;
      case "BGRA":
      case "BGRX":
        d = j.AV_PIX_FMT_BGRA;
    }
    for (
      var l = new ImageData(c, u),
        f = j.sws_getContext_sync(
          t.codedWidth,
          t.codedHeight,
          d,
          c,
          u,
          j.AV_PIX_FMT_RGBA,
          2,
          0,
          0,
          0
        ),
        h = j.av_frame_alloc_sync(),
        p = j.av_frame_alloc_sync(),
        _ = t._libavGetData(),
        v = 0,
        b = [],
        m = x.numPlanes(t.format),
        w = 0;
      w < m;
      w++
    ) {
      var y = [];
      b.push(y);
      for (
        var g = x.sampleBytes(t.format, w),
          A = x.horizontalSubSamplingFactor(t.format, w),
          E = x.verticalSubSamplingFactor(t.format, w),
          V = ~~((t.codedWidth * g) / A),
          k = ~~(t.codedHeight / E),
          S = 0;
        S < k;
        S++
      )
        y.push(_.subarray(v, v + V)), (v += V);
    }
    j.ff_copyin_frame_sync(h, {
      data: b,
      format: d,
      width: t.codedWidth,
      height: t.codedHeight,
    }),
      j.sws_scale_frame_sync(f, p, h);
    for (
      var M = j.ff_copyout_frame_sync(p), D = 0, I = 0;
      I < M.data.length;
      I++
    )
      for (y = M.data[I], S = 0; S < y.length; S++) {
        var C = y[S];
        l.data.set(C, D), (D += C.length);
      }
    e.putImageData(l, a, s),
      j.av_frame_free_js_sync(p),
      j.av_frame_free_js_sync(h),
      j.sws_freeContext_sync(f);
  }
  function J(e, t, r, n, o, i, a, s, c) {
    return e instanceof x.VideoFrame
      ? q(this, e, t, r, n, o, i, a, s, c)
      : Y.apply(this, arguments);
  }
  function K(e, t) {
    var r = this;
    if ((void 0 === t && (t = {}), !(e instanceof x.VideoFrame)))
      return Q.apply(window, arguments);
    var n = N.AV_PIX_FMT_RGBA;
    switch (e.format) {
      case "I420":
        n = N.AV_PIX_FMT_YUV420P;
        break;
      case "I420A":
        n = N.AV_PIX_FMT_YUVA420P;
        break;
      case "I422":
        n = N.AV_PIX_FMT_YUV422P;
        break;
      case "I444":
        n = N.AV_PIX_FMT_YUV444P;
        break;
      case "NV12":
        n = N.AV_PIX_FMT_NV12;
        break;
      case "RGBA":
      case "RGBX":
        n = N.AV_PIX_FMT_RGBA;
        break;
      case "BGRA":
      case "BGRX":
        n = N.AV_PIX_FMT_BGRA;
    }
    var o = "number" == typeof t.resizeWidth ? t.resizeWidth : e.displayWidth,
      i = "number" == typeof t.resizeHeight ? t.resizeHeight : e.displayHeight,
      a = new ImageData(o, i);
    return H(r, void 0, void 0, function () {
      var t, r, s, c, u, d, l, f, h, p, _, v, b, m, w, y, g, A, E, V, k;
      return z(this, function (S) {
        switch (S.label) {
          case 0:
            return [
              4,
              Promise.all([
                N.sws_getContext(
                  e.codedWidth,
                  e.codedHeight,
                  n,
                  o,
                  i,
                  N.AV_PIX_FMT_RGBA,
                  2,
                  0,
                  0,
                  0
                ),
                N.av_frame_alloc(),
                N.av_frame_alloc(),
              ]),
            ];
          case 1:
            for (
              t = S.sent(),
                r = t[0],
                s = t[1],
                c = t[2],
                u = e._libavGetData(),
                d = 0,
                l = [],
                f = x.numPlanes(e.format),
                h = 0;
              h < f;
              h++
            )
              for (
                E = [],
                  l.push(E),
                  p = x.sampleBytes(e.format, h),
                  _ = x.horizontalSubSamplingFactor(e.format, h),
                  v = x.verticalSubSamplingFactor(e.format, h),
                  b = ~~((e.codedWidth * p) / _),
                  m = ~~(e.codedHeight / v),
                  V = 0;
                V < m;
                V++
              )
                E.push(u.subarray(d, d + b)), (d += b);
            return [
              4,
              Promise.all([
                N.ff_copyin_frame(s, {
                  data: l,
                  format: n,
                  width: e.codedWidth,
                  height: e.codedHeight,
                }),
                N.sws_scale_frame(r, c, s),
                N.ff_copyout_frame(c),
                N.av_frame_free_js(c),
                N.av_frame_free_js(s),
                N.sws_freeContext(r),
              ]),
            ];
          case 2:
            for (w = S.sent(), y = w[2], g = 0, A = 0; A < y.data.length; A++)
              for (E = y.data[A], V = 0; V < E.length; V++)
                (k = E[V]), a.data.set(k, g), (g += k.length);
            return [4, Q(a)];
          case 3:
            return [2, S.sent()];
        }
      });
    });
  }
  (W.load = function (e, t) {
    return H(this, void 0, void 0, function () {
      return z(this, function (r) {
        switch (r.label) {
          case 0:
            return [4, LibAV.LibAV({ noworker: !0 })];
          case 1:
            return (j = r.sent()), [4, LibAV.LibAV(e)];
          case 2:
            return (
              (N = r.sent()),
              (Y = CanvasRenderingContext2D.prototype.drawImage),
              t && (CanvasRenderingContext2D.prototype.drawImage = J),
              (Q = window.createImageBitmap),
              t && (window.createImageBitmap = K),
              [2]
            );
        }
      });
    });
  }),
    (W.canvasDrawImage = q),
    (W.createImageBitmap = K);
  var Z,
    $ = {},
    ee =
      (this && this.__extends) ||
      ((Z = function (e, t) {
        return (Z =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (e, t) {
              e.__proto__ = t;
            }) ||
          function (e, t) {
            for (var r in t)
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          })(e, t);
      }),
      function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Class extends value " + String(t) + " is not a constructor or null"
          );
        function r() {
          this.constructor = e;
        }
        Z(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((r.prototype = t.prototype), new r()));
      }),
    te =
      (this && this.__awaiter) ||
      function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              c(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          c((n = n.apply(e, t || [])).next());
        });
      },
    re =
      (this && this.__generator) ||
      function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: s(0), throw: s(1), return: s(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function s(s) {
          return function (c) {
            return (function (s) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i && ((i = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & s[0]
                          ? n.return
                          : s[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, s[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                    case 0:
                    case 1:
                      o = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (n = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !((o = a.trys),
                        (o = o.length > 0 && o[o.length - 1]) ||
                          (6 !== s[0] && 2 !== s[0]))
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = s);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(s);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = t.call(e, a);
                } catch (e) {
                  (s = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, c]);
          };
        }
      };
  Object.defineProperty($, "__esModule", { value: !0 }),
    ($.getVideoEncoder =
      $.getAudioEncoder =
      $.getVideoDecoder =
      $.getAudioDecoder =
      $.UnsupportedException =
        void 0);
  var ne = (function (e) {
    function t() {
      return (
        e.call(this, "The requested configuration is not supported") || this
      );
    }
    return ee(t, e), t;
  })(Error);
  ($.UnsupportedException = ne),
    ($.getAudioDecoder = function (t) {
      return te(this, void 0, void 0, function () {
        var n;
        return re(this, function (o) {
          switch (o.label) {
            case 0:
              return (
                o.trys.push([0, 3, , 4]),
                (n = void 0 !== window.AudioDecoder)
                  ? [4, window.AudioDecoder.isConfigSupported(t)]
                  : [3, 2]
              );
            case 1:
              (n = o.sent().supported), (o.label = 2);
            case 2:
              return n
                ? [
                    2,
                    {
                      AudioDecoder: window.AudioDecoder,
                      EncodedAudioChunk: window.EncodedAudioChunk,
                      AudioData: window.AudioData,
                    },
                  ]
                : [3, 4];
            case 3:
              return o.sent(), [3, 4];
            case 4:
              return [4, v.AudioDecoder.isConfigSupported(t)];
            case 5:
              if (o.sent().supported)
                return [
                  2,
                  {
                    AudioDecoder: v.AudioDecoder,
                    EncodedAudioChunk: e.EncodedAudioChunk,
                    AudioData: r.AudioData,
                  },
                ];
              throw new ne();
          }
        });
      });
    }),
    ($.getVideoDecoder = function (e) {
      return te(this, void 0, void 0, function () {
        var t;
        return re(this, function (r) {
          switch (r.label) {
            case 0:
              return (
                r.trys.push([0, 3, , 4]),
                (t = void 0 !== window.VideoDecoder)
                  ? [4, window.VideoDecoder.isConfigSupported(e)]
                  : [3, 2]
              );
            case 1:
              (t = r.sent().supported), (r.label = 2);
            case 2:
              return t
                ? [
                    2,
                    {
                      VideoDecoder: window.VideoDecoder,
                      EncodedVideoChunk: window.EncodedVideoChunk,
                      VideoFrame: window.VideoFrame,
                    },
                  ]
                : [3, 4];
            case 3:
              return r.sent(), [3, 4];
            case 4:
              return [4, O.VideoDecoder.isConfigSupported(e)];
            case 5:
              if (r.sent().supported)
                return [
                  2,
                  {
                    VideoDecoder: O.VideoDecoder,
                    EncodedVideoChunk: V.EncodedVideoChunk,
                    VideoFrame: x.VideoFrame,
                  },
                ];
              throw new ne();
          }
        });
      });
    }),
    ($.getAudioEncoder = function (t) {
      return te(this, void 0, void 0, function () {
        var n;
        return re(this, function (o) {
          switch (o.label) {
            case 0:
              return (
                o.trys.push([0, 3, , 4]),
                (n = void 0 !== window.AudioEncoder)
                  ? [4, window.AudioEncoder.isConfigSupported(t)]
                  : [3, 2]
              );
            case 1:
              (n = o.sent().supported), (o.label = 2);
            case 2:
              return n
                ? [
                    2,
                    {
                      AudioEncoder: window.AudioEncoder,
                      EncodedAudioChunk: window.EncodedAudioChunk,
                      AudioData: window.AudioData,
                    },
                  ]
                : [3, 4];
            case 3:
              return o.sent(), [3, 4];
            case 4:
              return [4, y.AudioEncoder.isConfigSupported(t)];
            case 5:
              if (o.sent().supported)
                return [
                  2,
                  {
                    AudioEncoder: y.AudioEncoder,
                    EncodedAudioChunk: e.EncodedAudioChunk,
                    AudioData: r.AudioData,
                  },
                ];
              throw new ne();
          }
        });
      });
    }),
    ($.getVideoEncoder = function (e) {
      return te(this, void 0, void 0, function () {
        var t;
        return re(this, function (r) {
          switch (r.label) {
            case 0:
              return (
                r.trys.push([0, 3, , 4]),
                (t = void 0 !== window.VideoEncoder)
                  ? [4, window.VideoEncoder.isConfigSupported(e)]
                  : [3, 2]
              );
            case 1:
              (t = r.sent().supported), (r.label = 2);
            case 2:
              return t
                ? [
                    2,
                    {
                      VideoEncoder: window.VideoEncoder,
                      EncodedVideoChunk: window.EncodedVideoChunk,
                      VideoFrame: window.VideoFrame,
                    },
                  ]
                : [3, 4];
            case 3:
              return r.sent(), [3, 4];
            case 4:
              return [4, G.VideoEncoder.isConfigSupported(e)];
            case 5:
              if (r.sent().supported)
                return [
                  2,
                  {
                    VideoEncoder: G.VideoEncoder,
                    EncodedVideoChunk: V.EncodedVideoChunk,
                    VideoFrame: x.VideoFrame,
                  },
                ];
              throw new ne();
          }
        });
      });
    });
  var oe = {},
    ie =
      (this && this.__awaiter) ||
      function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              c(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(a, s);
          }
          c((n = n.apply(e, t || [])).next());
        });
      },
    ae =
      (this && this.__generator) ||
      function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: s(0), throw: s(1), return: s(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function s(s) {
          return function (c) {
            return (function (s) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; i && ((i = 0), s[0] && (a = 0)), a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & s[0]
                          ? n.return
                          : s[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, s[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (s = [2 & s[0], o.value]), s[0])) {
                    case 0:
                    case 1:
                      o = s;
                      break;
                    case 4:
                      return a.label++, { value: s[1], done: !1 };
                    case 5:
                      a.label++, (n = s[1]), (s = [0]);
                      continue;
                    case 7:
                      (s = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !((o = a.trys),
                        (o = o.length > 0 && o[o.length - 1]) ||
                          (6 !== s[0] && 2 !== s[0]))
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === s[0] && (!o || (s[1] > o[0] && s[1] < o[3]))) {
                        a.label = s[1];
                        break;
                      }
                      if (6 === s[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = s);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(s);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  s = t.call(e, a);
                } catch (e) {
                  (s = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & s[0]) throw s[1];
              return { value: s[0] ? s[1] : void 0, done: !0 };
            })([s, c]);
          };
        }
      };
  return (
    Object.defineProperty(oe, "__esModule", { value: !0 }),
    (oe.getVideoEncoder =
      oe.getAudioEncoder =
      oe.getVideoDecoder =
      oe.getAudioDecoder =
      oe.UnsupportedException =
      oe.createImageBitmap =
      oe.canvasDrawImage =
      oe.VideoEncoder =
      oe.VideoDecoder =
      oe.VideoFrame =
      oe.EncodedVideoChunk =
      oe.AudioEncoder =
      oe.AudioDecoder =
      oe.AudioData =
      oe.EncodedAudioChunk =
      oe.load =
        void 0),
    (oe.load = function (e) {
      return (
        void 0 === e && (e = {}),
        ie(this, void 0, void 0, function () {
          var t, r, n, o;
          return ae(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  (t = {}),
                  e.libavOptions && Object.assign(t, e.libavOptions),
                  "undefined" != typeof LibAV
                    ? [3, 2]
                    : [
                        4,
                        new Promise(function (e, r) {
                          (t.noworker = !0),
                            (LibAV = {
                              base: "https://unpkg.com/libav.js@3.6.4",
                            });
                          var n = document.createElement("script");
                          (n.src =
                            "https://unpkg.com/libav.js@3.6.4/libav-3.6.4.4.1-webm-opus-flac.js"),
                            (n.onload = e),
                            (n.onerror = r),
                            document.body.appendChild(n);
                        }),
                      ]
                );
              case 1:
                i.sent(), (i.label = 2);
              case 2:
                return s.setLibAVOptions(t), [4, s.load()];
              case 3:
                if ((i.sent(), e.polyfill))
                  for (
                    r = 0,
                      n = [
                        "EncodedAudioChunk",
                        "AudioData",
                        "AudioDecoder",
                        "AudioEncoder",
                        "EncodedVideoChunk",
                        "VideoFrame",
                        "VideoDecoder",
                        "VideoEncoder",
                      ];
                    r < n.length;
                    r++
                  )
                    (o = n[r]), window[o] || (window[o] = this[o]);
                return [4, W.load(t, !!e.polyfill)];
              case 4:
                return i.sent(), [2];
            }
          });
        })
      );
    }),
    (oe.EncodedAudioChunk = e.EncodedAudioChunk),
    (oe.AudioData = r.AudioData),
    (oe.AudioDecoder = v.AudioDecoder),
    (oe.AudioEncoder = y.AudioEncoder),
    (oe.EncodedVideoChunk = V.EncodedVideoChunk),
    (oe.VideoFrame = x.VideoFrame),
    (oe.VideoDecoder = O.VideoDecoder),
    (oe.VideoEncoder = G.VideoEncoder),
    (oe.canvasDrawImage = W.canvasDrawImage),
    (oe.createImageBitmap = W.createImageBitmap),
    (oe.UnsupportedException = $.UnsupportedException),
    (oe.getAudioDecoder = $.getAudioDecoder),
    (oe.getVideoDecoder = $.getVideoDecoder),
    (oe.getAudioEncoder = $.getAudioEncoder),
    (oe.getVideoEncoder = $.getVideoEncoder),
    oe
  );
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJ3aW5kb3ciLCJnbG9iYWwiLCJzZWxmIiwidGhpcyIsIkxpYkFWV2ViQ29kZWNzIiwiXyRlbmNvZGVkQXVkaW9DaHVua181IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsIkVuY29kZWRBdWRpb0NodW5rIiwiaW5pdCIsInR5cGUiLCJ0aW1lc3RhbXAiLCJkdXJhdGlvbiIsImRhdGEiLCJfZGF0YSIsIlVpbnQ4QXJyYXkiLCJidWZmZXIiLCJieXRlT2Zmc2V0IiwiYnl0ZUxlbmd0aCIsInByb3RvdHlwZSIsIl9saWJhdkdldERhdGEiLCJjb3B5VG8iLCJkZXN0aW5hdGlvbiIsInNldCIsIl8kYXVkaW9EYXRhXzEiLCJpc0ludGVybGVhdmVkIiwiQXVkaW9EYXRhIiwiZm9ybWF0Iiwic2FtcGxlUmF0ZSIsIm51bWJlck9mRnJhbWVzIiwibnVtYmVyT2ZDaGFubmVscyIsImF1ZGlvVmlldyIsImFsbG9jYXRpb25TaXplIiwib3B0aW9ucyIsIkRPTUV4Y2VwdGlvbiIsImNvcHlFbGVtZW50Q291bnQiLCJfY29tcHV0ZUNvcHlFbGVtZW50Q291bnQiLCJkZXN0Rm9ybWF0IiwiYnl0ZXNQZXJTYW1wbGUiLCJpc0ludGVybGVhdmVkXyIsInBsYW5lSW5kZXgiLCJSYW5nZUVycm9yIiwiZnJhbWVDb3VudCIsImZyYW1lT2Zmc2V0IiwiY29weUZyYW1lQ291bnQiLCJlbGVtZW50Q291bnQiLCJwbGFuZUZyYW1lcyIsInN1YmFycmF5IiwiZGVzdCIsIm91dCIsInN1YiIsImRpdiIsImkiLCJvIiwiY2xvbmUiLCJjbG9zZSIsIkludDE2QXJyYXkiLCJJbnQzMkFycmF5IiwiRmxvYXQzMkFycmF5IiwiVHlwZUVycm9yIiwiXyRsaWJhdl83IiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJfX2dlbmVyYXRvciIsImJvZHkiLCJ5IiwidCIsImciLCJfIiwibGFiZWwiLCJzZW50IiwidHJ5cyIsIm9wcyIsInZlcmIiLCJ0aHJvdyIsInJldHVybiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwibiIsInYiLCJvcCIsImNhbGwiLCJwb3AiLCJsZW5ndGgiLCJwdXNoIiwiZW5jb2RlciIsImRlY29kZXIiLCJsb2FkIiwiZnJlZSIsImdldCIsInNldExpYkFWT3B0aW9ucyIsImVuY29kZXJzIiwiZGVjb2RlcnMiLCJsaWJhdnMiLCJsaWJhdk9wdGlvbnMiLCJfYSIsInNoaWZ0IiwiTGliQVYiLCJsaWJhdiIsImNvZGVjcyIsInJldCIsIl9pIiwiX2IiLCJhdm5hbWUiLCJjb2RlYyIsIl9jIiwiYXZjb2RlY19maW5kX2VuY29kZXJfYnlfbmFtZSIsImF2Y29kZWNfZmluZF9kZWNvZGVyX2J5X25hbWUiLCJ0byIsIm91dENvZGVjIiwicmVwbGFjZSIsImluZGV4T2YiLCJsaWJhdmpzIiwiY29uZmlnIiwiY29kZWNQYXJ0cyIsInNwbGl0IiwiY3R4IiwidmlkZW8iLCJzYW1wbGVfZm10IiwiYml0X3JhdGUiLCJzYW1wbGVfcmF0ZSIsImxhdGVuY3lNb2RlIiwidXNhZ2UiLCJwcm9maWxlIiwibGV2ZWwiLCJkZXB0aCIsInBpeF9mbXQiLCJhdjFBZHZhbmNlZCIsInF1YWxpdHkiLCJ2cDlBZHZhbmNlZCIsIndpZHRoIiwiaGVpZ2h0IiwiZnJhbWVyYXRlIiwiZnJhbWVyYXRlX251bSIsIk1hdGgiLCJyb3VuZCIsImZyYW1lcmF0ZV9kZW4iLCJkV2lkdGgiLCJkaXNwbGF5V2lkdGgiLCJkSGVpZ2h0IiwiZGlzcGxheUhlaWdodCIsInNhbXBsZV9hc3BlY3RfcmF0aW9fbnVtIiwic2FtcGxlX2FzcGVjdF9yYXRpb19kZW4iLCJjaGFubmVsX2xheW91dCIsImJpdHJhdGUiLCJfJG1pc2NfOSIsImNsb25lQ29uZmlnIiwiZmllbGRzIiwiZmllbGRzXzEiLCJmaWVsZCIsIl8kYXVkaW9EZWNvZGVyXzIiLCJfX19fYXdhaXRlcl8yIiwiX19fX2dlbmVyYXRvcl8yIiwiQXVkaW9EZWNvZGVyIiwiX291dHB1dCIsIm91dHB1dCIsIl9lcnJvciIsImVycm9yIiwic3RhdGUiLCJkZWNvZGVRdWV1ZVNpemUiLCJfcCIsImFsbCIsIl9saWJhdiIsIl9jb2RlYyIsIl9wa3QiLCJfZnJhbWUiLCJjb25maWd1cmUiLCJfdGhpcyIsIl9mcmVlIiwic3VwcG9ydGVkIiwiX2QiLCJmZl9pbml0X2RlY29kZXIiLCJBVkNvZGVjQ29udGV4dF90aW1lX2Jhc2VfcyIsIl9jbG9zZUF1ZGlvRGVjb2RlciIsImNhdGNoIiwiZmZfZnJlZV9kZWNvZGVyIiwiZXhjZXB0aW9uIiwiX3Jlc2V0QXVkaW9EZWNvZGVyIiwibmFtZSIsImRlY29kZSIsImNodW5rIiwiYyIsInBrdCIsImZyYW1lIiwiZGVjb2RlZE91dHB1dHMiLCJwdHNGdWxsIiwicHRzIiwicHRzaGkiLCJwYWNrZXQiLCJleF8xIiwiZmxvb3IiLCJkdHMiLCJkdHNoaSIsImR1cmF0aW9uaGkiLCJmZl9kZWNvZGVfbXVsdGkiLCJfb3V0cHV0QXVkaW9EYXRhIiwiZnJhbWVzIiwiZnJhbWVzXzEiLCJwbGFuYXIiLCJBVl9TQU1QTEVfRk1UX1U4IiwiQVZfU0FNUExFX0ZNVF9TMTYiLCJBVl9TQU1QTEVfRk1UX1MzMiIsIkFWX1NBTVBMRV9GTVRfRkxUIiwiQVZfU0FNUExFX0ZNVF9VOFAiLCJBVl9TQU1QTEVfRk1UX1MxNlAiLCJBVl9TQU1QTEVfRk1UX1MzMlAiLCJBVl9TQU1QTEVfRk1UX0ZMVFAiLCJuYl9zYW1wbGVzIiwiY2hhbm5lbHMiLCJyYXciLCJjdCIsInBhcnQiLCJmbHVzaCIsImV4XzIiLCJyZXNldCIsImlzQ29uZmlnU3VwcG9ydGVkIiwiZGVjIiwiXyRhdWRpb0VuY29kZXJfMyIsIl9fX19hd2FpdGVyXzMiLCJfX19fZ2VuZXJhdG9yXzMiLCJBdWRpb0VuY29kZXIiLCJlbmNvZGVRdWV1ZVNpemUiLCJfZmlsdGVyX2luX2N0eCIsIl9maWx0ZXJfb3V0X2N0eCIsIl9maWx0ZXJfZ3JhcGgiLCJfYnVmZmVyc3JjX2N0eCIsIl9idWZmZXJzaW5rX2N0eCIsImZyYW1lX3NpemUiLCJfb3V0cHV0TWV0YWRhdGEiLCJkZWNvZGVyQ29uZmlnIiwiX291dHB1dE1ldGFkYXRhRmlsbGVkIiwiZmZfaW5pdF9lbmNvZGVyIiwiX3B0cyIsIl9jbG9zZUF1ZGlvRW5jb2RlciIsImF2ZmlsdGVyX2dyYXBoX2ZyZWVfanMiLCJmZl9mcmVlX2VuY29kZXIiLCJfcmVzZXRBdWRpb0VuY29kZXIiLCJlbmNvZGUiLCJkYXRhQ2xvbmUiLCJmcmFtZVB0ciIsImVuY29kZWRPdXRwdXRzIiwiY2MiLCJwcmVPdXRwdXRzIiwiZmZyYW1lc18xIiwiZmlsdGVyX2N0eCIsImZmcmFtZXMiLCJfZmlsdGVyIiwiZmZfZW5jb2RlX211bHRpIiwiZmZfaW5pdF9maWx0ZXJfZ3JhcGgiLCJjb25jYXQiLCJfZ2V0T3V0cHV0TWV0YWRhdGEiLCJfb3V0cHV0RW5jb2RlZEF1ZGlvQ2h1bmtzIiwiZmluIiwiZmZyYW1lc18yIiwiZmZfZmlsdGVyX211bHRpIiwiZXh0cmFkYXRhUHRyIiwiZXh0cmFkYXRhX3NpemUiLCJleHRyYWRhdGEiLCJBVkNvZGVjQ29udGV4dF9leHRyYWRhdGEiLCJBVkNvZGVjQ29udGV4dF9leHRyYWRhdGFfc2l6ZSIsImNvcHlvdXRfdTgiLCJkZXNjcmlwdGlvbiIsInBhY2tldHMiLCJwYWNrZXRzXzEiLCJmbGFncyIsImJ1ZmZlcnNyY19jdHgiLCJlbmMiLCJfJGVuY29kZWRWaWRlb0NodW5rXzYiLCJFbmNvZGVkVmlkZW9DaHVuayIsIl8kdmlkZW9GcmFtZV8xMyIsIl9fX19hd2FpdGVyXzEzIiwiX19fX2dlbmVyYXRvcl8xMyIsInZlcnRpY2FsU3ViU2FtcGxpbmdGYWN0b3IiLCJob3Jpem9udGFsU3ViU2FtcGxpbmdGYWN0b3IiLCJzYW1wbGVCeXRlcyIsIm51bVBsYW5lcyIsIlZpZGVvRnJhbWUiLCJvZmZzY3JlZW5DYW52YXMiLCJBcnJheUJ1ZmZlciIsIl9jb25zdHJ1Y3RCdWZmZXIiLCJfY29uc3RydWN0Q2FudmFzIiwiaW1hZ2UiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImRpc3BsYXkiLCJhcHBlbmRDaGlsZCIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0IiwiZHJhd0ltYWdlIiwiZ2V0SW1hZ2VEYXRhIiwiY29kZWRXaWR0aCIsImNvZGVkSGVpZ2h0IiwibGF5b3V0Iiwib2Zmc2V0Iiwic3RyaWRlIiwidmlzaWJsZVJlY3QiLCJET01SZWN0IiwiX25vblNxdWFyZVBpeGVscyIsIl9zYXJfbnVtIiwiX3Nhcl9kZW4iLCJfbGF5b3V0IiwibnVtUGxhbmVzXyIsInNhbXBsZVdpZHRoIiwic2FtcGxlSGVpZ2h0IiwiX3BhcnNlVmlkZW9GcmFtZUNvcHlUb09wdGlvbnMiLCJkZWZhdWx0UmVjdCIsIm92ZXJyaWRlUmVjdCIsInJlY3QiLCJ4IiwicGFyc2VkUmVjdCIsIl9wYXJzZVZpc2libGVSZWN0Iiwib3B0TGF5b3V0IiwiX2NvbXB1dGVMYXlvdXRBbmRBbGxvY2F0aW9uU2l6ZSIsInNvdXJjZVJlY3QiLCJfdmVyaWZ5UmVjdFNhbXBsZUFsaWdubWVudCIsIm1pbkFsbG9jYXRpb25TaXplIiwiY29tcHV0ZWRMYXlvdXRzIiwiZW5kT2Zmc2V0cyIsInNhbXBsZUJ5dGVzXyIsInNhbXBsZVdpZHRoQnl0ZXMiLCJjb21wdXRlZExheW91dCIsImRlc3RpbmF0aW9uT2Zmc2V0IiwiZGVzdGluYXRpb25TdHJpZGUiLCJzb3VyY2VUb3AiLCJzb3VyY2VIZWlnaHQiLCJzb3VyY2VMZWZ0Qnl0ZXMiLCJzb3VyY2VXaWR0aEJ5dGVzIiwicGxhbmVMYXlvdXQiLCJwbGFuZVNpemUiLCJwbGFuZUVuZCIsImVhcmxpZXJQbGFuZUluZGV4IiwieHciLCJ3dyIsInloIiwiaGgiLCJkZXN0QnVmIiwiY29tYmluZWRMYXlvdXQiLCJzb3VyY2VTdHJpZGUiLCJzb3VyY2VPZmZzZXQiLCJyb3dCeXRlcyIsInJvdyIsIl8kdmlkZW9EZWNvZGVyXzExIiwiX19fX2F3YWl0ZXJfMTEiLCJfX19fZ2VuZXJhdG9yXzExIiwiVmlkZW9EZWNvZGVyIiwiX2Nsb3NlVmlkZW9EZWNvZGVyIiwiX3Jlc2V0VmlkZW9EZWNvZGVyIiwiX291dHB1dFZpZGVvRnJhbWVzIiwiQVZfUElYX0ZNVF9ZVVY0MjBQIiwiQVZfUElYX0ZNVF9ZVVZBNDIwUCIsIkFWX1BJWF9GTVRfWVVWNDIyUCIsIkFWX1BJWF9GTVRfWVVWNDQ0UCIsIkFWX1BJWF9GTVRfTlYxMiIsIkFWX1BJWF9GTVRfUkdCQSIsIkFWX1BJWF9GTVRfQkdSQSIsInNhbXBsZV9hc3BlY3RfcmF0aW8iLCJzYXIiLCJmZCIsImoiLCJjb25zb2xlIiwibG9nIiwiXyR2aWRlb0VuY29kZXJfMTIiLCJfX19fYXdhaXRlcl8xMiIsIl9fX19nZW5lcmF0b3JfMTIiLCJWaWRlb0VuY29kZXIiLCJfbWV0YWRhdGEiLCJfZXh0cmFkYXRhU2V0IiwiX2V4dHJhZGF0YSIsIl9zd3MiLCJfc3dzRnJhbWUiLCJfc3dzT3V0IiwiX2Nsb3NlVmlkZW9FbmNvZGVyIiwiYXZfZnJhbWVfZnJlZV9qcyIsInN3c19mcmVlQ29udGV4dCIsIl9zd3NJbiIsIl9yZXNldFZpZGVvRW5jb2RlciIsImZyYW1lQ2xvbmUiLCJzd3NPdXQiLCJyYXdVOCIsInJhd0lkeCIsInBsYW5lcyIsInAiLCJwbGFuZSIsInNiIiwiaHNzZiIsInZzc2YiLCJ3IiwiaCIsImZyYW1lXzEiLCJzd3MiLCJzd3NJbiIsInN3c0ZyYW1lIiwic3dzUmVzIiwiZW5jUmVzIiwicmVjdiIsIl9lIiwiX2YiLCJrZXlfZnJhbWUiLCJrZXlGcmFtZSIsInBpY3RfdHlwZSIsInN3c19nZXRDb250ZXh0IiwiYXZfZnJhbWVfYWxsb2MiLCJmZl9jb3B5aW5fZnJhbWUiLCJzd3Nfc2NhbGVfZnJhbWUiLCJBVkZyYW1lX3NhbXBsZV9hc3BlY3RfcmF0aW9fcyIsIkFWRnJhbWVfcHRzX3MiLCJBVkZyYW1lX3B0c2hpX3MiLCJBVkZyYW1lX2tleV9mcmFtZV9zIiwiQVZGcmFtZV9waWN0X3R5cGVfcyIsImF2Y29kZWNfc2VuZF9mcmFtZSIsIkVycm9yIiwiYXZjb2RlY19yZWNlaXZlX3BhY2tldCIsIkVBR0FJTiIsImZmX2NvcHlvdXRfcGFja2V0IiwiX2dldEV4dHJhZGF0YSIsIl9vdXRwdXRFbmNvZGVkVmlkZW9DaHVua3MiLCJfJHJlbmRlcmluZ18xMCIsIl9fX19hd2FpdGVyXzEwIiwiX19fX2dlbmVyYXRvcl8xMCIsImNyZWF0ZUltYWdlQml0bWFwIiwiY2FudmFzRHJhd0ltYWdlIiwic2NhbGVyU3luYyIsInNjYWxlckFzeW5jIiwib3JpZ0RyYXdJbWFnZSIsIm9yaWdDcmVhdGVJbWFnZUJpdG1hcCIsInN4Iiwic3kiLCJzV2lkdGgiLCJzSGVpZ2h0IiwiZHgiLCJkeSIsIkFycmF5Iiwic2xpY2UiLCJhcmd1bWVudHMiLCJmcmFtZURhdGEiLCJJbWFnZURhdGEiLCJzY3R4Iiwic3dzX2dldENvbnRleHRfc3luYyIsImluRnJhbWUiLCJhdl9mcmFtZV9hbGxvY19zeW5jIiwib3V0RnJhbWUiLCJmZl9jb3B5aW5fZnJhbWVfc3luYyIsInN3c19zY2FsZV9mcmFtZV9zeW5jIiwiZmZfY29weW91dF9mcmFtZV9zeW5jIiwiaWR4IiwicHV0SW1hZ2VEYXRhIiwiYXZfZnJhbWVfZnJlZV9qc19zeW5jIiwic3dzX2ZyZWVDb250ZXh0X3N5bmMiLCJkcmF3SW1hZ2VQb2x5ZmlsbCIsIm9wdHMiLCJyZXNpemVXaWR0aCIsInJlc2l6ZUhlaWdodCIsImZmX2NvcHlvdXRfZnJhbWUiLCJwb2x5ZmlsbCIsIm5vd29ya2VyIiwiQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIiwiZXh0ZW5kU3RhdGljcyIsIl8kY29uZmlnXzQiLCJfX2V4dGVuZHMiLCJkIiwiYiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiaGFzT3duUHJvcGVydHkiLCJTdHJpbmciLCJfXyIsImNvbnN0cnVjdG9yIiwiY3JlYXRlIiwiX19fX2F3YWl0ZXJfNCIsIl9fX19nZW5lcmF0b3JfNCIsImdldFZpZGVvRW5jb2RlciIsImdldEF1ZGlvRW5jb2RlciIsImdldFZpZGVvRGVjb2RlciIsImdldEF1ZGlvRGVjb2RlciIsIlVuc3VwcG9ydGVkRXhjZXB0aW9uIiwiX3N1cGVyIiwiXyRtYWluXzgiLCJfX19fYXdhaXRlcl84IiwiX19fX2dlbmVyYXRvcl84IiwiZXhwIiwiYXNzaWduIiwicmVzIiwicmVqIiwiYmFzZSIsInNjciIsInNyYyIsIm9ubG9hZCIsIm9uZXJyb3IiXSwibWFwcGluZ3MiOiJDQUFBLFNBQVVBLEdBQUcsR0FBb0IsaUJBQVZDLFNBQW9DLG9CQUFUQyxPQUFzQkEsT0FBT0QsUUFBUUQsU0FBUyxHQUFtQixtQkFBVEcsUUFBcUJBLE9BQU9DLElBQUtELE9BQU8sR0FBR0gsT0FBTyxFQUEwQixvQkFBVEssT0FBd0JBLE9BQStCLG9CQUFUQyxPQUF3QkEsT0FBNkIsb0JBQVBDLEtBQXNCQSxLQUFZQyxNQUFPQyxlQUFpQlQsS0FBblUsRUFBMFUsV0FBVyxJQUNqVlUsRUFBd0IsR0FvQjVCQyxPQUFPQyxlQUFlRixFQUF1QixhQUFjLENBQUVHLE9BQU8sSUFDcEVILEVBQXNCSSx1QkFBb0IsRUFDMUMsSUFBSUEsRUFBbUMsV0FDbkMsU0FBU0EsRUFBa0JDLEdBQ3ZCUCxLQUFLUSxLQUFPRCxFQUFLQyxLQUNqQlIsS0FBS1MsVUFBWUYsRUFBS0UsVUFDdEJULEtBQUtVLFNBQVdILEVBQUtHLFVBQVksRUFDakMsSUFBSUMsRUFBT1gsS0FBS1ksTUFDWixJQUFJQyxXQUFXTixFQUFLSSxLQUFLRyxRQUFVUCxFQUFLSSxLQUFNSixFQUFLSSxLQUFLSSxZQUFjLEdBQzFFZixLQUFLZ0IsV0FBYUwsRUFBS0ssV0FPM0IsT0FKQVYsRUFBa0JXLFVBQVVDLGNBQWdCLFdBQWMsT0FBT2xCLEtBQUtZLE9BQ3RFTixFQUFrQlcsVUFBVUUsT0FBUyxTQUFVQyxHQUMzQyxJQUFLUCxXQUFXTyxFQUFZTixRQUFVTSxFQUFhQSxFQUFZTCxZQUFjLEdBQUlNLElBQUlyQixLQUFLWSxRQUV2Rk4sRUFkMkIsR0FnQnRDSixFQUFzQkksa0JBQW9CQSxFQUUxQyxJQUFJZ0IsRUFBZ0IsR0FvQnBCbkIsT0FBT0MsZUFBZWtCLEVBQWUsYUFBYyxDQUFFakIsT0FBTyxJQUM1RGlCLEVBQWNDLGNBQWdCRCxFQUFjRSxlQUFZLEVBQ3hELElBQUlBLEVBQTJCLFdBQzNCLFNBQVNBLEVBQVVqQixHQUNmLElBQUlrQixFQUFTekIsS0FBS3lCLE9BQVNsQixFQUFLa0IsT0FDNUJDLEVBQWExQixLQUFLMEIsV0FBYW5CLEVBQUttQixXQUNwQ0MsRUFBaUIzQixLQUFLMkIsZUFBaUJwQixFQUFLb0IsZUFDaEQzQixLQUFLNEIsaUJBQW1CckIsRUFBS3FCLGlCQUM3QjVCLEtBQUtTLFVBQVlGLEVBQUtFLFVBQ1hULEtBQUtZLE1BQ1ppQixFQUFVSixFQUFRbEIsRUFBS0ksS0FBS0csUUFBVVAsRUFBS0ksS0FBTUosRUFBS0ksS0FBS0ksWUFBYyxHQUM3RWYsS0FBS1UsU0FBV2lCLEVBQWlCRCxFQUFhLElBdUtsRCxPQXBLQUYsRUFBVVAsVUFBVUMsY0FBZ0IsV0FBYyxPQUFPbEIsS0FBS1ksT0FDOURZLEVBQVVQLFVBQVVhLGVBQWlCLFNBQVVDLEdBRTNDLEdBQW1CLE9BQWYvQixLQUFLWSxNQUNMLE1BQU0sSUFBSW9CLGFBQWEsV0FBWSxxQkFHdkMsSUFBSUMsRUFBbUJqQyxLQUFLa0MseUJBQXlCSCxHQUVqREksRUFBYW5DLEtBQUt5QixPQVN0QixPQVBJTSxFQUFRTixTQUNSVSxFQUFhSixFQUFRTixRQUdIVyxFQUFlRCxHQUdaRixHQUU3QlQsRUFBVVAsVUFBVWlCLHlCQUEyQixTQUFVSCxHQUVyRCxJQUFJSSxFQUFhbkMsS0FBS3lCLE9BRWxCTSxFQUFRTixTQUNSVSxFQUFhSixFQUFRTixRQUd6QixJQUFJWSxFQUFpQmQsRUFBY1ksR0FDbkMsR0FBSUUsR0FDQSxHQUFJTixFQUFRTyxXQUFhLEVBQ3JCLE1BQU0sSUFBSUMsV0FBVyxzQkFLeEIsR0FBSVIsRUFBUU8sWUFBY3RDLEtBQUs0QixpQkFDaEMsTUFBTSxJQUFJVyxXQUFXLGlCQUt6QixHQUFJdkMsS0FBS3lCLFNBQVdVLEdBQ0QsZUFBZkEsRUFDQSxNQUFNLElBQUlILGFBQWEsNkNBQThDLHFCQUd6RSxJQUFJUSxFQUFheEMsS0FBSzJCLGVBR2xCYyxFQUFjVixFQUFRVSxhQUFlLEVBQ3pDLEdBQUlBLEdBQWVELEVBQ2YsTUFBTSxJQUFJRCxXQUFXLDZCQUd6QixJQUFJRyxFQUFpQkYsRUFBYUMsRUFFbEMsR0FBSSxlQUFnQlYsRUFBUyxDQUd6QixHQUFJQSxFQUFRUyxZQUFjRSxFQUN0QixNQUFNLElBQUlILFdBQVcsNEJBRXpCRyxFQUFpQlgsRUFBUVMsV0FHN0IsSUFBSUcsRUFBZUQsRUFNbkIsT0FISUwsSUFDQU0sR0FBZ0IzQyxLQUFLNEIsa0JBRWxCZSxHQUVYbkIsRUFBVVAsVUFBVUUsT0FBUyxTQUFVQyxFQUFhVyxHQUVoRCxHQUFtQixPQUFmL0IsS0FBS1ksTUFDTCxNQUFNLElBQUlvQixhQUFhLFdBQVkscUJBR3ZDLElBQUlDLEVBQW1CakMsS0FBS2tDLHlCQUF5QkgsR0FFakRJLEVBQWFuQyxLQUFLeUIsT0FTdEIsR0FQSU0sRUFBUU4sU0FDUlUsRUFBYUosRUFBUU4sUUFHSFcsRUFBZUQsR0FHZkYsRUFBbUJiLEVBQVlKLFdBQ2pELE1BQU0sSUFBSXVCLFdBQVcsb0JBS3pCLElBQUlLLEVBQWM1QyxLQUFLWSxNQUFNaUMsU0FBU2QsRUFBUU8sV0FBYXRDLEtBQUsyQixnQkFDNURjLEVBQWNWLEVBQVFVLGFBQWUsRUFDckNiLEVBQW1CNUIsS0FBSzRCLGlCQU01QixHQUFJNUIsS0FBS3lCLFNBQVdVLEVBQVksQ0FDNUIsSUFBSVcsRUFBT2pCLEVBQVVNLEVBQVlmLEVBQVlOLFFBQVVNLEVBQWFBLEVBQVlMLFlBQWMsR0FDMUZRLEVBQWNZLEdBQ2RXLEVBQUt6QixJQUFJdUIsRUFBWUMsU0FBU0osRUFBY2IsRUFBa0JhLEVBQWNiLEVBQW1CSyxJQUcvRmEsRUFBS3pCLElBQUl1QixFQUFZQyxTQUFTSixFQUFhQSxFQUFjUixRQUc1RCxDQUVELElBQUljLEVBQU1sQixFQUFVTSxFQUFZZixFQUFZTixRQUFVTSxFQUFhQSxFQUFZTCxZQUFjLEdBRXpGaUMsRUFBTSxFQUNOQyxFQUFNLEVBQ1YsT0FBUWpELEtBQUt5QixRQUNULElBQUssS0FDTCxJQUFLLFlBQ0R1QixFQUFNLElBQ05DLEVBQU0sSUFDTixNQUNKLElBQUssTUFDTCxJQUFLLGFBQ0RBLEVBQU0sTUFDTixNQUNKLElBQUssTUFDTCxJQUFLLGFBQ0RBLEVBQU0sV0FJZCxHQUFJMUIsRUFBY3ZCLEtBQUt5QixRQUNuQixJQUFLLElBQUl5QixFQUFJbkIsRUFBUU8sV0FBYUcsRUFBY2IsRUFBa0J1QixFQUFJLEVBQUdBLEVBQUlsQixFQUFrQmlCLEdBQUt0QixFQUFrQnVCLElBQ2xISixFQUFJSSxJQUFNUCxFQUFZTSxHQUFLRixHQUFPQyxPQUd0QyxJQUFTQyxFQUFJVCxFQUFhVSxFQUFJLEVBQUdBLEVBQUlsQixFQUFrQmlCLElBQUtDLElBQ3hESixFQUFJSSxJQUFNUCxFQUFZTSxHQUFLRixHQUFPQyxJQUlsRHpCLEVBQVVQLFVBQVVtQyxNQUFRLFdBRXhCLEdBQW1CLE9BQWZwRCxLQUFLWSxNQUNMLE1BQU0sSUFBSW9CLGFBQWEsV0FBWSxxQkFHdkMsT0FBTyxJQUFJUixFQUFVLENBQ2pCQyxPQUFRekIsS0FBS3lCLE9BQ2JDLFdBQVkxQixLQUFLMEIsV0FDakJDLGVBQWdCM0IsS0FBSzJCLGVBQ3JCQyxpQkFBa0I1QixLQUFLNEIsaUJBQ3ZCbkIsVUFBV1QsS0FBS1MsVUFDaEJFLEtBQU1YLEtBQUtZLFNBR25CWSxFQUFVUCxVQUFVb0MsTUFBUSxXQUN4QnJELEtBQUtZLE1BQVEsTUFFVlksRUFoTG1CLEdBMEw5QixTQUFTSyxFQUFVSixFQUFRWCxFQUFRQyxHQUMvQixPQUFRVSxHQUNKLElBQUssS0FDTCxJQUFLLFlBQ0QsT0FBTyxJQUFJWixXQUFXQyxFQUFRQyxHQUNsQyxJQUFLLE1BQ0wsSUFBSyxhQUNELE9BQU8sSUFBSXVDLFdBQVd4QyxFQUFRQyxHQUNsQyxJQUFLLE1BQ0wsSUFBSyxhQUNELE9BQU8sSUFBSXdDLFdBQVd6QyxFQUFRQyxHQUNsQyxJQUFLLE1BQ0wsSUFBSyxhQUNELE9BQU8sSUFBSXlDLGFBQWExQyxFQUFRQyxHQUNwQyxRQUNJLE1BQU0sSUFBSTBDLFVBQVUsOEJBT2hDLFNBQVNyQixFQUFlWCxHQUNwQixPQUFRQSxHQUNKLElBQUssS0FDTCxJQUFLLFlBQ0QsT0FBTyxFQUNYLElBQUssTUFDTCxJQUFLLGFBQ0QsT0FBTyxFQUNYLElBQUssTUFDTCxJQUFLLGFBQ0wsSUFBSyxNQUNMLElBQUssYUFDRCxPQUFPLEVBQ1gsUUFDSSxNQUFNLElBQUlnQyxVQUFVLDhCQU9oQyxTQUFTbEMsRUFBY0UsR0FDbkIsT0FBUUEsR0FDSixJQUFLLEtBQ0wsSUFBSyxNQUNMLElBQUssTUFDTCxJQUFLLE1BQ0QsT0FBTyxFQUNYLElBQUssWUFDTCxJQUFLLGFBQ0wsSUFBSyxhQUNMLElBQUssYUFDRCxPQUFPLEVBQ1gsUUFDSSxNQUFNLElBQUlnQyxVQUFVLDhCQWhFaENuQyxFQUFjRSxVQUFZQSxFQW1FMUJGLEVBQWNDLGNBQWdCQSxFQUU5QixJQUFJbUMsRUFBWSxHQW9CWkMsRUFBYTNELE1BQVFBLEtBQUsyRCxXQUFjLFNBQVVDLEVBQVNDLEVBQVlDLEVBQUdDLEdBRTFFLE9BQU8sSUFBS0QsSUFBTUEsRUFBSUUsV0FBVSxTQUFVQyxFQUFTQyxHQUMvQyxTQUFTQyxFQUFVOUQsR0FBUyxJQUFNK0QsRUFBS0wsRUFBVU0sS0FBS2hFLElBQVcsTUFBT2lFLEdBQUtKLEVBQU9JLElBQ3BGLFNBQVNDLEVBQVNsRSxHQUFTLElBQU0rRCxFQUFLTCxFQUFpQixNQUFFMUQsSUFBVyxNQUFPaUUsR0FBS0osRUFBT0ksSUFDdkYsU0FBU0YsRUFBS0ksR0FKbEIsSUFBZW5FLEVBSWFtRSxFQUFPQyxLQUFPUixFQUFRTyxFQUFPbkUsUUFKMUNBLEVBSXlEbUUsRUFBT25FLE1BSmhEQSxhQUFpQnlELEVBQUl6RCxFQUFRLElBQUl5RCxHQUFFLFNBQVVHLEdBQVdBLEVBQVE1RCxPQUlUcUUsS0FBS1AsRUFBV0ksR0FDbEdILEdBQU1MLEVBQVlBLEVBQVVZLE1BQU1mLEVBQVNDLEdBQWMsS0FBS1EsWUFHbEVPLEVBQWU1RSxNQUFRQSxLQUFLNEUsYUFBZ0IsU0FBVWhCLEVBQVNpQixHQUMvRCxJQUFzR3JGLEVBQUdzRixFQUFHQyxFQUFHQyxFQUEzR0MsRUFBSSxDQUFFQyxNQUFPLEVBQUdDLEtBQU0sV0FBYSxHQUFXLEVBQVBKLEVBQUUsR0FBUSxNQUFNQSxFQUFFLEdBQUksT0FBT0EsRUFBRSxJQUFPSyxLQUFNLEdBQUlDLElBQUssSUFDaEcsT0FBT0wsRUFBSSxDQUFFWCxLQUFNaUIsRUFBSyxHQUFJQyxNQUFTRCxFQUFLLEdBQUlFLE9BQVVGLEVBQUssSUFBd0IsbUJBQVhHLFNBQTBCVCxFQUFFUyxPQUFPQyxVQUFZLFdBQWEsT0FBTzFGLE9BQVVnRixFQUN2SixTQUFTTSxFQUFLSyxHQUFLLE9BQU8sU0FBVUMsR0FBSyxPQUN6QyxTQUFjQyxHQUNWLEdBQUlyRyxFQUFHLE1BQU0sSUFBSWlFLFVBQVUsbUNBQzNCLEtBQU91QixJQUFNQSxFQUFJLEVBQUdhLEVBQUcsS0FBT1osRUFBSSxJQUFLQSxHQUFHLElBQ3RDLEdBQUl6RixFQUFJLEVBQUdzRixJQUFNQyxFQUFZLEVBQVJjLEVBQUcsR0FBU2YsRUFBVSxPQUFJZSxFQUFHLEdBQUtmLEVBQVMsU0FBT0MsRUFBSUQsRUFBVSxTQUFNQyxFQUFFZSxLQUFLaEIsR0FBSSxHQUFLQSxFQUFFVCxTQUFXVSxFQUFJQSxFQUFFZSxLQUFLaEIsRUFBR2UsRUFBRyxLQUFLcEIsS0FBTSxPQUFPTSxFQUUzSixPQURJRCxFQUFJLEVBQUdDLElBQUdjLEVBQUssQ0FBUyxFQUFSQSxFQUFHLEdBQVFkLEVBQUUxRSxRQUN6QndGLEVBQUcsSUFDUCxLQUFLLEVBQUcsS0FBSyxFQUFHZCxFQUFJYyxFQUFJLE1BQ3hCLEtBQUssRUFBYyxPQUFYWixFQUFFQyxRQUFnQixDQUFFN0UsTUFBT3dGLEVBQUcsR0FBSXBCLE1BQU0sR0FDaEQsS0FBSyxFQUFHUSxFQUFFQyxRQUFTSixFQUFJZSxFQUFHLEdBQUlBLEVBQUssQ0FBQyxHQUFJLFNBQ3hDLEtBQUssRUFBR0EsRUFBS1osRUFBRUksSUFBSVUsTUFBT2QsRUFBRUcsS0FBS1csTUFBTyxTQUN4QyxRQUNJLEtBQU1oQixFQUFJRSxFQUFFRyxNQUFNTCxFQUFJQSxFQUFFaUIsT0FBUyxHQUFLakIsRUFBRUEsRUFBRWlCLE9BQVMsS0FBa0IsSUFBVkgsRUFBRyxJQUFzQixJQUFWQSxFQUFHLElBQVcsQ0FBRVosRUFBSSxFQUFHLFNBQ2pHLEdBQWMsSUFBVlksRUFBRyxNQUFjZCxHQUFNYyxFQUFHLEdBQUtkLEVBQUUsSUFBTWMsRUFBRyxHQUFLZCxFQUFFLElBQU0sQ0FBRUUsRUFBRUMsTUFBUVcsRUFBRyxHQUFJLE1BQzlFLEdBQWMsSUFBVkEsRUFBRyxJQUFZWixFQUFFQyxNQUFRSCxFQUFFLEdBQUksQ0FBRUUsRUFBRUMsTUFBUUgsRUFBRSxHQUFJQSxFQUFJYyxFQUFJLE1BQzdELEdBQUlkLEdBQUtFLEVBQUVDLE1BQVFILEVBQUUsR0FBSSxDQUFFRSxFQUFFQyxNQUFRSCxFQUFFLEdBQUlFLEVBQUVJLElBQUlZLEtBQUtKLEdBQUssTUFDdkRkLEVBQUUsSUFBSUUsRUFBRUksSUFBSVUsTUFDaEJkLEVBQUVHLEtBQUtXLE1BQU8sU0FFdEJGLEVBQUtoQixFQUFLaUIsS0FBS2xDLEVBQVNxQixHQUMxQixNQUFPWCxHQUFLdUIsRUFBSyxDQUFDLEVBQUd2QixHQUFJUSxFQUFJLEVBQUssUUFBVXRGLEVBQUl1RixFQUFJLEVBQ3RELEdBQVksRUFBUmMsRUFBRyxHQUFRLE1BQU1BLEVBQUcsR0FBSSxNQUFPLENBQUV4RixNQUFPd0YsRUFBRyxHQUFLQSxFQUFHLFFBQUssRUFBUXBCLE1BQU0sR0FyQjlCTCxDQUFLLENBQUN1QixFQUFHQyxPQXdCN0R6RixPQUFPQyxlQUFlc0QsRUFBVyxhQUFjLENBQUVyRCxPQUFPLElBQ3hEcUQsRUFBVXdDLFFBQVV4QyxFQUFVeUMsUUFBVXpDLEVBQVUwQyxLQUFPMUMsRUFBVTJDLEtBQU8zQyxFQUFVNEMsSUFBTTVDLEVBQVU2QyxnQkFBa0I3QyxFQUFVOEMsU0FBVzlDLEVBQVUrQyxjQUFXLEVBRWhLLElBQUlDLEVBQVMsR0FFVEMsRUFBZSxHQW1CbkIsU0FBU0wsSUFDTCxPQUFPM0MsRUFBVTNELFVBQU0sT0FBUSxHQUFRLFdBQ25DLE9BQU80RSxFQUFZNUUsTUFBTSxTQUFVNEcsR0FDL0IsT0FBUUEsRUFBRzFCLE9BQ1AsS0FBSyxFQUNELE9BQUl3QixFQUFPVixPQUNBLENBQUMsRUFBY1UsRUFBT0csU0FDMUIsQ0FBQyxFQUFhQyxNQUFNQSxNQUFNSCxJQUNyQyxLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWNDLEVBQUd6QixlQVNqRCxTQUFTa0IsRUFBS1UsR0FDVkwsRUFBT1QsS0FBS2MsR0FRaEIsU0FBU0MsRUFBT1IsR0FDWixPQUFPN0MsRUFBVTNELFVBQU0sT0FBUSxHQUFRLFdBQ25DLElBQUkrRyxFQUFPRSxFQUFLQyxFQUFJTixFQUFJTyxFQUFJQyxFQUFRQyxFQUNwQyxPQUFPekMsRUFBWTVFLE1BQU0sU0FBVXNILEdBQy9CLE9BQVFBLEVBQUdwQyxPQUNQLEtBQUssRUFBRyxNQUFPLENBQUMsRUFBYW9CLEtBQzdCLEtBQUssRUFDRFMsRUFBUU8sRUFBR25DLE9BQ1g4QixFQUFNLEdBQ05DLEVBQUssRUFBR04sRUFBSyxDQUNULENBQUMsT0FBUSxRQUNULENBQUMsVUFBVyxRQUNaLENBQUMsWUFBYSxVQUNkLENBQUMsYUFBYyxRQUNmLENBQUMsYUFBYyxRQUNmLENBQUMsU0FBVSxRQUVmVSxFQUFHcEMsTUFBUSxFQUNmLEtBQUssRUFDRCxPQUFNZ0MsRUFBS04sRUFBR1osUUFDZG1CLEVBQUtQLEVBQUdNLEdBQUtFLEVBQVNELEVBQUcsR0FBSUUsRUFBUUYsRUFBRyxHQUNuQ1gsRUFDRSxDQUFDLEVBQWFPLEVBQU1RLDZCQUE2QkgsSUFEbEMsQ0FBQyxFQUFhLElBRk4sQ0FBQyxFQUFhLEdBSWhELEtBQUssRUFHRCxPQUZJRSxFQUFHbkMsUUFDSDhCLEVBQUloQixLQUFLb0IsR0FDTixDQUFDLEVBQWEsR0FDekIsS0FBSyxFQUFHLE1BQU8sQ0FBQyxFQUFhTixFQUFNUyw2QkFBNkJKLElBQ2hFLEtBQUssRUFDR0UsRUFBR25DLFFBQ0g4QixFQUFJaEIsS0FBS29CLEdBQ2JDLEVBQUdwQyxNQUFRLEVBQ2YsS0FBSyxFQUVELE9BREFnQyxJQUNPLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBRUQsT0FEQWIsRUFBS1UsR0FDRSxDQUFDLEVBQWNFLFVBOUUxQ3ZELEVBQVUrQyxTQUFXLEtBSXJCL0MsRUFBVThDLFNBQVcsS0FPckI5QyxFQUFVNkMsZ0JBSFYsU0FBeUJrQixHQUNyQmQsRUFBZWMsR0FtQm5CL0QsRUFBVTRDLElBQU1BLEVBT2hCNUMsRUFBVTJDLEtBQU9BLEVBa0VqQjNDLEVBQVUwQyxLQWZWLFdBQ0ksT0FBT3pDLEVBQVUzRCxVQUFNLE9BQVEsR0FBUSxXQUNuQyxPQUFPNEUsRUFBWTVFLE1BQU0sU0FBVTRHLEdBQy9CLE9BQVFBLEVBQUcxQixPQUNQLEtBQUssRUFBRyxNQUFPLENBQUMsRUFBYThCLEdBQU8sSUFDcEMsS0FBSyxFQUVELE9BREF0RCxFQUFVK0MsU0FBV0csRUFBR3pCLE9BQ2pCLENBQUMsRUFBYTZCLEdBQU8sSUFDaEMsS0FBSyxFQUVELE9BREF0RCxFQUFVOEMsU0FBV0ksRUFBR3pCLE9BQ2pCLENBQUMsV0FzRDVCekIsRUFBVXlDLFFBNUNWLFNBQWlCa0IsR0FDYixHQUFxQixpQkFBVkEsRUFBb0IsQ0FFM0IsSUFBSUssRUFESkwsRUFBUUEsRUFBTU0sUUFBUSxPQUFRLElBRTlCLE9BQVFOLEdBRUosSUFBSyxPQUNELE1BQ0osSUFBSyxPQUNESyxFQUFXLFVBQ1gsTUFDSixJQUFLLFNBQ0RBLEVBQVcsWUFDWCxNQUVKLElBQUssT0FDREEsRUFBVyxhQUNYLE1BQ0osSUFBSyxPQUNEQSxFQUFXLGFBQ1gsTUFDSixJQUFLLE1BQ0RBLEVBQVcsU0FDWCxNQUVKLElBQUssTUFDTCxJQUFLLE9BQ0wsSUFBSyxPQUNMLElBQUssT0FDTCxJQUFLLE9BQ0QsT0FBTyxLQUVYLFFBQ0ksTUFBTSxJQUFJakUsVUFBVSxzQkFHNUIsT0FBTUMsRUFBVStDLFNBQVNtQixRQUFRUCxJQUFVLEVBRXBDLENBQUVBLE1BQU9LLEdBREwsS0FJWCxPQUFPTCxFQUFNUSxTQXFIckJuRSxFQUFVd0MsUUE3R1YsU0FBaUJtQixFQUFPUyxHQUNwQixHQUFxQixpQkFBVlQsRUFBb0IsQ0FDM0IsSUFBSVUsRUFBYVYsRUFBTVcsTUFBTSxLQUV6Qk4sRUFESkwsRUFBUVUsRUFBVyxHQUVmRSxFQUFNLEdBQ05sRyxFQUFVLEdBQ1ZtRyxHQUFRLEVBQ1osT0FBUWIsR0FFSixJQUFLLE9BQ0RZLEVBQUlFLFdBQWEsRUFDakJGLEVBQUlHLFNBQVcsRUFDZixNQUNKLElBQUssT0FDRFYsRUFBVyxVQUNYTyxFQUFJRSxXQUFhLEVBQ2pCRixFQUFJSSxZQUFjLEtBQ2xCLE1BQ0osSUFBSyxTQUNEWCxFQUFXLFlBQ1hPLEVBQUlFLFdBQWEsRUFDakIsTUFFSixJQUFLLE9BUUQsR0FQQUQsR0FBUSxFQUNSUixFQUFXLGFBQ2dCLGFBQXZCSSxFQUFPUSxjQUNQdkcsRUFBUXdHLE1BQVEsV0FDaEJ4RyxFQUFRLFlBQWMsTUFzRjFDLFNBQXFCZ0csRUFBWUUsR0FDN0IsR0FBSUYsRUFBVyxHQUFJLENBQ2YsSUFBSVMsR0FBV1QsRUFBVyxHQUMxQixLQUFJUyxHQUFXLEdBQUtBLEdBQVcsR0FHM0IsTUFBTSxJQUFJL0UsVUFBVSx1QkFGcEJ3RSxFQUFJTyxRQUFVQSxFQUl0QixHQUFJVCxFQUFXLEdBQUksQ0FDZixJQUFJVSxHQUFTVixFQUFXLEdBQ3hCLEtBQUlVLEdBQVMsR0FBS0EsR0FBUyxJQUd2QixNQUFNLElBQUloRixVQUFVLHFCQUZwQndFLEVBQUlRLE1BQVFBLEVBSXBCLEdBQUlWLEVBQVcsR0FDWCxPQUFRQSxFQUFXLElBQ2YsSUFBSyxJQUVELE1BQ0osSUFBSyxJQUNELEdBQUlFLEVBQUlRLE9BQVMsRUFFYixPQUFPLEVBR1AsTUFBTSxJQUFJaEYsVUFBVSw0REFHNUIsUUFDSSxNQUFNLElBQUlBLFVBQVUsb0JBR2hDLEdBQUlzRSxFQUFXLEdBQUksQ0FDZixJQUFJVyxHQUFTWCxFQUFXLEdBQ3hCLEdBQWMsS0FBVlcsR0FBMEIsS0FBVkEsRUFFaEIsT0FBTyxFQUVOLEdBQWMsSUFBVkEsRUFDTCxNQUFNLElBQUlqRixVQUFVLHlCQUc1QixHQUFJc0UsRUFBVyxHQUVYLE9BQVFBLEVBQVcsSUFDZixJQUFLLElBRUQsTUFDSixJQUFLLElBRUQsT0FBTyxFQUNYLFFBQ0ksTUFBTSxJQUFJdEUsVUFBVSwrQkFHaEMsR0FBSXNFLEVBQVcsR0FFWCxPQUFRQSxFQUFXLElBQ2YsSUFBSyxNQUNERSxFQUFJVSxRQUFVLEVBQ2QsTUFDSixJQUFLLE1BQ0RWLEVBQUlVLFFBQVUsRUFDZCxNQUNKLElBQUssTUFDRFYsRUFBSVUsUUFBVSxFQUNkLE1BQ0osSUFBSyxNQUNELE9BQU8sRUFDWCxRQUNJLE1BQU0sSUFBSWxGLFVBQVUsZ0NBS2hDLE9BQU8sRUEvSlVtRixDQUFZYixFQUFZRSxHQUN6QixPQUFPLEtBQ1gsTUFDSixJQUFLLE9BUUQsR0FQQUMsR0FBUSxFQUNSUixFQUFXLGFBQ2dCLGFBQXZCSSxFQUFPUSxjQUNQdkcsRUFBUThHLFFBQVUsV0FDbEI5RyxFQUFRLFlBQWMsTUE4SjFDLFNBQXFCZ0csRUFBWUUsR0FDN0IsR0FBSUYsRUFBVyxHQUFJLENBQ2YsSUFBSVMsR0FBV1QsRUFBVyxHQUMxQixLQUFJUyxHQUFXLEdBQUtBLEdBQVcsR0FHM0IsTUFBTSxJQUFJL0UsVUFBVSx1QkFGcEJ3RSxFQUFJTyxRQUFVQSxFQUl0QixHQUFJVCxFQUFXLEdBQUksQ0FDZixJQUFJVSxFQUFRLEVBQUVWLEVBQVcsR0FBRyxJQUFLQSxFQUFXLEdBQUcsSUFDL0MsR0FBSVUsRUFBTSxJQUFNLEdBQUtBLEVBQU0sSUFBTSxHQUM3QixLQUFJQSxFQUFNLElBQU0sR0FBS0EsRUFBTSxJQUFNLEdBSTdCLE1BQU0sSUFBSWhGLFVBQVUseUJBR3ZCLENBQUEsS0FBSWdGLEVBQU0sSUFBTSxHQUFLQSxFQUFNLElBQU0sR0FTbEMsTUFBTSxJQUFJaEYsVUFBVSxxQkFScEIsS0FBSWdGLEVBQU0sSUFBTSxHQUFLQSxFQUFNLElBQU0sR0FJN0IsTUFBTSxJQUFJaEYsVUFBVSxxQkFNNUJ3RSxFQUFJUSxPQUFTVixFQUFXLEdBRTVCLEdBQUlBLEVBQVcsR0FBSSxDQUNmLElBQUlXLEdBQVNYLEVBQVcsR0FDeEIsR0FBYyxLQUFWVyxHQUEwQixLQUFWQSxFQUVoQixPQUFPLEVBRU4sR0FBYyxJQUFWQSxFQUNMLE1BQU0sSUFBSWpGLFVBQVUseUJBRzVCLEdBQUlzRSxFQUFXLEdBQUksQ0FFZixRQURrQkEsRUFBVyxJQUV6QixLQUFLLEVBQ0wsS0FBSyxFQUVERSxFQUFJVSxRQUFVLEVBQ2QsTUFDSixLQUFLLEVBQ0RWLEVBQUlVLFFBQVUsRUFDZCxNQUNKLEtBQUssRUFDRFYsRUFBSVUsUUFBVSxFQUNkLE1BQ0osUUFDSSxNQUFNLElBQUlsRixVQUFVLDBDQUtoQyxPQUFPLEVBeE5VcUYsQ0FBWWYsRUFBWUUsR0FDekIsT0FBTyxLQUNYLE1BQ0osSUFBSyxNQUNEQyxHQUFRLEVBQ1JSLEVBQVcsU0FDZ0IsYUFBdkJJLEVBQU9RLGNBQ1B2RyxFQUFROEcsUUFBVSxXQUNsQjlHLEVBQVEsWUFBYyxLQUUxQixNQUVKLElBQUssTUFDTCxJQUFLLE9BQ0wsSUFBSyxPQUNMLElBQUssT0FDTCxJQUFLLE9BQ0QsT0FBTyxLQUVYLFFBQ0ksTUFBTSxJQUFJMEIsVUFBVSxzQkFHNUIsS0FBTUMsRUFBVThDLFNBQVNvQixRQUFRUCxJQUFVLEdBQ3ZDLE9BQU8sS0FDWCxHQUFJYSxFQUFPLENBQ29CLGlCQUFoQkQsRUFBSVUsVUFDWFYsRUFBSVUsUUFBVSxHQUNsQixJQUFJSSxFQUFRZCxFQUFJYyxNQUFRakIsRUFBT2lCLE1BQzNCQyxFQUFTZixFQUFJZSxPQUFTbEIsRUFBT2tCLE9BQzdCbEIsRUFBT21CLFlBR1BoQixFQUFJaUIsY0FBZ0JDLEtBQUtDLE1BQU10QixFQUFPbUIsV0FDdENoQixFQUFJb0IsY0FBZ0IsR0FHeEIsSUFBSUMsRUFBU3hCLEVBQU95QixjQUFnQnpCLEVBQU9pQixNQUN2Q1MsRUFBVTFCLEVBQU8yQixlQUFpQjNCLEVBQU9rQixPQUN6Q00sSUFBV1AsR0FBU1MsSUFBWVIsSUFDaENmLEVBQUl5Qix3QkFBMEJKLEVBQVNOLEVBQ3ZDZixFQUFJMEIsd0JBQTBCSCxFQUFVVCxRQU01QyxHQUZLZCxFQUFJSSxjQUNMSixFQUFJSSxZQUFjUCxFQUFPcEcsWUFBYyxNQUN2Q29HLEVBQU9sRyxpQkFBa0IsQ0FDekIsSUFBSStELEVBQUltQyxFQUFPbEcsaUJBQ2ZxRyxFQUFJMkIsZUFBd0IsSUFBTmpFLEVBQVcsR0FBTSxHQUFLQSxHQUFLLEVBT3pELE1BSjRCLGlCQUFqQnNDLEVBQUlHLFVBQXlCTixFQUFPK0IsVUFFM0M1QixFQUFJRyxTQUFXTixFQUFPK0IsU0FFbkIsQ0FDSHhDLE1BQU9LLEVBQ1BPLElBQUtBLEVBQ0xsRyxRQUFTQSxHQUliLE9BQU9zRixFQUFNUSxTQTRKckIsSUFBSWlDLEVBQVcsR0FvQmYzSixPQUFPQyxlQUFlMEosRUFBVSxhQUFjLENBQUV6SixPQUFPLElBQ3ZEeUosRUFBU0MsaUJBQWMsRUFhdkJELEVBQVNDLFlBVFQsU0FBcUJqQyxFQUFRa0MsR0FFekIsSUFEQSxJQUFJL0MsRUFBTSxHQUNEQyxFQUFLLEVBQUcrQyxFQUFXRCxFQUFROUMsRUFBSytDLEVBQVNqRSxPQUFRa0IsSUFBTSxDQUM1RCxJQUFJZ0QsRUFBUUQsRUFBUy9DLEdBQ2pCZ0QsS0FBU3BDLElBQ1RiLEVBQUlpRCxHQUFTcEMsRUFBT29DLElBRTVCLE9BQU9qRCxHQUlYLElBQUlrRCxFQUFtQixHQW9CbkJDLEVBQWlCcEssTUFBUUEsS0FBSzJELFdBQWMsU0FBVUMsRUFBU0MsRUFBWUMsRUFBR0MsR0FFOUUsT0FBTyxJQUFLRCxJQUFNQSxFQUFJRSxXQUFVLFNBQVVDLEVBQVNDLEdBQy9DLFNBQVNDLEVBQVU5RCxHQUFTLElBQU0rRCxFQUFLTCxFQUFVTSxLQUFLaEUsSUFBVyxNQUFPaUUsR0FBS0osRUFBT0ksSUFDcEYsU0FBU0MsRUFBU2xFLEdBQVMsSUFBTStELEVBQUtMLEVBQWlCLE1BQUUxRCxJQUFXLE1BQU9pRSxHQUFLSixFQUFPSSxJQUN2RixTQUFTRixFQUFLSSxHQUpsQixJQUFlbkUsRUFJYW1FLEVBQU9DLEtBQU9SLEVBQVFPLEVBQU9uRSxRQUoxQ0EsRUFJeURtRSxFQUFPbkUsTUFKaERBLGFBQWlCeUQsRUFBSXpELEVBQVEsSUFBSXlELEdBQUUsU0FBVUcsR0FBV0EsRUFBUTVELE9BSVRxRSxLQUFLUCxFQUFXSSxHQUNsR0gsR0FBTUwsRUFBWUEsRUFBVVksTUFBTWYsRUFBU0MsR0FBYyxLQUFLUSxZQUdsRWdHLEVBQW1CckssTUFBUUEsS0FBSzRFLGFBQWdCLFNBQVVoQixFQUFTaUIsR0FDbkUsSUFBc0dyRixFQUFHc0YsRUFBR0MsRUFBR0MsRUFBM0dDLEVBQUksQ0FBRUMsTUFBTyxFQUFHQyxLQUFNLFdBQWEsR0FBVyxFQUFQSixFQUFFLEdBQVEsTUFBTUEsRUFBRSxHQUFJLE9BQU9BLEVBQUUsSUFBT0ssS0FBTSxHQUFJQyxJQUFLLElBQ2hHLE9BQU9MLEVBQUksQ0FBRVgsS0FBTWlCLEVBQUssR0FBSUMsTUFBU0QsRUFBSyxHQUFJRSxPQUFVRixFQUFLLElBQXdCLG1CQUFYRyxTQUEwQlQsRUFBRVMsT0FBT0MsVUFBWSxXQUFhLE9BQU8xRixPQUFVZ0YsRUFDdkosU0FBU00sRUFBS0ssR0FBSyxPQUFPLFNBQVVDLEdBQUssT0FDekMsU0FBY0MsR0FDVixHQUFJckcsRUFBRyxNQUFNLElBQUlpRSxVQUFVLG1DQUMzQixLQUFPdUIsSUFBTUEsRUFBSSxFQUFHYSxFQUFHLEtBQU9aLEVBQUksSUFBS0EsR0FBRyxJQUN0QyxHQUFJekYsRUFBSSxFQUFHc0YsSUFBTUMsRUFBWSxFQUFSYyxFQUFHLEdBQVNmLEVBQVUsT0FBSWUsRUFBRyxHQUFLZixFQUFTLFNBQU9DLEVBQUlELEVBQVUsU0FBTUMsRUFBRWUsS0FBS2hCLEdBQUksR0FBS0EsRUFBRVQsU0FBV1UsRUFBSUEsRUFBRWUsS0FBS2hCLEVBQUdlLEVBQUcsS0FBS3BCLEtBQU0sT0FBT00sRUFFM0osT0FESUQsRUFBSSxFQUFHQyxJQUFHYyxFQUFLLENBQVMsRUFBUkEsRUFBRyxHQUFRZCxFQUFFMUUsUUFDekJ3RixFQUFHLElBQ1AsS0FBSyxFQUFHLEtBQUssRUFBR2QsRUFBSWMsRUFBSSxNQUN4QixLQUFLLEVBQWMsT0FBWFosRUFBRUMsUUFBZ0IsQ0FBRTdFLE1BQU93RixFQUFHLEdBQUlwQixNQUFNLEdBQ2hELEtBQUssRUFBR1EsRUFBRUMsUUFBU0osRUFBSWUsRUFBRyxHQUFJQSxFQUFLLENBQUMsR0FBSSxTQUN4QyxLQUFLLEVBQUdBLEVBQUtaLEVBQUVJLElBQUlVLE1BQU9kLEVBQUVHLEtBQUtXLE1BQU8sU0FDeEMsUUFDSSxLQUFNaEIsRUFBSUUsRUFBRUcsTUFBTUwsRUFBSUEsRUFBRWlCLE9BQVMsR0FBS2pCLEVBQUVBLEVBQUVpQixPQUFTLEtBQWtCLElBQVZILEVBQUcsSUFBc0IsSUFBVkEsRUFBRyxJQUFXLENBQUVaLEVBQUksRUFBRyxTQUNqRyxHQUFjLElBQVZZLEVBQUcsTUFBY2QsR0FBTWMsRUFBRyxHQUFLZCxFQUFFLElBQU1jLEVBQUcsR0FBS2QsRUFBRSxJQUFNLENBQUVFLEVBQUVDLE1BQVFXLEVBQUcsR0FBSSxNQUM5RSxHQUFjLElBQVZBLEVBQUcsSUFBWVosRUFBRUMsTUFBUUgsRUFBRSxHQUFJLENBQUVFLEVBQUVDLE1BQVFILEVBQUUsR0FBSUEsRUFBSWMsRUFBSSxNQUM3RCxHQUFJZCxHQUFLRSxFQUFFQyxNQUFRSCxFQUFFLEdBQUksQ0FBRUUsRUFBRUMsTUFBUUgsRUFBRSxHQUFJRSxFQUFFSSxJQUFJWSxLQUFLSixHQUFLLE1BQ3ZEZCxFQUFFLElBQUlFLEVBQUVJLElBQUlVLE1BQ2hCZCxFQUFFRyxLQUFLVyxNQUFPLFNBRXRCRixFQUFLaEIsRUFBS2lCLEtBQUtsQyxFQUFTcUIsR0FDMUIsTUFBT1gsR0FBS3VCLEVBQUssQ0FBQyxFQUFHdkIsR0FBSVEsRUFBSSxFQUFLLFFBQVV0RixFQUFJdUYsRUFBSSxFQUN0RCxHQUFZLEVBQVJjLEVBQUcsR0FBUSxNQUFNQSxFQUFHLEdBQUksTUFBTyxDQUFFeEYsTUFBT3dGLEVBQUcsR0FBS0EsRUFBRyxRQUFLLEVBQVFwQixNQUFNLEdBckI5QkwsQ0FBSyxDQUFDdUIsRUFBR0MsT0F3QjdEekYsT0FBT0MsZUFBZStKLEVBQWtCLGFBQWMsQ0FBRTlKLE9BQU8sSUFDL0Q4SixFQUFpQkcsa0JBQWUsRUFJaEMsSUFBSUEsRUFBOEIsV0FDOUIsU0FBU0EsRUFBYS9KLEdBQ2xCUCxLQUFLdUssUUFBVWhLLEVBQUtpSyxPQUNwQnhLLEtBQUt5SyxPQUFTbEssRUFBS21LLE1BQ25CMUssS0FBSzJLLE1BQVEsZUFDYjNLLEtBQUs0SyxnQkFBa0IsRUFDdkI1SyxLQUFLNkssR0FBSzdHLFFBQVE4RyxJQUFJLElBQ3RCOUssS0FBSytLLE9BQVMsS0FDZC9LLEtBQUtnTCxPQUFTaEwsS0FBS3NILEdBQUt0SCxLQUFLaUwsS0FBT2pMLEtBQUtrTCxPQUFTLEVBa1V0RCxPQWhVQVosRUFBYXJKLFVBQVVrSyxVQUFZLFNBQVVyRCxHQUN6QyxJQUFJc0QsRUFBUXBMLEtBQ1JELEVBQU9DLEtBSVgsR0FBbUIsV0FBZkEsS0FBSzJLLE1BQ0wsTUFBTSxJQUFJM0ksYUFBYSxvQkFBcUIscUJBRTVDaEMsS0FBSytLLFNBQ0wvSyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUFjLE9BQU8wRyxFQUFNQyxZQUV0RHJMLEtBQUsySyxNQUFRLGFBSWIzSyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUNuQixPQUFPMEYsRUFBY3BLLFVBQU0sT0FBUSxHQUFRLFdBQ3ZDLElBQUlzTCxFQUFXdkUsRUFBT0gsRUFDbEJPLEVBQ0osT0FBT2tELEVBQWdCckssTUFBTSxTQUFVdUwsR0FDbkMsT0FBUUEsRUFBR3JHLE9BQ1AsS0FBSyxFQUVELE9BREFvRyxFQUFZNUgsRUFBVXlDLFFBQVEyQixFQUFPVCxTQUVyQ1QsRUFBSzdHLEVBQ0UsQ0FBQyxFQUFhMkQsRUFBVTRDLFFBRlIsQ0FBQyxFQUFhLEdBR3pDLEtBQUssRUFFRCxNQUFPLENBQUMsR0FEUlMsRUFBUUgsRUFBR21FLE9BQVNRLEVBQUdwRyxRQUNJcUcsZ0JBQWdCRixFQUFVakUsUUFDekQsS0FBSyxFQUdELE9BREFGLEVBQUtvRSxFQUFHcEcsT0FBUXBGLEVBQUtpTCxPQUFTN0QsRUFBRyxHQUFJcEgsRUFBS3VILEdBQUtILEVBQUcsR0FBSXBILEVBQUtrTCxLQUFPOUQsRUFBRyxHQUFJcEgsRUFBS21MLE9BQVMvRCxFQUFHLEdBQ25GLENBQUMsRUFBYUosRUFBTTBFLDJCQUEyQjFMLEVBQUt1SCxHQUFJLEVBQUcsTUFDdEUsS0FBSyxFQUVELE9BREFpRSxFQUFHcEcsT0FDSSxDQUFDLEVBQWEsR0FDekIsS0FBSyxFQUNEcEYsRUFBSzJMLG1CQUFtQixJQUFJMUosYUFBYSxvQkFBcUIsc0JBQzlEdUosRUFBR3JHLE1BQVEsRUFDZixLQUFLLEVBQUcsTUFBTyxDQUFDLGFBSTdCeUcsTUFBTTNMLEtBQUt5SyxTQUdsQkgsRUFBYXJKLFVBQVVvSyxNQUFRLFdBQzNCLE9BQU9qQixFQUFjcEssVUFBTSxPQUFRLEdBQVEsV0FDdkMsT0FBT3FLLEVBQWdCckssTUFBTSxTQUFVNEcsR0FDbkMsT0FBUUEsRUFBRzFCLE9BQ1AsS0FBSyxFQUNELE9BQUtsRixLQUFLc0gsR0FDSCxDQUFDLEVBQWF0SCxLQUFLK0ssT0FBT2EsZ0JBQWdCNUwsS0FBS3NILEdBQUl0SCxLQUFLaUwsS0FBTWpMLEtBQUtrTCxTQURyRCxDQUFDLEVBQWEsR0FFdkMsS0FBSyxFQUNEdEUsRUFBR3pCLE9BQ0huRixLQUFLZ0wsT0FBU2hMLEtBQUtzSCxHQUFLdEgsS0FBS2lMLEtBQU9qTCxLQUFLa0wsT0FBUyxFQUNsRHRFLEVBQUcxQixNQUFRLEVBQ2YsS0FBSyxFQUtELE9BSklsRixLQUFLK0ssU0FDTHJILEVBQVUyQyxLQUFLckcsS0FBSytLLFFBQ3BCL0ssS0FBSytLLE9BQVMsTUFFWCxDQUFDLFdBSzVCVCxFQUFhckosVUFBVXlLLG1CQUFxQixTQUFVRyxHQUNsRCxJQUFJVCxFQUFRcEwsS0FFWkEsS0FBSzhMLG1CQUFtQkQsR0FFeEI3TCxLQUFLMkssTUFBUSxTQUdiM0ssS0FBSzZLLEdBQUs3SyxLQUFLNkssR0FBR25HLE1BQUssV0FBYyxPQUFPMEcsRUFBTUMsV0FJM0IsZUFBbkJRLEVBQVVFLE9BQ1YvTCxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUFjMEcsRUFBTVgsT0FBT29CLFFBRTFEdkIsRUFBYXJKLFVBQVU2SyxtQkFBcUIsU0FBVUQsR0FDbEQsSUFBSVQsRUFBUXBMLEtBRVosR0FBbUIsV0FBZkEsS0FBSzJLLE1BQ0wsTUFBTSxJQUFJM0ksYUFBYSxpQkFBa0IscUJBRTdDaEMsS0FBSzJLLE1BQVEsZUFFYjNLLEtBQUs2SyxHQUFLN0ssS0FBSzZLLEdBQUduRyxNQUFLLFdBQWMsT0FBTzBHLEVBQU1DLFlBRXREZixFQUFhckosVUFBVStLLE9BQVMsU0FBVUMsR0FDdEMsSUFBSWxNLEVBQU9DLEtBRVgsR0FBbUIsZUFBZkEsS0FBSzJLLE1BQ0wsTUFBTSxJQUFJM0ksYUFBYSxlQUFnQixxQkFRM0NoQyxLQUFLNEssa0JBRUw1SyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUNuQixPQUFPMEYsRUFBY3BLLFVBQU0sT0FBUSxHQUFRLFdBQ3ZDLElBQUkrRyxFQUFPbUYsRUFBR0MsRUFBS0MsRUFBT0MsRUFBZ0JDLEVBQVNDLEVBQUtDLEVBQU9DLEVBQVFDLEVBQ3ZFLE9BQU9yQyxFQUFnQnJLLE1BQU0sU0FBVTRHLEdBQ25DLE9BQVFBLEVBQUcxQixPQUNQLEtBQUssRUFDRDZCLEVBQVFoSCxFQUFLZ0wsT0FDYm1CLEVBQUluTSxFQUFLdUgsR0FDVDZFLEVBQU1wTSxFQUFLa0wsS0FDWG1CLEVBQVFyTSxFQUFLbUwsT0FDYm1CLEVBQWlCLEtBQ2pCekYsRUFBRzFCLE1BQVEsRUFDZixLQUFLLEVBZ0JELE9BZkEwQixFQUFHeEIsS0FBS2EsS0FBSyxDQUFDLEVBQUcsRUFBRyxDQUFFLElBQ3RCcUcsRUFBVW5ELEtBQUt3RCxNQUFNVixFQUFNeEwsVUFBWSxLQUN2QzhMLEVBQU1ELEVBQVUsV0FDaEJFLEtBQVdGLEVBQVUsWUFDckJHLEVBQVMsQ0FDTDlMLEtBQU1zTCxFQUFNL0ssZ0JBQ1pxTCxJQUFLQSxFQUNMQyxNQUFPQSxFQUNQSSxJQUFLTCxFQUNMTSxNQUFPTCxHQUVQUCxFQUFNdkwsV0FDTitMLEVBQU8vTCxTQUFXeUksS0FBS3dELE1BQU1WLEVBQU12TCxTQUFXLEtBQzlDK0wsRUFBT0ssV0FBYSxHQUVqQixDQUFDLEVBQWEvRixFQUFNZ0csZ0JBQWdCYixFQUFHQyxFQUFLQyxFQUFPLENBQUNLLEtBQy9ELEtBQUssRUFFRCxPQURBSixFQUFpQnpGLEVBQUd6QixPQUNiLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBS0QsT0FKQXVILEVBQU85RixFQUFHekIsT0FDVnBGLEVBQUs4SyxHQUFLOUssRUFBSzhLLEdBQUduRyxNQUFLLFdBQ25CM0UsRUFBSzJMLG1CQUFtQmdCLE1BRXJCLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBV0QsT0FSQTNNLEVBQUs2SyxrQkFNRHlCLEdBQ0F0TSxFQUFLaU4saUJBQWlCWCxHQUNuQixDQUFDLGFBSXpCVixNQUFNM0wsS0FBS3lLLFNBRWxCSCxFQUFhckosVUFBVStMLGlCQUFtQixTQUFVQyxHQUVoRCxJQURBLElBQUlsRyxFQUFRL0csS0FBSytLLE9BQ1I3RCxFQUFLLEVBQUdnRyxFQUFXRCxFQUFRL0YsRUFBS2dHLEVBQVNsSCxPQUFRa0IsSUFBTSxDQUM1RCxJQUFJa0YsRUFBUWMsRUFBU2hHLEdBRWpCekYsT0FBUyxFQUNUMEwsR0FBUyxFQUNiLE9BQVFmLEVBQU0zSyxRQUNWLEtBQUtzRixFQUFNcUcsaUJBQ1AzTCxFQUFTLEtBQ1QsTUFDSixLQUFLc0YsRUFBTXNHLGtCQUNQNUwsRUFBUyxNQUNULE1BQ0osS0FBS3NGLEVBQU11RyxrQkFDUDdMLEVBQVMsTUFDVCxNQUNKLEtBQUtzRixFQUFNd0csa0JBQ1A5TCxFQUFTLE1BQ1QsTUFDSixLQUFLc0YsRUFBTXlHLGtCQUNQL0wsRUFBUyxLQUNUMEwsR0FBUyxFQUNULE1BQ0osS0FBS3BHLEVBQU0wRyxtQkFDUGhNLEVBQVMsTUFDVDBMLEdBQVMsRUFDVCxNQUNKLEtBQUtwRyxFQUFNMkcsbUJBQ1BqTSxFQUFTLE1BQ1QwTCxHQUFTLEVBQ1QsTUFDSixLQUFLcEcsRUFBTTRHLG1CQUNQbE0sRUFBUyxNQUNUMEwsR0FBUyxFQUNULE1BQ0osUUFDSSxNQUFNLElBQUluTCxhQUFhLDRCQUE2QixpQkFHNUQsSUFBSU4sRUFBYTBLLEVBQU0vRCxZQUVuQjFHLEVBQWlCeUssRUFBTXdCLFdBRXZCaE0sRUFBbUJ3SyxFQUFNeUIsU0FFekJwTixFQUFzRCxLQUEzQixXQUFkMkwsRUFBTUksTUFBc0JKLEVBQU1HLEtBRS9DdUIsT0FBTSxFQUNWLEdBQUlYLEVBQVEsQ0FFUixJQURBLElBQUlZLEVBQUssRUFDQTdLLEVBQUksRUFBR0EsRUFBSWtKLEVBQU16TCxLQUFLcUYsT0FBUTlDLElBQ25DNkssR0FBTTNCLEVBQU16TCxLQUFLdUMsR0FBRzhDLE9BQ3hCOEgsRUFBTSxJQUFLMUIsRUFBTXpMLEtBQUssR0FBYyxZQUFFb04sR0FDdENBLEVBQUssRUFDTCxJQUFTN0ssRUFBSSxFQUFHQSxFQUFJa0osRUFBTXpMLEtBQUtxRixPQUFROUMsSUFBSyxDQUN4QyxJQUFJOEssRUFBTzVCLEVBQU16TCxLQUFLdUMsR0FDdEI0SyxFQUFJek0sSUFBSTJNLEVBQU1ELEdBQ2RBLEdBQU1DLEVBQUtoSSxhQUlmOEgsRUFBTTFCLEVBQU16TCxLQUVoQixJQUFJQSxFQUFPLElBQUlXLEVBQWNFLFVBQVUsQ0FDbkNDLE9BQVFBLEVBQ1JDLFdBQVlBLEVBQ1pDLGVBQWdCQSxFQUNoQkMsaUJBQWtCQSxFQUNsQm5CLFVBQVdBLEVBQ1hFLEtBQU1tTixJQUVWOU4sS0FBS3VLLFFBQVE1SixLQUdyQjJKLEVBQWFySixVQUFVZ04sTUFBUSxXQUMzQixJQUFJbE8sRUFBT0MsS0FDUGlILEVBQU1qSCxLQUFLNkssR0FBR25HLE1BQUssV0FDbkIsT0FBTzBGLEVBQWNwSyxVQUFNLE9BQVEsR0FBUSxXQUN2QyxJQUFJK0csRUFBT21GLEVBQUdDLEVBQUtDLEVBQU9DLEVBQWdCNkIsRUFDMUMsT0FBTzdELEVBQWdCckssTUFBTSxTQUFVNEcsR0FDbkMsT0FBUUEsRUFBRzFCLE9BQ1AsS0FBSyxFQUNELElBQUtuRixFQUFLdUgsR0FDTixNQUFPLENBQUMsR0FDWlAsRUFBUWhILEVBQUtnTCxPQUNibUIsRUFBSW5NLEVBQUt1SCxHQUNUNkUsRUFBTXBNLEVBQUtrTCxLQUNYbUIsRUFBUXJNLEVBQUttTCxPQUNibUIsRUFBaUIsS0FDakJ6RixFQUFHMUIsTUFBUSxFQUNmLEtBQUssRUFFRCxPQURBMEIsRUFBR3hCLEtBQUthLEtBQUssQ0FBQyxFQUFHLEVBQUcsQ0FBRSxJQUNmLENBQUMsRUFBYWMsRUFBTWdHLGdCQUFnQmIsRUFBR0MsRUFBS0MsRUFBTyxJQUFJLElBQ2xFLEtBQUssRUFFRCxPQURBQyxFQUFpQnpGLEVBQUd6QixPQUNiLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBS0QsT0FKQStJLEVBQU90SCxFQUFHekIsT0FDVnBGLEVBQUs4SyxHQUFLOUssRUFBSzhLLEdBQUduRyxNQUFLLFdBQ25CM0UsRUFBSzJMLG1CQUFtQndDLE1BRXJCLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBR0QsT0FGSTdCLEdBQ0F0TSxFQUFLaU4saUJBQWlCWCxHQUNuQixDQUFDLGFBTTVCLE9BREFyTSxLQUFLNkssR0FBSzVELEVBQ0hBLEdBRVhxRCxFQUFhckosVUFBVWtOLE1BQVEsV0FDM0JuTyxLQUFLOEwsbUJBQW1CLElBQUk5SixhQUFhLFFBQVMsZ0JBRXREc0ksRUFBYXJKLFVBQVVvQyxNQUFRLFdBQzNCckQsS0FBSzBMLG1CQUFtQixJQUFJMUosYUFBYSxRQUFTLGdCQUV0RHNJLEVBQWE4RCxrQkFBb0IsU0FBVXRHLEdBQ3ZDLE9BQU9zQyxFQUFjcEssVUFBTSxPQUFRLEdBQVEsV0FDdkMsSUFBSXFPLEVBQUsvQyxFQUFXdkUsRUFBT0gsRUFBSXNGLEVBQUdDLEVBQUtDLEVBQ3ZDLE9BQU8vQixFQUFnQnJLLE1BQU0sU0FBVW1ILEdBQ25DLE9BQVFBLEVBQUdqQyxPQUNQLEtBQUssRUFHRCxPQUZBbUosRUFBTTNLLEVBQVV5QyxRQUFRMkIsRUFBT1QsT0FDL0JpRSxHQUFZLEVBQ1ArQyxFQUNFLENBQUMsRUFBYTNLLEVBQVU0QyxPQURkLENBQUMsRUFBYSxHQUVuQyxLQUFLLEVBQ0RTLEVBQVFJLEVBQUdoQyxPQUNYZ0MsRUFBR2pDLE1BQVEsRUFDZixLQUFLLEVBRUQsT0FEQWlDLEVBQUcvQixLQUFLYSxLQUFLLENBQUMsRUFBRyxFQUFHLENBQUUsSUFDZixDQUFDLEVBQWFjLEVBQU15RSxnQkFBZ0I2QyxFQUFJaEgsUUFDbkQsS0FBSyxFQUVELE9BREFULEVBQUtPLEVBQUdoQyxPQUFRK0csRUFBSXRGLEVBQUcsR0FBSXVGLEVBQU12RixFQUFHLEdBQUl3RixFQUFReEYsRUFBRyxHQUM1QyxDQUFDLEVBQWFHLEVBQU02RSxnQkFBZ0JNLEVBQUdDLEVBQUtDLElBQ3ZELEtBQUssRUFHRCxPQUZBakYsRUFBR2hDLE9BQ0htRyxHQUFZLEVBQ0wsQ0FBQyxFQUFhLEdBQ3pCLEtBQUssRUFFRCxPQURPbkUsRUFBR2hDLE9BQ0gsQ0FBQyxFQUFhLEdBQ3pCLEtBQUssRUFBRyxNQUFPLENBQUMsRUFBYXpCLEVBQVUyQyxLQUFLVSxJQUM1QyxLQUFLLEVBQ0RJLEVBQUdoQyxPQUNIZ0MsRUFBR2pDLE1BQVEsRUFDZixLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWMsQ0FDdEJvRyxVQUFXQSxFQUNYeEQsT0FBUWdDLEVBQVNDLFlBQVlqQyxFQUFRLENBQUMsUUFBUyxhQUFjLCtCQU05RXdDLEVBMVVzQixHQTRVakNILEVBQWlCRyxhQUFlQSxFQUVoQyxJQUFJZ0UsRUFBbUIsR0FvQm5CQyxFQUFpQnZPLE1BQVFBLEtBQUsyRCxXQUFjLFNBQVVDLEVBQVNDLEVBQVlDLEVBQUdDLEdBRTlFLE9BQU8sSUFBS0QsSUFBTUEsRUFBSUUsV0FBVSxTQUFVQyxFQUFTQyxHQUMvQyxTQUFTQyxFQUFVOUQsR0FBUyxJQUFNK0QsRUFBS0wsRUFBVU0sS0FBS2hFLElBQVcsTUFBT2lFLEdBQUtKLEVBQU9JLElBQ3BGLFNBQVNDLEVBQVNsRSxHQUFTLElBQU0rRCxFQUFLTCxFQUFpQixNQUFFMUQsSUFBVyxNQUFPaUUsR0FBS0osRUFBT0ksSUFDdkYsU0FBU0YsRUFBS0ksR0FKbEIsSUFBZW5FLEVBSWFtRSxFQUFPQyxLQUFPUixFQUFRTyxFQUFPbkUsUUFKMUNBLEVBSXlEbUUsRUFBT25FLE1BSmhEQSxhQUFpQnlELEVBQUl6RCxFQUFRLElBQUl5RCxHQUFFLFNBQVVHLEdBQVdBLEVBQVE1RCxPQUlUcUUsS0FBS1AsRUFBV0ksR0FDbEdILEdBQU1MLEVBQVlBLEVBQVVZLE1BQU1mLEVBQVNDLEdBQWMsS0FBS1EsWUFHbEVtSyxFQUFtQnhPLE1BQVFBLEtBQUs0RSxhQUFnQixTQUFVaEIsRUFBU2lCLEdBQ25FLElBQXNHckYsRUFBR3NGLEVBQUdDLEVBQUdDLEVBQTNHQyxFQUFJLENBQUVDLE1BQU8sRUFBR0MsS0FBTSxXQUFhLEdBQVcsRUFBUEosRUFBRSxHQUFRLE1BQU1BLEVBQUUsR0FBSSxPQUFPQSxFQUFFLElBQU9LLEtBQU0sR0FBSUMsSUFBSyxJQUNoRyxPQUFPTCxFQUFJLENBQUVYLEtBQU1pQixFQUFLLEdBQUlDLE1BQVNELEVBQUssR0FBSUUsT0FBVUYsRUFBSyxJQUF3QixtQkFBWEcsU0FBMEJULEVBQUVTLE9BQU9DLFVBQVksV0FBYSxPQUFPMUYsT0FBVWdGLEVBQ3ZKLFNBQVNNLEVBQUtLLEdBQUssT0FBTyxTQUFVQyxHQUFLLE9BQ3pDLFNBQWNDLEdBQ1YsR0FBSXJHLEVBQUcsTUFBTSxJQUFJaUUsVUFBVSxtQ0FDM0IsS0FBT3VCLElBQU1BLEVBQUksRUFBR2EsRUFBRyxLQUFPWixFQUFJLElBQUtBLEdBQUcsSUFDdEMsR0FBSXpGLEVBQUksRUFBR3NGLElBQU1DLEVBQVksRUFBUmMsRUFBRyxHQUFTZixFQUFVLE9BQUllLEVBQUcsR0FBS2YsRUFBUyxTQUFPQyxFQUFJRCxFQUFVLFNBQU1DLEVBQUVlLEtBQUtoQixHQUFJLEdBQUtBLEVBQUVULFNBQVdVLEVBQUlBLEVBQUVlLEtBQUtoQixFQUFHZSxFQUFHLEtBQUtwQixLQUFNLE9BQU9NLEVBRTNKLE9BRElELEVBQUksRUFBR0MsSUFBR2MsRUFBSyxDQUFTLEVBQVJBLEVBQUcsR0FBUWQsRUFBRTFFLFFBQ3pCd0YsRUFBRyxJQUNQLEtBQUssRUFBRyxLQUFLLEVBQUdkLEVBQUljLEVBQUksTUFDeEIsS0FBSyxFQUFjLE9BQVhaLEVBQUVDLFFBQWdCLENBQUU3RSxNQUFPd0YsRUFBRyxHQUFJcEIsTUFBTSxHQUNoRCxLQUFLLEVBQUdRLEVBQUVDLFFBQVNKLEVBQUllLEVBQUcsR0FBSUEsRUFBSyxDQUFDLEdBQUksU0FDeEMsS0FBSyxFQUFHQSxFQUFLWixFQUFFSSxJQUFJVSxNQUFPZCxFQUFFRyxLQUFLVyxNQUFPLFNBQ3hDLFFBQ0ksS0FBTWhCLEVBQUlFLEVBQUVHLE1BQU1MLEVBQUlBLEVBQUVpQixPQUFTLEdBQUtqQixFQUFFQSxFQUFFaUIsT0FBUyxLQUFrQixJQUFWSCxFQUFHLElBQXNCLElBQVZBLEVBQUcsSUFBVyxDQUFFWixFQUFJLEVBQUcsU0FDakcsR0FBYyxJQUFWWSxFQUFHLE1BQWNkLEdBQU1jLEVBQUcsR0FBS2QsRUFBRSxJQUFNYyxFQUFHLEdBQUtkLEVBQUUsSUFBTSxDQUFFRSxFQUFFQyxNQUFRVyxFQUFHLEdBQUksTUFDOUUsR0FBYyxJQUFWQSxFQUFHLElBQVlaLEVBQUVDLE1BQVFILEVBQUUsR0FBSSxDQUFFRSxFQUFFQyxNQUFRSCxFQUFFLEdBQUlBLEVBQUljLEVBQUksTUFDN0QsR0FBSWQsR0FBS0UsRUFBRUMsTUFBUUgsRUFBRSxHQUFJLENBQUVFLEVBQUVDLE1BQVFILEVBQUUsR0FBSUUsRUFBRUksSUFBSVksS0FBS0osR0FBSyxNQUN2RGQsRUFBRSxJQUFJRSxFQUFFSSxJQUFJVSxNQUNoQmQsRUFBRUcsS0FBS1csTUFBTyxTQUV0QkYsRUFBS2hCLEVBQUtpQixLQUFLbEMsRUFBU3FCLEdBQzFCLE1BQU9YLEdBQUt1QixFQUFLLENBQUMsRUFBR3ZCLEdBQUlRLEVBQUksRUFBSyxRQUFVdEYsRUFBSXVGLEVBQUksRUFDdEQsR0FBWSxFQUFSYyxFQUFHLEdBQVEsTUFBTUEsRUFBRyxHQUFJLE1BQU8sQ0FBRXhGLE1BQU93RixFQUFHLEdBQUtBLEVBQUcsUUFBSyxFQUFRcEIsTUFBTSxHQXJCOUJMLENBQUssQ0FBQ3VCLEVBQUdDLE9Bd0I3RHpGLE9BQU9DLGVBQWVrTyxFQUFrQixhQUFjLENBQUVqTyxPQUFPLElBQy9EaU8sRUFBaUJHLGtCQUFlLEVBS2hDLElBQUlBLEVBQThCLFdBQzlCLFNBQVNBLEVBQWFsTyxHQUNsQlAsS0FBS3VLLFFBQVVoSyxFQUFLaUssT0FDcEJ4SyxLQUFLeUssT0FBU2xLLEVBQUttSyxNQUNuQjFLLEtBQUsySyxNQUFRLGVBQ2IzSyxLQUFLME8sZ0JBQWtCLEVBQ3ZCMU8sS0FBSzZLLEdBQUs3RyxRQUFROEcsSUFBSSxJQUN0QjlLLEtBQUsrSyxPQUFTLEtBQ2QvSyxLQUFLZ0wsT0FBU2hMLEtBQUtzSCxHQUFLdEgsS0FBS2tMLE9BQVNsTCxLQUFLaUwsS0FBTyxFQUNsRGpMLEtBQUsyTyxlQUFpQjNPLEtBQUs0TyxnQkFBa0IsS0FDN0M1TyxLQUFLNk8sY0FBZ0I3TyxLQUFLOE8sZUFBaUI5TyxLQUFLK08sZ0JBQWtCLEVBMGJ0RSxPQXhiQU4sRUFBYXhOLFVBQVVrSyxVQUFZLFNBQVVyRCxHQUN6QyxJQUFJc0QsRUFBUXBMLEtBQ1JELEVBQU9DLEtBSVgsR0FBbUIsV0FBZkEsS0FBSzJLLE1BQ0wsTUFBTSxJQUFJM0ksYUFBYSxvQkFBcUIscUJBRTVDaEMsS0FBSytLLFNBQ0wvSyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUFjLE9BQU8wRyxFQUFNQyxZQUV0RHJMLEtBQUsySyxNQUFRLGFBRWIzSyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUNuQixPQUFPNkosRUFBY3ZPLFVBQU0sT0FBUSxHQUFRLFdBQ3ZDLElBQUlzTCxFQUFXdkUsRUFBT0gsRUFBSW9JLEVBQ3RCN0gsRUFDSixPQUFPcUgsRUFBZ0J4TyxNQUFNLFNBQVV1TCxHQUNuQyxPQUFRQSxFQUFHckcsT0FDUCxLQUFLLEVBVUQsT0FUQW9HLEVBQVk1SCxFQUFVd0MsUUFBUTRCLEVBQU9ULE1BQU9TLEdBRTVDL0gsRUFBS2tQLGdCQUFrQixDQUFFQyxjQUFlLENBQ2hDN0gsTUFBT1MsRUFBT1QsTUFFZDNGLFdBQVksRUFDWkUsaUJBQWtCLElBRTFCN0IsRUFBS29QLHVCQUF3QixFQUN4QjdELEdBQ0wxRSxFQUFLN0csRUFDRSxDQUFDLEVBQWEyRCxFQUFVNEMsUUFGUixDQUFDLEVBQWEsR0FHekMsS0FBSyxFQUdELE9BRkFTLEVBQVFILEVBQUdtRSxPQUFTUSxFQUFHcEcsT0FDdkI2SixPQUFhLEVBQ04sQ0FBQyxFQUFhakksRUFBTXFJLGdCQUFnQjlELEVBQVVqRSxNQUFPaUUsSUFDaEUsS0FBSyxFQUdELE9BRkFuRSxFQUFLb0UsRUFBR3BHLE9BQVFwRixFQUFLaUwsT0FBUzdELEVBQUcsR0FBSXBILEVBQUt1SCxHQUFLSCxFQUFHLEdBQUlwSCxFQUFLbUwsT0FBUy9ELEVBQUcsR0FBSXBILEVBQUtrTCxLQUFPOUQsRUFBRyxHQUFJNkgsRUFBYTdILEVBQUcsR0FDOUdwSCxFQUFLc1AsS0FBTyxFQUNMLENBQUMsRUFBYXRJLEVBQU0wRSwyQkFBMkIxTCxFQUFLdUgsR0FBSSxFQUFHZ0UsRUFBVXJELElBQUlJLGNBQ3BGLEtBQUssRUFTRCxPQVJBa0QsRUFBR3BHLE9BRUhwRixFQUFLNk8sZ0JBQWtCLENBQ25CdkcsWUFBYWlELEVBQVVyRCxJQUFJSSxZQUMzQkYsV0FBWW1ELEVBQVVyRCxJQUFJRSxXQUMxQnlCLGVBQWdCMEIsRUFBVXJELElBQUkyQixlQUM5Qm9GLFdBQVlBLEdBRVQsQ0FBQyxFQUFhLEdBQ3pCLEtBQUssRUFDRGpQLEVBQUt1UCxtQkFBbUIsSUFBSXROLGFBQWEsb0JBQXFCLHNCQUM5RHVKLEVBQUdyRyxNQUFRLEVBQ2YsS0FBSyxFQUFHLE1BQU8sQ0FBQyxhQUk3QnlHLE1BQU0zTCxLQUFLeUssU0FHbEJnRSxFQUFheE4sVUFBVW9LLE1BQVEsV0FDM0IsT0FBT2tELEVBQWN2TyxVQUFNLE9BQVEsR0FBUSxXQUN2QyxPQUFPd08sRUFBZ0J4TyxNQUFNLFNBQVU0RyxHQUNuQyxPQUFRQSxFQUFHMUIsT0FDUCxLQUFLLEVBQ0QsT0FBS2xGLEtBQUs2TyxjQUNILENBQUMsRUFBYTdPLEtBQUsrSyxPQUFPd0UsdUJBQXVCdlAsS0FBSzZPLGdCQUQ3QixDQUFDLEVBQWEsR0FFbEQsS0FBSyxFQUNEakksRUFBR3pCLE9BQ0huRixLQUFLMk8sZUFBaUIzTyxLQUFLNE8sZ0JBQWtCLEtBQzdDNU8sS0FBSzZPLGNBQWdCN08sS0FBSzhPLGVBQWlCOU8sS0FBSytPLGdCQUM1QyxFQUNKbkksRUFBRzFCLE1BQVEsRUFDZixLQUFLLEVBQ0QsT0FBS2xGLEtBQUtzSCxHQUNILENBQUMsRUFBYXRILEtBQUsrSyxPQUFPeUUsZ0JBQWdCeFAsS0FBS3NILEdBQUl0SCxLQUFLa0wsT0FBUWxMLEtBQUtpTCxPQUR2RCxDQUFDLEVBQWEsR0FFdkMsS0FBSyxFQUNEckUsRUFBR3pCLE9BQ0huRixLQUFLZ0wsT0FBU2hMLEtBQUtzSCxHQUFLdEgsS0FBS2tMLE9BQVNsTCxLQUFLaUwsS0FBTyxFQUNsRHJFLEVBQUcxQixNQUFRLEVBQ2YsS0FBSyxFQUtELE9BSklsRixLQUFLK0ssU0FDTHJILEVBQVUyQyxLQUFLckcsS0FBSytLLFFBQ3BCL0ssS0FBSytLLE9BQVMsTUFFWCxDQUFDLFdBSzVCMEQsRUFBYXhOLFVBQVVxTyxtQkFBcUIsU0FBVXpELEdBQ2xELElBQUlULEVBQVFwTCxLQUVaQSxLQUFLeVAsbUJBQW1CNUQsR0FFeEI3TCxLQUFLMkssTUFBUSxTQUdiM0ssS0FBSzZLLEdBQUs3SyxLQUFLNkssR0FBR25HLE1BQUssV0FBYyxPQUFPMEcsRUFBTUMsV0FJM0IsZUFBbkJRLEVBQVVFLE9BQ1YvTCxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUFjMEcsRUFBTVgsT0FBT29CLFFBRTFENEMsRUFBYXhOLFVBQVV3TyxtQkFBcUIsU0FBVTVELEdBQ2xELElBQUlULEVBQVFwTCxLQUVaLEdBQW1CLFdBQWZBLEtBQUsySyxNQUNMLE1BQU0sSUFBSTNJLGFBQWEsaUJBQWtCLHFCQUU3Q2hDLEtBQUsySyxNQUFRLGVBRWIzSyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUFjLE9BQU8wRyxFQUFNQyxZQUV0RG9ELEVBQWF4TixVQUFVeU8sT0FBUyxTQUFVL08sR0FDdEMsSUFBSVosRUFBT0MsS0FHWCxHQUE2QixPQUF6QlcsRUFBS08sZ0JBQ0wsTUFBTSxJQUFJdUMsVUFBVSxZQUV4QixHQUFtQixlQUFmekQsS0FBSzJLLE1BQ0wsTUFBTSxJQUFJM0ksYUFBYSxlQUFnQixxQkFHM0MsSUFBSTJOLEVBQVloUCxFQUFLeUMsUUFFckJwRCxLQUFLME8sa0JBRUwxTyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUNuQixPQUFPNkosRUFBY3ZPLFVBQU0sT0FBUSxHQUFRLFdBQ3ZDLElBQUkrRyxFQUFPbUYsRUFBR0MsRUFBS3lELEVBQVVDLEVBQWdCL0IsRUFBS0YsRUFBWTVGLEVBQU85RSxFQUFHekIsRUFBUTZLLEVBQVNDLEVBQUtDLEVBQU9zRCxFQUFJbEcsRUFBZ0J2QixFQUFhK0QsRUFBTzJELEVBQXdCQyxFQUFXQyxFQUFZQyxFQUFTeEQsRUFDak05RixFQUNKLE9BQU80SCxFQUFnQnhPLE1BQU0sU0FBVW1ILEdBQ25DLE9BQVFBLEVBQUdqQyxPQUNQLEtBQUssRUFDRDZCLEVBQVFoSCxFQUFLZ0wsT0FDYm1CLEVBQUluTSxFQUFLdUgsR0FDVDZFLEVBQU1wTSxFQUFLa0wsS0FDWDJFLEVBQVc3UCxFQUFLbUwsT0FDaEIyRSxFQUFpQixLQUNqQjFJLEVBQUdqQyxNQUFRLEVBQ2YsS0FBSyxFQUlELEdBSEFpQyxFQUFHL0IsS0FBS2EsS0FBSyxDQUFDLEVBQUcsR0FBSSxDQUFFLEtBQ3ZCNkgsRUFBTTZCLEVBQVV6TyxnQkFDaEIwTSxFQUFhK0IsRUFBVWhPLGdCQUNsQkwsRUFBY0MsY0FBY29PLEVBQVVsTyxRQUFTLENBRWhELElBREF1RyxFQUFRLEdBQ0g5RSxFQUFJLEVBQUdBLEVBQUl5TSxFQUFVL04saUJBQWtCc0IsSUFDeEM4RSxFQUFNL0IsS0FBSzZILEVBQUlqTCxTQUFTSyxFQUFJMEssR0FBYTFLLEVBQUksR0FBSzBLLElBQ3RERSxFQUFNOUYsRUFHVixPQURBdkcsT0FBUyxFQUNEa08sRUFBVWxPLFFBQ2QsSUFBSyxLQUNEQSxFQUFTc0YsRUFBTXFHLGlCQUNmLE1BQ0osSUFBSyxNQUNEM0wsRUFBU3NGLEVBQU1zRyxrQkFDZixNQUNKLElBQUssTUFDRDVMLEVBQVNzRixFQUFNdUcsa0JBQ2YsTUFDSixJQUFLLE1BQ0Q3TCxFQUFTc0YsRUFBTXdHLGtCQUNmLE1BQ0osSUFBSyxZQUNEOUwsRUFBU3NGLEVBQU15RyxrQkFDZixNQUNKLElBQUssYUFDRC9MLEVBQVNzRixFQUFNMEcsbUJBQ2YsTUFDSixJQUFLLGFBQ0RoTSxFQUFTc0YsRUFBTTJHLG1CQUNmLE1BQ0osSUFBSyxhQUNEak0sRUFBU3NGLEVBQU00RyxtQkFDZixNQUNKLFFBQ0ksTUFBTSxJQUFJbEssVUFBVSw2QkFpQjVCLE9BZkE2SSxFQUFVbkQsS0FBS3dELE1BQU1nRCxFQUFVbFAsVUFBWSxLQUMzQzhMLEVBQU1ELEVBQVUsV0FDaEJFLEtBQVdGLEVBQVUsWUFDckJ3RCxFQUFLSCxFQUFVL04saUJBQ2ZnSSxFQUF5QixJQUFQa0csRUFBWSxHQUFNLEdBQUtBLEdBQU0sRUFDL0N6SCxFQUFjc0gsRUFBVWpPLFdBQ3hCMEssRUFBUSxDQUNKekwsS0FBTW1OLEVBQ05yTSxPQUFRQSxFQUNSOEssSUFBS0EsRUFDTEMsTUFBT0EsRUFDUDVDLGVBQWdCQSxFQUNoQnZCLFlBQWFBLEdBRWpCMEgsRUFBYSxLQUNSaFEsRUFBSzRPLGdCQUNWc0IsRUFBYWxRLEVBQUs0TyxnQkFDRHhHLGFBQWVpRSxFQUFNM0ssUUFDbEN3TyxFQUFXckcsaUJBQW1Cd0MsRUFBTXhDLGdCQUNwQ3FHLEVBQVc1SCxjQUFnQitELEVBQU0vRCxZQUFxQixDQUFDLEVBQWEsR0FDakUsQ0FBQyxFQUFhdEksRUFBS29RLFFBQVEsSUFBSSxJQUxMLENBQUMsRUFBYSxHQU1uRCxLQUFLLEVBRUQsT0FEQUgsRUFBWTdJLEVBQUdoQyxPQUNSLENBQUMsRUFBYTRCLEVBQU1xSixnQkFBZ0JsRSxFQUFHMEQsRUFBVXpELEVBQUs2RCxJQUNqRSxLQUFLLEVBR0QsT0FGQUQsRUFDSTVJLEVBQUdoQyxPQUNBLENBQUMsRUFBYTRCLEVBQU13SSx1QkFBdUJ4UCxFQUFLOE8sZ0JBQzNELEtBQUssRUFDRDFILEVBQUdoQyxPQUNIcEYsRUFBSzRPLGVBQWlCLEtBQ3RCNU8sRUFBSzhPLGNBQWdCOU8sRUFBSytPLGVBQ3RCL08sRUFBS2dQLGdCQUFrQixFQUMzQjVILEVBQUdqQyxNQUFRLEVBQ2YsS0FBSyxFQUNELE9BQU1uRixFQUFLOE8sY0FBc0IsQ0FBQyxFQUFhLElBQy9Db0IsRUFBYWxRLEVBQUs0TyxlQUFpQixDQUMvQnRHLFlBQWErRCxFQUFNL0QsWUFDbkJGLFdBQVlpRSxFQUFNM0ssT0FDbEJtSSxlQUFnQndDLEVBQU14QyxnQkFFbkIsQ0FBQyxFQUFhN0MsRUFBTXNKLHFCQUFxQixRQUFTSixFQUFZbFEsRUFBSzZPLG1CQUM5RSxLQUFLLEVBQ0RoSSxFQUFLTyxFQUFHaEMsT0FBUXBGLEVBQUs4TyxjQUFnQmpJLEVBQUcsR0FBSTdHLEVBQUsrTyxlQUFpQmxJLEVBQUcsR0FBSTdHLEVBQUtnUCxnQkFBa0JuSSxFQUFHLEdBQ25HTyxFQUFHakMsTUFBUSxFQUNmLEtBQUssRUFBRyxNQUFPLENBQUMsRUFBYW5GLEVBQUtvUSxRQUFRLENBQUMvRCxLQUMzQyxLQUFLLEVBRUQsT0FEQThELEVBQVUvSSxFQUFHaEMsT0FDTixDQUFDLEVBQWE0QixFQUFNcUosZ0JBQWdCbEUsRUFBRzBELEVBQVV6RCxFQUFLK0QsSUFDakUsS0FBSyxFQU1ELE9BSkFMLEVBQ0kxSSxFQUFHaEMsT0FDSDRLLElBQ0FGLEVBQWlCRSxFQUFXTyxPQUFPVCxJQUNqQ0EsRUFBZTdKLFNBQVdqRyxFQUFLb1AsdUJBQ2pDZSxHQUFXQSxFQUFRbEssT0FDaEIsQ0FBQyxFQUFhakcsRUFBS3dRLG1CQUFtQkwsRUFBUSxLQURkLENBQUMsRUFBYSxJQUV6RCxLQUFLLEdBQ0QvSSxFQUFHaEMsT0FDSGdDLEVBQUdqQyxNQUFRLEdBQ2YsS0FBSyxHQUFJLE1BQU8sQ0FBQyxFQUFhLElBQzlCLEtBQUssR0FLRCxPQUpBd0gsRUFBT3ZGLEVBQUdoQyxPQUNWcEYsRUFBSzhLLEdBQUs5SyxFQUFLOEssR0FBR25HLE1BQUssV0FDbkIzRSxFQUFLdVAsbUJBQW1CNUMsTUFFckIsQ0FBQyxFQUFhLElBQ3pCLEtBQUssR0FXRCxPQVJBM00sRUFBSzJPLGtCQU1EbUIsR0FDQTlQLEVBQUt5USwwQkFBMEJYLEdBQzVCLENBQUMsYUFJekJsRSxNQUFNM0wsS0FBS3lLLFNBR2xCZ0UsRUFBYXhOLFVBQVVrUCxRQUFVLFNBQVVsRCxFQUFRd0QsR0FFL0MsWUFEWSxJQUFSQSxJQUFrQkEsR0FBTSxHQUNyQmxDLEVBQWN2TyxVQUFNLE9BQVEsR0FBUSxXQUN2QyxJQUFJa1EsRUFBU2hKLEVBQUl3SixFQUFXdEUsRUFDNUIsT0FBT29DLEVBQWdCeE8sTUFBTSxTQUFVNEcsR0FDbkMsT0FBUUEsRUFBRzFCLE9BQ1AsS0FBSyxFQUFHLE1BQU8sQ0FBQyxFQUFhbEYsS0FBSytLLE9BQU80RixnQkFBZ0IzUSxLQUFLOE8sZUFBZ0I5TyxLQUFLK08sZ0JBQWlCL08sS0FBS2tMLE9BQVErQixFQUFRd0QsSUFDekgsS0FBSyxFQUVELElBREFQLEVBQVV0SixFQUFHekIsT0FDUitCLEVBQUssRUFBR3dKLEVBQVlSLEVBQVNoSixFQUFLd0osRUFBVTFLLE9BQVFrQixLQUNyRGtGLEVBQVFzRSxFQUFVeEosSUFDWnFGLElBQU12TSxLQUFLcVAsS0FDakJqRCxFQUFNSSxNQUFRLEVBQ2R4TSxLQUFLcVAsTUFBUWpELEVBQU13QixXQUV2QixNQUFPLENBQUMsRUFBY3NDLFdBTTFDekIsRUFBYXhOLFVBQVVzUCxtQkFBcUIsU0FBVW5FLEdBQ2xELE9BQU9tQyxFQUFjdk8sVUFBTSxPQUFRLEdBQVEsV0FDdkMsSUFBSStHLEVBQU9tRixFQUFHMEUsRUFBY0MsRUFBZ0JDLEVBQzVDLE9BQU90QyxFQUFnQnhPLE1BQU0sU0FBVTRHLEdBQ25DLE9BQVFBLEVBQUcxQixPQUNQLEtBQUssRUFHRCxPQUZBNkIsRUFBUS9HLEtBQUsrSyxPQUNibUIsRUFBSWxNLEtBQUtzSCxHQUNGLENBQUMsRUFBYVAsRUFBTWdLLHlCQUF5QjdFLElBQ3hELEtBQUssRUFFRCxPQURBMEUsRUFBZWhLLEVBQUd6QixPQUNYLENBQUMsRUFBYTRCLEVBQU1pSyw4QkFBOEI5RSxJQUM3RCxLQUFLLEVBR0QsT0FGQTJFLEVBQWlCakssRUFBR3pCLE9BQ3BCMkwsRUFBWSxLQUNORixHQUFnQkMsRUFDZixDQUFDLEVBQWE5SixFQUFNa0ssV0FBV0wsRUFBY0MsSUFETixDQUFDLEVBQWEsR0FFaEUsS0FBSyxFQUNEQyxFQUFZbEssRUFBR3pCLE9BQ2Z5QixFQUFHMUIsTUFBUSxFQUNmLEtBQUssRUFNRCxPQUxBbEYsS0FBS2lQLGdCQUFnQkMsY0FBY3hOLFdBQWEwSyxFQUFNL0QsWUFDdERySSxLQUFLaVAsZ0JBQWdCQyxjQUFjdE4saUJBQW1Cd0ssRUFBTXlCLFNBQ3hEaUQsSUFDQTlRLEtBQUtpUCxnQkFBZ0JDLGNBQWNnQyxZQUFjSixHQUNyRDlRLEtBQUttUCx1QkFBd0IsRUFDdEIsQ0FBQyxXQUs1QlYsRUFBYXhOLFVBQVV1UCwwQkFBNEIsU0FBVVcsR0FDN0NuUixLQUFLK0ssT0FFakIsSUFGQSxJQUNJckosRUFBYTFCLEtBQUs0TyxnQkFBZ0J2RyxZQUM3Qm5CLEVBQUssRUFBR2tLLEVBQVlELEVBQVNqSyxFQUFLa0ssRUFBVXBMLE9BQVFrQixJQUFNLENBQy9ELElBQUl1RixFQUFTMkUsRUFBVWxLLEdBRW5CMUcsRUFBdUIsRUFBZmlNLEVBQU80RSxNQUFhLE1BQVEsUUFFcEM1USxFQUFZMEksS0FBS3dELE9BQXNCLFdBQWZGLEVBQU9ELE1BQXNCQyxFQUFPRixLQUFPN0ssRUFBYSxLQUNoRmpCLEVBQVksSUFDWkEsRUFBWSxHQUNoQixJQUFJd0wsRUFBUSxJQUFJL0wsRUFBc0JJLGtCQUFrQixDQUNwREUsS0FBTUEsRUFDTkMsVUFBV0EsRUFDWEUsS0FBTThMLEVBQU85TCxPQUViWCxLQUFLbVAsc0JBQ0xuUCxLQUFLdUssUUFBUTBCLEVBQU9qTSxLQUFLaVAsaUJBRXpCalAsS0FBS3VLLFFBQVEwQixLQUd6QndDLEVBQWF4TixVQUFVZ04sTUFBUSxXQUMzQixJQUFJbE8sRUFBT0MsS0FDUGlILEVBQU1qSCxLQUFLNkssR0FBR25HLE1BQUssV0FDbkIsT0FBTzZKLEVBQWN2TyxVQUFNLE9BQVEsR0FBUSxXQUN2QyxJQUFJK0csRUFBT21GLEVBQUdFLEVBQU9ELEVBQUttRixFQUErQnpCLEVBQWdCSyxFQUFTaEMsRUFDbEYsT0FBT00sRUFBZ0J4TyxNQUFNLFNBQVU0RyxHQUNuQyxPQUFRQSxFQUFHMUIsT0FDUCxLQUFLLEVBQ0QsSUFBS25GLEVBQUt1SCxHQUNOLE1BQU8sQ0FBQyxHQUNaUCxFQUFRaEgsRUFBS2dMLE9BQ2JtQixFQUFJbk0sRUFBS3VILEdBQ1Q4RSxFQUFRck0sRUFBS21MLE9BQ2JpQixFQUFNcE0sRUFBS2tMLEtBQ1hxRyxFQUFnQnZSLEVBQUsrTyxlQUNKL08sRUFBS2dQLGdCQUN0QmMsRUFBaUIsS0FDakJqSixFQUFHMUIsTUFBUSxFQUNmLEtBQUssRUFHRCxPQUZBMEIsRUFBR3hCLEtBQUthLEtBQUssQ0FBQyxFQUFHLEVBQUcsQ0FBRSxJQUN0QmlLLEVBQVUsS0FDTG9CLEVBQ0UsQ0FBQyxFQUFhdlIsRUFBS29RLFFBQVEsSUFBSSxJQURYLENBQUMsRUFBYSxHQUU3QyxLQUFLLEVBQ0RELEVBQVV0SixFQUFHekIsT0FDYnlCLEVBQUcxQixNQUFRLEVBQ2YsS0FBSyxFQUFHLE1BQU8sQ0FBQyxFQUFhNkIsRUFBTXFKLGdCQUFnQmxFLEVBQUdFLEVBQU9ELEVBQUsrRCxHQUFXLElBQUksSUFDakYsS0FBSyxFQUdELE9BRkFMLEVBQ0lqSixFQUFHekIsUUFDQXBGLEVBQUtvUCx1QkFBeUJlLEdBQVdBLEVBQVFsSyxPQUNqRCxDQUFDLEVBQWFqRyxFQUFLd1EsbUJBQW1CTCxFQUFRLEtBRG1CLENBQUMsRUFBYSxHQUUxRixLQUFLLEVBQ0R0SixFQUFHekIsT0FDSHlCLEVBQUcxQixNQUFRLEVBQ2YsS0FBSyxFQUFHLE1BQU8sQ0FBQyxFQUFhLEdBQzdCLEtBQUssRUFLRCxPQUpBZ0osRUFBT3RILEVBQUd6QixPQUNWcEYsRUFBSzhLLEdBQUs5SyxFQUFLOEssR0FBR25HLE1BQUssV0FDbkIzRSxFQUFLdVAsbUJBQW1CcEIsTUFFckIsQ0FBQyxFQUFhLEdBQ3pCLEtBQUssRUFHRCxPQUZJMkIsR0FDQTlQLEVBQUt5USwwQkFBMEJYLEdBQzVCLENBQUMsYUFNNUIsT0FEQTdQLEtBQUs2SyxHQUFLNUQsRUFDSEEsR0FFWHdILEVBQWF4TixVQUFVa04sTUFBUSxXQUMzQm5PLEtBQUt5UCxtQkFBbUIsSUFBSXpOLGFBQWEsUUFBUyxnQkFFdER5TSxFQUFheE4sVUFBVW9DLE1BQVEsV0FDM0JyRCxLQUFLc1AsbUJBQW1CLElBQUl0TixhQUFhLFFBQVMsZ0JBRXREeU0sRUFBYUwsa0JBQW9CLFNBQVV0RyxHQUN2QyxPQUFPeUcsRUFBY3ZPLFVBQU0sT0FBUSxHQUFRLFdBQ3ZDLElBQUl1UixFQUFLakcsRUFBV3ZFLEVBQU9ILEVBQUlzRixFQUFHRSxFQUFPRCxFQUN6QyxPQUFPcUMsRUFBZ0J4TyxNQUFNLFNBQVVtSCxHQUNuQyxPQUFRQSxFQUFHakMsT0FDUCxLQUFLLEVBR0QsT0FGQXFNLEVBQU03TixFQUFVd0MsUUFBUTRCLEVBQU9ULE1BQU9TLEdBQ3RDd0QsR0FBWSxFQUNQaUcsRUFDRSxDQUFDLEVBQWE3TixFQUFVNEMsT0FEZCxDQUFDLEVBQWEsR0FFbkMsS0FBSyxFQUNEUyxFQUFRSSxFQUFHaEMsT0FDWGdDLEVBQUdqQyxNQUFRLEVBQ2YsS0FBSyxFQUVELE9BREFpQyxFQUFHL0IsS0FBS2EsS0FBSyxDQUFDLEVBQUcsRUFBRyxDQUFFLElBQ2YsQ0FBQyxFQUFhYyxFQUFNcUksZ0JBQWdCbUMsRUFBSWxLLE1BQU9rSyxJQUMxRCxLQUFLLEVBRUQsT0FEQTNLLEVBQUtPLEVBQUdoQyxPQUFRK0csRUFBSXRGLEVBQUcsR0FBSXdGLEVBQVF4RixFQUFHLEdBQUl1RixFQUFNdkYsRUFBRyxHQUM1QyxDQUFDLEVBQWFHLEVBQU15SSxnQkFBZ0J0RCxFQUFHRSxFQUFPRCxJQUN6RCxLQUFLLEVBR0QsT0FGQWhGLEVBQUdoQyxPQUNIbUcsR0FBWSxFQUNMLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBRUQsT0FET25FLEVBQUdoQyxPQUNILENBQUMsRUFBYSxHQUN6QixLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWF6QixFQUFVMkMsS0FBS1UsSUFDNUMsS0FBSyxFQUNESSxFQUFHaEMsT0FDSGdDLEVBQUdqQyxNQUFRLEVBQ2YsS0FBSyxFQUFHLE1BQU8sQ0FBQyxFQUFjLENBQ3RCb0csVUFBV0EsRUFDWHhELE9BQVFnQyxFQUFTQyxZQUFZakMsRUFBUSxDQUFDLFFBQVMsYUFBYyxtQkFBb0Isc0JBTWxHMkcsRUFwY3NCLEdBc2NqQ0gsRUFBaUJHLGFBQWVBLEVBRWhDLElBQUkrQyxFQUF3QixHQW9CNUJyUixPQUFPQyxlQUFlb1IsRUFBdUIsYUFBYyxDQUFFblIsT0FBTyxJQUNwRW1SLEVBQXNCQyx1QkFBb0IsRUFFMUNELEVBQXNCQyxrQkFBb0J2UixFQUFzQkksa0JBRWhFLElBQUlvUixFQUFrQixHQW9CbEJDLEVBQWtCM1IsTUFBUUEsS0FBSzJELFdBQWMsU0FBVUMsRUFBU0MsRUFBWUMsRUFBR0MsR0FFL0UsT0FBTyxJQUFLRCxJQUFNQSxFQUFJRSxXQUFVLFNBQVVDLEVBQVNDLEdBQy9DLFNBQVNDLEVBQVU5RCxHQUFTLElBQU0rRCxFQUFLTCxFQUFVTSxLQUFLaEUsSUFBVyxNQUFPaUUsR0FBS0osRUFBT0ksSUFDcEYsU0FBU0MsRUFBU2xFLEdBQVMsSUFBTStELEVBQUtMLEVBQWlCLE1BQUUxRCxJQUFXLE1BQU9pRSxHQUFLSixFQUFPSSxJQUN2RixTQUFTRixFQUFLSSxHQUpsQixJQUFlbkUsRUFJYW1FLEVBQU9DLEtBQU9SLEVBQVFPLEVBQU9uRSxRQUoxQ0EsRUFJeURtRSxFQUFPbkUsTUFKaERBLGFBQWlCeUQsRUFBSXpELEVBQVEsSUFBSXlELEdBQUUsU0FBVUcsR0FBV0EsRUFBUTVELE9BSVRxRSxLQUFLUCxFQUFXSSxHQUNsR0gsR0FBTUwsRUFBWUEsRUFBVVksTUFBTWYsRUFBU0MsR0FBYyxLQUFLUSxZQUdsRXVOLEVBQW9CNVIsTUFBUUEsS0FBSzRFLGFBQWdCLFNBQVVoQixFQUFTaUIsR0FDcEUsSUFBc0dyRixFQUFHc0YsRUFBR0MsRUFBR0MsRUFBM0dDLEVBQUksQ0FBRUMsTUFBTyxFQUFHQyxLQUFNLFdBQWEsR0FBVyxFQUFQSixFQUFFLEdBQVEsTUFBTUEsRUFBRSxHQUFJLE9BQU9BLEVBQUUsSUFBT0ssS0FBTSxHQUFJQyxJQUFLLElBQ2hHLE9BQU9MLEVBQUksQ0FBRVgsS0FBTWlCLEVBQUssR0FBSUMsTUFBU0QsRUFBSyxHQUFJRSxPQUFVRixFQUFLLElBQXdCLG1CQUFYRyxTQUEwQlQsRUFBRVMsT0FBT0MsVUFBWSxXQUFhLE9BQU8xRixPQUFVZ0YsRUFDdkosU0FBU00sRUFBS0ssR0FBSyxPQUFPLFNBQVVDLEdBQUssT0FDekMsU0FBY0MsR0FDVixHQUFJckcsRUFBRyxNQUFNLElBQUlpRSxVQUFVLG1DQUMzQixLQUFPdUIsSUFBTUEsRUFBSSxFQUFHYSxFQUFHLEtBQU9aLEVBQUksSUFBS0EsR0FBRyxJQUN0QyxHQUFJekYsRUFBSSxFQUFHc0YsSUFBTUMsRUFBWSxFQUFSYyxFQUFHLEdBQVNmLEVBQVUsT0FBSWUsRUFBRyxHQUFLZixFQUFTLFNBQU9DLEVBQUlELEVBQVUsU0FBTUMsRUFBRWUsS0FBS2hCLEdBQUksR0FBS0EsRUFBRVQsU0FBV1UsRUFBSUEsRUFBRWUsS0FBS2hCLEVBQUdlLEVBQUcsS0FBS3BCLEtBQU0sT0FBT00sRUFFM0osT0FESUQsRUFBSSxFQUFHQyxJQUFHYyxFQUFLLENBQVMsRUFBUkEsRUFBRyxHQUFRZCxFQUFFMUUsUUFDekJ3RixFQUFHLElBQ1AsS0FBSyxFQUFHLEtBQUssRUFBR2QsRUFBSWMsRUFBSSxNQUN4QixLQUFLLEVBQWMsT0FBWFosRUFBRUMsUUFBZ0IsQ0FBRTdFLE1BQU93RixFQUFHLEdBQUlwQixNQUFNLEdBQ2hELEtBQUssRUFBR1EsRUFBRUMsUUFBU0osRUFBSWUsRUFBRyxHQUFJQSxFQUFLLENBQUMsR0FBSSxTQUN4QyxLQUFLLEVBQUdBLEVBQUtaLEVBQUVJLElBQUlVLE1BQU9kLEVBQUVHLEtBQUtXLE1BQU8sU0FDeEMsUUFDSSxLQUFNaEIsRUFBSUUsRUFBRUcsTUFBTUwsRUFBSUEsRUFBRWlCLE9BQVMsR0FBS2pCLEVBQUVBLEVBQUVpQixPQUFTLEtBQWtCLElBQVZILEVBQUcsSUFBc0IsSUFBVkEsRUFBRyxJQUFXLENBQUVaLEVBQUksRUFBRyxTQUNqRyxHQUFjLElBQVZZLEVBQUcsTUFBY2QsR0FBTWMsRUFBRyxHQUFLZCxFQUFFLElBQU1jLEVBQUcsR0FBS2QsRUFBRSxJQUFNLENBQUVFLEVBQUVDLE1BQVFXLEVBQUcsR0FBSSxNQUM5RSxHQUFjLElBQVZBLEVBQUcsSUFBWVosRUFBRUMsTUFBUUgsRUFBRSxHQUFJLENBQUVFLEVBQUVDLE1BQVFILEVBQUUsR0FBSUEsRUFBSWMsRUFBSSxNQUM3RCxHQUFJZCxHQUFLRSxFQUFFQyxNQUFRSCxFQUFFLEdBQUksQ0FBRUUsRUFBRUMsTUFBUUgsRUFBRSxHQUFJRSxFQUFFSSxJQUFJWSxLQUFLSixHQUFLLE1BQ3ZEZCxFQUFFLElBQUlFLEVBQUVJLElBQUlVLE1BQ2hCZCxFQUFFRyxLQUFLVyxNQUFPLFNBRXRCRixFQUFLaEIsRUFBS2lCLEtBQUtsQyxFQUFTcUIsR0FDMUIsTUFBT1gsR0FBS3VCLEVBQUssQ0FBQyxFQUFHdkIsR0FBSVEsRUFBSSxFQUFLLFFBQVV0RixFQUFJdUYsRUFBSSxFQUN0RCxHQUFZLEVBQVJjLEVBQUcsR0FBUSxNQUFNQSxFQUFHLEdBQUksTUFBTyxDQUFFeEYsTUFBT3dGLEVBQUcsR0FBS0EsRUFBRyxRQUFLLEVBQVFwQixNQUFNLEdBckI5QkwsQ0FBSyxDQUFDdUIsRUFBR0MsT0F3QjdEekYsT0FBT0MsZUFBZXNSLEVBQWlCLGFBQWMsQ0FBRXJSLE9BQU8sSUFDOURxUixFQUFnQkcsMEJBQTRCSCxFQUFnQkksNEJBQThCSixFQUFnQkssWUFBY0wsRUFBZ0JNLFVBQVlOLEVBQWdCTyxnQkFBYSxFQUVqTCxJQUFJQyxFQUFrQixLQUNsQkQsRUFBNEIsV0FDNUIsU0FBU0EsRUFBV3RSLEVBQU1KLEdBQ2xCSSxhQUFnQndSLGFBQ2hCeFIsRUFBS0csa0JBQWtCcVIsWUFDdkJuUyxLQUFLb1MsaUJBQWlCelIsRUFBTUosR0FHNUJQLEtBQUtxUyxpQkFBaUIxUixFQUFNSixHQXNZcEMsT0FuWUEwUixFQUFXaFIsVUFBVW9SLGlCQUFtQixTQUFVQyxFQUFPL1IsR0FDN0IsT0FBcEIyUixLQUNBQSxFQUFrQkssU0FBU0MsY0FBYyxXQUN6QkMsTUFBTUMsUUFBVSxPQUNoQ0gsU0FBUzFOLEtBQUs4TixZQUFZVCxJQUk5QixJQUFJbkosRUFBUSxFQUFHQyxFQUFTLEVBYXhCLEdBWklzSixFQUFNTSxjQUNON0osRUFBUXVKLEVBQU1NLGFBQ2Q1SixFQUFTc0osRUFBTU8sZUFFVlAsRUFBTVEsWUFDWC9KLEVBQVF1SixFQUFNUSxXQUNkOUosRUFBU3NKLEVBQU1TLGFBRVZULEVBQU12SixRQUNYQSxFQUFRdUosRUFBTXZKLE1BQ2RDLEVBQVNzSixFQUFNdEosU0FFZEQsSUFBVUMsRUFDWCxNQUFNLElBQUloSCxhQUFhLGlDQUFrQyxxQkFFN0RrUSxFQUFnQm5KLE1BQVFBLEVBQ3hCbUosRUFBZ0JsSixPQUFTQSxFQUN6QixJQUFJZixFQUFNaUssRUFBZ0JjLFdBQVcsTUFDckMvSyxFQUFJZ0wsVUFBVSxFQUFHLEVBQUdsSyxFQUFPQyxHQUMzQmYsRUFBSWlMLFVBQVVaLEVBQU8sRUFBRyxHQUN4QnRTLEtBQUtvUyxpQkFBaUJuSyxFQUFJa0wsYUFBYSxFQUFHLEVBQUdwSyxFQUFPQyxHQUFRckksS0FBTSxDQUM5RGMsT0FBUSxPQUNSMlIsV0FBWXJLLEVBQ1pzSyxZQUFhckssRUFDYnZJLFVBQVdGLEVBQUtFLFVBQ2hCQyxTQUFVSCxFQUFLRyxVQUFZLEVBQzNCNFMsT0FBUSxDQUFDLENBQUVDLE9BQVEsRUFBR0MsT0FBZ0IsRUFBUnpLLElBQzlCUSxhQUFjaEosRUFBS2dKLGNBQWdCUixFQUNuQ1UsY0FBZWxKLEVBQUtrSixlQUFpQlQsS0FHN0NpSixFQUFXaFIsVUFBVW1SLGlCQUFtQixTQUFVelIsRUFBTUosR0FDcEQsSUFBSWtCLEVBQVN6QixLQUFLeUIsT0FBU2xCLEVBQUtrQixPQUM1QnNILEVBQVEvSSxLQUFLb1QsV0FBYTdTLEVBQUs2UyxXQUMvQnBLLEVBQVNoSixLQUFLcVQsWUFBYzlTLEVBQUs4UyxZQUNyQ3JULEtBQUt5VCxZQUFjLElBQUlDLFFBQVEsRUFBRyxFQUFHM0ssRUFBT0MsR0FDNUMsSUFBSU0sRUFBU3RKLEtBQUt1SixhQUNkaEosRUFBS2dKLGNBQWdCaEosRUFBSzZTLFdBQzFCNUosRUFBVXhKLEtBQUt5SixjQUNmbEosRUFBS2tKLGVBQWlCbEosRUFBSzhTLFlBZS9CLEdBYkkvSixJQUFXUCxHQUNYUyxJQUFZUixHQUVaaEosS0FBSzJULGtCQUFtQixFQUN4QjNULEtBQUs0VCxTQUFXdEssRUFBU04sRUFDekJoSixLQUFLNlQsU0FBV3JLLEVBQVVULEdBRzFCL0ksS0FBSzJULGtCQUFtQixFQUU1QjNULEtBQUtTLFVBQVlGLEVBQUtFLFVBQ2xCRixFQUFLRyxXQUNMVixLQUFLVSxTQUFXSCxFQUFLRyxVQUNyQkgsRUFBSytTLE9BQ0x0VCxLQUFLOFQsUUFBVXZULEVBQUsrUyxXQUVuQixDQUlELElBSEEsSUFBSVMsRUFBYS9CLEVBQVV2USxHQUN2QjZSLEVBQVMsR0FDVEMsRUFBUyxFQUNKclEsRUFBSSxFQUFHQSxFQUFJNlEsRUFBWTdRLElBQUssQ0FDakMsSUFBSThRLEVBQWNsQyxFQUE0QnJRLEVBQVF5QixHQUNsRCtRLEVBQWVwQyxFQUEwQnBRLEVBQVF5QixHQUNqRHNRLEtBQVl6SyxFQUFRaUwsR0FDeEJWLEVBQU9yTixLQUFLLENBQUVzTixPQUFRQSxFQUFRQyxPQUFRQSxJQUN0Q0QsR0FBVUMsS0FBYXhLLEVBQVNpTCxHQUVwQ2pVLEtBQUs4VCxRQUFVUixFQUVuQnRULEtBQUtZLE1BQVEsSUFBSUMsV0FBV0YsRUFBS0csUUFBVUgsRUFBTUEsRUFBS0ksWUFBYyxJQUd4RWtSLEVBQVdoUixVQUFVQyxjQUFnQixXQUFjLE9BQU9sQixLQUFLWSxPQUMvRHFSLEVBQVdoUixVQUFVYSxlQUFpQixTQUFVQyxHQUc1QyxRQUZnQixJQUFaQSxJQUFzQkEsRUFBVSxJQUVqQixPQUFmL0IsS0FBS1ksTUFDTCxNQUFNLElBQUlvQixhQUFhLFdBQVkscUJBRXZDLEdBQW9CLE9BQWhCaEMsS0FBS3lCLE9BQ0wsTUFBTSxJQUFJTyxhQUFhLGdCQUFpQixxQkFNNUMsT0FGcUJoQyxLQUFLa1UsOEJBQThCblMsR0FFbENELGdCQUUxQm1RLEVBQVdoUixVQUFVaVQsOEJBQWdDLFNBQVVuUyxHQUczRCxJQUFJb1MsRUFBY25VLEtBQUt5VCxZQUduQlcsRUFBZXJTLEVBQVFzUyxLQUN2QixJQUFJWCxRQUFRM1IsRUFBUXNTLEtBQUtDLEVBQUd2UyxFQUFRc1MsS0FBS3ZQLEVBQUcvQyxFQUFRc1MsS0FBS3RMLE1BQU9oSCxFQUFRc1MsS0FBS3JMLFFBQzNFLEtBS0Z1TCxFQUFhdlUsS0FBS3dVLGtCQUFrQkwsRUFBYUMsR0FHakRLLEVBQVkxUyxFQUFRdVIsUUFBVSxLQU1sQyxPQUZxQnRULEtBQUswVSxnQ0FBZ0NILEVBQVlFLElBSTFFeEMsRUFBV2hSLFVBQVV1VCxrQkFBb0IsU0FBVUwsRUFBYUMsR0FFNUQsSUFBSU8sRUFBYVIsRUFFakIsR0FBSUMsRUFBYyxDQUdkLEdBQTJCLElBQXZCQSxFQUFhckwsT0FBdUMsSUFBeEJxTCxFQUFhcEwsT0FDekMsTUFBTSxJQUFJdkYsVUFBVSxxQkFHeEIsR0FBSTJRLEVBQWFFLEVBQUlGLEVBQWFyTCxNQUFRL0ksS0FBS29ULFdBQzNDLE1BQU0sSUFBSTNQLFVBQVUscUJBR3hCLEdBQUkyUSxFQUFhdFAsRUFBSXNQLEVBQWFwTCxPQUFTaEosS0FBS3FULFlBQzVDLE1BQU0sSUFBSTVQLFVBQVUscUJBRXhCa1IsRUFBYVAsRUFNakIsSUFGcUJwVSxLQUFLNFUsMkJBQTJCRCxHQUdqRCxNQUFNLElBQUlsUixVQUFVLHFCQUV4QixPQUFPa1IsR0FFWDFDLEVBQVdoUixVQUFVeVQsZ0NBQWtDLFNBQVVILEVBQVlqQixHQUV6RSxJQUFJUyxFQUFhL0IsRUFBVWhTLEtBQUt5QixRQUdoQyxHQUFJNlIsR0FBVUEsRUFBT3ROLFNBQVcrTixFQUM1QixNQUFNLElBQUl0USxVQUFVLGtCQVV4QixJQVJBLElBQUlvUixFQUFvQixFQUVwQkMsRUFBa0IsR0FFbEJDLEVBQWEsR0FFYnpTLEVBQWEsRUFFVkEsRUFBYXlSLEdBQVksQ0FJNUIsSUFBSWlCLEVBQWVqRCxFQUFZL1IsS0FBS3lCLE9BQVFhLEdBR3hDMFIsRUFBY2xDLEVBQTRCOVIsS0FBS3lCLE9BQVFhLEdBR3ZEMlIsRUFBZXBDLEVBQTBCN1IsS0FBS3lCLE9BQVFhLEdBR3REMlMsRUFBbUJqQixFQUFjZ0IsRUFFakNFLEVBQWlCLENBQ2pCQyxrQkFBbUIsRUFDbkJDLGtCQUFtQixFQUduQkMsYUFBY2QsRUFBV3pQLEVBQUltUCxHQUk3QnFCLGdCQUFpQmYsRUFBV3ZMLE9BQVNpTCxHQUlyQ3NCLG1CQUFvQmhCLEVBQVdELEVBQUlXLEdBSW5DTyxvQkFBcUJqQixFQUFXeEwsTUFBUWtNLElBRzVDLEdBQUkzQixFQUFRLENBR1IsSUFBSW1DLEVBQWNuQyxFQUFPaFIsR0FHekIsR0FBSW1ULEVBQVlqQyxPQUFTMEIsRUFBZU0saUJBQ3BDLE1BQU0sSUFBSS9SLFVBQVUsa0JBR3hCeVIsRUFBZUMsa0JBQW9CTSxFQUFZbEMsT0FHL0MyQixFQUFlRSxrQkFBb0JLLEVBQVlqQyxZQU0vQzBCLEVBQWVDLGtCQUFvQk4sRUFHbkNLLEVBQWVFLGtCQUFvQkYsRUFBZU0saUJBSXRELElBQUlFLEVBQVlSLEVBQWVFLGtCQUFvQkYsRUFBZUksYUFHOURLLEVBQVdELEVBQVlSLEVBQWVDLGtCQUcxQyxHQUFJTyxHQUFhLFlBQ2JDLEdBQVksV0FDWixNQUFNLElBQUlsUyxVQUFVLG1CQUV4QnNSLEVBQVc5TyxLQUFLMFAsR0FHWkEsRUFBV2QsSUFDWEEsRUFBb0JjLEdBSXhCLElBRkEsSUFBSUMsRUFBb0IsRUFFakJBLEVBQW9CdFQsR0FBWSxDQU9uQyxLQUFJcVQsR0FMZ0JiLEVBQWdCYyxHQUtOVCxtQkFDMUJKLEVBQVdhLElBQXNCVixFQUFlQyxtQkFJaEQsTUFBTSxJQUFJMVIsVUFBVSx3QkFFeEJtUyxJQUdKZCxFQUFnQjdPLEtBQUtpUCxHQUVyQjVTLElBV0osTUFQcUIsQ0FFakJ3UyxnQkFBaUJBLEVBRWpCaFQsZUFBZ0IrUyxJQUt4QjVDLEVBQVdoUixVQUFVMlQsMkJBQTZCLFNBQVVQLEdBRXhELElBQUtyVSxLQUFLeUIsT0FDTixPQUFPLEVBTVgsSUFKQSxJQUFJYSxFQUFhLEVBRWJ5UixFQUFhL0IsRUFBVWhTLEtBQUt5QixRQUV6QmEsRUFBYXlSLEdBQVksQ0FLNUIsSUFBSUMsRUFBY2xDLEVBQTRCOVIsS0FBS3lCLE9BQVFhLEdBR3ZEMlIsRUFBZXBDLEVBQTBCN1IsS0FBS3lCLE9BQVFhLEdBR3REdVQsRUFBS3hCLEVBQUtDLEVBQUlOLEVBQ2xCLEdBQUk2QixNQUFTQSxFQUNULE9BQU8sRUFDWCxJQUFJQyxFQUFLekIsRUFBS3RMLE1BQVFpTCxFQUN0QixHQUFJOEIsTUFBU0EsRUFDVCxPQUFPLEVBR1gsSUFBSUMsRUFBSzFCLEVBQUt2UCxFQUFJbVAsRUFDbEIsR0FBSThCLE1BQVNBLEVBQ1QsT0FBTyxFQUNYLElBQUlDLEVBQUszQixFQUFLckwsT0FBU2lMLEVBQ3ZCLEdBQUkrQixNQUFTQSxFQUNULE9BQU8sRUFFWDFULElBR0osT0FBTyxHQUVYMlAsRUFBV2hSLFVBQVVFLE9BQVMsU0FBVUMsRUFBYVcsR0FFakQsWUFEZ0IsSUFBWkEsSUFBc0JBLEVBQVUsSUFDN0I0UCxFQUFlM1IsVUFBTSxPQUFRLEdBQVEsV0FDeEMsSUFBSWlXLEVBQVNDLEVBQWdCalAsRUFBaUIzRSxFQUFZNlQsRUFBY2pCLEVBQWdCa0IsRUFBY2pCLEVBQW1Ca0IsRUFBVUMsRUFDbkksT0FBTzFFLEVBQWlCNVIsTUFBTSxTQUFVNEcsR0FHcEMsR0FGQXFQLEVBQVUsSUFBSXBWLFdBQVdPLEVBQVlOLFFBQVVNLEVBQWFBLEVBQVlMLFlBQWMsR0FFbkUsT0FBZmYsS0FBS1ksTUFDTCxNQUFNLElBQUlvQixhQUFhLFdBQVkscUJBRXZDLElBQUtoQyxLQUFLeUIsT0FDTixNQUFNLElBQUlPLGFBQWEsWUFBYSxxQkFJeEMsR0FIQWtVLEVBQWlCbFcsS0FBS2tVLDhCQUE4Qm5TLEdBR2hEWCxFQUFZSixXQUFha1YsRUFBZXBVLGVBQ3hDLE1BQU0sSUFBSTJCLFVBQVUsc0JBS3hCLElBSkF3RCxFQUFNLEdBQ08rSyxFQUFVaFMsS0FBS3lCLFFBQzVCYSxFQUFhLEVBRU5BLEVBQWE0VCxFQUFlcEIsZ0JBQWdCOU8sUUFBUSxDQVV2RCxJQVRBbVEsRUFBZW5XLEtBQUs4VCxRQUFReFIsR0FBWWtSLE9BQ3hDMEIsRUFBaUJnQixFQUFlcEIsZ0JBQWdCeFMsR0FDaEQ4VCxFQUFlbEIsRUFBZUcsVUFBWWMsRUFFMUNDLEdBQWdCbEIsRUFBZUssZ0JBQy9CSixFQUFvQkQsRUFBZUMsa0JBQ25Da0IsRUFBV25CLEVBQWVNLGlCQUMxQmMsRUFBTSxFQUVDQSxFQUFNcEIsRUFBZUksY0FHeEJXLEVBQVE1VSxJQUFJckIsS0FBS1ksTUFBTWlDLFNBQVN1VCxFQUFjQSxFQUFlQyxHQUFXbEIsR0FFeEVpQixHQUFnQkQsRUFHaEJoQixHQUFxQkQsRUFBZUUsa0JBRXBDa0IsSUFHSmhVLElBQ0EyRSxFQUFJaEIsS0FBSyxDQUNMc04sT0FBUTJCLEVBQWVDLGtCQUN2QjNCLE9BQVEwQixFQUFlRSxvQkFLL0IsTUFBTyxDQUFDLEVBQWNuTyxVQUlsQ2dMLEVBQVdoUixVQUFVbUMsTUFBUSxXQUN6QixPQUFPLElBQUk2TyxFQUFXalMsS0FBS1ksTUFBTyxDQUM5QmEsT0FBUXpCLEtBQUt5QixPQUNiMlIsV0FBWXBULEtBQUtvVCxXQUNqQkMsWUFBYXJULEtBQUtxVCxZQUNsQjVTLFVBQVdULEtBQUtTLFVBQ2hCQyxTQUFVVixLQUFLVSxTQUNmNFMsT0FBUXRULEtBQUs4VCxXQUdyQjdCLEVBQVdoUixVQUFVb0MsTUFBUSxXQUN6QnJELEtBQUtZLE1BQVEsTUFFVnFSLEVBN1lvQixHQW9aL0IsU0FBU0QsRUFBVXZRLEdBQ2YsT0FBUUEsR0FDSixJQUFLLE9BQ0wsSUFBSyxPQUNMLElBQUssT0FDRCxPQUFPLEVBQ1gsSUFBSyxRQUNELE9BQU8sRUFDWCxJQUFLLE9BQ0QsT0FBTyxFQUNYLElBQUssT0FDTCxJQUFLLE9BQ0wsSUFBSyxPQUNMLElBQUssT0FDRCxPQUFPLEVBQ1gsUUFDSSxNQUFNLElBQUlPLGFBQWEsaUNBQWtDLHNCQVNyRSxTQUFTK1AsRUFBWXRRLEVBQVFhLEdBQ3pCLE9BQVFiLEdBQ0osSUFBSyxPQUNMLElBQUssUUFDTCxJQUFLLE9BQ0wsSUFBSyxPQUNELE9BQU8sRUFDWCxJQUFLLE9BQ0QsT0FBbUIsSUFBZmEsRUFDTyxFQUVBLEVBQ2YsSUFBSyxPQUNMLElBQUssT0FDTCxJQUFLLE9BQ0wsSUFBSyxPQUNELE9BQU8sRUFDWCxRQUNJLE1BQU0sSUFBSU4sYUFBYSxpQ0FBa0Msc0JBU3JFLFNBQVM4UCxFQUE0QnJRLEVBQVFhLEdBRXpDLEdBQW1CLElBQWZBLEVBQ0EsT0FBTyxFQUNYLE9BQVFiLEdBQ0osSUFBSyxPQUNMLElBQUssT0FDRCxPQUFPLEVBQ1gsSUFBSyxRQUNELE9BQW1CLElBQWZhLEVBQ08sRUFFQSxFQUNmLElBQUssT0FDRCxPQUFPLEVBQ1gsSUFBSyxPQUNELE9BQU8sRUFDWCxJQUFLLE9BQ0wsSUFBSyxPQUNMLElBQUssT0FDTCxJQUFLLE9BQ0QsT0FBTyxFQUNYLFFBQ0ksTUFBTSxJQUFJTixhQUFhLGlDQUFrQyxzQkFTckUsU0FBUzZQLEVBQTBCcFEsRUFBUWEsR0FFdkMsR0FBbUIsSUFBZkEsRUFDQSxPQUFPLEVBQ1gsT0FBUWIsR0FDSixJQUFLLE9BQ0QsT0FBTyxFQUNYLElBQUssUUFDRCxPQUFtQixJQUFmYSxFQUNPLEVBRUEsRUFDZixJQUFLLE9BQ0wsSUFBSyxPQUNELE9BQU8sRUFDWCxJQUFLLE9BQ0QsT0FBTyxFQUNYLElBQUssT0FDTCxJQUFLLE9BQ0wsSUFBSyxPQUNMLElBQUssT0FDRCxPQUFPLEVBQ1gsUUFDSSxNQUFNLElBQUlOLGFBQWEsaUNBQWtDLHNCQWhIckUwUCxFQUFnQk8sV0FBYUEsRUF3QjdCUCxFQUFnQk0sVUFBWUEsRUEyQjVCTixFQUFnQkssWUFBY0EsRUFnQzlCTCxFQUFnQkksNEJBQThCQSxFQWdDOUNKLEVBQWdCRywwQkFBNEJBLEVBRTVDLElBQUkwRSxFQUFvQixHQW9CcEJDLEVBQWtCeFcsTUFBUUEsS0FBSzJELFdBQWMsU0FBVUMsRUFBU0MsRUFBWUMsRUFBR0MsR0FFL0UsT0FBTyxJQUFLRCxJQUFNQSxFQUFJRSxXQUFVLFNBQVVDLEVBQVNDLEdBQy9DLFNBQVNDLEVBQVU5RCxHQUFTLElBQU0rRCxFQUFLTCxFQUFVTSxLQUFLaEUsSUFBVyxNQUFPaUUsR0FBS0osRUFBT0ksSUFDcEYsU0FBU0MsRUFBU2xFLEdBQVMsSUFBTStELEVBQUtMLEVBQWlCLE1BQUUxRCxJQUFXLE1BQU9pRSxHQUFLSixFQUFPSSxJQUN2RixTQUFTRixFQUFLSSxHQUpsQixJQUFlbkUsRUFJYW1FLEVBQU9DLEtBQU9SLEVBQVFPLEVBQU9uRSxRQUoxQ0EsRUFJeURtRSxFQUFPbkUsTUFKaERBLGFBQWlCeUQsRUFBSXpELEVBQVEsSUFBSXlELEdBQUUsU0FBVUcsR0FBV0EsRUFBUTVELE9BSVRxRSxLQUFLUCxFQUFXSSxHQUNsR0gsR0FBTUwsRUFBWUEsRUFBVVksTUFBTWYsRUFBU0MsR0FBYyxLQUFLUSxZQUdsRW9TLEVBQW9CelcsTUFBUUEsS0FBSzRFLGFBQWdCLFNBQVVoQixFQUFTaUIsR0FDcEUsSUFBc0dyRixFQUFHc0YsRUFBR0MsRUFBR0MsRUFBM0dDLEVBQUksQ0FBRUMsTUFBTyxFQUFHQyxLQUFNLFdBQWEsR0FBVyxFQUFQSixFQUFFLEdBQVEsTUFBTUEsRUFBRSxHQUFJLE9BQU9BLEVBQUUsSUFBT0ssS0FBTSxHQUFJQyxJQUFLLElBQ2hHLE9BQU9MLEVBQUksQ0FBRVgsS0FBTWlCLEVBQUssR0FBSUMsTUFBU0QsRUFBSyxHQUFJRSxPQUFVRixFQUFLLElBQXdCLG1CQUFYRyxTQUEwQlQsRUFBRVMsT0FBT0MsVUFBWSxXQUFhLE9BQU8xRixPQUFVZ0YsRUFDdkosU0FBU00sRUFBS0ssR0FBSyxPQUFPLFNBQVVDLEdBQUssT0FDekMsU0FBY0MsR0FDVixHQUFJckcsRUFBRyxNQUFNLElBQUlpRSxVQUFVLG1DQUMzQixLQUFPdUIsSUFBTUEsRUFBSSxFQUFHYSxFQUFHLEtBQU9aLEVBQUksSUFBS0EsR0FBRyxJQUN0QyxHQUFJekYsRUFBSSxFQUFHc0YsSUFBTUMsRUFBWSxFQUFSYyxFQUFHLEdBQVNmLEVBQVUsT0FBSWUsRUFBRyxHQUFLZixFQUFTLFNBQU9DLEVBQUlELEVBQVUsU0FBTUMsRUFBRWUsS0FBS2hCLEdBQUksR0FBS0EsRUFBRVQsU0FBV1UsRUFBSUEsRUFBRWUsS0FBS2hCLEVBQUdlLEVBQUcsS0FBS3BCLEtBQU0sT0FBT00sRUFFM0osT0FESUQsRUFBSSxFQUFHQyxJQUFHYyxFQUFLLENBQVMsRUFBUkEsRUFBRyxHQUFRZCxFQUFFMUUsUUFDekJ3RixFQUFHLElBQ1AsS0FBSyxFQUFHLEtBQUssRUFBR2QsRUFBSWMsRUFBSSxNQUN4QixLQUFLLEVBQWMsT0FBWFosRUFBRUMsUUFBZ0IsQ0FBRTdFLE1BQU93RixFQUFHLEdBQUlwQixNQUFNLEdBQ2hELEtBQUssRUFBR1EsRUFBRUMsUUFBU0osRUFBSWUsRUFBRyxHQUFJQSxFQUFLLENBQUMsR0FBSSxTQUN4QyxLQUFLLEVBQUdBLEVBQUtaLEVBQUVJLElBQUlVLE1BQU9kLEVBQUVHLEtBQUtXLE1BQU8sU0FDeEMsUUFDSSxLQUFNaEIsRUFBSUUsRUFBRUcsTUFBTUwsRUFBSUEsRUFBRWlCLE9BQVMsR0FBS2pCLEVBQUVBLEVBQUVpQixPQUFTLEtBQWtCLElBQVZILEVBQUcsSUFBc0IsSUFBVkEsRUFBRyxJQUFXLENBQUVaLEVBQUksRUFBRyxTQUNqRyxHQUFjLElBQVZZLEVBQUcsTUFBY2QsR0FBTWMsRUFBRyxHQUFLZCxFQUFFLElBQU1jLEVBQUcsR0FBS2QsRUFBRSxJQUFNLENBQUVFLEVBQUVDLE1BQVFXLEVBQUcsR0FBSSxNQUM5RSxHQUFjLElBQVZBLEVBQUcsSUFBWVosRUFBRUMsTUFBUUgsRUFBRSxHQUFJLENBQUVFLEVBQUVDLE1BQVFILEVBQUUsR0FBSUEsRUFBSWMsRUFBSSxNQUM3RCxHQUFJZCxHQUFLRSxFQUFFQyxNQUFRSCxFQUFFLEdBQUksQ0FBRUUsRUFBRUMsTUFBUUgsRUFBRSxHQUFJRSxFQUFFSSxJQUFJWSxLQUFLSixHQUFLLE1BQ3ZEZCxFQUFFLElBQUlFLEVBQUVJLElBQUlVLE1BQ2hCZCxFQUFFRyxLQUFLVyxNQUFPLFNBRXRCRixFQUFLaEIsRUFBS2lCLEtBQUtsQyxFQUFTcUIsR0FDMUIsTUFBT1gsR0FBS3VCLEVBQUssQ0FBQyxFQUFHdkIsR0FBSVEsRUFBSSxFQUFLLFFBQVV0RixFQUFJdUYsRUFBSSxFQUN0RCxHQUFZLEVBQVJjLEVBQUcsR0FBUSxNQUFNQSxFQUFHLEdBQUksTUFBTyxDQUFFeEYsTUFBT3dGLEVBQUcsR0FBS0EsRUFBRyxRQUFLLEVBQVFwQixNQUFNLEdBckI5QkwsQ0FBSyxDQUFDdUIsRUFBR0MsT0F3QjdEekYsT0FBT0MsZUFBZW1XLEVBQW1CLGFBQWMsQ0FBRWxXLE9BQU8sSUFDaEVrVyxFQUFrQkcsa0JBQWUsRUFJakMsSUFBSUEsRUFBOEIsV0FDOUIsU0FBU0EsRUFBYW5XLEdBQ2xCUCxLQUFLdUssUUFBVWhLLEVBQUtpSyxPQUNwQnhLLEtBQUt5SyxPQUFTbEssRUFBS21LLE1BQ25CMUssS0FBSzJLLE1BQVEsZUFDYjNLLEtBQUs0SyxnQkFBa0IsRUFDdkI1SyxLQUFLNkssR0FBSzdHLFFBQVE4RyxJQUFJLElBQ3RCOUssS0FBSytLLE9BQVMsS0FDZC9LLEtBQUtnTCxPQUFTaEwsS0FBS3NILEdBQUt0SCxLQUFLaUwsS0FBT2pMLEtBQUtrTCxPQUFTLEVBcVV0RCxPQW5VQXdMLEVBQWF6VixVQUFVa0ssVUFBWSxTQUFVckQsR0FDekMsSUFBSXNELEVBQVFwTCxLQUNSRCxFQUFPQyxLQUlYLEdBQW1CLFdBQWZBLEtBQUsySyxNQUNMLE1BQU0sSUFBSTNJLGFBQWEsb0JBQXFCLHFCQUU1Q2hDLEtBQUsrSyxTQUNML0ssS0FBSzZLLEdBQUs3SyxLQUFLNkssR0FBR25HLE1BQUssV0FBYyxPQUFPMEcsRUFBTUMsWUFFdERyTCxLQUFLMkssTUFBUSxhQUliM0ssS0FBSzZLLEdBQUs3SyxLQUFLNkssR0FBR25HLE1BQUssV0FDbkIsT0FBTzhSLEVBQWV4VyxVQUFNLE9BQVEsR0FBUSxXQUN4QyxJQUFJc0wsRUFBV3ZFLEVBQU9ILEVBQ2xCTyxFQUNKLE9BQU9zUCxFQUFpQnpXLE1BQU0sU0FBVXVMLEdBQ3BDLE9BQVFBLEVBQUdyRyxPQUNQLEtBQUssRUFFRCxPQURBb0csRUFBWTVILEVBQVV5QyxRQUFRMkIsRUFBT1QsU0FFckNULEVBQUs3RyxFQUNFLENBQUMsRUFBYTJELEVBQVU0QyxRQUZSLENBQUMsRUFBYSxHQUd6QyxLQUFLLEVBRUQsTUFBTyxDQUFDLEdBRFJTLEVBQVFILEVBQUdtRSxPQUFTUSxFQUFHcEcsUUFDSXFHLGdCQUFnQkYsRUFBVWpFLFFBQ3pELEtBQUssRUFHRCxPQURBRixFQUFLb0UsRUFBR3BHLE9BQVFwRixFQUFLaUwsT0FBUzdELEVBQUcsR0FBSXBILEVBQUt1SCxHQUFLSCxFQUFHLEdBQUlwSCxFQUFLa0wsS0FBTzlELEVBQUcsR0FBSXBILEVBQUttTCxPQUFTL0QsRUFBRyxHQUNuRixDQUFDLEVBQWFKLEVBQU0wRSwyQkFBMkIxTCxFQUFLdUgsR0FBSSxFQUFHLE1BQ3RFLEtBQUssRUFFRCxPQURBaUUsRUFBR3BHLE9BQ0ksQ0FBQyxFQUFhLEdBQ3pCLEtBQUssRUFDRHBGLEVBQUs0VyxtQkFBbUIsSUFBSTNVLGFBQWEsb0JBQXFCLHNCQUM5RHVKLEVBQUdyRyxNQUFRLEVBQ2YsS0FBSyxFQUFHLE1BQU8sQ0FBQyxhQUk3QnlHLE1BQU0zTCxLQUFLeUssU0FHbEJpTSxFQUFhelYsVUFBVW9LLE1BQVEsV0FDM0IsT0FBT21MLEVBQWV4VyxVQUFNLE9BQVEsR0FBUSxXQUN4QyxPQUFPeVcsRUFBaUJ6VyxNQUFNLFNBQVU0RyxHQUNwQyxPQUFRQSxFQUFHMUIsT0FDUCxLQUFLLEVBQ0QsT0FBS2xGLEtBQUtzSCxHQUNILENBQUMsRUFBYXRILEtBQUsrSyxPQUFPYSxnQkFBZ0I1TCxLQUFLc0gsR0FBSXRILEtBQUtpTCxLQUFNakwsS0FBS2tMLFNBRHJELENBQUMsRUFBYSxHQUV2QyxLQUFLLEVBQ0R0RSxFQUFHekIsT0FDSG5GLEtBQUtnTCxPQUFTaEwsS0FBS3NILEdBQUt0SCxLQUFLaUwsS0FBT2pMLEtBQUtrTCxPQUFTLEVBQ2xEdEUsRUFBRzFCLE1BQVEsRUFDZixLQUFLLEVBS0QsT0FKSWxGLEtBQUsrSyxTQUNMckgsRUFBVTJDLEtBQUtyRyxLQUFLK0ssUUFDcEIvSyxLQUFLK0ssT0FBUyxNQUVYLENBQUMsV0FLNUIyTCxFQUFhelYsVUFBVTBWLG1CQUFxQixTQUFVOUssR0FDbEQsSUFBSVQsRUFBUXBMLEtBRVpBLEtBQUs0VyxtQkFBbUIvSyxHQUV4QjdMLEtBQUsySyxNQUFRLFNBR2IzSyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUFjLE9BQU8wRyxFQUFNQyxXQUkzQixlQUFuQlEsRUFBVUUsT0FDVi9MLEtBQUs2SyxHQUFLN0ssS0FBSzZLLEdBQUduRyxNQUFLLFdBQWMwRyxFQUFNWCxPQUFPb0IsUUFFMUQ2SyxFQUFhelYsVUFBVTJWLG1CQUFxQixTQUFVL0ssR0FDbEQsSUFBSVQsRUFBUXBMLEtBRVosR0FBbUIsV0FBZkEsS0FBSzJLLE1BQ0wsTUFBTSxJQUFJM0ksYUFBYSxpQkFBa0IscUJBRTdDaEMsS0FBSzJLLE1BQVEsZUFFYjNLLEtBQUs2SyxHQUFLN0ssS0FBSzZLLEdBQUduRyxNQUFLLFdBQWMsT0FBTzBHLEVBQU1DLFlBRXREcUwsRUFBYXpWLFVBQVUrSyxPQUFTLFNBQVVDLEdBQ3RDLElBQUlsTSxFQUFPQyxLQUVYLEdBQW1CLGVBQWZBLEtBQUsySyxNQUNMLE1BQU0sSUFBSTNJLGFBQWEsZUFBZ0IscUJBUTNDaEMsS0FBSzRLLGtCQUVMNUssS0FBSzZLLEdBQUs3SyxLQUFLNkssR0FBR25HLE1BQUssV0FDbkIsT0FBTzhSLEVBQWV4VyxVQUFNLE9BQVEsR0FBUSxXQUN4QyxJQUFJK0csRUFBT21GLEVBQUdDLEVBQUtDLEVBQU9DLEVBQWdCQyxFQUFTQyxFQUFLQyxFQUFPQyxFQUFRQyxFQUN2RSxPQUFPK0osRUFBaUJ6VyxNQUFNLFNBQVU0RyxHQUNwQyxPQUFRQSxFQUFHMUIsT0FDUCxLQUFLLEVBQ0Q2QixFQUFRaEgsRUFBS2dMLE9BQ2JtQixFQUFJbk0sRUFBS3VILEdBQ1Q2RSxFQUFNcE0sRUFBS2tMLEtBQ1htQixFQUFRck0sRUFBS21MLE9BQ2JtQixFQUFpQixLQUNqQnpGLEVBQUcxQixNQUFRLEVBQ2YsS0FBSyxFQWdCRCxPQWZBMEIsRUFBR3hCLEtBQUthLEtBQUssQ0FBQyxFQUFHLEVBQUcsQ0FBRSxJQUN0QnFHLEVBQVVuRCxLQUFLd0QsTUFBTVYsRUFBTXhMLFVBQVksS0FDdkM4TCxFQUFNRCxFQUFVLFdBQ2hCRSxLQUFXRixFQUFVLFlBQ3JCRyxFQUFTLENBQ0w5TCxLQUFNc0wsRUFBTS9LLGdCQUNacUwsSUFBS0EsRUFDTEMsTUFBT0EsRUFDUEksSUFBS0wsRUFDTE0sTUFBT0wsR0FFUFAsRUFBTXZMLFdBQ04rTCxFQUFPL0wsU0FBV3lJLEtBQUt3RCxNQUFNVixFQUFNdkwsU0FBVyxLQUM5QytMLEVBQU9LLFdBQWEsR0FFakIsQ0FBQyxFQUFhL0YsRUFBTWdHLGdCQUFnQmIsRUFBR0MsRUFBS0MsRUFBTyxDQUFDSyxLQUMvRCxLQUFLLEVBRUQsT0FEQUosRUFBaUJ6RixFQUFHekIsT0FDYixDQUFDLEVBQWEsR0FDekIsS0FBSyxFQUtELE9BSkF1SCxFQUFPOUYsRUFBR3pCLE9BQ1ZwRixFQUFLOEssR0FBSzlLLEVBQUs4SyxHQUFHbkcsTUFBSyxXQUNuQjNFLEVBQUs0VyxtQkFBbUJqSyxNQUVyQixDQUFDLEVBQWEsR0FDekIsS0FBSyxFQVdELE9BUkEzTSxFQUFLNkssa0JBTUR5QixHQUNBdE0sRUFBSzhXLG1CQUFtQnhLLEdBQ3JCLENBQUMsYUFJekJWLE1BQU0zTCxLQUFLeUssU0FFbEJpTSxFQUFhelYsVUFBVTRWLG1CQUFxQixTQUFVNUosR0FFbEQsSUFEQSxJQUFJbEcsRUFBUS9HLEtBQUsrSyxPQUNSN0QsRUFBSyxFQUFHZ0csRUFBV0QsRUFBUS9GLEVBQUtnRyxFQUFTbEgsT0FBUWtCLElBQU0sQ0FDNUQsSUFBSWtGLEVBQVFjLEVBQVNoRyxHQUVqQnpGLE9BQVMsRUFDYixPQUFRMkssRUFBTTNLLFFBQ1YsS0FBS3NGLEVBQU0rUCxtQkFDUHJWLEVBQVMsT0FDVCxNQUNKLEtBQUtzRixFQUFNZ1Esb0JBQ1B0VixFQUFTLFFBQ1QsTUFDSixLQUFLc0YsRUFBTWlRLG1CQUNQdlYsRUFBUyxPQUNULE1BQ0osS0FBS3NGLEVBQU1rUSxtQkFDUHhWLEVBQVMsT0FDVCxNQUNKLEtBQUtzRixFQUFNbVEsZ0JBQ1B6VixFQUFTLE9BQ1QsTUFDSixLQUFLc0YsRUFBTW9RLGdCQUNQMVYsRUFBUyxPQUNULE1BQ0osS0FBS3NGLEVBQU1xUSxnQkFDUDNWLEVBQVMsT0FDVCxNQUNKLFFBQ0ksTUFBTSxJQUFJTyxhQUFhLDRCQUE2QixpQkFHNUQsSUFBSW9SLEVBQWFoSCxFQUFNckQsTUFDbkJzSyxFQUFjakgsRUFBTXBELE9BRXBCTyxFQUFlNkosRUFDZjNKLEVBQWdCNEosRUFDcEIsR0FBSWpILEVBQU1pTCxvQkFBb0IsR0FBSSxDQUM5QixJQUFJQyxFQUFNbEwsRUFBTWlMLG9CQUNaQyxFQUFJLEdBQUtBLEVBQUksR0FDYi9OLEtBQWtCNkosRUFBYWtFLEVBQUksR0FBS0EsRUFBSSxJQUU1QzdOLEtBQW1CNEosRUFBY2lFLEVBQUksR0FBS0EsRUFBSSxJQVFsRCxJQUxKLElBQUk3VyxFQUFzRCxLQUEzQixXQUFkMkwsRUFBTUksTUFBc0JKLEVBQU1HLEtBRS9DdUIsT0FBTSxFQUVGQyxFQUFLLEVBQ0E3SyxFQUFJLEVBQUdBLEVBQUlrSixFQUFNekwsS0FBS3FGLE9BQVE5QyxJQUVuQyxJQURBLElBQUlxVSxFQUFLbkwsRUFBTXpMLEtBQUt1QyxHQUNYc1UsRUFBSSxFQUFHQSxFQUFJRCxFQUFHdlIsT0FBUXdSLElBQzNCekosR0FBTXdKLEVBQUdDLEdBQUd4UixPQUVwQjhILEVBQU0sSUFBSWpOLFdBQVdrTixHQUNyQkEsRUFBSyxFQUNMLElBQVM3SyxFQUFJLEVBQUdBLEVBQUlrSixFQUFNekwsS0FBS3FGLE9BQVE5QyxJQUVuQyxJQURJcVUsRUFBS25MLEVBQU16TCxLQUFLdUMsR0FDWHNVLEVBQUksRUFBR0EsRUFBSUQsRUFBR3ZSLE9BQVF3UixJQUFLLENBQ2hDLElBQUl4SixFQUFPdUosRUFBR0MsR0FDZDFKLEVBQUl6TSxJQUFJMk0sRUFBTUQsR0FDZEEsR0FBTUMsRUFBS2hJLE9BSXZCeVIsUUFBUUMsSUFBSSxxQkFBc0I1SixHQUNsQyxJQUFJbk4sRUFBTyxJQUFJK1EsRUFBZ0JPLFdBQVduRSxFQUFLLENBQzNDck0sT0FBUUEsRUFDUjJSLFdBQVlBLEVBQ1pDLFlBQWFBLEVBQ2I5SixhQUFjQSxFQUNkRSxjQUFlQSxFQUNmaEosVUFBV0EsSUFFZlQsS0FBS3VLLFFBQVE1SixLQUdyQitWLEVBQWF6VixVQUFVZ04sTUFBUSxXQUMzQixJQUFJbE8sRUFBT0MsS0FDUGlILEVBQU1qSCxLQUFLNkssR0FBR25HLE1BQUssV0FDbkIsT0FBTzhSLEVBQWV4VyxVQUFNLE9BQVEsR0FBUSxXQUN4QyxJQUFJK0csRUFBT21GLEVBQUdDLEVBQUtDLEVBQU9DLEVBQWdCNkIsRUFDMUMsT0FBT3VJLEVBQWlCelcsTUFBTSxTQUFVNEcsR0FDcEMsT0FBUUEsRUFBRzFCLE9BQ1AsS0FBSyxFQUNELElBQUtuRixFQUFLdUgsR0FDTixNQUFPLENBQUMsR0FDWlAsRUFBUWhILEVBQUtnTCxPQUNibUIsRUFBSW5NLEVBQUt1SCxHQUNUNkUsRUFBTXBNLEVBQUtrTCxLQUNYbUIsRUFBUXJNLEVBQUttTCxPQUNibUIsRUFBaUIsS0FDakJ6RixFQUFHMUIsTUFBUSxFQUNmLEtBQUssRUFFRCxPQURBMEIsRUFBR3hCLEtBQUthLEtBQUssQ0FBQyxFQUFHLEVBQUcsQ0FBRSxJQUNmLENBQUMsRUFBYWMsRUFBTWdHLGdCQUFnQmIsRUFBR0MsRUFBS0MsRUFBTyxJQUFJLElBQ2xFLEtBQUssRUFFRCxPQURBQyxFQUFpQnpGLEVBQUd6QixPQUNiLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBS0QsT0FKQStJLEVBQU90SCxFQUFHekIsT0FDVnBGLEVBQUs4SyxHQUFLOUssRUFBSzhLLEdBQUduRyxNQUFLLFdBQ25CM0UsRUFBSzRXLG1CQUFtQnpJLE1BRXJCLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBR0QsT0FGSTdCLEdBQ0F0TSxFQUFLOFcsbUJBQW1CeEssR0FDckIsQ0FBQyxhQU01QixPQURBck0sS0FBSzZLLEdBQUs1RCxFQUNIQSxHQUVYeVAsRUFBYXpWLFVBQVVrTixNQUFRLFdBQzNCbk8sS0FBSzRXLG1CQUFtQixJQUFJNVUsYUFBYSxRQUFTLGdCQUV0RDBVLEVBQWF6VixVQUFVb0MsTUFBUSxXQUMzQnJELEtBQUsyVyxtQkFBbUIsSUFBSTNVLGFBQWEsUUFBUyxnQkFFdEQwVSxFQUFhdEksa0JBQW9CLFNBQVV0RyxHQUN2QyxPQUFPME8sRUFBZXhXLFVBQU0sT0FBUSxHQUFRLFdBQ3hDLElBQUlxTyxFQUFLL0MsRUFBV3ZFLEVBQU9ILEVBQUlzRixFQUFHQyxFQUFLQyxFQUN2QyxPQUFPcUssRUFBaUJ6VyxNQUFNLFNBQVVtSCxHQUNwQyxPQUFRQSxFQUFHakMsT0FDUCxLQUFLLEVBR0QsT0FGQW1KLEVBQU0zSyxFQUFVeUMsUUFBUTJCLEVBQU9ULE9BQy9CaUUsR0FBWSxFQUNQK0MsRUFDRSxDQUFDLEVBQWEzSyxFQUFVNEMsT0FEZCxDQUFDLEVBQWEsR0FFbkMsS0FBSyxFQUNEUyxFQUFRSSxFQUFHaEMsT0FDWGdDLEVBQUdqQyxNQUFRLEVBQ2YsS0FBSyxFQUVELE9BREFpQyxFQUFHL0IsS0FBS2EsS0FBSyxDQUFDLEVBQUcsRUFBRyxDQUFFLElBQ2YsQ0FBQyxFQUFhYyxFQUFNeUUsZ0JBQWdCNkMsRUFBSWhILFFBQ25ELEtBQUssRUFFRCxPQURBVCxFQUFLTyxFQUFHaEMsT0FBUStHLEVBQUl0RixFQUFHLEdBQUl1RixFQUFNdkYsRUFBRyxHQUFJd0YsRUFBUXhGLEVBQUcsR0FDNUMsQ0FBQyxFQUFhRyxFQUFNNkUsZ0JBQWdCTSxFQUFHQyxFQUFLQyxJQUN2RCxLQUFLLEVBR0QsT0FGQWpGLEVBQUdoQyxPQUNIbUcsR0FBWSxFQUNMLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBRUQsT0FET25FLEVBQUdoQyxPQUNILENBQUMsRUFBYSxHQUN6QixLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWF6QixFQUFVMkMsS0FBS1UsSUFDNUMsS0FBSyxFQUNESSxFQUFHaEMsT0FDSGdDLEVBQUdqQyxNQUFRLEVBQ2YsS0FBSyxFQUFHLE1BQU8sQ0FBQyxFQUFjLENBQ3RCb0csVUFBV0EsRUFDWHhELE9BQVFnQyxFQUFTQyxZQUFZakMsRUFBUSxDQUFDLFFBQVMsYUFBYywwQkFNOUU0TyxFQTdVc0IsR0ErVWpDSCxFQUFrQkcsYUFBZUEsRUFFakMsSUFBSWlCLEVBQW9CLEdBb0JwQkMsRUFBa0I1WCxNQUFRQSxLQUFLMkQsV0FBYyxTQUFVQyxFQUFTQyxFQUFZQyxFQUFHQyxHQUUvRSxPQUFPLElBQUtELElBQU1BLEVBQUlFLFdBQVUsU0FBVUMsRUFBU0MsR0FDL0MsU0FBU0MsRUFBVTlELEdBQVMsSUFBTStELEVBQUtMLEVBQVVNLEtBQUtoRSxJQUFXLE1BQU9pRSxHQUFLSixFQUFPSSxJQUNwRixTQUFTQyxFQUFTbEUsR0FBUyxJQUFNK0QsRUFBS0wsRUFBaUIsTUFBRTFELElBQVcsTUFBT2lFLEdBQUtKLEVBQU9JLElBQ3ZGLFNBQVNGLEVBQUtJLEdBSmxCLElBQWVuRSxFQUlhbUUsRUFBT0MsS0FBT1IsRUFBUU8sRUFBT25FLFFBSjFDQSxFQUl5RG1FLEVBQU9uRSxNQUpoREEsYUFBaUJ5RCxFQUFJekQsRUFBUSxJQUFJeUQsR0FBRSxTQUFVRyxHQUFXQSxFQUFRNUQsT0FJVHFFLEtBQUtQLEVBQVdJLEdBQ2xHSCxHQUFNTCxFQUFZQSxFQUFVWSxNQUFNZixFQUFTQyxHQUFjLEtBQUtRLFlBR2xFd1QsRUFBb0I3WCxNQUFRQSxLQUFLNEUsYUFBZ0IsU0FBVWhCLEVBQVNpQixHQUNwRSxJQUFzR3JGLEVBQUdzRixFQUFHQyxFQUFHQyxFQUEzR0MsRUFBSSxDQUFFQyxNQUFPLEVBQUdDLEtBQU0sV0FBYSxHQUFXLEVBQVBKLEVBQUUsR0FBUSxNQUFNQSxFQUFFLEdBQUksT0FBT0EsRUFBRSxJQUFPSyxLQUFNLEdBQUlDLElBQUssSUFDaEcsT0FBT0wsRUFBSSxDQUFFWCxLQUFNaUIsRUFBSyxHQUFJQyxNQUFTRCxFQUFLLEdBQUlFLE9BQVVGLEVBQUssSUFBd0IsbUJBQVhHLFNBQTBCVCxFQUFFUyxPQUFPQyxVQUFZLFdBQWEsT0FBTzFGLE9BQVVnRixFQUN2SixTQUFTTSxFQUFLSyxHQUFLLE9BQU8sU0FBVUMsR0FBSyxPQUN6QyxTQUFjQyxHQUNWLEdBQUlyRyxFQUFHLE1BQU0sSUFBSWlFLFVBQVUsbUNBQzNCLEtBQU91QixJQUFNQSxFQUFJLEVBQUdhLEVBQUcsS0FBT1osRUFBSSxJQUFLQSxHQUFHLElBQ3RDLEdBQUl6RixFQUFJLEVBQUdzRixJQUFNQyxFQUFZLEVBQVJjLEVBQUcsR0FBU2YsRUFBVSxPQUFJZSxFQUFHLEdBQUtmLEVBQVMsU0FBT0MsRUFBSUQsRUFBVSxTQUFNQyxFQUFFZSxLQUFLaEIsR0FBSSxHQUFLQSxFQUFFVCxTQUFXVSxFQUFJQSxFQUFFZSxLQUFLaEIsRUFBR2UsRUFBRyxLQUFLcEIsS0FBTSxPQUFPTSxFQUUzSixPQURJRCxFQUFJLEVBQUdDLElBQUdjLEVBQUssQ0FBUyxFQUFSQSxFQUFHLEdBQVFkLEVBQUUxRSxRQUN6QndGLEVBQUcsSUFDUCxLQUFLLEVBQUcsS0FBSyxFQUFHZCxFQUFJYyxFQUFJLE1BQ3hCLEtBQUssRUFBYyxPQUFYWixFQUFFQyxRQUFnQixDQUFFN0UsTUFBT3dGLEVBQUcsR0FBSXBCLE1BQU0sR0FDaEQsS0FBSyxFQUFHUSxFQUFFQyxRQUFTSixFQUFJZSxFQUFHLEdBQUlBLEVBQUssQ0FBQyxHQUFJLFNBQ3hDLEtBQUssRUFBR0EsRUFBS1osRUFBRUksSUFBSVUsTUFBT2QsRUFBRUcsS0FBS1csTUFBTyxTQUN4QyxRQUNJLEtBQU1oQixFQUFJRSxFQUFFRyxNQUFNTCxFQUFJQSxFQUFFaUIsT0FBUyxHQUFLakIsRUFBRUEsRUFBRWlCLE9BQVMsS0FBa0IsSUFBVkgsRUFBRyxJQUFzQixJQUFWQSxFQUFHLElBQVcsQ0FBRVosRUFBSSxFQUFHLFNBQ2pHLEdBQWMsSUFBVlksRUFBRyxNQUFjZCxHQUFNYyxFQUFHLEdBQUtkLEVBQUUsSUFBTWMsRUFBRyxHQUFLZCxFQUFFLElBQU0sQ0FBRUUsRUFBRUMsTUFBUVcsRUFBRyxHQUFJLE1BQzlFLEdBQWMsSUFBVkEsRUFBRyxJQUFZWixFQUFFQyxNQUFRSCxFQUFFLEdBQUksQ0FBRUUsRUFBRUMsTUFBUUgsRUFBRSxHQUFJQSxFQUFJYyxFQUFJLE1BQzdELEdBQUlkLEdBQUtFLEVBQUVDLE1BQVFILEVBQUUsR0FBSSxDQUFFRSxFQUFFQyxNQUFRSCxFQUFFLEdBQUlFLEVBQUVJLElBQUlZLEtBQUtKLEdBQUssTUFDdkRkLEVBQUUsSUFBSUUsRUFBRUksSUFBSVUsTUFDaEJkLEVBQUVHLEtBQUtXLE1BQU8sU0FFdEJGLEVBQUtoQixFQUFLaUIsS0FBS2xDLEVBQVNxQixHQUMxQixNQUFPWCxHQUFLdUIsRUFBSyxDQUFDLEVBQUd2QixHQUFJUSxFQUFJLEVBQUssUUFBVXRGLEVBQUl1RixFQUFJLEVBQ3RELEdBQVksRUFBUmMsRUFBRyxHQUFRLE1BQU1BLEVBQUcsR0FBSSxNQUFPLENBQUV4RixNQUFPd0YsRUFBRyxHQUFLQSxFQUFHLFFBQUssRUFBUXBCLE1BQU0sR0FyQjlCTCxDQUFLLENBQUN1QixFQUFHQyxPQXdCN0R6RixPQUFPQyxlQUFldVgsRUFBbUIsYUFBYyxDQUFFdFgsT0FBTyxJQUNoRXNYLEVBQWtCRyxrQkFBZSxFQUtqQyxJQUFJQSxFQUE4QixXQUM5QixTQUFTQSxFQUFhdlgsR0FDbEJQLEtBQUt1SyxRQUFVaEssRUFBS2lLLE9BQ3BCeEssS0FBS3lLLE9BQVNsSyxFQUFLbUssTUFDbkIxSyxLQUFLMkssTUFBUSxlQUNiM0ssS0FBSzBPLGdCQUFrQixFQUN2QjFPLEtBQUs2SyxHQUFLN0csUUFBUThHLElBQUksSUFDdEI5SyxLQUFLK0ssT0FBUyxLQUNkL0ssS0FBS2dMLE9BQVNoTCxLQUFLc0gsR0FBS3RILEtBQUtrTCxPQUFTbEwsS0FBS2lMLEtBQU8sRUF1ZHRELE9BcmRBNk0sRUFBYTdXLFVBQVVrSyxVQUFZLFNBQVVyRCxHQUN6QyxJQUFJc0QsRUFBUXBMLEtBQ1JELEVBQU9DLEtBSVgsR0FBbUIsV0FBZkEsS0FBSzJLLE1BQ0wsTUFBTSxJQUFJM0ksYUFBYSxvQkFBcUIscUJBRTVDaEMsS0FBSytLLFNBQ0wvSyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUFjLE9BQU8wRyxFQUFNQyxZQUV0RHJMLEtBQUsySyxNQUFRLGFBRWIzSyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUNuQixPQUFPa1QsRUFBZTVYLFVBQU0sT0FBUSxHQUFRLFdBQ3hDLElBQUlzTCxFQUFXdkUsRUFBT0gsRUFBSW1DLEVBQU9DLEVBQVFNLEVBQVFFLEVBQzdDckMsRUFDSixPQUFPMFEsRUFBaUI3WCxNQUFNLFNBQVV1TCxHQUNwQyxPQUFRQSxFQUFHckcsT0FDUCxLQUFLLEVBRUQsT0FEQW9HLEVBQVk1SCxFQUFVd0MsUUFBUTRCLEVBQU9ULE1BQU9TLEtBRTVDbEIsRUFBSzdHLEVBQ0UsQ0FBQyxFQUFhMkQsRUFBVTRDLFFBRlIsQ0FBQyxFQUFhLEdBR3pDLEtBQUssRUFPRCxPQU5BUyxFQUFRSCxFQUFHbUUsT0FBU1EsRUFBR3BHLE9BQ3ZCcEYsRUFBS2dZLFVBQVksQ0FDYjdJLGNBQWUsQ0FDWDdILE1BQU9pRSxFQUFVakUsUUFHbEIsQ0FBQyxFQUFhTixFQUFNcUksZ0JBQWdCOUQsRUFBVWpFLE1BQU9pRSxJQUNoRSxLQUFLLEVBS0QsT0FIQW5FLEVBQUtvRSxFQUFHcEcsT0FBUXBGLEVBQUtpTCxPQUFTN0QsRUFBRyxHQUFJcEgsRUFBS3VILEdBQUtILEVBQUcsR0FBSXBILEVBQUttTCxPQUFTL0QsRUFBRyxHQUFJcEgsRUFBS2tMLEtBQU85RCxFQUFHLEdBQzFGcEgsRUFBS2lZLGVBQWdCLEVBQ3JCalksRUFBS2tZLFdBQWEsS0FDWCxDQUFDLEVBQWFsUixFQUFNMEUsMkJBQTJCMUwsRUFBS3VILEdBQUksRUFBRyxNQUN0RSxLQUFLLEVBcUJELE9BcEJBaUUsRUFBR3BHLE9BQ0g0RCxFQUFRakIsRUFBT2lCLE1BQ2ZDLEVBQVNsQixFQUFPa0IsT0FDaEJqSixFQUFLbVksS0FBTyxFQUNablksRUFBS29ZLFVBQVksRUFDakJwWSxFQUFLcVksUUFBVSxDQUNYclAsTUFBT0EsRUFDUEMsT0FBUUEsRUFDUnZILE9BQVE2SixFQUFVckQsSUFBSVUsU0FFMUJXLEVBQVN4QixFQUFPeUIsY0FBZ0JSLEVBQ2hDUyxFQUFVMUIsRUFBTzJCLGVBQWlCVCxFQUM5Qk0sSUFBV1AsR0FBU1MsSUFBWVIsR0FDaENoSixLQUFLMlQsa0JBQW1CLEVBQ3hCM1QsS0FBSzRULFNBQVd0SyxFQUFTTixFQUN6QmhKLEtBQUs2VCxTQUFXckssRUFBVVQsR0FHMUIvSSxLQUFLMlQsa0JBQW1CLEVBRXJCLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBQ0Q1VCxFQUFLc1ksbUJBQW1CLElBQUlyVyxhQUFhLG9CQUFxQixzQkFDOUR1SixFQUFHckcsTUFBUSxFQUNmLEtBQUssRUFBRyxNQUFPLENBQUMsYUFJN0J5RyxNQUFNM0wsS0FBS3lLLFNBR2xCcU4sRUFBYTdXLFVBQVVvSyxNQUFRLFdBQzNCLE9BQU91TSxFQUFlNVgsVUFBTSxPQUFRLEdBQVEsV0FDeEMsT0FBTzZYLEVBQWlCN1gsTUFBTSxTQUFVNEcsR0FDcEMsT0FBUUEsRUFBRzFCLE9BQ1AsS0FBSyxFQUNELE9BQUtsRixLQUFLa1ksS0FDSCxDQUFDLEVBQWFsWSxLQUFLK0ssT0FBT3VOLGlCQUFpQnRZLEtBQUttWSxZQURoQyxDQUFDLEVBQWEsR0FFekMsS0FBSyxFQUVELE9BREF2UixFQUFHekIsT0FDSSxDQUFDLEVBQWFuRixLQUFLK0ssT0FBT3dOLGdCQUFnQnZZLEtBQUtrWSxPQUMxRCxLQUFLLEVBQ0R0UixFQUFHekIsT0FDSG5GLEtBQUtrWSxLQUFPbFksS0FBS21ZLFVBQVksRUFDN0JuWSxLQUFLd1ksT0FBU3hZLEtBQUtvWSxRQUFVLEtBQzdCeFIsRUFBRzFCLE1BQVEsRUFDZixLQUFLLEVBQ0QsT0FBS2xGLEtBQUtzSCxHQUNILENBQUMsRUFBYXRILEtBQUsrSyxPQUFPeUUsZ0JBQWdCeFAsS0FBS3NILEdBQUl0SCxLQUFLa0wsT0FBUWxMLEtBQUtpTCxPQUR2RCxDQUFDLEVBQWEsR0FFdkMsS0FBSyxFQUNEckUsRUFBR3pCLE9BQ0huRixLQUFLZ0wsT0FBU2hMLEtBQUtzSCxHQUFLdEgsS0FBS2tMLE9BQVNsTCxLQUFLaUwsS0FBTyxFQUNsRHJFLEVBQUcxQixNQUFRLEVBQ2YsS0FBSyxFQUtELE9BSklsRixLQUFLK0ssU0FDTHJILEVBQVUyQyxLQUFLckcsS0FBSytLLFFBQ3BCL0ssS0FBSytLLE9BQVMsTUFFWCxDQUFDLFdBSzVCK00sRUFBYTdXLFVBQVVvWCxtQkFBcUIsU0FBVXhNLEdBQ2xELElBQUlULEVBQVFwTCxLQUVaQSxLQUFLeVksbUJBQW1CNU0sR0FFeEI3TCxLQUFLMkssTUFBUSxTQUdiM0ssS0FBSzZLLEdBQUs3SyxLQUFLNkssR0FBR25HLE1BQUssV0FBYyxPQUFPMEcsRUFBTUMsV0FJM0IsZUFBbkJRLEVBQVVFLE9BQ1YvTCxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUFjMEcsRUFBTVgsT0FBT29CLFFBRTFEaU0sRUFBYTdXLFVBQVV3WCxtQkFBcUIsU0FBVTVNLEdBQ2xELElBQUlULEVBQVFwTCxLQUVaLEdBQW1CLFdBQWZBLEtBQUsySyxNQUNMLE1BQU0sSUFBSTNJLGFBQWEsaUJBQWtCLHFCQUU3Q2hDLEtBQUsySyxNQUFRLGVBRWIzSyxLQUFLNkssR0FBSzdLLEtBQUs2SyxHQUFHbkcsTUFBSyxXQUFjLE9BQU8wRyxFQUFNQyxZQUV0RHlNLEVBQWE3VyxVQUFVeU8sT0FBUyxTQUFVdEQsRUFBT3JLLFFBQzdCLElBQVpBLElBQXNCQSxFQUFVLElBQ3BDLElBQUloQyxFQUFPQyxLQUdYLEdBQThCLE9BQTFCb00sRUFBTWxMLGdCQUNOLE1BQU0sSUFBSXVDLFVBQVUsWUFFeEIsR0FBbUIsZUFBZnpELEtBQUsySyxNQUNMLE1BQU0sSUFBSTNJLGFBQWEsZUFBZ0IscUJBRzNDLElBQUkwVyxFQUFhdE0sRUFBTWhKLFFBRXZCcEQsS0FBSzBPLGtCQUVMMU8sS0FBSzZLLEdBQUs3SyxLQUFLNkssR0FBR25HLE1BQUssV0FDbkIsT0FBT2tULEVBQWU1WCxVQUFNLE9BQVEsR0FBUSxXQUN4QyxJQUFJK0csRUFBT21GLEVBQUdDLEVBQUt5RCxFQUFVK0ksRUFBUTlJLEVBQWdCcE8sRUFBUW1YLEVBQU9DLEVBQVEvSyxFQUFLZ0wsRUFBUUMsRUFBR0MsRUFBT0MsRUFBSUMsRUFBTUMsRUFBTUMsRUFBR0MsRUFBR3ZVLEVBQUd3SCxFQUFTQyxFQUFLQyxFQUFPOE0sRUFBU0MsRUFBS0MsRUFBT0MsRUFBVTdTLEVBQUlPLEVBQUl1UyxFQUFRQyxFQUFRQyxFQUFNck8sRUFBSXNPLEVBQUluTixFQUN0TixPQUFPbUwsRUFBaUI3WCxNQUFNLFNBQVU4WixHQUNwQyxPQUFRQSxFQUFHNVUsT0FDUCxLQUFLLEVBQ0Q2QixFQUFRaEgsRUFBS2dMLE9BQ2JtQixFQUFJbk0sRUFBS3VILEdBQ1Q2RSxFQUFNcE0sRUFBS2tMLEtBQ1gyRSxFQUFXN1AsRUFBS21MLE9BQ2hCeU4sRUFBUzVZLEVBQUtxWSxRQUNkdkksRUFBaUIsS0FDakJpSyxFQUFHNVUsTUFBUSxFQUNmLEtBQUssRUFHRCxPQUZBNFUsRUFBRzFVLEtBQUthLEtBQUssQ0FBQyxFQUFHLEdBQUksQ0FBRSxLQUN2QnhFLE9BQVMsRUFDRGlYLEVBQVdqWCxRQUNmLElBQUssT0FDREEsRUFBU3NGLEVBQU0rUCxtQkFDZixNQUNKLElBQUssUUFDRHJWLEVBQVNzRixFQUFNZ1Esb0JBQ2YsTUFDSixJQUFLLE9BQ0R0VixFQUFTc0YsRUFBTWlRLG1CQUNmLE1BQ0osSUFBSyxPQUNEdlYsRUFBU3NGLEVBQU1rUSxtQkFDZixNQUNKLElBQUssT0FDRHhWLEVBQVNzRixFQUFNbVEsZ0JBQ2YsTUFDSixJQUFLLE9BQ0wsSUFBSyxPQUNEelYsRUFBU3NGLEVBQU1vUSxnQkFDZixNQUNKLElBQUssT0FDTCxJQUFLLE9BQ0QxVixFQUFTc0YsRUFBTXFRLGdCQUNmLE1BQ0osUUFDSSxNQUFNLElBQUkzVCxVQUFVLDRCQU01QixJQUpBbVYsRUFBUUYsRUFBV3hYLGdCQUNuQjJYLEVBQVMsRUFDVC9LLEVBQU0sR0FDTmdMLEVBQVNwSCxFQUFnQk0sVUFBVTBHLEVBQVdqWCxRQUN6Q3NYLEVBQUksRUFBR0EsRUFBSUQsRUFBUUMsSUFRcEIsSUFQQUMsRUFBUSxHQUNSbEwsRUFBSTdILEtBQUsrUyxHQUNUQyxFQUFLdkgsRUFBZ0JLLFlBQVkyRyxFQUFXalgsT0FBUXNYLEdBQ3BERyxFQUFPeEgsRUFBZ0JJLDRCQUE0QjRHLEVBQVdqWCxPQUFRc1gsR0FDdEVJLEVBQU96SCxFQUFnQkcsMEJBQTBCNkcsRUFBV2pYLE9BQVFzWCxHQUNwRUssS0FBT1YsRUFBV3RGLFdBQWE2RixFQUFLQyxHQUNwQ0csS0FBT1gsRUFBV3JGLFlBQWM4RixHQUMzQnJVLEVBQUksRUFBR0EsRUFBSXVVLEVBQUd2VSxJQUNma1UsRUFBTS9TLEtBQUsyUyxFQUFNL1YsU0FBU2dXLEVBQVFBLEVBQVNPLElBQzNDUCxHQUFVTyxFQWdCbEIsT0FiQTlNLEVBQVVuRCxLQUFLd0QsTUFBTStMLEVBQVdqWSxVQUFZLE1BRzVDNlksRUFBVSxDQUNOM1ksS0FBTW1OLEVBQ05yTSxPQUFRQSxFQUNSOEssSUFMSkEsRUFBTUQsRUFBVSxXQU1aRSxNQUxKQSxLQUFXRixFQUFVLFlBTWpCdkQsTUFBTzJQLEVBQVd0RixXQUNsQnBLLE9BQVEwUCxFQUFXckYsWUFDbkIwRyxVQUFXaFksRUFBUWlZLFNBQVcsRUFBSSxFQUNsQ0MsVUFBV2xZLEVBQVFpWSxTQUFXLEVBQUksSUFFeEJqUixRQUFVNFAsRUFBTzVQLE9BQzNCdVEsRUFBUXRRLFNBQVcyUCxFQUFPM1AsUUFDMUJzUSxFQUFRN1gsU0FBV2tYLEVBQU9sWCxPQUFnQixDQUFDLEVBQWEsS0FDeERpWCxFQUFXL0UsbUJBQ1gyRixFQUFRakMsb0JBQXNCLENBQzFCcUIsRUFBVzlFLFNBQ1g4RSxFQUFXN0UsV0FHbkIwRixFQUFNeFosRUFBS21ZLEtBQU1zQixFQUFRelosRUFBS3lZLE9BQVFpQixFQUFXMVosRUFBS29ZLFVBQy9Db0IsR0FDSEQsRUFBUXZRLFFBQVV5USxFQUFNelEsT0FDeEJ1USxFQUFRdFEsU0FBV3dRLEVBQU14USxRQUN6QnNRLEVBQVE3WCxTQUFXK1gsRUFBTS9YLE9BQWdCLENBQUMsRUFBYSxHQUN0RDhYLEVBQ0UsQ0FBQyxFQUFheFMsRUFBTXdSLGdCQUFnQmdCLElBRDFCLENBQUMsRUFBYSxJQUVuQyxLQUFLLEVBQ0RPLEVBQUczVSxPQUNIMlUsRUFBRzVVLE1BQVEsRUFDZixLQUFLLEVBTUQsT0FMQXNVLEVBQVEsQ0FDSnpRLE1BQU91USxFQUFRdlEsTUFDZkMsT0FBUXNRLEVBQVF0USxPQUNoQnZILE9BQVE2WCxFQUFRN1gsUUFFYixDQUFDLEVBQWFzRixFQUFNbVQsZUFBZVYsRUFBTXpRLE1BQU95USxFQUFNeFEsT0FBUXdRLEVBQU0vWCxPQUFRa1gsRUFBTzVQLE1BQU80UCxFQUFPM1AsT0FBUTJQLEVBQU9sWCxPQUFRLEVBQUcsRUFBRyxFQUFHLElBQzVJLEtBQUssRUFJRCxPQUhBOFgsRUFBTU8sRUFBRzNVLE9BQ1RwRixFQUFLbVksS0FBT3FCLEVBQ1p4WixFQUFLeVksT0FBU2dCLEVBQ1JDLEVBQWlCLENBQUMsRUFBYSxJQUNyQzdTLEVBQUs3RyxFQUNFLENBQUMsRUFBYWdILEVBQU1vVCxtQkFDL0IsS0FBSyxFQUNEdlQsRUFBR3VSLFVBQVlzQixFQUFXSyxFQUFHM1UsT0FDN0IyVSxFQUFHNVUsTUFBUSxFQUNmLEtBQUssRUFBRyxNQUFPLENBQUMsRUFBYWxCLFFBQVE4RyxJQUFJLENBQ2pDL0QsRUFBTXFULGdCQUFnQnhLLEVBQVUwSixHQUNoQ3ZTLEVBQU1zVCxnQkFBZ0JkLEVBQUtFLEVBQVU3SixHQUNyQzVQLEtBQUsyVCxpQkFDRDVNLEVBQU11VCw4QkFBOEJiLEVBQVV6WixLQUFLNFQsU0FBVTVULEtBQUs2VCxVQUNsRSxLQUNKOU0sRUFBTXdULGNBQWNkLEVBQVVsTixHQUM5QnhGLEVBQU15VCxnQkFBZ0JmLEVBQVVqTixHQUNoQ3pGLEVBQU0wVCxvQkFBb0JoQixFQUFVMVgsRUFBUWlZLFNBQVcsRUFBSSxHQUMzRGpULEVBQU0yVCxvQkFBb0JqQixFQUFVMVgsRUFBUWlZLFNBQVcsRUFBSSxHQUMzRGpULEVBQU00VCxtQkFBbUJ6TyxFQUFHdU4sTUFFcEMsS0FBSyxFQUVELEdBREF0UyxFQUFLMlMsRUFBRzNVLE9BQVF1VSxFQUFTdlMsRUFBRyxHQUFJd1MsRUFBU3hTLEVBQUcsR0FDeEN1UyxFQUFTLEdBQUtDLEVBQVMsRUFDdkIsTUFBTSxJQUFJaUIsTUFBTSxvQkFDcEIvSyxFQUFpQixHQUNqQmlLLEVBQUc1VSxNQUFRLEVBQ2YsS0FBSyxFQUVELE1BQU8sQ0FBQyxFQUFhNkIsRUFBTThULHVCQUF1QjNPLEVBQUdDLElBQ3pELEtBQUssRUFFRCxJQURBeU4sRUFBT0UsRUFBRzNVLFdBQ0k0QixFQUFNK1QsT0FDaEIsTUFBTyxDQUFDLEVBQWEsSUFDcEIsR0FBSWxCLEVBQU8sRUFDWixNQUFNLElBQUlnQixNQUFNLG9CQUVwQixPQURBZixHQUFNdE8sRUFBS3NFLEdBQWdCNUosS0FDcEIsQ0FBQyxFQUFhYyxFQUFNZ1Usa0JBQWtCNU8sSUFDakQsS0FBSyxHQUVELE9BREEwTixFQUFHbFYsTUFBTTRHLEVBQUksQ0FBQ3VPLEVBQUczVSxTQUNWLENBQUMsRUFBYSxHQUN6QixLQUFLLEdBQUksTUFBTyxDQUFDLEVBQWEsSUFDOUIsS0FBSyxHQU9ELE9BTkluRixLQUFLMlQsbUJBQ0wyRixFQUFRakMsb0JBQXNCLENBQzFCclgsS0FBSzRULFNBQ0w1VCxLQUFLNlQsV0FHTixDQUFDLEVBQWE5TSxFQUFNcUosZ0JBQWdCbEUsRUFBRzBELEVBQVV6RCxFQUFLLENBQUNtTixLQUNsRSxLQUFLLEdBRUR6SixFQUNJaUssRUFBRzNVLE9BQ1AyVSxFQUFHNVUsTUFBUSxHQUNmLEtBQUssR0FDRCxPQUFNMkssRUFBZTdKLFFBQVdqRyxFQUFLaVksY0FBdUIsQ0FBQyxFQUFhLElBQ25FLENBQUMsRUFBYWpZLEVBQUtpYixpQkFDOUIsS0FBSyxHQUNEbEIsRUFBRzNVLE9BQ0gyVSxFQUFHNVUsTUFBUSxHQUNmLEtBQUssR0FBSSxNQUFPLENBQUMsRUFBYSxJQUM5QixLQUFLLEdBS0QsT0FKQXdILEVBQU9vTixFQUFHM1UsT0FDVnBGLEVBQUs4SyxHQUFLOUssRUFBSzhLLEdBQUduRyxNQUFLLFdBQ25CM0UsRUFBS3NZLG1CQUFtQjNMLE1BRXJCLENBQUMsRUFBYSxJQUN6QixLQUFLLEdBV0QsT0FSQTNNLEVBQUsyTyxrQkFNRG1CLEdBQ0E5UCxFQUFLa2IsMEJBQTBCcEwsR0FDNUIsQ0FBQyxhQUl6QmxFLE1BQU0zTCxLQUFLeUssU0FHbEJxTixFQUFhN1csVUFBVStaLGNBQWdCLFdBQ25DLE9BQU9wRCxFQUFlNVgsVUFBTSxPQUFRLEdBQVEsV0FDeEMsSUFBSStHLEVBQU9tRixFQUFHNEUsRUFBV0QsRUFBZ0JqSyxFQUFJTyxFQUM3QyxPQUFPMFEsRUFBaUI3WCxNQUFNLFNBQVV1TCxHQUNwQyxPQUFRQSxFQUFHckcsT0FDUCxLQUFLLEVBR0QsT0FGQTZCLEVBQVEvRyxLQUFLK0ssT0FDYm1CLEVBQUlsTSxLQUFLc0gsR0FDRixDQUFDLEVBQWFQLEVBQU1nSyx5QkFBeUI3RSxJQUN4RCxLQUFLLEVBRUQsT0FEQTRFLEVBQVl2RixFQUFHcEcsT0FDUixDQUFDLEVBQWE0QixFQUFNaUssOEJBQThCOUUsSUFDN0QsS0FBSyxFQUVELE9BREEyRSxFQUFpQnRGLEVBQUdwRyxPQUNkMkwsR0FBYUQsR0FDbkJqSyxFQUFLNUcsS0FBSytYLFVBQVU3SSxjQUNwQi9ILEVBQUtuSCxLQUNFLENBQUMsRUFBYStHLEVBQU1rSyxXQUFXSCxFQUFXRCxLQUhOLENBQUMsRUFBYSxHQUk3RCxLQUFLLEVBQ0RqSyxFQUFHc0ssWUFBYy9KLEVBQUc4USxXQUNoQjFNLEVBQUdwRyxPQUNQb0csRUFBR3JHLE1BQVEsRUFDZixLQUFLLEVBRUQsT0FEQWxGLEtBQUtnWSxlQUFnQixFQUNkLENBQUMsV0FLNUJGLEVBQWE3VyxVQUFVZ2EsMEJBQTRCLFNBQVU5SixHQUM3Q25SLEtBQUsrSyxPQUNqQixJQURBLElBQ1M3RCxFQUFLLEVBQUdrSyxFQUFZRCxFQUFTakssRUFBS2tLLEVBQVVwTCxPQUFRa0IsSUFBTSxDQUMvRCxJQUFJdUYsRUFBUzJFLEVBQVVsSyxHQUVuQjFHLEVBQXVCLEVBQWZpTSxFQUFPNEUsTUFBYSxNQUFRLFFBRXBDNVEsRUFBWTBJLEtBQUt3RCxNQUFrRCxLQUE1QixXQUFmRixFQUFPRCxNQUFzQkMsRUFBT0YsTUFDNUQ5TCxFQUFZLElBQ1pBLEVBQVksR0FDaEIsSUFBSXdMLEVBQVEsSUFBSXVGLEVBQXNCQyxrQkFBa0IsQ0FDcERqUixLQUFNQSxFQUNOQyxVQUFXQSxFQUNYRSxLQUFNOEwsRUFBTzlMLE9BRWJYLEtBQUtnWSxjQUNMaFksS0FBS3VLLFFBQVEwQixFQUFPak0sS0FBSytYLFdBRXpCL1gsS0FBS3VLLFFBQVEwQixLQUd6QjZMLEVBQWE3VyxVQUFVZ04sTUFBUSxXQUMzQixJQUFJbE8sRUFBT0MsS0FDUGlILEVBQU1qSCxLQUFLNkssR0FBR25HLE1BQUssV0FDbkIsT0FBT2tULEVBQWU1WCxVQUFNLE9BQVEsR0FBUSxXQUN4QyxJQUFJK0csRUFBT21GLEVBQUdFLEVBQU9ELEVBQUswRCxFQUFnQjNCLEVBQzFDLE9BQU8ySixFQUFpQjdYLE1BQU0sU0FBVTRHLEdBQ3BDLE9BQVFBLEVBQUcxQixPQUNQLEtBQUssRUFDRCxJQUFLbkYsRUFBS3VILEdBQ04sTUFBTyxDQUFDLEdBQ1pQLEVBQVFoSCxFQUFLZ0wsT0FDYm1CLEVBQUluTSxFQUFLdUgsR0FDVDhFLEVBQVFyTSxFQUFLbUwsT0FDYmlCLEVBQU1wTSxFQUFLa0wsS0FDWDRFLEVBQWlCLEtBQ2pCakosRUFBRzFCLE1BQVEsRUFDZixLQUFLLEVBRUQsT0FEQTBCLEVBQUd4QixLQUFLYSxLQUFLLENBQUMsRUFBRyxFQUFHLENBQUUsSUFDZixDQUFDLEVBQWFjLEVBQU1xSixnQkFBZ0JsRSxFQUFHRSxFQUFPRCxFQUFLLElBQUksSUFDbEUsS0FBSyxFQUdELE9BRkEwRCxFQUNJakosRUFBR3pCLE9BQ0RwRixFQUFLaVksY0FBc0IsQ0FBQyxFQUFhLEdBQ3hDLENBQUMsRUFBYWpZLEVBQUtpYixpQkFDOUIsS0FBSyxFQUNEcFUsRUFBR3pCLE9BQ0h5QixFQUFHMUIsTUFBUSxFQUNmLEtBQUssRUFBRyxNQUFPLENBQUMsRUFBYSxHQUM3QixLQUFLLEVBS0QsT0FKQWdKLEVBQU90SCxFQUFHekIsT0FDVnBGLEVBQUs4SyxHQUFLOUssRUFBSzhLLEdBQUduRyxNQUFLLFdBQ25CM0UsRUFBS3NZLG1CQUFtQm5LLE1BRXJCLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBR0QsT0FGSTJCLEdBQ0E5UCxFQUFLa2IsMEJBQTBCcEwsR0FDNUIsQ0FBQyxhQU01QixPQURBN1AsS0FBSzZLLEdBQUs1RCxFQUNIQSxHQUVYNlEsRUFBYTdXLFVBQVVrTixNQUFRLFdBQzNCbk8sS0FBS3lZLG1CQUFtQixJQUFJelcsYUFBYSxRQUFTLGdCQUV0RDhWLEVBQWE3VyxVQUFVb0MsTUFBUSxXQUMzQnJELEtBQUtxWSxtQkFBbUIsSUFBSXJXLGFBQWEsUUFBUyxnQkFFdEQ4VixFQUFhMUosa0JBQW9CLFNBQVV0RyxHQUN2QyxPQUFPOFAsRUFBZTVYLFVBQU0sT0FBUSxHQUFRLFdBQ3hDLElBQUl1UixFQUFLakcsRUFBV3ZFLEVBQU9ILEVBQUlzRixFQUFHRSxFQUFPRCxFQUN6QyxPQUFPMEwsRUFBaUI3WCxNQUFNLFNBQVVtSCxHQUNwQyxPQUFRQSxFQUFHakMsT0FDUCxLQUFLLEVBR0QsT0FGQXFNLEVBQU03TixFQUFVd0MsUUFBUTRCLEVBQU9ULE1BQU9TLEdBQ3RDd0QsR0FBWSxFQUNQaUcsRUFDRSxDQUFDLEVBQWE3TixFQUFVNEMsT0FEZCxDQUFDLEVBQWEsR0FFbkMsS0FBSyxFQUNEUyxFQUFRSSxFQUFHaEMsT0FDWGdDLEVBQUdqQyxNQUFRLEVBQ2YsS0FBSyxFQUVELE9BREFpQyxFQUFHL0IsS0FBS2EsS0FBSyxDQUFDLEVBQUcsRUFBRyxDQUFFLElBQ2YsQ0FBQyxFQUFhYyxFQUFNcUksZ0JBQWdCbUMsRUFBSWxLLE1BQU9rSyxJQUMxRCxLQUFLLEVBRUQsT0FEQTNLLEVBQUtPLEVBQUdoQyxPQUFRK0csRUFBSXRGLEVBQUcsR0FBSXdGLEVBQVF4RixFQUFHLEdBQUl1RixFQUFNdkYsRUFBRyxHQUM1QyxDQUFDLEVBQWFHLEVBQU15SSxnQkFBZ0J0RCxFQUFHRSxFQUFPRCxJQUN6RCxLQUFLLEVBR0QsT0FGQWhGLEVBQUdoQyxPQUNIbUcsR0FBWSxFQUNMLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBRUQsT0FET25FLEVBQUdoQyxPQUNILENBQUMsRUFBYSxHQUN6QixLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWF6QixFQUFVMkMsS0FBS1UsSUFDNUMsS0FBSyxFQUNESSxFQUFHaEMsT0FDSGdDLEVBQUdqQyxNQUFRLEVBQ2YsS0FBSyxFQUFHLE1BQU8sQ0FBQyxFQUFjLENBQ3RCb0csVUFBV0EsRUFDWHhELE9BQVFnQyxFQUFTQyxZQUFZakMsRUFBUSxDQUFDLFFBQVMsUUFBUyxTQUFVLFVBQVcsWUFBYSwwQkFNM0dnUSxFQS9kc0IsR0FpZWpDSCxFQUFrQkcsYUFBZUEsRUFHakMsSUFBSW9ELEVBQWlCLEdBb0JqQkMsRUFBa0JuYixNQUFRQSxLQUFLMkQsV0FBYyxTQUFVQyxFQUFTQyxFQUFZQyxFQUFHQyxHQUUvRSxPQUFPLElBQUtELElBQU1BLEVBQUlFLFdBQVUsU0FBVUMsRUFBU0MsR0FDL0MsU0FBU0MsRUFBVTlELEdBQVMsSUFBTStELEVBQUtMLEVBQVVNLEtBQUtoRSxJQUFXLE1BQU9pRSxHQUFLSixFQUFPSSxJQUNwRixTQUFTQyxFQUFTbEUsR0FBUyxJQUFNK0QsRUFBS0wsRUFBaUIsTUFBRTFELElBQVcsTUFBT2lFLEdBQUtKLEVBQU9JLElBQ3ZGLFNBQVNGLEVBQUtJLEdBSmxCLElBQWVuRSxFQUlhbUUsRUFBT0MsS0FBT1IsRUFBUU8sRUFBT25FLFFBSjFDQSxFQUl5RG1FLEVBQU9uRSxNQUpoREEsYUFBaUJ5RCxFQUFJekQsRUFBUSxJQUFJeUQsR0FBRSxTQUFVRyxHQUFXQSxFQUFRNUQsT0FJVHFFLEtBQUtQLEVBQVdJLEdBQ2xHSCxHQUFNTCxFQUFZQSxFQUFVWSxNQUFNZixFQUFTQyxHQUFjLEtBQUtRLFlBR2xFK1csRUFBb0JwYixNQUFRQSxLQUFLNEUsYUFBZ0IsU0FBVWhCLEVBQVNpQixHQUNwRSxJQUFzR3JGLEVBQUdzRixFQUFHQyxFQUFHQyxFQUEzR0MsRUFBSSxDQUFFQyxNQUFPLEVBQUdDLEtBQU0sV0FBYSxHQUFXLEVBQVBKLEVBQUUsR0FBUSxNQUFNQSxFQUFFLEdBQUksT0FBT0EsRUFBRSxJQUFPSyxLQUFNLEdBQUlDLElBQUssSUFDaEcsT0FBT0wsRUFBSSxDQUFFWCxLQUFNaUIsRUFBSyxHQUFJQyxNQUFTRCxFQUFLLEdBQUlFLE9BQVVGLEVBQUssSUFBd0IsbUJBQVhHLFNBQTBCVCxFQUFFUyxPQUFPQyxVQUFZLFdBQWEsT0FBTzFGLE9BQVVnRixFQUN2SixTQUFTTSxFQUFLSyxHQUFLLE9BQU8sU0FBVUMsR0FBSyxPQUN6QyxTQUFjQyxHQUNWLEdBQUlyRyxFQUFHLE1BQU0sSUFBSWlFLFVBQVUsbUNBQzNCLEtBQU91QixJQUFNQSxFQUFJLEVBQUdhLEVBQUcsS0FBT1osRUFBSSxJQUFLQSxHQUFHLElBQ3RDLEdBQUl6RixFQUFJLEVBQUdzRixJQUFNQyxFQUFZLEVBQVJjLEVBQUcsR0FBU2YsRUFBVSxPQUFJZSxFQUFHLEdBQUtmLEVBQVMsU0FBT0MsRUFBSUQsRUFBVSxTQUFNQyxFQUFFZSxLQUFLaEIsR0FBSSxHQUFLQSxFQUFFVCxTQUFXVSxFQUFJQSxFQUFFZSxLQUFLaEIsRUFBR2UsRUFBRyxLQUFLcEIsS0FBTSxPQUFPTSxFQUUzSixPQURJRCxFQUFJLEVBQUdDLElBQUdjLEVBQUssQ0FBUyxFQUFSQSxFQUFHLEdBQVFkLEVBQUUxRSxRQUN6QndGLEVBQUcsSUFDUCxLQUFLLEVBQUcsS0FBSyxFQUFHZCxFQUFJYyxFQUFJLE1BQ3hCLEtBQUssRUFBYyxPQUFYWixFQUFFQyxRQUFnQixDQUFFN0UsTUFBT3dGLEVBQUcsR0FBSXBCLE1BQU0sR0FDaEQsS0FBSyxFQUFHUSxFQUFFQyxRQUFTSixFQUFJZSxFQUFHLEdBQUlBLEVBQUssQ0FBQyxHQUFJLFNBQ3hDLEtBQUssRUFBR0EsRUFBS1osRUFBRUksSUFBSVUsTUFBT2QsRUFBRUcsS0FBS1csTUFBTyxTQUN4QyxRQUNJLEtBQU1oQixFQUFJRSxFQUFFRyxNQUFNTCxFQUFJQSxFQUFFaUIsT0FBUyxHQUFLakIsRUFBRUEsRUFBRWlCLE9BQVMsS0FBa0IsSUFBVkgsRUFBRyxJQUFzQixJQUFWQSxFQUFHLElBQVcsQ0FBRVosRUFBSSxFQUFHLFNBQ2pHLEdBQWMsSUFBVlksRUFBRyxNQUFjZCxHQUFNYyxFQUFHLEdBQUtkLEVBQUUsSUFBTWMsRUFBRyxHQUFLZCxFQUFFLElBQU0sQ0FBRUUsRUFBRUMsTUFBUVcsRUFBRyxHQUFJLE1BQzlFLEdBQWMsSUFBVkEsRUFBRyxJQUFZWixFQUFFQyxNQUFRSCxFQUFFLEdBQUksQ0FBRUUsRUFBRUMsTUFBUUgsRUFBRSxHQUFJQSxFQUFJYyxFQUFJLE1BQzdELEdBQUlkLEdBQUtFLEVBQUVDLE1BQVFILEVBQUUsR0FBSSxDQUFFRSxFQUFFQyxNQUFRSCxFQUFFLEdBQUlFLEVBQUVJLElBQUlZLEtBQUtKLEdBQUssTUFDdkRkLEVBQUUsSUFBSUUsRUFBRUksSUFBSVUsTUFDaEJkLEVBQUVHLEtBQUtXLE1BQU8sU0FFdEJGLEVBQUtoQixFQUFLaUIsS0FBS2xDLEVBQVNxQixHQUMxQixNQUFPWCxHQUFLdUIsRUFBSyxDQUFDLEVBQUd2QixHQUFJUSxFQUFJLEVBQUssUUFBVXRGLEVBQUl1RixFQUFJLEVBQ3RELEdBQVksRUFBUmMsRUFBRyxHQUFRLE1BQU1BLEVBQUcsR0FBSSxNQUFPLENBQUV4RixNQUFPd0YsRUFBRyxHQUFLQSxFQUFHLFFBQUssRUFBUXBCLE1BQU0sR0FyQjlCTCxDQUFLLENBQUN1QixFQUFHQyxPQXdCN0R6RixPQUFPQyxlQUFlOGEsRUFBZ0IsYUFBYyxDQUFFN2EsT0FBTyxJQUM3RDZhLEVBQWVHLGtCQUFvQkgsRUFBZUksZ0JBQWtCSixFQUFlOVUsVUFBTyxFQUsxRixJQUFJbVYsRUFBYSxLQUViQyxFQUFjLEtBRWRDLEVBQWdCLEtBRWhCQyxFQUF3QixLQTRDNUIsU0FBU0osRUFBZ0JyVCxFQUFLcUssRUFBT3FKLEVBQUlDLEVBQUlDLEVBQVFDLEVBQVNDLEVBQUlDLEVBQUkxUyxFQUFRRSxHQUMxRSxLQUFNOEksYUFBaUJaLEVBQWdCTyxZQUVuQyxPQUFPd0osRUFBYzlXLE1BQU1zRCxFQUFLZ1UsTUFBTWhiLFVBQVVpYixNQUFNcFcsS0FBS3FXLFVBQVcsU0FHcEQsSUFBWE4sR0FFUEUsRUFBS0osRUFDTEssRUFBS0osRUFDTEQsT0FBSyxFQUNMQyxPQUFLLFFBRWMsSUFBUEcsSUFFWkEsRUFBS0osRUFDTEssRUFBS0osRUFDTHRTLEVBQVN1UyxFQUNUclMsRUFBVXNTLEVBQ1ZILE9BQUssRUFDTEMsT0FBSyxFQUNMQyxPQUFTLEVBQ1RDLE9BQVUsUUFFUSxJQUFYeFMsSUFDUEEsRUFBU2dKLEVBQU1jLFdBQ2Y1SixFQUFVOEksRUFBTWUsYUFHcEIsSUFBSTVSLEVBQVM4WixFQUFXcEUsZ0JBQ3hCLE9BQVE3RSxFQUFNN1EsUUFDVixJQUFLLE9BQ0RBLEVBQVM4WixFQUFXekUsbUJBQ3BCLE1BQ0osSUFBSyxRQUNEclYsRUFBUzhaLEVBQVd4RSxvQkFDcEIsTUFDSixJQUFLLE9BQ0R0VixFQUFTOFosRUFBV3ZFLG1CQUNwQixNQUNKLElBQUssT0FDRHZWLEVBQVM4WixFQUFXdEUsbUJBQ3BCLE1BQ0osSUFBSyxPQUNEeFYsRUFBUzhaLEVBQVdyRSxnQkFDcEIsTUFDSixJQUFLLE9BQ0wsSUFBSyxPQUNEelYsRUFBUzhaLEVBQVdwRSxnQkFDcEIsTUFDSixJQUFLLE9BQ0wsSUFBSyxPQUNEMVYsRUFBUzhaLEVBQVduRSxnQkFhNUIsSUFUQSxJQUFJZ0YsRUFBWSxJQUFJQyxVQUFVL1MsRUFBUUUsR0FDbEM4UyxFQUFPZixFQUFXZ0Isb0JBQW9CakssRUFBTWMsV0FBWWQsRUFBTWUsWUFBYTVSLEVBQVE2SCxFQUFRRSxFQUFTK1IsRUFBV3BFLGdCQUFpQixFQUFHLEVBQUcsRUFBRyxHQUN6SXFGLEVBQVVqQixFQUFXa0Isc0JBQ3JCQyxFQUFXbkIsRUFBV2tCLHNCQUV0QjdELEVBQVF0RyxFQUFNcFIsZ0JBQ2QyWCxFQUFTLEVBQ1QvSyxFQUFNLEdBQ05nTCxFQUFTcEgsRUFBZ0JNLFVBQVVNLEVBQU03USxRQUNwQ3NYLEVBQUksRUFBR0EsRUFBSUQsRUFBUUMsSUFBSyxDQUM3QixJQUFJQyxFQUFRLEdBQ1psTCxFQUFJN0gsS0FBSytTLEdBTVQsSUFMQSxJQUFJQyxFQUFLdkgsRUFBZ0JLLFlBQVlPLEVBQU03USxPQUFRc1gsR0FDL0NHLEVBQU94SCxFQUFnQkksNEJBQTRCUSxFQUFNN1EsT0FBUXNYLEdBQ2pFSSxFQUFPekgsRUFBZ0JHLDBCQUEwQlMsRUFBTTdRLE9BQVFzWCxHQUMvREssS0FBTzlHLEVBQU1jLFdBQWE2RixFQUFLQyxHQUMvQkcsS0FBTy9HLEVBQU1lLFlBQWM4RixHQUN0QnJVLEVBQUksRUFBR0EsRUFBSXVVLEVBQUd2VSxJQUNuQmtVLEVBQU0vUyxLQUFLMlMsRUFBTS9WLFNBQVNnVyxFQUFRQSxFQUFTTyxJQUMzQ1AsR0FBVU8sRUFJbEJtQyxFQUFXb0IscUJBQXFCSCxFQUFTLENBQ3JDN2IsS0FBTW1OLEVBQ05yTSxPQUFRQSxFQUNSc0gsTUFBT3VKLEVBQU1jLFdBQ2JwSyxPQUFRc0osRUFBTWUsY0FHbEJrSSxFQUFXcUIscUJBQXFCTixFQUFNSSxFQUFVRixHQUtoRCxJQUhBLElBQUlwUSxFQUFRbVAsRUFBV3NCLHNCQUFzQkgsR0FFekNJLEVBQU0sRUFDRDVaLEVBQUksRUFBR0EsRUFBSWtKLEVBQU16TCxLQUFLcUYsT0FBUTlDLElBRW5DLElBREk4VixFQUFRNU0sRUFBTXpMLEtBQUt1QyxHQUNkNEIsRUFBSSxFQUFHQSxFQUFJa1UsRUFBTWhULE9BQVFsQixJQUFLLENBQ25DLElBQUl3UixFQUFNMEMsRUFBTWxVLEdBQ2hCc1gsRUFBVXpiLEtBQUtVLElBQUlpVixFQUFLd0csR0FDeEJBLEdBQU94RyxFQUFJdFEsT0FJbkJpQyxFQUFJOFUsYUFBYVgsRUFBV0wsRUFBSUMsR0FFaENULEVBQVd5QixzQkFBc0JOLEdBQ2pDbkIsRUFBV3lCLHNCQUFzQlIsR0FDakNqQixFQUFXMEIscUJBQXFCWCxHQU1wQyxTQUFTWSxFQUFrQjVLLEVBQU9xSixFQUFJQyxFQUFJQyxFQUFRQyxFQUFTQyxFQUFJQyxFQUFJMVMsRUFBUUUsR0FDdkUsT0FBSThJLGFBQWlCWixFQUFnQk8sV0FDMUJxSixFQUFnQnRiLEtBQU1zUyxFQUFPcUosRUFBSUMsRUFBSUMsRUFBUUMsRUFBU0MsRUFBSUMsRUFBSTFTLEVBQVFFLEdBRTFFaVMsRUFBYzlXLE1BQU0zRSxLQUFNbWMsV0FTckMsU0FBU2QsRUFBa0IvSSxFQUFPNkssR0FDOUIsSUFBSS9SLEVBQVFwTCxLQUVaLFFBRGEsSUFBVG1kLElBQW1CQSxFQUFPLE1BQ3hCN0ssYUFBaUJaLEVBQWdCTyxZQUVuQyxPQUFPeUosRUFBc0IvVyxNQUFNOUUsT0FBUXNjLFdBRy9DLElBQUkxYSxFQUFTK1osRUFBWXJFLGdCQUN6QixPQUFRN0UsRUFBTTdRLFFBQ1YsSUFBSyxPQUNEQSxFQUFTK1osRUFBWTFFLG1CQUNyQixNQUNKLElBQUssUUFDRHJWLEVBQVMrWixFQUFZekUsb0JBQ3JCLE1BQ0osSUFBSyxPQUNEdFYsRUFBUytaLEVBQVl4RSxtQkFDckIsTUFDSixJQUFLLE9BQ0R2VixFQUFTK1osRUFBWXZFLG1CQUNyQixNQUNKLElBQUssT0FDRHhWLEVBQVMrWixFQUFZdEUsZ0JBQ3JCLE1BQ0osSUFBSyxPQUNMLElBQUssT0FDRHpWLEVBQVMrWixFQUFZckUsZ0JBQ3JCLE1BQ0osSUFBSyxPQUNMLElBQUssT0FDRDFWLEVBQVMrWixFQUFZcEUsZ0JBSTdCLElBQUk5TixFQUFzQyxpQkFBckI2VCxFQUFLQyxZQUNwQkQsRUFBS0MsWUFBYzlLLEVBQU0vSSxhQUMzQkMsRUFBd0MsaUJBQXRCMlQsRUFBS0UsYUFDckJGLEVBQUtFLGFBQWUvSyxFQUFNN0ksY0FFNUIyUyxFQUFZLElBQUlDLFVBQVUvUyxFQUFRRSxHQUN0QyxPQUE2QjJSLEVBQWUvUCxPQUFPLE9BQVEsR0FBUSxXQUMvRCxJQUFJeEUsRUFBSTBWLEVBQU1FLEVBQVNFLEVBQVU5RCxFQUFPQyxFQUFRL0ssRUFBS2dMLEVBQVFDLEVBQVVFLEVBQUlDLEVBQU1DLEVBQU1DLEVBQUdDLEVBQU1sUyxFQUFJaUYsRUFBTzBRLEVBQUs1WixFQUFHOFYsRUFBT2xVLEVBQUd3UixFQUM3SCxPQUFPOEUsRUFBaUJwYixNQUFNLFNBQVVzSCxHQUNwQyxPQUFRQSxFQUFHcEMsT0FDUCxLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWFsQixRQUFROEcsSUFBSSxDQUNqQzBRLEVBQVl0QixlQUFlNUgsRUFBTWMsV0FBWWQsRUFBTWUsWUFBYTVSLEVBQVE2SCxFQUFRRSxFQUFTZ1MsRUFBWXJFLGdCQUFpQixFQUFHLEVBQUcsRUFBRyxHQUMvSHFFLEVBQVlyQixpQkFDWnFCLEVBQVlyQixvQkFFcEIsS0FBSyxFQU1ELElBTEF2VCxFQUFLVSxFQUFHbkMsT0FBUW1YLEVBQU8xVixFQUFHLEdBQUk0VixFQUFVNVYsRUFBRyxHQUFJOFYsRUFBVzlWLEVBQUcsR0FDN0RnUyxFQUFRdEcsRUFBTXBSLGdCQUNkMlgsRUFBUyxFQUNUL0ssRUFBTSxHQUNOZ0wsRUFBU3BILEVBQWdCTSxVQUFVTSxFQUFNN1EsUUFDcENzWCxFQUFJLEVBQUdBLEVBQUlELEVBQVFDLElBUXBCLElBUEFDLEVBQVEsR0FDUmxMLEVBQUk3SCxLQUFLK1MsR0FDVEMsRUFBS3ZILEVBQWdCSyxZQUFZTyxFQUFNN1EsT0FBUXNYLEdBQy9DRyxFQUFPeEgsRUFBZ0JJLDRCQUE0QlEsRUFBTTdRLE9BQVFzWCxHQUNqRUksRUFBT3pILEVBQWdCRywwQkFBMEJTLEVBQU03USxPQUFRc1gsR0FDL0RLLEtBQU85RyxFQUFNYyxXQUFhNkYsRUFBS0MsR0FDL0JHLEtBQU8vRyxFQUFNZSxZQUFjOEYsR0FDdEJyVSxFQUFJLEVBQUdBLEVBQUl1VSxFQUFHdlUsSUFDZmtVLEVBQU0vUyxLQUFLMlMsRUFBTS9WLFNBQVNnVyxFQUFRQSxFQUFTTyxJQUMzQ1AsR0FBVU8sRUFHbEIsTUFBTyxDQUFDLEVBQWFwVixRQUFROEcsSUFBSSxDQUV6QjBRLEVBQVlwQixnQkFBZ0JvQyxFQUFTLENBQ2pDN2IsS0FBTW1OLEVBQ05yTSxPQUFRQSxFQUNSc0gsTUFBT3VKLEVBQU1jLFdBQ2JwSyxPQUFRc0osRUFBTWUsY0FHbEJtSSxFQUFZbkIsZ0JBQWdCaUMsRUFBTUksRUFBVUYsR0FFNUNoQixFQUFZOEIsaUJBQWlCWixHQUU3QmxCLEVBQVlsRCxpQkFBaUJvRSxHQUM3QmxCLEVBQVlsRCxpQkFBaUJrRSxHQUM3QmhCLEVBQVlqRCxnQkFBZ0IrRCxNQUV4QyxLQUFLLEVBR0QsSUFGQW5WLEVBQUtHLEVBQUduQyxPQUFRaUgsRUFBUWpGLEVBQUcsR0FDM0IyVixFQUFNLEVBQ0Q1WixFQUFJLEVBQUdBLEVBQUlrSixFQUFNekwsS0FBS3FGLE9BQVE5QyxJQUUvQixJQURBOFYsRUFBUTVNLEVBQU16TCxLQUFLdUMsR0FDZDRCLEVBQUksRUFBR0EsRUFBSWtVLEVBQU1oVCxPQUFRbEIsSUFDMUJ3UixFQUFNMEMsRUFBTWxVLEdBQ1pzWCxFQUFVemIsS0FBS1UsSUFBSWlWLEVBQUt3RyxHQUN4QkEsR0FBT3hHLEVBQUl0USxPQUduQixNQUFPLENBQUMsRUFBYTBWLEVBQXNCVSxJQUMvQyxLQUFLLEVBRUwsTUFBTyxDQUFDLEVBQWM5VSxFQUFHbkMsZUE3T3pDK1YsRUFBZTlVLEtBeEJmLFNBQW1CTyxFQUFjNFcsR0FDN0IsT0FBT3BDLEVBQWVuYixVQUFNLE9BQVEsR0FBUSxXQUN4QyxPQUFPb2IsRUFBaUJwYixNQUFNLFNBQVU0RyxHQUNwQyxPQUFRQSxFQUFHMUIsT0FDUCxLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWE0QixNQUFNQSxNQUFNLENBQUUwVyxVQUFVLEtBQ3JELEtBQUssRUFHRCxPQURBakMsRUFBYTNVLEVBQUd6QixPQUNULENBQUMsRUFBYTJCLE1BQU1BLE1BQU1ILElBQ3JDLEtBQUssRUFVRCxPQVRBNlUsRUFBYzVVLEVBQUd6QixPQUVqQnNXLEVBQWdCZ0MseUJBQXlCeGMsVUFBVWlTLFVBQy9DcUssSUFDQUUseUJBQXlCeGMsVUFBVWlTLFVBQVlnSyxHQUVuRHhCLEVBQXdCN2IsT0FBT3diLGtCQUMzQmtDLElBQ0ExZCxPQUFPd2Isa0JBQW9CQSxHQUN4QixDQUFDLFdBNkg1QkgsRUFBZUksZ0JBQWtCQSxFQTBIakNKLEVBQWVHLGtCQUFvQkEsRUFFbkMsSUFxQlFxQyxFQXJCSkMsRUFBYSxHQW9CYkMsR0FBYTVkLE1BQVFBLEtBQUs0ZCxZQUN0QkYsRUFBZ0IsU0FBVUcsRUFBR0MsR0FJN0IsT0FIQUosRUFBZ0J2ZCxPQUFPNGQsZ0JBQ2xCLENBQUVDLFVBQVcsY0FBZ0IvQixPQUFTLFNBQVU0QixFQUFHQyxHQUFLRCxFQUFFRyxVQUFZRixJQUN2RSxTQUFVRCxFQUFHQyxHQUFLLElBQUssSUFBSS9FLEtBQUsrRSxFQUFPM2QsT0FBT2MsVUFBVWdkLGVBQWVuWSxLQUFLZ1ksRUFBRy9FLEtBQUk4RSxFQUFFOUUsR0FBSytFLEVBQUUvRSxNQUMzRThFLEVBQUdDLElBRXJCLFNBQVVELEVBQUdDLEdBQ2hCLEdBQWlCLG1CQUFOQSxHQUEwQixPQUFOQSxFQUMzQixNQUFNLElBQUlyYSxVQUFVLHVCQUF5QnlhLE9BQU9KLEdBQUssaUNBRTdELFNBQVNLLElBQU9uZSxLQUFLb2UsWUFBY1AsRUFEbkNILEVBQWNHLEVBQUdDLEdBRWpCRCxFQUFFNWMsVUFBa0IsT0FBTjZjLEVBQWEzZCxPQUFPa2UsT0FBT1AsSUFBTUssRUFBR2xkLFVBQVk2YyxFQUFFN2MsVUFBVyxJQUFJa2QsS0FHbkZHLEdBQWlCdGUsTUFBUUEsS0FBSzJELFdBQWMsU0FBVUMsRUFBU0MsRUFBWUMsRUFBR0MsR0FFOUUsT0FBTyxJQUFLRCxJQUFNQSxFQUFJRSxXQUFVLFNBQVVDLEVBQVNDLEdBQy9DLFNBQVNDLEVBQVU5RCxHQUFTLElBQU0rRCxFQUFLTCxFQUFVTSxLQUFLaEUsSUFBVyxNQUFPaUUsR0FBS0osRUFBT0ksSUFDcEYsU0FBU0MsRUFBU2xFLEdBQVMsSUFBTStELEVBQUtMLEVBQWlCLE1BQUUxRCxJQUFXLE1BQU9pRSxHQUFLSixFQUFPSSxJQUN2RixTQUFTRixFQUFLSSxHQUpsQixJQUFlbkUsRUFJYW1FLEVBQU9DLEtBQU9SLEVBQVFPLEVBQU9uRSxRQUoxQ0EsRUFJeURtRSxFQUFPbkUsTUFKaERBLGFBQWlCeUQsRUFBSXpELEVBQVEsSUFBSXlELEdBQUUsU0FBVUcsR0FBV0EsRUFBUTVELE9BSVRxRSxLQUFLUCxFQUFXSSxHQUNsR0gsR0FBTUwsRUFBWUEsRUFBVVksTUFBTWYsRUFBU0MsR0FBYyxLQUFLUSxZQUdsRWthLEdBQW1CdmUsTUFBUUEsS0FBSzRFLGFBQWdCLFNBQVVoQixFQUFTaUIsR0FDbkUsSUFBc0dyRixFQUFHc0YsRUFBR0MsRUFBR0MsRUFBM0dDLEVBQUksQ0FBRUMsTUFBTyxFQUFHQyxLQUFNLFdBQWEsR0FBVyxFQUFQSixFQUFFLEdBQVEsTUFBTUEsRUFBRSxHQUFJLE9BQU9BLEVBQUUsSUFBT0ssS0FBTSxHQUFJQyxJQUFLLElBQ2hHLE9BQU9MLEVBQUksQ0FBRVgsS0FBTWlCLEVBQUssR0FBSUMsTUFBU0QsRUFBSyxHQUFJRSxPQUFVRixFQUFLLElBQXdCLG1CQUFYRyxTQUEwQlQsRUFBRVMsT0FBT0MsVUFBWSxXQUFhLE9BQU8xRixPQUFVZ0YsRUFDdkosU0FBU00sRUFBS0ssR0FBSyxPQUFPLFNBQVVDLEdBQUssT0FDekMsU0FBY0MsR0FDVixHQUFJckcsRUFBRyxNQUFNLElBQUlpRSxVQUFVLG1DQUMzQixLQUFPdUIsSUFBTUEsRUFBSSxFQUFHYSxFQUFHLEtBQU9aLEVBQUksSUFBS0EsR0FBRyxJQUN0QyxHQUFJekYsRUFBSSxFQUFHc0YsSUFBTUMsRUFBWSxFQUFSYyxFQUFHLEdBQVNmLEVBQVUsT0FBSWUsRUFBRyxHQUFLZixFQUFTLFNBQU9DLEVBQUlELEVBQVUsU0FBTUMsRUFBRWUsS0FBS2hCLEdBQUksR0FBS0EsRUFBRVQsU0FBV1UsRUFBSUEsRUFBRWUsS0FBS2hCLEVBQUdlLEVBQUcsS0FBS3BCLEtBQU0sT0FBT00sRUFFM0osT0FESUQsRUFBSSxFQUFHQyxJQUFHYyxFQUFLLENBQVMsRUFBUkEsRUFBRyxHQUFRZCxFQUFFMUUsUUFDekJ3RixFQUFHLElBQ1AsS0FBSyxFQUFHLEtBQUssRUFBR2QsRUFBSWMsRUFBSSxNQUN4QixLQUFLLEVBQWMsT0FBWFosRUFBRUMsUUFBZ0IsQ0FBRTdFLE1BQU93RixFQUFHLEdBQUlwQixNQUFNLEdBQ2hELEtBQUssRUFBR1EsRUFBRUMsUUFBU0osRUFBSWUsRUFBRyxHQUFJQSxFQUFLLENBQUMsR0FBSSxTQUN4QyxLQUFLLEVBQUdBLEVBQUtaLEVBQUVJLElBQUlVLE1BQU9kLEVBQUVHLEtBQUtXLE1BQU8sU0FDeEMsUUFDSSxLQUFNaEIsRUFBSUUsRUFBRUcsTUFBTUwsRUFBSUEsRUFBRWlCLE9BQVMsR0FBS2pCLEVBQUVBLEVBQUVpQixPQUFTLEtBQWtCLElBQVZILEVBQUcsSUFBc0IsSUFBVkEsRUFBRyxJQUFXLENBQUVaLEVBQUksRUFBRyxTQUNqRyxHQUFjLElBQVZZLEVBQUcsTUFBY2QsR0FBTWMsRUFBRyxHQUFLZCxFQUFFLElBQU1jLEVBQUcsR0FBS2QsRUFBRSxJQUFNLENBQUVFLEVBQUVDLE1BQVFXLEVBQUcsR0FBSSxNQUM5RSxHQUFjLElBQVZBLEVBQUcsSUFBWVosRUFBRUMsTUFBUUgsRUFBRSxHQUFJLENBQUVFLEVBQUVDLE1BQVFILEVBQUUsR0FBSUEsRUFBSWMsRUFBSSxNQUM3RCxHQUFJZCxHQUFLRSxFQUFFQyxNQUFRSCxFQUFFLEdBQUksQ0FBRUUsRUFBRUMsTUFBUUgsRUFBRSxHQUFJRSxFQUFFSSxJQUFJWSxLQUFLSixHQUFLLE1BQ3ZEZCxFQUFFLElBQUlFLEVBQUVJLElBQUlVLE1BQ2hCZCxFQUFFRyxLQUFLVyxNQUFPLFNBRXRCRixFQUFLaEIsRUFBS2lCLEtBQUtsQyxFQUFTcUIsR0FDMUIsTUFBT1gsR0FBS3VCLEVBQUssQ0FBQyxFQUFHdkIsR0FBSVEsRUFBSSxFQUFLLFFBQVV0RixFQUFJdUYsRUFBSSxFQUN0RCxHQUFZLEVBQVJjLEVBQUcsR0FBUSxNQUFNQSxFQUFHLEdBQUksTUFBTyxDQUFFeEYsTUFBT3dGLEVBQUcsR0FBS0EsRUFBRyxRQUFLLEVBQVFwQixNQUFNLEdBckI5QkwsQ0FBSyxDQUFDdUIsRUFBR0MsT0F3QjdEekYsT0FBT0MsZUFBZXVkLEVBQVksYUFBYyxDQUFFdGQsT0FBTyxJQUN6RHNkLEVBQVdhLGdCQUFrQmIsRUFBV2MsZ0JBQWtCZCxFQUFXZSxnQkFBa0JmLEVBQVdnQixnQkFBa0JoQixFQUFXaUIsMEJBQXVCLEVBWXRKLElBQUlBLEdBQXNDLFNBQVVDLEdBRWhELFNBQVNELElBQ0wsT0FBT0MsRUFBTy9ZLEtBQUs5RixLQUFNLGlEQUFtREEsS0FFaEYsT0FKQTRkLEdBQVVnQixFQUFzQkMsR0FJekJELEVBTDhCLENBTXZDaEUsT0FDRitDLEVBQVdpQixxQkFBdUJBLEdBNkNsQ2pCLEVBQVdnQixnQkF2Q1gsU0FBeUI3VyxHQUNyQixPQUFPd1csR0FBY3RlLFVBQU0sT0FBUSxHQUFRLFdBQ3ZDLElBQUk0RyxFQUNKLE9BQU8yWCxHQUFnQnZlLE1BQU0sU0FBVW1ILEdBQ25DLE9BQVFBLEVBQUdqQyxPQUNQLEtBQUssRUFHRCxPQUZBaUMsRUFBRy9CLEtBQUthLEtBQUssQ0FBQyxFQUFHLEVBQUcsQ0FBRSxLQUN0QlcsT0FBb0MsSUFBeEIvRyxPQUFPeUssY0FFWixDQUFDLEVBQWF6SyxPQUFPeUssYUFBYThELGtCQUFrQnRHLElBRDNDLENBQUMsRUFBYSxHQUVsQyxLQUFLLEVBQ0RsQixFQUFNTyxFQUFHaEMsT0FBUW1HLFVBQ2pCbkUsRUFBR2pDLE1BQVEsRUFDZixLQUFLLEVBQ0QsT0FBSTBCLEVBQ08sQ0FBQyxFQUFjLENBQ2QwRCxhQUFjekssT0FBT3lLLGFBQ3JCaEssa0JBQW1CVCxPQUFPUyxrQkFDMUJrQixVQUFXM0IsT0FBTzJCLFlBR3ZCLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBRUQsT0FETzJGLEVBQUdoQyxPQUNILENBQUMsRUFBYSxHQUN6QixLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWFnRixFQUFpQkcsYUFBYThELGtCQUFrQnRHLElBQzdFLEtBQUssRUFDRCxHQUFLWCxFQUFHaEMsT0FBUW1HLFVBQ1osTUFBTyxDQUFDLEVBQWMsQ0FDZGhCLGFBQWNILEVBQWlCRyxhQUMvQmhLLGtCQUFtQkosRUFBc0JJLGtCQUN6Q2tCLFVBQVdGLEVBQWNFLFlBR3JDLE1BQU0sSUFBSW9kLFdBa0Q5QmpCLEVBQVdlLGdCQXZDWCxTQUF5QjVXLEdBQ3JCLE9BQU93VyxHQUFjdGUsVUFBTSxPQUFRLEdBQVEsV0FDdkMsSUFBSTRHLEVBQ0osT0FBTzJYLEdBQWdCdmUsTUFBTSxTQUFVbUgsR0FDbkMsT0FBUUEsRUFBR2pDLE9BQ1AsS0FBSyxFQUdELE9BRkFpQyxFQUFHL0IsS0FBS2EsS0FBSyxDQUFDLEVBQUcsRUFBRyxDQUFFLEtBQ3RCVyxPQUFvQyxJQUF4Qi9HLE9BQU82VyxjQUVaLENBQUMsRUFBYTdXLE9BQU82VyxhQUFhdEksa0JBQWtCdEcsSUFEM0MsQ0FBQyxFQUFhLEdBRWxDLEtBQUssRUFDRGxCLEVBQU1PLEVBQUdoQyxPQUFRbUcsVUFDakJuRSxFQUFHakMsTUFBUSxFQUNmLEtBQUssRUFDRCxPQUFJMEIsRUFDTyxDQUFDLEVBQWMsQ0FDZDhQLGFBQWM3VyxPQUFPNlcsYUFDckJqRixrQkFBbUI1UixPQUFPNFIsa0JBQzFCUSxXQUFZcFMsT0FBT29TLGFBR3hCLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBRUQsT0FETzlLLEVBQUdoQyxPQUNILENBQUMsRUFBYSxHQUN6QixLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWFvUixFQUFrQkcsYUFBYXRJLGtCQUFrQnRHLElBQzlFLEtBQUssRUFDRCxHQUFLWCxFQUFHaEMsT0FBUW1HLFVBQ1osTUFBTyxDQUFDLEVBQWMsQ0FDZG9MLGFBQWNILEVBQWtCRyxhQUNoQ2pGLGtCQUFtQkQsRUFBc0JDLGtCQUN6Q1EsV0FBWVAsRUFBZ0JPLGFBR3hDLE1BQU0sSUFBSTJNLFdBa0Q5QmpCLEVBQVdjLGdCQXZDWCxTQUF5QjNXLEdBQ3JCLE9BQU93VyxHQUFjdGUsVUFBTSxPQUFRLEdBQVEsV0FDdkMsSUFBSTRHLEVBQ0osT0FBTzJYLEdBQWdCdmUsTUFBTSxTQUFVbUgsR0FDbkMsT0FBUUEsRUFBR2pDLE9BQ1AsS0FBSyxFQUdELE9BRkFpQyxFQUFHL0IsS0FBS2EsS0FBSyxDQUFDLEVBQUcsRUFBRyxDQUFFLEtBQ3RCVyxPQUFvQyxJQUF4Qi9HLE9BQU80TyxjQUVaLENBQUMsRUFBYTVPLE9BQU80TyxhQUFhTCxrQkFBa0J0RyxJQUQzQyxDQUFDLEVBQWEsR0FFbEMsS0FBSyxFQUNEbEIsRUFBTU8sRUFBR2hDLE9BQVFtRyxVQUNqQm5FLEVBQUdqQyxNQUFRLEVBQ2YsS0FBSyxFQUNELE9BQUkwQixFQUNPLENBQUMsRUFBYyxDQUNkNkgsYUFBYzVPLE9BQU80TyxhQUNyQm5PLGtCQUFtQlQsT0FBT1Msa0JBQzFCa0IsVUFBVzNCLE9BQU8yQixZQUd2QixDQUFDLEVBQWEsR0FDekIsS0FBSyxFQUVELE9BRE8yRixFQUFHaEMsT0FDSCxDQUFDLEVBQWEsR0FDekIsS0FBSyxFQUFHLE1BQU8sQ0FBQyxFQUFhbUosRUFBaUJHLGFBQWFMLGtCQUFrQnRHLElBQzdFLEtBQUssRUFDRCxHQUFLWCxFQUFHaEMsT0FBUW1HLFVBQ1osTUFBTyxDQUFDLEVBQWMsQ0FDZG1ELGFBQWNILEVBQWlCRyxhQUMvQm5PLGtCQUFtQkosRUFBc0JJLGtCQUN6Q2tCLFVBQVdGLEVBQWNFLFlBR3JDLE1BQU0sSUFBSW9kLFdBa0Q5QmpCLEVBQVdhLGdCQXZDWCxTQUF5QjFXLEdBQ3JCLE9BQU93VyxHQUFjdGUsVUFBTSxPQUFRLEdBQVEsV0FDdkMsSUFBSTRHLEVBQ0osT0FBTzJYLEdBQWdCdmUsTUFBTSxTQUFVbUgsR0FDbkMsT0FBUUEsRUFBR2pDLE9BQ1AsS0FBSyxFQUdELE9BRkFpQyxFQUFHL0IsS0FBS2EsS0FBSyxDQUFDLEVBQUcsRUFBRyxDQUFFLEtBQ3RCVyxPQUFvQyxJQUF4Qi9HLE9BQU9pWSxjQUVaLENBQUMsRUFBYWpZLE9BQU9pWSxhQUFhMUosa0JBQWtCdEcsSUFEM0MsQ0FBQyxFQUFhLEdBRWxDLEtBQUssRUFDRGxCLEVBQU1PLEVBQUdoQyxPQUFRbUcsVUFDakJuRSxFQUFHakMsTUFBUSxFQUNmLEtBQUssRUFDRCxPQUFJMEIsRUFDTyxDQUFDLEVBQWMsQ0FDZGtSLGFBQWNqWSxPQUFPaVksYUFDckJyRyxrQkFBbUI1UixPQUFPNFIsa0JBQzFCUSxXQUFZcFMsT0FBT29TLGFBR3hCLENBQUMsRUFBYSxHQUN6QixLQUFLLEVBRUQsT0FETzlLLEVBQUdoQyxPQUNILENBQUMsRUFBYSxHQUN6QixLQUFLLEVBQUcsTUFBTyxDQUFDLEVBQWF3UyxFQUFrQkcsYUFBYTFKLGtCQUFrQnRHLElBQzlFLEtBQUssRUFDRCxHQUFLWCxFQUFHaEMsT0FBUW1HLFVBQ1osTUFBTyxDQUFDLEVBQWMsQ0FDZHdNLGFBQWNILEVBQWtCRyxhQUNoQ3JHLGtCQUFtQkQsRUFBc0JDLGtCQUN6Q1EsV0FBWVAsRUFBZ0JPLGFBR3hDLE1BQU0sSUFBSTJNLFdBTzlCLElBQUlFLEdBQVcsR0FvQlhDLEdBQWlCL2UsTUFBUUEsS0FBSzJELFdBQWMsU0FBVUMsRUFBU0MsRUFBWUMsRUFBR0MsR0FFOUUsT0FBTyxJQUFLRCxJQUFNQSxFQUFJRSxXQUFVLFNBQVVDLEVBQVNDLEdBQy9DLFNBQVNDLEVBQVU5RCxHQUFTLElBQU0rRCxFQUFLTCxFQUFVTSxLQUFLaEUsSUFBVyxNQUFPaUUsR0FBS0osRUFBT0ksSUFDcEYsU0FBU0MsRUFBU2xFLEdBQVMsSUFBTStELEVBQUtMLEVBQWlCLE1BQUUxRCxJQUFXLE1BQU9pRSxHQUFLSixFQUFPSSxJQUN2RixTQUFTRixFQUFLSSxHQUpsQixJQUFlbkUsRUFJYW1FLEVBQU9DLEtBQU9SLEVBQVFPLEVBQU9uRSxRQUoxQ0EsRUFJeURtRSxFQUFPbkUsTUFKaERBLGFBQWlCeUQsRUFBSXpELEVBQVEsSUFBSXlELEdBQUUsU0FBVUcsR0FBV0EsRUFBUTVELE9BSVRxRSxLQUFLUCxFQUFXSSxHQUNsR0gsR0FBTUwsRUFBWUEsRUFBVVksTUFBTWYsRUFBU0MsR0FBYyxLQUFLUSxZQUdsRTJhLEdBQW1CaGYsTUFBUUEsS0FBSzRFLGFBQWdCLFNBQVVoQixFQUFTaUIsR0FDbkUsSUFBc0dyRixFQUFHc0YsRUFBR0MsRUFBR0MsRUFBM0dDLEVBQUksQ0FBRUMsTUFBTyxFQUFHQyxLQUFNLFdBQWEsR0FBVyxFQUFQSixFQUFFLEdBQVEsTUFBTUEsRUFBRSxHQUFJLE9BQU9BLEVBQUUsSUFBT0ssS0FBTSxHQUFJQyxJQUFLLElBQ2hHLE9BQU9MLEVBQUksQ0FBRVgsS0FBTWlCLEVBQUssR0FBSUMsTUFBU0QsRUFBSyxHQUFJRSxPQUFVRixFQUFLLElBQXdCLG1CQUFYRyxTQUEwQlQsRUFBRVMsT0FBT0MsVUFBWSxXQUFhLE9BQU8xRixPQUFVZ0YsRUFDdkosU0FBU00sRUFBS0ssR0FBSyxPQUFPLFNBQVVDLEdBQUssT0FDekMsU0FBY0MsR0FDVixHQUFJckcsRUFBRyxNQUFNLElBQUlpRSxVQUFVLG1DQUMzQixLQUFPdUIsSUFBTUEsRUFBSSxFQUFHYSxFQUFHLEtBQU9aLEVBQUksSUFBS0EsR0FBRyxJQUN0QyxHQUFJekYsRUFBSSxFQUFHc0YsSUFBTUMsRUFBWSxFQUFSYyxFQUFHLEdBQVNmLEVBQVUsT0FBSWUsRUFBRyxHQUFLZixFQUFTLFNBQU9DLEVBQUlELEVBQVUsU0FBTUMsRUFBRWUsS0FBS2hCLEdBQUksR0FBS0EsRUFBRVQsU0FBV1UsRUFBSUEsRUFBRWUsS0FBS2hCLEVBQUdlLEVBQUcsS0FBS3BCLEtBQU0sT0FBT00sRUFFM0osT0FESUQsRUFBSSxFQUFHQyxJQUFHYyxFQUFLLENBQVMsRUFBUkEsRUFBRyxHQUFRZCxFQUFFMUUsUUFDekJ3RixFQUFHLElBQ1AsS0FBSyxFQUFHLEtBQUssRUFBR2QsRUFBSWMsRUFBSSxNQUN4QixLQUFLLEVBQWMsT0FBWFosRUFBRUMsUUFBZ0IsQ0FBRTdFLE1BQU93RixFQUFHLEdBQUlwQixNQUFNLEdBQ2hELEtBQUssRUFBR1EsRUFBRUMsUUFBU0osRUFBSWUsRUFBRyxHQUFJQSxFQUFLLENBQUMsR0FBSSxTQUN4QyxLQUFLLEVBQUdBLEVBQUtaLEVBQUVJLElBQUlVLE1BQU9kLEVBQUVHLEtBQUtXLE1BQU8sU0FDeEMsUUFDSSxLQUFNaEIsRUFBSUUsRUFBRUcsTUFBTUwsRUFBSUEsRUFBRWlCLE9BQVMsR0FBS2pCLEVBQUVBLEVBQUVpQixPQUFTLEtBQWtCLElBQVZILEVBQUcsSUFBc0IsSUFBVkEsRUFBRyxJQUFXLENBQUVaLEVBQUksRUFBRyxTQUNqRyxHQUFjLElBQVZZLEVBQUcsTUFBY2QsR0FBTWMsRUFBRyxHQUFLZCxFQUFFLElBQU1jLEVBQUcsR0FBS2QsRUFBRSxJQUFNLENBQUVFLEVBQUVDLE1BQVFXLEVBQUcsR0FBSSxNQUM5RSxHQUFjLElBQVZBLEVBQUcsSUFBWVosRUFBRUMsTUFBUUgsRUFBRSxHQUFJLENBQUVFLEVBQUVDLE1BQVFILEVBQUUsR0FBSUEsRUFBSWMsRUFBSSxNQUM3RCxHQUFJZCxHQUFLRSxFQUFFQyxNQUFRSCxFQUFFLEdBQUksQ0FBRUUsRUFBRUMsTUFBUUgsRUFBRSxHQUFJRSxFQUFFSSxJQUFJWSxLQUFLSixHQUFLLE1BQ3ZEZCxFQUFFLElBQUlFLEVBQUVJLElBQUlVLE1BQ2hCZCxFQUFFRyxLQUFLVyxNQUFPLFNBRXRCRixFQUFLaEIsRUFBS2lCLEtBQUtsQyxFQUFTcUIsR0FDMUIsTUFBT1gsR0FBS3VCLEVBQUssQ0FBQyxFQUFHdkIsR0FBSVEsRUFBSSxFQUFLLFFBQVV0RixFQUFJdUYsRUFBSSxFQUN0RCxHQUFZLEVBQVJjLEVBQUcsR0FBUSxNQUFNQSxFQUFHLEdBQUksTUFBTyxDQUFFeEYsTUFBT3dGLEVBQUcsR0FBS0EsRUFBRyxRQUFLLEVBQVFwQixNQUFNLEdBckI5QkwsQ0FBSyxDQUFDdUIsRUFBR0MsT0EyRzdELE9BbkZBekYsT0FBT0MsZUFBZTBlLEdBQVUsYUFBYyxDQUFFemUsT0FBTyxJQUN2RHllLEdBQVNOLGdCQUFrQk0sR0FBU0wsZ0JBQWtCSyxHQUFTSixnQkFBa0JJLEdBQVNILGdCQUFrQkcsR0FBU0YscUJBQXVCRSxHQUFTekQsa0JBQW9CeUQsR0FBU3hELGdCQUFrQndELEdBQVNoSCxhQUFlZ0gsR0FBU3BJLGFBQWVvSSxHQUFTN00sV0FBYTZNLEdBQVNyTixrQkFBb0JxTixHQUFTclEsYUFBZXFRLEdBQVN4VSxhQUFld1UsR0FBU3RkLFVBQVlzZCxHQUFTeGUsa0JBQW9Cd2UsR0FBUzFZLFVBQU8sRUFnRXpaMFksR0FBUzFZLEtBakRULFNBQWtCckUsR0FFZCxZQURnQixJQUFaQSxJQUFzQkEsRUFBVSxJQUM3QmdkLEdBQWMvZSxVQUFNLE9BQVEsR0FBUSxXQUN2QyxJQUFJMkcsRUFBY08sRUFBSU4sRUFBSXFZLEVBQzFCLE9BQU9ELEdBQWdCaGYsTUFBTSxTQUFVbUgsR0FDbkMsT0FBUUEsRUFBR2pDLE9BQ1AsS0FBSyxFQUlELE9BSEF5QixFQUFlLEdBQ1g1RSxFQUFRNEUsY0FDUnhHLE9BQU8rZSxPQUFPdlksRUFBYzVFLEVBQVE0RSxjQUNqQixvQkFBVkcsTUFBK0IsQ0FBQyxFQUFhLEdBQ25ELENBQUMsRUFBYSxJQUFJOUMsU0FBUSxTQUFVbWIsRUFBS0MsR0FFeEN6WSxFQUFhNlcsVUFBVyxFQUV4QjFXLE1BQVEsQ0FBRXVZLEtBQU0sb0NBQ2hCLElBQUlDLEVBQU0vTSxTQUFTQyxjQUFjLFVBQ2pDOE0sRUFBSUMsSUFBTSxxRUFDVkQsRUFBSUUsT0FBU0wsRUFDYkcsRUFBSUcsUUFBVUwsRUFDZDdNLFNBQVMxTixLQUFLOE4sWUFBWTJNLE9BRXRDLEtBQUssRUFDRG5ZLEVBQUdoQyxPQUNIZ0MsRUFBR2pDLE1BQVEsRUFDZixLQUFLLEVBR0QsT0FEQXhCLEVBQVU2QyxnQkFBZ0JJLEdBQ25CLENBQUMsRUFBYWpELEVBQVUwQyxRQUNuQyxLQUFLLEVBRUQsR0FEQWUsRUFBR2hDLE9BQ0NwRCxFQUFRd2IsU0FDUixJQUFLclcsRUFBSyxFQUFHTixFQUFLLENBQ2Qsb0JBQXFCLFlBQWEsZUFBZ0IsZUFDbEQsb0JBQXFCLGFBQWMsZUFBZ0IsZ0JBQ3BETSxFQUFLTixFQUFHWixPQUFRa0IsSUFDZitYLEVBQU1yWSxFQUFHTSxHQUNKckgsT0FBT29mLEtBQ1JwZixPQUFPb2YsR0FBT2pmLEtBQUtpZixJQUcvQixNQUFPLENBQUMsRUFBYS9ELEVBQWU5VSxLQUFLTyxJQUFnQjVFLEVBQVF3YixXQUNyRSxLQUFLLEVBRUQsT0FEQXBXLEVBQUdoQyxPQUNJLENBQUMsV0FNNUIyWixHQUFTeGUsa0JBQW9CSixFQUFzQkksa0JBQ25Ed2UsR0FBU3RkLFVBQVlGLEVBQWNFLFVBQ25Dc2QsR0FBU3hVLGFBQWVILEVBQWlCRyxhQUN6Q3dVLEdBQVNyUSxhQUFlSCxFQUFpQkcsYUFDekNxUSxHQUFTck4sa0JBQW9CRCxFQUFzQkMsa0JBQ25EcU4sR0FBUzdNLFdBQWFQLEVBQWdCTyxXQUN0QzZNLEdBQVNwSSxhQUFlSCxFQUFrQkcsYUFDMUNvSSxHQUFTaEgsYUFBZUgsRUFBa0JHLGFBRTFDZ0gsR0FBU3hELGdCQUFrQkosRUFBZUksZ0JBQzFDd0QsR0FBU3pELGtCQUFvQkgsRUFBZUcsa0JBQzVDeUQsR0FBU0YscUJBQXVCakIsRUFBV2lCLHFCQUMzQ0UsR0FBU0gsZ0JBQWtCaEIsRUFBV2dCLGdCQUN0Q0csR0FBU0osZ0JBQWtCZixFQUFXZSxnQkFDdENJLEdBQVNMLGdCQUFrQmQsRUFBV2MsZ0JBQ3RDSyxHQUFTTixnQkFBa0JiLEVBQVdhLGdCQUUvQk0ifQ==
