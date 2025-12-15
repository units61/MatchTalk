"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[287],{

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

/***/ 7668:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ room_RoomScreen)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/react-native-web/dist/index.js + 205 modules
var dist = __webpack_require__(8618);
// EXTERNAL MODULE: ./src/components/common/Icon.tsx
var Icon = __webpack_require__(6046);
// EXTERNAL MODULE: ./src/components/common/Avatar.tsx
var Avatar = __webpack_require__(6074);
// EXTERNAL MODULE: ./src/theme/typography.ts
var typography = __webpack_require__(7997);
// EXTERNAL MODULE: ./src/theme/colors.ts
var colors = __webpack_require__(8504);
// EXTERNAL MODULE: ./src/theme/spacing.ts
var spacing = __webpack_require__(7559);
// EXTERNAL MODULE: ./src/theme/radius.ts
var radius = __webpack_require__(5194);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./src/components/room/ParticipantAvatar.tsx
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









var ParticipantAvatar = function ParticipantAvatar(_ref) {
  var name = _ref.name,
    avatar = _ref.avatar,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 64 : _ref$size,
    isActiveSpeaker = _ref.isActiveSpeaker,
    isMuted = _ref.isMuted,
    isSpeaking = _ref.isSpeaking;
  var active = isActiveSpeaker || isSpeaking;
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
    style: styles.container,
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
      style: [styles.avatarWrapper, active && styles.activeSpeaker],
      children: [avatar ? /*#__PURE__*/(0,jsx_runtime.jsx)(Avatar/* default */.A, {
        uri: avatar,
        name: name,
        size: size
      }) : /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
        style: [styles.placeholderAvatar, {
          width: size,
          height: size
        }],
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
          style: [styles.placeholderText, {
            fontSize: size * 0.3
          }],
          children: name.split(' ').map(function (n) {
            return n[0];
          }).join('').toUpperCase().slice(0, 2)
        })
      }), isMuted && /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
        style: styles.mutedOverlay,
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
          name: "mic_off",
          style: styles.mutedIcon
        })
      }), active && /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
        style: styles.activeIndicator,
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
          name: "mic",
          style: styles.activeIcon
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
      style: styles.name,
      children: name
    })]
  });
};
var styles = dist/* StyleSheet */.vv.create({
  container: {
    alignItems: 'center'
  },
  avatarWrapper: {
    position: 'relative',
    borderRadius: radius/* radius */.r.full,
    borderWidth: 2,
    borderColor: colors/* colors */.T.border,
    overflow: 'hidden'
  },
  activeSpeaker: _objectSpread({
    borderWidth: 3,
    borderColor: colors/* colors */.T.primary
  }, dist/* Platform */.OD.select({
    web: {
      boxShadow: "0 0 10px ".concat(colors/* colors */.T.primary, "99")
    },
    default: {
      shadowColor: colors/* colors */.T.primary,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.6,
      shadowRadius: 10
    }
  })),
  placeholderAvatar: {
    backgroundColor: colors/* colors */.T.cardDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius/* radius */.r.full
  },
  placeholderText: {
    fontWeight: 'bold',
    color: colors/* colors */.T.textSecondary
  },
  mutedOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius/* radius */.r.full
  },
  mutedIcon: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors/* colors */.T.primary,
    borderRadius: radius/* radius */.r.full,
    padding: 4,
    borderWidth: 2,
    borderColor: colors/* colors */.T.backgroundDark
  },
  activeIcon: {
    fontSize: 12,
    color: '#fff'
  },
  name: _objectSpread(_objectSpread({}, typography/* typography */.I.caption), {}, {
    color: '#fff',
    marginTop: spacing/* spacing */.Y.xs,
    fontSize: 12,
    fontWeight: '500'
  })
});
/* harmony default export */ const room_ParticipantAvatar = (ParticipantAvatar);
// EXTERNAL MODULE: ./src/components/common/Button.tsx
var Button = __webpack_require__(7885);
;// ./src/components/room/VoteModal.tsx
function VoteModal_typeof(o) { "@babel/helpers - typeof"; return VoteModal_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, VoteModal_typeof(o); }
function VoteModal_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function VoteModal_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? VoteModal_ownKeys(Object(t), !0).forEach(function (r) { VoteModal_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : VoteModal_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function VoteModal_defineProperty(e, r, t) { return (r = VoteModal_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function VoteModal_toPropertyKey(t) { var i = VoteModal_toPrimitive(t, "string"); return "symbol" == VoteModal_typeof(i) ? i : i + ""; }
function VoteModal_toPrimitive(t, r) { if ("object" != VoteModal_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != VoteModal_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }








var VoteModal = function VoteModal(_ref) {
  var visible = _ref.visible,
    onVote = _ref.onVote,
    onClose = _ref.onClose,
    _ref$timeLeft = _ref.timeLeft,
    timeLeft = _ref$timeLeft === void 0 ? 10 : _ref$timeLeft;
  if (!visible) {
    return null;
  }
  return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
    style: VoteModal_styles.overlay,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
      style: VoteModal_styles.modal,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
        style: VoteModal_styles.title,
        children: "S\xFCreyi uzatal\u0131m m\u0131?"
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Text */.EY, {
        style: VoteModal_styles.desc,
        children: [timeLeft, " sn i\xE7inde oy ver"]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: VoteModal_styles.actions,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.A, {
          title: "Hay\u0131r",
          variant: "outline",
          onPress: function onPress() {
            return onVote('no');
          },
          fullWidth: true
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.A, {
          title: "Evet +3 dk",
          onPress: function onPress() {
            return onVote('yes');
          },
          fullWidth: true
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(Button/* default */.A, {
        title: "Kapat",
        variant: "ghost",
        onPress: onClose,
        fullWidth: true
      })]
    })
  });
};
var VoteModal_styles = dist/* StyleSheet */.vv.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors/* colors */.T.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing/* spacing */.Y.xl
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors/* colors */.T.cardDark,
    borderRadius: radius/* radius */.r.lg,
    padding: spacing/* spacing */.Y.xl,
    borderWidth: 1,
    borderColor: colors/* colors */.T.border
  },
  title: VoteModal_objectSpread(VoteModal_objectSpread({}, typography/* typography */.I.h2), {}, {
    color: colors/* colors */.T.textPrimary,
    marginBottom: spacing/* spacing */.Y.sm,
    textAlign: 'center'
  }),
  desc: VoteModal_objectSpread(VoteModal_objectSpread({}, typography/* typography */.I.body), {}, {
    color: colors/* colors */.T.textSecondary,
    marginBottom: spacing/* spacing */.Y.lg,
    textAlign: 'center'
  }),
  actions: {
    flexDirection: 'row',
    gap: spacing/* spacing */.Y.md,
    marginBottom: spacing/* spacing */.Y.md
  }
});
/* harmony default export */ const room_VoteModal = (VoteModal);
// EXTERNAL MODULE: ./src/hooks/useWebSocket.ts
var useWebSocket = __webpack_require__(321);
// EXTERNAL MODULE: ./src/stores/roomsStore.ts + 1 modules
var roomsStore = __webpack_require__(3164);
// EXTERNAL MODULE: ./node_modules/zustand/esm/index.mjs + 1 modules
var esm = __webpack_require__(1621);
// EXTERNAL MODULE: ./node_modules/agora-rtc-sdk-ng/AgoraRTC_N-production.js
var AgoraRTC_N_production = __webpack_require__(8634);
var AgoraRTC_N_production_default = /*#__PURE__*/__webpack_require__.n(AgoraRTC_N_production);
// EXTERNAL MODULE: ./src/lib/config.ts
var config = __webpack_require__(3064);
;// ./src/services/agora/agoraClient.ts
function agoraClient_typeof(o) { "@babel/helpers - typeof"; return agoraClient_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, agoraClient_typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, agoraClient_toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function agoraClient_defineProperty(e, r, t) { return (r = agoraClient_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function agoraClient_toPropertyKey(t) { var i = agoraClient_toPrimitive(t, "string"); return "symbol" == agoraClient_typeof(i) ? i : i + ""; }
function agoraClient_toPrimitive(t, r) { if ("object" != agoraClient_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != agoraClient_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var AgoraClient = /*#__PURE__*/function () {
  function AgoraClient() {
    _classCallCheck(this, AgoraClient);
    agoraClient_defineProperty(this, "client", null);
    agoraClient_defineProperty(this, "localAudioTrack", null);
    agoraClient_defineProperty(this, "remoteUsers", new Map());
    agoraClient_defineProperty(this, "eventListeners", new Map());
    agoraClient_defineProperty(this, "isInitialized", false);
    agoraClient_defineProperty(this, "currentChannel", null);
  }
  return _createClass(AgoraClient, [{
    key: "initialize",
    value: (
    /**
     * Initialize Agora RTC client
     */
    function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var appId;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(this.isInitialized && this.client)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              appId = config/* config */.$.agora.appId;
              if (appId) {
                _context.n = 2;
                break;
              }
              throw new Error('Agora App ID is not configured. Please set REACT_APP_AGORA_APP_ID in your .env file');
            case 2:
              // Create Agora client
              this.client = AgoraRTC_N_production_default().createClient({
                mode: 'rtc',
                codec: 'vp8'
              });

              // Setup event listeners
              this.setupEventListeners();
              this.isInitialized = true;
            case 3:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
    /**
     * Setup Agora client event listeners
     */
    )
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this = this;
      if (!this.client) return;

      // User joined
      this.client.on('user-joined', function (user) {
        console.log('Agora: User joined', user.uid);
        var remoteUser = {
          uid: user.uid,
          hasAudio: user.hasAudio,
          muted: false
        };
        _this.remoteUsers.set(user.uid, remoteUser);
        _this.emit('user-joined', remoteUser);
      });

      // User left
      this.client.on('user-left', function (user) {
        console.log('Agora: User left', user.uid);
        _this.remoteUsers.delete(user.uid);
        _this.emit('user-left', {
          uid: user.uid
        });
      });

      // User published audio
      this.client.on('user-published', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(user, mediaType) {
          var remoteUser, _user$audioTrack, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                console.log('Agora: User published', user.uid, mediaType);
                if (!(mediaType === 'audio')) {
                  _context2.n = 4;
                  break;
                }
                _context2.p = 1;
                _context2.n = 2;
                return _this.client.subscribe(user, mediaType);
              case 2:
                remoteUser = _this.remoteUsers.get(user.uid);
                if (remoteUser) {
                  remoteUser.audioTrack = user.audioTrack;
                  remoteUser.hasAudio = true;
                  remoteUser.muted = false;
                  // Play the remote audio track
                  (_user$audioTrack = user.audioTrack) === null || _user$audioTrack === void 0 || _user$audioTrack.play();
                  _this.emit('user-published', {
                    uid: user.uid,
                    mediaType: mediaType
                  });
                }
                _context2.n = 4;
                break;
              case 3:
                _context2.p = 3;
                _t = _context2.v;
                console.error('Error subscribing to user audio:', _t);
                _this.emit('error', {
                  error: _t,
                  uid: user.uid
                });
              case 4:
                return _context2.a(2);
            }
          }, _callee2, null, [[1, 3]]);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());

      // User unpublished audio
      this.client.on('user-unpublished', function (user, mediaType) {
        console.log('Agora: User unpublished', user.uid, mediaType);
        if (mediaType === 'audio') {
          var remoteUser = _this.remoteUsers.get(user.uid);
          if (remoteUser) {
            remoteUser.audioTrack = undefined;
            remoteUser.hasAudio = false;
            _this.emit('user-unpublished', {
              uid: user.uid,
              mediaType: mediaType
            });
          }
        }
      });

      // Connection state change
      this.client.on('connection-state-change', function (curState, revState) {
        console.log('Agora: Connection state changed', curState, revState);
        if (curState === 'DISCONNECTED' || curState === 'FAILED') {
          _this.emit('error', {
            error: new Error("Connection ".concat(curState))
          });
        }
      });
    }

    /**
     * Join a channel
     */
  }, {
    key: "joinChannel",
    value: (function () {
      var _joinChannel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(channelName, token, uid) {
        var appId, _t2, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (!(!this.isInitialized || !this.client)) {
                _context3.n = 1;
                break;
              }
              _context3.n = 1;
              return this.initialize();
            case 1:
              if (this.client) {
                _context3.n = 2;
                break;
              }
              throw new Error('Agora client not initialized');
            case 2:
              if (!(this.currentChannel && this.currentChannel !== channelName)) {
                _context3.n = 3;
                break;
              }
              _context3.n = 3;
              return this.leaveChannel();
            case 3:
              _context3.p = 3;
              _context3.n = 4;
              return AgoraRTC_N_production_default().createMicrophoneAudioTrack();
            case 4:
              this.localAudioTrack = _context3.v;
              console.log('Agora: Local audio track created');
              _context3.n = 6;
              break;
            case 5:
              _context3.p = 5;
              _t2 = _context3.v;
              console.error('Error creating microphone track:', _t2);
              throw new Error('Failed to access microphone. Please check permissions.');
            case 6:
              _context3.p = 6;
              appId = config/* config */.$.agora.appId;
              _context3.n = 7;
              return this.client.join(appId, channelName, token || null, uid || null);
            case 7:
              this.currentChannel = channelName;
              console.log('Agora: Joined channel', channelName);

              // Publish local audio track
              if (!this.localAudioTrack) {
                _context3.n = 9;
                break;
              }
              _context3.n = 8;
              return this.client.publish([this.localAudioTrack]);
            case 8:
              console.log('Agora: Published local audio track');
            case 9:
              _context3.n = 11;
              break;
            case 10:
              _context3.p = 10;
              _t3 = _context3.v;
              console.error('Error joining channel:', _t3);
              // Cleanup local track on error
              if (this.localAudioTrack) {
                this.localAudioTrack.close();
                this.localAudioTrack = null;
              }
              throw _t3;
            case 11:
              return _context3.a(2);
          }
        }, _callee3, this, [[6, 10], [3, 5]]);
      }));
      function joinChannel(_x3, _x4, _x5) {
        return _joinChannel.apply(this, arguments);
      }
      return joinChannel;
    }()
    /**
     * Leave current channel
     */
    )
  }, {
    key: "leaveChannel",
    value: (function () {
      var _leaveChannel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (this.client) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              _context4.p = 1;
              if (!this.localAudioTrack) {
                _context4.n = 3;
                break;
              }
              _context4.n = 2;
              return this.client.unpublish([this.localAudioTrack]);
            case 2:
              this.localAudioTrack.close();
              this.localAudioTrack = null;
            case 3:
              _context4.n = 4;
              return this.client.leave();
            case 4:
              this.currentChannel = null;
              this.remoteUsers.clear();
              console.log('Agora: Left channel');
              _context4.n = 6;
              break;
            case 5:
              _context4.p = 5;
              _t4 = _context4.v;
              console.error('Error leaving channel:', _t4);
              throw _t4;
            case 6:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 5]]);
      }));
      function leaveChannel() {
        return _leaveChannel.apply(this, arguments);
      }
      return leaveChannel;
    }()
    /**
     * Publish local audio track
     */
    )
  }, {
    key: "publishAudio",
    value: (function () {
      var _publishAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (!(!this.client || !this.localAudioTrack)) {
                _context5.n = 1;
                break;
              }
              throw new Error('Not in a channel or no local audio track');
            case 1:
              _context5.p = 1;
              _context5.n = 2;
              return this.client.publish([this.localAudioTrack]);
            case 2:
              console.log('Agora: Published audio');
              _context5.n = 4;
              break;
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              console.error('Error publishing audio:', _t5);
              throw _t5;
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function publishAudio() {
        return _publishAudio.apply(this, arguments);
      }
      return publishAudio;
    }()
    /**
     * Unpublish local audio track
     */
    )
  }, {
    key: "unpublishAudio",
    value: (function () {
      var _unpublishAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              if (!(!this.client || !this.localAudioTrack)) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              _context6.p = 1;
              _context6.n = 2;
              return this.client.unpublish([this.localAudioTrack]);
            case 2:
              console.log('Agora: Unpublished audio');
              _context6.n = 4;
              break;
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              console.error('Error unpublishing audio:', _t6);
              throw _t6;
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function unpublishAudio() {
        return _unpublishAudio.apply(this, arguments);
      }
      return unpublishAudio;
    }()
    /**
     * Mute or unmute local audio
     */
    )
  }, {
    key: "muteLocalAudio",
    value: function muteLocalAudio(muted) {
      if (!this.localAudioTrack) {
        return;
      }
      try {
        if (muted) {
          this.localAudioTrack.setMuted(true);
          console.log('Agora: Local audio muted');
        } else {
          this.localAudioTrack.setMuted(false);
          console.log('Agora: Local audio unmuted');
        }
      } catch (error) {
        console.error('Error muting/unmuting audio:', error);
        throw error;
      }
    }

    /**
     * Get remote users
     */
  }, {
    key: "getRemoteUsers",
    value: function getRemoteUsers() {
      return Array.from(this.remoteUsers.values());
    }

    /**
     * Get local audio track
     */
  }, {
    key: "getLocalAudioTrack",
    value: function getLocalAudioTrack() {
      return this.localAudioTrack;
    }

    /**
     * Check if joined to a channel
     */
  }, {
    key: "isJoined",
    value: function isJoined() {
      var _this$client;
      return this.currentChannel !== null && ((_this$client = this.client) === null || _this$client === void 0 ? void 0 : _this$client.connectionState) === 'CONNECTED';
    }

    /**
     * Get current channel name
     */
  }, {
    key: "getCurrentChannel",
    value: function getCurrentChannel() {
      return this.currentChannel;
    }

    /**
     * Subscribe to events
     */
  }, {
    key: "on",
    value: function on(event, callback) {
      if (!this.eventListeners.has(event)) {
        this.eventListeners.set(event, new Set());
      }
      this.eventListeners.get(event).add(callback);
    }

    /**
     * Unsubscribe from events
     */
  }, {
    key: "off",
    value: function off(event, callback) {
      if (!this.eventListeners.has(event)) {
        return;
      }
      if (callback) {
        this.eventListeners.get(event).delete(callback);
      } else {
        this.eventListeners.get(event).clear();
      }
    }

    /**
     * Emit event to listeners
     */
  }, {
    key: "emit",
    value: function emit(event, data) {
      var listeners = this.eventListeners.get(event);
      if (listeners) {
        listeners.forEach(function (callback) {
          try {
            callback(data);
          } catch (error) {
            console.error("Error in ".concat(event, " listener:"), error);
          }
        });
      }
    }

    /**
     * Cleanup and destroy client
     */
  }, {
    key: "destroy",
    value: (function () {
      var _destroy = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this.leaveChannel();
            case 1:
              if (this.client) {
                this.client.removeAllListeners();
                this.client = null;
              }
              this.remoteUsers.clear();
              this.eventListeners.clear();
              this.isInitialized = false;
              console.log('Agora: Client destroyed');
              _context7.n = 3;
              break;
            case 2:
              _context7.p = 2;
              _t7 = _context7.v;
              console.error('Error destroying Agora client:', _t7);
              throw _t7;
            case 3:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 2]]);
      }));
      function destroy() {
        return _destroy.apply(this, arguments);
      }
      return destroy;
    }())
  }]);
}();
var agoraClient = new AgoraClient();
;// ./src/stores/agoraStore.ts
function agoraStore_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return agoraStore_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (agoraStore_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, agoraStore_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, agoraStore_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), agoraStore_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", agoraStore_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), agoraStore_regeneratorDefine2(u), agoraStore_regeneratorDefine2(u, o, "Generator"), agoraStore_regeneratorDefine2(u, n, function () { return this; }), agoraStore_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (agoraStore_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function agoraStore_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } agoraStore_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { agoraStore_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, agoraStore_regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function agoraStore_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function agoraStore_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { agoraStore_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { agoraStore_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


var useAgoraStore = (0,esm/* create */.vt)(function (set, get) {
  return {
    // Initial state
    isInitialized: false,
    isJoined: false,
    channelName: null,
    localAudioTrack: null,
    remoteUsers: [],
    isMuted: false,
    isPublishing: false,
    error: null,
    // Initialize Agora client
    initialize: function () {
      var _initialize = agoraStore_asyncToGenerator(/*#__PURE__*/agoraStore_regenerator().m(function _callee() {
        var errorMessage, _t;
        return agoraStore_regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return agoraClient.initialize();
            case 1:
              set({
                isInitialized: true,
                error: null
              });

              // Setup event listeners
              agoraClient.on('user-joined', function (user) {
                var currentUsers = get().remoteUsers;
                if (!currentUsers.find(function (u) {
                  return u.uid === user.uid;
                })) {
                  set({
                    remoteUsers: [].concat(_toConsumableArray(currentUsers), [user])
                  });
                }
              });
              agoraClient.on('user-left', function (data) {
                var currentUsers = get().remoteUsers;
                set({
                  remoteUsers: currentUsers.filter(function (u) {
                    return u.uid !== data.uid;
                  })
                });
              });
              agoraClient.on('user-published', function (data) {
                var remoteUsers = agoraClient.getRemoteUsers();
                set({
                  remoteUsers: remoteUsers
                });
              });
              agoraClient.on('user-unpublished', function (data) {
                var remoteUsers = agoraClient.getRemoteUsers();
                set({
                  remoteUsers: remoteUsers
                });
              });
              agoraClient.on('error', function (data) {
                set({
                  error: data.error.message
                });
                console.error('Agora error:', data.error);
              });
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              errorMessage = _t instanceof Error ? _t.message : 'Failed to initialize Agora';
              set({
                error: errorMessage,
                isInitialized: false
              });
              throw _t;
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }(),
    // Join channel
    joinChannel: function () {
      var _joinChannel = agoraStore_asyncToGenerator(/*#__PURE__*/agoraStore_regenerator().m(function _callee2(channelName, token, uid) {
        var state, localAudioTrack, remoteUsers, errorMessage, _t2;
        return agoraStore_regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              state = get();
              if (state.isInitialized) {
                _context2.n = 1;
                break;
              }
              _context2.n = 1;
              return state.initialize();
            case 1:
              _context2.n = 2;
              return agoraClient.joinChannel(channelName, token, uid);
            case 2:
              localAudioTrack = agoraClient.getLocalAudioTrack();
              remoteUsers = agoraClient.getRemoteUsers();
              set({
                isJoined: true,
                channelName: channelName,
                localAudioTrack: localAudioTrack,
                remoteUsers: remoteUsers,
                isPublishing: true,
                isMuted: (localAudioTrack === null || localAudioTrack === void 0 ? void 0 : localAudioTrack.muted) || false,
                error: null
              });
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              errorMessage = _t2 instanceof Error ? _t2.message : 'Failed to join channel';
              set({
                error: errorMessage,
                isJoined: false,
                channelName: null
              });
              throw _t2;
            case 4:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 3]]);
      }));
      function joinChannel(_x, _x2, _x3) {
        return _joinChannel.apply(this, arguments);
      }
      return joinChannel;
    }(),
    // Leave channel
    leaveChannel: function () {
      var _leaveChannel = agoraStore_asyncToGenerator(/*#__PURE__*/agoraStore_regenerator().m(function _callee3() {
        var errorMessage, _t3;
        return agoraStore_regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return agoraClient.leaveChannel();
            case 1:
              set({
                isJoined: false,
                channelName: null,
                localAudioTrack: null,
                remoteUsers: [],
                isPublishing: false,
                isMuted: false,
                error: null
              });
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              errorMessage = _t3 instanceof Error ? _t3.message : 'Failed to leave channel';
              set({
                error: errorMessage
              });
              throw _t3;
            case 3:
              return _context3.a(2);
          }
        }, _callee3, null, [[0, 2]]);
      }));
      function leaveChannel() {
        return _leaveChannel.apply(this, arguments);
      }
      return leaveChannel;
    }(),
    // Toggle mute
    toggleMute: function toggleMute() {
      var state = get();
      if (!state.localAudioTrack) {
        return;
      }
      var newMutedState = !state.isMuted;
      agoraClient.muteLocalAudio(newMutedState);
      set({
        isMuted: newMutedState
      });
    },
    // Publish audio
    publishAudio: function () {
      var _publishAudio = agoraStore_asyncToGenerator(/*#__PURE__*/agoraStore_regenerator().m(function _callee4() {
        var errorMessage, _t4;
        return agoraStore_regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return agoraClient.publishAudio();
            case 1:
              set({
                isPublishing: true,
                error: null
              });
              _context4.n = 3;
              break;
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              errorMessage = _t4 instanceof Error ? _t4.message : 'Failed to publish audio';
              set({
                error: errorMessage
              });
              throw _t4;
            case 3:
              return _context4.a(2);
          }
        }, _callee4, null, [[0, 2]]);
      }));
      function publishAudio() {
        return _publishAudio.apply(this, arguments);
      }
      return publishAudio;
    }(),
    // Unpublish audio
    unpublishAudio: function () {
      var _unpublishAudio = agoraStore_asyncToGenerator(/*#__PURE__*/agoraStore_regenerator().m(function _callee5() {
        var errorMessage, _t5;
        return agoraStore_regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return agoraClient.unpublishAudio();
            case 1:
              set({
                isPublishing: false,
                error: null
              });
              _context5.n = 3;
              break;
            case 2:
              _context5.p = 2;
              _t5 = _context5.v;
              errorMessage = _t5 instanceof Error ? _t5.message : 'Failed to unpublish audio';
              set({
                error: errorMessage
              });
              throw _t5;
            case 3:
              return _context5.a(2);
          }
        }, _callee5, null, [[0, 2]]);
      }));
      function unpublishAudio() {
        return _unpublishAudio.apply(this, arguments);
      }
      return unpublishAudio;
    }(),
    // Set error
    setError: function setError(error) {
      set({
        error: error
      });
    },
    // Clear error
    clearError: function clearError() {
      set({
        error: null
      });
    }
  };
});
// EXTERNAL MODULE: ./src/stores/authStore.ts + 1 modules
var authStore = __webpack_require__(1104);
;// ./src/utils/shareUtils.ts
function shareUtils_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return shareUtils_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (shareUtils_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, shareUtils_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, shareUtils_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), shareUtils_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", shareUtils_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), shareUtils_regeneratorDefine2(u), shareUtils_regeneratorDefine2(u, o, "Generator"), shareUtils_regeneratorDefine2(u, n, function () { return this; }), shareUtils_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (shareUtils_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function shareUtils_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } shareUtils_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { shareUtils_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, shareUtils_regeneratorDefine2(e, r, n, t); }
function shareUtils_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function shareUtils_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { shareUtils_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { shareUtils_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Utility functions for sharing room links and deep linking
 */

/**
 * Get the current base URL (for building share links)
 */
var getBaseUrl = function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return "".concat(window.location.protocol, "//").concat(window.location.host);
  }
  return '';
};

/**
 * Generate a shareable room link
 */
var getRoomShareLink = function getRoomShareLink(roomId) {
  var baseUrl = getBaseUrl();
  return "".concat(baseUrl, "/room/").concat(roomId);
};

/**
 * Generate an invite link
 */
var getInviteLink = function getInviteLink(roomId) {
  var baseUrl = getBaseUrl();
  return "".concat(baseUrl, "/invite/").concat(roomId);
};

/**
 * Copy text to clipboard
 */
var copyToClipboard = /*#__PURE__*/function () {
  var _ref = shareUtils_asyncToGenerator(/*#__PURE__*/shareUtils_regenerator().m(function _callee(text) {
    var textArea, success, _t;
    return shareUtils_regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          if (!(navigator.clipboard && navigator.clipboard.writeText)) {
            _context.n = 2;
            break;
          }
          _context.n = 1;
          return navigator.clipboard.writeText(text);
        case 1:
          return _context.a(2, true);
        case 2:
          // Fallback for older browsers
          textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          success = document.execCommand('copy');
          document.body.removeChild(textArea);
          return _context.a(2, success);
        case 3:
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error('Failed to copy to clipboard:', _t);
          return _context.a(2, false);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function copyToClipboard(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Share room link using Web Share API or fallback to clipboard
 */
var shareRoomLink = /*#__PURE__*/function () {
  var _ref2 = shareUtils_asyncToGenerator(/*#__PURE__*/shareUtils_regenerator().m(function _callee2(roomId, roomName) {
    var link, text, _t2;
    return shareUtils_regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          link = getRoomShareLink(roomId);
          text = roomName ? "Join \"".concat(roomName, "\" on MatchTalk: ").concat(link) : "Join this room on MatchTalk: ".concat(link); // Try Web Share API first (if available)
          if (!navigator.share) {
            _context2.n = 4;
            break;
          }
          _context2.p = 1;
          _context2.n = 2;
          return navigator.share({
            title: roomName || 'MatchTalk Room',
            text: text,
            url: link
          });
        case 2:
          return _context2.a(2, true);
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          // User cancelled or error occurred, fallback to clipboard
          if (_t2.name !== 'AbortError') {
            console.error('Web Share API error:', _t2);
          }
        case 4:
          _context2.n = 5;
          return copyToClipboard(link);
        case 5:
          return _context2.a(2, _context2.v);
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return function shareRoomLink(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Share invite link
 */
var shareInviteLink = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref3 = shareUtils_asyncToGenerator(/*#__PURE__*/shareUtils_regenerator().m(function _callee3(roomId, roomName) {
    var link, text, _t3;
    return shareUtils_regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          link = getInviteLink(roomId);
          text = roomName ? "You're invited to join \"".concat(roomName, "\" on MatchTalk: ").concat(link) : "You're invited to join this room on MatchTalk: ".concat(link); // Try Web Share API first
          if (!navigator.share) {
            _context3.n = 4;
            break;
          }
          _context3.p = 1;
          _context3.n = 2;
          return navigator.share({
            title: roomName ? "Invitation: ".concat(roomName) : 'MatchTalk Invitation',
            text: text,
            url: link
          });
        case 2:
          return _context3.a(2, true);
        case 3:
          _context3.p = 3;
          _t3 = _context3.v;
          if (_t3.name !== 'AbortError') {
            console.error('Web Share API error:', _t3);
          }
        case 4:
          _context3.n = 5;
          return copyToClipboard(link);
        case 5:
          return _context3.a(2, _context3.v);
      }
    }, _callee3, null, [[1, 3]]);
  }));
  return function shareInviteLink(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}()));
// EXTERNAL MODULE: ./src/stores/toastStore.ts
var toastStore = __webpack_require__(791);
;// ./src/constants/room.ts
/**
 * Room-related constants
 */

// Timer constants
var ROOM_TIMER = {
  DEFAULT_DURATION_SEC: 300,
  // 5 minutes
  EXTENSION_VOTE_START_SEC: 10,
  // Start vote when 10 seconds left
  VOTE_DURATION_SEC: 10 // 10 seconds to vote
};

// Participant constants
var ROOM_PARTICIPANTS = {
  MIN_PARTICIPANTS: 2,
  MAX_PARTICIPANTS: 8,
  DEFAULT_MAX_PARTICIPANTS: 8
};

// Avatar positions for room screen (8 positions in a circle)
var AVATAR_POSITIONS = [{
  top: '5%',
  left: '50%',
  transform: [{
    translateX: -40
  }, {
    translateY: -10
  }]
},
// Top
{
  top: '15%',
  right: '15%'
},
// Top Right
{
  top: '50%',
  right: '5%',
  transform: [{
    translateY: -40
  }]
},
// Right
{
  bottom: '15%',
  right: '15%'
},
// Bottom Right
{
  bottom: '5%',
  left: '50%',
  transform: [{
    translateX: -40
  }, {
    translateY: 10
  }]
},
// Bottom
{
  bottom: '15%',
  left: '15%'
},
// Bottom Left
{
  top: '50%',
  left: '5%',
  transform: [{
    translateY: -40
  }]
},
// Left
{
  top: '15%',
  left: '15%'
} // Top Left
];
// EXTERNAL MODULE: ./src/hooks/useResponsive.ts + 1 modules
var useResponsive = __webpack_require__(3880);
;// ./src/screens/room/RoomScreen.tsx
function RoomScreen_typeof(o) { "@babel/helpers - typeof"; return RoomScreen_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, RoomScreen_typeof(o); }
function RoomScreen_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function RoomScreen_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? RoomScreen_ownKeys(Object(t), !0).forEach(function (r) { RoomScreen_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : RoomScreen_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function RoomScreen_defineProperty(e, r, t) { return (r = RoomScreen_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function RoomScreen_toPropertyKey(t) { var i = RoomScreen_toPrimitive(t, "string"); return "symbol" == RoomScreen_typeof(i) ? i : i + ""; }
function RoomScreen_toPrimitive(t, r) { if ("object" != RoomScreen_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != RoomScreen_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function RoomScreen_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return RoomScreen_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (RoomScreen_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, RoomScreen_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, RoomScreen_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), RoomScreen_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", RoomScreen_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), RoomScreen_regeneratorDefine2(u), RoomScreen_regeneratorDefine2(u, o, "Generator"), RoomScreen_regeneratorDefine2(u, n, function () { return this; }), RoomScreen_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (RoomScreen_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function RoomScreen_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } RoomScreen_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { RoomScreen_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, RoomScreen_regeneratorDefine2(e, r, n, t); }
function RoomScreen_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function RoomScreen_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { RoomScreen_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { RoomScreen_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || RoomScreen_unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function RoomScreen_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return RoomScreen_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? RoomScreen_arrayLikeToArray(r, a) : void 0; } }
function RoomScreen_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

















var RoomScreen = function RoomScreen(_ref) {
  var roomId = _ref.roomId,
    _ref$roomName = _ref.roomName,
    roomName = _ref$roomName === void 0 ? 'Startups & Coffee ☕️' : _ref$roomName,
    onLeave = _ref.onLeave,
    onBack = _ref.onBack;
  var _useState = (0,react.useState)(272),
    _useState2 = _slicedToArray(_useState, 2),
    timeLeft = _useState2[0],
    setTimeLeft = _useState2[1]; // 4:32 in seconds
  var _useState3 = (0,react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showVoteModal = _useState4[0],
    setShowVoteModal = _useState4[1];
  var _useState5 = (0,react.useState)(ROOM_TIMER.VOTE_DURATION_SEC),
    _useState6 = _slicedToArray(_useState5, 2),
    voteTimer = _useState6[0],
    setVoteTimer = _useState6[1];
  // Use selectors to prevent unnecessary re-renders
  var currentRoom = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.currentRoom;
  });
  var updateRoom = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.updateRoom;
  });
  var _useWebSocket = (0,useWebSocket/* useWebSocket */.h)(),
    wsJoinRoom = _useWebSocket.joinRoom,
    wsLeaveRoom = _useWebSocket.leaveRoom,
    on = _useWebSocket.on,
    off = _useWebSocket.off,
    voteExtension = _useWebSocket.voteExtension;
  var _useAgoraStore = useAgoraStore(),
    isMuted = _useAgoraStore.isMuted,
    remoteUsers = _useAgoraStore.remoteUsers,
    joinChannel = _useAgoraStore.joinChannel,
    leaveChannel = _useAgoraStore.leaveChannel,
    toggleMute = _useAgoraStore.toggleMute,
    agoraError = _useAgoraStore.error;
  var _useAuthStore = (0,authStore/* useAuthStore */.n)(),
    user = _useAuthStore.user;
  var _useToastStore = (0,toastStore/* useToastStore */.W)(),
    showToast = _useToastStore.showToast;
  var _useResponsive = (0,useResponsive/* useResponsive */.Qs)(),
    isMobile = _useResponsive.isMobile,
    isTablet = _useResponsive.isTablet,
    isDesktop = _useResponsive.isDesktop,
    width = _useResponsive.width;

  // Agora WebRTC: Join channel when roomId is available
  (0,react.useEffect)(function () {
    if (!roomId) return;
    var joinAgoraChannel = /*#__PURE__*/function () {
      var _ref2 = RoomScreen_asyncToGenerator(/*#__PURE__*/RoomScreen_regenerator().m(function _callee() {
        var errorMessage, _t;
        return RoomScreen_regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return joinChannel(roomId);
            case 1:
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              // Agora App ID yapılandırılmamış olabilir - bu normal, sadece log'la
              errorMessage = _t instanceof Error ? _t.message : String(_t);
              if (errorMessage.includes('Agora App ID is not configured')) {
                console.warn('Agora App ID yapılandırılmamış. Ses özellikleri çalışmayacak.');
                // Uygulama çalışmaya devam edebilir, sadece ses özellikleri olmayacak
              } else {
                console.error('Failed to join Agora channel:', _t);
              }
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      return function joinAgoraChannel() {
        return _ref2.apply(this, arguments);
      };
    }();
    joinAgoraChannel();
    return function () {
      leaveChannel().catch(function (error) {
        // Agora hatası kritik değil, sadece log'la
        console.warn('Failed to leave Agora channel:', error);
      });
    };
  }, [roomId, joinChannel, leaveChannel]);

  // WebSocket event handlers
  (0,react.useEffect)(function () {
    if (!roomId) return;

    // Join room via WebSocket (async, handle errors gracefully)
    var joinRoomAsync = /*#__PURE__*/function () {
      var _ref3 = RoomScreen_asyncToGenerator(/*#__PURE__*/RoomScreen_regenerator().m(function _callee2() {
        var errorMessage, _t2;
        return RoomScreen_regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              console.log("[RoomScreen] Attempting to join room: ".concat(roomId));
              _context2.n = 1;
              return wsJoinRoom(roomId);
            case 1:
              console.log("[RoomScreen] Successfully joined room: ".concat(roomId));
              _context2.n = 3;
              break;
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              errorMessage = _t2 instanceof Error ? _t2.message : String(_t2);
              console.error('[RoomScreen] Failed to join room via WebSocket:', errorMessage, _t2);

              // Check if it's a connection timeout error
              if (errorMessage.includes('timeout') || errorMessage.includes('Backend WebSocket server')) {
                showToast({
                  type: 'warning',
                  message: 'WebSocket bağlantısı kurulamadı. Real-time özellikler çalışmayabilir. Backend server\'ın çalıştığından emin olun.'
                });
              } else {
                // Show user-friendly error message
                showToast({
                  type: 'error',
                  message: errorMessage || 'Odaya bağlanılamadı. Lütfen sayfayı yenileyin.'
                });
              }
            case 3:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 2]]);
      }));
      return function joinRoomAsync() {
        return _ref3.apply(this, arguments);
      };
    }();
    joinRoomAsync();

    // Listen for room updates
    var handleRoomUpdate = function handleRoomUpdate(data) {
      if (data.room && data.room.id === roomId) {
        updateRoom(roomId, data.room);
      }
    };

    // Listen for timer updates
    var handleTimerUpdate = function handleTimerUpdate(data) {
      if (data.roomId === roomId) {
        setTimeLeft(data.timeLeft);
      }
    };

    // Listen for extension vote start (son 10 saniyede)
    var handleExtensionVoteStart = function handleExtensionVoteStart(data) {
      if (data.roomId === roomId) {
        console.log("[RoomScreen] Extension vote started for room ".concat(roomId, ", timeLeft: ").concat(data.timeLeft));
        setShowVoteModal(true);
        setVoteTimer(ROOM_TIMER.VOTE_DURATION_SEC);
      }
    };

    // Set up event listeners with error handling
    try {
      on('room-update', handleRoomUpdate);
      on('timer-update', handleTimerUpdate);
      on('extension-vote-start', handleExtensionVoteStart);
    } catch (error) {
      console.error('Failed to set up WebSocket event listeners:', error);
    }
    return function () {
      try {
        off('room-update', handleRoomUpdate);
        off('timer-update', handleTimerUpdate);
        off('extension-vote-start', handleExtensionVoteStart);
        if (roomId) {
          wsLeaveRoom(roomId).catch(function (error) {
            console.warn('Failed to leave room via WebSocket:', error);
          });
        }
      } catch (error) {
        console.warn('Error cleaning up WebSocket listeners:', error);
      }
    };
  }, [roomId, wsJoinRoom, wsLeaveRoom, on, off, updateRoom, showToast]);

  // Update timeLeft from currentRoom
  (0,react.useEffect)(function () {
    if (currentRoom && currentRoom.id === roomId) {
      setTimeLeft(currentRoom.timeLeftSec);
    }
  }, [currentRoom, roomId]);

  // Combine participants from currentRoom (backend) and remoteUsers (Agora)
  var participants = (0,react.useMemo)(function () {
    var roomParticipants = (currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.participants) || [];

    // Create a map of participants by ID for quick lookup
    var participantMap = new Map();

    // Add room participants from backend
    roomParticipants.forEach(function (p) {
      participantMap.set(p.id, {
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        isActiveSpeaker: false,
        isMuted: false
      });
    });

    // Update with Agora remote users data (mute state, etc.)
    remoteUsers.forEach(function (remoteUser) {
      // Try to find matching participant by checking if UID matches any participant ID
      // Note: In a real implementation, you might need to map Agora UIDs to user IDs
      // For now, we'll update mute state for all participants if we have remote user data
      var matchingParticipant = Array.from(participantMap.values()).find(function (p) {
        return String(p.id) === String(remoteUser.uid);
      });
      if (matchingParticipant) {
        matchingParticipant.isMuted = remoteUser.muted || !remoteUser.hasAudio;
        matchingParticipant.isActiveSpeaker = remoteUser.hasAudio && !remoteUser.muted;
      }
    });
    return Array.from(participantMap.values());
  }, [currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.participants, remoteUsers]);

  // Use constant avatar positions
  var avatarPositions = AVATAR_POSITIONS;

  // Memoize formatTime function
  var formatTime = (0,react.useCallback)(function (seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return "".concat(mins, ":").concat(secs.toString().padStart(2, '0'));
  }, []);

  // Memoize progress calculation
  var progress = (0,react.useMemo)(function () {
    return (ROOM_TIMER.DEFAULT_DURATION_SEC - timeLeft) / ROOM_TIMER.DEFAULT_DURATION_SEC * 100;
  }, [timeLeft]);

  // Timer countdown
  // Oylama süresi timer'ı (10 saniye)
  (0,react.useEffect)(function () {
    if (!showVoteModal) {
      return;
    }
    var interval = setInterval(function () {
      setVoteTimer(function (prev) {
        if (prev <= 1) {
          // 10 saniye doldu, modal'ı kapat
          setShowVoteModal(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return function () {
      return clearInterval(interval);
    };
  }, [showVoteModal]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
    style: RoomScreen_styles.container,
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
      style: RoomScreen_styles.backgroundGlow
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
      style: RoomScreen_styles.header,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
        style: RoomScreen_styles.headerButton,
        onPress: onBack,
        accessibilityRole: "button",
        accessibilityLabel: "Geri d\xF6n",
        accessibilityHint: "\xD6nceki sayfaya d\xF6n",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
          name: "arrow_back_ios_new",
          style: RoomScreen_styles.headerIcon
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
        style: RoomScreen_styles.headerTitle,
        numberOfLines: 1,
        accessibilityRole: "header",
        accessibilityLabel: "Oda: ".concat(roomName),
        children: roomName
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: RoomScreen_styles.headerRight,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
          style: RoomScreen_styles.headerButton,
          onPress: /*#__PURE__*/RoomScreen_asyncToGenerator(/*#__PURE__*/RoomScreen_regenerator().m(function _callee3() {
            var success;
            return RoomScreen_regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  if (!roomId) {
                    _context3.n = 2;
                    break;
                  }
                  _context3.n = 1;
                  return shareRoomLink(roomId, roomName);
                case 1:
                  success = _context3.v;
                  if (success) {
                    showToast({
                      type: 'success',
                      message: 'Room link copied to clipboard!'
                    });
                  } else {
                    showToast({
                      type: 'error',
                      message: 'Failed to share room link'
                    });
                  }
                case 2:
                  return _context3.a(2);
              }
            }, _callee3);
          })),
          accessibilityRole: "button",
          accessibilityLabel: "Oda linkini payla\u015F",
          accessibilityHint: "Oda linkini panoya kopyala",
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
            name: "share",
            style: RoomScreen_styles.headerIcon
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
          style: RoomScreen_styles.headerButton,
          onPress: onLeave,
          accessibilityRole: "button",
          accessibilityLabel: "Odadan ayr\u0131l",
          accessibilityHint: "Odadan \xE7\u0131kmak i\xE7in t\u0131klay\u0131n",
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
            name: "logout",
            style: RoomScreen_styles.headerIcon
          })
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
      style: RoomScreen_styles.mainContent,
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: RoomScreen_styles.avatarContainer,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
          style: RoomScreen_styles.timerContainer,
          children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
            style: RoomScreen_styles.timerCircle,
            children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
              style: RoomScreen_styles.progressRingBackground
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
              style: [RoomScreen_styles.progressRingFill, {
                width: "".concat(progress, "%")
              }]
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
              style: RoomScreen_styles.timerText,
              accessibilityLabel: "Kalan s\xFCre: ".concat(formatTime(timeLeft)),
              accessibilityLiveRegion: "polite",
              children: formatTime(timeLeft)
            })]
          })
        }), participants.map(function (participant, index) {
          var position = avatarPositions[index] || {};
          return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
            style: [RoomScreen_styles.avatarWrapper, position],
            accessibilityLabel: "Kat\u0131l\u0131mc\u0131: ".concat(participant.name).concat(participant.isMuted ? ', Mikrofon kapalı' : '').concat(participant.isActiveSpeaker ? ', Konuşuyor' : ''),
            accessibilityRole: "text",
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(room_ParticipantAvatar, {
              name: participant.name,
              avatar: participant.avatar,
              size: 80,
              isActiveSpeaker: participant.isActiveSpeaker,
              isMuted: participant.isMuted
            })
          }, participant.id);
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: [RoomScreen_styles.avatarWrapper, RoomScreen_styles.inviteSlot, avatarPositions[7]],
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
            style: RoomScreen_styles.inviteButton,
            accessibilityRole: "button",
            accessibilityLabel: "Arkada\u015F davet et",
            accessibilityHint: "Odaya arkada\u015F davet etmek i\xE7in t\u0131klay\u0131n",
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
              name: "add",
              style: RoomScreen_styles.inviteIcon
            })
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: RoomScreen_styles.inviteText,
            children: "Invite"
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
      style: RoomScreen_styles.bottomControls,
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
        style: RoomScreen_styles.controlSpacer
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
        style: [RoomScreen_styles.micButton, !isMuted ? RoomScreen_styles.micButtonOn : RoomScreen_styles.micButtonOff],
        onPress: function onPress() {
          return toggleMute();
        },
        accessibilityRole: "button",
        accessibilityLabel: isMuted ? 'Mikrofonu aç' : 'Mikrofonu kapat',
        accessibilityState: {
          checked: !isMuted
        },
        accessibilityHint: "Mikrofon durumunu de\u011Fi\u015Ftir",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
          name: !isMuted ? 'mic' : 'mic_off',
          style: RoomScreen_styles.micIcon
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
        style: RoomScreen_styles.controlSpacer,
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Pressable */.oz, {
          style: RoomScreen_styles.leaveButton,
          onPress: /*#__PURE__*/RoomScreen_asyncToGenerator(/*#__PURE__*/RoomScreen_regenerator().m(function _callee4() {
            var _t3;
            return RoomScreen_regenerator().w(function (_context4) {
              while (1) switch (_context4.p = _context4.n) {
                case 0:
                  _context4.p = 0;
                  if (!roomId) {
                    _context4.n = 1;
                    break;
                  }
                  wsLeaveRoom(roomId);
                  _context4.n = 1;
                  return leaveChannel();
                case 1:
                  onLeave === null || onLeave === void 0 || onLeave();
                  _context4.n = 3;
                  break;
                case 2:
                  _context4.p = 2;
                  _t3 = _context4.v;
                  console.error('Error leaving room:', _t3);
                  onLeave === null || onLeave === void 0 || onLeave();
                case 3:
                  return _context4.a(2);
              }
            }, _callee4, null, [[0, 2]]);
          })),
          accessibilityRole: "button",
          accessibilityLabel: "Odadan ayr\u0131l",
          accessibilityHint: "Odadan \xE7\u0131kmak ve ana sayfaya d\xF6nmek i\xE7in t\u0131klay\u0131n",
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
            style: RoomScreen_styles.leaveButtonInner,
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
              name: "call_end",
              style: RoomScreen_styles.leaveIcon
            })
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: RoomScreen_styles.leaveText,
            children: "Leave"
          })]
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
      style: RoomScreen_styles.bottomGradient
    }), showVoteModal && roomId && /*#__PURE__*/(0,jsx_runtime.jsx)(room_VoteModal, {
      visible: showVoteModal,
      onClose: function onClose() {
        return setShowVoteModal(false);
      },
      onVote: function onVote(vote) {
        if (roomId) {
          voteExtension(roomId, vote ? 'yes' : 'no');
        }
        setShowVoteModal(false);
      },
      timeLeft: voteTimer
    })]
  });
};
var RoomScreen_styles = dist/* StyleSheet */.vv.create({
  container: RoomScreen_objectSpread({
    flex: 1,
    backgroundColor: colors/* colors */.T.backgroundDark
  }, dist/* Platform */.OD.select({
    web: {
      minHeight: '100vh'
    }
  })),
  backgroundGlow: RoomScreen_objectSpread({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 256,
    height: 256,
    marginTop: -128,
    marginLeft: -128,
    backgroundColor: "".concat(colors/* colors */.T.primary, "33"),
    borderRadius: 128
  }, dist/* Platform */.OD.select({
    web: {
      filter: 'blur(80px)'
    }
  })),
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing/* spacing */.Y.md,
    paddingTop: spacing/* spacing */.Y.xxl,
    paddingBottom: spacing/* spacing */.Y.sm,
    zIndex: 20
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing/* spacing */.Y.xs
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius/* radius */.r.full
  },
  headerIcon: {
    fontSize: 28,
    color: '#fff'
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: spacing/* spacing */.Y.md
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing/* spacing */.Y.md,
    position: 'relative'
  },
  avatarContainer: RoomScreen_objectSpread({
    width: '100%',
    maxWidth: 400,
    aspectRatio: 1,
    position: 'relative'
  }, dist/* Platform */.OD.select({
    web: {
      maxWidth: 'min(400px, 90vw)'
    }
  })),
  timerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 144,
    height: 144,
    marginTop: -72,
    marginLeft: -72,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0
  },
  timerCircle: {
    width: 144,
    height: 144,
    borderRadius: 72,
    borderWidth: 4,
    borderColor: "".concat(colors/* colors */.T.textSecondary, "50"),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  progressRingBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 72,
    borderWidth: 4,
    borderColor: "".concat(colors/* colors */.T.textSecondary, "50")
  },
  progressRingFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    backgroundColor: colors/* colors */.T.primary,
    opacity: 0.3
  },
  timerText: RoomScreen_objectSpread({
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff'
  }, dist/* Platform */.OD.select({
    web: {
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    default: {
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: {
        width: 0,
        height: 2
      },
      textShadowRadius: 4
    }
  })),
  avatarWrapper: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10
  },
  inviteSlot: {
    alignItems: 'center'
  },
  inviteButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors/* colors */.T.textSecondary,
    backgroundColor: "".concat(colors/* colors */.T.textSecondary, "20"),
    alignItems: 'center',
    justifyContent: 'center'
  },
  inviteIcon: {
    fontSize: 28,
    color: colors/* colors */.T.textSecondary
  },
  inviteText: {
    marginTop: spacing/* spacing */.Y.xs,
    fontSize: 12,
    color: colors/* colors */.T.textSecondary,
    fontWeight: '500'
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing/* spacing */.Y.lg,
    paddingBottom: spacing/* spacing */.Y.xxl,
    paddingTop: spacing/* spacing */.Y.lg,
    zIndex: 20
  },
  controlSpacer: {
    width: 64
  },
  micButton: RoomScreen_objectSpread({
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors/* colors */.T.primary,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.6,
    shadowRadius: 15
  }, dist/* Platform */.OD.select({
    web: {
      boxShadow: '0 0 15px 2px rgba(94, 64, 242, 0.6)'
    }
  })),
  micButtonOn: {
    backgroundColor: colors/* colors */.T.primary
  },
  micButtonOff: {
    backgroundColor: colors/* colors */.T.danger
  },
  micIcon: {
    fontSize: 36,
    color: '#fff'
  },
  leaveButton: {
    alignItems: 'center',
    gap: spacing/* spacing */.Y.xs / 2
  },
  leaveButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "".concat(colors/* colors */.T.danger, "1A"),
    borderWidth: 1,
    borderColor: "".concat(colors/* colors */.T.danger, "33"),
    alignItems: 'center',
    justifyContent: 'center'
  },
  leaveIcon: {
    fontSize: 20,
    color: colors/* colors */.T.danger
  },
  leaveText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors/* colors */.T.danger,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  bottomGradient: RoomScreen_objectSpread(RoomScreen_objectSpread({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 128,
    backgroundColor: 'transparent'
  }, dist/* Platform */.OD.select({
    web: {
      backgroundImage: 'linear-gradient(to top, #0F172A, transparent)'
    }
  })), {}, {
    pointerEvents: 'none',
    zIndex: 10
  })
});
/* harmony default export */ const room_RoomScreen = (RoomScreen);

/***/ })

}]);