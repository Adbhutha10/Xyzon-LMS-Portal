/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary - Deep Indigo/Royal Blue (focus, knowledge, trust)
                primary: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    900: '#312e81',
                },
                // Teal - growth, learning, freshness
                teal: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                },
                // Amber - energy, creativity, positivity
                amber: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                },
                // Neutral grays
                surface: {
                    50: '#f8faff',
                    100: '#f1f5ff',
                    200: '#e4ebff',
                    card: '#ffffff',
                    border: '#e5e9f5',
                },
                ink: {
                    DEFAULT: '#1e1b4b',
                    light: '#3730a3',
                    muted: '#6b7280',
                    faint: '#9ca3af',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                blob: "blob 7s infinite",
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                }
            },
        },
    },
    plugins: [],
}
