describe('A news poll page', function () {
    var backups = {
            eventHandler: nh.eventHandler,
            newsArticleApplication: nh.applications.NewsArticle,
            newsPollApplication: nh.applications.NewsPoll
        },
        mockedNewsArticleApplication, mockedNewsPollApplication, page;

    beforeEach(function () {
        mockedNewsArticleApplication = jasmine.util.mock(backups.newsArticleApplication);
        mockedNewsPollApplication = jasmine.util.mock(backups.newsPollApplication);

        nh.eventHandler = jasmine.util.mockObj(nh.eventHandler, {
            events: nh.eventHandler.events
        });
        nh.applications.NewsArticle = jasmine.createSpy('nh.applications.NewsArticle').and.callFake(function () {
            return mockedNewsArticleApplication;
        });
        nh.applications.NewsPoll = jasmine.createSpy('nh.applications.NewsPoll').and.callFake(function () {
            return mockedNewsPollApplication;
        });
    });

    afterEach(function () {
        nh.eventHandler = backups.eventHandler;
        nh.applications.NewsArticle = backups.newsArticleApplication;
        nh.applications.NewsPoll = backups.newsPollApplication;
    });

    it('can be created and return an instance of nh.pages.PageController', function () {
        // Actions
        page = new nh.pages.PageController();

        // Expectations
        expect(page instanceof nh.pages.PageController).toBe(true);
        expect(page.newsArticle).toBe(mockedNewsArticleApplication);
        expect(page.newsPoll).toBe(mockedNewsPollApplication);
        expect(nh.eventHandler.subscribe).toHaveBeenCalledWith(null, nh.eventHandler.events.ARTICLE_SELECTED,
            jasmine.any(Function));
    });
});