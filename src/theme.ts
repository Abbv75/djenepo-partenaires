import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e8f0fb',
      100: '#c5d8f6',
      200: '#9fbef0',
      300: '#79a4ea',
      400: '#5c90e6',
      500: '#3f7ce2',
      600: '#2B5BC4',
      700: '#1f3fa0',
      800: '#16307d',
      900: '#0b1f5b',
    },
    gold: {
      50: '#fef8ea',
      100: '#fce9c0',
      200: '#fad995',
      300: '#f7c86a',
      400: '#f4b53f',
      500: '#C8861A',
      600: '#a36a10',
      700: '#7e4e09',
      800: '#5a3504',
      900: '#361e01',
    },
  },
  fonts: {
    heading: `'Plus Jakarta Sans', 'Inter', sans-serif`,
    body: `'Inter', 'Plus Jakarta Sans', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        background: 'white',
        color: 'gray.800',
        scrollBehavior: 'smooth',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: '8px',
        _focus: { boxShadow: 'none' },
      },
      variants: {
        brand: {
          bg: 'brand.600',
          color: 'white',
          _hover: {
            bg: 'brand.700',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(43,91,196,0.35)',
          },
          transition: 'all 0.2s ease',
        },
        gold: {
          bg: 'gold.500',
          color: 'white',
          _hover: {
            bg: 'gold.600',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(200,134,26,0.35)',
          },
          transition: 'all 0.2s ease',
        },
        outline_brand: {
          bg: 'transparent',
          color: 'brand.600',
          border: '2px solid',
          borderColor: 'brand.600',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s ease',
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: { textDecoration: 'none' },
      },
    },
  },
})

export default theme
