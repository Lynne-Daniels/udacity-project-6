/* feedreader.js
For use with Jasmine  -- see http://jasmine.github.io/2.2/introduction.html
Jasmine will use the tests in this file to determine if certain
item in app.js are functioning as expected.*/

/*Use $() to prevent running tests until after DOM is ready.*/

$(function(){

	/* Test RSS feeds definitions and the allFeeds variable */
	describe('RSS Feeds', function() {
		/* Test to make sure that the allFeeds variable has been
		defined and that it is not been defined and that it is not
		empty. */

		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
	});

	/* Loops through each feed in the allFeeds object and ensures
	it has a URL defined, and that the URL is not empty.*/

	describe('Each feed', function() {

		it('has a URL that is not empty', function() {
			for (var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).toBeGreaterThan(2);
			}
		});

		/* Loops through each feed in the allFeeds object and ensures
		  it has a name defined and that the name is not empty.*/

		it('has a Name that is not empty', function() {

			allFeeds.forEach(function(feed){
				expect(feed.name).toBeDefined();
				expect(feed.name.length).toBeGreaterThan(0);
			});
		});
	});

	/* Test that the menu is hidden by default
	There is a css tag on the body called menu-hidden.  When it exists,
	divs with class = menu are positioned to the left of the viewport*/

	describe('The menu', function() {

		it('is hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		/*test the actual position of the menu
		use below to see exactly where the menu hides
		console.log('transform is',($('div.menu').position().left)); 
		 */
		it('is left of viewport by default', function() {
			expect($('div.menu').position().left).toBeLessThan(0);
		});

		/* Tests that the menu changes visibility when the menu icon is 
		clicked.*/

		var initialState = ($('body').hasClass('menu-hidden')); //true or false depending on menu status

		it('appears when clicked', function() {
			$('a.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden') !== initialState).toBe(true);
		});

		it('hides when clicked again', function() {
			$('a.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden') === initialState).toBe(true);
		});
	});

	/* Test that when the asynchronous function loadFeed
	is called and completes its work, there is at least
	a single .entry element within the .feed container.*/

	describe('Initial Entries', function() {

		var i = 0; //specifies the Udacity Feed

		beforeEach(function(done) {
			loadFeed(i, (function() {
				done();
			}));
		});

		it('feed ' + i + ' puts an entry in the feed container', function(done) {
			expect($('div.feed a.entry-link article.entry').length).toBeGreaterThan(0);
			done();
		});
	});

	/* Test that ensures content changes when a new feed is loaded
	by the asynchronous loadFeed function*/

	describe('New Feed Selection', function() {

		var originalEntry = '';
		var nextEntry;
		beforeEach(function(done) {
			$('div.feed a.entry-link article.entry').empty();//clear the original feed
			loadFeed(0, function() {			
				originalEntry = $('div.feed a.entry-link article.entry');
				loadFeed(1, function() {
					nextEntry = $('div.feed a.entry-link article.entry');
					done();
				});
			});
		});
		it('should change the entry when a new feed is loaded', function(done) {
			expect(nextEntry[0].innerHTML).not.toBe(originalEntry[0].innerHTML);
			done();
		});
	});
}());