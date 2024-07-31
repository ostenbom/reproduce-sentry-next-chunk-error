import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
   await page.route(
      (url: URL) => {
        return url.pathname.includes('/_next/static/chunks/webpack');
      },
      (route) => {
        return route.fulfill({
          status: 200,
          // chopped off chunk
          body: `!function() {
    "use strict";
    var e, t, c, a, f, n, d`,
        });
      },
    );
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Docs -> Find in-depth' }).click();
});