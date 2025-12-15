"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[335],{

/***/ 1335:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1080);
/* harmony import */ var _components_common_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6046);
/* harmony import */ var _components_common_Avatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6074);
/* harmony import */ var _components_ui_BottomNav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5192);
/* harmony import */ var _theme_colors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8504);
/* harmony import */ var _theme_spacing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7559);
/* harmony import */ var _theme_radius__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5194);
/* harmony import */ var _stores_friendsStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9944);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4848);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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











var FriendsScreen = function FriendsScreen(_ref) {
  var onTabChange = _ref.onTabChange;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('friends'),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('friends'),
    _useState4 = _slicedToArray(_useState3, 2),
    activeNavTab = _useState4[0],
    setActiveNavTab = _useState4[1];
  var _useFriendsStore = (0,_stores_friendsStore__WEBPACK_IMPORTED_MODULE_9__/* .useFriendsStore */ .G)(),
    friends = _useFriendsStore.friends,
    loading = _useFriendsStore.loading,
    fetchFriends = _useFriendsStore.fetchFriends,
    addFriend = _useFriendsStore.addFriend,
    removeFriend = _useFriendsStore.removeFriend;
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .useNavigate */ .Zp)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetchFriends();
  }, [fetchFriends]);
  var handleNavTabChange = function handleNavTabChange(tab) {
    setActiveNavTab(tab);
    onTabChange === null || onTabChange === void 0 || onTabChange(tab);
    // Navigate to the selected tab
    console.log("[FriendsScreen] Navigating to tab: ".concat(tab));
    navigate("/".concat(tab));
  };
  var handleRefresh = function handleRefresh() {
    fetchFriends();
  };
  var handleInvite = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(friendId) {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return addFriend(friendId);
          case 1:
            react_native__WEBPACK_IMPORTED_MODULE_1__/* .Alert */ .Fc.alert('Başarılı', 'Arkadaş davet edildi');
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            react_native__WEBPACK_IMPORTED_MODULE_1__/* .Alert */ .Fc.alert('Hata', 'Arkadaş davet edilemedi');
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function handleInvite(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: styles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: styles.headerTitle,
        children: "Arkada\u015Flar\u0131m"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: styles.searchButton,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
          name: "search",
          style: styles.searchIcon
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.tabs,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: [styles.tab, activeTab === 'friends' && styles.tabActive],
        onPress: function onPress() {
          return setActiveTab('friends');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: [styles.tabText, activeTab === 'friends' && styles.tabTextActive],
          children: "Arkada\u015Flar"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: [styles.tab, activeTab === 'requests' && styles.tabActive],
        onPress: function onPress() {
          return setActiveTab('requests');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: [styles.tabText, activeTab === 'requests' && styles.tabTextActive],
          children: "\u0130stekler"
        }), activeTab !== 'requests' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.badge
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .ScrollView */ .BM, {
      style: styles.scrollView,
      contentContainerStyle: styles.scrollContent,
      refreshControl: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .RefreshControl */ .Hx, {
        refreshing: loading,
        onRefresh: handleRefresh
      }),
      children: [activeTab === 'friends' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
        children: friends.length === 0 && !loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.emptyState,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
            name: "people",
            style: styles.emptyIcon
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: styles.emptyText,
            children: "Hen\xFCz arkada\u015F\u0131n\u0131z yok"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: styles.emptySubtext,
            children: "Kullan\u0131c\u0131 arayarak arkada\u015F ekleyebilirsiniz"
          })]
        }) : friends.map(function (friend) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.friendCard,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.friendInfo,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                style: styles.avatarContainer,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_common_Avatar__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
                  name: friend.name,
                  avatar: friend.avatar,
                  size: 56,
                  showBorder: true
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                  style: [styles.statusIndicator, {
                    backgroundColor: '#10b981'
                  } // Default online
                  ]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                style: styles.friendDetails,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                  style: styles.friendName,
                  children: friend.name
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                  style: styles.statusContainer,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                    style: [styles.statusDot, {
                      backgroundColor: '#10b981'
                    }]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                    style: styles.statusText,
                    children: "\xC7evrimi\xE7i"
                  })]
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
              style: styles.inviteButton,
              onPress: function onPress() {
                return handleInvite(friend.id);
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                style: styles.inviteButtonText,
                children: "Davet Et"
              })
            })]
          }, friend.id);
        })
      }), activeTab === 'requests' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
          name: "person_add",
          style: styles.emptyIcon
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.emptyText,
          children: "Hen\xFCz istek yok"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_ui_BottomNav__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A, {
      activeTab: activeNavTab,
      onTabChange: handleNavTabChange
    })]
  });
};
var styles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  container: _objectSpread({
    flex: 1,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.backgroundLightMain
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      minHeight: '100vh'
    }
  })),
  header: _objectSpread({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.backgroundLightMain,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(246, 246, 248, 0.95)'
    }
  })),
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.textPrimary
  },
  searchButton: {
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.sm,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_8__/* .radius */ .r.full
  },
  searchIcon: {
    fontSize: 28,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.textSecondary
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  tab: {
    flex: 1,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.sm,
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.sm,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    position: 'relative'
  },
  tabActive: {
    borderBottomColor: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.primaryIndigo
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.textSecondary,
    letterSpacing: 0.5
  },
  tabTextActive: {
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.primaryIndigo
  },
  badge: {
    position: 'absolute',
    top: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.sm,
    right: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.xl,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md,
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md,
    paddingBottom: 100
  },
  friendCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.05,
    shadowRadius: 2
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md,
    flex: 1,
    minWidth: 0
  },
  avatarContainer: {
    position: 'relative'
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff'
  },
  friendDetails: {
    flex: 1,
    minWidth: 0
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.textPrimary
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.xs / 2,
    marginTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.xs / 2
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  statusText: {
    fontSize: 12,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.textSecondary
  },
  inviteButton: {
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.primaryIndigo,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.sm,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md,
    borderRadius: 8,
    marginLeft: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md
  },
  inviteButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff'
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.xxl * 2,
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_7__/* .spacing */ .Y.md
  },
  emptyIcon: {
    fontSize: 64,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.textMuted
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.textPrimary
  },
  emptySubtext: {
    fontSize: 14,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_6__/* .colors */ .T.textSecondary,
    textAlign: 'center'
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FriendsScreen);

/***/ })

}]);