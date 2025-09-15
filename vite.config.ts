import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base path configuration for root domain deployment
  base: '/',
  
  // Build configuration for production optimization
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate sourcemaps for production debugging (can be disabled for smaller builds)
    sourcemap: false,
    
    // Minification settings
    minify: 'terser',
    
    // Asset chunking for better caching
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for third-party libraries
          vendor: ['react', 'react-dom'],
          // UI components chunk
          ui: ['./src/components/ui/Button.tsx', './src/components/ui/Card.tsx'],
          // Landing page components chunk
          landing: [
            './src/components/landing/LandingPage.tsx',
            './src/components/landing/HeroSection.tsx',
            './src/components/landing/ProblemSection.tsx',
            './src/components/landing/SolutionSection.tsx',
            './src/components/landing/BenefitsComparisonSection.tsx',
            './src/components/landing/FinancialImpactSection.tsx',
            './src/components/landing/SuccessStoriesSection.tsx',
            './src/components/landing/CalculatorIntegrationSection.tsx',
            './src/components/landing/FinalCTASection.tsx'
          ],
          // Calculator components chunk
          calculator: [
            './src/components/SavingsCalculator.tsx',
            './src/components/SavingsChart.tsx',
            './src/components/SavingsInsights.tsx',
            './src/components/FinancialImpactCards.tsx',
            './src/components/RestaurantInfoForm.tsx',
            './src/components/EmailCaptureForm.tsx'
          ]
        },
        // Asset file naming for better caching
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name]-[hash][extname]`;
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Report compressed file sizes
    reportCompressedSize: true,
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  
  // Preview server configuration (for testing production build)
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },
  
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    strictPort: true,
  },
  
  // Asset optimization
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  
  // Define global constants
  define: {
    __APP_VERSION__: '"1.0.0"',
  },
})
