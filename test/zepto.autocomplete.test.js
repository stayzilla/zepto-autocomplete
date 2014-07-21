var expect = chai.expect;

describe("ZeptoAutocomplete", function () {
    describe("initialize options", function () {
        it("should have remote datasource defined with data", function () {
            var remoteOptions = {limit: 20, datasource: 'remote', data: 'someurl.json?q='};
            $.fn.autocomplete(remoteOptions);
            expect($.fn.limit).to.equal(20);
            expect($.fn.data).to.equal('someurl.json?q=');
        });
        it("should have local datasource defined with data", function () {
            var autocompleteData = ['hello', 'zepto', 'autocomplete', 'testing'];
            var localOptions = {limit: 5, datasource: 'local', data: autocompleteData};
            $.fn.autocomplete(localOptions);
            expect($.fn.limit).to.equal(5);
            expect($.fn.data).to.equal(autocompleteData);
        });
    });
});