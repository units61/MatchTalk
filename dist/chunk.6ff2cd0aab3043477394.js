"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[321],{

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

/***/ 2321:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ home_HomeScreen)
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
// EXTERNAL MODULE: ./src/theme/colors.ts
var colors = __webpack_require__(8504);
// EXTERNAL MODULE: ./src/theme/spacing.ts
var spacing = __webpack_require__(7559);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
;// ./src/components/common/AvatarGroup.tsx






var AvatarGroup = function AvatarGroup(_ref) {
  var avatars = _ref.avatars,
    _ref$maxVisible = _ref.maxVisible,
    maxVisible = _ref$maxVisible === void 0 ? 4 : _ref$maxVisible,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 40 : _ref$size;
  var visibleAvatars = avatars.slice(0, maxVisible);
  var remainingCount = Math.max(0, avatars.length - maxVisible);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
    style: styles.container,
    children: [visibleAvatars.map(function (avatar, index) {
      return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
        style: [styles.avatarWrapper, {
          width: size,
          height: size,
          marginLeft: index > 0 ? -12 : 0
        }],
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(Avatar/* default */.A, {
          name: avatar.name,
          avatar: avatar.avatar,
          size: size,
          showBorder: true
        })
      }, avatar.id);
    }), remainingCount > 0 && /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
      style: [styles.remainingWrapper, {
        width: size,
        height: size,
        marginLeft: visibleAvatars.length > 0 ? -12 : 0
      }],
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
        style: [styles.remaining, {
          width: size,
          height: size
        }],
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Text */.EY, {
          style: [styles.remainingText, {
            fontSize: size * 0.3
          }],
          children: ["+", remainingCount]
        })
      })
    })]
  });
};
var styles = dist/* StyleSheet */.vv.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing/* spacing */.Y.xs
  },
  avatarWrapper: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden'
  },
  remainingWrapper: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden'
  },
  remaining: {
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  remainingText: {
    fontWeight: 'bold',
    color: colors/* colors */.T.textSecondary
  }
});
/* harmony default export */ const common_AvatarGroup = (AvatarGroup);
// EXTERNAL MODULE: ./src/theme/radius.ts
var theme_radius = __webpack_require__(5194);
;// ./src/components/ui/TimerChip.tsx







var TimerChip = function TimerChip(_ref) {
  var time = _ref.time;
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
    style: TimerChip_styles.container,
    children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
      name: "timer",
      style: TimerChip_styles.icon
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
      style: TimerChip_styles.time,
      children: time
    })]
  });
};
var TimerChip_styles = dist/* StyleSheet */.vv.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing/* spacing */.Y.sm / 2,
    backgroundColor: 'rgba(100, 103, 242, 0.1)',
    paddingHorizontal: spacing/* spacing */.Y.md,
    paddingVertical: spacing/* spacing */.Y.sm + 2,
    borderRadius: theme_radius/* radius */.r.full
  },
  icon: {
    fontSize: 18,
    color: colors/* colors */.T.primaryIndigo
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors/* colors */.T.primaryIndigo,
    fontVariant: 'tabular-nums'
  }
});
/* harmony default export */ const ui_TimerChip = (TimerChip);
;// ./src/components/ui/GenderBar.tsx






var GenderBar = function GenderBar(_ref) {
  var malePercentage = _ref.malePercentage,
    femalePercentage = _ref.femalePercentage,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 96 : _ref$width;
  return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
    style: [GenderBar_styles.container, {
      width: width
    }],
    children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
      style: GenderBar_styles.bar,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
        style: [GenderBar_styles.maleBar, {
          width: "".concat(malePercentage, "%")
        }]
      })
    })
  });
};
var GenderBar_styles = dist/* StyleSheet */.vv.create({
  container: {
    gap: spacing/* spacing */.Y.xs / 2
  },
  bar: {
    height: 8,
    width: '100%',
    overflow: 'hidden',
    borderRadius: theme_radius/* radius */.r.full,
    backgroundColor: colors/* colors */.T.female,
    flexDirection: 'row'
  },
  maleBar: {
    height: '100%',
    backgroundColor: colors/* colors */.T.male
  }
});
/* harmony default export */ const ui_GenderBar = (GenderBar);
;// ./src/components/room/RoomCard.tsx










var RoomCardComponent = function RoomCardComponent(_ref) {
  var name = _ref.name,
    category = _ref.category,
    timeLeft = _ref.timeLeft,
    participants = _ref.participants,
    maxParticipants = _ref.maxParticipants,
    maleCount = _ref.maleCount,
    femaleCount = _ref.femaleCount,
    onJoin = _ref.onJoin;
  var formatTime = (0,react.useMemo)(function () {
    var mins = Math.floor(timeLeft / 60);
    var secs = timeLeft % 60;
    return "".concat(mins.toString().padStart(2, '0'), ":").concat(secs.toString().padStart(2, '0'));
  }, [timeLeft]);
  var malePercentage = (0,react.useMemo)(function () {
    if (participants.length === 0) return 0;
    return maleCount / participants.length * 100;
  }, [maleCount, participants.length]);
  var avatarData = (0,react.useMemo)(function () {
    return participants.map(function (p) {
      return {
        id: p.id,
        name: p.name,
        avatar: p.avatar
      };
    });
  }, [participants]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
    style: RoomCard_styles.container,
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
      style: RoomCard_styles.header,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: RoomCard_styles.titleContainer,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
          style: RoomCard_styles.title,
          children: name
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
          style: RoomCard_styles.category,
          children: category
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(ui_TimerChip, {
        time: formatTime
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
      style: RoomCard_styles.avatarsContainer,
      children: /*#__PURE__*/(0,jsx_runtime.jsx)(common_AvatarGroup, {
        avatars: avatarData,
        maxVisible: 4,
        size: 40
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
      style: RoomCard_styles.footer,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: RoomCard_styles.participantsCount,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
          name: "group",
          style: RoomCard_styles.groupIcon
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Text */.EY, {
          style: RoomCard_styles.countText,
          children: [participants.length, "/", maxParticipants]
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(ui_GenderBar, {
        malePercentage: malePercentage,
        femalePercentage: 100 - malePercentage,
        width: 96
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
        style: RoomCard_styles.joinButton,
        onPress: onJoin,
        accessibilityRole: "button",
        accessibilityLabel: "".concat(name, " odas\u0131na kat\u0131l"),
        accessibilityHint: "Odaya kat\u0131lmak i\xE7in t\u0131klay\u0131n",
        children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
          style: RoomCard_styles.joinButtonText,
          children: "Kat\u0131l"
        })
      })]
    })]
  });
};
var RoomCard_styles = dist/* StyleSheet */.vv.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: theme_radius/* radius */.r.xl,
    padding: spacing/* spacing */.Y.xl,
    marginBottom: spacing/* spacing */.Y.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing/* spacing */.Y.md
  },
  titleContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors/* colors */.T.textPrimary,
    marginBottom: spacing/* spacing */.Y.xs / 2
  },
  category: {
    fontSize: 14,
    color: colors/* colors */.T.textMuted,
    marginTop: 2
  },
  avatarsContainer: {
    marginBottom: spacing/* spacing */.Y.xl
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing/* spacing */.Y.md,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  participantsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing/* spacing */.Y.sm
  },
  groupIcon: {
    fontSize: 20,
    color: colors/* colors */.T.textSecondary
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors/* colors */.T.textSecondary
  },
  joinButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: spacing/* spacing */.Y.sm,
    paddingHorizontal: spacing/* spacing */.Y.xl,
    borderRadius: theme_radius/* radius */.r.full
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors/* colors */.T.textPrimary
  }
});

// Memoize component to prevent unnecessary re-renders
var RoomCard = /*#__PURE__*/react.memo(RoomCardComponent, function (prevProps, nextProps) {
  // Custom comparison function for better performance
  return prevProps.id === nextProps.id && prevProps.name === nextProps.name && prevProps.category === nextProps.category && prevProps.timeLeft === nextProps.timeLeft && prevProps.maxParticipants === nextProps.maxParticipants && prevProps.maleCount === nextProps.maleCount && prevProps.femaleCount === nextProps.femaleCount && prevProps.participants.length === nextProps.participants.length && prevProps.participants.every(function (p, i) {
    var _nextProps$participan, _nextProps$participan2;
    return p.id === ((_nextProps$participan = nextProps.participants[i]) === null || _nextProps$participan === void 0 ? void 0 : _nextProps$participan.id) && p.name === ((_nextProps$participan2 = nextProps.participants[i]) === null || _nextProps$participan2 === void 0 ? void 0 : _nextProps$participan2.name);
  });
});
RoomCard.displayName = 'RoomCard';
/* harmony default export */ const room_RoomCard = (RoomCard);
// EXTERNAL MODULE: ./src/components/ui/BottomNav.tsx
var BottomNav = __webpack_require__(5192);
;// ./src/components/ui/FAB.tsx
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var FAB = function FAB(_ref) {
  var onPress = _ref.onPress,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? 'Yeni Odaya Katıl' : _ref$label;
  var handlePress = function handlePress(e) {
    var _e$stopPropagation;
    e === null || e === void 0 || (_e$stopPropagation = e.stopPropagation) === null || _e$stopPropagation === void 0 || _e$stopPropagation.call(e);
    onPress();
  };
  return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
    style: FAB_styles.container,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Pressable */.oz, {
      style: FAB_styles.button,
      onPress: handlePress,
      hitSlop: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      },
      accessibilityRole: "button",
      accessibilityLabel: label,
      accessibilityHint: "Yeni bir sohbet odas\u0131 olu\u015Fturmak i\xE7in t\u0131klay\u0131n",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
        name: "add_circle",
        style: FAB_styles.icon
      }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
        style: FAB_styles.label,
        children: label
      })]
    })
  });
};
var FAB_styles = dist/* StyleSheet */.vv.create({
  container: _objectSpread({
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    // Yüksek z-index - diğer elementlerin üstünde olmalı
    paddingHorizontal: spacing/* spacing */.Y.xl,
    pointerEvents: 'box-none'
  }, dist/* Platform */.OD.select({
    web: {
      pointerEvents: 'box-none'
    }
  })),
  button: _objectSpread({
    width: '100%',
    maxWidth: 400,
    height: 64,
    backgroundColor: colors/* colors */.T.primaryIndigo,
    borderRadius: theme_radius/* radius */.r.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing/* spacing */.Y.md,
    shadowColor: colors/* colors */.T.primaryIndigo,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  }, dist/* Platform */.OD.select({
    web: {
      cursor: 'pointer',
      userSelect: 'none',
      pointerEvents: 'auto',
      // Buton tıklanabilir olmalı
      zIndex: 1001
    }
  })),
  icon: {
    fontSize: 28,
    color: '#fff'
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5
  }
});
/* harmony default export */ const ui_FAB = (FAB);
// EXTERNAL MODULE: ./node_modules/zod/index.js + 70 modules
var zod = __webpack_require__(2976);
;// ./src/schemas/room.ts

var createRoomSchema = zod.z.object({
  name: zod.z.string().min(1, 'Oda adı gereklidir').max(100, 'Oda adı en fazla 100 karakter olabilir').trim(),
  category: zod.z.string().min(1, 'Kategori gereklidir').max(50, 'Kategori en fazla 50 karakter olabilir').trim(),
  maxParticipants: zod.z.number().int().min(2, 'Minimum 2 kişi olmalıdır').max(8, 'Maksimum 8 kişi olabilir').refine(function (val) {
    return val % 2 === 0;
  }, {
    message: 'Katılımcı sayısı çift olmalıdır (2, 4, 6, 8)'
  }).default(8).optional(),
  durationSec: zod.z.number().int().refine(function (val) {
    return val === 300;
  }, {
    message: 'Oda süresi sabit 5 dakikadır'
  }).default(300) // Sabit 5 dakika
  .optional()
});
var joinRoomSchema = zod.z.object({
  roomId: zod.z.string().uuid('Geçerli bir oda ID giriniz')
});
;// ./src/components/room/CreateRoomModal.tsx
function CreateRoomModal_typeof(o) { "@babel/helpers - typeof"; return CreateRoomModal_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, CreateRoomModal_typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function CreateRoomModal_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function CreateRoomModal_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? CreateRoomModal_ownKeys(Object(t), !0).forEach(function (r) { CreateRoomModal_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : CreateRoomModal_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function CreateRoomModal_defineProperty(e, r, t) { return (r = CreateRoomModal_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function CreateRoomModal_toPropertyKey(t) { var i = CreateRoomModal_toPrimitive(t, "string"); return "symbol" == CreateRoomModal_typeof(i) ? i : i + ""; }
function CreateRoomModal_toPrimitive(t, r) { if ("object" != CreateRoomModal_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != CreateRoomModal_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }






var CATEGORIES = [{
  id: 'music',
  name: 'Müzik',
  icon: 'graphic_eq'
}, {
  id: 'general',
  name: 'Genel',
  icon: 'grid_view'
}, {
  id: 'gaming',
  name: 'Oyun',
  icon: 'sports_esports'
}, {
  id: 'sports',
  name: 'Spor',
  icon: 'sports_basketball'
}, {
  id: 'cinema',
  name: 'Sinema',
  icon: 'movie'
}];
var MAX_NAME_LENGTH = 30;
var CreateRoomModal = function CreateRoomModal(_ref) {
  var visible = _ref.visible,
    onClose = _ref.onClose,
    onSubmit = _ref.onSubmit,
    _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading;
  var _useState = (0,react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    name = _useState2[0],
    setName = _useState2[1];
  var _useState3 = (0,react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    category = _useState4[0],
    setCategory = _useState4[1];
  var _useState5 = (0,react.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    errors = _useState6[0],
    setErrors = _useState6[1];
  var _useState7 = (0,react.useState)({}),
    _useState8 = _slicedToArray(_useState7, 2),
    touched = _useState8[0],
    setTouched = _useState8[1];
  var validateField = function validateField(field, value) {
    try {
      var fieldSchema = createRoomSchema.shape[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      setErrors(function (prev) {
        var newErrors = CreateRoomModal_objectSpread({}, prev);
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof zod.z.ZodError && error.issues && Array.isArray(error.issues) && error.issues.length > 0) {
        var firstError = error.issues[0];
        setErrors(function (prev) {
          return CreateRoomModal_objectSpread(CreateRoomModal_objectSpread({}, prev), {}, CreateRoomModal_defineProperty({}, field, firstError && firstError.message || 'Geçersiz değer'));
        });
      } else {
        setErrors(function (prev) {
          return CreateRoomModal_objectSpread(CreateRoomModal_objectSpread({}, prev), {}, CreateRoomModal_defineProperty({}, field, 'Geçersiz değer'));
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
  var handleCategorySelect = function handleCategorySelect(categoryId) {
    setCategory(categoryId);
    if (touched.category) {
      validateField('category', categoryId);
    }
  };
  var handleBlur = function handleBlur(field) {
    setTouched(function (prev) {
      return CreateRoomModal_objectSpread(CreateRoomModal_objectSpread({}, prev), {}, CreateRoomModal_defineProperty({}, field, true));
    });
    if (field === 'name') {
      validateField('name', name);
    } else if (field === 'category') {
      validateField('category', category);
    }
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var input, newErrors, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            // Mark all fields as touched
            setTouched({
              name: true,
              category: true
            });
            input = {
              name: name.trim(),
              category: category.trim(),
              maxParticipants: 8,
              // Default 8
              durationSec: 300 // Sabit 5 dakika
            };
            _context.p = 1;
            // Validate entire form
            createRoomSchema.parse(input);
            _context.n = 2;
            return onSubmit(input);
          case 2:
            // Reset form on success
            setName('');
            setCategory('');
            setErrors({});
            setTouched({});
            _context.n = 5;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            if (!(_t instanceof zod.z.ZodError)) {
              _context.n = 4;
              break;
            }
            newErrors = {};
            _t.issues.forEach(function (err) {
              if (err.path && err.path.length > 0) {
                var field = err.path[0];
                newErrors[field] = err.message;
              }
            });
            setErrors(newErrors);
            _context.n = 5;
            break;
          case 4:
            throw _t;
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
    }));
    return function handleSubmit() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Modal */.aF, {
    visible: visible,
    transparent: true,
    animationType: "fade",
    onRequestClose: onClose,
    statusBarTranslucent: true,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
      style: CreateRoomModal_styles.overlay,
      pointerEvents: "box-none",
      children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
        style: CreateRoomModal_styles.backdrop,
        onPress: onClose
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: CreateRoomModal_styles.modal,
        pointerEvents: "auto",
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: CreateRoomModal_styles.headerSection,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: CreateRoomModal_styles.title,
            children: "Yeni Oda Olu\u015Ftur"
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: CreateRoomModal_styles.subtitle,
            children: "Sohbetine \xF6zel bir ba\u015Fl\u0131k belirle."
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: CreateRoomModal_styles.inputSection,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
            style: CreateRoomModal_styles.inputWrapper,
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* TextInput */.ks, {
              style: [CreateRoomModal_styles.input, errors.name && touched.name && CreateRoomModal_styles.inputError],
              placeholder: "Oda ba\u015Fl\u0131\u011F\u0131 girin...",
              placeholderTextColor: "#64748B",
              value: name,
              onChangeText: handleNameChange,
              onBlur: function onBlur() {
                return handleBlur('name');
              },
              editable: !loading,
              maxLength: MAX_NAME_LENGTH
            })
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
            style: CreateRoomModal_styles.counterContainer,
            children: /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Text */.EY, {
              style: CreateRoomModal_styles.counterText,
              children: [name.length, "/", MAX_NAME_LENGTH]
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: CreateRoomModal_styles.categorySection,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: CreateRoomModal_styles.categoryTitle,
            children: "Oda T\xFCr\xFC Se\xE7"
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* ScrollView */.BM, {
            horizontal: true,
            showsHorizontalScrollIndicator: false,
            contentContainerStyle: CreateRoomModal_styles.categoriesContainer,
            children: CATEGORIES.map(function (cat) {
              var isSelected = category === cat.id;
              return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Pressable */.oz, {
                style: function style(_ref3) {
                  var pressed = _ref3.pressed;
                  return [CreateRoomModal_styles.categoryButton, isSelected && CreateRoomModal_styles.categoryButtonSelected, pressed && CreateRoomModal_styles.categoryButtonPressed];
                },
                onPress: function onPress() {
                  return handleCategorySelect(cat.id);
                },
                disabled: loading,
                children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
                  name: cat.icon,
                  style: isSelected ? CreateRoomModal_styles.categoryIconSelected : CreateRoomModal_styles.categoryIcon
                }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
                  style: [CreateRoomModal_styles.categoryText, isSelected && CreateRoomModal_styles.categoryTextSelected],
                  children: cat.name
                })]
              }, cat.id);
            })
          }), errors.category && touched.category && /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: CreateRoomModal_styles.errorText,
            children: errors.category
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
          style: CreateRoomModal_styles.actions,
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
            style: function style(_ref4) {
              var pressed = _ref4.pressed;
              return [CreateRoomModal_styles.cancelButton, pressed && CreateRoomModal_styles.buttonPressed];
            },
            onPress: onClose,
            disabled: loading,
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
              style: CreateRoomModal_styles.cancelButtonText,
              children: "\u0130ptal"
            })
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Pressable */.oz, {
            style: function style(_ref5) {
              var pressed = _ref5.pressed;
              return [CreateRoomModal_styles.createButton, pressed && CreateRoomModal_styles.buttonPressed, loading && CreateRoomModal_styles.createButtonDisabled];
            },
            onPress: handleSubmit,
            disabled: loading || !name.trim() || !category,
            children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
              name: "add",
              style: CreateRoomModal_styles.createButtonIcon
            }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
              style: CreateRoomModal_styles.createButtonText,
              children: "Oda Olu\u015Ftur"
            })]
          })]
        })]
      })]
    })
  });
};
var overlayBaseStyle = {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  // bg-black/60
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
  // p-4
  zIndex: 9999 // Modal en üstte olmalı
};
var overlayWebStyle = dist/* Platform */.OD.select({
  web: {
    backdropFilter: 'blur(4px)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  default: {}
});
var CreateRoomModal_styles = dist/* StyleSheet */.vv.create({
  overlay: CreateRoomModal_objectSpread(CreateRoomModal_objectSpread({}, overlayBaseStyle), overlayWebStyle),
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  modal: {
    width: '100%',
    maxWidth: 384,
    // max-w-sm
    backgroundColor: '#1E293B',
    // bg-modal-bg
    borderRadius: 24,
    // rounded-[24px]
    padding: 32,
    // p-8
    gap: 24,
    // gap-6
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    // border-white/5
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
    zIndex: 10000 // Modal içeriği overlay'in üstünde
  },
  headerSection: {
    alignItems: 'center',
    gap: 4 // gap-1
  },
  title: {
    fontSize: 22,
    // text-[22px]
    fontWeight: '700',
    // font-bold
    color: '#fff',
    // text-white
    textAlign: 'center',
    letterSpacing: -0.33,
    // tracking-[-0.015em]
    lineHeight: 28 // leading-tight
  },
  subtitle: {
    fontSize: 14,
    // text-sm
    fontWeight: '400',
    // font-normal
    color: '#94A3B8',
    // text-secondary-text
    textAlign: 'center',
    lineHeight: 20 // leading-normal
  },
  inputSection: {
    gap: 8 // gap-2
  },
  inputWrapper: {
    position: 'relative'
  },
  input: CreateRoomModal_objectSpread({
    width: '100%',
    height: 56,
    // h-14
    backgroundColor: '#0F172A',
    // bg-input-bg
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16,
    // rounded-2xl
    paddingHorizontal: 15,
    // px-[15px]
    fontSize: 16,
    // text-base
    color: '#fff'
  }, dist/* Platform */.OD.select({
    web: {
      outlineStyle: 'none',
      outlineWidth: 0,
      transition: 'all 0.2s',
      ':focus': {
        borderColor: '#6467f2',
        boxShadow: '0 0 0 2px rgba(100, 103, 242, 0.5)'
      }
    }
  })),
  inputError: {
    borderColor: '#ef4444'
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 4 // px-1
  },
  counterText: {
    fontSize: 12,
    // text-xs
    fontWeight: '500',
    // font-medium
    color: '#94A3B8' // text-secondary-text
  },
  categorySection: {
    gap: 12 // gap-3
  },
  categoryTitle: {
    fontSize: 16,
    // text-base
    fontWeight: '600',
    // font-semibold
    color: '#fff',
    // text-white
    lineHeight: 24 // leading-tight
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12,
    // gap-3
    paddingBottom: 8,
    // pb-2
    paddingHorizontal: 8 // -mx-2 px-2
  },
  categoryButton: CreateRoomModal_objectSpread({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    // gap-2
    paddingHorizontal: 16,
    // px-4
    paddingVertical: 10,
    // py-2.5
    backgroundColor: '#334155',
    // bg-[#334155]
    borderRadius: 12
  }, dist/* Platform */.OD.select({
    web: {
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: '#475569' // hover:bg-[#475569]
      }
    }
  })),
  categoryButtonSelected: {
    backgroundColor: '#6467f2',
    // bg-primary
    shadowColor: '#6467f2',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4
  },
  categoryButtonPressed: {
    transform: [{
      scale: 0.95
    }] // active:scale-95
  },
  categoryIcon: {
    fontSize: 18,
    // text-[18px]
    color: '#94A3B8' // text-[#94A3B8]
  },
  categoryIconSelected: {
    color: '#fff' // text-white
  },
  categoryText: CreateRoomModal_objectSpread({
    fontSize: 14,
    // text-sm
    fontWeight: '500',
    // font-medium
    color: '#CBD5E1'
  }, dist/* Platform */.OD.select({
    web: {
      whiteSpace: 'nowrap'
    }
  })),
  categoryTextSelected: {
    color: '#fff' // text-white
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    // gap-4
    paddingTop: 8 // pt-2
  },
  cancelButton: CreateRoomModal_objectSpread({
    flex: 1,
    height: 56,
    // h-[56px]
    borderRadius: 12,
    // rounded-xl
    borderWidth: 1,
    borderColor: '#334155',
    // border-[#334155]
    alignItems: 'center',
    justifyContent: 'center'
  }, dist/* Platform */.OD.select({
    web: {
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)' // hover:bg-white/5
      }
    }
  })),
  cancelButtonText: {
    fontSize: 16,
    // text-base
    fontWeight: '600',
    // font-semibold
    color: '#fff' // text-white
  },
  createButton: CreateRoomModal_objectSpread({
    flex: 2,
    // flex-[2]
    height: 56,
    // h-[56px]
    backgroundColor: '#6467f2',
    // bg-primary
    borderRadius: 12,
    // rounded-xl
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    // gap-2
    shadowColor: '#6467f2',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  }, dist/* Platform */.OD.select({
    web: {
      cursor: 'pointer',
      transition: 'all 0.2s',
      ':hover': {
        backgroundColor: '#5558e6' // hover:bg-[#5558e6]
      }
    }
  })),
  createButtonDisabled: {
    opacity: 0.5
  },
  createButtonIcon: {
    fontSize: 20,
    // text-[20px]
    color: '#fff'
  },
  createButtonText: {
    fontSize: 16,
    // text-base
    fontWeight: '600',
    // font-semibold
    color: '#fff' // text-white
  },
  buttonPressed: {
    transform: [{
      scale: 0.95
    }] // active:scale-95
  }
});
/* harmony default export */ const room_CreateRoomModal = (CreateRoomModal);
// EXTERNAL MODULE: ./src/stores/roomsStore.ts + 1 modules
var roomsStore = __webpack_require__(3164);
// EXTERNAL MODULE: ./src/stores/authStore.ts + 1 modules
var authStore = __webpack_require__(1104);
// EXTERNAL MODULE: ./src/stores/websocketEventStore.ts
var websocketEventStore = __webpack_require__(5337);
// EXTERNAL MODULE: ./src/hooks/useNavigation.ts
var useNavigation = __webpack_require__(1914);
;// ./src/hooks/useWebSocketEvents.ts




var useWebSocketEvents = function useWebSocketEvents() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var subscribe = (0,websocketEventStore/* useWebSocketEventStore */.C)(function (state) {
    return state.subscribe;
  });
  var _useRoomsStore = (0,roomsStore/* useRoomsStore */.V)(),
    fetchRooms = _useRoomsStore.fetchRooms,
    updateRoom = _useRoomsStore.updateRoom;
  var navigation = (0,useNavigation/* useNavigation */.c)();
  var optionsRef = (0,react.useRef)(options);

  // Update options ref
  (0,react.useEffect)(function () {
    optionsRef.current = options;
  }, [options]);
  (0,react.useEffect)(function () {
    var unsubscribers = [];

    // Room update handler
    if (options.onRoomUpdate || true) {
      var unsubscribe = subscribe('room-update', function (data) {
        var _optionsRef$current$o, _optionsRef$current;
        if (data.room) {
          updateRoom(data.room.id, data.room);
        }
        (_optionsRef$current$o = (_optionsRef$current = optionsRef.current).onRoomUpdate) === null || _optionsRef$current$o === void 0 || _optionsRef$current$o.call(_optionsRef$current, data);
      });
      unsubscribers.push(unsubscribe);
    }

    // Room created handler
    if (options.onRoomCreated || true) {
      var _unsubscribe = subscribe('room-created', function (data) {
        var _optionsRef$current$o2, _optionsRef$current2;
        fetchRooms();
        (_optionsRef$current$o2 = (_optionsRef$current2 = optionsRef.current).onRoomCreated) === null || _optionsRef$current$o2 === void 0 || _optionsRef$current$o2.call(_optionsRef$current2, data);
      });
      unsubscribers.push(_unsubscribe);
    }

    // Room closed handler
    if (options.onRoomClosed || true) {
      var _unsubscribe2 = subscribe('room-closed', function (data) {
        var _optionsRef$current$o3, _optionsRef$current3;
        fetchRooms();
        // Navigate back if we're in the closed room
        var currentParams = navigation.currentParams;
        if ((currentParams === null || currentParams === void 0 ? void 0 : currentParams.roomId) === data.roomId) {
          navigation.goBack();
        }
        (_optionsRef$current$o3 = (_optionsRef$current3 = optionsRef.current).onRoomClosed) === null || _optionsRef$current$o3 === void 0 || _optionsRef$current$o3.call(_optionsRef$current3, data);
      });
      unsubscribers.push(_unsubscribe2);
    }

    // Timer update handler
    if (options.onTimerUpdate) {
      var _unsubscribe3 = subscribe('timer-update', function (data) {
        var _optionsRef$current$o4, _optionsRef$current4;
        (_optionsRef$current$o4 = (_optionsRef$current4 = optionsRef.current).onTimerUpdate) === null || _optionsRef$current$o4 === void 0 || _optionsRef$current$o4.call(_optionsRef$current4, data);
      });
      unsubscribers.push(_unsubscribe3);
    }

    // Vote result handler
    if (options.onVoteResult) {
      var _unsubscribe4 = subscribe('vote-result', function (data) {
        var _optionsRef$current$o5, _optionsRef$current5;
        (_optionsRef$current$o5 = (_optionsRef$current5 = optionsRef.current).onVoteResult) === null || _optionsRef$current$o5 === void 0 || _optionsRef$current$o5.call(_optionsRef$current5, data);
      });
      unsubscribers.push(_unsubscribe4);
    }

    // Participant joined handler
    if (options.onParticipantJoined) {
      var _unsubscribe5 = subscribe('room-update', function (data) {
        if (data.joinedUser) {
          var _optionsRef$current$o6, _optionsRef$current6;
          (_optionsRef$current$o6 = (_optionsRef$current6 = optionsRef.current).onParticipantJoined) === null || _optionsRef$current$o6 === void 0 || _optionsRef$current$o6.call(_optionsRef$current6, data);
        }
      });
      unsubscribers.push(_unsubscribe5);
    }

    // Participant left handler
    if (options.onParticipantLeft) {
      var _unsubscribe6 = subscribe('room-update', function (data) {
        if (data.leftUser) {
          var _optionsRef$current$o7, _optionsRef$current7;
          (_optionsRef$current$o7 = (_optionsRef$current7 = optionsRef.current).onParticipantLeft) === null || _optionsRef$current$o7 === void 0 || _optionsRef$current$o7.call(_optionsRef$current7, data);
        }
      });
      unsubscribers.push(_unsubscribe6);
    }

    // Match found handler
    if (options.onMatchFound) {
      var _unsubscribe7 = subscribe('match-found', function (data) {
        var _optionsRef$current$o8, _optionsRef$current8;
        (_optionsRef$current$o8 = (_optionsRef$current8 = optionsRef.current).onMatchFound) === null || _optionsRef$current$o8 === void 0 || _optionsRef$current$o8.call(_optionsRef$current8, data);
      });
      unsubscribers.push(_unsubscribe7);
    }

    // Matching progress handler
    if (options.onMatchingProgress) {
      var _unsubscribe8 = subscribe('matching-progress', function (data) {
        var _optionsRef$current$o9, _optionsRef$current9;
        (_optionsRef$current$o9 = (_optionsRef$current9 = optionsRef.current).onMatchingProgress) === null || _optionsRef$current$o9 === void 0 || _optionsRef$current$o9.call(_optionsRef$current9, data);
      });
      unsubscribers.push(_unsubscribe8);
    }
    return function () {
      unsubscribers.forEach(function (unsubscribe) {
        return unsubscribe();
      });
    };
  }, [subscribe, fetchRooms, updateRoom, navigation, options]);
};
// EXTERNAL MODULE: ./src/hooks/useResponsive.ts + 1 modules
var useResponsive = __webpack_require__(3880);
;// ./src/components/ui/Skeleton.tsx





var Skeleton = function Skeleton(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? '100%' : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 20 : _ref$height,
    _ref$borderRadius = _ref.borderRadius,
    borderRadius = _ref$borderRadius === void 0 ? theme_radius/* radius */.r.md : _ref$borderRadius,
    style = _ref.style;
  var animatedValue = (0,react.useRef)(new dist/* Animated */.kh.Value(0)).current;
  (0,react.useEffect)(function () {
    var animation = dist/* Animated */.kh.loop(dist/* Animated */.kh.sequence([dist/* Animated */.kh.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }), dist/* Animated */.kh.timing(animatedValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    })]));
    animation.start();
    return function () {
      return animation.stop();
    };
  }, [animatedValue]);
  var opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7]
  });
  return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Animated */.kh.View, {
    style: [Skeleton_styles.skeleton, {
      width: width,
      height: height,
      borderRadius: borderRadius,
      opacity: opacity
    }, style]
  });
};
var RoomCardSkeleton = function RoomCardSkeleton() {
  return /*#__PURE__*/_jsxs(View, {
    style: Skeleton_styles.cardContainer,
    children: [/*#__PURE__*/_jsxs(View, {
      style: Skeleton_styles.cardHeader,
      children: [/*#__PURE__*/_jsxs(View, {
        style: Skeleton_styles.cardTitleContainer,
        children: [/*#__PURE__*/_jsx(Skeleton, {
          width: 120,
          height: 20
        }), /*#__PURE__*/_jsx(Skeleton, {
          width: 80,
          height: 14,
          style: Skeleton_styles.marginTop
        })]
      }), /*#__PURE__*/_jsx(Skeleton, {
        width: 60,
        height: 24,
        borderRadius: radius.full
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: Skeleton_styles.avatarsContainer,
      children: [/*#__PURE__*/_jsx(Skeleton, {
        width: 40,
        height: 40,
        borderRadius: radius.full
      }), /*#__PURE__*/_jsx(Skeleton, {
        width: 40,
        height: 40,
        borderRadius: radius.full
      }), /*#__PURE__*/_jsx(Skeleton, {
        width: 40,
        height: 40,
        borderRadius: radius.full
      }), /*#__PURE__*/_jsx(Skeleton, {
        width: 40,
        height: 40,
        borderRadius: radius.full
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: Skeleton_styles.cardFooter,
      children: [/*#__PURE__*/_jsx(Skeleton, {
        width: 60,
        height: 16
      }), /*#__PURE__*/_jsx(Skeleton, {
        width: 96,
        height: 8,
        borderRadius: radius.full
      }), /*#__PURE__*/_jsx(Skeleton, {
        width: 60,
        height: 32,
        borderRadius: radius.full
      })]
    })]
  });
};
var AvatarSkeleton = function AvatarSkeleton(_ref2) {
  var _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 40 : _ref2$size;
  return /*#__PURE__*/_jsx(Skeleton, {
    width: size,
    height: size,
    borderRadius: radius.full
  });
};
var Skeleton_styles = dist/* StyleSheet */.vv.create({
  skeleton: {
    backgroundColor: colors/* colors */.T.cardDark
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: theme_radius/* radius */.r.xl,
    padding: 20,
    marginBottom: 16
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  cardTitleContainer: {
    flex: 1
  },
  marginTop: {
    marginTop: 8
  },
  avatarsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  }
});
/* harmony default export */ const ui_Skeleton = (Skeleton);
;// ./src/screens/home/HomeScreen.tsx
function HomeScreen_typeof(o) { "@babel/helpers - typeof"; return HomeScreen_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, HomeScreen_typeof(o); }
function HomeScreen_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function HomeScreen_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? HomeScreen_ownKeys(Object(t), !0).forEach(function (r) { HomeScreen_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : HomeScreen_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function HomeScreen_defineProperty(e, r, t) { return (r = HomeScreen_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function HomeScreen_toPropertyKey(t) { var i = HomeScreen_toPrimitive(t, "string"); return "symbol" == HomeScreen_typeof(i) ? i : i + ""; }
function HomeScreen_toPrimitive(t, r) { if ("object" != HomeScreen_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != HomeScreen_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function HomeScreen_regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return HomeScreen_regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (HomeScreen_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, HomeScreen_regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, HomeScreen_regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), HomeScreen_regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", HomeScreen_regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), HomeScreen_regeneratorDefine2(u), HomeScreen_regeneratorDefine2(u, o, "Generator"), HomeScreen_regeneratorDefine2(u, n, function () { return this; }), HomeScreen_regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (HomeScreen_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function HomeScreen_regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } HomeScreen_regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { HomeScreen_regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, HomeScreen_regeneratorDefine2(e, r, n, t); }
function HomeScreen_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function HomeScreen_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { HomeScreen_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { HomeScreen_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function HomeScreen_slicedToArray(r, e) { return HomeScreen_arrayWithHoles(r) || HomeScreen_iterableToArrayLimit(r, e) || HomeScreen_unsupportedIterableToArray(r, e) || HomeScreen_nonIterableRest(); }
function HomeScreen_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function HomeScreen_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return HomeScreen_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? HomeScreen_arrayLikeToArray(r, a) : void 0; } }
function HomeScreen_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function HomeScreen_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function HomeScreen_arrayWithHoles(r) { if (Array.isArray(r)) return r; }


















var HomeScreen = function HomeScreen(_ref) {
  var onTabChange = _ref.onTabChange;
  var _useState = (0,react.useState)('home'),
    _useState2 = HomeScreen_slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react.useState)(false),
    _useState4 = HomeScreen_slicedToArray(_useState3, 2),
    showCreateModal = _useState4[0],
    setShowCreateModal = _useState4[1];

  // Use selectors to prevent unnecessary re-renders
  var rooms = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.rooms;
  });
  var loading = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.fetching || state.creating || state.joining;
  });
  var fetching = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.fetching;
  });
  var creating = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.creating;
  });
  var currentRoom = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.currentRoom;
  });
  var fetchRooms = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.fetchRooms;
  });
  var joinRoom = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.joinRoom;
  });
  var createRoom = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.createRoom;
  });
  var updateRoom = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.updateRoom;
  });
  var leaveRoom = (0,roomsStore/* useRoomsStore */.V)(function (state) {
    return state.leaveRoom;
  });
  var _useAuthStore = (0,authStore/* useAuthStore */.n)(),
    user = _useAuthStore.user;
  var navigate = (0,react_router_dom_dist/* useNavigate */.Zp)(); // React Router navigate hook
  var _useResponsive = (0,useResponsive/* useResponsive */.Qs)(),
    isMobile = _useResponsive.isMobile,
    isTablet = _useResponsive.isTablet,
    isDesktop = _useResponsive.isDesktop;

  // Memoize rooms list to prevent unnecessary re-renders
  var memoizedRooms = (0,react.useMemo)(function () {
    return rooms;
  }, [rooms]);

  // Announce room count changes to screen readers
  (0,react.useEffect)(function () {
    if (!loading && rooms.length > 0) {
      // Screen reader announcement will be handled by accessibility utilities if needed
    }
  }, [rooms.length, loading]);

  // Use WebSocket events hook for real-time updates
  var handleRoomUpdate = (0,react.useCallback)(function (data) {
    if (data.room) {
      updateRoom(data.room.id, data.room);
    } else if (data.joinedUser || data.leftUser) {
      // Refresh rooms list when someone joins/leaves
      fetchRooms();
    }
  }, [updateRoom, fetchRooms]);
  var handleRoomCreated = (0,react.useCallback)(function () {
    fetchRooms();
  }, [fetchRooms]);
  var handleRoomClosed = (0,react.useCallback)(function () {
    fetchRooms();
  }, [fetchRooms]);
  useWebSocketEvents({
    onRoomUpdate: handleRoomUpdate,
    onRoomCreated: handleRoomCreated,
    onRoomClosed: handleRoomClosed
  });
  (0,react.useEffect)(function () {
    fetchRooms();
  }, [fetchRooms]);

  // Ana sayfaya dönüldüğünde aktif oda kontrolü ve temizleme
  (0,react.useEffect)(function () {
    var checkAndCleanupActiveRoom = /*#__PURE__*/function () {
      var _ref2 = HomeScreen_asyncToGenerator(/*#__PURE__*/HomeScreen_regenerator().m(function _callee() {
        var userActiveRoom, _t;
        return HomeScreen_regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(loading || rooms.length === 0)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              if (!(!currentRoom && user)) {
                _context.n = 5;
                break;
              }
              // Dönen odalar listesinde kullanıcının katıldığı bir oda var mı kontrol et
              userActiveRoom = rooms.find(function (room) {
                return room.participants.some(function (participant) {
                  return participant.id === user.id;
                });
              });
              if (!userActiveRoom) {
                _context.n = 5;
                break;
              }
              console.log("[HomeScreen] Kullan\u0131c\u0131 ".concat(user.id, " backend'de ").concat(userActiveRoom.id, " odas\u0131nda g\xF6r\xFCn\xFCyor ama frontend'de currentRoom null. Temizleniyor..."));
              _context.p = 2;
              _context.n = 3;
              return leaveRoom(userActiveRoom.id);
            case 3:
              console.log("[HomeScreen] Ba\u015Far\u0131yla ".concat(userActiveRoom.id, " odas\u0131ndan ayr\u0131ld\u0131"));
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.warn("[HomeScreen] Odadan ayr\u0131l\u0131rken hata olu\u015Ftu:", _t);
              // Hata kritik değil, kullanıcıya bilgi vermeye gerek yok
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[2, 4]]);
      }));
      return function checkAndCleanupActiveRoom() {
        return _ref2.apply(this, arguments);
      };
    }();
    checkAndCleanupActiveRoom();
  }, [rooms, loading, currentRoom, user, leaveRoom]);
  var handleTabChange = (0,react.useCallback)(function (tab) {
    setActiveTab(tab);
    onTabChange === null || onTabChange === void 0 || onTabChange(tab);
    // Navigate to the selected tab
    console.log("[HomeScreen] Navigating to tab: ".concat(tab));
    navigate("/".concat(tab));
  }, [onTabChange, navigate]);
  var handleRefresh = (0,react.useCallback)(function () {
    fetchRooms();
  }, [fetchRooms]);
  var handleJoinRoom = (0,react.useCallback)(/*#__PURE__*/function () {
    var _ref3 = HomeScreen_asyncToGenerator(/*#__PURE__*/HomeScreen_regenerator().m(function _callee2(roomId) {
      var _t2;
      return HomeScreen_regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return joinRoom(roomId);
          case 1:
            // Navigate to room screen using React Router directly
            console.log("[HomeScreen] Navigating to room: ".concat(roomId));
            navigate("/room/".concat(roomId));
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Failed to join room:', _t2);
            // Error will be handled by toast notifications later
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), [joinRoom, navigate]);
  var handleCreateRoom = (0,react.useCallback)(/*#__PURE__*/function () {
    var _ref4 = HomeScreen_asyncToGenerator(/*#__PURE__*/HomeScreen_regenerator().m(function _callee3(input) {
      var room, _t3;
      return HomeScreen_regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return createRoom(input);
          case 1:
            room = _context3.v;
            setShowCreateModal(false);
            // Navigate to the created room using React Router directly
            console.log("[HomeScreen] Navigating to created room: ".concat(room.id));
            navigate("/room/".concat(room.id));
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t3 = _context3.v;
            console.error('Failed to create room:', _t3);
            // Error will be handled by toast notifications later
            throw _t3;
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    }));
    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }(), [createRoom, navigate]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
    style: HomeScreen_styles.container,
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
      style: HomeScreen_styles.header,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: HomeScreen_styles.logoContainer,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
          style: HomeScreen_styles.logoIcon,
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
            name: "graphic_eq",
            style: HomeScreen_styles.logoIconText
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
          style: HomeScreen_styles.logoText,
          children: "MatchTalk"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: HomeScreen_styles.headerActions,
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* Pressable */.oz, {
          style: HomeScreen_styles.notificationButton,
          onPress: function onPress() {
            console.log('[HomeScreen] Navigating to notifications');
            navigate('/notifications');
          },
          accessibilityRole: "button",
          accessibilityLabel: "Bildirimler",
          accessibilityHint: "Bildirimler sayfas\u0131na git",
          children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
            name: "notifications",
            style: HomeScreen_styles.notificationIcon
          }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
            style: HomeScreen_styles.badge,
            accessibilityLabel: "Yeni bildirim var"
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
          style: HomeScreen_styles.profileButton,
          accessibilityRole: "button",
          accessibilityLabel: "".concat((user === null || user === void 0 ? void 0 : user.name) || 'Kullanıcı', " profili"),
          accessibilityHint: "Profil sayfas\u0131na git",
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(Avatar/* default */.A, {
            name: (user === null || user === void 0 ? void 0 : user.name) || 'Kullanıcı',
            avatar: user === null || user === void 0 ? void 0 : user.avatar,
            size: 40,
            showBorder: true
          })
        })]
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* ScrollView */.BM, {
      style: HomeScreen_styles.scrollView,
      contentContainerStyle: HomeScreen_styles.scrollContent,
      showsVerticalScrollIndicator: false,
      refreshControl: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* RefreshControl */.Hx, {
        refreshing: fetching,
        onRefresh: handleRefresh
      }),
      pointerEvents: "box-none",
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: HomeScreen_styles.sectionHeader,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
          style: HomeScreen_styles.sectionTitle,
          accessibilityRole: "header",
          children: "Aktif Odalar"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Pressable */.oz, {
          onPress: handleRefresh,
          accessibilityRole: "button",
          accessibilityLabel: "Odalar\u0131 yenile",
          accessibilityHint: "Aktif odalar listesini yenilemek i\xE7in t\u0131klay\u0131n",
          children: /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
            style: HomeScreen_styles.seeAllText,
            children: "Yenile"
          })
        })]
      }), fetching && rooms.length === 0 ?
      /*#__PURE__*/
      // Show skeleton loaders while loading
      (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: [1, 2, 3].map(function (i) {
          return /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
            style: HomeScreen_styles.skeletonCard,
            children: /*#__PURE__*/(0,jsx_runtime.jsx)(ui_Skeleton, {
              width: "100%",
              height: 180,
              borderRadius: 16
            })
          }, i);
        })
      }) : rooms.length === 0 ? /*#__PURE__*/(0,jsx_runtime.jsxs)(dist/* View */.Ss, {
        style: HomeScreen_styles.emptyState,
        children: [/*#__PURE__*/(0,jsx_runtime.jsx)(Icon/* default */.A, {
          name: "meeting_room",
          style: HomeScreen_styles.emptyIcon
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
          style: HomeScreen_styles.emptyText,
          children: "Hen\xFCz aktif oda yok"
        }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* Text */.EY, {
          style: HomeScreen_styles.emptySubtext,
          children: "Yeni bir oda olu\u015Fturun veya bekleyin"
        })]
      }) : /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* View */.Ss, {
        style: HomeScreen_styles.roomsContainer,
        children: memoizedRooms.map(function (room) {
          return /*#__PURE__*/(0,jsx_runtime.jsx)(room_RoomCard, {
            id: room.id,
            name: room.name,
            category: room.category,
            timeLeft: room.timeLeftSec,
            participants: room.participants,
            maxParticipants: room.maxParticipants,
            maleCount: room.maleCount,
            femaleCount: room.femaleCount,
            onJoin: function onJoin() {
              return handleJoinRoom(room.id);
            }
          }, room.id);
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(ui_FAB, {
      onPress: function onPress() {
        return setShowCreateModal(true);
      }
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(room_CreateRoomModal, {
      visible: showCreateModal,
      onClose: function onClose() {
        return setShowCreateModal(false);
      },
      onSubmit: handleCreateRoom,
      loading: creating
    }), /*#__PURE__*/(0,jsx_runtime.jsx)(BottomNav/* default */.A, {
      activeTab: activeTab,
      onTabChange: handleTabChange
    })]
  });
};
var HomeScreen_styles = dist/* StyleSheet */.vv.create({
  container: {
    flex: 1,
    backgroundColor: colors/* colors */.T.backgroundLightMain
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing/* spacing */.Y.xl,
    paddingVertical: spacing/* spacing */.Y.xl,
    backgroundColor: colors/* colors */.T.backgroundLightMain,
    zIndex: 10
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing/* spacing */.Y.sm
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors/* colors */.T.primaryIndigo,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoIconText: {
    fontSize: 18,
    color: '#fff'
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors/* colors */.T.textPrimary
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing/* spacing */.Y.md
  },
  notificationButton: {
    position: 'relative',
    padding: spacing/* spacing */.Y.sm,
    borderRadius: theme_radius/* radius */.r.full
  },
  notificationIcon: {
    fontSize: 24,
    color: colors/* colors */.T.textMuted
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: colors/* colors */.T.backgroundLightMain
  },
  profileButton: {
    borderRadius: theme_radius/* radius */.r.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: spacing/* spacing */.Y.md,
    paddingBottom: 180,
    // Space for FAB and BottomNav
    paddingTop: spacing/* spacing */.Y.sm,
    maxWidth: 1200,
    // Max width for desktop
    alignSelf: 'center',
    width: '100%'
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing/* spacing */.Y.md,
    paddingHorizontal: spacing/* spacing */.Y.sm
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors/* colors */.T.textPrimary
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors/* colors */.T.primaryIndigo
  },
  loadingIndicator: {
    alignItems: 'center',
    paddingVertical: spacing/* spacing */.Y.md
  },
  loadingBar: {
    height: 4,
    width: 64,
    backgroundColor: '#e2e8f0',
    borderRadius: theme_radius/* radius */.r.full
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing/* spacing */.Y.xxl * 2,
    gap: spacing/* spacing */.Y.md
  },
  emptyIcon: {
    fontSize: 64,
    color: colors/* colors */.T.textMuted
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors/* colors */.T.textPrimary
  },
  emptySubtext: {
    fontSize: 14,
    color: colors/* colors */.T.textSecondary,
    textAlign: 'center'
  },
  skeletonCard: {
    marginBottom: spacing/* spacing */.Y.md
  },
  roomsContainer: HomeScreen_objectSpread({
    width: '100%'
  }, dist/* Platform */.OD.select({
    web: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: spacing/* spacing */.Y.md
    }
  }))
});
/* harmony default export */ const home_HomeScreen = (HomeScreen);

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