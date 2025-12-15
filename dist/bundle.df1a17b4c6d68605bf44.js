/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W: () => (/* binding */ useToastStore),
/* harmony export */   o: () => (/* binding */ toast)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1621);
/* harmony import */ var _constants_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7685);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


var toastIdCounter = 0;
var useToastStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .vt)(function (set) {
  return {
    toasts: [],
    showToast: function showToast(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _constants_app__WEBPACK_IMPORTED_MODULE_1__/* .TOAST_CONFIG */ .lt.DEFAULT_DURATION;
      var id = "toast-".concat(++toastIdCounter);
      var toast = {
        id: id,
        message: message,
        type: type,
        duration: duration
      };
      set(function (state) {
        return {
          toasts: [].concat(_toConsumableArray(state.toasts), [toast])
        };
      });

      // Auto-dismiss if duration > 0
      if (duration > 0) {
        setTimeout(function () {
          set(function (state) {
            return {
              toasts: state.toasts.filter(function (t) {
                return t.id !== id;
              })
            };
          });
        }, duration);
      }
      return id;
    },
    removeToast: function removeToast(id) {
      set(function (state) {
        return {
          toasts: state.toasts.filter(function (t) {
            return t.id !== id;
          })
        };
      });
    },
    clearToasts: function clearToasts() {
      set({
        toasts: []
      });
    }
  };
});

// Convenience functions
var toast = {
  success: function success(message, duration) {
    return useToastStore.getState().showToast(message, 'success', duration);
  },
  error: function error(message, duration) {
    return useToastStore.getState().showToast(message, 'error', duration || _constants_app__WEBPACK_IMPORTED_MODULE_1__/* .TOAST_CONFIG */ .lt.ERROR_DURATION);
  },
  warning: function warning(message, duration) {
    return useToastStore.getState().showToast(message, 'warning', duration);
  },
  info: function info(message, duration) {
    return useToastStore.getState().showToast(message, 'info', duration);
  }
};

/***/ }),

/***/ 1104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  n: () => (/* binding */ useAuthStore)
});

// EXTERNAL MODULE: ./node_modules/zustand/esm/index.mjs + 1 modules
var esm = __webpack_require__(1621);
// EXTERNAL MODULE: ./src/lib/apiClient.ts
var apiClient = __webpack_require__(5859);
;// ./src/services/api/authApi.ts
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var authApi = {
  /**
   * Kullanıcı kaydı
   */
  register: function register(input) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return apiClient/* apiClient */.u.post('/auth/register', input);
          case 1:
            response = _context.v;
            _context.n = 2;
            return apiClient/* apiClient */.u.setToken(response.token);
          case 2:
            return _context.a(2, response);
        }
      }, _callee);
    }))();
  },
  /**
   * Kullanıcı girişi
   */
  login: function login(input) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            if (false) // removed by dead control flow
{}
            _context2.n = 1;
            return apiClient/* apiClient */.u.post('/auth/login', input);
          case 1:
            response = _context2.v;
            if (false) // removed by dead control flow
{}
            // Token'ı kaydet
            _context2.n = 2;
            return apiClient/* apiClient */.u.setToken(response.token);
          case 2:
            return _context2.a(2, response);
          case 3:
            _context2.p = 3;
            _t = _context2.v;
            if (false) // removed by dead control flow
{}
            throw _t;
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 3]]);
    }))();
  },
  /**
   * Mevcut kullanıcı bilgilerini getir
   */
  getMe: function getMe() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return apiClient/* apiClient */.u.get('/auth/me');
          case 1:
            return _context3.a(2, _context3.v);
        }
      }, _callee3);
    }))();
  },
  /**
   * Çıkış yap
   */
  logout: function logout() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return apiClient/* apiClient */.u.setToken(null);
          case 1:
            return _context4.a(2);
        }
      }, _callee4);
    }))();
  },
  /**
   * Profil güncelle
   */
  updateProfile: function updateProfile(input) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var updated;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return apiClient/* apiClient */.u.put('/users/profile', input);
          case 1:
            updated = _context5.v;
            return _context5.a(2, updated);
        }
      }, _callee5);
    }))();
  },
  /**
   * Şifre değiştir
   */
  changePassword: function changePassword(input) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return apiClient/* apiClient */.u.put('/users/password', input);
          case 1:
            return _context6.a(2, _context6.v);
        }
      }, _callee6);
    }))();
  },
  /**
   * E-posta değiştir
   */
  changeEmail: function changeEmail(input) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return apiClient/* apiClient */.u.put('/users/email', input);
          case 1:
            return _context7.a(2, _context7.v);
        }
      }, _callee7);
    }))();
  },
  /**
   * Token yenileme (backend endpoint hazır olduğunda kullanılacak)
   */
  refreshToken: function refreshToken() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var response;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.n = 1;
            return apiClient/* apiClient */.u.post('/auth/refresh');
          case 1:
            response = _context8.v;
            _context8.n = 2;
            return apiClient/* apiClient */.u.setToken(response.token);
          case 2:
            return _context8.a(2, response);
        }
      }, _callee8);
    }))();
  }
};
;// ./src/stores/authStore.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function authStore_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return authStore_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (authStore_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, authStore_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, authStore_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), authStore_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", authStore_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), authStore_regeneratorDefine2(u), authStore_regeneratorDefine2(u, o, "Generator"), authStore_regeneratorDefine2(u, n, function () { return this; }), authStore_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (authStore_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function authStore_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } authStore_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { authStore_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, authStore_regeneratorDefine2(e, r, n, t); }
function authStore_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function authStore_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { authStore_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { authStore_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



var useAuthStore = (0,esm/* create */.vt)(function (set) {
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    login: function () {
      var _login = authStore_asyncToGenerator(/*#__PURE__*/authStore_regenerator().m(function _callee(input) {
        var response, _t;
        return authStore_regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              set({
                loading: true,
                error: null
              });
              _context.n = 1;
              return authApi.login(input);
            case 1:
              response = _context.v;
              set({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                loading: false,
                error: null
              });
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              set({
                loading: false,
                error: _t instanceof Error ? _t.message : 'Giriş başarısız',
                isAuthenticated: false,
                user: null,
                token: null
              });
              throw _t;
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      function login(_x) {
        return _login.apply(this, arguments);
      }
      return login;
    }(),
    register: function () {
      var _register = authStore_asyncToGenerator(/*#__PURE__*/authStore_regenerator().m(function _callee2(input) {
        var response, _t2;
        return authStore_regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              set({
                loading: true,
                error: null
              });
              _context2.n = 1;
              return authApi.register(input);
            case 1:
              response = _context2.v;
              set({
                user: response.user,
                token: response.token,
                isAuthenticated: true,
                loading: false,
                error: null
              });
              _context2.n = 3;
              break;
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              set({
                loading: false,
                error: _t2 instanceof Error ? _t2.message : 'Kayıt başarısız',
                isAuthenticated: false,
                user: null,
                token: null
              });
              throw _t2;
            case 3:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 2]]);
      }));
      function register(_x2) {
        return _register.apply(this, arguments);
      }
      return register;
    }(),
    logout: function () {
      var _logout = authStore_asyncToGenerator(/*#__PURE__*/authStore_regenerator().m(function _callee3() {
        return authStore_regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return authApi.logout();
            case 1:
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                error: null
              });
            case 2:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      function logout() {
        return _logout.apply(this, arguments);
      }
      return logout;
    }(),
    loadUser: function () {
      var _loadUser = authStore_asyncToGenerator(/*#__PURE__*/authStore_regenerator().m(function _callee4() {
        var token, user, _t3;
        return authStore_regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return apiClient/* apiClient */.u.getToken();
            case 1:
              token = _context4.v;
              if (token) {
                _context4.n = 2;
                break;
              }
              set({
                user: null,
                token: null,
                isAuthenticated: false
              });
              return _context4.a(2);
            case 2:
              if (isValidTokenFormat(token)) {
                _context4.n = 4;
                break;
              }
              console.warn('[AuthStore] Invalid token format, logging out');
              _context4.n = 3;
              return authApi.logout();
            case 3:
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null
              });
              return _context4.a(2);
            case 4:
              set({
                loading: true
              });
              _context4.n = 5;
              return authApi.getMe();
            case 5:
              user = _context4.v;
              set({
                user: user,
                token: token,
                isAuthenticated: true,
                loading: false,
                error: null
              });
              _context4.n = 8;
              break;
            case 6:
              _context4.p = 6;
              _t3 = _context4.v;
              // Token geçersiz veya expired, logout yap
              console.warn('[AuthStore] Token validation failed, logging out:', _t3);
              _context4.n = 7;
              return authApi.logout();
            case 7:
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null
              });
            case 8:
              return _context4.a(2);
          }
        }, _callee4, null, [[0, 6]]);
      }));
      function loadUser() {
        return _loadUser.apply(this, arguments);
      }
      return loadUser;
    }(),
    clearError: function clearError() {
      set({
        error: null
      });
    },
    updateProfile: function () {
      var _updateProfile = authStore_asyncToGenerator(/*#__PURE__*/authStore_regenerator().m(function _callee5(input) {
        var user, _t4;
        return authStore_regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              set({
                loading: true,
                error: null
              });
              _context5.p = 1;
              _context5.n = 2;
              return authApi.updateProfile(input);
            case 2:
              user = _context5.v;
              set({
                user: user,
                loading: false
              });
              _context5.n = 4;
              break;
            case 3:
              _context5.p = 3;
              _t4 = _context5.v;
              set({
                loading: false,
                error: _t4 instanceof Error ? _t4.message : 'Profil güncellenemedi'
              });
              throw _t4;
            case 4:
              return _context5.a(2);
          }
        }, _callee5, null, [[1, 3]]);
      }));
      function updateProfile(_x3) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }(),
    changePassword: function () {
      var _changePassword = authStore_asyncToGenerator(/*#__PURE__*/authStore_regenerator().m(function _callee6(input) {
        var _t5;
        return authStore_regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              set({
                loading: true,
                error: null
              });
              _context6.p = 1;
              _context6.n = 2;
              return authApi.changePassword(input);
            case 2:
              set({
                loading: false
              });
              _context6.n = 4;
              break;
            case 3:
              _context6.p = 3;
              _t5 = _context6.v;
              set({
                loading: false,
                error: _t5 instanceof Error ? _t5.message : 'Şifre değiştirilemedi'
              });
              throw _t5;
            case 4:
              return _context6.a(2);
          }
        }, _callee6, null, [[1, 3]]);
      }));
      function changePassword(_x4) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }(),
    changeEmail: function () {
      var _changeEmail = authStore_asyncToGenerator(/*#__PURE__*/authStore_regenerator().m(function _callee7(input) {
        var result, _t6;
        return authStore_regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              set({
                loading: true,
                error: null
              });
              _context7.p = 1;
              _context7.n = 2;
              return authApi.changeEmail(input);
            case 2:
              result = _context7.v;
              set(function (state) {
                return {
                  user: state.user ? _objectSpread(_objectSpread({}, state.user), {}, {
                    email: result.email
                  }) : state.user,
                  loading: false
                };
              });
              _context7.n = 4;
              break;
            case 3:
              _context7.p = 3;
              _t6 = _context7.v;
              set({
                loading: false,
                error: _t6 instanceof Error ? _t6.message : 'E-posta değiştirilemedi'
              });
              throw _t6;
            case 4:
              return _context7.a(2);
          }
        }, _callee7, null, [[1, 3]]);
      }));
      function changeEmail(_x5) {
        return _changeEmail.apply(this, arguments);
      }
      return changeEmail;
    }()
  };
});

/**
 * Basic token format validation
 * JWT tokens typically have 3 parts separated by dots
 */
function isValidTokenFormat(token) {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // Basic JWT format check (3 parts separated by dots)
  var parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  // Check if parts are not empty
  return parts.every(function (part) {
    return part.length > 0;
  });
}

// Make authStore available globally for apiClient interceptor
if (typeof window !== 'undefined') {
  window.authStore = useAuthStore;
}

/***/ }),

/***/ 3064:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ config)
/* harmony export */ });
/**
 * Centralized configuration management
 * Reads environment variables with fallback defaults
 */

var getEnvVar = function getEnvVar(key, defaultValue) {
  if (typeof process !== 'undefined' && "MISSING_ENV_VAR") {
    return "MISSING_ENV_VAR"[key] || defaultValue || '';
  }
  return defaultValue || '';
};
var config = {
  // API Configuration
  api: {
    baseUrl: getEnvVar('REACT_APP_API_BASE_URL', 'http://localhost:4000'),
    wsBaseUrl: getEnvVar('REACT_APP_WS_BASE_URL', 'http://localhost:4000')
  },
  // Agora WebRTC Configuration
  agora: {
    appId: getEnvVar('REACT_APP_AGORA_APP_ID', ''),
    appCertificate: getEnvVar('REACT_APP_AGORA_APP_CERTIFICATE', '')
  },
  // JWT (development only)
  jwt: {
    secret: getEnvVar('REACT_APP_JWT_SECRET', '')
  }
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (config)));

/***/ }),

/***/ 5194:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ radius)
/* harmony export */ });
var radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999
};

/***/ }),

/***/ 5859:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ apiClient)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4447);
/* harmony import */ var _react_native_async_storage_async_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(655);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3064);
/* harmony import */ var _utils_errorHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9718);
/* harmony import */ var _constants_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7685);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var DEFAULT_RETRY_CONFIG = {
  retries: _constants_app__WEBPACK_IMPORTED_MODULE_4__/* .API_CONFIG */ .i3.RETRY_ATTEMPTS,
  retryDelay: _constants_app__WEBPACK_IMPORTED_MODULE_4__/* .API_CONFIG */ .i3.RETRY_DELAY,
  retryCondition: function retryCondition(error) {
    // Retry on network errors or 5xx server errors
    return !error.response || error.response.status >= 500 && error.response.status < 600 || error.code === 'ECONNABORTED' ||
    // Timeout
    error.code === 'ERR_NETWORK' // Network error
    ;
  }
};
var ApiClient = /*#__PURE__*/function () {
  function ApiClient() {
    _classCallCheck(this, ApiClient);
    _defineProperty(this, "errorHandler", (0,_utils_errorHandler__WEBPACK_IMPORTED_MODULE_3__/* .createErrorHandler */ .JF)({
      component: 'ApiClient'
    }));
    this.client = axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.create({
      baseURL: _config__WEBPACK_IMPORTED_MODULE_2__/* .config */ .$.api.baseUrl,
      timeout: _constants_app__WEBPACK_IMPORTED_MODULE_4__/* .API_CONFIG */ .i3.TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.setupInterceptors();
  }

  /**
   * Retry request with exponential backoff
   */
  return _createClass(ApiClient, [{
    key: "retryRequest",
    value: (function () {
      var _retryRequest = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(requestFn) {
        var retryConfig,
          attempt,
          _retryConfig$retryCon,
          axiosError,
          delay,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              retryConfig = _args.length > 1 && _args[1] !== undefined ? _args[1] : DEFAULT_RETRY_CONFIG;
              attempt = _args.length > 2 && _args[2] !== undefined ? _args[2] : 1;
              _context.p = 1;
              _context.n = 2;
              return requestFn();
            case 2:
              return _context.a(2, _context.v);
            case 3:
              _context.p = 3;
              _t = _context.v;
              axiosError = _t; // Check if we should retry
              if (!(attempt <= retryConfig.retries && (_retryConfig$retryCon = retryConfig.retryCondition) !== null && _retryConfig$retryCon !== void 0 && _retryConfig$retryCon.call(retryConfig, axiosError))) {
                _context.n = 5;
                break;
              }
              // Calculate delay with exponential backoff
              delay = retryConfig.retryDelay * Math.pow(2, attempt - 1); // Wait before retrying
              _context.n = 4;
              return new Promise(function (resolve) {
                return setTimeout(resolve, delay);
              });
            case 4:
              return _context.a(2, this.retryRequest(requestFn, retryConfig, attempt + 1));
            case 5:
              throw _t;
            case 6:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function retryRequest(_x) {
        return _retryRequest.apply(this, arguments);
      }
      return retryRequest;
    }())
  }, {
    key: "setupInterceptors",
    value: function setupInterceptors() {
      var _this = this;
      // Request interceptor - Token ekleme
      this.client.interceptors.request.use(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(config) {
          var token;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return _react_native_async_storage_async_storage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.getItem('auth_token');
              case 1:
                token = _context2.v;
                if (token && config.headers) {
                  config.headers.Authorization = "Bearer ".concat(token);
                }
                return _context2.a(2, config);
            }
          }, _callee2);
        }));
        return function (_x2) {
          return _ref.apply(this, arguments);
        };
      }(), function (error) {
        return Promise.reject(error);
      });

      // Response interceptor - Error handling
      this.client.interceptors.response.use(function (response) {
        return response;
      }, /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(error) {
          var _error$config, status, token, _this$errorHandler, userMessage, apiError, errorMessage, enhancedError, _error$config2, _this$errorHandler2, _userMessage, _this$errorHandler3, _userMessage2, _t2;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                if (!error.response) {
                  _context3.n = 8;
                  break;
                }
                // Server responded with error
                status = error.response.status;
                if (!(status === 401)) {
                  _context3.n = 7;
                  break;
                }
                _context3.n = 1;
                return _react_native_async_storage_async_storage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.getItem('auth_token');
              case 1:
                token = _context3.v;
                if (!token) {
                  _context3.n = 6;
                  break;
                }
                _context3.p = 2;
                _context3.n = 5;
                break;
              case 3:
                _context3.p = 3;
                _t2 = _context3.v;
                _context3.n = 4;
                return _react_native_async_storage_async_storage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.removeItem('auth_token');
              case 4:
                // Dispatch logout action if available
                if (typeof window !== 'undefined' && window.authStore) {
                  window.authStore.getState().logout();
                }
              case 5:
                _context3.n = 7;
                break;
              case 6:
                _context3.n = 7;
                return _react_native_async_storage_async_storage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.removeItem('auth_token');
              case 7:
                // Use error handler for user-friendly messages
                _this$errorHandler = _this.errorHandler(error, {
                  action: 'api_request',
                  additionalData: {
                    status: status,
                    url: (_error$config = error.config) === null || _error$config === void 0 ? void 0 : _error$config.url
                  }
                }), userMessage = _this$errorHandler.userMessage; // Create new error with user-friendly message
                apiError = error.response.data;
                errorMessage = (apiError === null || apiError === void 0 ? void 0 : apiError.error) || userMessage;
                enhancedError = new Error(errorMessage);
                enhancedError.status = status;
                enhancedError.originalError = error;
                return _context3.a(2, Promise.reject(enhancedError));
              case 8:
                if (!error.request) {
                  _context3.n = 9;
                  break;
                }
                // Request made but no response
                _this$errorHandler2 = _this.errorHandler(error, {
                  action: 'api_request',
                  additionalData: {
                    url: (_error$config2 = error.config) === null || _error$config2 === void 0 ? void 0 : _error$config2.url
                  }
                }), _userMessage = _this$errorHandler2.userMessage;
                return _context3.a(2, Promise.reject(new Error(_userMessage)));
              case 9:
                // Something else happened
                _this$errorHandler3 = _this.errorHandler(error, {
                  action: 'api_request'
                }), _userMessage2 = _this$errorHandler3.userMessage;
                return _context3.a(2, Promise.reject(new Error(_userMessage2)));
              case 10:
                return _context3.a(2);
            }
          }, _callee3, null, [[2, 3]]);
        }));
        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(url, config, retryConfig) {
        var _this2 = this;
        var response, _error$response, apiError, errorMessage, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              // Development modda request loglama
              if (false) // removed by dead control flow
{}
              _context4.n = 1;
              return this.retryRequest(function () {
                return _this2.client.get(url, config);
              }, retryConfig);
            case 1:
              response = _context4.v;
              // Development modda response loglama
              if (false) // removed by dead control flow
{}

              // Response format kontrolü
              if (response.data) {
                _context4.n = 2;
                break;
              }
              throw new Error('Geçersiz yanıt formatı. Sunucudan yanıt alınamadı.');
            case 2:
              if (!(response.data.success && response.data.data)) {
                _context4.n = 3;
                break;
              }
              return _context4.a(2, response.data.data);
            case 3:
              throw new Error(response.data.error || 'İşlem başarısız oldu');
            case 4:
              _context4.p = 4;
              _t3 = _context4.v;
              // Development modda hata loglama
              if (false) // removed by dead control flow
{}
              if (!(_t3 instanceof axios__WEBPACK_IMPORTED_MODULE_0__/* .AxiosError */ .pe)) {
                _context4.n = 6;
                break;
              }
              if (!((_error$response = _t3.response) !== null && _error$response !== void 0 && _error$response.data)) {
                _context4.n = 5;
                break;
              }
              apiError = _t3.response.data;
              errorMessage = apiError.error || _t3.message || 'Bilinmeyen bir hata oluştu';
              throw new Error(errorMessage);
            case 5:
              if (!_t3.request) {
                _context4.n = 6;
                break;
              }
              throw new Error('Ağ hatası. Lütfen bağlantınızı kontrol edin.');
            case 6:
              if (!(_t3 instanceof Error)) {
                _context4.n = 7;
                break;
              }
              throw _t3;
            case 7:
              throw new Error('Beklenmeyen bir hata oluştu');
            case 8:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 4]]);
      }));
      function get(_x4, _x5, _x6) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(url, data, config, retryConfig) {
        var _this3 = this;
        var response, _error$response2, apiError, errorMessage, _t4;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              // Development modda request loglama
              if (false) // removed by dead control flow
{}
              _context5.n = 1;
              return this.retryRequest(function () {
                return _this3.client.post(url, data, config);
              }, retryConfig);
            case 1:
              response = _context5.v;
              // Development modda response loglama
              if (false) // removed by dead control flow
{}

              // Response format kontrolü
              if (response.data) {
                _context5.n = 2;
                break;
              }
              throw new Error('Geçersiz yanıt formatı. Sunucudan yanıt alınamadı.');
            case 2:
              if (!(response.data.success && response.data.data)) {
                _context5.n = 3;
                break;
              }
              return _context5.a(2, response.data.data);
            case 3:
              throw new Error(response.data.error || 'İşlem başarısız oldu');
            case 4:
              _context5.p = 4;
              _t4 = _context5.v;
              // Development modda hata loglama
              if (false) // removed by dead control flow
{}
              if (!(_t4 instanceof axios__WEBPACK_IMPORTED_MODULE_0__/* .AxiosError */ .pe)) {
                _context5.n = 6;
                break;
              }
              if (!((_error$response2 = _t4.response) !== null && _error$response2 !== void 0 && _error$response2.data)) {
                _context5.n = 5;
                break;
              }
              apiError = _t4.response.data; // Backend'den gelen hata mesajını kullan
              // Eğer response.data bir object ise ve error property'si varsa kullan
              errorMessage = 'Bilinmeyen bir hata oluştu';
              if (apiError && _typeof(apiError) === 'object') {
                // ApiResponse formatı: {success: false, error: "..."}
                if ('error' in apiError && typeof apiError.error === 'string') {
                  errorMessage = apiError.error;
                } else if ('message' in apiError && typeof apiError.message === 'string') {
                  errorMessage = apiError.message;
                }
              } else if (typeof apiError === 'string') {
                errorMessage = apiError;
              } else if (_t4.message) {
                errorMessage = _t4.message;
              }
              throw new Error(errorMessage);
            case 5:
              if (!_t4.request) {
                _context5.n = 6;
                break;
              }
              throw new Error('Ağ hatası. Lütfen bağlantınızı kontrol edin.');
            case 6:
              if (!(_t4 instanceof Error)) {
                _context5.n = 7;
                break;
              }
              throw _t4;
            case 7:
              throw new Error('Beklenmeyen bir hata oluştu');
            case 8:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 4]]);
      }));
      function post(_x7, _x8, _x9, _x0) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(url, data, config, retryConfig) {
        var _this4 = this;
        var response, _error$response3, apiError, errorMessage, _t5;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              // Development modda request loglama
              if (false) // removed by dead control flow
{}
              _context6.n = 1;
              return this.retryRequest(function () {
                return _this4.client.put(url, data, config);
              }, retryConfig);
            case 1:
              response = _context6.v;
              // Development modda response loglama
              if (false) // removed by dead control flow
{}

              // Response format kontrolü
              if (response.data) {
                _context6.n = 2;
                break;
              }
              throw new Error('Geçersiz yanıt formatı. Sunucudan yanıt alınamadı.');
            case 2:
              if (!(response.data.success && response.data.data)) {
                _context6.n = 3;
                break;
              }
              return _context6.a(2, response.data.data);
            case 3:
              throw new Error(response.data.error || 'İşlem başarısız oldu');
            case 4:
              _context6.p = 4;
              _t5 = _context6.v;
              // Development modda hata loglama
              if (false) // removed by dead control flow
{}
              if (!(_t5 instanceof axios__WEBPACK_IMPORTED_MODULE_0__/* .AxiosError */ .pe)) {
                _context6.n = 6;
                break;
              }
              if (!((_error$response3 = _t5.response) !== null && _error$response3 !== void 0 && _error$response3.data)) {
                _context6.n = 5;
                break;
              }
              apiError = _t5.response.data;
              errorMessage = apiError.error || _t5.message || 'Bilinmeyen bir hata oluştu';
              throw new Error(errorMessage);
            case 5:
              if (!_t5.request) {
                _context6.n = 6;
                break;
              }
              throw new Error('Ağ hatası. Lütfen bağlantınızı kontrol edin.');
            case 6:
              if (!(_t5 instanceof Error)) {
                _context6.n = 7;
                break;
              }
              throw _t5;
            case 7:
              throw new Error('Beklenmeyen bir hata oluştu');
            case 8:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 4]]);
      }));
      function put(_x1, _x10, _x11, _x12) {
        return _put.apply(this, arguments);
      }
      return put;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(url, config, retryConfig) {
        var _this5 = this;
        var response, _error$response4, apiError, errorMessage, _t6;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              // Development modda request loglama
              if (false) // removed by dead control flow
{}
              _context7.n = 1;
              return this.retryRequest(function () {
                return _this5.client.delete(url, config);
              }, retryConfig);
            case 1:
              response = _context7.v;
              // Development modda response loglama
              if (false) // removed by dead control flow
{}

              // Response format kontrolü
              if (response.data) {
                _context7.n = 2;
                break;
              }
              throw new Error('Geçersiz yanıt formatı. Sunucudan yanıt alınamadı.');
            case 2:
              if (!(response.data.success && response.data.data)) {
                _context7.n = 3;
                break;
              }
              return _context7.a(2, response.data.data);
            case 3:
              throw new Error(response.data.error || 'İşlem başarısız oldu');
            case 4:
              _context7.p = 4;
              _t6 = _context7.v;
              // Development modda hata loglama
              if (false) // removed by dead control flow
{}
              if (!(_t6 instanceof axios__WEBPACK_IMPORTED_MODULE_0__/* .AxiosError */ .pe)) {
                _context7.n = 6;
                break;
              }
              if (!((_error$response4 = _t6.response) !== null && _error$response4 !== void 0 && _error$response4.data)) {
                _context7.n = 5;
                break;
              }
              apiError = _t6.response.data;
              errorMessage = apiError.error || _t6.message || 'Bilinmeyen bir hata oluştu';
              throw new Error(errorMessage);
            case 5:
              if (!_t6.request) {
                _context7.n = 6;
                break;
              }
              throw new Error('Ağ hatası. Lütfen bağlantınızı kontrol edin.');
            case 6:
              if (!(_t6 instanceof Error)) {
                _context7.n = 7;
                break;
              }
              throw _t6;
            case 7:
              throw new Error('Beklenmeyen bir hata oluştu');
            case 8:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 4]]);
      }));
      function _delete(_x13, _x14, _x15) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "setToken",
    value: function () {
      var _setToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(token) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!token) {
                _context8.n = 2;
                break;
              }
              _context8.n = 1;
              return _react_native_async_storage_async_storage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.setItem('auth_token', token);
            case 1:
              _context8.n = 3;
              break;
            case 2:
              _context8.n = 3;
              return _react_native_async_storage_async_storage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.removeItem('auth_token');
            case 3:
              return _context8.a(2);
          }
        }, _callee8);
      }));
      function setToken(_x16) {
        return _setToken.apply(this, arguments);
      }
      return setToken;
    }()
  }, {
    key: "getToken",
    value: function () {
      var _getToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              _context9.n = 1;
              return _react_native_async_storage_async_storage__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.getItem('auth_token');
            case 1:
              return _context9.a(2, _context9.v);
          }
        }, _callee9);
      }));
      function getToken() {
        return _getToken.apply(this, arguments);
      }
      return getToken;
    }()
  }]);
}();
var apiClient = new ApiClient();

/***/ }),

/***/ 6046:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Icon */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4848);



// Material Symbols Outlined font-family; ensure link is in public/index.html
var Icon = function Icon(_ref) {
  var name = _ref.name,
    style = _ref.style;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
    style: [{
      fontFamily: 'Material Symbols Outlined',
      fontSize: 20
    }, style],
    children: name
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ }),

/***/ 6378:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(5338);
// EXTERNAL MODULE: ./node_modules/react-native-web/dist/index.js + 205 modules
var dist = __webpack_require__(8618);
// EXTERNAL MODULE: ./node_modules/react-router-dom/dist/index.js + 1 modules
var react_router_dom_dist = __webpack_require__(1080);
// EXTERNAL MODULE: ./src/stores/authStore.ts + 1 modules
var authStore = __webpack_require__(1104);
// EXTERNAL MODULE: ./src/stores/navigationStore.ts
var navigationStore = __webpack_require__(7328);
// EXTERNAL MODULE: ./src/theme/colors.ts
var colors = __webpack_require__(8504);
// EXTERNAL MODULE: ./src/theme/spacing.ts
var spacing = __webpack_require__(7559);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./src/router/AppRouter.tsx
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








// Lazy load screens for code splitting

var OnboardingScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return __webpack_require__.e(/* import() */ 252).then(__webpack_require__.bind(__webpack_require__, 2252));
});
var LoginScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(96), __webpack_require__.e(144)]).then(__webpack_require__.bind(__webpack_require__, 3144));
});
var RegisterScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(96), __webpack_require__.e(668)]).then(__webpack_require__.bind(__webpack_require__, 5668));
});
var HomeScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(96), __webpack_require__.e(614), __webpack_require__.e(769), __webpack_require__.e(321)]).then(__webpack_require__.bind(__webpack_require__, 2321));
});
var FriendsScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(522), __webpack_require__.e(335)]).then(__webpack_require__.bind(__webpack_require__, 1335));
});
var ProfileScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(522), __webpack_require__.e(542)]).then(__webpack_require__.bind(__webpack_require__, 5542));
});
var SettingsScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return __webpack_require__.e(/* import() */ 927).then(__webpack_require__.bind(__webpack_require__, 4927));
});
var EditProfileScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return __webpack_require__.e(/* import() */ 517).then(__webpack_require__.bind(__webpack_require__, 5517));
});
var ChangePasswordScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return __webpack_require__.e(/* import() */ 807).then(__webpack_require__.bind(__webpack_require__, 6807));
});
var ChangeEmailScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return __webpack_require__.e(/* import() */ 150).then(__webpack_require__.bind(__webpack_require__, 2150));
});
var RoomScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(96), __webpack_require__.e(614), __webpack_require__.e(769), __webpack_require__.e(287)]).then(__webpack_require__.bind(__webpack_require__, 7668));
});
var MatchingScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return Promise.all(/* import() */[__webpack_require__.e(96), __webpack_require__.e(614), __webpack_require__.e(639)]).then(__webpack_require__.bind(__webpack_require__, 9639));
});
var InviteScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return __webpack_require__.e(/* import() */ 31).then(__webpack_require__.bind(__webpack_require__, 31));
});
var NotificationsScreen = /*#__PURE__*/(0,react.lazy)(function () {
  return __webpack_require__.e(/* import() */ 59).then(__webpack_require__.bind(__webpack_require__, 6059));
});

// Loading fallback component
var LoadingFallback = function LoadingFallback() {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
    style: styles.loadingContainer,
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* ActivityIndicator */.$$, {
      size: "large",
      color: colors/* colors */.T.primaryIndigo
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
      style: styles.loadingText,
      children: "Y\xFCkleniyor..."
    })]
  });
};

// Wrapper component for RoomScreen to get params
var RoomScreenWrapper = function RoomScreenWrapper() {
  var _useParams = (0,react_router_dom_dist/* useParams */.g)(),
    roomId = _useParams.roomId;
  var navigate = (0,react_router_dom_dist/* useNavigate */.Zp)();
  return /*#__PURE__*/(0,jsx_runtime.jsx)(RoomScreen, {
    roomId: roomId,
    onBack: function onBack() {
      return navigate(-1);
    },
    onLeave: function onLeave() {
      return navigate('/home');
    }
  });
};

// Wrapper component for InviteScreen to get params
var InviteScreenWrapper = function InviteScreenWrapper() {
  var _useParams2 = (0,react_router_dom_dist/* useParams */.g)(),
    roomId = _useParams2.roomId;
  var navigate = (0,react_router_dom_dist/* useNavigate */.Zp)();
  return /*#__PURE__*/(0,jsx_runtime.jsx)(InviteScreen, {
    roomId: roomId,
    onBack: function onBack() {
      return navigate(-1);
    }
  });
};

// Protected route wrapper
var ProtectedRoute = function ProtectedRoute(_ref) {
  var children = _ref.children;
  var _useAuthStore = (0,authStore/* useAuthStore */.n)(),
    isAuthenticated = _useAuthStore.isAuthenticated,
    loadUser = _useAuthStore.loadUser;
  var _React$useState = react.useState(true),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    loading = _React$useState2[0],
    setLoading = _React$useState2[1];
  var navigate = (0,react_router_dom_dist/* useNavigate */.Zp)();
  react.useEffect(function () {
    var checkAuth = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return loadUser();
            case 1:
              setLoading(false);
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function checkAuth() {
        return _ref2.apply(this, arguments);
      };
    }();
    checkAuth();
  }, [loadUser]);
  react.useEffect(function () {
    if (!loading && !isAuthenticated) {
      navigate('/login', {
        replace: true
      });
    }
  }, [loading, isAuthenticated, navigate]);
  if (loading) {
    return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {}); // Empty view while loading
  }
  if (!isAuthenticated) {
    return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {}); // Empty view while redirecting
  }
  return /*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: children
  });
};

// Public route wrapper (redirects to home if authenticated)
var PublicRoute = function PublicRoute(_ref3) {
  var children = _ref3.children;
  var _useAuthStore2 = (0,authStore/* useAuthStore */.n)(),
    isAuthenticated = _useAuthStore2.isAuthenticated,
    loadUser = _useAuthStore2.loadUser;
  var _React$useState3 = react.useState(true),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    loading = _React$useState4[0],
    setLoading = _React$useState4[1];
  var navigate = (0,react_router_dom_dist/* useNavigate */.Zp)();
  react.useEffect(function () {
    var checkAuth = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return loadUser();
            case 1:
              setLoading(false);
            case 2:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return function checkAuth() {
        return _ref4.apply(this, arguments);
      };
    }();
    checkAuth();
  }, [loadUser]);
  react.useEffect(function () {
    if (!loading && isAuthenticated) {
      navigate('/home', {
        replace: true
      });
    }
  }, [loading, isAuthenticated, navigate]);
  if (loading) {
    return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {}); // Empty view while loading
  }
  if (isAuthenticated) {
    return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {}); // Empty view while redirecting
  }
  return /*#__PURE__*/(0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
    children: children
  });
};
var AppRouter = function AppRouter() {
  var navigate = (0,react_router_dom_dist/* useNavigate */.Zp)();
  var setRouterNavigate = (0,navigationStore/* useNavigationStore */.l)(function (state) {
    return state.setRouterNavigate;
  });

  // Set router navigate function in navigation store
  react.useEffect(function () {
    setRouterNavigate(navigate);
  }, [navigate, setRouterNavigate]);
  return /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
    fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)(react_router_dom_dist/* Routes */.BV, {
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Navigate */.C5, {
          to: "/home",
          replace: true
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/onboarding",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(PublicRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(OnboardingScreen, {
              onComplete: function onComplete() {
                return navigate('/login');
              }
            })
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/login",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(PublicRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(LoginScreen, {
              onSwitch: function onSwitch() {
                return navigate('/register');
              },
              onLogin: function onLogin() {
                return navigate('/home');
              }
            })
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/register",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(PublicRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(RegisterScreen, {
              onSwitch: function onSwitch() {
                return navigate('/login');
              },
              onRegisterSuccess: function onRegisterSuccess() {
                return navigate('/home');
              }
            })
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/home",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(HomeScreen, {
              onTabChange: function onTabChange() {}
            })
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/friends",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(FriendsScreen, {
              onTabChange: function onTabChange() {}
            })
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/profile",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(ProfileScreen, {
              onTabChange: function onTabChange() {}
            })
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/settings",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(SettingsScreen, {
              onTabChange: function onTabChange() {}
            })
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/settings/edit-profile",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(EditProfileScreen, {})
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/settings/change-password",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(ChangePasswordScreen, {})
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/settings/change-email",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(ChangeEmailScreen, {})
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/room/:roomId",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(RoomScreenWrapper, {})
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/matching",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(MatchingScreen, {
              onBack: function onBack() {}
            })
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/invite/:roomId",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(InviteScreenWrapper, {})
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "/notifications",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(ProtectedRoute, {
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/(0,jsx_runtime.jsx)(LoadingFallback, {}),
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(NotificationsScreen, {})
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Route */.qh, {
        path: "*",
        element: /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* Navigate */.C5, {
          to: "/home",
          replace: true
        })
      })]
    })
  });
};
var styles = dist/* StyleSheet */.vv.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors/* colors */.T.backgroundLightMain,
    gap: spacing/* spacing */.Y.md
  },
  loadingText: {
    fontSize: 16,
    color: colors/* colors */.T.textSecondary
  }
});
/* harmony default export */ const router_AppRouter = (AppRouter);
// EXTERNAL MODULE: ./src/components/common/Icon.tsx
var Icon = __webpack_require__(6046);
// EXTERNAL MODULE: ./src/components/common/Button.tsx
var Button = __webpack_require__(7885);
// EXTERNAL MODULE: ./src/theme/typography.ts
var typography = __webpack_require__(7997);
// EXTERNAL MODULE: ./src/theme/radius.ts
var radius = __webpack_require__(5194);
// EXTERNAL MODULE: ./src/utils/errorHandler.ts
var errorHandler = __webpack_require__(9718);
;// ./src/utils/errorTracking.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Error Tracking Utility
 * Prepared for integration with error tracking services (e.g., Sentry)
 */

// Default configuration
var defaultConfig = {
  enabled: "production" === 'production',
  environment: "production" || 0
};
var config = defaultConfig;

/**
 * Initialize error tracking service
 */
function initErrorTracking(customConfig) {
  config = _objectSpread(_objectSpread({}, defaultConfig), customConfig);
  if (!config.enabled) {
    return;
  }

  // TODO: Initialize Sentry or other error tracking service
  // Example for Sentry:
  // if (config.service === 'sentry' && config.dsn) {
  //   Sentry.init({
  //     dsn: config.dsn,
  //     environment: config.environment,
  //     release: config.release,
  //     integrations: [new BrowserTracing()],
  //     tracesSampleRate: 1.0,
  //   });
  // }
}

/**
 * Capture exception for error tracking
 */
function captureException(error, context) {
  var severity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'error';
  if (!config.enabled) {
    if (false) // removed by dead control flow
{}
    return;
  }

  // TODO: Send to error tracking service
  // Example for Sentry:
  // Sentry.captureException(error, {
  //   level: severity === 'critical' ? 'fatal' : severity,
  //   tags: context,
  //   extra: {
  //     context,
  //   },
  // });
}

/**
 * Capture message for error tracking
 */
function captureMessage(message) {
  var severity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  var context = arguments.length > 2 ? arguments[2] : undefined;
  if (!config.enabled) {
    if (false) // removed by dead control flow
{}
    return;
  }

  // TODO: Send to error tracking service
  // Example for Sentry:
  // Sentry.captureMessage(message, {
  //   level: severity === 'critical' ? 'fatal' : severity,
  //   tags: context,
  //   extra: {
  //     context,
  //   },
  // });
}

/**
 * Set user context for error tracking
 */
function setUserContext(userId, userData) {
  if (!config.enabled) {
    return;
  }

  // TODO: Set user context in error tracking service
  // Example for Sentry:
  // Sentry.setUser({
  //   id: userId,
  //   ...userData,
  // });
}

/**
 * Clear user context
 */
function clearUserContext() {
  if (!config.enabled) {
    return;
  }

  // TODO: Clear user context in error tracking service
  // Example for Sentry:
  // Sentry.setUser(null);
}

/**
 * Add breadcrumb for error tracking
 */
function addBreadcrumb(message, category) {
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'info';
  var data = arguments.length > 3 ? arguments[3] : undefined;
  if (!config.enabled) {
    return;
  }

  // TODO: Add breadcrumb to error tracking service
  // Example for Sentry:
  // Sentry.addBreadcrumb({
  //   message,
  //   category,
  //   level,
  //   data,
  // });
}
;// ./src/components/common/ErrorBoundary.tsx
function ErrorBoundary_typeof(o) { "@babel/helpers - typeof"; return ErrorBoundary_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ErrorBoundary_typeof(o); }
function ErrorBoundary_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function ErrorBoundary_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ErrorBoundary_ownKeys(Object(t), !0).forEach(function (r) { ErrorBoundary_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ErrorBoundary_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, ErrorBoundary_toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == ErrorBoundary_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function ErrorBoundary_defineProperty(e, r, t) { return (r = ErrorBoundary_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function ErrorBoundary_toPropertyKey(t) { var i = ErrorBoundary_toPrimitive(t, "string"); return "symbol" == ErrorBoundary_typeof(i) ? i : i + ""; }
function ErrorBoundary_toPrimitive(t, r) { if ("object" != ErrorBoundary_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ErrorBoundary_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }











var ErrorBoundary = /*#__PURE__*/function (_Component) {
  function ErrorBoundary(props) {
    var _this;
    _classCallCheck(this, ErrorBoundary);
    _this = _callSuper(this, ErrorBoundary, [props]);
    ErrorBoundary_defineProperty(_this, "handleReset", function () {
      _this.setState({
        hasError: false,
        error: null,
        errorInfo: null
      });
    });
    _this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
    return _this;
  }
  _inherits(ErrorBoundary, _Component);
  return _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      var _errorInfo$componentS, _this$props$onError, _this$props;
      // Log error to console
      console.error('ErrorBoundary caught an error:', error, errorInfo);

      // Log error using error handler utility
      var context = {
        component: ((_errorInfo$componentS = errorInfo.componentStack) === null || _errorInfo$componentS === void 0 || (_errorInfo$componentS = _errorInfo$componentS.split('\n')[1]) === null || _errorInfo$componentS === void 0 ? void 0 : _errorInfo$componentS.trim()) || 'Unknown',
        action: 'component_render'
      };
      (0,errorHandler/* logError */.vV)({
        message: error.message,
        originalError: error,
        severity: 'high',
        context: context,
        timestamp: new Date()
      });

      // Capture exception for error tracking
      captureException(error, context, 'high');

      // Call onError callback if provided
      (_this$props$onError = (_this$props = this.props).onError) === null || _this$props$onError === void 0 || _this$props$onError.call(_this$props, error, errorInfo);

      // Update state with error info
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        var _this$state$error;
        if (this.props.fallback) {
          return this.props.fallback;
        }
        return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
          style: ErrorBoundary_styles.container,
          children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
            style: ErrorBoundary_styles.content,
            children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
              style: ErrorBoundary_styles.iconContainer,
              children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
                name: "error_outline",
                style: ErrorBoundary_styles.icon
              })
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
              style: ErrorBoundary_styles.title,
              children: "Bir Hata Olu\u015Ftu"
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
              style: ErrorBoundary_styles.message,
              children: ((_this$state$error = this.state.error) === null || _this$state$error === void 0 ? void 0 : _this$state$error.message) || 'Beklenmeyen bir hata oluştu'
            }), (typeof __DEV__ !== 'undefined' ? __DEV__ : "production" !== 'production') && this.state.error && /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
              style: ErrorBoundary_styles.errorDetails,
              children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
                style: ErrorBoundary_styles.errorText,
                children: this.state.error.toString()
              }), this.state.errorInfo && /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
                style: ErrorBoundary_styles.errorStack,
                children: this.state.errorInfo.componentStack
              })]
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
              style: ErrorBoundary_styles.actions,
              children: /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.A, {
                title: "Yeniden Dene",
                onPress: this.handleReset,
                variant: "primary",
                style: ErrorBoundary_styles.button
              })
            })]
          })
        });
      }
      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true,
        error: error,
        errorInfo: null
      };
    }
  }]);
}(react.Component);
var ErrorBoundary_styles = dist/* StyleSheet */.vv.create({
  container: {
    flex: 1,
    backgroundColor: colors/* colors */.T.backgroundDarkMain,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing/* spacing */.Y.xl
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%'
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "".concat(colors/* colors */.T.danger, "20"),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing/* spacing */.Y.xl
  },
  icon: {
    fontSize: 40,
    color: colors/* colors */.T.danger
  },
  title: ErrorBoundary_objectSpread(ErrorBoundary_objectSpread({}, typography/* typography */.I.heading), {}, {
    fontSize: 24,
    color: colors/* colors */.T.textPrimaryLight,
    marginBottom: spacing/* spacing */.Y.md,
    textAlign: 'center'
  }),
  message: ErrorBoundary_objectSpread(ErrorBoundary_objectSpread({}, typography/* typography */.I.body), {}, {
    color: colors/* colors */.T.textSecondaryMain,
    textAlign: 'center',
    marginBottom: spacing/* spacing */.Y.xl
  }),
  errorDetails: {
    width: '100%',
    backgroundColor: colors/* colors */.T.cardDark,
    borderRadius: radius/* radius */.r.md,
    padding: spacing/* spacing */.Y.md,
    marginBottom: spacing/* spacing */.Y.xl,
    maxHeight: 200
  },
  errorText: ErrorBoundary_objectSpread(ErrorBoundary_objectSpread({}, typography/* typography */.I.caption), {}, {
    color: colors/* colors */.T.danger,
    fontFamily: 'monospace',
    fontSize: 12
  }),
  errorStack: ErrorBoundary_objectSpread(ErrorBoundary_objectSpread({}, typography/* typography */.I.caption), {}, {
    color: colors/* colors */.T.textSecondaryMain,
    fontFamily: 'monospace',
    fontSize: 10,
    marginTop: spacing/* spacing */.Y.sm
  }),
  actions: {
    width: '100%'
  },
  button: {
    width: '100%'
  }
});
/* harmony default export */ const common_ErrorBoundary = (ErrorBoundary);
// EXTERNAL MODULE: ./src/stores/toastStore.ts
var toastStore = __webpack_require__(791);
;// ./src/components/ui/Toast.tsx
function Toast_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function Toast_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? Toast_ownKeys(Object(t), !0).forEach(function (r) { Toast_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Toast_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function Toast_defineProperty(e, r, t) { return (r = Toast_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function Toast_toPropertyKey(t) { var i = Toast_toPrimitive(t, "string"); return "symbol" == Toast_typeof(i) ? i : i + ""; }
function Toast_toPrimitive(t, r) { if ("object" != Toast_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Toast_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Toast_typeof(o) { "@babel/helpers - typeof"; return Toast_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Toast_typeof(o); }








var Toast = function Toast(_ref) {
  var message = _ref.message,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'info' : _ref$type,
    style = _ref.style;
  // Renk ve ikon ayarları
  var getToastConfig = function getToastConfig() {
    switch (type) {
      case 'success':
        return {
          bg: '#10b981',
          bgLight: 'rgba(16, 185, 129, 0.1)',
          textColor: '#ffffff',
          icon: 'check_circle',
          iconColor: '#ffffff'
        };
      case 'error':
        return {
          bg: '#ef4444',
          bgLight: 'rgba(239, 68, 68, 0.1)',
          textColor: '#ffffff',
          icon: 'error',
          iconColor: '#ffffff'
        };
      case 'warning':
        return {
          bg: '#f59e0b',
          bgLight: 'rgba(245, 158, 11, 0.1)',
          textColor: '#ffffff',
          icon: 'warning',
          iconColor: '#ffffff'
        };
      default:
        return {
          bg: colors/* colors */.T.primaryIndigo,
          bgLight: 'rgba(100, 103, 242, 0.1)',
          textColor: '#ffffff',
          icon: 'info',
          iconColor: '#ffffff'
        };
    }
  };
  var config = getToastConfig();

  // JSON string'leri temizle ve kullanıcı dostu mesajlara çevir
  var cleanMessage = function cleanMessage(msg) {
    if (!msg || typeof msg !== 'string') {
      return 'Bir hata oluştu';
    }
    var trimmed = msg.trim();

    // Eğer mesaj JSON gibi görünüyorsa, parse etmeyi dene
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        var parsed = JSON.parse(trimmed);

        // Eğer direkt message property'si varsa
        if (parsed.message && typeof parsed.message === 'string') {
          return parsed.message;
        }

        // Eğer error property'si varsa
        if (parsed.error && typeof parsed.error === 'string') {
          return parsed.error;
        }

        // Eğer errors array'i varsa
        if (Array.isArray(parsed.errors) && parsed.errors.length > 0) {
          var firstError = parsed.errors[0];
          if (typeof firstError === 'string') {
            return firstError;
          }
          if (firstError && firstError.message) {
            return firstError.message;
          }
        }

        // Eğer direkt array ise (ZodError formatı gibi)
        if (Array.isArray(parsed) && parsed.length > 0) {
          var firstItem = parsed[0];
          // ZodError formatı: { origin, code, path, message }
          if (firstItem && Toast_typeof(firstItem) === 'object') {
            if (firstItem.message && typeof firstItem.message === 'string') {
              return firstItem.message;
            }
            // Eğer path varsa, daha açıklayıcı bir mesaj oluştur
            if (firstItem.path && Array.isArray(firstItem.path) && firstItem.path.length > 0) {
              var fieldName = firstItem.path[0];
              if (firstItem.message) {
                return "".concat(fieldName, ": ").concat(firstItem.message);
              }
            }
          }
        }

        // Eğer object ise ve içinde anlamlı bir mesaj yoksa
        if (Toast_typeof(parsed) === 'object' && parsed !== null) {
          // Tüm string property'leri kontrol et
          for (var _i = 0, _arr = ['message', 'error', 'msg', 'description']; _i < _arr.length; _i++) {
            var key = _arr[_i];
            if (parsed[key] && typeof parsed[key] === 'string') {
              return parsed[key];
            }
          }
        }
      } catch (_unused) {
        // JSON parse edilemezse, mesajın başında JSON varsa kaldır
        // Örneğin: "[ { "origin": "string"... ]" gibi durumlar için
        if (trimmed.length > 100) {
          // Çok uzun JSON string'ler için genel mesaj
          return 'Bir hata oluştu. Lütfen tekrar deneyin.';
        }
      }
    }

    // Eğer mesaj çok uzunsa ve JSON gibi görünüyorsa
    if (msg.length > 200 && (msg.includes('"origin"') || msg.includes('"code"') || msg.includes('"path"'))) {
      return 'Girdiğiniz bilgileri kontrol edin.';
    }

    // Normal mesaj ise olduğu gibi döndür
    return msg;
  };
  var displayMessage = cleanMessage(message);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
    style: [Toast_styles.container, Toast_objectSpread({
      backgroundColor: config.bg
    }, dist/* Platform */.OD.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      default: {
        shadowColor: config.bg,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
      }
    })), style],
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
      style: Toast_styles.iconContainer,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
        name: config.icon,
        style: [Toast_styles.icon, {
          color: config.iconColor
        }]
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
      style: [Toast_styles.text, {
        color: config.textColor
      }],
      numberOfLines: 0,
      children: displayMessage
    })]
  });
};
var Toast_styles = dist/* StyleSheet */.vv.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing/* spacing */.Y.md,
    paddingHorizontal: spacing/* spacing */.Y.lg,
    borderRadius: radius/* radius */.r.lg,
    minHeight: 56,
    maxWidth: '100%'
  },
  iconContainer: {
    marginRight: spacing/* spacing */.Y.sm,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 24
  },
  text: Toast_objectSpread(Toast_objectSpread({}, typography/* typography */.I.body), {}, {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    flexWrap: 'wrap' // Allow text to wrap
  })
});
/* harmony default export */ const ui_Toast = (Toast);
;// ./src/components/ui/ToastContainer.tsx
function ToastContainer_typeof(o) { "@babel/helpers - typeof"; return ToastContainer_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ToastContainer_typeof(o); }
function ToastContainer_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function ToastContainer_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ToastContainer_ownKeys(Object(t), !0).forEach(function (r) { ToastContainer_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ToastContainer_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function ToastContainer_defineProperty(e, r, t) { return (r = ToastContainer_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function ToastContainer_toPropertyKey(t) { var i = ToastContainer_toPrimitive(t, "string"); return "symbol" == ToastContainer_typeof(i) ? i : i + ""; }
function ToastContainer_toPrimitive(t, r) { if ("object" != ToastContainer_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ToastContainer_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var ToastItem = function ToastItem(_ref) {
  var toast = _ref.toast,
    onRemove = _ref.onRemove;
  var slideAnim = (0,react.useRef)(new dist/* Animated */.kh.Value(-100)).current;
  var opacityAnim = (0,react.useRef)(new dist/* Animated */.kh.Value(0)).current;
  (0,react.useEffect)(function () {
    // Giriş animasyonu
    dist/* Animated */.kh.parallel([dist/* Animated */.kh.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: false,
      // Changed to false for web compatibility
      tension: 50,
      friction: 8
    }), dist/* Animated */.kh.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false // Changed to false for web compatibility
    })]).start();
  }, []);
  var handleRemove = function handleRemove() {
    dist/* Animated */.kh.parallel([dist/* Animated */.kh.timing(slideAnim, {
      toValue: -100,
      duration: 250,
      useNativeDriver: false // Changed to false for web compatibility
    }), dist/* Animated */.kh.timing(opacityAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false // Changed to false for web compatibility
    })]).start(function () {
      onRemove(toast.id);
    });
  };
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Animated */.kh.View, {
    style: [ToastContainer_styles.toastWrapper, {
      transform: [{
        translateX: slideAnim
      }],
      opacity: opacityAnim
    }, {
      pointerEvents: 'auto'
    }],
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(ui_Toast, {
      message: toast.message,
      type: toast.type,
      style: ToastContainer_styles.toast
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
      style: ToastContainer_styles.closeButton,
      onPress: handleRemove,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
        name: "close",
        style: ToastContainer_styles.closeIcon
      })
    })]
  });
};
var ToastContainer = function ToastContainer() {
  var toasts = (0,toastStore/* useToastStore */.W)(function (state) {
    return state.toasts;
  });
  var removeToast = (0,toastStore/* useToastStore */.W)(function (state) {
    return state.removeToast;
  });
  if (toasts.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
    style: [ToastContainer_styles.container, {
      pointerEvents: 'box-none'
    }],
    children: toasts.map(function (toast) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(ToastItem, {
        toast: toast,
        onRemove: removeToast
      }, toast.id);
    })
  });
};
var ToastContainer_styles = dist/* StyleSheet */.vv.create({
  container: ToastContainer_objectSpread({
    position: 'absolute',
    top: dist/* Platform */.OD.select({
      web: 20,
      default: 50
    }),
    right: spacing/* spacing */.Y.md,
    left: spacing/* spacing */.Y.md,
    alignItems: 'flex-end',
    zIndex: 99999,
    // Increased z-index
    gap: spacing/* spacing */.Y.sm
  }, dist/* Platform */.OD.select({
    web: {
      maxWidth: 500,
      // Increased from 420
      alignSelf: 'flex-end',
      position: 'fixed' // Use fixed positioning on web
    }
  })),
  toastWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    // Increased from 420
    gap: spacing/* spacing */.Y.sm
  },
  toast: {
    flex: 1
  },
  closeButton: ToastContainer_objectSpread({
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }, dist/* Platform */.OD.select({
    web: {
      cursor: 'pointer'
    }
  })),
  closeIcon: {
    fontSize: 18,
    color: '#ffffff'
  }
});
/* harmony default export */ const ui_ToastContainer = (ToastContainer);
;// ./App.tsx








var App = function App() {
  return /*#__PURE__*/(0,jsx_runtime.jsx)(common_ErrorBoundary, {
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(react_router_dom_dist/* BrowserRouter */.Kd, {
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: App_styles.container,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(router_AppRouter, {}), /*#__PURE__*/(0,jsx_runtime.jsx)(ui_ToastContainer, {})]
      })
    })
  });
};
var App_styles = dist/* StyleSheet */.vv.create({
  container: {
    flex: 1,
    backgroundColor: colors/* colors */.T.backgroundDark
  }
});
/* harmony default export */ const App_0 = (App);
;// ./src/utils/performance.ts
function performance_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return performance_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (performance_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, performance_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, performance_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), performance_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", performance_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), performance_regeneratorDefine2(u), performance_regeneratorDefine2(u, o, "Generator"), performance_regeneratorDefine2(u, n, function () { return this; }), performance_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (performance_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function performance_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } performance_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { performance_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, performance_regeneratorDefine2(e, r, n, t); }
function performance_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function performance_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { performance_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { performance_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Performance Monitoring Utility
 * Tracks Web Vitals and performance metrics
 */

/**
 * Web Vitals thresholds
 */
var WEB_VITALS_THRESHOLDS = {
  LCP: {
    good: 2500,
    poor: 4000
  },
  // Largest Contentful Paint
  FID: {
    good: 100,
    poor: 300
  },
  // First Input Delay
  CLS: {
    good: 0.1,
    poor: 0.25
  },
  // Cumulative Layout Shift
  FCP: {
    good: 1800,
    poor: 3000
  },
  // First Contentful Paint
  TTFB: {
    good: 800,
    poor: 1800
  } // Time to First Byte
};

/**
 * Get performance rating based on threshold
 */
function getRating(name, value) {
  var threshold = WEB_VITALS_THRESHOLDS[name];
  if (!threshold) {
    return 'good';
  }
  if (value <= threshold.good) {
    return 'good';
  } else if (value <= threshold.poor) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}

/**
 * Report Web Vitals (if web-vitals library is available)
 */
function reportWebVitals(onPerfEntry) {
  if (typeof window === 'undefined' || !onPerfEntry) {
    return;
  }

  // TODO: Install and use web-vitals library
  // Example:
  // import {onCLS, onFID, onFCP, onLCP, onTTFB} from 'web-vitals';
  // onCLS(onPerfEntry);
  // onFID(onPerfEntry);
  // onFCP(onPerfEntry);
  // onLCP(onPerfEntry);
  // onTTFB(onPerfEntry);
}

/**
 * Measure function execution time
 */
function measurePerformance(name, fn, callback) {
  var start = performance.now();
  var result = fn();
  var end = performance.now();
  var duration = end - start;
  if (false) // removed by dead control flow
{}
  callback === null || callback === void 0 || callback(duration);
  return result;
}

/**
 * Measure async function execution time
 */
function measureAsyncPerformance(_x, _x2, _x3) {
  return _measureAsyncPerformance.apply(this, arguments);
}

/**
 * Create performance mark
 */
function _measureAsyncPerformance() {
  _measureAsyncPerformance = performance_asyncToGenerator(/*#__PURE__*/performance_regenerator().m(function _callee(name, fn, callback) {
    var start, result, end, duration;
    return performance_regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          start = performance.now();
          _context.n = 1;
          return fn();
        case 1:
          result = _context.v;
          end = performance.now();
          duration = end - start;
          if (false) // removed by dead control flow
{}
          callback === null || callback === void 0 || callback(duration);
          return _context.a(2, result);
      }
    }, _callee);
  }));
  return _measureAsyncPerformance.apply(this, arguments);
}
function mark(name) {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name);
  }
}

/**
 * Measure between two marks
 */
function measure(measureName, startMark, endMark) {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      performance.measure(measureName, startMark, endMark);
      var entries = performance.getEntriesByName(measureName);
      return entries[entries.length - 1] || null;
    } catch (error) {
      console.warn("[Performance] Failed to measure ".concat(measureName, ":"), error);
      return null;
    }
  }
  return null;
}

/**
 * Get all performance entries
 */
function getPerformanceEntries() {
  if (typeof performance !== 'undefined' && performance.getEntries) {
    return performance.getEntries();
  }
  return [];
}

/**
 * Clear performance entries
 */
function clearPerformanceEntries() {
  if (typeof performance !== 'undefined' && performance.clearMarks && performance.clearMeasures) {
    performance.clearMarks();
    performance.clearMeasures();
  }
}

/**
 * Track bundle size (for development)
 */
function trackBundleSize() {
  if (false) // removed by dead control flow
{ var totalSize, scripts; }
}
;// ./src/web/index.jsx






// Initialize error tracking

initErrorTracking({
  enabled: "production" === 'production',
  environment: "production" || 0
});

// Report Web Vitals
if (true) {
  reportWebVitals(function (metric) {
    // TODO: Send metrics to analytics service
    console.log('[WebVitals]', metric);
  });
}

// Register service worker for PWA
if ('serviceWorker' in navigator && "production" === 'production') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
      console.log('ServiceWorker registered:', registration.scope);
    }).catch(function (error) {
      console.error('ServiceWorker registration failed:', error);
    });
  });
}
var container = document.getElementById('root');
if (container) {
  var root = (0,client/* createRoot */.H)(container);
  root.render(/*#__PURE__*/(0,jsx_runtime.jsx)(react.StrictMode, {
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(App_0, {})
  }));
} else {
  console.error('Root element not found');
}

/***/ }),

/***/ 7328:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ useNavigationStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1621);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

// Screen to URL mapping
var screenToUrl = function screenToUrl(screen, params) {
  switch (screen) {
    case 'home':
      return '/home';
    case 'friends':
      return '/friends';
    case 'profile':
      return '/profile';
    case 'settings':
      return '/settings';
    case 'room':
      return params !== null && params !== void 0 && params.roomId ? "/room/".concat(params.roomId) : '/home';
    case 'matching':
      return '/matching';
    case 'invite':
      return params !== null && params !== void 0 && params.roomId ? "/invite/".concat(params.roomId) : '/home';
    case 'notifications':
      return '/notifications';
    case 'editProfile':
      return '/settings/edit-profile';
    case 'changeEmail':
      return '/settings/change-email';
    case 'changePassword':
      return '/settings/change-password';
    case 'login':
      return '/login';
    case 'register':
      return '/register';
    default:
      return '/home';
  }
};
var useNavigationStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .vt)(function (set, get) {
  return {
    stack: [{
      screen: 'home'
    }],
    modal: null,
    routerNavigate: null,
    setRouterNavigate: function setRouterNavigate(navigate) {
      set({
        routerNavigate: navigate
      });
    },
    navigate: function navigate(screen, params) {
      var url = screenToUrl(screen, params);
      var state = get();

      // Update internal stack
      set({
        stack: [].concat(_toConsumableArray(state.stack), [{
          screen: screen,
          params: params
        }])
      });

      // Update URL using React Router
      if (state.routerNavigate) {
        state.routerNavigate(url);
      }
    },
    goBack: function goBack() {
      var state = get();
      if (state.stack.length > 1) {
        // Update internal stack
        set({
          stack: state.stack.slice(0, -1)
        });

        // Navigate back using React Router
        if (state.routerNavigate) {
          state.routerNavigate(-1);
        }
      }
    },
    replace: function replace(screen, params) {
      var url = screenToUrl(screen, params);
      var state = get();

      // Update internal stack
      if (state.stack.length > 0) {
        set({
          stack: [].concat(_toConsumableArray(state.stack.slice(0, -1)), [{
            screen: screen,
            params: params
          }])
        });
      } else {
        set({
          stack: [{
            screen: screen,
            params: params
          }]
        });
      }

      // Replace URL using React Router
      if (state.routerNavigate) {
        state.routerNavigate(url);
      }
    },
    reset: function reset() {
      set({
        stack: [{
          screen: 'home'
        }],
        modal: null
      });
    },
    openModal: function openModal(screen, params) {
      set({
        modal: {
          screen: screen,
          params: params
        }
      });
    },
    closeModal: function closeModal() {
      set({
        modal: null
      });
    },
    getCurrentScreen: function getCurrentScreen() {
      var _stack;
      var state = get();
      var stack = state.stack;
      return ((_stack = stack[stack.length - 1]) === null || _stack === void 0 ? void 0 : _stack.screen) || 'home';
    },
    getCurrentParams: function getCurrentParams() {
      var _stack2;
      var state = get();
      var stack = state.stack;
      return (_stack2 = stack[stack.length - 1]) === null || _stack2 === void 0 ? void 0 : _stack2.params;
    }
  };
});

/***/ }),

/***/ 7559:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ spacing)
/* harmony export */ });
var spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
};

/***/ }),

/***/ 7685:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i3: () => (/* binding */ API_CONFIG),
/* harmony export */   ld: () => (/* binding */ WEBSOCKET_CONFIG),
/* harmony export */   lt: () => (/* binding */ TOAST_CONFIG)
/* harmony export */ });
/* unused harmony export PAGINATION */
/**
 * App-wide constants
 */

// API Configuration
var API_CONFIG = {
  TIMEOUT: 10000,
  // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 second initial delay
};

// WebSocket Configuration
var WEBSOCKET_CONFIG = {
  CONNECTION_TIMEOUT: 20000,
  // 20 seconds
  RECONNECT_DELAY: 1000,
  // 1 second initial delay
  MAX_RECONNECT_DELAY: 30000,
  // 30 seconds max delay
  MAX_RECONNECT_ATTEMPTS: 5,
  PING_INTERVAL: 25000,
  // 25 seconds
  PING_TIMEOUT: 60000 // 60 seconds
};

// Toast Configuration
var TOAST_CONFIG = {
  DEFAULT_DURATION: 3000,
  // 3 seconds
  ERROR_DURATION: 5000 // 5 seconds for errors
};

// Pagination
var PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
};

/***/ }),

/***/ 7885:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Button */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var _theme_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8504);
/* harmony import */ var _theme_spacing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7559);
/* harmony import */ var _theme_typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7997);
/* harmony import */ var _theme_radius__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5194);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6046);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4848);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }








var sizeStyles = {
  sm: {
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.sm,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.lg
  },
  md: {
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.md,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.xl
  },
  lg: {
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.lg,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.xl
  }
};
var Button = function Button(_ref) {
  var title = _ref.title,
    onPress = _ref.onPress,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'md' : _ref$size,
    _style = _ref.style,
    textStyle = _ref.textStyle,
    disabled = _ref.disabled,
    fullWidth = _ref.fullWidth,
    rightIcon = _ref.rightIcon;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
    onPress: onPress,
    disabled: disabled,
    accessibilityRole: "button",
    accessibilityLabel: title,
    accessibilityState: {
      disabled: !!disabled
    },
    style: function style(_ref2) {
      var hovered = _ref2.hovered,
        pressed = _ref2.pressed;
      return [styles.base, sizeStyles[size], variant === 'primary' && styles.primary, variant === 'outline' && styles.outline, variant === 'ghost' && styles.ghost, fullWidth && {
        width: '100%'
      }, hovered && variant === 'primary' && styles.primaryHover, hovered && variant === 'outline' && styles.outlineHover, pressed && styles.pressed, disabled && styles.disabled, _style];
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.row,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: [styles.text, variant === 'outline' && styles.textOutline, variant === 'ghost' && styles.textGhost, disabled && styles.textDisabled, textStyle],
        children: title
      }), rightIcon ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Icon__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, {
        name: rightIcon,
        style: styles.rightIcon
      }) : null]
    })
  });
};
var styles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  base: {
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_5__/* .radius */ .r.full,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.xs
  },
  primary: {
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.primary
  },
  primaryHover: {
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.primaryHover
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.primary
  },
  outlineHover: {
    borderColor: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.primaryHover
  },
  ghost: {
    backgroundColor: 'transparent'
  },
  pressed: {
    transform: [{
      scale: 0.99
    }]
  },
  disabled: {
    opacity: 0.6
  },
  text: _objectSpread(_objectSpread({}, _theme_typography__WEBPACK_IMPORTED_MODULE_4__/* .typography */ .I.bodyBold), {}, {
    color: '#fff'
  }),
  textOutline: {
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.primary
  },
  textGhost: {
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.textPrimary
  },
  textDisabled: {
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.textSecondary
  },
  rightIcon: {
    color: '#111827',
    fontSize: 18
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ 7997:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ typography)
/* harmony export */ });
var typography = {
  fontFamily: 'Inter, sans-serif',
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34
  },
  h2: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22
  },
  caption: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18
  }
};

/***/ }),

/***/ 8504:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ colors)
/* harmony export */ });
var colors = {
  // Primary colors - varies by screen
  primary: '#f9f506',
  // Yellow for auth screens
  primaryHover: '#eae605',
  primaryIndigo: '#6467f2',
  // For main app
  primaryBlue: '#4848e5',
  // For register

  // Background colors
  backgroundDark: '#23220f',
  // Auth screens dark
  backgroundDarkMain: '#101122',
  // Main app dark
  backgroundLight: '#f8f8f5',
  // Auth screens light
  backgroundLightMain: '#f6f6f8',
  // Main app light

  // Surface colors
  navDark: '#0F172A',
  cardDark: '#1E293B',
  surfaceDark: '#1b1b32',
  // Text colors
  textPrimary: '#1c1c0d',
  // Dark mode text
  textPrimaryLight: '#e2e8f0',
  // Light mode text
  textSecondary: '#9e9d47',
  // Auth secondary
  textSecondaryMain: '#94a3b8',
  // Main app secondary
  textMuted: '#9293c9',
  // Border colors
  border: '#1e293b',
  borderDark: '#363663',
  borderLight: '#e9e8ce',
  // Other
  overlay: 'rgba(0,0,0,0.4)',
  success: '#10b981',
  danger: '#ef4444',
  male: '#3b82f6',
  female: '#ec4899'
};

/***/ }),

/***/ 9718:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JF: () => (/* binding */ createErrorHandler),
/* harmony export */   vV: () => (/* binding */ logError)
/* harmony export */ });
/* unused harmony exports getUserFriendlyMessage, getErrorSeverity, handleError */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Global Error Handler Utility
 * Provides centralized error handling, logging, and user-friendly error messages
 */

// User-friendly error message mappings
var ERROR_MESSAGES = {
  // Network errors
  'Network Error': 'Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.',
  'timeout': 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
  'Failed to fetch': 'Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.',
  // Authentication errors
  'Unauthorized': 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.',
  'Forbidden': 'Bu işlem için yetkiniz bulunmamaktadır.',
  'Token expired': 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.',
  // Validation errors
  'Validation error': 'Girdiğiniz bilgiler geçersiz. Lütfen kontrol edin.',
  'Invalid input': 'Girdiğiniz bilgiler geçersiz. Lütfen kontrol edin.',
  // Server errors
  'Internal Server Error': 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
  'Service Unavailable': 'Servis şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
  // WebSocket errors
  'WebSocket connection failed': 'Real-time bağlantı kurulamadı. Sayfayı yenileyin.',
  'Socket timeout': 'Bağlantı zaman aşımına uğradı. Sayfayı yenileyin.',
  // Default
  'default': 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
};

/**
 * Get user-friendly error message
 */
function getUserFriendlyMessage(error) {
  var errorMessage = typeof error === 'string' ? error : error.message;

  // Check for exact matches first
  if (ERROR_MESSAGES[errorMessage]) {
    return ERROR_MESSAGES[errorMessage];
  }

  // Check for partial matches (case-insensitive)
  var lowerMessage = errorMessage.toLowerCase();
  for (var _i = 0, _Object$entries = Object.entries(ERROR_MESSAGES); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      message = _Object$entries$_i[1];
    if (lowerMessage.includes(key.toLowerCase())) {
      return message;
    }
  }

  // Return default message
  return ERROR_MESSAGES.default;
}

/**
 * Determine error severity
 */
function getErrorSeverity(error, context) {
  var errorMessage = typeof error === 'string' ? error : error.message;
  var lowerMessage = errorMessage.toLowerCase();

  // Critical errors
  if (lowerMessage.includes('critical') || lowerMessage.includes('fatal') || (context === null || context === void 0 ? void 0 : context.action) === 'payment' && lowerMessage.includes('error')) {
    return 'critical';
  }

  // High severity errors
  if (lowerMessage.includes('unauthorized') || lowerMessage.includes('forbidden') || lowerMessage.includes('token') || lowerMessage.includes('authentication')) {
    return 'high';
  }

  // Medium severity errors
  if (lowerMessage.includes('network') || lowerMessage.includes('timeout') || lowerMessage.includes('server error') || lowerMessage.includes('service unavailable')) {
    return 'medium';
  }

  // Low severity (default)
  return 'low';
}

/**
 * Log error (prepared for future error tracking service integration)
 */
function logError(errorInfo) {
  var message = errorInfo.message,
    originalError = errorInfo.originalError,
    severity = errorInfo.severity,
    context = errorInfo.context,
    timestamp = errorInfo.timestamp;

  // Console logging (development)
  if (false) // removed by dead control flow
{}

  // TODO: Integrate with error tracking service (e.g., Sentry)
  // if (errorTrackingService) {
  //   errorTrackingService.captureException(originalError || new Error(message), {
  //     level: severity,
  //     tags: context,
  //   });
  // }
}

/**
 * Handle error and return user-friendly message
 */
function handleError(error, context) {
  var originalError = typeof error === 'string' ? new Error(error) : error;
  var userMessage = getUserFriendlyMessage(error);
  var severity = getErrorSeverity(error, context);
  var errorInfo = {
    message: originalError.message,
    originalError: originalError,
    severity: severity,
    context: context,
    timestamp: new Date()
  };
  logError(errorInfo);

  // Determine if error is retryable
  var shouldRetry = severity === 'low' || severity === 'medium' || (typeof error === 'string' ? error : error.message).toLowerCase().includes('timeout') || (typeof error === 'string' ? error : error.message).toLowerCase().includes('network');
  return {
    userMessage: userMessage,
    severity: severity,
    shouldRetry: shouldRetry
  };
}

/**
 * Create error handler function for specific context
 */
function createErrorHandler(context) {
  return function (error, additionalContext) {
    return handleError(error, _objectSpread(_objectSpread({}, context), additionalContext));
  };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "chunk." + {"31":"922c42bec0ad9042b0eb","59":"cf8613c930bbb03f5662","144":"b333914094657d3cd8a6","150":"12fe2fb966d541792802","252":"637819aaf4c6e3e62c63","287":"c6f7f5f3f595b58f9a06","321":"6ff2cd0aab3043477394","335":"6f54e6f9b031a21124dd","517":"c6112e6868a0c1e4aa51","522":"bdd761f68c97f4357150","542":"f3b02ce99613aea09462","614":"7d23ed4be57a2165ad30","639":"27e1e7419085df295ad6","668":"8f1b69adc13b4d2f4115","769":"2aeacd1f64e4e57584c4","807":"1fe077dcc47179601180","927":"560641d5cec3e94e4e4f"}[chunkId] + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "matchtalk-web:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			792: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [644,96], () => (__webpack_require__(6378)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;