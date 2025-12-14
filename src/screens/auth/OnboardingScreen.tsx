import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image, Platform} from 'react-native';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';

interface Props {
  onComplete: () => void;
}

type OnboardingPage = 1 | 2 | 3 | 4;

const OnboardingScreen: React.FC<Props> = ({onComplete}) => {
  const [currentPage, setCurrentPage] = useState<OnboardingPage>(1);

  const handleNext = () => {
    if (currentPage < 4) {
      setCurrentPage((prev) => (prev + 1) as OnboardingPage);
    } else {
      onComplete();
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <OnboardingPage1 />;
      case 2:
        return <OnboardingPage2 />;
      case 3:
        return <OnboardingPage3 />;
      case 4:
        return <OnboardingPage4 />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Icon name="graphic_eq" style={styles.logoIcon} />
          <Text style={styles.logoText}>MatchTalk</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>{renderPage()}</View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Page Indicators */}
        <View style={styles.indicators}>
          {[1, 2, 3, 4].map((page) => (
            <View
              key={page}
              style={[
                styles.indicator,
                currentPage === page && styles.indicatorActive,
              ]}
            />
          ))}
        </View>

        {/* Next Button */}
        <Pressable style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentPage === 4 ? 'Başla' : 'İleri'}
          </Text>
          <Icon name="arrow_forward" style={styles.buttonIcon} />
        </Pressable>
      </View>
    </View>
  );
};

// Page 1: Sesli Sohbet Odalarına Katıl
const OnboardingPage1: React.FC = () => {
  return (
    <View style={pageStyles.container}>
      <View style={pageStyles.illustrationContainer}>
        <View style={pageStyles.illustrationBackground} />
        <View
          style={[
            pageStyles.illustration,
            {
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAW8fop3aE7LW6Rfa-cROxQL26OgepxPlUEhGIPNw0mjGI4iIQtpm5E9lVWN_r0oYo8lgrDcNFaJEyG2-8FawHZxtQYO6aws82zg8fuV2wsXV8N4vgfB3hzNzh573gtRi2iMjeA-mmt_7DOCsn5kbMWT7DktIvnCTs9aJjJKxOsx-fqxT1rPemZj1aD1Dl9fyjLDKis_zNFPL1HlOYGAiJgbhdrz33cAhnxebFM_cjOdAMlC4lbSbDq4wezq6cc_ubw2bQsd-OAwq8")',
            },
          ]}
        />
        <View style={pageStyles.micIcon1}>
          <Icon name="mic" style={pageStyles.micIconStyle} />
        </View>
        <View style={pageStyles.micIcon2}>
          <Icon name="mic_off" style={pageStyles.micIconStyle} />
        </View>
      </View>
      <View style={pageStyles.textContainer}>
        <Text style={pageStyles.title}>Sesli Sohbet Odalarına Katıl</Text>
        <Text style={pageStyles.description}>
          4-8 kişilik dengeli odalarda yeni insanlarla tanış
        </Text>
      </View>
    </View>
  );
};

// Page 2: Dengeli Eşleştirme
const OnboardingPage2: React.FC = () => {
  const avatarUrls = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCSKOJeheZ3s93lu33HzP1kFOVzxVaUNUxxWrD0ti4RaoKk57Kqz3qOlAGsyICloOx0VyITVtnS6nQadPRFWSh0Scmd7xhN3Rt6-5ry1b3LnGOS5yib-0SRqVQVCKmu50G08cwxuhIVtlHCzdHR6kQSfljIafzPC4Ftiaof4hJ-5F-22LzUEziDsNEmwda3Ni9ccWoMaZTPOAg6NjI75aUatVIynWUK_luRQMTqD7LPKsawWDlVcdwq5TPLk6R_AXKHcwvpMdXKiYI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAwCyrQMtPAuT62DYbYEho7ckn2U2o2aCzc1_Fa2z-e5YganR9pVuEzhOy5w_GnrM6T8ZSAvI9joYEGylSimi_J2ea9hCAd1kYiYfaGZxAVQ17zdEwHdUVXx-MwfPr8b_2ZjiytZblCIwECrqjrSFxpBOboyTBONTvQa0KgfXYtenwDKBClSpF07QXzi---_uQlQ5uLlshPE0ZTAAjlyqohfNmxlHH_qM25lzRd3ty4bSzBaYE0sjuHOMzoMgVdbq3K-n-Vp0PEb8c',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC-fo9ZQla6RAfzo2C8ntBzsWev4al47sqAfkd5BMD7Fr2Fd-c80F1kZHXiwBqQZxGyvg8E0ks08Jw8_7legI3HS6jYEuB4S12tboeHGqwZBvneNrMnG037dHKlU4sAYvfhJ7pxbORP1cj7gap4hCvx9JqfDm93015-ClxN8vqtUIrQ1wXut7HU5rhB3KpTqCv4GCZt1MDQauumfoHrvvUtLBCScdVe-DuFXozIDpin_mwZt5fExIO9uOt6o-5lA29-SU7O4kzLjDQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDrH78qaTHjQ2Pwl-df1ITqvLlp3sbpa_I3vs8NKSC6aFaFTAderNzNTKwTovVAz2kTsdE_zQOyV2PqDUdAGxwOdtVQzM9haJgp_NlsvM1Dhpc6z3ojY2n_6X-p1qA5Yhel64yIkA7aFC4gl6YuVAgY5fFQdQvyWog-8W25XTIiUctn-cpAcayFN6sRwkqbRh3Lr4nVx8rIOSvwOnQVjmFO1r8FIWmO76UJG_olCkOe-0-TlSmQgGaUYtai3JFr-3SVuxyVVB5JMnk',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCd6_asZk64SUoyc19AvXzXDNSBR3uuKpqaqN-4sc1Xxd5JXxbq9r-Q3sgVKc4d0f-U4t9g-cADT9Iy49M6u_9X1w90r15cHdj4hzyjM3lPUjNPShZ8LoXu4t-8bKKdGhLTD6WjhxyUhq0hSAWzVzO29iRX2ZY7SAIzklEU2JzTDYhywfPgh7lnU7C0oCSnclab4c7F8v8EnV6VeaFzly_nqW78tO0CRJhOKi3UOHWdVYjLBarP_nNGFd7LU-tF18bKf_Ytji2gIX0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAB_-X6LFY1RUKr0CqBmtNAx_52OVJ1abXf9BDx86LV2EO0MsJBrYHZhQDduT768jTQLVrkeBBRPW5WI-wdRd0nu8epNUSMsbUdlv96oP9B4G7u2PZlMeAxNTYwzjHnQDWNTqmkqgRDSwL7vAj2TpfYZPGybG3EXM3bNBJ4l6qhtdKYTCJuvFICf1vi_qNDR6ZJAOetqltJBSQEdWA4X5-yKCAqen5Hso7y5QilRmFKZbNfL8ZbyFFUh2z05p509ZrfslLjqXlNA60',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6PGfNRKlEzWsGlbJ_ELMXIJ7I8AidCgpry6-ZhcJX78SnfK0e4R1HPczlVBpnuwLF4ojV0EvkBQXgbU-GI8wH9zCe3d5_K77YtUUv9Rw3G5mq8PweQTY7yw30GKWd8TqORjn7_cw1JspNF9Ra2J9SaQpHYdij6rkS-9EgCyQRGCeXEONyapF1XQ1ndaiHrLwre7Ava_BN1UKhac10IhtOLm0iK-XznpaTBW_zF-KUfy6-4QKbkhbL18ytwq5iqvoVcYKoTkFu3o',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDAj5QBmRXV66_QrmWojVrpheLpR7iPnbrlM3GHPLI6vtK8b6bmw2jU4v2X4fFn2esdsucWHKAGfogIcAJ7GRbbZhrqWWQ5VysOf7wChweCX5QYRPL5TtN-yoJ6FLIx0UNS4p-4Gfj6YYFJY3-nexTpTLb1mBNA4fHHuIrNu1ggJZ0L7XWR_W6PA91vvNQohKZgWSpH2LIZsNRaBu5ZJjv-VWgRvAEF0nVdJM-9RqAIRGxBjZhQ-q90OMQP7LBAFD9jRcS6pnyfEmg',
  ];

  return (
    <View style={pageStyles.container}>
      <View style={pageStyles2.illustrationContainer}>
        <View style={pageStyles2.glowBackground} />
        <View style={pageStyles2.centralCircle}>
          <Icon name="graphic_eq" style={pageStyles2.centralIcon} />
        </View>
        {/* Avatars positioned around */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View
            key={i}
            style={[
              pageStyles2.avatar,
              pageStyles2[`avatar${i}` as keyof typeof pageStyles2],
            ]}>
            <Image
              source={{uri: avatarUrls[i - 1]}}
              style={pageStyles2.avatarImage}
            />
          </View>
        ))}
      </View>
      <View style={pageStyles.textContainer}>
        <Text style={pageStyles.title}>Dengeli Eşleştirme</Text>
        <Text style={pageStyles.description}>
          Her odada %50 erkek, %50 kadın dengesi korunur
        </Text>
      </View>
    </View>
  );
};

// Page 3: 5 Dakikalık Sohbetler
const OnboardingPage3: React.FC = () => {
  return (
    <View style={pageStyles.container}>
      <View style={pageStyles3.timerContainer}>
        <View style={pageStyles3.timerGlow} />
        <View style={pageStyles3.timerCircle}>
          <View style={pageStyles3.timerContent}>
            <Text style={pageStyles3.timerText}>5:00</Text>
            <Text style={pageStyles3.timerLabel}>Dakika</Text>
          </View>
          <View style={pageStyles3.timerKnob} />
        </View>
      </View>
      <View style={pageStyles.textContainer}>
        <Text style={pageStyles.title}>5 Dakikalık Sohbetler</Text>
        <Text style={pageStyles.description}>
          Her sohbet 5 dakika. İsterseniz 3 dakika daha uzatabilirsiniz.
        </Text>
      </View>
    </View>
  );
};

// Page 4: Arkadaşlar Edin
const OnboardingPage4: React.FC = () => {
  return (
    <View style={pageStyles.container}>
      <View style={pageStyles4.illustrationContainer}>
        <View
          style={[
            pageStyles4.illustration,
            {
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSn94iDObyyUTd0OAa4tExkrL-RRXwcacrwiTMtOaAIWYD7yQdZ2_0fJyFAfoxHQs767fsORtZiUFAk8YRxlmhYz0an5gKq3xVnab4CDDCVS_knEpoelCk0EOHcxmBSAeJ-Sw5QRFUrFmwz99myrmXqh2IYDkCO0wu6cdk09uEZ4TB62t78m9ct5ujUGuhjrSSx30aXII_4fReOq9dZcyj1kTVCJKyFBRiR6HkySdLi0IhY2R1Vk72W1P3n8QHFOI6ALkLEtLL0d8")',
            },
          ]}
        />
      </View>
      <View style={pageStyles.textContainer}>
        <Text style={pageStyles.title}>Arkadaşlar Edin</Text>
        <Text style={pageStyles.description}>
          15 dakika sohbet edenler birbirini ekleyebilir
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    ...Platform.select({
      web: {
        minHeight: '100vh',
      },
    }),
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    zIndex: 10,
  },
  footer: {
    width: '100%',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    paddingTop: spacing.md,
    gap: spacing.xxl,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e9e8ce',
  },
  indicatorActive: {
    width: 32,
    backgroundColor: colors.primary,
    ...Platform.select({
      web: {
        boxShadow: `0 0 10px ${colors.primary}80`,
      },
      default: {
        shadowColor: colors.primary,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
    }),
  },
  nextButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    ...Platform.select({
      web: {
        boxShadow: `0 4px 8px ${colors.primary}33`,
      },
      default: {
        shadowColor: colors.primary,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
    }),
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonIcon: {
    fontSize: 20,
    color: '#000',
  },
});

const pageStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.xxl,
  },
  illustrationContainer: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 320,
    position: 'relative',
    marginBottom: spacing.xxl,
  },
  illustrationBackground: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 9999,
    ...Platform.select({
      web: {
        filter: 'blur(48px)',
        transform: 'scale(0.75)',
      },
      default: {
        transform: [{scale: 0.75}],
      },
    }),
  },
  illustration: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      web: {
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
    }),
  },
  micIcon1: {
    position: 'absolute',
    top: '25%',
    right: '25%',
    backgroundColor: '#fff',
    padding: spacing.sm,
    borderRadius: radius.full,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
  micIcon2: {
    position: 'absolute',
    bottom: '25%',
    left: '25%',
    backgroundColor: '#fff',
    padding: spacing.sm,
    borderRadius: radius.full,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
  micIconStyle: {
    fontSize: 20,
    color: '#6366f1',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm,
    maxWidth: 320,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
});

const pageStyles2 = StyleSheet.create({
  illustrationContainer: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 340,
    position: 'relative',
    marginBottom: spacing.xxl,
  },
  glowBackground: {
    position: 'absolute',
    inset: 0,
    margin: 'auto',
    width: '80%',
    height: '80%',
    borderRadius: 9999,
    backgroundColor: 'rgba(249, 245, 6, 0.2)',
    ...Platform.select({
      web: {
        filter: 'blur(32px)',
      },
    }),
  },
  centralCircle: {
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
    marginLeft: -48,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
  centralIcon: {
    fontSize: 36,
    color: colors.primary,
  },
  avatar: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatar1: {top: '5%', left: '35%'},
  avatar2: {top: '5%', left: '55%'},
  avatar3: {right: '5%', top: '35%'},
  avatar4: {right: '5%', top: '55%'},
  avatar5: {bottom: '5%', left: '35%'},
  avatar6: {bottom: '5%', left: '55%'},
  avatar7: {left: '5%', top: '35%'},
  avatar8: {left: '5%', top: '55%'},
});

const pageStyles3 = StyleSheet.create({
  timerContainer: {
    marginBottom: spacing.xxl,
    position: 'relative',
    alignItems: 'center',
  },
  timerGlow: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(249, 245, 6, 0.2)',
    borderRadius: 9999,
    ...Platform.select({
      web: {
        filter: 'blur(32px)',
        transform: 'scale(1.1)',
      },
      default: {
        transform: [{scale: 1.1}],
      },
    }),
  },
  timerCircle: {
    width: 256,
    height: 256,
    borderRadius: 128,
    borderWidth: 6,
    borderColor: 'rgba(249, 245, 6, 0.3)',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
    }),
  },
  timerContent: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  timerText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: -2,
  },
  timerLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  timerKnob: {
    position: 'absolute',
    top: -12,
    left: '50%',
    marginLeft: -16,
    width: 32,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});

const pageStyles4 = StyleSheet.create({
  illustrationContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    maxHeight: 320,
    marginBottom: spacing.xxl,
  },
  illustration: {
    width: '100%',
    height: '100%',
    ...Platform.select({
      web: {
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
    }),
  },
});

export default OnboardingScreen;
