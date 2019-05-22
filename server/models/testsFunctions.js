const Test_model = require('./testsmodel');

module.exports.gets = function () {
    return Test_model.find()
};

module.exports.getById = function (paramsId) {
    return Test_model.findById(paramsId)
};

module.exports.add = function (data) {
    let Test = new Test_model({
        testname: data.testname,
        questions: data.questions,
        moduleId: data.moduleId
    });

    return Test.save()
};

module.exports.update = function (data, paramsId) {
    let updatedTest = {
        testname: data.testname,
        questions: data.questions
    };

    return Test_model.findByIdAndUpdate( paramsId, { $set: updatedTest }, {new: true})
};

module.exports.delete = function (paramsId) { return Test_model.findByIdAndRemove(paramsId) };
