
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
                                primary: {
                                        DEFAULT: 'hsl(var(--primary))',
                                        foreground: 'hsl(var(--primary-foreground))'
                                },
                                'primary-dark': 'hsl(var(--primary-dark))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                                // Paleta Instalei 2025 - Azul noturno e Laranja assinatura
                                'instalei-navy': {
                                        50: '#f2f5fb',
                                        100: '#e2e8f5',
                                        200: '#c7d4eb',
                                        300: '#9fb6d6',
                                        400: '#5d82b1',
                                        500: '#27497f',
                                        600: '#1d3a67',
                                        700: '#152c4f',
                                        800: '#0f2140',
                                        900: '#0a1831',
                                        950: '#050c1c',
                                },
                                'instalei-orange': {
                                        50: '#fff5ec',
                                        100: '#ffe5d0',
                                        200: '#ffc19b',
                                        300: '#ffa168',
                                        400: '#ff8744',
                                        500: '#ff6b2c',
                                        600: '#f2551a',
                                        700: '#cc4314',
                                        800: '#a33515',
                                        900: '#7d2a12',
                                        950: '#421408',
                                },
                                // Sistema de cinzas modernos
				'instalei-gray': {
					50: 'hsl(220, 15%, 98%)',
					100: 'hsl(220, 15%, 95%)',
					200: 'hsl(220, 15%, 85%)', // text light moderno
					300: 'hsl(220, 15%, 75%)',
					400: 'hsl(220, 15%, 65%)',
					500: 'hsl(220, 15%, 45%)',
					600: 'hsl(220, 15%, 35%)', // text medium moderno
					700: 'hsl(220, 15%, 25%)',
					800: 'hsl(220, 15%, 15%)', // text dark moderno
					900: 'hsl(220, 15%, 9%)',
					950: 'hsl(220, 15%, 4%)',
				},
				'success': {
					DEFAULT: '#10B981',
					hover: '#059669',
					light: '#D1FAE5',
				},
				'warning': {
					DEFAULT: '#F59E0B',
					hover: '#D97706',
					light: '#FEF3C7',
				},
				'danger': {
					DEFAULT: '#EF4444',
					hover: '#DC2626',
					light: '#FEE2E2',
				}
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'sans': ['Inter', 'sans-serif'],
			},
			fontWeight: {
				'normal': '400',
				'medium': '500',
				'semibold': '600',
				'bold': '700',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'instalei': '12px',
				'instalei-sm': '8px',
				'instalei-lg': '16px',
				'instalei-xl': '20px'
			},
			spacing: {
				'instalei-xs': '8px',
				'instalei-sm': '16px',
				'instalei-md': '24px',
				'instalei-lg': '32px',
				'instalei-xl': '48px',
				'instalei-2xl': '64px'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(20px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.9)', opacity: '0' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(270 100% 65% / 0.3), 0 0 40px hsl(270 100% 65% / 0.1)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(270 100% 65% / 0.5), 0 0 80px hsl(270 100% 65% / 0.2)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'cyber-glitch': {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'slide-in-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-out-up': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-100%)' }
				},
				'slide-in-down': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-out-down': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'pulse': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.5'
					}
				},
				'rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'secure-glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.3)' },
					'50%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'scale-out': 'scale-out 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'slide-out-left': 'slide-out-left 0.3s ease-out',
				'slide-in-up': 'slide-in-up 0.3s ease-out',
				'slide-out-up': 'slide-out-up 0.3s ease-out',
				'slide-in-down': 'slide-in-down 0.3s ease-out',
				'slide-out-down': 'slide-out-down 0.3s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'rotate': 'rotate 1s linear infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'cyber-glitch': 'cyber-glitch 0.3s linear infinite',
				'enter': 'fade-in 0.5s ease-out, scale-in 0.4s ease-out',
				'exit': 'fade-out 0.5s ease-out, scale-out 0.4s ease-out',
				'secure-glow': 'secure-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
