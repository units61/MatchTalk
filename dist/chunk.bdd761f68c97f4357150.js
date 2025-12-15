"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[522],{

/***/ 5192:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var _common_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6046);
/* harmony import */ var _theme_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8504);
/* harmony import */ var _theme_spacing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7559);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4848);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var BottomNav = function BottomNav(_ref) {
  var activeTab = _ref.activeTab,
    onTabChange = _ref.onTabChange;
  var tabs = [{
    id: 'home',
    icon: 'home',
    label: 'Ana Sayfa'
  }, {
    id: 'friends',
    icon: 'group',
    label: 'Arkadaşlar'
  }, {
    id: 'profile',
    icon: 'person',
    label: 'Profil'
  }, {
    id: 'settings',
    icon: 'settings',
    label: 'Ayarlar'
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: styles.container,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.content,
      children: tabs.map(function (tab) {
        var isActive = activeTab === tab.id;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
          style: styles.tab,
          onPress: function onPress() {
            return onTabChange(tab.id);
          },
          accessibilityRole: "button",
          accessibilityLabel: tab.label,
          accessibilityState: {
            selected: isActive
          },
          accessibilityHint: "".concat(tab.label, " sekmesine ge\xE7"),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.tabContent,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
              name: tab.icon,
              style: [styles.icon, isActive && styles.iconActive]
            }), isActive && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.indicator
            })]
          })
        }, tab.id);
      })
    })
  });
};
var styles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  container: _objectSpread({
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    height: 84,
    paddingBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 40
    }
  })),
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%'
  },
  tab: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xs / 2
  },
  icon: {
    fontSize: 28,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary
  },
  iconActive: {
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primaryIndigo
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primaryIndigo
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BottomNav);

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

/***/ 9944:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  G: () => (/* binding */ useFriendsStore)
});

// EXTERNAL MODULE: ./node_modules/zustand/esm/index.mjs + 1 modules
var esm = __webpack_require__(1621);
// EXTERNAL MODULE: ./src/lib/apiClient.ts
var apiClient = __webpack_require__(5859);
;// ./src/services/api/friendsApi.ts
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var friendsApi = {
  /**
   * Arkadaş listesini getir
   */
  getFriends: function getFriends() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return apiClient/* apiClient */.u.get('/friends');
          case 1:
            return _context.a(2, _context.v);
        }
      }, _callee);
    }))();
  },
  /**
   * Kullanıcı ara
   */
  searchUsers: function searchUsers(query) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return apiClient/* apiClient */.u.get("/friends/search?q=".concat(encodeURIComponent(query)));
          case 1:
            return _context2.a(2, _context2.v);
        }
      }, _callee2);
    }))();
  },
  /**
   * Arkadaş ekle
   */
  addFriend: function addFriend(friendId) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return apiClient/* apiClient */.u.post('/friends', {
              friendId: friendId
            });
          case 1:
            return _context3.a(2, _context3.v);
        }
      }, _callee3);
    }))();
  },
  /**
   * Arkadaşlığı kaldır
   */
  removeFriend: function removeFriend(friendId) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return apiClient/* apiClient */.u.delete("/friends/".concat(friendId));
          case 1:
            return _context4.a(2, _context4.v);
        }
      }, _callee4);
    }))();
  }
};
;// ./src/stores/friendsStore.ts
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function friendsStore_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return friendsStore_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (friendsStore_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, friendsStore_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, friendsStore_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), friendsStore_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", friendsStore_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), friendsStore_regeneratorDefine2(u), friendsStore_regeneratorDefine2(u, o, "Generator"), friendsStore_regeneratorDefine2(u, n, function () { return this; }), friendsStore_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (friendsStore_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function friendsStore_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } friendsStore_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { friendsStore_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, friendsStore_regeneratorDefine2(e, r, n, t); }
function friendsStore_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function friendsStore_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { friendsStore_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { friendsStore_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


var useFriendsStore = (0,esm/* create */.vt)(function (set) {
  return {
    friends: [],
    searchResults: [],
    loading: false,
    error: null,
    fetchFriends: function () {
      var _fetchFriends = friendsStore_asyncToGenerator(/*#__PURE__*/friendsStore_regenerator().m(function _callee() {
        var friendList, friends, _t;
        return friendsStore_regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              set({
                loading: true,
                error: null
              });
              _context.n = 1;
              return friendsApi.getFriends();
            case 1:
              friendList = _context.v;
              friends = friendList.map(function (f) {
                return f.friend;
              });
              set({
                friends: friends,
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
                error: _t instanceof Error ? _t.message : 'Arkadaşlar yüklenemedi'
              });
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      function fetchFriends() {
        return _fetchFriends.apply(this, arguments);
      }
      return fetchFriends;
    }(),
    searchUsers: function () {
      var _searchUsers = friendsStore_asyncToGenerator(/*#__PURE__*/friendsStore_regenerator().m(function _callee2(query) {
        var users, _t2;
        return friendsStore_regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              if (query.trim()) {
                _context2.n = 1;
                break;
              }
              set({
                searchResults: []
              });
              return _context2.a(2);
            case 1:
              set({
                loading: true,
                error: null
              });
              _context2.n = 2;
              return friendsApi.searchUsers(query);
            case 2:
              users = _context2.v;
              set({
                searchResults: users,
                loading: false,
                error: null
              });
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              set({
                loading: false,
                error: _t2 instanceof Error ? _t2.message : 'Arama başarısız',
                searchResults: []
              });
            case 4:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 3]]);
      }));
      function searchUsers(_x) {
        return _searchUsers.apply(this, arguments);
      }
      return searchUsers;
    }(),
    addFriend: function () {
      var _addFriend = friendsStore_asyncToGenerator(/*#__PURE__*/friendsStore_regenerator().m(function _callee3(friendId) {
        var response, _t3;
        return friendsStore_regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              set({
                loading: true,
                error: null
              });
              _context3.n = 1;
              return friendsApi.addFriend(friendId);
            case 1:
              response = _context3.v;
              set(function (state) {
                return {
                  friends: [].concat(_toConsumableArray(state.friends), [response.friend]),
                  loading: false,
                  error: null
                };
              });
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              set({
                loading: false,
                error: _t3 instanceof Error ? _t3.message : 'Arkadaş eklenemedi'
              });
              throw _t3;
            case 3:
              return _context3.a(2);
          }
        }, _callee3, null, [[0, 2]]);
      }));
      function addFriend(_x2) {
        return _addFriend.apply(this, arguments);
      }
      return addFriend;
    }(),
    removeFriend: function () {
      var _removeFriend = friendsStore_asyncToGenerator(/*#__PURE__*/friendsStore_regenerator().m(function _callee4(friendId) {
        var _t4;
        return friendsStore_regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              set({
                loading: true,
                error: null
              });
              _context4.n = 1;
              return friendsApi.removeFriend(friendId);
            case 1:
              set(function (state) {
                return {
                  friends: state.friends.filter(function (f) {
                    return f.id !== friendId;
                  }),
                  loading: false,
                  error: null
                };
              });
              _context4.n = 3;
              break;
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              set({
                loading: false,
                error: _t4 instanceof Error ? _t4.message : 'Arkadaşlık kaldırılamadı'
              });
              throw _t4;
            case 3:
              return _context4.a(2);
          }
        }, _callee4, null, [[0, 2]]);
      }));
      function removeFriend(_x3) {
        return _removeFriend.apply(this, arguments);
      }
      return removeFriend;
    }(),
    clearSearch: function clearSearch() {
      set({
        searchResults: []
      });
    },
    clearError: function clearError() {
      set({
        error: null
      });
    }
  };
});

/***/ })

}]);