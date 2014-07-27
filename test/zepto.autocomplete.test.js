var expect = chai.expect;
describe("ZeptoAutocomplete", function () {
    describe("keyup event binding", function () {
        var proxySpy,bindSpy,mockSearchTextFieldSpy;
        beforeEach(function () {
            $ = sinon.stub(window, '$');
            proxySpy = sinon.spy($, 'proxy');
            bindSpy = sinon.spy();
            clickSpy = sinon.spy();
            mockSearchTextFieldSpy = {bind: bindSpy,click:clickSpy};
            $.withArgs('.autocomplete-input').returns(mockSearchTextFieldSpy);
        });

        afterEach(function () {
            $.restore();
        });

        it("should bind keyup event for localdatastore", function () {
            var autocompleteData = ['hello', 'zepto', 'autocomplete', 'testing'];
            var localOptions = {limit: 5, datasource: 'local', data: autocompleteData};

            ZeptoAutocomplete.autocomplete(localOptions);

            sinon.assert.calledOnce(proxySpy);
            expect(proxySpy.args).to.have.length(1);
            chai.assert.isFunction(proxySpy.args[0][0]);

            sinon.assert.calledOnce(bindSpy);
            var actualBindArgs = bindSpy.args;
            expect(actualBindArgs).to.have.length(1);
            expect(actualBindArgs[0]).to.have.length(2);
            expect(actualBindArgs[0][0]).to.equal('keyup');
            chai.assert.isFunction(actualBindArgs[0][1]);
        });

        it("should bind keyup event for remote datastore", function () {
            var remoteOptions = {limit: 20, datasource: 'remote', data: 'someurl.json?q='};

            ZeptoAutocomplete.autocomplete(remoteOptions);

            sinon.assert.calledOnce(proxySpy);
            expect(proxySpy.args).to.have.length(1);
            chai.assert.isFunction(proxySpy.args[0][0]);

            sinon.assert.calledOnce(bindSpy);
            var actualBindArgs = bindSpy.args;
            expect(actualBindArgs).to.have.length(1);
            expect(actualBindArgs[0]).to.have.length(2);
            expect(actualBindArgs[0][0]).to.equal('keyup');
            chai.assert.isFunction(actualBindArgs[0][1]);
        });
    });

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
