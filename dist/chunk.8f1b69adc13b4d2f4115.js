"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[668],{

/***/ 5668:
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













var RegisterScreen = function RegisterScreen(_ref) {
  var onSwitch = _ref.onSwitch,
    onRegisterSuccess = _ref.onRegisterSuccess;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    name = _useState2[0],
    setName = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    email = _useState4[0],
    setEmail = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    password = _useState6[0],
    setPassword = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    confirmPassword = _useState8[0],
    setConfirmPassword = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    gender = _useState0[0],
    setGender = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    showPassword = _useState10[0],
    setShowPassword = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    showConfirmPassword = _useState12[0],
    setShowConfirmPassword = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState14 = _slicedToArray(_useState13, 2),
    errors = _useState14[0],
    setErrors = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState16 = _slicedToArray(_useState15, 2),
    touched = _useState16[0],
    setTouched = _useState16[1];
  var _useAuthStore = (0,_stores_authStore__WEBPACK_IMPORTED_MODULE_7__/* .useAuthStore */ .n)(),
    register = _useAuthStore.register,
    loading = _useAuthStore.loading;
  var validateField = function validateField(field, value) {
    try {
      var fieldSchema = _schemas_auth__WEBPACK_IMPORTED_MODULE_8__/* .registerSchema */ .z.shape[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      setErrors(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, field, ''));
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
  var handleNameChange = function handleNameChange(value) {
    setName(value);
    if (touched.name) {
      validateField('name', value);
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
    // Re-validate confirm password if it's been touched
    if (touched.confirmPassword) {
      validateField('confirmPassword', confirmPassword);
    }
  };
  var handleConfirmPasswordChange = function handleConfirmPasswordChange(value) {
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      validateField('confirmPassword', value);
    }
  };
  var handleGenderChange = function handleGenderChange(value) {
    setGender(value);
    if (touched.gender) {
      validateField('gender', value);
    }
  };
  var handleBlur = function handleBlur(field) {
    setTouched(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, field, true));
    });
    if (field === 'name') {
      validateField('name', name);
    } else if (field === 'email') {
      validateField('email', email);
    } else if (field === 'password') {
      validateField('password', password);
    } else if (field === 'confirmPassword') {
      validateField('confirmPassword', confirmPassword);
    } else if (field === 'gender') {
      validateField('gender', gender);
    }
  };
  var handleRegister = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var validatedData, fieldErrors, errorMsg, parsed, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            // Mark all fields as touched
            setTouched({
              name: true,
              email: true,
              password: true,
              confirmPassword: true,
              gender: true
            });

            // Validate entire form
            _context.p = 1;
            validatedData = _schemas_auth__WEBPACK_IMPORTED_MODULE_8__/* .registerSchema */ .z.parse({
              name: name.trim(),
              email: email.trim(),
              password: password,
              confirmPassword: confirmPassword,
              gender: gender
            });
            setErrors({});
            _context.n = 2;
            return register({
              email: validatedData.email,
              name: validatedData.name,
              password: validatedData.password,
              gender: validatedData.gender
            });
          case 2:
            _stores_toastStore__WEBPACK_IMPORTED_MODULE_10__/* .toast */ .o.success('Kayıt başarılı!');
            onRegisterSuccess === null || onRegisterSuccess === void 0 || onRegisterSuccess();
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            if (_t instanceof zod__WEBPACK_IMPORTED_MODULE_9__.z.ZodError && _t.errors && Array.isArray(_t.errors)) {
              fieldErrors = {};
              _t.errors.forEach(function (err) {
                if (err && err.path && Array.isArray(err.path) && err.path.length > 0 && err.path[0] && err.message) {
                  fieldErrors[err.path[0]] = err.message;
                }
              });
              setErrors(fieldErrors);
            } else if (_t instanceof Error) {
              // API veya diğer hatalar için genel hata mesajı göster
              errorMsg = _t.message || 'Kayıt başarısız oldu'; // Eğer JSON gibi görünüyorsa, temizle
              if (errorMsg.trim().startsWith('{') || errorMsg.trim().startsWith('[')) {
                try {
                  parsed = JSON.parse(errorMsg);
                  if (parsed.message) errorMsg = parsed.message;else if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].message) {
                    errorMsg = parsed[0].message;
                  } else {
                    errorMsg = 'Kayıt başarısız oldu';
                  }
                } catch (_unused) {
                  errorMsg = 'Kayıt başarısız oldu';
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
    return function handleRegister() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: styles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: styles.backButton,
        onPress: onSwitch,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
          name: "arrow_back_ios_new",
          style: styles.backIcon
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: styles.headerTitle,
        children: "Hesap Olu\u015Ftur"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.headerSpacer
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .ScrollView */ .BM, {
      style: styles.scrollView,
      contentContainerStyle: styles.scrollContent,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.progressContainer,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.progressBar
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.inputGroup,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.label,
          children: "Kullan\u0131c\u0131 Ad\u0131"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.inputWrapper,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.inputIconLeft,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
              name: "person",
              style: styles.icon
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .TextInput */ .ks, {
            style: [styles.input, errors.name && touched.name && styles.inputError],
            placeholder: "Kullan\u0131c\u0131 ad\u0131n\u0131z\u0131 girin",
            placeholderTextColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary,
            value: name,
            onChangeText: handleNameChange,
            onBlur: function onBlur() {
              return handleBlur('name');
            },
            editable: !loading
          })]
        }), errors.name && touched.name && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.errorText,
          children: errors.name
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.inputGroup,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.label,
          children: "E-posta"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.inputWrapper,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.inputIconLeft,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
              name: "mail",
              style: styles.icon
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .TextInput */ .ks, {
            style: [styles.input, errors.email && touched.email && styles.inputError],
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
          })]
        }), errors.email && touched.email && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.errorText,
          children: errors.email
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.inputGroup,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.label,
          children: "\u015Eifre"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.inputWrapper,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.inputIconLeft,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
              name: "lock",
              style: styles.icon
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .TextInput */ .ks, {
            style: [styles.input, errors.password && touched.password && styles.inputError],
            placeholder: "********",
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
        }), errors.password && touched.password && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.errorText,
          children: errors.password
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.inputGroup,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.label,
          children: "\u015Eifre Tekrar"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.inputWrapper,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.inputIconLeft,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
              name: "lock_reset",
              style: styles.icon
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .TextInput */ .ks, {
            style: [styles.input, errors.confirmPassword && touched.confirmPassword && styles.inputError],
            placeholder: "********",
            placeholderTextColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary,
            value: confirmPassword,
            onChangeText: handleConfirmPasswordChange,
            onBlur: function onBlur() {
              return handleBlur('confirmPassword');
            },
            secureTextEntry: !showConfirmPassword,
            editable: !loading
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
            style: styles.visibilityButton,
            onPress: function onPress() {
              return setShowConfirmPassword(!showConfirmPassword);
            },
            disabled: loading,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
              name: showConfirmPassword ? 'visibility' : 'visibility_off',
              style: styles.icon
            })
          })]
        }), errors.confirmPassword && touched.confirmPassword && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.errorText,
          children: errors.confirmPassword
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.inputGroup,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.label,
          children: "Cinsiyet"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.genderContainer,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
            style: [styles.genderButton, gender === 'male' && styles.genderButtonActive],
            onPress: function onPress() {
              return handleGenderChange('male');
            },
            disabled: loading,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
              name: "male",
              style: [styles.genderIcon, gender === 'male' && styles.genderIconActive]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
              style: [styles.genderText, gender === 'male' && styles.genderTextActive],
              children: "Erkek"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
            style: [styles.genderButton, gender === 'female' && styles.genderButtonActive],
            onPress: function onPress() {
              return handleGenderChange('female');
            },
            disabled: loading,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
              name: "female",
              style: [styles.genderIcon, gender === 'female' && styles.genderIconActive]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
              style: [styles.genderText, gender === 'female' && styles.genderTextActive],
              children: "Kad\u0131n"
            })]
          })]
        }), errors.gender && touched.gender && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.errorText,
          children: errors.gender
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.footer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: [styles.registerButton, loading && styles.registerButtonDisabled],
        onPress: handleRegister,
        disabled: loading,
        children: loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_ui_Loading__WEBPACK_IMPORTED_MODULE_11__/* .ButtonLoading */ .N7, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.registerButtonText,
          children: "Kay\u0131t Ol"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        onPress: onSwitch,
        style: styles.loginLink,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.loginLinkText,
          children: "Zaten hesab\u0131n var m\u0131? Giri\u015F yap"
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl + _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md,
    paddingBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.lg,
    position: 'relative',
    zIndex: 10
  },
  backButton: {
    position: 'absolute',
    left: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    top: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl + _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md,
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm
  },
  backIcon: {
    fontSize: 24,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary
  },
  headerSpacer: {
    width: 40
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    paddingBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.lg,
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.lg
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm
  },
  progressBar: {
    height: 8,
    width: 64,
    backgroundColor: 'rgba(72, 72, 229, 0.2)',
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.full
  },
  inputGroup: {
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary,
    marginLeft: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xs
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputIconLeft: {
    position: 'absolute',
    left: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md,
    zIndex: 1
  },
  input: {
    flex: 1,
    height: 56,
    paddingLeft: 48,
    paddingRight: 48,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md + 2,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.xl,
    borderWidth: 1,
    borderColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.borderDark,
    backgroundColor: '#fff',
    fontSize: 16,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary
  },
  visibilityButton: {
    position: 'absolute',
    right: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md,
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xs
  },
  icon: {
    fontSize: 20,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary
  },
  genderContainer: {
    flexDirection: 'row',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md
  },
  genderButton: {
    flex: 1,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md + 2,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.xl,
    borderWidth: 1,
    borderColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.borderDark,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm
  },
  genderButtonActive: {
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primaryBlue,
    borderColor: 'transparent',
    shadowColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primaryBlue,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  genderIcon: {
    fontSize: 20,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary
  },
  genderIconActive: {
    color: '#fff'
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary
  },
  genderTextActive: {
    color: '#fff'
  },
  footer: {
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.lg,
    borderTopWidth: 1,
    borderTopColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.borderDark,
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md
  },
  registerButton: {
    width: '100%',
    height: 56,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primaryBlue,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primaryBlue,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 8
  },
  registerButtonDisabled: {
    opacity: 0.6
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  loginLink: {
    alignItems: 'center'
  },
  loginLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RegisterScreen);

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