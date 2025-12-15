"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[31],{

/***/ 31:
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4848);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








var InviteScreen = function InviteScreen(_ref) {
  var roomId = _ref.roomId,
    _ref$roomName = _ref.roomName,
    roomName = _ref$roomName === void 0 ? 'Geyik Muhabbeti #42' : _ref$roomName,
    onBack = _ref.onBack,
    onInviteAll = _ref.onInviteAll;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{
      id: '1',
      name: 'Ahmet Yılmaz',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo8rrF7zyQADCN6qdBD-hvgGBcO3k_URQRvEkv4E2eK3qBMymO2YBvAphwlCFb49kH-ku_brn4C1ZDJx8Hf8AlgMnn2cH5keNnOge9U7J0JnUdPBmjK4m5Ihdyvdxoac7gtkj_FOnbWEjaUA8GVA_EDN5yH9ixZ1_j9kIVj43jHOVDS8LfITENWtcdGe_8DPLq7copNa8WwE9E8b_MC_PU8ZLO57BXkEEZmdlTK21bnuZg6MH4oRADjKg7587LgVnXHB9Ny04BTIg',
      status: 'online',
      activity: 'Müzik dinliyor 🎵',
      inviteStatus: 'available'
    }, {
      id: '2',
      name: 'Elif Kaya',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm20tUaxHdCNzFIwwK1fnHs__RBY5DSIaKH8GsHANqZYcJc0RUSjSSDsYdm-iyA83_w0JdijnTNMX5r0KEMAxd9szQmy6fz22WXhZRr8nTBAxTInNK8dOW5DPZ5rOKT2Uw1_Qqo8dRrJTH7VnpTTq2-1gd86krf8abv7Aa-BqufL7xk8EWDZOQkfdBEumQUWq6PND3JdcYXUwp4MKS2rZTzrVsyU-qCdBdDTiMqPR7K8hhZZXnMAgpFs3LxwFWops7G6xoYOpvVcs',
      status: 'online',
      activity: 'Sohbette',
      inviteStatus: 'sent'
    }, {
      id: '3',
      name: 'Can Bozok',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLOIu4ZREV9ujj95TFUPzPEcxIStq2FZ6Lb5r1WCHbu7avM89pqxIqRXqPtaI7J1xK1lNkBpGr3oP8ks4ZeMVyUy6KpjkhBBTv4bacSJSsLio7uaRlCeLdrlKEgZaIh9WClJgGtkn8Fq7_L2rh69Jol6-6GGEMRTcXLlGP7SY-z2wy2OMOu9bgdtwMlaRsWlUYKC29O916rQUQOVuj82exNcmq8dVWnNXf9xDfTxay460GI6uAJTAlurcKT3Mg2l7YW1_6duj1VqA',
      status: 'online',
      activity: 'Online',
      inviteStatus: 'available'
    }, {
      id: '4',
      name: 'Selin Demir',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_tpYvP88rqVGuT4HCeex17EEziemmGnJiJ-Tk8h78mwPefUuoaWZTXEHFf1iAlqpn6kk7TLPEmB9hqH0qKgKBMV4n3EBre6rPwcuX2e8Y2sf4EQx0ZEcibOFxaSjjCsRdR1Dkhvy9BYiFG3X7-0PEwSAQ3P-14QG5zA4YDy9ehkFD1gKT2UcaOnYjXa-HU3zfU4ajZW0xHYsGBShmRC6i3YoI3gGWcKTTOgRsmKTGln5c8oEHL4id8dPor1fpPw1BX9EW98QPXIo',
      status: 'busy',
      activity: 'Meşgul',
      inviteStatus: 'disabled'
    }, {
      id: '5',
      name: 'Mert Çelik',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_cstIq-5SUu-ad9Y3voOtLpyR_DQB2YIoQ8eEifbvbpYyPtg2rIzLcOlXNqxdBGpvY3cXuPcsYTe3j1LokcCZAt1VrGKDsF6QTa_Cd1yfFapXvVqXLetTajYr4Egp9QPPdZbO8XeEKm1vy7mXEyf-tKZpF8bFoQbdv5_G9Ipa6RTCxljdEHFn_chQ5PEv8IdUrHgFm0IkrL7uK25URFMW-M4cjtpWRVAfrHkE5U34xUvBCnYBvf7FLFKX7-dEWrRg3i57pNP8FGA',
      status: 'online',
      activity: 'Oyun oynuyor 🎮',
      inviteStatus: 'available'
    }, {
      id: '6',
      name: 'Zeynep Aslan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ9ZqNes38_o931LFmpEJie4DE_BSvn9XjP_jNOlHBnyoeApLWVM_j5ijo48G7dfFsXSKC_t0BdTu74ycHFtR_4Cm2_axljBdwkkcDimFl0PX9oCemmqOdev2oBpGUd4EYhMBq07JmDcp_3X1TaXHNw0F0i47t3Fc4cquphVcevBk-QifIx1j-sgAuN6I5O4cKWeFuoOjaIgCk3ENSfT_n03ps6h44MvvmhVcyW82i7Tjtoic2jvXf0o05Tu7vsDJ4Be5QD5x0llI',
      status: 'online',
      activity: 'Online',
      inviteStatus: 'available'
    }]),
    _useState2 = _slicedToArray(_useState, 1),
    friends = _useState2[0];
  var getStatusColor = function getStatusColor(status) {
    switch (status) {
      case 'online':
        return '#10b981';
      case 'busy':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };
  var handleInvite = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(friendId) {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (roomId) {
              _context.n = 1;
              break;
            }
            Alert.alert('Hata', 'Oda bilgisi bulunamadı');
            return _context.a(2);
          case 1:
            _context.p = 1;
            _context.n = 2;
            return inviteApi.sendInvite(roomId, friendId);
          case 2:
            Alert.alert('Başarılı', 'Davet gönderildi');
            // Update friend invite status
            setFriends(function (prev) {
              return prev.map(function (f) {
                return f.id === friendId ? _objectSpread(_objectSpread({}, f), {}, {
                  invited: true
                }) : f;
              });
            });
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            Alert.alert('Hata', _t instanceof Error ? _t.message : 'Davet gönderilemedi');
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return function handleInvite(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: styles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.header,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: styles.backButton,
        onPress: onBack,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
          name: "arrow_back",
          style: styles.backIcon
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: styles.headerTitle,
        children: "Odaya Davet Et"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.headerSpacer
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .ScrollView */ .BM, {
      style: styles.scrollView,
      contentContainerStyle: styles.scrollContent,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.roomInfoCard,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.roomInfoLeft,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: styles.roomName,
            children: roomName
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.roomMeta,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.roomMetaItem,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                name: "group",
                style: styles.roomMetaIcon
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                style: styles.roomMetaText,
                children: "5/8"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.roomMetaDivider
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.roomMetaItem,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                name: "timer",
                style: styles.roomMetaIcon
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                style: styles.roomMetaText,
                children: "24:00"
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: styles.roomIconContainer,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
            name: "graphic_eq",
            style: styles.roomIcon
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: styles.listHeader,
        children: "Online Arkada\u015Flar"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.friendsList,
        children: friends.map(function (friend) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: styles.friendItem,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.friendLeft,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                style: styles.avatarContainer,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Avatar__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A, {
                  uri: friend.avatar,
                  name: friend.name,
                  size: 48
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                  style: [styles.statusIndicator, {
                    backgroundColor: getStatusColor(friend.status)
                  }]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                style: styles.friendInfo,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                  style: styles.friendName,
                  children: friend.name
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                  style: styles.friendActivity,
                  children: friend.activity
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
              style: styles.friendRight,
              children: [friend.inviteStatus === 'available' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
                style: styles.inviteButton,
                onPress: function onPress() {
                  return handleInvite(friend.id);
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                  style: styles.inviteButtonText,
                  children: "Davet Et"
                })
              }), friend.inviteStatus === 'sent' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
                style: styles.sentButton,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
                  name: "check",
                  style: styles.sentIcon
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                  style: styles.sentText,
                  children: "G\xF6nderildi"
                })]
              }), friend.inviteStatus === 'disabled' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
                style: styles.disabledButton,
                disabled: true,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
                  style: styles.disabledText,
                  children: "Davet Edildi"
                })
              })]
            })]
          }, friend.id);
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.bottomButtonContainer,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: styles.inviteAllButton,
        onPress: onInviteAll,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.inviteAllText,
          children: "T\xFCm Arkada\u015Flar\u0131 Davet Et"
        })
      })
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
  header: _objectSpread({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xxl,
    paddingBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    backgroundColor: "".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.backgroundDark, "F5")
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }
  })),
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -_theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.full
  },
  backIcon: {
    fontSize: 24,
    color: '#fff'
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm
  },
  headerSpacer: {
    width: 40
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    paddingBottom: 100
  },
  roomInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.cardDark,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.xl,
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    marginTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm,
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xl,
    borderWidth: 1,
    borderColor: "".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary, "50")
  },
  roomInfoLeft: {
    flex: 2,
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  roomMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm
  },
  roomMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xs / 2
  },
  roomMetaIcon: {
    fontSize: 18,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary
  },
  roomMetaText: {
    fontSize: 14,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary
  },
  roomMetaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary
  },
  roomIconContainer: _objectSpread(_objectSpread({
    width: 64,
    height: 64,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.xl,
    backgroundColor: 'rgba(99, 102, 241, 0.2)'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
    }
  })), {}, {
    alignItems: 'center',
    justifyContent: 'center'
  }),
  roomIcon: {
    fontSize: 32,
    color: '#fff'
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md
  },
  friendsList: {
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xs
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    borderBottomWidth: 1,
    borderBottomColor: "".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary, "30")
  },
  friendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
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
    borderColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.backgroundDark
  },
  friendInfo: {
    flex: 1,
    minWidth: 0
  },
  friendName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff'
  },
  friendActivity: {
    fontSize: 12,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary,
    marginTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xs / 2
  },
  friendRight: {
    marginLeft: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md
  },
  inviteButton: {
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.primary,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.lg,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.xl
  },
  inviteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  },
  sentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xs / 2,
    backgroundColor: "".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.success, "1A"),
    borderWidth: 1,
    borderColor: "".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.success, "33"),
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.xl
  },
  sentIcon: {
    fontSize: 18,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.success
  },
  sentText: {
    fontSize: 14,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.success
  },
  disabledButton: {
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.cardDark,
    paddingVertical: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.sm,
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.xl,
    opacity: 0.6
  },
  disabledText: {
    fontSize: 14,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.textSecondary
  },
  bottomButtonContainer: _objectSpread({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.md,
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_5__/* .spacing */ .Y.xl
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      backgroundImage: 'linear-gradient(to top, #0F172A, transparent)'
    }
  })),
  inviteAllButton: {
    width: '100%',
    height: 56,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.primary,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_6__/* .radius */ .r.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: _theme_colors__WEBPACK_IMPORTED_MODULE_4__/* .colors */ .T.primary,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  inviteAllText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InviteScreen);

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

/***/ })

}]);