const tailwindcssAnimate = require('tailwindcss-animate');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    // Local development paths
    './components/**/*.{ts,tsx,js,jsx}',
    './templates/**/*.{html,hubl,hubl.html}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './styles/**/*.{css,scss}',
    './partials/**/*.{ts,tsx,js,jsx}',

    // Fallback patterns for build environment (without ./)
    'components/**/*.{ts,tsx,js,jsx}',
    'templates/**/*.{html,hubl,hubl.html}',
    'lib/**/*.{ts,tsx,js,jsx}',
    'styles/**/*.{css,scss}',
    'partials/**/*.{ts,tsx,js,jsx}',

    // Catch-all for HubSpot build
    './**/*.{ts,tsx,js,jsx,html,hubl}',
  ],
  safelist: [
    // Layout utilities
    'flex',
    'flex-col',
    'flex-row',
    'grid',
    'hidden',
    'block',
    'inline-block',
    'inline-flex',

    // Sizing
    'h-screen',
    'h-full',
    'h-auto',
    'w-full',
    'w-64',
    'w-auto',
    'min-h-screen',

    // Spacing
    'p-0',
    'p-1',
    'p-2',
    'p-3',
    'p-4',
    'p-5',
    'p-6',
    'p-8',
    'px-2',
    'px-3',
    'px-4',
    'px-6',
    'py-2',
    'py-3',
    'py-4',
    'py-6',
    'm-0',
    'm-2',
    'm-4',
    'space-y-1',
    'space-y-2',
    'space-y-4',
    'space-y-6',
    'gap-2',
    'gap-4',
    'gap-6',

    // Typography
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
    'leading-4',
    'leading-none',

    // Borders
    'border',
    'border-t',
    'border-b',
    'border-l',
    'border-r',
    'rounded',
    'rounded-md',
    'rounded-lg',
    'rounded-full',

    // Shadows
    'shadow',
    'shadow-sm',
    'shadow-md',
    'shadow-lg',

    // Pattern-based safelist for color utilities
    {
      pattern:
        /^(bg|text|border|ring)-(background|foreground|border|input|ring)$/,
    },
    {
      pattern:
        /^(bg|text|border|ring)-(primary|secondary|destructive|muted|accent|popover|card)(-foreground)?$/,
    },
    {
      pattern:
        /^(bg|text|border|ring)-sidebar(-foreground|-border|-accent|-accent-foreground|-ring|-primary|-primary-foreground)?$/,
    },

    // Generate all flex utilities
    { pattern: /^flex-.*$/ },

    // Generate all position utilities
    { pattern: /^(relative|absolute|fixed|sticky)$/ },

    // Generate all display utilities
    { pattern: /^(block|inline|inline-block|flex|inline-flex|grid|hidden)$/ },

    // Explicit critical classes
    'bg-background',
    'text-foreground',
    'bg-sidebar',
    'text-sidebar-foreground',
    'border-sidebar-border',
    'bg-sidebar-accent',
    'text-sidebar-accent-foreground',
    'ring-sidebar-ring',
    'border-sidebar',
    'ring-sidebar',

    // Common utilities
    'cursor-pointer',
    'hover:bg-sidebar-accent',
    'hover:text-sidebar-accent-foreground',
    'transition-colors',
    'duration-200',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
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
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
