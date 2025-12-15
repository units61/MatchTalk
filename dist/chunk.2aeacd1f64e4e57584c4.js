"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[769],{

/***/ 3164:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  V: () => (/* binding */ useRoomsStore)
});

// EXTERNAL MODULE: ./node_modules/zustand/esm/index.mjs + 1 modules
var esm = __webpack_require__(1621);
// EXTERNAL MODULE: ./src/lib/apiClient.ts
var apiClient = __webpack_require__(5859);
;// ./src/services/api/roomsApi.ts
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var roomsApi = {
  /**
   * Aktif odaları listele
   */
  getRooms: function getRooms() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return apiClient/* apiClient */.u.get('/rooms');
          case 1:
            return _context.a(2, _context.v);
        }
      }, _callee);
    }))();
  },
  /**
   * Oda detaylarını getir
   */
  getRoomById: function getRoomById(id) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return apiClient/* apiClient */.u.get("/rooms/".concat(id));
          case 1:
            return _context2.a(2, _context2.v);
        }
      }, _callee2);
    }))();
  },
  /**
   * Oda oluştur
   */
  createRoom: function createRoom(input) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return apiClient/* apiClient */.u.post('/rooms', input);
          case 1:
            return _context3.a(2, _context3.v);
        }
      }, _callee3);
    }))();
  },
  /**
   * Odaya katıl
   */
  joinRoom: function joinRoom(roomId) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return apiClient/* apiClient */.u.post("/rooms/".concat(roomId, "/join"));
          case 1:
            return _context4.a(2, _context4.v);
        }
      }, _callee4);
    }))();
  },
  /**
   * Odadan ayrıl
   */
  leaveRoom: function leaveRoom(roomId) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return apiClient/* apiClient */.u.post("/rooms/".concat(roomId, "/leave"));
          case 1:
            return _context5.a(2, _context5.v);
        }
      }, _callee5);
    }))();
  }
};
;// ./src/stores/roomsStore.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function roomsStore_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return roomsStore_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (roomsStore_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, roomsStore_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, roomsStore_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), roomsStore_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", roomsStore_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), roomsStore_regeneratorDefine2(u), roomsStore_regeneratorDefine2(u, o, "Generator"), roomsStore_regeneratorDefine2(u, n, function () { return this; }), roomsStore_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (roomsStore_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function roomsStore_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } roomsStore_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { roomsStore_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, roomsStore_regeneratorDefine2(e, r, n, t); }
function roomsStore_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function roomsStore_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { roomsStore_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { roomsStore_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


var useRoomsStore = (0,esm/* create */.vt)(function (set, get) {
  return {
    rooms: [],
    currentRoom: null,
    loading: false,
    fetching: false,
    creating: false,
    joining: false,
    error: null,
    fetchRooms: function () {
      var _fetchRooms = roomsStore_asyncToGenerator(/*#__PURE__*/roomsStore_regenerator().m(function _callee() {
        var rooms, _t;
        return roomsStore_regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              set({
                fetching: true,
                error: null
              });
              _context.n = 1;
              return roomsApi.getRooms();
            case 1:
              rooms = _context.v;
              set({
                rooms: rooms,
                fetching: false,
                loading: false,
                error: null
              });
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              set({
                fetching: false,
                loading: false,
                error: _t instanceof Error ? _t.message : 'Odalar yüklenemedi'
              });
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      function fetchRooms() {
        return _fetchRooms.apply(this, arguments);
      }
      return fetchRooms;
    }(),
    createRoom: function () {
      var _createRoom = roomsStore_asyncToGenerator(/*#__PURE__*/roomsStore_regenerator().m(function _callee2(input) {
        var state, room, _t2, _t3;
        return roomsStore_regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              set({
                creating: true,
                loading: true,
                error: null
              });

              // Eğer kullanıcı zaten bir odadaysa, önce o odadan ayrıl
              state = get();
              if (!state.currentRoom) {
                _context2.n = 4;
                break;
              }
              console.log("[RoomsStore] Kullan\u0131c\u0131 zaten ".concat(state.currentRoom.id, " odas\u0131nda. \xD6nce odadan ayr\u0131l\u0131yor..."));
              _context2.p = 1;
              _context2.n = 2;
              return roomsApi.leaveRoom(state.currentRoom.id);
            case 2:
              console.log("[RoomsStore] Ba\u015Far\u0131yla ".concat(state.currentRoom.id, " odas\u0131ndan ayr\u0131ld\u0131"));
              // State'i güncelle
              set(function (prevState) {
                return {
                  rooms: prevState.rooms.filter(function (r) {
                    return r.id !== state.currentRoom.id;
                  }),
                  currentRoom: null
                };
              });
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.warn("[RoomsStore] Odadan ayr\u0131l\u0131rken hata olu\u015Ftu:", _t2);
              // Odadan ayrılma hatası kritik değil, yeni oda oluşturmayı denemeye devam et
            case 4:
              _context2.n = 5;
              return roomsApi.createRoom(input);
            case 5:
              room = _context2.v;
              set(function (state) {
                return {
                  rooms: [room].concat(_toConsumableArray(state.rooms)),
                  currentRoom: room,
                  creating: false,
                  loading: false,
                  error: null
                };
              });
              console.log("[RoomsStore] Yeni oda olu\u015Fturuldu: ".concat(room.id));
              return _context2.a(2, room);
            case 6:
              _context2.p = 6;
              _t3 = _context2.v;
              set({
                creating: false,
                loading: false,
                error: _t3 instanceof Error ? _t3.message : 'Oda oluşturulamadı'
              });
              console.error("[RoomsStore] Oda olu\u015Fturma hatas\u0131:", _t3);
              throw _t3;
            case 7:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 3], [0, 6]]);
      }));
      function createRoom(_x) {
        return _createRoom.apply(this, arguments);
      }
      return createRoom;
    }(),
    joinRoom: function () {
      var _joinRoom = roomsStore_asyncToGenerator(/*#__PURE__*/roomsStore_regenerator().m(function _callee3(roomId) {
        var room, _t4;
        return roomsStore_regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              set({
                joining: true,
                loading: true,
                error: null
              });
              _context3.n = 1;
              return roomsApi.joinRoom(roomId);
            case 1:
              room = _context3.v;
              set(function (state) {
                return {
                  rooms: state.rooms.map(function (r) {
                    return r.id === roomId ? room : r;
                  }),
                  currentRoom: room,
                  joining: false,
                  loading: false,
                  error: null
                };
              });
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t4 = _context3.v;
              set({
                joining: false,
                loading: false,
                error: _t4 instanceof Error ? _t4.message : 'Odaya katılamadı'
              });
              throw _t4;
            case 3:
              return _context3.a(2);
          }
        }, _callee3, null, [[0, 2]]);
      }));
      function joinRoom(_x2) {
        return _joinRoom.apply(this, arguments);
      }
      return joinRoom;
    }(),
    leaveRoom: function () {
      var _leaveRoom = roomsStore_asyncToGenerator(/*#__PURE__*/roomsStore_regenerator().m(function _callee4(roomId) {
        var _t5;
        return roomsStore_regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              set({
                loading: true,
                error: null
              });
              _context4.n = 1;
              return roomsApi.leaveRoom(roomId);
            case 1:
              set(function (state) {
                var _state$currentRoom;
                return {
                  rooms: state.rooms.filter(function (r) {
                    return r.id !== roomId;
                  }),
                  currentRoom: ((_state$currentRoom = state.currentRoom) === null || _state$currentRoom === void 0 ? void 0 : _state$currentRoom.id) === roomId ? null : state.currentRoom,
                  loading: false,
                  error: null
                };
              });
              _context4.n = 3;
              break;
            case 2:
              _context4.p = 2;
              _t5 = _context4.v;
              set({
                loading: false,
                error: _t5 instanceof Error ? _t5.message : 'Odadan ayrılamadı'
              });
              throw _t5;
            case 3:
              return _context4.a(2);
          }
        }, _callee4, null, [[0, 2]]);
      }));
      function leaveRoom(_x3) {
        return _leaveRoom.apply(this, arguments);
      }
      return leaveRoom;
    }(),
    setCurrentRoom: function setCurrentRoom(room) {
      set({
        currentRoom: room
      });
    },
    updateRoom: function updateRoom(roomId, updates) {
      set(function (state) {
        var _state$currentRoom2;
        return {
          rooms: state.rooms.map(function (r) {
            return r.id === roomId ? _objectSpread(_objectSpread({}, r), updates) : r;
          }),
          currentRoom: ((_state$currentRoom2 = state.currentRoom) === null || _state$currentRoom2 === void 0 ? void 0 : _state$currentRoom2.id) === roomId ? _objectSpread(_objectSpread({}, state.currentRoom), updates) : state.currentRoom
        };
      });
    },
    clearError: function clearError() {
      set({
        error: null
      });
    }
  };
});

/***/ }),

/***/ 3880:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Qs: () => (/* binding */ useResponsive)
});

// UNUSED EXPORTS: useBreakpoint, useIsDesktop, useIsMobile, useIsTablet

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
;// ./src/theme/breakpoints.ts
/**
 * Breakpoint System
 * Defines responsive breakpoints for the application
 */

var breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};
/**
 * Media query strings for use in CSS
 */
var mediaQueries = {
  xs: "(min-width: ".concat(breakpoints.xs, "px)"),
  sm: "(min-width: ".concat(breakpoints.sm, "px)"),
  md: "(min-width: ".concat(breakpoints.md, "px)"),
  lg: "(min-width: ".concat(breakpoints.lg, "px)"),
  xl: "(min-width: ".concat(breakpoints.xl, "px)"),
  '2xl': "(min-width: ".concat(breakpoints['2xl'], "px)")
};

/**
 * Max-width media queries
 */
var maxMediaQueries = {
  xs: "(max-width: ".concat(breakpoints.sm - 1, "px)"),
  sm: "(max-width: ".concat(breakpoints.md - 1, "px)"),
  md: "(max-width: ".concat(breakpoints.lg - 1, "px)"),
  lg: "(max-width: ".concat(breakpoints.xl - 1, "px)"),
  xl: "(max-width: ".concat(breakpoints['2xl'] - 1, "px)")
};

/**
 * Check if current viewport matches a breakpoint
 */
function matchesBreakpoint(breakpoint) {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.innerWidth >= breakpoints[breakpoint];
}

/**
 * Get current breakpoint based on viewport width
 */
function getCurrentBreakpoint() {
  if (typeof window === 'undefined') {
    return 'md';
  }
  var width = window.innerWidth;
  if (width >= breakpoints['2xl']) {
    return '2xl';
  } else if (width >= breakpoints.xl) {
    return 'xl';
  } else if (width >= breakpoints.lg) {
    return 'lg';
  } else if (width >= breakpoints.md) {
    return 'md';
  } else if (width >= breakpoints.sm) {
    return 'sm';
  } else {
    return 'xs';
  }
}

/**
 * Check if viewport is mobile
 */
function isMobile() {
  return !matchesBreakpoint('md');
}

/**
 * Check if viewport is tablet
 */
function isTablet() {
  return matchesBreakpoint('md') && !matchesBreakpoint('lg');
}

/**
 * Check if viewport is desktop
 */
function isDesktop() {
  return matchesBreakpoint('lg');
}
;// ./src/hooks/useResponsive.ts
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Responsive Hook
 * Provides responsive utilities and breakpoint detection
 */



/**
 * Hook for responsive design
 */
function useResponsive() {
  var _useState = (0,react.useState)(function () {
      if (typeof window !== 'undefined') {
        return getCurrentBreakpoint();
      }
      return 'md';
    }),
    _useState2 = _slicedToArray(_useState, 2),
    breakpoint = _useState2[0],
    setBreakpoint = _useState2[1];
  var _useState3 = (0,react.useState)(function () {
      if (typeof window !== 'undefined') {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
      return {
        width: 1024,
        height: 768
      };
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    dimensions = _useState4[0],
    setDimensions = _useState4[1];
  (0,react.useEffect)(function () {
    if (typeof window === 'undefined') {
      return;
    }
    var handleResize = function handleResize() {
      var newBreakpoint = getCurrentBreakpoint();
      setBreakpoint(newBreakpoint);
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return {
    breakpoint: breakpoint,
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    matches: matchesBreakpoint,
    width: dimensions.width,
    height: dimensions.height
  };
}

/**
 * Hook for specific breakpoint matching
 */
function useBreakpoint(targetBreakpoint) {
  var _useResponsive = useResponsive(),
    matches = _useResponsive.matches;
  return matches(targetBreakpoint);
}

/**
 * Hook for mobile detection
 */
function useIsMobile() {
  var _useResponsive2 = useResponsive(),
    isMobile = _useResponsive2.isMobile;
  return isMobile;
}

/**
 * Hook for tablet detection
 */
function useIsTablet() {
  var _useResponsive3 = useResponsive(),
    isTablet = _useResponsive3.isTablet;
  return isTablet;
}

/**
 * Hook for desktop detection
 */
function useIsDesktop() {
  var _useResponsive4 = useResponsive(),
    isDesktop = _useResponsive4.isDesktop;
  return isDesktop;
}

/***/ })

}]);