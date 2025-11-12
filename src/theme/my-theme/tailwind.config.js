const tailwindcssAnimate = require('tailwindcss-animate');
const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    // Use path.join for reliable path resolution across different build environments
    path.join(__dirname, 'components/**/*.{ts,tsx,js,jsx}'),
    path.join(__dirname, 'components/modules/**/*.{ts,tsx,js,jsx}'),
    path.join(__dirname, 'components/ui/**/*.{ts,tsx,js,jsx}'),
    path.join(__dirname, 'templates/**/*.{html,hubl,hubl.html}'),
    path.join(__dirname, 'templates/**/*.html'),
    path.join(__dirname, 'templates/layouts/**/*.{html,hubl,hubl.html}'),
    path.join(__dirname, 'lib/**/*.{ts,tsx,js,jsx}'),
    path.join(__dirname, 'styles/**/*.{css,scss,sass}'),
    path.join(__dirname, 'styles/**/*.css'),
    path.join(__dirname, 'partials/**/*.{ts,tsx,js,jsx,html,hubl}'),

    // Relative paths as fallback (for different working directories)
    './components/**/*.{ts,tsx,js,jsx}',
    './components/modules/**/*.{ts,tsx,js,jsx}',
    './components/ui/**/*.{ts,tsx,js,jsx}',
    './templates/**/*.{html,hubl,hubl.html}',
    './templates/**/*.html',
    './templates/layouts/**/*.{html,hubl,hubl.html}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './styles/**/*.{css,scss,sass}',
    './styles/**/*.css',
    './partials/**/*.{ts,tsx,js,jsx,html,hubl}',

    // Paths without ./ prefix (for build tools)
    'components/**/*.{ts,tsx,js,jsx}',
    'components/modules/**/*.{ts,tsx,js,jsx}',
    'components/ui/**/*.{ts,tsx,js,jsx}',
    'templates/**/*.{html,hubl,hubl.html}',
    'templates/**/*.html',
    'templates/layouts/**/*.{html,hubl,hubl.html}',
    'lib/**/*.{ts,tsx,js,jsx}',
    'styles/**/*.{css,scss,sass}',
    'styles/**/*.css',
    'partials/**/*.{ts,tsx,js,jsx,html,hubl}',
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
    'h-24',
    'h-32',
    'w-full',
    'w-24',
    'w-32',
    'w-64',
    'w-auto',
    'w-2.5',
    'w-8',
    'w-10',
    'w-48',
    'w-80',
    'min-h-screen',
    'max-w-md',
    'max-w-4xl',
    'max-w-7xl',

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
    'text-3xl',
    'text-4xl',
    'text-5xl',
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
    'leading-4',
    'leading-none',
    'text-gray-500',
    'text-gray-600',
    'text-gray-700',
    'text-gray-900',
    'text-white',
    'text-red-500',
    'text-red-700',
    'text-[#D4AF37]',
    'text-[#bf974c]',
    'uppercase',
    'break-words',

    // Borders
    'border',
    'border-t',
    'border-b',
    'border-l',
    'border-r',
    'border-2',
    'border-4',
    'border-gray-200',
    'border-gray-300',
    'border-white',
    'border-red-200',
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
    // Pattern for width and height utilities
    {
      pattern: /^(w|h)-(24|32|48|64|80|96|full|screen|auto)$/,
    },
    {
      pattern: /^(w|h)-\d+$/,
    },
    // Pattern for spacing utilities
    {
      pattern: /^(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-[xy])-\d+$/,
    },
    // Pattern for text colors
    {
      pattern: /^text-(gray|red|blue|green|yellow|purple|pink)-\d+$/,
    },
    // Pattern for background colors
    {
      pattern: /^bg-(gray|red|blue|green|yellow|purple|pink)-\d+$/,
    },
    // Pattern for border colors
    {
      pattern: /^border-(gray|red|blue|green|yellow|purple|pink|white)-\d+$/,
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
    'hover:bg-gray-100',
    'hover:shadow-lg',
    'hover:shadow-md',
    'transition-colors',
    'transition-shadow',
    'duration-200',

    // Object fit
    'object-cover',
    'object-contain',

    // Background colors
    'bg-white',
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
    'bg-red-50',
    'bg-red-500',
    'bg-red-600',
    'bg-red-700',
    'bg-[#D4AF37]',
    'bg-[#bf974c]',
    'bg-gradient-to-r',
    'bg-gradient-to-br',
    'from-blue-400',
    'via-purple-500',
    'to-pink-500',
    'from-[#D4AF37]',
    'to-[#bf974c]',

    // Positioning
    'absolute',
    'relative',
    'top-1/2',
    'left-3',
    'right-0',
    'right-3',
    '-top-0.5',
    '-right-0.5',
    '-mt-24',
    'transform',
    '-translate-y-1/2',

    // Grid and layout
    'grid-cols-1',
    'md:grid-cols-2',
    'lg:grid-cols-3',
    'lg:col-span-1',
    'lg:col-span-2',

    // Flexbox
    'items-center',
    'items-start',
    'items-end',
    'justify-center',
    'justify-end',
    'justify-start',
    'flex-shrink-0',

    // Spacing specific
    'pt-6',
    'pb-4',
    'pb-8',
    'px-6',
    'px-8',
    'py-2',
    'py-4',
    'py-8',
    'py-12',
    'mb-1',
    'mb-2',
    'mb-4',
    'mb-6',
    'mt-2',
    'mt-8',
    'gap-2',
    'gap-3',
    'gap-4',
    'gap-6',
    'gap-8',

    // Text alignment
    'text-center',
    'text-left',
    'lg:text-left',

    // Overflow
    'overflow-hidden',
    'overflow-y-auto',

    // Z-index
    'z-50',

    // Opacity and visibility
    'opacity-0',

    // Specific height/width combinations
    'h-48',
    'h-16',
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
