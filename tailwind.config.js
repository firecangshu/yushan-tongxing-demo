/** @type {import('tailwindcss').Config} */
// 与善同行 - 暗色科技风主题
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 主色：青色科技光（#00D4FF）
        primary: {
          DEFAULT: '#00D4FF',
          50: '#E0F7FF',
          100: '#B3EDFF',
          400: '#33DDFF',
          500: '#00D4FF',
          600: '#00A8CC',
        },
        // 背景色
        bg: {
          DEFAULT: '#1A1A2E',
          deep: '#0F0F1E',
          card: '#232342',
        },
        // 强调色：紫色点缀
        accent: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
        },
        // 文字
        text: {
          DEFAULT: '#E5E7EB',
          dim: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-accent': '0 0 20px rgba(139, 92, 246, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
