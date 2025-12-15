"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[542],{

/***/ 5542:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ profile_ProfileScreen)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/react-native-web/dist/index.js + 205 modules
var dist = __webpack_require__(8618);
// EXTERNAL MODULE: ./node_modules/react-router-dom/dist/index.js + 1 modules
var react_router_dom_dist = __webpack_require__(1080);
// EXTERNAL MODULE: ./src/components/common/Icon.tsx
var Icon = __webpack_require__(6046);
// EXTERNAL MODULE: ./src/components/common/Avatar.tsx
var Avatar = __webpack_require__(6074);
// EXTERNAL MODULE: ./src/components/ui/BottomNav.tsx
var BottomNav = __webpack_require__(5192);
// EXTERNAL MODULE: ./src/theme/colors.ts
var colors = __webpack_require__(8504);
// EXTERNAL MODULE: ./src/theme/spacing.ts
var spacing = __webpack_require__(7559);
// EXTERNAL MODULE: ./src/theme/radius.ts
var radius = __webpack_require__(5194);
// EXTERNAL MODULE: ./src/stores/authStore.ts + 1 modules
var authStore = __webpack_require__(1104);
// EXTERNAL MODULE: ./src/stores/friendsStore.ts + 1 modules
var friendsStore = __webpack_require__(9944);
// EXTERNAL MODULE: ./src/lib/apiClient.ts
var apiClient = __webpack_require__(5859);
;// ./src/services/api/statsApi.ts
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var statsApi = {
  /**
   * Kullanıcı istatistiklerini getir
   */
  getStats: function getStats() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return apiClient/* apiClient */.u.get('/stats');
          case 1:
            return _context.a(2, _context.v);
        }
      }, _callee);
    }))();
  }
};
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./src/screens/profile/ProfileScreen.tsx
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function ProfileScreen_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return ProfileScreen_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (ProfileScreen_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, ProfileScreen_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, ProfileScreen_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), ProfileScreen_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", ProfileScreen_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), ProfileScreen_regeneratorDefine2(u), ProfileScreen_regeneratorDefine2(u, o, "Generator"), ProfileScreen_regeneratorDefine2(u, n, function () { return this; }), ProfileScreen_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (ProfileScreen_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function ProfileScreen_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } ProfileScreen_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { ProfileScreen_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, ProfileScreen_regeneratorDefine2(e, r, n, t); }
function ProfileScreen_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function ProfileScreen_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { ProfileScreen_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { ProfileScreen_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }













var badges = [{
  id: 'talkative',
  name: 'Konuşkan',
  icon: 'mic',
  unlocked: true,
  gradient: ['#fbbf24', '#f97316']
}, {
  id: 'social',
  name: 'Sosyal',
  icon: 'group',
  unlocked: true,
  gradient: ['#60a5fa', '#6467f2']
}, {
  id: 'nightowl',
  name: 'Gece Kuşu',
  icon: 'nightlight',
  unlocked: false
}, {
  id: 'popular',
  name: 'Popüler',
  icon: 'verified',
  unlocked: false
}, {
  id: 'vip',
  name: 'VIP',
  icon: 'diamond',
  unlocked: false
}, {
  id: 'rocket',
  name: 'Roket',
  icon: 'rocket_launch',
  unlocked: false
}];
var ProfileScreen = function ProfileScreen(_ref) {
  var onTabChange = _ref.onTabChange;
  var _useState = (0,react.useState)('profile'),
    _useState2 = _slicedToArray(_useState, 2),
    activeNavTab = _useState2[0],
    setActiveNavTab = _useState2[1];
  var _useAuthStore = (0,authStore/* useAuthStore */.n)(),
    user = _useAuthStore.user;
  var _useFriendsStore = (0,friendsStore/* useFriendsStore */.G)(),
    friends = _useFriendsStore.friends;
  var navigate = (0,react_router_dom_dist/* useNavigate */.Zp)();
  var _useState3 = (0,react.useState)({
      hours: 0,
      rooms: 0,
      friends: friends.length
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    stats = _useState4[0],
    setStats = _useState4[1];
  var _useState5 = (0,react.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  (0,react.useEffect)(function () {
    loadStats();
  }, []);
  var loadStats = /*#__PURE__*/function () {
    var _ref2 = ProfileScreen_asyncToGenerator(/*#__PURE__*/ProfileScreen_regenerator().m(function _callee() {
      var userStats, _t;
      return ProfileScreen_regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return statsApi.getStats();
          case 1:
            userStats = _context.v;
            setStats({
              hours: userStats.totalHours,
              rooms: userStats.totalRooms,
              friends: userStats.totalFriends
            });
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            console.error('Failed to load stats:', _t);
            // Fallback to friends count
            setStats({
              hours: 0,
              rooms: 0,
              friends: friends.length
            });
          case 3:
            _context.p = 3;
            setLoading(false);
            return _context.f(3);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2, 3, 4]]);
    }));
    return function loadStats() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleNavTabChange = function handleNavTabChange(tab) {
    setActiveNavTab(tab);
    onTabChange === null || onTabChange === void 0 || onTabChange(tab);
    // Navigate to the selected tab
    console.log("[ProfileScreen] Navigating to tab: ".concat(tab));
    navigate("/".concat(tab));
  };

  // Mock level/XP (will be calculated later)
  var level = 1;
  var currentXP = 0;
  var maxXP = 1000;
  var xpPercentage = maxXP > 0 ? currentXP / maxXP * 100 : 0;
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
    style: styles.container,
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
      style: [styles.header, dist/* Platform */.OD.select({
        web: {
          backgroundImage: 'linear-gradient(to bottom, #6467f2, #7c3aed)'
        }
      })],
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: styles.headerContent,
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: styles.avatarContainer,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Avatar/* default */.A, {
            name: (user === null || user === void 0 ? void 0 : user.name) || 'Kullanıcı',
            avatar: user === null || user === void 0 ? void 0 : user.avatar,
            size: 120,
            showBorder: true
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
            style: styles.onlineIndicator
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: styles.userInfo,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: styles.userName,
            children: (user === null || user === void 0 ? void 0 : user.name) || 'Kullanıcı'
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Text */.EY, {
            style: styles.userLevel,
            children: ["Seviye ", level]
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: styles.progressContainer,
          children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
            style: styles.progressLabels,
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Text */.EY, {
              style: styles.progressLabel,
              children: [currentXP, " XP"]
            }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Text */.EY, {
              style: styles.progressLabel,
              children: [maxXP, " XP"]
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
            style: styles.progressBar,
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
              style: [styles.progressFill, {
                width: "".concat(xpPercentage, "%")
              }]
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* ScrollView */.BM, {
      style: styles.scrollView,
      contentContainerStyle: styles.scrollContent,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: styles.statsGrid,
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: styles.statCard,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: [styles.statValue, styles.statValuePrimary],
            children: stats.hours
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: styles.statLabel,
            children: "saat"
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: styles.statCard,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: styles.statValue,
            children: stats.rooms
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: styles.statLabel,
            children: "oda"
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: styles.statCard,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: styles.statValue,
            children: stats.friends
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: styles.statLabel,
            children: "ki\u015Fi"
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: styles.badgesSection,
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: styles.badgesHeader,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: styles.badgesTitle,
            children: "Rozetlerim"
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
              style: styles.seeAllText,
              children: "T\xFCm\xFCn\xFC G\xF6r"
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
          style: styles.badgesGrid,
          children: badges.map(function (badge) {
            var badgeIconStyle = badge.unlocked && badge.gradient ? dist/* Platform */.OD.select({
              web: {
                backgroundImage: "linear-gradient(135deg, ".concat(badge.gradient[0], ", ").concat(badge.gradient[1], ")")
              },
              default: {
                backgroundColor: badge.gradient[0]
              }
            }) : styles.badgeIconContainerLocked;
            return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
              style: [styles.badgeCard, !badge.unlocked && styles.badgeCardLocked],
              children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
                style: [styles.badgeIconContainer, badgeIconStyle],
                children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
                  name: badge.icon,
                  style: !badge.unlocked ? styles.badgeIconLocked : styles.badgeIcon
                })
              }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
                style: [styles.badgeName, !badge.unlocked && styles.badgeNameLocked],
                children: badge.name
              })]
            }, badge.id);
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: styles.menuSection,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
          style: styles.menuSectionTitle,
          children: "Ayarlar"
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: styles.menuItemsContainer,
          children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Pressable */.oz, {
            style: function style(_ref3) {
              var pressed = _ref3.pressed;
              return [styles.menuItem, pressed && styles.menuItemPressed];
            },
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
              style: styles.menuItemLeft,
              children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
                style: styles.menuIconContainer,
                children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
                  name: "edit",
                  style: styles.menuIcon
                })
              }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
                style: styles.menuText,
                children: "Profili D\xFCzenle"
              })]
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
              name: "chevron_right",
              style: styles.chevronIcon
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Pressable */.oz, {
            style: function style(_ref4) {
              var pressed = _ref4.pressed;
              return [styles.menuItem, pressed && styles.menuItemPressed];
            },
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
              style: styles.menuItemLeft,
              children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
                style: styles.menuIconContainer,
                children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
                  name: "notifications",
                  style: styles.menuIcon
                })
              }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
                style: styles.menuText,
                children: "Bildirimler"
              })]
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
              name: "chevron_right",
              style: styles.chevronIcon
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Pressable */.oz, {
            style: function style(_ref5) {
              var pressed = _ref5.pressed;
              return [styles.menuItem, pressed && styles.menuItemPressed];
            },
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
              style: styles.menuItemLeft,
              children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
                style: styles.menuIconContainer,
                children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
                  name: "lock",
                  style: styles.menuIcon
                })
              }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
                style: styles.menuText,
                children: "Gizlilik"
              })]
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
              name: "chevron_right",
              style: styles.chevronIcon
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Pressable */.oz, {
            style: function style(_ref6) {
              var pressed = _ref6.pressed;
              return [styles.menuItem, pressed && styles.menuItemPressed];
            },
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
              style: styles.menuItemLeft,
              children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
                style: styles.menuIconContainer,
                children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
                  name: "info",
                  style: styles.menuIcon
                })
              }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
                style: styles.menuText,
                children: "Hakk\u0131nda"
              })]
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
              name: "chevron_right",
              style: styles.chevronIcon
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(BottomNav/* default */.A, {
      activeTab: activeNavTab,
      onTabChange: handleNavTabChange
    })]
  });
};
var styles = dist/* StyleSheet */.vv.create({
  container: _objectSpread({
    flex: 1,
    backgroundColor: colors/* colors */.T.backgroundDarkMain
  }, dist/* Platform */.OD.select({
    web: {
      minHeight: '100vh'
    }
  })),
  header: {
    backgroundColor: '#6467f2',
    // Fallback for non-web platforms
    paddingTop: spacing/* spacing */.Y.xxl + spacing/* spacing */.Y.md,
    paddingBottom: spacing/* spacing */.Y.xxl,
    paddingHorizontal: spacing/* spacing */.Y.xl,
    borderBottomLeftRadius: radius/* radius */.r.xl * 2,
    borderBottomRightRadius: radius/* radius */.r.xl * 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  headerContent: {
    alignItems: 'center',
    gap: spacing/* spacing */.Y.md
  },
  avatarContainer: {
    position: 'relative'
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#fff'
  },
  userInfo: {
    alignItems: 'center',
    gap: spacing/* spacing */.Y.xs / 2
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  userLevel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  progressContainer: {
    width: '100%',
    maxWidth: 240,
    gap: spacing/* spacing */.Y.sm
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing/* spacing */.Y.xs
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  progressBar: {
    height: 10,
    width: '100%',
    borderRadius: radius/* radius */.r.full,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: radius/* radius */.r.full,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: spacing/* spacing */.Y.xl,
    gap: spacing/* spacing */.Y.xl,
    paddingBottom: 100
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing/* spacing */.Y.md
  },
  statCard: {
    flex: 1,
    backgroundColor: colors/* colors */.T.cardDark,
    borderRadius: radius/* radius */.r.lg,
    padding: spacing/* spacing */.Y.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing/* spacing */.Y.xs / 2,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.5)'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  statValuePrimary: {
    color: colors/* colors */.T.primaryIndigo
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors/* colors */.T.textSecondary
  },
  badgesSection: {
    gap: spacing/* spacing */.Y.md
  },
  badgesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing/* spacing */.Y.xs / 2
  },
  badgesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors/* colors */.T.textPrimary
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors/* colors */.T.primaryIndigo
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing/* spacing */.Y.md,
    justifyContent: 'space-between'
  },
  badgeCard: {
    width: '30%',
    minWidth: 100,
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing/* spacing */.Y.sm,
    backgroundColor: colors/* colors */.T.cardDark,
    borderRadius: radius/* radius */.r.lg,
    padding: spacing/* spacing */.Y.md,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.5)'
  },
  badgeCardLocked: {
    opacity: 0.5
  },
  badgeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeIconContainerLocked: {
    backgroundColor: '#475569'
  },
  badgeIcon: {
    fontSize: 24,
    color: '#fff'
  },
  badgeIconLocked: {
    color: '#94a3b8'
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#cbd5e1',
    textAlign: 'center'
  },
  badgeNameLocked: {
    color: '#94a3b8'
  },
  menuSection: {
    gap: spacing/* spacing */.Y.md,
    paddingBottom: spacing/* spacing */.Y.lg
  },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors/* colors */.T.textPrimary,
    paddingHorizontal: spacing/* spacing */.Y.xs / 2
  },
  menuItemsContainer: {
    gap: spacing/* spacing */.Y.sm
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors/* colors */.T.cardDark,
    borderRadius: radius/* radius */.r.lg,
    padding: spacing/* spacing */.Y.md,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.5)'
  },
  menuItemPressed: {
    backgroundColor: '#334155'
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing/* spacing */.Y.md,
    flex: 1
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(100, 116, 139, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuIcon: {
    fontSize: 20,
    color: '#94a3b8'
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors/* colors */.T.textPrimary
  },
  chevronIcon: {
    fontSize: 20,
    color: '#9ca3af'
  }
});
/* harmony default export */ const profile_ProfileScreen = (ProfileScreen);

/***/ })

}]);