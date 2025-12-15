"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[144],{

/***/ 3144:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var _components_common_Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6046);
/* harmony import */ var _theme_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8504);
/* harmony import */ var _theme_spacing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7559);
/* harmony import */ var _theme_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7997);
/* harmony import */ var _theme_radius__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5194);
/* harmony import */ var _stores_authStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1104);
/* harmony import */ var _schemas_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9489);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2976);
/* harmony import */ var _stores_toastStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(791);
/* harmony import */ var _components_ui_Loading__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8556);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4848);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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













var LoginScreen = function LoginScreen(_ref) {
  var onSwitch = _ref.onSwitch,
    onLogin = _ref.onLogin;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    email = _useState2[0],
    setEmail = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    password = _useState4[0],
    setPassword = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showPassword = _useState6[0],
    setShowPassword = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState8 = _slicedToArray(_useState7, 2),
    errors = _useState8[0],
    setErrors = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState0 = _slicedToArray(_useState9, 2),
    touched = _useState0[0],
    setTouched = _useState0[1];
  var _useAuthStore = (0,_stores_authStore__WEBPACK_IMPORTED_MODULE_7__/* .useAuthStore */ .n)(),
    login = _useAuthStore.login,
    loading = _useAuthStore.loading;
  var validateField = function validateField(field, value) {
    try {
      var fieldSchema = _schemas_auth__WEBPACK_IMPORTED_MODULE_8__/* .loginSchema */ .X.shape[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      setErrors(function (prev) {
        var newErrors = _objectSpread({}, prev);
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof zod__WEBPACK_IMPORTED_MODULE_9__.z.ZodError && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
        var firstError = error.errors[0];
        setErrors(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, field, firstError && firstError.message || 'Geçersiz değer'));
        });
      } else {
        setErrors(function (prev) {
          return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, field, 'Geçersiz değer'));
        });
      }
    }
  };
  var handleEmailChange = function handleEmailChange(value) {
    setEmail(value);
    if (touched.email) {
      validateField('email', value);
    }
  };
  var handlePasswordChange = function handlePasswordChange(value) {
    setPassword(value);
    if (touched.password) {
      validateField('password', value);
    }
  };
  var handleBlur = function handleBlur(field) {
    setTouched(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, field, true));
    });
    validateField(field, field === 'email' ? email : password);
  };
  var handleLogin = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var validatedData, fieldErrors, firstError, fieldName, errorMsg, parsed, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            // Mark all fields as touched
            setTouched({
              email: true,
              password: true
            });

            // Validate entire form
            _context.p = 1;
            validatedData = _schemas_auth__WEBPACK_IMPORTED_MODULE_8__/* .loginSchema */ .X.parse({
              email: email.trim(),
              password: password
            });
            setErrors({});

            // Debug logging
            if (false) // removed by dead control flow
{}
            _context.n = 2;
            return login(validatedData);
          case 2:
            _stores_toastStore__WEBPACK_IMPORTED_MODULE_10__/* .toast */ .o.success('Giriş başarılı!');
            onLogin === null || onLogin === void 0 || onLogin();
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            // Debug logging
            if (false) // removed by dead control flow
{}
            if (_t instanceof zod__WEBPACK_IMPORTED_MODULE_9__.z.ZodError && _t.errors && Array.isArray(_t.errors)) {
              fieldErrors = {};
              _t.errors.forEach(function (err) {
                if (err && err.path && Array.isArray(err.path) && err.path.length > 0 && err.path[0] && err.message) {
                  fieldErrors[err.path[0]] = err.message;
                }
              });
              setErrors(fieldErrors);
              // İlk hatayı toast olarak göster
              if (_t.errors && Array.isArray(_t.errors) && _t.errors.length > 0) {
                firstError = _t.errors[0];
                if (firstError && firstError.message) {
                  fieldName = firstError.path && Array.isArray(firstError.path) && firstError.path.length > 0 ? firstError.path[0] : 'Alan';
                  _stores_toastStore__WEBPACK_IMPORTED_MODULE_10__/* .toast */ .o.error("".concat(fieldName, ": ").concat(firstError.message));
                }
              }
            } else if (_t instanceof Error) {
              // API veya diğer hatalar için genel hata mesajı göster
              // error.message'ı temizle (JSON string olabilir)
              errorMsg = _t.message || 'Giriş başarısız oldu'; // Eğer JSON gibi görünüyorsa, temizle
              if (errorMsg.trim().startsWith('{') || errorMsg.trim().startsWith('[')) {
                try {
                  parsed = JSON.parse(errorMsg);
                  if (parsed.message) errorMsg = parsed.message;else if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].message) {
                    errorMsg = parsed[0].message;
                  } else {
                    errorMsg = 'Giriş başarısız oldu';
                  }
                } catch (_unused) {
                  errorMsg = 'Giriş başarısız oldu';
                }
              }
              _stores_toastStore__WEBPACK_IMPORTED_MODULE_10__/* .toast */ .o.error(errorMsg);
            } else {
              _stores_toastStore__WEBPACK_IMPORTED_MODULE_10__/* .toast */ .o.error('Beklenmeyen bir hata oluştu');
            }
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return function handleLogin() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: styles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.backgroundShapes,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.blob1
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.blob2
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.content,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.header,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.logoContainer,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
            name: "graphic_eq",
            style: styles.logoIcon
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.title,
          children: "MatchTalk"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.subtitle,
          children: "Ho\u015F Geldiniz"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.form,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: styles.label,
            children: "E-posta"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.inputWrapper,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .TextInput */ .ks, {
              style: [styles.input, errors.email && typeof errors.email === 'string' && errors.email.trim() !== '' && touched.email ? styles.inputError : null].filter(Boolean),
              placeholder: "ornek@email.com",
              placeholderTextColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary,
              value: email,
              onChangeText: handleEmailChange,
              onBlur: function onBlur() {
                return handleBlur('email');
              },
              keyboardType: "email-address",
              autoCapitalize: "none",
              editable: !loading
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.inputIcon,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                name: "mail",
                style: styles.icon
              })
            })]
          }), touched.email && errors.email && typeof errors.email === 'string' && errors.email.trim() !== '' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: styles.errorText,
            children: errors.email
          }) : null]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.inputGroup,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: styles.label,
            children: "\u015Eifre"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.inputWrapper,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .TextInput */ .ks, {
              style: [styles.input, errors.password && typeof errors.password === 'string' && errors.password.trim() !== '' && touched.password ? styles.inputError : null].filter(Boolean),
              placeholder: "\u015Eifreniz",
              placeholderTextColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary,
              value: password,
              onChangeText: handlePasswordChange,
              onBlur: function onBlur() {
                return handleBlur('password');
              },
              secureTextEntry: !showPassword,
              editable: !loading
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
              style: styles.visibilityButton,
              onPress: function onPress() {
                return setShowPassword(!showPassword);
              },
              disabled: loading,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                name: showPassword ? 'visibility' : 'visibility_off',
                style: styles.icon
              })
            })]
          }), touched.password && errors.password && typeof errors.password === 'string' && errors.password.trim() !== '' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: styles.errorText,
            children: errors.password
          }) : null]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.forgotPassword,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
              style: styles.forgotPasswordText,
              children: "\u015Eifremi Unuttum?"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
          style: [styles.loginButton, loading ? styles.loginButtonDisabled : null].filter(Boolean),
          onPress: handleLogin,
          disabled: loading,
          children: loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_ui_Loading__WEBPACK_IMPORTED_MODULE_11__/* .ButtonLoading */ .N7, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
              style: styles.loginButtonText,
              children: "Giri\u015F Yap"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.buttonIconContainer,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                name: "arrow_forward",
                style: styles.buttonIcon
              })
            })]
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.footer,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.footerText,
          children: ["Hesab\u0131n yok mu?", ' ', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
            onPress: onSwitch,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
              style: styles.footerLink,
              children: "Kay\u0131t Ol"
            })
          })]
        })
      })]
    })]
  });
};
var styles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  container: _objectSpread({
    flex: 1,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.backgroundLight
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      minHeight: '100vh'
    }
  })),
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  },
  blob1: _objectSpread({
    position: 'absolute',
    top: '-10%',
    right: '-20%',
    width: '80%',
    height: '40%',
    borderRadius: 9999,
    backgroundColor: 'rgba(249, 245, 6, 0.2)'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      filter: 'blur(100px)'
    }
  })),
  blob2: _objectSpread({
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: '60%',
    height: '30%',
    borderRadius: 9999,
    backgroundColor: 'rgba(249, 245, 6, 0.1)'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      filter: 'blur(80px)'
    }
  })),
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    zIndex: 1
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.lg,
    shadowColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    transform: [{
      rotate: '3deg'
    }]
  },
  logoIcon: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold'
  },
  title: _objectSpread(_objectSpread({}, _theme_typography__WEBPACK_IMPORTED_MODULE_5__/* .typography */ .I.h1), {}, {
    fontSize: 32,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary,
    textAlign: 'center',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm
  }),
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary,
    textAlign: 'center'
  },
  form: {
    width: '100%'
  },
  inputGroup: {
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.lg
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary,
    paddingLeft: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xs
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    paddingRight: 48,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.full,
    borderWidth: 1,
    borderColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.borderLight,
    backgroundColor: '#fff',
    fontSize: 16,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary
  },
  inputIcon: {
    position: 'absolute',
    right: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    pointerEvents: 'none'
  },
  visibilityButton: {
    position: 'absolute',
    right: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm,
    top: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm,
    bottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.full,
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xs
  },
  icon: {
    fontSize: 20,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary
  },
  forgotPassword: {
    alignItems: 'flex-end',
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xs
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md,
    shadowColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  buttonIconContainer: {
    marginLeft: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm
  },
  buttonIcon: {
    fontSize: 20,
    color: '#000'
  },
  footer: {
    marginTop: 'auto',
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl,
    paddingBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary,
    textAlign: 'center'
  },
  footerLink: {
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary
  },
  loginButtonDisabled: {
    opacity: 0.6
  },
  inputError: {
    borderColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.danger
  },
  errorText: _objectSpread(_objectSpread({}, _theme_typography__WEBPACK_IMPORTED_MODULE_5__/* .typography */ .I.caption), {}, {
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.danger,
    marginTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xs,
    paddingLeft: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xs
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginScreen);

/***/ }),

/***/ 8556:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N7: () => (/* binding */ ButtonLoading)
/* harmony export */ });
/* unused harmony export Loading */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6540);
/* harmony import */ var react_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8618);
/* harmony import */ var _theme_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8504);
/* harmony import */ var _theme_spacing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7559);
/* harmony import */ var _theme_typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4848);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var Loading = function Loading(_ref) {
  var _ref$fullScreen = _ref.fullScreen,
    fullScreen = _ref$fullScreen === void 0 ? false : _ref$fullScreen,
    _ref$inline = _ref.inline,
    inline = _ref$inline === void 0 ? false : _ref$inline,
    message = _ref.message,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'large' : _ref$size,
    style = _ref.style;
  if (inline) {
    return /*#__PURE__*/_jsxs(View, {
      style: [styles.inlineContainer, style],
      children: [/*#__PURE__*/_jsx(ActivityIndicator, {
        size: size,
        color: colors.primary
      }), message && /*#__PURE__*/_jsx(Text, {
        style: styles.message,
        children: message
      })]
    });
  }
  if (fullScreen) {
    return /*#__PURE__*/_jsxs(View, {
      style: [styles.fullScreenContainer, style],
      children: [/*#__PURE__*/_jsx(ActivityIndicator, {
        size: size,
        color: colors.primary
      }), message && /*#__PURE__*/_jsx(Text, {
        style: styles.message,
        children: message
      })]
    });
  }
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    children: [/*#__PURE__*/_jsx(ActivityIndicator, {
      size: size,
      color: colors.primary
    }), message && /*#__PURE__*/_jsx(Text, {
      style: styles.message,
      children: message
    })]
  });
};
var ButtonLoading = function ButtonLoading(_ref2) {
  var _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 16 : _ref2$size;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .ActivityIndicator */ .$$, {
    size: "small",
    color: "#fff",
    style: {
      width: size,
      height: size
    }
  });
};
var styles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.xl
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 999
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.sm,
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.md
  },
  message: _objectSpread(_objectSpread({}, _theme_typography__WEBPACK_IMPORTED_MODULE_4__/* .typography */ .I.body), {}, {
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_2__/* .colors */ .T.textSecondaryMain,
    marginTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_3__/* .spacing */ .Y.sm
  })
});
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (Loading)));

/***/ }),

/***/ 9489:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ loginSchema),
/* harmony export */   z: () => (/* binding */ registerSchema)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2976);

var loginSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  email: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1, 'E-posta adresi gereklidir').email('Geçerli bir e-posta adresi giriniz').trim().toLowerCase(),
  password: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(6, 'Şifre en az 6 karakter olmalıdır').max(100, 'Şifre en fazla 100 karakter olabilir')
});
var registerSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  name: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(2, 'İsim en az 2 karakter olmalıdır').max(50, 'İsim en fazla 50 karakter olabilir').trim(),
  email: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1, 'E-posta adresi gereklidir').email('Geçerli bir e-posta adresi giriniz').trim().toLowerCase(),
  password: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(6, 'Şifre en az 6 karakter olmalıdır').max(100, 'Şifre en fazla 100 karakter olabilir').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir'),
  confirmPassword: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1, 'Şifre tekrarı gereklidir'),
  gender: zod__WEBPACK_IMPORTED_MODULE_0__.z["enum"](['male', 'female'], {
    errorMap: function errorMap() {
      return {
        message: 'Cinsiyet seçimi gereklidir'
      };
    }
  })
}).refine(function (data) {
  return data.password === data.confirmPassword;
}, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword']
});

/***/ })

}]);