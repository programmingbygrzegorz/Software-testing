// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * Główna konfiguracja testów Playwright.
 * Więcej informacji: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Folder, w którym znajdują się pliki testów
  testDir: './tests',

  // Domyślny limit czasu dla całego testu (w milisekundach)
  timeout: 40 * 1000,

  // Konfiguracja bibliotekowych asercji (expect)
  // Ustawia timeout dla sprawdzania warunków w testach
  expect: {
    timeout: 40 * 1000,
  },

  // Format raportu po uruchomieniu testów
  // 'html' tworzy raport HTML, który można otworzyć w przeglądarce
  reporter: 'html',

  use: {
    // Browser, na którym będą uruchamiane testy
    browserName: 'chromium',

    // Możesz tu dodać np. headless, viewport, screenshot, trace itd.
    // Przykład:
    // headless: true,
    // video: 'retain-on-failure'
  },
});

