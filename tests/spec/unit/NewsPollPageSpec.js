describe('A news poll page', function () {
    var backups = {
            eventHandler: nh.eventHandler,
            newsArticleApplication: nh.applications.NewsArticle,
            newsPollerApplication: nh.applications.NewsPoller
        },
        mockedNewsArticleApplication, mockedNewsPollerApplication, page;

    beforeEach(function () {
        mockedNewsArticleApplication = jasmine.util.mock(backups.newsArticleApplication);
        mockedNewsPollerApplication = jasmine.util.mock(backups.newsPollerApplication);

        nh.eventHandler = jasmine.util.mockObj(nh.eventHandler, {
            events: nh.eventHandler.events
        });
        nh.applications.NewsArticle = jasmine.createSpy('nh.applications.NewsArticle').and.callFake(function () {
            return mockedNewsArticleApplication;
        });
        nh.applications.NewsPoller = jasmine.createSpy('nh.applications.NewsPoller').and.callFake(function () {
            return mockedNewsPollerApplication;
        });
    });

    afterEach(function () {
        nh.eventHandler = backups.eventHandler;
        nh.applications.NewsArticle = backups.newsArticleApplication;
        nh.applications.NewsPoller = backups.newsPollerApplication;
    });

    it('can be created and return an instance of nh.pages.PageController', function () {
        // Actions
        page = new nh.pages.PageController();

        // Expectations
        expect(page instanceof nh.pages.PageController).toBe(true);
        expect(page.newsArticle).toBe(mockedNewsArticleApplication);
        expect(page.newsPoll).toBe(mockedNewsPollerApplication);
        expect(nh.eventHandler.subscribe).toHaveBeenCalledWith(null, nh.eventHandler.events.ARTICLE_SELECTED,
            jasmine.any(Function));
    });

    describe('that has been instantiated', function () {
        beforeEach(function () {
            page = new nh.pages.PageController();
        });

        it('can re-render the news article view with a new article', function () {
            var article;

            // Before
            article = {
                props: {
                    id: 5
                }
            };

            // Actions
            page.handleArticleSelected($.Event(), article);

            // Expectations
            expect(mockedNewsArticleApplication.render).toHaveBeenCalledWith(article.props);
        });
    });
});