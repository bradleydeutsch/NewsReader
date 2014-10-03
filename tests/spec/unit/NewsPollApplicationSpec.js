describe('A news poll application', function () {
    var backups = {
            react: React,
            articleList: nh.views.ArticleList
        },
        socket, mockedArticleList, application;

    beforeEach(function () {
        loadFixtures('articles-container.html');

        socket = jasmine.createSpyObj('socket', ['on', 'emit']);
        mockedArticleList = jasmine.createSpyObj('nh.views.ArticleList', ['addArticle', 'addArticles']);

        io = {
            connect: function () {
            }
        };
        spyOn(io, 'connect').and.callFake(function () {
            return socket;
        });
        React = {
            renderComponent: function () {
            }
        };
        nh.views.ArticleList = jasmine.createSpy('nh.views.ArticleList').and.callFake(function () {
            return mockedArticleList;
        });
    });

    afterEach(function () {
        React = backups.react;
        nh.views.ArticleList = backups.articleList;
    });

    it('can be created and return an instance of nh.applications.NewsPoll', function () {
        // Actions
        application = new nh.applications.NewsPoll();

        // Expectations
        expect(application instanceof nh.applications.NewsPoll).toBe(true);
    });

    it('will create a connection to the websocket', function () {
        // Actions
        application = new nh.applications.NewsPoll();

        // Expectations
        expect(io.connect).toHaveBeenCalledWith(nh.config.NODE.URL, {
            port: nh.config.NODE.PORT,
            transports: nh.config.NODE.TRANSPORTS
        });
    });

    it('will bind to websocket event handlers', function () {
        // Actions
        application = new nh.applications.NewsPoll();

        // Expectations
        expect(socket.on.calls.argsFor(0))
            .toEqual([nh.config.NODE.EVENTS.ARTICLE_ADDED, jasmine.any(Function)]);
        expect(socket.on.calls.argsFor(1))
            .toEqual([nh.config.NODE.EVENTS.ARTICLES_ADDED, jasmine.any(Function)]);
    });

    it('will instantiate the article list view', function () {
        // Before
        spyOn(React, 'renderComponent').and.returnValue(mockedArticleList);

        // Actions
        application = new nh.applications.NewsPoll();

        // Expectations
        expect(React.renderComponent).toHaveBeenCalledWith(mockedArticleList, $('#articlesContainer')[0]);
        expect(application.el).toBe(mockedArticleList);
    });

    describe('that has been instantiated', function () {
        beforeEach(function () {
            spyOn(React, 'renderComponent').and.returnValue(mockedArticleList);
            application = new nh.applications.NewsPoll();
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
            expect(mockedArticleList.addArticle).toHaveBeenCalledWith(article);
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
            expect(mockedArticleList.addArticles).toHaveBeenCalledWith(articles);
        });
    });
});

describe('A news article application', function () {
    var backups = {
            react: React,
            fullArticle: nh.views.FullArticle
        },
        mockedFullArticle, application;

    beforeEach(function () {
        loadFixtures('article-container.html');

        mockedFullArticle = jasmine.createSpy('nh.views.FullArticle');

        React = {
            renderComponent: function () {
            }
        };
        nh.views.FullArticle = jasmine.createSpy('nh.views.FullArticle').and.callFake(function () {
            return mockedFullArticle;
        });
    });

    afterEach(function () {
        React = backups.react;
        nh.views.FullArticle = backups.fullArticle;
    });

    it('can be created and return an instance of nh.applications.NewsArticle', function () {
        // Actions
        application = new nh.applications.NewsArticle();

        // Expectations
        expect(application instanceof nh.applications.NewsArticle).toBe(true);
    });

    it('will instantiate the full article view', function () {
        // Before
        spyOn(React, 'renderComponent').and.returnValue(mockedFullArticle);

        // Actions
        application = new nh.applications.NewsArticle();

        // Expectations
        expect(React.renderComponent).toHaveBeenCalledWith(mockedFullArticle, $('#articleContainer')[0]);
        expect(application.el).toBe(mockedFullArticle);
    });

    describe('that has been instantiated', function () {
        beforeEach(function () {
            spyOn(React, 'renderComponent').and.returnValue(mockedFullArticle);
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
            expect(React.renderComponent).toHaveBeenCalledWith(mockedFullArticle, $('#articleContainer')[0]);
            expect(application.el).toBe(mockedFullArticle);
        });
    });
});