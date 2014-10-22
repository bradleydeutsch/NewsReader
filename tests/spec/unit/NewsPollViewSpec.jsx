/** @jsx nh.React.DOM */

describe('A news article list view', function () {
    var $el, view;

    beforeEach(function () {
        loadFixtures('view-dumper.html');

        jasmine.addMatchers({
            toEqualReactHTML: jasmine.customMatchers.toEqualReactHTML,
            toHaveSize: jasmine.customMatchers.toHaveSize
        });

        $el = $('#viewDumper');

        jasmine.util.strippedObject(nh, ['React', 'utils.types', 'views']);

        nh.utils.typeCompare = function () {};

        spyOn(nh.utils, 'typeCompare').and.returnValue(true);
    });

    afterEach(function () {
        jasmine.util.restoreOriginalObject(nh);
    });

    it('will render a list item into a given component', function () {
        // Actions
        view = nh.React.renderComponent(<nh.views.ArticleListing key={ 3 } id={ 3 } title='Some test title'
                description='Some test description' isNew={ false } />, $el[0]);

        // Expectations
        expect($el.html()).toEqualReactHTML(
            '<li data-article-id="3" class="">'
                + '<a href="#link-for-3">'
                    + '<h3>Some test title</h3>'
                    + '<div>Some test description</div>' +
                '</a>'
            + '</li>'
        );
        expect(view.getInitialState()).toHaveSize(1);
    });

    it('will remove the "new" class from an element after 100ms', function () {
        // Before
        jasmine.clock().install();

        // Actions
        view = nh.React.renderComponent(<nh.views.ArticleListing key={ 3 } id={ 3 } title='Some test title'
                description='Some test description' isNew={ true } />, $el[0]);

        // Expectations
        expect(view.getInitialState().isNew).toBe(true);
        expect($el.find('li').hasClass('new')).toBe(true);
        jasmine.clock().tick(101);
        expect($el.find('li').hasClass('new')).toBe(false);

        // After
        jasmine.clock().uninstall();
    });

    it('will call a custom function when it\'s link is clicked on', function () {
        // Before
        jasmineReact.spyOnClass(nh.views.ArticleListing, 'selectArticle').and.callFake(function (evt) {
            evt.preventDefault();
        });

        // Actions
        view = nh.React.renderComponent(<nh.views.ArticleListing key={ 3 } id={ 3 } title='Some test title'
                description='Some test description' isNew={ false } />, $el[0]);
        $el.find('li a')[0].click();

        // Expectations
        expect(view.getInitialState().isNew).toBe(false);
        expect(jasmineReact.classPrototype(nh.views.ArticleListing).selectArticle).toHaveBeenCalled();
    });
});

describe('A news article listing view', function () {
    var $el, generateArticles, view;

    beforeEach(function () {
        loadFixtures('view-dumper.html');

        jasmine.addMatchers({
            toEqualReactHTML: jasmine.customMatchers.toEqualReactHTML,
            toHaveSize: jasmine.customMatchers.toHaveSize
        });

        $el = $('#viewDumper');

        jasmine.util.strippedObject(nh, ['React', 'utils.types', 'views']);

        nh.utils.typeCompare = function () {};

        spyOn(nh.utils, 'typeCompare').and.returnValue(true);
    });

    afterEach(function () {
        jasmine.util.restoreOriginalObject(nh);
    });

    generateArticles = function (num, startFrom) {
        var ret = [],
            i;

        i = startFrom = startFrom || 1;
        num = i + num;

        for (i; i < num; i++) {
            ret.push({
                id: i
            })
        }

        if (ret.length === 1) {
            return ret[0];
        }
        return ret;
    };

    it('will render a list item into a given component', function () {
        var articles;

        // Before
        jasmineReact.createStubComponent(nh.views, 'ArticleListing');
        articles = generateArticles(2);

        // Actions
        view = nh.React.renderComponent(<nh.views.ArticlesListing articles={ articles } limit={ 5 } />, $el[0]);

        // Expectations
        expect($el.html()).toEqualReactHTML(
            '<ul class="articleListing">'
                + '<div></div>'
                + '<div></div>'
            + '</ul>'
        );
        expect(view.getInitialState()).toHaveSize(2);
        expect(view.getInitialState().limit).toBe(5);
        expect(view.getInitialState().articles).toBe(articles);
    });

    describe('that has been instantiated', function () {
        var view;

        beforeEach(function () {
            jasmineReact.createStubComponent(nh.views, 'ArticleListing');

            view = nh.React.renderComponent(<nh.views.ArticlesListing articles={ generateArticles(3) } limit={ 5 } />,
                    $el[0]);
        });

        it('can have an article added to it', function () {
            // Before
            expect(view.state.articles.length).toBe(3);

            // Action
            view.addArticle(generateArticles(1, 4));

            // Expectations
            expect(view.state.articles.length).toBe(4);
        });

        it('can have articles added to it', function () {
            // Before
            expect(view.state.articles.length).toBe(3);

            // Action
            view.addArticles(generateArticles(2, 4));

            // Expectations
            expect(view.state.articles.length).toBe(5);
        });

        it('will not allow more than the given limit to be added to the list', function () {
            // Before
            spyOn(view, 'trimArticles').and.callThrough();
            expect(view.state.articles.length).toBe(3);
            expect(view.state.limit).toBe(5);

            // Actions
            view.addArticle(generateArticles(1, 4));
            view.addArticle(generateArticles(3, 5));
            view.addArticle(generateArticles(1, 8));

            // Expectations
            expect(view.state.articles.length).toBe(5);
            expect(view.trimArticles).toHaveBeenCalled();
            expect(view.trimArticles.calls.count()).toBe(3);
        });

        it('will remove an article from the bottom when the article list limit is reached', function () {
            // Before
            view.setState({
                articles: generateArticles(5)
            });
            expect(view.state.articles[view.state.articles.length - 1].id).toBe(5);

            // Actions
            view.addArticle(generateArticles(1, 6));

            // Expectations
            expect(view.state.articles[view.state.articles.length - 1].id).toBe(4);
        });
    });
});

describe('A news article view', function () {
    beforeEach(function () {
        loadFixtures('view-dumper.html');

        jasmine.addMatchers({
            toEqualReactHTML: jasmine.customMatchers.toEqualReactHTML
        });

        $el = $('#viewDumper');
    });

    it('will render in given component', function () {
        // Actions
        view = nh.React.renderComponent(<nh.views.Article id={ 1 } title='Some test title'
                description='<p>Some test description</p>' />, $el[0]);

        // Expectations
        expect($el.html()).toEqualReactHTML(
                '<article data-article-id="1">'
                    + '<header>'
                        + '<h1>Some test title</h1>'
                    + '</header>'
                    + '<div class="articleContent">'
                        + '<p>Some test description</p>'
                    + '</div>'
                    + '<footer>'
                        + '<a href="#">Share This</a>'
                    + '</footer>'
                + '</article>'
        );
    });
});

