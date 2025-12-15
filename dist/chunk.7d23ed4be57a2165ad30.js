"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[614],{

/***/ 5337:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ useWebSocketEventStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1621);
/* harmony import */ var _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6880);


var useWebSocketEventStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .vt)(function (set, get) {
  var listeners = new Map();
  var setupListeners = function setupListeners() {
    var socket = _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.getSocket();
    if (!socket || !socket.connected) {
      return;
    }

    // Setup a single listener for each event type that dispatches to all handlers
    var events = ['room-update', 'room-created', 'room-closed', 'room-joined', 'room-left', 'room-error', 'timer-update', 'vote-result', 'vote-recorded', 'extension-vote-start', 'participant-joined', 'participant-left', 'match-found', 'matching-progress', 'matching-joined', 'matching-left'];
    events.forEach(function (event) {
      // Remove existing listener to avoid duplicates
      socket.off(event);

      // Add new listener that dispatches to all registered handlers
      socket.on(event, function (data) {
        var currentListeners = get().listeners.get(event);
        if (currentListeners) {
          currentListeners.forEach(function (handler) {
            try {
              handler(data);
            } catch (error) {
              console.error("Error in ".concat(event, " handler:"), error);
            }
          });
        }
      });
    });
  };
  var cleanupListeners = function cleanupListeners() {
    var socket = _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.getSocket();
    if (!socket) {
      return;
    }
    var events = ['room-update', 'room-created', 'room-closed', 'room-joined', 'room-left', 'room-error', 'timer-update', 'vote-result', 'vote-recorded', 'extension-vote-start', 'participant-joined', 'participant-left', 'match-found', 'matching-progress', 'matching-joined', 'matching-left'];
    events.forEach(function (event) {
      socket.off(event);
    });
  };
  return {
    listeners: listeners,
    subscribe: function subscribe(event, handler) {
      var currentListeners = get().listeners;
      if (!currentListeners.has(event)) {
        currentListeners.set(event, new Set());
      }
      currentListeners.get(event).add(handler);

      // Setup listeners if socket is connected
      var socket = _lib_websocketClient__WEBPACK_IMPORTED_MODULE_1__/* .websocketClient */ .V.getSocket();
      if (socket && socket.connected) {
        setupListeners();
      }

      // Return unsubscribe function
      return function () {
        get().unsubscribe(event, handler);
      };
    },
    unsubscribe: function unsubscribe(event, handler) {
      var handlers = listeners.get(event);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          listeners.delete(event);
        }
      }
    },
    emit: function emit(event, data) {
      var handlers = listeners.get(event);
      if (handlers) {
        handlers.forEach(function (handler) {
          try {
            handler(data);
          } catch (error) {
            console.error("Error in ".concat(event, " handler:"), error);
          }
        });
      }
    },
    setupListeners: setupListeners,
    cleanupListeners: cleanupListeners
  };
});

/***/ }),

/***/ 6074:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var _theme_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8504);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4848);




var Avatar = function Avatar(_ref) {
  var name = _ref.name,
    avatar = _ref.avatar,
    uri = _ref.uri,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 40 : _ref$size,
    _ref$showBorder = _ref.showBorder,
    showBorder = _ref$showBorder === void 0 ? false : _ref$showBorder;
  // Use uri if provided, otherwise use avatar
  var avatarUri = uri || avatar;
  var initials = name.split(' ').map(function (n) {
    return n[0];
  }).join('').toUpperCase().slice(0, 2);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: [styles.container, {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: showBorder ? 2 : 0
    }],
    children: avatarUri ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Image */ ._V, {
      source: {
        uri: avatarUri
      },
      style: [styles.image, {
        width: size,
        height: size,
        borderRadius: size / 2
      }]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: [styles.initialsContainer, {
        width: size,
        height: size,
        borderRadius: size / 2
      }],
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: [styles.initials, {
          fontSize: size * 0.4
        }],
        children: initials
      })
    })
  });
};
var styles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  container: {
    overflow: 'hidden',
    borderColor: '#fff'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  initialsContainer: {
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.cardDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  initials: {
    fontWeight: 'bold',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.textPrimary
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Avatar);

/***/ }),

/***/ 6880:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ websocketClient)
/* harmony export */ });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3508);
/* harmony import */ var _apiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5859);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3064);
/* harmony import */ var _constants_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7685);
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




var WebSocketClient = /*#__PURE__*/function () {
  function WebSocketClient() {
    _classCallCheck(this, WebSocketClient);
    _defineProperty(this, "socket", null);
    _defineProperty(this, "reconnectAttempts", 0);
    _defineProperty(this, "maxReconnectAttempts", _constants_app__WEBPACK_IMPORTED_MODULE_3__/* .WEBSOCKET_CONFIG */ .ld.MAX_RECONNECT_ATTEMPTS);
    _defineProperty(this, "reconnectDelay", _constants_app__WEBPACK_IMPORTED_MODULE_3__/* .WEBSOCKET_CONFIG */ .ld.RECONNECT_DELAY);
    _defineProperty(this, "maxReconnectDelay", _constants_app__WEBPACK_IMPORTED_MODULE_3__/* .WEBSOCKET_CONFIG */ .ld.MAX_RECONNECT_DELAY);
    _defineProperty(this, "reconnectTimer", null);
  }
  return _createClass(WebSocketClient, [{
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this$socket,
          _this = this;
        var token;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!((_this$socket = this.socket) !== null && _this$socket !== void 0 && _this$socket.connected)) {
                _context.n = 1;
                break;
              }
              console.log('[WebSocket] Already connected');
              return _context.a(2, this.socket);
            case 1:
              _context.n = 2;
              return _apiClient__WEBPACK_IMPORTED_MODULE_1__/* .apiClient */ .u.getToken();
            case 2:
              token = _context.v;
              if (token) {
                _context.n = 3;
                break;
              }
              throw new Error('No authentication token available');
            case 3:
              console.log('[WebSocket] Connecting to:', _config__WEBPACK_IMPORTED_MODULE_2__/* .config */ .$.api.wsBaseUrl);

              // If socket exists but not connected, disconnect first
              if (this.socket) {
                this.socket.removeAllListeners(); // Clean up all listeners
                this.socket.disconnect();
                this.socket = null;
              }
              this.socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_0__.io)(_config__WEBPACK_IMPORTED_MODULE_2__/* .config */ .$.api.wsBaseUrl, {
                auth: {
                  token: token
                },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionDelay: this.reconnectDelay,
                reconnectionDelayMax: this.maxReconnectDelay,
                reconnectionAttempts: this.maxReconnectAttempts,
                timeout: _constants_app__WEBPACK_IMPORTED_MODULE_3__/* .WEBSOCKET_CONFIG */ .ld.CONNECTION_TIMEOUT,
                // Exponential backoff configuration
                randomizationFactor: 0.5 // Add randomness to prevent thundering herd
              });

              // Wait for connection with timeout
              return _context.a(2, new Promise(function (resolve, reject) {
                var resolved = false;
                var timeout = setTimeout(function () {
                  if (!resolved) {
                    resolved = true;
                    console.error('[WebSocket] Connection timeout after 15 seconds');
                    // Clean up listeners
                    if (_this.socket) {
                      _this.socket.off('connect', _connectHandler);
                      _this.socket.off('connect_error', _errorHandler);
                    }
                    reject(new Error("WebSocket connection timeout after ".concat(_constants_app__WEBPACK_IMPORTED_MODULE_3__/* .WEBSOCKET_CONFIG */ .ld.CONNECTION_TIMEOUT / 1000, " seconds")));
                  }
                }, _constants_app__WEBPACK_IMPORTED_MODULE_3__/* .WEBSOCKET_CONFIG */ .ld.CONNECTION_TIMEOUT * 0.75); // 75% of connection timeout

                var _connectHandler = function connectHandler() {
                  if (!resolved) {
                    resolved = true;
                    clearTimeout(timeout);
                    console.log('[WebSocket] Connected successfully');
                    _this.reconnectAttempts = 0;
                    if (_this.socket) {
                      _this.socket.off('connect', _connectHandler);
                      _this.socket.off('connect_error', _errorHandler);
                    }
                    resolve(_this.socket);
                  }
                };
                var _errorHandler = function errorHandler(error) {
                  if (!resolved) {
                    resolved = true;
                    clearTimeout(timeout);
                    console.error('[WebSocket] Connection error:', error);
                    _this.reconnectAttempts++;
                    if (_this.socket) {
                      _this.socket.off('connect', _connectHandler);
                      _this.socket.off('connect_error', _errorHandler);
                    }
                    var errorMessage = error.message || String(error);
                    reject(new Error("WebSocket connection failed: ".concat(errorMessage)));
                  }
                };

                // Check if already connected (can happen with fast connections)
                if (_this.socket.connected) {
                  if (!resolved) {
                    resolved = true;
                    clearTimeout(timeout);
                    console.log('[WebSocket] Connected immediately');
                    _this.reconnectAttempts = 0;
                    resolve(_this.socket);
                  }
                  return;
                }
                _this.socket.on('connect', _connectHandler);
                _this.socket.on('connect_error', _errorHandler);
                _this.socket.on('disconnect', function (reason) {
                  console.log('[WebSocket] Disconnected:', reason);
                  // Handle reconnection with exponential backoff
                  if (reason === 'io server disconnect' || reason === 'transport close') {
                    // Server closed connection or transport error - attempt reconnection
                    _this.scheduleReconnect();
                  }
                });
                _this.socket.on('reconnect_attempt', function (attemptNumber) {
                  console.log("[WebSocket] Reconnection attempt ".concat(attemptNumber));
                  _this.reconnectAttempts = attemptNumber;
                });
                _this.socket.on('reconnect', function (attemptNumber) {
                  console.log("[WebSocket] Reconnected after ".concat(attemptNumber, " attempts"));
                  _this.reconnectAttempts = 0;
                  _this.reconnectDelay = _constants_app__WEBPACK_IMPORTED_MODULE_3__/* .WEBSOCKET_CONFIG */ .ld.RECONNECT_DELAY; // Reset delay on successful reconnect
                });
                _this.socket.on('reconnect_failed', function () {
                  console.error('[WebSocket] Reconnection failed after all attempts');
                  _this.reconnectAttempts = 0;
                  _this.reconnectDelay = _constants_app__WEBPACK_IMPORTED_MODULE_3__/* .WEBSOCKET_CONFIG */ .ld.RECONNECT_DELAY; // Reset delay
                });
              }));
          }
        }, _callee, this);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
      this.reconnectAttempts = 0;
      this.reconnectDelay = _constants_app__WEBPACK_IMPORTED_MODULE_3__/* .WEBSOCKET_CONFIG */ .ld.RECONNECT_DELAY;
    }

    /**
     * Schedule reconnection with exponential backoff
     */
  }, {
    key: "scheduleReconnect",
    value: function scheduleReconnect() {
      var _this2 = this;
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('[WebSocket] Max reconnection attempts reached');
        return;
      }
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
      }

      // Calculate delay with exponential backoff
      var delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts), this.maxReconnectDelay);
      console.log("[WebSocket] Scheduling reconnection in ".concat(delay, "ms (attempt ").concat(this.reconnectAttempts + 1, ")"));
      this.reconnectTimer = setTimeout(function () {
        _this2.reconnectAttempts++;
        _this2.connect().catch(function (error) {
          console.error('[WebSocket] Reconnection attempt failed:', error);
          // Schedule next attempt
          if (_this2.reconnectAttempts < _this2.maxReconnectAttempts) {
            _this2.scheduleReconnect();
          }
        });
      }, delay);
    }
  }, {
    key: "getSocket",
    value: function getSocket() {
      return this.socket;
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      var _this$socket2;
      return ((_this$socket2 = this.socket) === null || _this$socket2 === void 0 ? void 0 : _this$socket2.connected) || false;
    }

    // Room events
  }, {
    key: "joinRoom",
    value: function () {
      var _joinRoom = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(roomId) {
        var connectErrorMessage, errorMessage, _t, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              if (!(!this.socket || !this.socket.connected)) {
                _context2.n = 4;
                break;
              }
              // Try to connect first
              console.log('[WebSocket] Socket not connected, attempting to connect...');
              _context2.p = 1;
              _context2.n = 2;
              return this.connect();
            case 2:
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t = _context2.v;
              connectErrorMessage = _t instanceof Error ? _t.message : String(_t);
              console.warn("[WebSocket] Connection failed, but continuing with joinRoom attempt: ".concat(connectErrorMessage));
              // Don't throw here - try to emit anyway if socket exists
              if (!(!this.socket || !this.socket.connected)) {
                _context2.n = 4;
                break;
              }
              throw new Error("WebSocket ba\u011Flant\u0131s\u0131 kurulamad\u0131. Backend WebSocket server \xE7al\u0131\u015Fm\u0131yor olabilir: ".concat(connectErrorMessage));
            case 4:
              if (this.socket) {
                _context2.n = 5;
                break;
              }
              throw new Error('Socket instance is null after connection attempt');
            case 5:
              if (this.socket.connected) {
                _context2.n = 7;
                break;
              }
              _context2.n = 6;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              });
            case 6:
              if (this.socket.connected) {
                _context2.n = 7;
                break;
              }
              throw new Error('Socket connection failed - socket is not connected. Backend WebSocket server çalışmıyor olabilir.');
            case 7:
              console.log("[WebSocket] Joining room: ".concat(roomId));
              this.socket.emit('join-room', {
                roomId: roomId
              });
              console.log("[WebSocket] Join room event emitted for: ".concat(roomId));
              _context2.n = 9;
              break;
            case 8:
              _context2.p = 8;
              _t2 = _context2.v;
              errorMessage = _t2 instanceof Error ? _t2.message : String(_t2);
              console.error("[WebSocket] Error in joinRoom for ".concat(roomId, ":"), errorMessage);
              console.error('[WebSocket] Error details:', _t2);
              throw new Error("WebSocket ba\u011Flant\u0131 hatas\u0131: ".concat(errorMessage));
            case 9:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3], [0, 8]]);
      }));
      function joinRoom(_x) {
        return _joinRoom.apply(this, arguments);
      }
      return joinRoom;
    }()
  }, {
    key: "leaveRoom",
    value: function () {
      var _leaveRoom = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(roomId) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!(!this.socket || !this.socket.connected)) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              this.socket.emit('leave-room', {
                roomId: roomId
              });
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function leaveRoom(_x2) {
        return _leaveRoom.apply(this, arguments);
      }
      return leaveRoom;
    }()
  }, {
    key: "voteExtension",
    value: function () {
      var _voteExtension = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(roomId, vote) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!(!this.socket || !this.socket.connected)) {
                _context4.n = 1;
                break;
              }
              _context4.n = 1;
              return this.connect();
            case 1:
              if (!(!this.socket || !this.socket.connected)) {
                _context4.n = 2;
                break;
              }
              throw new Error('Socket not connected');
            case 2:
              this.socket.emit('vote-extension', {
                roomId: roomId,
                vote: vote
              });
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function voteExtension(_x3, _x4) {
        return _voteExtension.apply(this, arguments);
      }
      return voteExtension;
    }() // Matching events
  }, {
    key: "joinMatching",
    value: function () {
      var _joinMatching = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!(!this.socket || !this.socket.connected)) {
                _context5.n = 1;
                break;
              }
              _context5.n = 1;
              return this.connect();
            case 1:
              if (!(!this.socket || !this.socket.connected)) {
                _context5.n = 2;
                break;
              }
              throw new Error('Socket not connected');
            case 2:
              this.socket.emit('matching-join');
            case 3:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function joinMatching() {
        return _joinMatching.apply(this, arguments);
      }
      return joinMatching;
    }()
  }, {
    key: "leaveMatching",
    value: function () {
      var _leaveMatching = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(!this.socket || !this.socket.connected)) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2);
            case 1:
              this.socket.emit('matching-leave');
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function leaveMatching() {
        return _leaveMatching.apply(this, arguments);
      }
      return leaveMatching;
    }()
  }, {
    key: "getMatchingStatus",
    value: function () {
      var _getMatchingStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!(!this.socket || !this.socket.connected)) {
                _context7.n = 1;
                break;
              }
              _context7.n = 1;
              return this.connect();
            case 1:
              if (!(!this.socket || !this.socket.connected)) {
                _context7.n = 2;
                break;
              }
              throw new Error('Socket not connected');
            case 2:
              this.socket.emit('matching-status');
            case 3:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function getMatchingStatus() {
        return _getMatchingStatus.apply(this, arguments);
      }
      return getMatchingStatus;
    }() // Event listeners
  }, {
    key: "on",
    value: function on(event, callback) {
      var _this3 = this;
      if (!this.socket) {
        // Queue the listener to be set up when socket connects
        this.connect().then(function () {
          if (_this3.socket) {
            _this3.socket.on(event, callback);
          }
        }).catch(function () {
          // Connection failed, listener won't be set up
        });
        return;
      }
      this.socket.on(event, callback);
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      if (!this.socket) {
        return;
      }
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }]);
}();
var websocketClient = new WebSocketClient();

/***/ })

}]);