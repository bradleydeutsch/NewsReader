/** @jsx React.DOM */

describe('A news poll view', function () {
    var view;

    beforeEach(function () {
        loadFixtures('view-dumper.html');

        view = $('#viewDumper');
    });

    it('will render a list item into a given component', function () {
        // Actions
        React.renderComponent(<nh.views.Article key='3' id='3' title='Some test title'
                description='Some test description' isNew={ false } />, view[0]);

        // Expectations
        expect(view.html()).toEqual(
            '<li data-article-id="3" class="" data-reactid=".0">'
                + '<a href="#link-for-3" data-reactid=".0.0">'
                    + '<h3 data-reactid=".0.0.0">Some test title</h3>'
                    + '<div data-reactid=".0.0.1">Some test description</div>' +
                '</a>'
            + '</li>'
        );
    });

    it('will remove the "new" class from an element after 100ms', function () {
        // Before
        jasmine.clock().install();

        // Actions
        React.renderComponent(<nh.views.Article key='3' id='3' title='Some test title'
                description='Some test description' isNew={ true } />, view[0]);

        // Expectations
        expect(view.find('li').hasClass('new')).toBe(true);
        jasmine.clock().tick(101);
        expect(view.find('li').hasClass('new')).toBe(false);

        // After
        jasmine.clock().uninstall();
    });

    it('will display an alert box when it\'s link is clicked on', function () {
        // Before
        jasmineReact.spyOnClass(nh.views.Article, 'youClickedOnMe').and.callFake(function (evt) {
            evt.preventDefault();
        });

        // Actions
        React.renderComponent(<nh.views.Article key='3' id='3' title='Some test title'
                description='Some test description' isNew={ true } />, view[0]);
        view.find('li a')[0].click();

        // Expectations
        expect(jasmineReact.classPrototype(nh.views.Article).youClickedOnMe).toHaveBeenCalled();
    });
});

