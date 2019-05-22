const Module_model = require('./modulesmodel');

module.exports.gets = function () {
    return Module_model.find()
};

module.exports.getById = function (paramsId) {
    return Module_model.findById(paramsId)
};

module.exports.add = function (data) {
    let Module = new Module_model({
        modulename: data.modulename,
        moduletests: data.moduletests
    });

    return Module.save()
};

module.exports.update = function (data, paramsId) {
    let updatedModule = {
        modulename: data.modulename,
        moduletests: data.moduletests
    };

    return Module_model.findByIdAndUpdate( paramsId, { $set: updatedModule }, {new: true})
};

module.exports.delete = function (paramsId) { return Module_model.findByIdAndRemove(paramsId) };