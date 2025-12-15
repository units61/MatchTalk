"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[927],{

/***/ 1914:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ useNavigation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var _stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7328);


var useNavigation = function useNavigation() {
  var navigate = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    return state.navigate;
  });
  var goBack = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    return state.goBack;
  });
  var replace = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    return state.replace;
  });
  var reset = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    return state.reset;
  });
  var openModal = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    return state.openModal;
  });
  var closeModal = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    return state.closeModal;
  });
  var getCurrentScreen = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    return state.getCurrentScreen;
  });
  var getCurrentParams = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    return state.getCurrentParams;
  });
  var currentScreen = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    var _stack;
    var stack = state.stack;
    return ((_stack = stack[stack.length - 1]) === null || _stack === void 0 ? void 0 : _stack.screen) || 'home';
  });
  var currentParams = (0,_stores_navigationStore__WEBPACK_IMPORTED_MODULE_1__/* .useNavigationStore */ .l)(function (state) {
    var _stack2;
    var stack = state.stack;
    return (_stack2 = stack[stack.length - 1]) === null || _stack2 === void 0 ? void 0 : _stack2.params;
  });
  var navigateTo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (screen, params) {
    navigate(screen, params);
  }, [navigate]);
  var navigateBack = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    goBack();
  }, [goBack]);
  var navigateReplace = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (screen, params) {
    replace(screen, params);
  }, [replace]);
  var navigateReset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    reset();
  }, [reset]);
  var showModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (screen, params) {
    openModal(screen, params);
  }, [openModal]);
  var hideModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    closeModal();
  }, [closeModal]);
  return {
    navigate: navigateTo,
    goBack: navigateBack,
    replace: navigateReplace,
    reset: navigateReset,
    openModal: showModal,
    closeModal: hideModal,
    currentScreen: currentScreen,
    currentParams: currentParams,
    getCurrentScreen: getCurrentScreen,
    getCurrentParams: getCurrentParams
  };
};

/***/ }),

/***/ 4927:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1080);
/* harmony import */ var _components_common_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6046);
/* harmony import */ var _components_ui_BottomNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5192);
/* harmony import */ var _hooks_useNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1914);
/* harmony import */ var _stores_authStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1104);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4848);
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








var SettingsScreen = function SettingsScreen(_ref) {
  var onTabChange = _ref.onTabChange,
    onBack = _ref.onBack;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('settings'),
    _useState2 = _slicedToArray(_useState, 2),
    activeNavTab = _useState2[0],
    setActiveNavTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    pushNotifications = _useState4[0],
    setPushNotifications = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    emailNotifications = _useState6[0],
    setEmailNotifications = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState8 = _slicedToArray(_useState7, 2),
    roomInvites = _useState8[0],
    setRoomInvites = _useState8[1];
  var _useNavigation = (0,_hooks_useNavigation__WEBPACK_IMPORTED_MODULE_5__/* .useNavigation */ .c)(),
    navigate = _useNavigation.navigate;
  var navigateRouter = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .useNavigate */ .Zp)(); // React Router navigate
  var _useAuthStore = (0,_stores_authStore__WEBPACK_IMPORTED_MODULE_6__/* .useAuthStore */ .n)(),
    logout = _useAuthStore.logout;
  var colorScheme = (0,react_native__WEBPACK_IMPORTED_MODULE_1__/* .useColorScheme */ .Ut)();
  var isDark = colorScheme === 'dark';
  var handleNavTabChange = function handleNavTabChange(tab) {
    setActiveNavTab(tab);
    onTabChange === null || onTabChange === void 0 || onTabChange(tab);
    // Navigate to the selected tab
    console.log("[SettingsScreen] Navigating to tab: ".concat(tab));
    navigateRouter("/".concat(tab));
  };
  var handleLogout = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return logout();
          case 1:
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Logout error:', _t);
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function handleLogout() {
      return _ref2.apply(this, arguments);
    };
  }();
  var ToggleSwitch = function ToggleSwitch(_ref3) {
    var value = _ref3.value,
      onValueChange = _ref3.onValueChange;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
      style: styles.toggleWrapper,
      onPress: function onPress() {
        return onValueChange(!value);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: [styles.toggleContainer, isDark && styles.toggleContainerDark, value && styles.toggleContainerActive],
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: [styles.toggleThumb, value && styles.toggleThumbActive]
        })
      })
    });
  };
  var dynamicStyles = {
    container: [styles.container, isDark && styles.containerDark],
    header: [styles.header, isDark && styles.headerDark],
    headerTitle: react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.flatten([styles.headerTitle, isDark && styles.headerTitleDark]),
    backIcon: react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.flatten([styles.backIcon, isDark && styles.backIconDark]),
    sectionTitle: react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.flatten([styles.sectionTitle, isDark && styles.sectionTitleDark]),
    menuItem: [styles.menuItem, isDark && styles.menuItemDark],
    menuIconContainer: [styles.menuIconContainer, isDark && styles.menuIconContainerDark],
    menuIcon: react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.flatten([styles.menuIcon, isDark && styles.menuIconDark]),
    menuTitle: react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.flatten([styles.menuTitle, isDark && styles.menuTitleDark]),
    menuSubtitle: react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.flatten([styles.menuSubtitle, isDark && styles.menuSubtitleDark]),
    toggleItem: [styles.toggleItem, isDark && styles.toggleItemDark],
    toggleContainer: [styles.toggleContainer, isDark && styles.toggleContainerDark],
    dangerButton: [styles.dangerButton, isDark && styles.dangerButtonDark],
    versionText: react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.flatten([styles.versionText, isDark && styles.versionTextDark])
  };
  var MenuItem = function MenuItem(_ref4) {
    var icon = _ref4.icon,
      title = _ref4.title,
      subtitle = _ref4.subtitle,
      onPress = _ref4.onPress,
      _ref4$showChevron = _ref4.showChevron,
      showChevron = _ref4$showChevron === void 0 ? true : _ref4$showChevron;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
      style: function style(_ref5) {
        var pressed = _ref5.pressed;
        return [dynamicStyles.menuItem, pressed && styles.menuItemPressed];
      },
      onPress: onPress,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.menuItemLeft,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: dynamicStyles.menuIconContainer,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
            name: icon,
            style: dynamicStyles.menuIcon
          })
        }), subtitle ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.menuTextContainer,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: dynamicStyles.menuTitle,
            children: title
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: dynamicStyles.menuTitle,
          children: title
        })]
      }), subtitle ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.menuItemRight,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: dynamicStyles.menuSubtitle,
          children: subtitle
        }), showChevron && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
          name: "chevron_right",
          style: styles.chevronIcon
        })]
      }) : showChevron && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
        name: "chevron_right",
        style: styles.chevronIcon
      })]
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: dynamicStyles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: dynamicStyles.header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: function style(_ref6) {
          var pressed = _ref6.pressed;
          return [styles.backButton, pressed && styles.backButtonPressed];
        },
        onPress: onBack,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
          name: "arrow_back_ios_new",
          style: dynamicStyles.backIcon
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: dynamicStyles.headerTitle,
        children: "Ayarlar"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.headerSpacer
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .ScrollView */ .BM, {
      style: styles.scrollView,
      contentContainerStyle: styles.scrollContent,
      showsVerticalScrollIndicator: false,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.sectionFirst,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: dynamicStyles.sectionTitle,
          children: "HESAP"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.sectionContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "edit",
            title: "Profil D\xFCzenle",
            onPress: function onPress() {
              return navigate('editProfile');
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "lock",
            title: "\u015Eifre De\u011Fi\u015Ftir",
            onPress: function onPress() {
              return navigate('changePassword');
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "mail",
            title: "E-posta De\u011Fi\u015Ftir",
            onPress: function onPress() {
              return navigate('changeEmail');
            }
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.section,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: dynamicStyles.sectionTitle,
          children: "B\u0130LD\u0130R\u0130MLER"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.sectionContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: dynamicStyles.toggleItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.toggleItemLeft,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                style: dynamicStyles.menuIconContainer,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                  name: "notifications",
                  style: dynamicStyles.menuIcon
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                style: dynamicStyles.menuTitle,
                children: "Push Bildirimleri"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(ToggleSwitch, {
              value: pushNotifications,
              onValueChange: setPushNotifications
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: dynamicStyles.toggleItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.toggleItemLeft,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                style: dynamicStyles.menuIconContainer,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                  name: "mark_email_unread",
                  style: dynamicStyles.menuIcon
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                style: dynamicStyles.menuTitle,
                children: "E-posta Bildirimleri"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(ToggleSwitch, {
              value: emailNotifications,
              onValueChange: setEmailNotifications
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: dynamicStyles.toggleItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.toggleItemLeft,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                style: dynamicStyles.menuIconContainer,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                  name: "group_add",
                  style: dynamicStyles.menuIcon
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                style: dynamicStyles.menuTitle,
                children: "Oda Davetleri"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(ToggleSwitch, {
              value: roomInvites,
              onValueChange: setRoomInvites
            })]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.section,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: dynamicStyles.sectionTitle,
          children: "G\u0130ZL\u0130L\u0130K"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.sectionContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "visibility",
            title: "Profil G\xF6r\xFCn\xFCrl\xFC\u011F\xFC",
            subtitle: "Herkes"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "person_add",
            title: "Kimler Beni Ekleyebilir",
            subtitle: "Herkes"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.section,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: dynamicStyles.sectionTitle,
          children: "UYGULAMA"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.sectionContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "dark_mode",
            title: "Tema",
            subtitle: "Koyu"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "language",
            title: "Dil",
            subtitle: "T\xFCrk\xE7e"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "info",
            title: "Hakk\u0131nda"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "help",
            title: "Yard\u0131m & Destek"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "policy",
            title: "Gizlilik Politikas\u0131"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(MenuItem, {
            icon: "description",
            title: "Kullan\u0131m Ko\u015Fullar\u0131"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.section,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: dynamicStyles.sectionTitle,
          children: "HESAP Y\xD6NET\u0130M\u0130"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.sectionContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
            style: function style(_ref7) {
              var pressed = _ref7.pressed;
              return [dynamicStyles.dangerButton, pressed && styles.dangerButtonPressed];
            },
            onPress: handleLogout,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
              style: styles.dangerButtonText,
              children: "\xC7\u0131k\u0131\u015F Yap"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
            style: function style(_ref8) {
              var pressed = _ref8.pressed;
              return [dynamicStyles.dangerButton, pressed && styles.dangerButtonPressed];
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
              style: styles.dangerButtonText,
              children: "Hesab\u0131 Sil"
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.versionContainer,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: dynamicStyles.versionText,
          children: "MatchTalk v2.4.0"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ui_BottomNav__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {
      activeTab: activeNavTab,
      onTabChange: handleNavTabChange
    })]
  });
};
var styles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8' // background-light
  },
  header: _objectSpread({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // px-4
    paddingTop: 24,
    // pt-6
    paddingBottom: 16,
    // pb-4
    backgroundColor: '#f6f6f8'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.OS === 'web' ? {
    position: 'sticky',
    top: 0,
    zIndex: 50
  } : {}),
  backButton: _objectSpread({
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      cursor: 'pointer',
      transition: 'all 0.2s',
      ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
      },
      ':active': {
        transform: 'scale(0.95)'
      }
    }
  })),
  backButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    transform: [{
      scale: 0.95
    }]
  },
  backIcon: {
    fontSize: 24,
    color: '#000' // text-black
  },
  headerTitle: {
    fontSize: 24,
    // text-2xl
    fontWeight: '700',
    // font-bold
    color: '#000',
    // text-black
    flex: 1,
    textAlign: 'center',
    paddingRight: 40 // pr-10
  },
  headerSpacer: {
    width: 40
  },
  scrollView: {
    flex: 1
  },
  scrollContent: _objectSpread({
    paddingHorizontal: 16,
    // px-4
    paddingBottom: 48
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      // no-scrollbar
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }
  })),
  section: {
    marginTop: 24 // mt-6
  },
  sectionFirst: {
    marginTop: 8 // mt-2
  },
  sectionTitle: {
    fontSize: 11,
    // text-xs
    fontWeight: '600',
    // font-semibold
    color: '#94A3B8',
    // text-text-secondary
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    // tracking-[0.1em]
    marginBottom: 8,
    // mb-2
    paddingLeft: 4 // pl-1
  },
  sectionContent: {
    gap: 8 // gap-2
  },
  menuItem: _objectSpread({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    // bg-white (dark: bg-surface-dark)
    padding: 16,
    // p-4
    borderRadius: 12
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      transition: 'background-color 0.15s',
      cursor: 'pointer',
      ':active': {
        backgroundColor: '#f3f4f6' // active:bg-gray-100
      }
    }
  })),
  menuItemPressed: {
    backgroundColor: '#f3f4f6' // active:bg-gray-100 (dark: active:bg-slate-700)
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    // gap-4
    flex: 1
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8 // gap-2
  },
  menuIconContainer: {
    width: 40,
    // size-10
    height: 40,
    borderRadius: 8,
    // rounded-lg
    backgroundColor: 'rgba(64, 64, 242, 0.1)',
    // bg-primary/10
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  menuIcon: {
    fontSize: 20,
    color: '#4040f2' // text-primary
  },
  menuTextContainer: {
    flex: 1
  },
  menuTitle: {
    fontSize: 15,
    // text-[15px]
    fontWeight: '500',
    // font-medium
    color: '#111827' // text-gray-900 (dark: text-white)
  },
  menuSubtitle: {
    fontSize: 14,
    // text-sm
    color: '#94A3B8' // text-text-secondary
  },
  chevronIcon: {
    fontSize: 20,
    color: '#9ca3af' // text-gray-400
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    // bg-white (dark: bg-surface-dark)
    padding: 16,
    // p-4
    borderRadius: 12 // rounded-xl
  },
  toggleItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    // gap-4
    flex: 1
  },
  toggleWrapper: {
    marginRight: 8 // mr-2
  },
  toggleContainer: {
    width: 48,
    // w-12
    height: 32,
    // h-8
    borderRadius: 16,
    // rounded-full
    backgroundColor: '#d1d5db',
    // bg-gray-300 (dark: bg-slate-600)
    padding: 4,
    // border-4
    justifyContent: 'center',
    position: 'relative'
  },
  toggleContainerActive: {
    backgroundColor: '#4040f2' // primary color when checked
  },
  toggleThumb: _objectSpread({
    width: 24,
    // w-6
    height: 24,
    // h-6
    borderRadius: 12,
    // rounded-full
    backgroundColor: '#fff',
    position: 'absolute',
    left: 4,
    // left-1
    top: 4,
    // top-1
    transform: [{
      translateX: 0
    }]
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      transition: 'transform 0.3s'
    }
  })),
  toggleThumbActive: {
    transform: [{
      translateX: 20
    }] // translateX(100%) = 24px (thumb width) - 4px (left) = 20px
  },
  dangerButton: _objectSpread({
    backgroundColor: '#fff',
    // bg-white (dark: bg-surface-dark)
    padding: 16,
    // p-4
    borderRadius: 12,
    // rounded-xl
    alignItems: 'center',
    justifyContent: 'center'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      transition: 'background-color 0.15s',
      cursor: 'pointer',
      ':active': {
        backgroundColor: '#f3f4f6' // active:bg-gray-100
      }
    }
  })),
  dangerButtonPressed: {
    backgroundColor: '#f3f4f6' // active:bg-gray-100 (dark: active:bg-slate-700)
  },
  dangerButtonText: {
    fontSize: 15,
    // text-[15px]
    fontWeight: '500',
    // font-medium
    color: '#ef4444' // text-red-500
  },
  versionContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 16,
    // pt-4
    paddingBottom: 32 // pb-8
  },
  versionText: {
    fontSize: 11,
    // text-xs
    color: 'rgba(148, 163, 184, 0.5)' // text-text-secondary/50
  },
  // Dark mode styles
  containerDark: {
    backgroundColor: '#0F172A' // background-dark
  },
  headerDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)' // background-dark/95
  },
  headerTitleDark: {
    color: '#fff' // text-white
  },
  backIconDark: {
    color: '#fff' // text-white
  },
  sectionTitleDark: {
    color: '#94A3B8' // text-text-secondary
  },
  menuItemDark: {
    backgroundColor: '#1E293B' // bg-surface-dark
  },
  menuIconContainerDark: {
    backgroundColor: '#475569' // bg-slate-700
  },
  menuIconDark: {
    color: '#fff' // text-white
  },
  menuTitleDark: {
    color: '#fff' // text-white
  },
  menuSubtitleDark: {
    color: '#94A3B8' // text-text-secondary
  },
  toggleItemDark: {
    backgroundColor: '#1E293B' // bg-surface-dark
  },
  toggleContainerDark: {
    backgroundColor: '#475569' // bg-slate-600
  },
  dangerButtonDark: {
    backgroundColor: '#1E293B' // bg-surface-dark
  },
  versionTextDark: {
    color: 'rgba(148, 163, 184, 0.5)' // text-text-secondary/50
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsScreen);

/***/ }),

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

/***/ })

}]);