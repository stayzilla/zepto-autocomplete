var expect = chai.expect;
describe("ZeptoAutocomplete", function () {
    describe("initialize options", function () {
        it("should have default values when no options passed", function () {
            $.fn.autocomplete(undefined);
            expect($.fn.limit).to.equal(2);
            expect($.fn.data).to.equal('');
        });
        it("should have default values when no datasource passed", function () {
            var noDatasourceOptions = {};
            $.fn.autocomplete(noDatasourceOptions);
            expect($.fn.limit).to.equal(2);
            expect($.fn.data).to.equal('');
        });
        it("should have default values when datasource is empty", function () {
            var noDatasourceOptions = {datasource: ''};
            $.fn.autocomplete(noDatasourceOptions);
            expect($.fn.limit).to.equal(2);
            expect($.fn.data).to.equal('');
        });
        it("should have default values when datasource is not remote or local ", function () {
            var noDatasourceOptions = {datasource: 'www'};
            $.fn.autocomplete(noDatasourceOptions);
            expect($.fn.limit).to.equal(2);
            expect($.fn.data).to.equal('');
        });
        it("should have default values when datasource is local but data is undefined", function () {
            var noDatasourceOptions = {datasource: 'local'};
            $.fn.autocomplete(noDatasourceOptions);
            expect($.fn.limit).to.equal(2);
            expect($.fn.data).to.equal('');
        });
        it("should have default values when datasource is local but data is not defined as Array", function () {
            var noDatasourceOptions = {datasource: 'local', data: 'somedata'};
            $.fn.autocomplete(noDatasourceOptions);
            expect($.fn.limit).to.equal(2);
            expect($.fn.data).to.equal('');
        });
        it("should have local datasource defined with data", function () {
            var autocompleteData = ['hello', 'zepto', 'autocomplete', 'testing'];
            var localOptions = {limit: 5, datasource: 'local', data: autocompleteData};
            $.fn.autocomplete(localOptions);
            expect($.fn.limit).to.equal(5);
            expect($.fn.data).to.equal(autocompleteData);
        });
        it("should have default values when datasource is remote but data is not defined ", function () {
            var noDatasourceOptions = {datasource: 'remote'};
            $.fn.autocomplete(noDatasourceOptions);
            expect($.fn.limit).to.equal(2);
            expect($.fn.data).to.equal('');
        });
        it("should have remote datasource defined with data", function () {
            var remoteOptions = {limit: 20, datasource: 'remote', data: 'someurl.json?q='};
            $.fn.autocomplete(remoteOptions);
            expect($.fn.limit).to.equal(20);
            expect($.fn.data).to.equal('someurl.json?q=');
        });
    });
});
