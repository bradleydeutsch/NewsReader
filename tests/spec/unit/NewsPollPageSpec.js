describe('A news poll page', function () {
    var backups = {
            newsPollApplication: nh.applications.NewsPoll
        },
        mockedNewsPollApplication, page;

    beforeEach(function () {
        mockedNewsPollApplication = jasmine.util.mock(backups.newsPollApplication);

        nh.applications.NewsPoll = jasmine.createSpy('nh.applications.NewsPoll').and.callFake(function () {
            return mockedNewsPollApplication;
        });
    });

    afterEach(function () {
        nh.applications.NewsPoll = backups.newsPollApplication;
    });

    it('can be created and return an instance of nh.applications.NewsPoll', function () {
        // Actions
        page = new nh.pages.PageController();

        // Expectations
        expect(page instanceof nh.pages.PageController).toBe(true);
        expect(page.newsPoll).toBe(mockedNewsPollApplication);
    });
});