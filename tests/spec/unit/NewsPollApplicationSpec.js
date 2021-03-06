describe('A news poll application', function () {
    var socket, mockedArticlesListing, application;

    beforeEach(function () {
        var nhViewsArticlesListing;

        loadFixtures('articles-container.html');

        socket = jasmine.createSpyObj('socket', ['on', 'emit']);
        mockedArticlesListing = jasmine.createSpyObj('nh.views.ArticlesListing', ['addArticle', 'addArticles']);

        nhViewsArticlesListing = jasmine.createSpy('nh.views.ArticlesListing').and.callFake(function () {
            return mockedArticlesListing;
        });

        jasmine.util.strippedObject(nh, ['applications.NewsPoller', 'config.NODE', 'utils.uniqueId']);

        io = {
            connect: function () {
            }
        };
        spyOn(io, 'connect').and.callFake(function () {
            return socket;
        });
        nh.React = {
            renderComponent: function () {}
        };
        nh.views = {
            ArticlesListing: nhViewsArticlesListing
        };
    });

    afterEach(function () {
        jasmine.util.restoreOriginalObject(nh);
    });

    it('can be created and return an instance of nh.applications.NewsPoller', function () {
        // Actions
        application = new nh.applications.NewsPoller();

        // Expectations
        expect(application instanceof nh.applications.NewsPoller).toBe(true);
    });

    it('will create a connection to the websocket', function () {
        // Actions
        application = new nh.applications.NewsPoller();

        // Expectations
        expect(io.connect).toHaveBeenCalledWith(nh.config.NODE.URL, {
            port: nh.config.NODE.PORT,
            transports: nh.config.NODE.TRANSPORTS
        });
    });

    it('will bind to websocket event handlers', function () {
        // Actions
        application = new nh.applications.NewsPoller();

        // Expectations
        expect(socket.on.calls.argsFor(0))
            .toEqual([nh.config.NODE.EVENTS.ARTICLE_ADDED, jasmine.any(Function)]);
        expect(socket.on.calls.argsFor(1))
            .toEqual([nh.config.NODE.EVENTS.ARTICLES_ADDED, jasmine.any(Function)]);
    });

    it('will instantiate the article list view', function () {
        // Before
        spyOn(nh.React, 'renderComponent').and.returnValue(mockedArticlesListing);

        // Actions
        application = new nh.applications.NewsPoller();

        // Expectations
        expect(nh.React.renderComponent).toHaveBeenCalledWith(mockedArticlesListing, $('#articlesContainer')[0]);
        expect(application.el).toBe(mockedArticlesListing);
    });

    describe('that has been instantiated', function () {
        beforeEach(function () {
            spyOn(nh.React, 'renderComponent').and.returnValue(mockedArticlesListing);
            application = new nh.applications.NewsPoller();
        });

        it('can extract articles from a list on the page', function () {
            var articles;

            // Actions
            articles = application.extractArticles($('#articlesContainer'));

            // Expectations
            expect(articles).toEqual([
                {
                    id: 1,
                    title: 'Naked Hearts gets started',
                    description: '<p>Quas labores eos ad. Ne eos enim quaeque philosophia, praesent scripserit '
                        + 'efficiantur sed at. Cu sea magna vivendo, ea aliquam assentior nam. Id offendit '
                        + 'instructior per. Te fugit blandit duo.</p>',
                    isNew: false
                },
                {
                    id: 2,
                    title: 'Naked hearts employs developer',
                    description: '<p>Quas labores eos ad. Ne eos enim quaeque philosophia, praesent scripserit '
                        + 'efficiantur sed at.</p><p>Cu sea magna vivendo, ea aliquam assentior nam. Id offendit '
                        + 'instructior per. Te fugit blandit duo.</p>',
                    isNew: false
                }
            ]);
        });

        it('can have an article added to its list', function () {
            var article;

            // Before
            article = {
                id: 3,
                title: 'A test title',
                decription: 'A test description'
            };

            // Actions
            application.addArticle(article);

            // Expectations
            expect(mockedArticlesListing.addArticle).toHaveBeenCalledWith(article);
        });

        it('can have a list of articles added to its list', function () {
            var articles;

            // Before
            articles = [
                {
                    id: 3,
                    title: 'A test title',
                    decription: 'A test description'
                },
                {
                    id: 4,
                    title: 'Another test title',
                    decription: 'Another test description'
                }
            ];

            // Actions
            application.addArticles(articles);

            // Expectations
            expect(mockedArticlesListing.addArticles).toHaveBeenCalledWith(articles);
        });
    });
});

describe('A news article application', function () {
    var mockedFullArticle, application;

    beforeEach(function () {
        var nhViewsArticle;

        loadFixtures('article-container.html');

        mockedFullArticle = jasmine.createSpy('nh.views.Article');

        nhViewsArticle = jasmine.createSpy('nh.views.Article').and.callFake(function () {
            return mockedFullArticle;
        });

        jasmine.util.strippedObject(nh, ['applications.NewsArticle', 'utils.uniqueId']);

        nh.React = {
            renderComponent: function () {}
        };
        nh.views = {
            Article: nhViewsArticle
        };
    });

    afterEach(function () {
        jasmine.util.restoreOriginalObject(nh);
    });

    it('can be created and return an instance of nh.applications.NewsArticle', function () {
        // Actions
        application = new nh.applications.NewsArticle();

        // Expectations
        expect(application instanceof nh.applications.NewsArticle).toBe(true);
    });

    it('will instantiate the full article view', function () {
        // Before
        spyOn(nh.React, 'renderComponent').and.returnValue(mockedFullArticle);

        // Actions
        application = new nh.applications.NewsArticle();

        // Expectations
        expect(nh.React.renderComponent).toHaveBeenCalledWith(mockedFullArticle, $('#articleContainer')[0]);
        expect(application.el).toBe(mockedFullArticle);
    });

    describe('that has been instantiated', function () {
        beforeEach(function () {
            spyOn(nh.React, 'renderComponent').and.returnValue(mockedFullArticle);
            application = new nh.applications.NewsArticle();
        });

        it('can extract articles from a list on the page', function () {
            var article;

            // Actions
            article = application.extractArticle($('#articleContainer'));

            // Expectations
            expect(article).toEqual({
                id: 1,
                title: 'Some Selected Article',
                description: '<p>Lorem ipsum dolor sit amet, abhorreant mediocritatem necessitatibus an has, '
                    + 'labores ceteros mel ei. An cum exerci doming. Ex periculis consulatu eum, ex percipit '
                    + 'vivendum erroribus mea. Id vel quidam accusata temporibus, ne zril aperiam suscipit pro. '
                    + 'In nam wisi oblique intellegat, mea no brute quaerendum, eu sea offendit copiosae. Vitae '
                    + 'graeci legendos sed in, sed id nisl probo adipisci, ne magna regione vis.</p>'
            });
        });

        it('can render an article in its view element', function () {
            var article;

            // Before
            article = {
                id: 2,
                title: 'Test title',
                description: 'Some description'
            };

            // Actions
            application.render(article);

            // Expectations
            expect(nh.React.renderComponent).toHaveBeenCalledWith(mockedFullArticle, $('#articleContainer')[0]);
            expect(application.el).toBe(mockedFullArticle);
        });
    });
});