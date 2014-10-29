'use strict';

describe('Service: Quiz', function() {

    // load the service's module
    beforeEach(module('quizzesApp'));

    // instantiate service
    var $httpBackend,
        Quiz;
    beforeEach(inject(function(_$httpBackend_, _Quiz_) {

        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/languages\/.*/).respond({});
        $httpBackend.whenGET(/views\/.*/).respond('');

        Quiz = _Quiz_;
    }));

    it('should load quizzes', inject(function() {

        $httpBackend.expectGET(/quizzes/).respond({
            quizzes: [
                {}, {}
            ]
        });

        var quizzes = Quiz.query();

        $httpBackend.flush();

        expect(quizzes.quizzes.length).toBe(2);
    }));
});
