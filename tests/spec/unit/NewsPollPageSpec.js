describe('A news poll page', function () {
    var mockedNewsArticleApplication, mockedNewsPollerApplication, page;

    beforeEach(function () {
        var nhEventHandler, nhApplicationsNewsArticle, nhApplicationsNewsPoller;

        mockedNewsArticleApplication = jasmine.util.mock(nh.applications.NewsArticle);
        mockedNewsPollerApplication = jasmine.util.mock(nh.applications.NewsPoller);

        nhEventHandler = jasmine.util.mockObj(nh.eventHandler, {
            events: nh.eventHandler.events
        });
        nhApplicationsNewsArticle = jasmine.createSpy('nh.applications.NewsArticle').and.callFake(function () {
            return mockedNewsArticleApplication;
        });
        nhApplicationsNewsPoller = jasmine.createSpy('nh.applications.NewsPoller').and.callFake(function () {
            return mockedNewsPollerApplication;
        });

        jasmine.util.strippedObject(nh, ['pages', 'utils.uniqueId']);

        nh.eventHandler = nhEventHandler;
        nh.applications = {
            NewsArticle: nhApplicationsNewsArticle,
            NewsPoller: nhApplicationsNewsPoller
        };
    });

    afterEach(function () {
        jasmine.util.restoreOriginalObject(nh);
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