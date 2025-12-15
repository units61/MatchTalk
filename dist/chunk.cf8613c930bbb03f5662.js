"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[59],{

/***/ 6059:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1080);
/* harmony import */ var _components_common_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6046);
/* harmony import */ var _theme_colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8504);
/* harmony import */ var _theme_spacing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7559);
/* harmony import */ var _theme_typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7997);
/* harmony import */ var _theme_radius__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5194);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4848);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









var NotificationsScreen = function NotificationsScreen(_ref) {
  var onBack = _ref.onBack;
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .useNavigate */ .Zp)();
  var handleBack = function handleBack() {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: styles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: styles.backButton,
        onPress: handleBack,
        accessibilityRole: "button",
        accessibilityLabel: "Geri d\xF6n",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
          name: "arrow_back_ios_new",
          style: styles.backIcon
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: styles.headerTitle,
        children: "Bildirimler"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.headerSpacer
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .ScrollView */ .BM, {
      style: styles.scrollView,
      contentContainerStyle: styles.scrollContent,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.emptyState,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
          name: "notifications_off",
          style: styles.emptyIcon
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.emptyTitle,
          children: "Hen\xFCz bildirim yok"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.emptySubtitle,
          children: "Yeni etkinlikler burada g\xF6r\xFCnecek."
        })]
      })
    })]
  });
};
var styles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  container: {
    flex: 1,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.backgroundLightMain
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xl,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.lg,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.backgroundLightMain,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_7__/* .radius */ .r.full
  },
  backIcon: {
    fontSize: 22,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textPrimary
  },
  headerTitle: _objectSpread(_objectSpread({}, _theme_typography__WEBPACK_IMPORTED_MODULE_6__/* .typography */ .I.heading), {}, {
    fontSize: 20,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textPrimary,
    flex: 1,
    textAlign: 'center'
  }),
  headerSpacer: {
    width: 40
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xl
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xxl
  },
  emptyIcon: {
    fontSize: 48,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textMuted
  },
  emptyTitle: _objectSpread(_objectSpread({}, _theme_typography__WEBPACK_IMPORTED_MODULE_6__/* .typography */ .I.bodyBold), {}, {
    fontSize: 18,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textPrimary
  }),
  emptySubtitle: _objectSpread(_objectSpread({}, _theme_typography__WEBPACK_IMPORTED_MODULE_6__/* .typography */ .I.body), {}, {
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationsScreen);

/***/ })

}]);