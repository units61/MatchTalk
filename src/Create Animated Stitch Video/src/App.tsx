import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, RotateCcw, Sparkles, Radio, Home, UserPlus, User, Settings } from 'lucide-react';

export default function App() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-between p-4 overflow-hidden relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Header with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <motion.div
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block mb-4"
          >
            <Radio className="w-12 h-12 text-cyan-400" />
          </motion.div>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-5xl mb-3">
            Oda Bul
          </h1>
          <p className="text-white/60">Sesli sohbet odalarına anında katıl</p>
          
          {/* Decorative sparkles */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Main microphone button */}
        <div className="flex items-center justify-center mb-16">
          <AnimatePresence mode="wait">
            {!isConnected ? (
              <motion.button
                key="mic-button"
                onClick={handleConnect}
                disabled={isConnecting}
                className="relative focus:outline-none disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Multiple pulsing rings with different colors */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full"
                    animate={{
                      scale: [1, 1.4 + i * 0.2, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.4
                    }}
                  >
                    <div className={`w-full h-full rounded-full border-4 ${
                      i === 0 ? 'border-cyan-400/50' : 
                      i === 1 ? 'border-purple-400/50' : 
                      'border-pink-400/50'
                    }`} />
                  </motion.div>
                ))}

                {/* Rotating gradient ring */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="w-full h-full rounded-full border-4 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-border" 
                       style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 45%, black 50%, transparent 55%)' }} />
                </motion.div>

                {/* Main button with glassmorphism */}
                <motion.div
                  className="relative w-52 h-52 rounded-full backdrop-blur-xl bg-gradient-to-br from-cyan-500/40 via-purple-500/40 to-pink-500/40 flex items-center justify-center shadow-2xl border border-white/20"
                  animate={{
                    boxShadow: [
                      '0 0 60px rgba(34, 211, 238, 0.4), 0 0 100px rgba(168, 85, 247, 0.3)',
                      '0 0 80px rgba(168, 85, 247, 0.5), 0 0 120px rgba(236, 72, 153, 0.4)',
                      '0 0 60px rgba(34, 211, 238, 0.4), 0 0 100px rgba(168, 85, 247, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Inner gradient glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                  
                  {isConnecting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="relative z-10"
                    >
                      <RotateCcw className="w-20 h-20 text-white drop-shadow-lg" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative z-10"
                    >
                      <Mic className="w-20 h-20 text-white drop-shadow-2xl" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Inner multiple glows */}
                <motion.div
                  className="absolute inset-8 rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 blur-2xl"
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>
            ) : (
              <motion.div
                key="connected"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-center"
              >
                {/* Connected state with celebration effect */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(i * 45 * Math.PI / 180) * 100,
                      y: Math.sin(i * 45 * Math.PI / 180) * 100,
                      opacity: 0,
                      scale: [1, 0]
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                <motion.div
                  className="w-52 h-52 rounded-full backdrop-blur-xl bg-gradient-to-br from-green-400/40 to-emerald-600/40 flex items-center justify-center shadow-2xl mb-6 border border-white/20"
                  animate={{
                    boxShadow: [
                      '0 0 60px rgba(34, 197, 94, 0.5)',
                      '0 0 100px rgba(16, 185, 129, 0.7)',
                      '0 0 60px rgba(34, 197, 94, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Mic className="w-20 h-20 text-white drop-shadow-2xl" />
                  </motion.div>
                  
                  {/* Sound waves */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 text-xl mb-6"
                >
                  🎉 Odaya Bağlandınız!
                </motion.p>
                
                <motion.button
                  onClick={handleDisconnect}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 backdrop-blur-xl bg-gradient-to-r from-red-500/80 to-rose-600/80 hover:from-red-600/90 hover:to-rose-700/90 text-white rounded-full transition-all shadow-lg border border-white/20"
                >
                  Ayrıl
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status text */}
        {!isConnected && !isConnecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
              ✨ Başlamak için mikrofona dokunun
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md mx-auto mb-4 relative z-10"
      >
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-4 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-around">
            {/* Home */}
            <motion.button
              onClick={() => setActiveTab('home')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`p-3 rounded-2xl transition-all ${
                activeTab === 'home' 
                  ? 'bg-gradient-to-br from-cyan-500/40 to-purple-500/40' 
                  : 'bg-transparent'
              }`}>
                <Home className={`w-6 h-6 transition-colors ${
                  activeTab === 'home' ? 'text-cyan-300' : 'text-white/60'
                }`} />
              </div>
              {activeTab === 'home' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 w-1.5 h-1.5 bg-cyan-400 rounded-full"
                />
              )}
            </motion.button>

            {/* Add Friends */}
            <motion.button
              onClick={() => setActiveTab('friends')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`p-3 rounded-2xl transition-all ${
                activeTab === 'friends' 
                  ? 'bg-gradient-to-br from-cyan-500/40 to-purple-500/40' 
                  : 'bg-transparent'
              }`}>
                <UserPlus className={`w-6 h-6 transition-colors ${
                  activeTab === 'friends' ? 'text-yellow-300' : 'text-white/60'
                }`} />
              </div>
              {activeTab === 'friends' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 w-1.5 h-1.5 bg-yellow-400 rounded-full"
                />
              )}
            </motion.button>

            {/* Profile */}
            <motion.button
              onClick={() => setActiveTab('profile')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`p-3 rounded-2xl transition-all ${
                activeTab === 'profile' 
                  ? 'bg-gradient-to-br from-cyan-500/40 to-purple-500/40' 
                  : 'bg-transparent'
              }`}>
                <User className={`w-6 h-6 transition-colors ${
                  activeTab === 'profile' ? 'text-yellow-300' : 'text-white/60'
                }`} />
              </div>
              {activeTab === 'profile' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 w-1.5 h-1.5 bg-yellow-400 rounded-full"
                />
              )}
            </motion.button>

            {/* Settings */}
            <motion.button
              onClick={() => setActiveTab('settings')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`p-3 rounded-2xl transition-all ${
                activeTab === 'settings' 
                  ? 'bg-gradient-to-br from-cyan-500/40 to-purple-500/40' 
                  : 'bg-transparent'
              }`}>
                <Settings className={`w-6 h-6 transition-colors ${
                  activeTab === 'settings' ? 'text-yellow-300' : 'text-white/60'
                }`} />
              </div>
              {activeTab === 'settings' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 w-1.5 h-1.5 bg-yellow-400 rounded-full"
                />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}