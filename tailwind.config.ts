
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
				// Paleta inspirada no Make - tons de roxo e laranja
				'make-purple': {
					50: 'hsl(273, 100%, 98%)',
					100: 'hsl(273, 96%, 94%)',
					200: 'hsl(273, 95%, 86%)',
					300: 'hsl(273, 94%, 76%)',
					400: 'hsl(273, 95%, 63%)',
					500: 'hsl(273, 96%, 50%)',
					600: 'hsl(273, 96%, 42%)',
					700: 'hsl(273, 96%, 34%)',
					800: 'hsl(273, 96%, 26%)',
					900: 'hsl(273, 96%, 18%)',
					950: 'hsl(273, 96%, 12%)',
				},
				'make-orange': {
					50: 'hsl(25, 100%, 97%)',
					100: 'hsl(25, 100%, 94%)',
					200: 'hsl(25, 100%, 87%)',
					300: 'hsl(25, 98%, 77%)',
					400: 'hsl(25, 97%, 64%)',
					500: 'hsl(25, 95%, 53%)',
					600: 'hsl(25, 95%, 48%)',
					700: 'hsl(25, 95%, 40%)',
					800: 'hsl(25, 95%, 32%)',
					900: 'hsl(25, 95%, 26%)',
					950: 'hsl(25, 95%, 15%)',
				},
				// Tons de cinza adaptados ao Make
				'make-gray': {
					50: 'hsl(273, 20%, 98%)',
					100: 'hsl(273, 17%, 94%)',
					200: 'hsl(273, 15%, 87%)',
					300: 'hsl(273, 13%, 76%)',
					400: 'hsl(273, 12%, 63%)',
					500: 'hsl(273, 12%, 47%)',
					600: 'hsl(273, 12%, 35%)',
					700: 'hsl(273, 12%, 25%)',
					800: 'hsl(273, 12%, 18%)',
					900: 'hsl(273, 12%, 15%)',
					950: 'hsl(273, 12%, 9%)',
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
				sm: 'calc(var(--radius) - 4px)'
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
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
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
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
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
				'enter': 'fade-in 0.3s ease-out, scale-in 0.2s ease-out',
				'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out',
				'secure-glow': 'secure-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
