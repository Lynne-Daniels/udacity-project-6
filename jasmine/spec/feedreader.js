/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
	});

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
	describe('Each feed', function(){
		
				it('has a URL that is not empty', function() {
					for (var i = 0; i < allFeeds.length; i++){
//					console.log(allFeeds[i].url);
					expect(allFeeds[i].url).toBeDefined();
					expect(allFeeds[i].url).not.toBe(0);
				}	
				});
				
		/* TODO: Write a test that loops through each feed
		* in the allFeeds object and ensures it has a name defined
		* and that the name is not empty.
		*/

				it('has a Name that is not empty', function() {
					for (var i = 0; i < allFeeds.length; i++){
//					console.log(allFeeds[i].name);
					expect(allFeeds[i].name).toBeDefined();
					expect(allFeeds[i].name).not.toBe(0);
				}	
				});
			});				
			
    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         * There is a css tag on the body called menu-hidden.  When it exists,
         * divs with class = menu are positioned to the left of the viewport
         */
	describe('The menu', function(){
		
		it('is hidden by default', function(){
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
		
		// here is another way...which is best?
		it('is left of viewport by default', function(){
//			console.log('transform is',($('div.menu').position().left)); <-- use that to see where the menu hides
			expect($('div.menu').position().left).toBeLessThan(0);
		});	
		
		
	         /* TODO: Write a test that ensures the menu changes
	          * visibility when the menu icon is clicked. This test
	          * should have two expectations: does the menu display when
	          * clicked and does it hide when clicked again.
	          */
		var initialState = ($('body').hasClass('menu-hidden')); //true or false depending on menu status
		
		it('appears when clicked', function(){
			$('a.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden') !== initialState).toBe(true);
		});
		
		it('hides when clicked again', function(){
			$('a.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden') === initialState).toBe(true);
		});	
	});
	
    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
	describe('Initial Entries', function(){

		var i = 0; //specifies the Udacity Feed
	
		beforeEach(function(done) {
			loadFeed(i,(function() {
				done();
			}));
		});
		
		it('feed '+i+' puts an entry in the feed container', function(done){
//			console.log('testing the test:  feed id is', i, 'entry is ', $('div.feed a.entry-link article.entry'));
			expect($('div.feed a.entry-link article.entry').length).toBeGreaterThan(0);
			done();
		});
	});
	
	/*Loops through each feed to test that it creates an entry in the feed container
	 * Does not work because it does whatever it wants in any order with complete disregard
	 * for whatever order I tell it to use, so it it measuring stuff, then defining it. :-((((((()))))))*/
	    
/*	describe('All Initial Entries', function(){

// loads each feed, building an array containing the number of entries for for each feed
	var allLengths = [];
	function getEntries(allFeeds, cb){
		
		for (var i = 0; i < allFeeds.length; i++){
			loadFeed(i, function(){
				var myarray = $('div.feed a.entry-link article.entry');
				console.log('myarray length ', myarray.length);
			//	console.log('div.feed a.entry-link article.entry legnth',$('div.feed a.entry-link article.entry').legnth);
				allLengths.push(myarray.length);
				console.log('all Legnths in here',allLengths);
			//	console.log('div.feed a.entry-link article.entry',$('div.feed a.entry-link article.entry'));
			}
		);}
		cb();
	} //end getEntries, expect allLengths === [4, 4, 4, 4]
	
	//var allEntries = getEntries(allFeeds);
	getEntries(allFeeds, cb);
	function cb()
		{console.log('allLengths way out here', allLengths);}
	
		
		beforeEach(function(done) {
			getEntries(allFeeds);
			done();
			console.log('allLengths out here', allLengths);
			
		});
	
	function testAlltheFeeds(index, numEntries){	
		it('feed '+i+' puts an entry in the feed container', function(done){
			console.log('testing the test: index is ', index, 'numEntries is ', numEntries);
			expect(numEntries.length).toBeGreaterThan(0);
			done();
		});
	} //end testAlltheFeeds
	for (var i = 0; i < allFeeds.length; i++){
//		console.log('wtf --  allEntries[i]', allEntries[i]);
		testAlltheFeeds(i, allLengths[i]);
	}
//	}
	}); 

  */    
         

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        
	describe('New Feed Selection', function(){
		
		var i = 1; //specifies the CSS Tricks Feed, Udacity Feed was originally on the page
		var originalEntry;
		var nextEntry;
		beforeEach(function(done){
			originalEntry = $('div.feed a.entry-link article.entry');
			loadFeed(i,function(){
				nextEntry = $('div.feed a.entry-link article.entry');
				done();
			
			});
		});
		
		it ('should change the entry when a new feed is loaded', function(done){
			//console.log('original entry out here', originalEntry); -->if test really works
			//console.log('next entry out here', nextEntry);         ---> these items are not the same
			expect(nextEntry).not.toBe(originalEntry);
			done();
		});
	});
}()); 
