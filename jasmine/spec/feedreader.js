/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    describe('RSS Feeds', function () {
        it('check allFeeds is defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        it('checks URL values are valid', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });
        it('checks URL names are valid', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    describe("The menu", function () {
        let body = document.querySelector("body");
        it('checks menu is hidden on load', function () {
            expect(body).toBeDefined();
            expect(body).toHaveClass("menu-hidden");
        });
        it('checks menu shows on first click and hides on second click', function () {
            let menu = document.querySelector(".header a.menu-icon-link");
            expect(body).toBeDefined();
            expect(menu).toBeDefined();
            menu.click();
            expect(body).not.toHaveClass("menu-hidden");
            menu.click();
            expect(body).toHaveClass("menu-hidden");
        });
    });

    describe("Initial Entries", function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        it('loadFeed request is valid and returns at least 1 result', function () {
            const feedContainerChildren = document.querySelectorAll(".feed .entry").length;
            expect(feedContainerChildren).toBeDefined();
            expect(feedContainerChildren).not.toBe(0);
        });
    });

    describe("New Feed Selection", function () {
        let initialFeedName;
        beforeEach(function (done) {
            loadFeed(0, function () {
                initialFeedName = document.querySelector("h1").textContent;
                expect(initialFeedName).toBeDefined();
                loadFeed(1, done);
            });
        });
        it('runs an intial load on feed 0', function () {
            let newFeedName = document.querySelector("h1").textContent;
            expect(newFeedName).toBeDefined();
            expect(newFeedName).not.toBe(initialFeedName);
        });
    });
}());