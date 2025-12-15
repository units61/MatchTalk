"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[639],{

/***/ 321:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ useWebSocket)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6880);
/* harmony import */ var _stores_authStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1104);
/* harmony import */ var _stores_websocketEventStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5337);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }




var useWebSocket = function useWebSocket() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _useAuthStore = (0,_stores_authStore__WEBPACK_IMPORTED_MODULE_2__/* .useAuthStore */ .n)(),
    isAuthenticated = _useAuthStore.isAuthenticated;
  var onConnect = options.onConnect,
    onDisconnect = options.onDisconnect,
    onError = options.onError;
  var callbacksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(options);
  var setupListeners = (0,_stores_websocketEventStore__WEBPACK_IMPORTED_MODULE_3__/* .useWebSocketEventStore */ .C)(function (state) {
    return state.setupListeners;
  });

  // Update callbacks ref when options change
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    callbacksRef.current = options;
  }, [options]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!isAuthenticated) {
      _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.disconnect();
      return;
    }
    var mounted = true;
    var connect = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var socket, _callbacksRef$current7, _callbacksRef$current8, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.connect();
            case 1:
              socket = _context.v;
              if (mounted) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              socket.on('connect', function () {
                var _callbacksRef$current, _callbacksRef$current2;
                (_callbacksRef$current = (_callbacksRef$current2 = callbacksRef.current).onConnect) === null || _callbacksRef$current === void 0 || _callbacksRef$current.call(_callbacksRef$current2);
                // Setup event listeners when connected
                setupListeners();
              });
              socket.on('disconnect', function () {
                var _callbacksRef$current3, _callbacksRef$current4;
                (_callbacksRef$current3 = (_callbacksRef$current4 = callbacksRef.current).onDisconnect) === null || _callbacksRef$current3 === void 0 || _callbacksRef$current3.call(_callbacksRef$current4);
              });
              socket.on('connect_error', function (error) {
                var _callbacksRef$current5, _callbacksRef$current6;
                (_callbacksRef$current5 = (_callbacksRef$current6 = callbacksRef.current).onError) === null || _callbacksRef$current5 === void 0 || _callbacksRef$current5.call(_callbacksRef$current6, error);
              });
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              if (mounted) {
                (_callbacksRef$current7 = (_callbacksRef$current8 = callbacksRef.current).onError) === null || _callbacksRef$current7 === void 0 || _callbacksRef$current7.call(_callbacksRef$current8, _t);
              }
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[0, 3]]);
      }));
      return function connect() {
        return _ref.apply(this, arguments);
      };
    }();
    connect();
    return function () {
      mounted = false;
      _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.disconnect();
    };
  }, [isAuthenticated]);
  return {
    socket: _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.getSocket(),
    isConnected: _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.isConnected(),
    joinRoom: function () {
      var _joinRoom = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(roomId) {
        var errorMessage, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.joinRoom(roomId);
            case 1:
              _context2.n = 3;
              break;
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              errorMessage = _t2 instanceof Error ? _t2.message : String(_t2);
              console.error('WebSocket joinRoom error:', errorMessage, _t2);
              throw new Error("Odaya ba\u011Flan\u0131lamad\u0131: ".concat(errorMessage));
            case 3:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 2]]);
      }));
      function joinRoom(_x) {
        return _joinRoom.apply(this, arguments);
      }
      return joinRoom;
    }(),
    leaveRoom: function () {
      var _leaveRoom = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(roomId) {
        var _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.leaveRoom(roomId);
            case 1:
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              console.warn('WebSocket leaveRoom error:', _t3);
              // Don't throw, leaving room is not critical
            case 3:
              return _context3.a(2);
          }
        }, _callee3, null, [[0, 2]]);
      }));
      function leaveRoom(_x2) {
        return _leaveRoom.apply(this, arguments);
      }
      return leaveRoom;
    }(),
    voteExtension: function () {
      var _voteExtension = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(roomId, vote) {
        var _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.voteExtension(roomId, vote);
            case 1:
              _context4.n = 3;
              break;
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              console.error('WebSocket voteExtension error:', _t4);
              throw _t4;
            case 3:
              return _context4.a(2);
          }
        }, _callee4, null, [[0, 2]]);
      }));
      function voteExtension(_x3, _x4) {
        return _voteExtension.apply(this, arguments);
      }
      return voteExtension;
    }(),
    joinMatching: function () {
      var _joinMatching = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.joinMatching();
            case 1:
              _context5.n = 3;
              break;
            case 2:
              _context5.p = 2;
              _t5 = _context5.v;
              console.error('WebSocket joinMatching error:', _t5);
              throw _t5;
            case 3:
              return _context5.a(2);
          }
        }, _callee5, null, [[0, 2]]);
      }));
      function joinMatching() {
        return _joinMatching.apply(this, arguments);
      }
      return joinMatching;
    }(),
    leaveMatching: function () {
      var _leaveMatching = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.leaveMatching();
            case 1:
              _context6.n = 3;
              break;
            case 2:
              _context6.p = 2;
              _t6 = _context6.v;
              console.warn('WebSocket leaveMatching error:', _t6);
            case 3:
              return _context6.a(2);
          }
        }, _callee6, null, [[0, 2]]);
      }));
      function leaveMatching() {
        return _leaveMatching.apply(this, arguments);
      }
      return leaveMatching;
    }(),
    getMatchingStatus: function () {
      var _getMatchingStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.getMatchingStatus();
            case 1:
              _context7.n = 3;
              break;
            case 2:
              _context7.p = 2;
              _t7 = _context7.v;
              console.error('WebSocket getMatchingStatus error:', _t7);
              throw _t7;
            case 3:
              return _context7.a(2);
          }
        }, _callee7, null, [[0, 2]]);
      }));
      function getMatchingStatus() {
        return _getMatchingStatus.apply(this, arguments);
      }
      return getMatchingStatus;
    }(),
    on: _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.on.bind(_lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V),
    off: _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.off.bind(_lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V)
  };
};

/***/ }),

/***/ 9639:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var _components_common_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6046);
/* harmony import */ var _components_common_Avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6074);
/* harmony import */ var _theme_colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8504);
/* harmony import */ var _theme_spacing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7559);
/* harmony import */ var _theme_radius__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5194);
/* harmony import */ var _hooks_useWebSocket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(321);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4848);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }









var MatchingScreen = function MatchingScreen(_ref) {
  var onBack = _ref.onBack,
    onMatchComplete = _ref.onMatchComplete;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    progress = _useState2[0],
    setProgress = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    currentCount = _useState4[0],
    setCurrentCount = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    participants = _useState6[0],
    setParticipants = _useState6[1];
  var targetCount = 8;
  var _useWebSocket = (0,_hooks_useWebSocket__WEBPACK_IMPORTED_MODULE_7__/* .useWebSocket */ .h)(),
    joinMatching = _useWebSocket.joinMatching,
    leaveMatching = _useWebSocket.leaveMatching,
    on = _useWebSocket.on,
    off = _useWebSocket.off,
    getMatchingStatus = _useWebSocket.getMatchingStatus;

  // Join matching queue on mount
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    joinMatching();
    getMatchingStatus();

    // Listen for matching progress updates
    var handleMatchingProgress = function handleMatchingProgress(data) {
      setCurrentCount(data.totalWaiting);
      var progressPercent = Math.min(data.totalWaiting / targetCount * 100, 100);
      setProgress(progressPercent);

      // Update participants
      var filledParticipants = data.users.map(function (user) {
        return {
          id: user.id,
          name: user.name,
          avatar: undefined,
          isFilled: true
        };
      });

      // Fill remaining slots with empty participants
      var emptySlots = targetCount - filledParticipants.length;
      var emptyParticipants = Array.from({
        length: emptySlots
      }, function (_, i) {
        return {
          id: "empty-".concat(i),
          name: '',
          avatar: undefined,
          isFilled: false
        };
      });
      setParticipants([].concat(_toConsumableArray(filledParticipants), emptyParticipants).slice(0, targetCount));
    };

    // Listen for match found
    var handleMatchFound = function handleMatchFound(data) {
      setProgress(100);
      // Store room info for navigation
      // You can use navigation or state management here
      setTimeout(function () {
        onMatchComplete === null || onMatchComplete === void 0 || onMatchComplete(data.roomId);
      }, 1000);
    };
    on('matching-progress', handleMatchingProgress);
    on('matching-joined', function () {
      getMatchingStatus();
    });
    on('match-found', handleMatchFound);
    return function () {
      off('matching-progress', handleMatchingProgress);
      off('match-found', handleMatchFound);
      leaveMatching();
    };
  }, [joinMatching, leaveMatching, on, off, getMatchingStatus, onMatchComplete]);

  // Avatar positions in a circle (8 positions)
  var avatarPositions = [{
    top: 0,
    left: '50%',
    transform: [{
      translateX: -36
    }, {
      translateY: -8
    }]
  },
  // Top Center
  {
    top: '15%',
    right: '15%'
  },
  // Top Right
  {
    top: '50%',
    right: 0,
    transform: [{
      translateY: -36
    }, {
      translateX: 8
    }]
  },
  // Right
  {
    bottom: '15%',
    right: '15%'
  },
  // Bottom Right
  {
    bottom: 0,
    left: '50%',
    transform: [{
      translateX: -36
    }, {
      translateY: 8
    }]
  },
  // Bottom Center
  {
    bottom: '15%',
    left: '15%'
  },
  // Bottom Left
  {
    top: '50%',
    left: 0,
    transform: [{
      translateY: -36
    }, {
      translateX: -8
    }]
  },
  // Left
  {
    top: '15%',
    left: '15%'
  } // Top Left
  ];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: styles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.backgroundGlow
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: styles.backButton,
        onPress: onBack,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
          name: "arrow_back",
          style: styles.backIcon
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: styles.headerTitle,
        children: "MatchTalk"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.headerSpacer
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.mainContent,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.statusContainer,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.statusTitle,
          children: "E\u015Fle\u015Ftirme yap\u0131l\u0131yor..."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.statusSubtitle,
          children: "Sizin i\xE7in en uygun oday\u0131 ar\u0131yoruz"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.avatarCircleContainer,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.decorativeCircle1
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.decorativeCircle2
        }), participants.map(function (participant, index) {
          var position = avatarPositions[index] || {};
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: [styles.avatarSlot, position],
            children: participant.isFilled && participant.avatar ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.filledAvatar,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_common_Avatar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                uri: participant.avatar,
                name: participant.name,
                size: 72
              })
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.emptyAvatar,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                name: "person",
                style: styles.emptyIcon
              })
            })
          }, participant.id);
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.bottomArea,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.progressHeader,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.progressText,
          children: ["Odada ", currentCount, " ki\u015Fi var"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.loadingDots,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: [styles.dot, styles.dot1]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: [styles.dot, styles.dot2]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: [styles.dot, styles.dot3]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.progressBarContainer,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: [styles.progressBarFill, {
            width: "".concat(progress, "%")
          }]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: styles.progressHint,
        children: ["Sohbet i\xE7in en az ", targetCount, " ki\u015Fi bekleniyor"]
      })]
    })]
  });
};
var styles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  container: _objectSpread({
    flex: 1,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.backgroundDark
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      minHeight: '100vh'
    }
  })),
  backgroundGlow: _objectSpread({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 256,
    height: 256,
    marginTop: -128,
    marginLeft: -128,
    backgroundColor: "".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.primary, "33"),
    borderRadius: 128
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      filter: 'blur(100px)'
    }
  })),
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xxl,
    paddingBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm,
    zIndex: 10
  },
  backButton: {
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.full
  },
  backIcon: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    paddingRight: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xl
  },
  headerSpacer: {
    width: 40
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.lg,
    position: 'relative'
  },
  statusContainer: {
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xxl,
    alignItems: 'center',
    zIndex: 10
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xs
  },
  statusSubtitle: {
    fontSize: 14,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary,
    textAlign: 'center'
  },
  avatarCircleContainer: {
    width: '100%',
    maxWidth: 340,
    aspectRatio: 1,
    position: 'relative'
  },
  decorativeCircle1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 160,
    height: 160,
    marginTop: -80,
    marginLeft: -80,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
    // Animation removed - web CSS animations not supported in React Native Web styles
  },
  decorativeCircle2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 240,
    height: 240,
    marginTop: -120,
    marginLeft: -120,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  avatarSlot: {
    position: 'absolute',
    width: 72,
    height: 72
  },
  filledAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.primary,
    overflow: 'hidden',
    shadowColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.primary,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 15
  },
  emptyAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary,
    backgroundColor: "".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary, "20"),
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyIcon: {
    fontSize: 24,
    color: "".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary, "80")
  },
  bottomArea: _objectSpread({
    width: '100%',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.lg,
    paddingBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xxl,
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.lg,
    zIndex: 10
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      backgroundColor: 'rgba(15, 23, 42, 0.8)'
    },
    default: {
      backgroundColor: '#0F172A',
      opacity: 0.8
    }
  })),
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xs
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary
  },
  loadingDots: {
    flexDirection: 'row',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xs / 2
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.primary
  },
  dot1: {
    // Animation removed - web CSS animations not supported in React Native Web styles
  },
  dot2: {
    // Animation removed - web CSS animations not supported in React Native Web styles
  },
  dot3: {
    // Animation removed - web CSS animations not supported in React Native Web styles
  },
  progressBarContainer: {
    height: 6,
    width: '100%',
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.cardDark,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.full,
    overflow: 'hidden',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.primary,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.full,
    shadowColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.primary,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.6,
    shadowRadius: 10
  },
  progressHint: {
    fontSize: 12,
    color: "".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary, "80"),
    textAlign: 'center',
    fontWeight: '300'
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MatchingScreen);

/***/ })

}]);