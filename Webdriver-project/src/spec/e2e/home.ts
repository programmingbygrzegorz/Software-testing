describe('Verify Home Page Google', async () => {
    it('should open google page and wait for 3000 ms', async () => {
        await browser.url('https://www.google.com/');
        await browser.pause(3000);
    });
});