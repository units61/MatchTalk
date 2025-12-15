"use strict";
(self["webpackChunkmatchtalk_web"] = self["webpackChunkmatchtalk_web"] || []).push([[252],{

/***/ 2252:
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
/* harmony import */ var _theme_radius__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5194);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4848);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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







var OnboardingScreen = function OnboardingScreen(_ref) {
  var onComplete = _ref.onComplete;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState2 = _slicedToArray(_useState, 2),
    currentPage = _useState2[0],
    setCurrentPage = _useState2[1];
  var handleNext = function handleNext() {
    if (currentPage < 4) {
      setCurrentPage(function (prev) {
        return prev + 1;
      });
    } else {
      onComplete();
    }
  };
  var renderPage = function renderPage() {
    switch (currentPage) {
      case 1:
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OnboardingPage1, {});
      case 2:
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OnboardingPage2, {});
      case 3:
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OnboardingPage3, {});
      case 4:
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(OnboardingPage4, {});
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: styles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.header,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.logoContainer,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
          name: "graphic_eq",
          style: styles.logoIcon
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.logoText,
          children: "MatchTalk"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.content,
      children: renderPage()
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: styles.footer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: styles.indicators,
        children: [1, 2, 3, 4].map(function (page) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
            style: [styles.indicator, currentPage === page && styles.indicatorActive]
          }, page);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Pressable */ .oz, {
        style: styles.nextButton,
        onPress: handleNext,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
          style: styles.nextButtonText,
          children: currentPage === 4 ? 'Başla' : 'İleri'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
          name: "arrow_forward",
          style: styles.buttonIcon
        })]
      })]
    })]
  });
};

// Page 1: Sesli Sohbet Odalarına Katıl
var OnboardingPage1 = function OnboardingPage1() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: pageStyles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: pageStyles.illustrationContainer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: pageStyles.illustrationBackground
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: [pageStyles.illustration, {
          backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAW8fop3aE7LW6Rfa-cROxQL26OgepxPlUEhGIPNw0mjGI4iIQtpm5E9lVWN_r0oYo8lgrDcNFaJEyG2-8FawHZxtQYO6aws82zg8fuV2wsXV8N4vgfB3hzNzh573gtRi2iMjeA-mmt_7DOCsn5kbMWT7DktIvnCTs9aJjJKxOsx-fqxT1rPemZj1aD1Dl9fyjLDKis_zNFPL1HlOYGAiJgbhdrz33cAhnxebFM_cjOdAMlC4lbSbDq4wezq6cc_ubw2bQsd-OAwq8")'
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: pageStyles.micIcon1,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
          name: "mic",
          style: pageStyles.micIconStyle
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: pageStyles.micIcon2,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
          name: "mic_off",
          style: pageStyles.micIconStyle
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: pageStyles.textContainer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: pageStyles.title,
        children: "Sesli Sohbet Odalar\u0131na Kat\u0131l"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: pageStyles.description,
        children: "4-8 ki\u015Filik dengeli odalarda yeni insanlarla tan\u0131\u015F"
      })]
    })]
  });
};

// Page 2: Dengeli Eşleştirme
var OnboardingPage2 = function OnboardingPage2() {
  var avatarUrls = ['https://lh3.googleusercontent.com/aida-public/AB6AXuCSKOJeheZ3s93lu33HzP1kFOVzxVaUNUxxWrD0ti4RaoKk57Kqz3qOlAGsyICloOx0VyITVtnS6nQadPRFWSh0Scmd7xhN3Rt6-5ry1b3LnGOS5yib-0SRqVQVCKmu50G08cwxuhIVtlHCzdHR6kQSfljIafzPC4Ftiaof4hJ-5F-22LzUEziDsNEmwda3Ni9ccWoMaZTPOAg6NjI75aUatVIynWUK_luRQMTqD7LPKsawWDlVcdwq5TPLk6R_AXKHcwvpMdXKiYI', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwCyrQMtPAuT62DYbYEho7ckn2U2o2aCzc1_Fa2z-e5YganR9pVuEzhOy5w_GnrM6T8ZSAvI9joYEGylSimi_J2ea9hCAd1kYiYfaGZxAVQ17zdEwHdUVXx-MwfPr8b_2ZjiytZblCIwECrqjrSFxpBOboyTBONTvQa0KgfXYtenwDKBClSpF07QXzi---_uQlQ5uLlshPE0ZTAAjlyqohfNmxlHH_qM25lzRd3ty4bSzBaYE0sjuHOMzoMgVdbq3K-n-Vp0PEb8c', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-fo9ZQla6RAfzo2C8ntBzsWev4al47sqAfkd5BMD7Fr2Fd-c80F1kZHXiwBqQZxGyvg8E0ks08Jw8_7legI3HS6jYEuB4S12tboeHGqwZBvneNrMnG037dHKlU4sAYvfhJ7pxbORP1cj7gap4hCvx9JqfDm93015-ClxN8vqtUIrQ1wXut7HU5rhB3KpTqCv4GCZt1MDQauumfoHrvvUtLBCScdVe-DuFXozIDpin_mwZt5fExIO9uOt6o-5lA29-SU7O4kzLjDQ', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrH78qaTHjQ2Pwl-df1ITqvLlp3sbpa_I3vs8NKSC6aFaFTAderNzNTKwTovVAz2kTsdE_zQOyV2PqDUdAGxwOdtVQzM9haJgp_NlsvM1Dhpc6z3ojY2n_6X-p1qA5Yhel64yIkA7aFC4gl6YuVAgY5fFQdQvyWog-8W25XTIiUctn-cpAcayFN6sRwkqbRh3Lr4nVx8rIOSvwOnQVjmFO1r8FIWmO76UJG_olCkOe-0-TlSmQgGaUYtai3JFr-3SVuxyVVB5JMnk', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd6_asZk64SUoyc19AvXzXDNSBR3uuKpqaqN-4sc1Xxd5JXxbq9r-Q3sgVKc4d0f-U4t9g-cADT9Iy49M6u_9X1w90r15cHdj4hzyjM3lPUjNPShZ8LoXu4t-8bKKdGhLTD6WjhxyUhq0hSAWzVzO29iRX2ZY7SAIzklEU2JzTDYhywfPgh7lnU7C0oCSnclab4c7F8v8EnV6VeaFzly_nqW78tO0CRJhOKi3UOHWdVYjLBarP_nNGFd7LU-tF18bKf_Ytji2gIX0', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB_-X6LFY1RUKr0CqBmtNAx_52OVJ1abXf9BDx86LV2EO0MsJBrYHZhQDduT768jTQLVrkeBBRPW5WI-wdRd0nu8epNUSMsbUdlv96oP9B4G7u2PZlMeAxNTYwzjHnQDWNTqmkqgRDSwL7vAj2TpfYZPGybG3EXM3bNBJ4l6qhtdKYTCJuvFICf1vi_qNDR6ZJAOetqltJBSQEdWA4X5-yKCAqen5Hso7y5QilRmFKZbNfL8ZbyFFUh2z05p509ZrfslLjqXlNA60', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6PGfNRKlEzWsGlbJ_ELMXIJ7I8AidCgpry6-ZhcJX78SnfK0e4R1HPczlVBpnuwLF4ojV0EvkBQXgbU-GI8wH9zCe3d5_K77YtUUv9Rw3G5mq8PweQTY7yw30GKWd8TqORjn7_cw1JspNF9Ra2J9SaQpHYdij6rkS-9EgCyQRGCeXEONyapF1XQ1ndaiHrLwre7Ava_BN1UKhac10IhtOLm0iK-XznpaTBW_zF-KUfy6-4QKbkhbL18ytwq5iqvoVcYKoTkFu3o', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAj5QBmRXV66_QrmWojVrpheLpR7iPnbrlM3GHPLI6vtK8b6bmw2jU4v2X4fFn2esdsucWHKAGfogIcAJ7GRbbZhrqWWQ5VysOf7wChweCX5QYRPL5TtN-yoJ6FLIx0UNS4p-4Gfj6YYFJY3-nexTpTLb1mBNA4fHHuIrNu1ggJZ0L7XWR_W6PA91vvNQohKZgWSpH2LIZsNRaBu5ZJjv-VWgRvAEF0nVdJM-9RqAIRGxBjZhQ-q90OMQP7LBAFD9jRcS6pnyfEmg'];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: pageStyles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: pageStyles2.illustrationContainer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: pageStyles2.glowBackground
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: pageStyles2.centralCircle,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_common_Icon__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, {
          name: "graphic_eq",
          style: pageStyles2.centralIcon
        })
      }), [1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: [pageStyles2.avatar, pageStyles2["avatar".concat(i)]],
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Image */ ._V, {
            source: {
              uri: avatarUrls[i - 1]
            },
            style: pageStyles2.avatarImage
          })
        }, i);
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: pageStyles.textContainer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: pageStyles.title,
        children: "Dengeli E\u015Fle\u015Ftirme"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: pageStyles.description,
        children: "Her odada %50 erkek, %50 kad\u0131n dengesi korunur"
      })]
    })]
  });
};

// Page 3: 5 Dakikalık Sohbetler
var OnboardingPage3 = function OnboardingPage3() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: pageStyles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: pageStyles3.timerContainer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: pageStyles3.timerGlow
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: pageStyles3.timerCircle,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: pageStyles3.timerContent,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: pageStyles3.timerText,
            children: "5:00"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
            style: pageStyles3.timerLabel,
            children: "Dakika"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
          style: pageStyles3.timerKnob
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: pageStyles.textContainer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: pageStyles.title,
        children: "5 Dakikal\u0131k Sohbetler"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: pageStyles.description,
        children: "Her sohbet 5 dakika. \u0130sterseniz 3 dakika daha uzatabilirsiniz."
      })]
    })]
  });
};

// Page 4: Arkadaşlar Edin
var OnboardingPage4 = function OnboardingPage4() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
    style: pageStyles.container,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: pageStyles4.illustrationContainer,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
        style: [pageStyles4.illustration, {
          backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSn94iDObyyUTd0OAa4tExkrL-RRXwcacrwiTMtOaAIWYD7yQdZ2_0fJyFAfoxHQs767fsORtZiUFAk8YRxlmhYz0an5gKq3xVnab4CDDCVS_knEpoelCk0EOHcxmBSAeJ-Sw5QRFUrFmwz99myrmXqh2IYDkCO0wu6cdk09uEZ4TB62t78m9ct5ujUGuhjrSSx30aXII_4fReOq9dZcyj1kTVCJKyFBRiR6HkySdLi0IhY2R1Vk72W1P3n8QHFOI6ALkLEtLL0d8")'
        }]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .View */ .Ss, {
      style: pageStyles.textContainer,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: pageStyles.title,
        children: "Arkada\u015Flar Edin"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_native__WEBPACK_IMPORTED_MODULE_1__/* .Text */ .EY, {
        style: pageStyles.description,
        children: "15 dakika sohbet edenler birbirini ekleyebilir"
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
    width: '100%',
    alignItems: 'center',
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl,
    paddingBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md,
    zIndex: 10
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm
  },
  logoIcon: {
    fontSize: 24,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    zIndex: 10
  },
  footer: {
    width: '100%',
    paddingHorizontal: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xl,
    paddingBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl,
    paddingTop: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md,
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.md
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e9e8ce'
  },
  indicatorActive: _objectSpread({
    width: 32,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      boxShadow: "0 0 10px ".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary, "80")
    },
    default: {
      shadowColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.5,
      shadowRadius: 10
    }
  })),
  nextButton: _objectSpread({
    width: '100%',
    height: 56,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_5__/* .radius */ .r.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      boxShadow: "0 4px 8px ".concat(_theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary, "33")
    },
    default: {
      shadowColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.2,
      shadowRadius: 8
    }
  })),
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  buttonIcon: {
    fontSize: 20,
    color: '#000'
  }
});
var pageStyles = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl
  },
  illustrationContainer: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 320,
    position: 'relative',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl
  },
  illustrationBackground: _objectSpread({
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 9999
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      filter: 'blur(48px)',
      transform: 'scale(0.75)'
    },
    default: {
      transform: [{
        scale: 0.75
      }]
    }
  })),
  illustration: _objectSpread({
    width: '100%',
    height: '100%'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  })),
  micIcon1: _objectSpread({
    position: 'absolute',
    top: '25%',
    right: '25%',
    backgroundColor: '#fff',
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_5__/* .radius */ .r.full
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    default: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.1,
      shadowRadius: 8
    }
  })),
  micIcon2: _objectSpread({
    position: 'absolute',
    bottom: '25%',
    left: '25%',
    backgroundColor: '#fff',
    padding: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm,
    borderRadius: _theme_radius__WEBPACK_IMPORTED_MODULE_5__/* .radius */ .r.full
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    default: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.1,
      shadowRadius: 8
    }
  })),
  micIconStyle: {
    fontSize: 20,
    color: '#6366f1'
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.sm,
    maxWidth: 320
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary,
    textAlign: 'center',
    lineHeight: 34
  },
  description: {
    fontSize: 16,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280
  }
});
var pageStyles2 = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  illustrationContainer: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 340,
    position: 'relative',
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl
  },
  glowBackground: _objectSpread({
    position: 'absolute',
    inset: 0,
    margin: 'auto',
    width: '80%',
    height: '80%',
    borderRadius: 9999,
    backgroundColor: 'rgba(249, 245, 6, 0.2)'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      filter: 'blur(32px)'
    }
  })),
  centralCircle: _objectSpread({
    position: 'absolute',
    zIndex: 10,
    width: 96,
    height: 96,
    backgroundColor: '#fff',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    marginTop: -48,
    marginLeft: -48
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    default: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.1,
      shadowRadius: 8
    }
  })),
  centralIcon: {
    fontSize: 36,
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary
  },
  avatar: _objectSpread({
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    default: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 4
    }
  })),
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  avatar1: {
    top: '5%',
    left: '35%'
  },
  avatar2: {
    top: '5%',
    left: '55%'
  },
  avatar3: {
    right: '5%',
    top: '35%'
  },
  avatar4: {
    right: '5%',
    top: '55%'
  },
  avatar5: {
    bottom: '5%',
    left: '35%'
  },
  avatar6: {
    bottom: '5%',
    left: '55%'
  },
  avatar7: {
    left: '5%',
    top: '35%'
  },
  avatar8: {
    left: '5%',
    top: '55%'
  }
});
var pageStyles3 = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  timerContainer: {
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl,
    position: 'relative',
    alignItems: 'center'
  },
  timerGlow: _objectSpread({
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(249, 245, 6, 0.2)',
    borderRadius: 9999
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      filter: 'blur(32px)',
      transform: 'scale(1.1)'
    },
    default: {
      transform: [{
        scale: 1.1
      }]
    }
  })),
  timerCircle: _objectSpread({
    width: 256,
    height: 256,
    borderRadius: 128,
    borderWidth: 6,
    borderColor: 'rgba(249, 245, 6, 0.3)',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
    },
    default: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.1,
      shadowRadius: 16
    }
  })),
  timerContent: {
    alignItems: 'center',
    gap: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xs
  },
  timerText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textPrimary,
    letterSpacing: -2
  },
  timerLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  timerKnob: {
    position: 'absolute',
    top: -12,
    left: '50%',
    marginLeft: -16,
    width: 32,
    height: 8,
    backgroundColor: _theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .colors */ .T.primary,
    borderRadius: 4
  }
});
var pageStyles4 = react_native__WEBPACK_IMPORTED_MODULE_1__/* .StyleSheet */ .vv.create({
  illustrationContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    maxHeight: 320,
    marginBottom: _theme_spacing__WEBPACK_IMPORTED_MODULE_4__/* .spacing */ .Y.xxl
  },
  illustration: _objectSpread({
    width: '100%',
    height: '100%'
  }, react_native__WEBPACK_IMPORTED_MODULE_1__/* .Platform */ .OD.select({
    web: {
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }))
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OnboardingScreen);

/***/ })

}]);