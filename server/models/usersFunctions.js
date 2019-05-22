const userModel = require('./usersmodel');
const passport = require('passport'); // for passport authentication only

module.exports.gets = function () {
    return userModel.find()
};

module.exports.getById = function (paramsId) {
    return userModel.findById(paramsId)
};

module.exports.add = function (data) {


    let User = new userModel({
        email: data.email,
        results:[]
    });
    User.setPassword(data.password);

        console.log(User);

//пытаемся найти пользователя с таким логином
    return userModel
        .findOne({email: data.email})
        .then(u => {
            //если такой пользователь уже есть - сообщаем об этом
            if (u) {
                throw new Error('Такой пользователь уже существует!');
            }

            //если нет - добавляем пользователя в базу
            return User.save();
        })
};

module.exports.update = function (data, paramsId) {
    // const currentUser = userModel.findById(paramsId);
    // console.log(currentUser);
    // const updatedUser.results = [...currentUser.results, data];
    console.log(data);
    // let updatedUser = {
    //     results: data
    // };

    return userModel.findByIdAndUpdate( paramsId, { $set: {results: data.results,} }, {new: true})
};

module.exports.delete = function (paramsId) { return userModel.findByIdAndRemove(paramsId) };

/*module.exports.login = function (req, res, next) {
    console.log(req);
    passport.authenticate('loginUsers', (err, user) => {
        if (err) {
            return res.json({status: 'Ошибка аутентификации!'});
        }
        if (!user) {
            return res.json({status: 'Укажите правильный логин и пароль!'});
        }
        req
            .logIn(user, function (err) {
                if (err) {
                    return res.json({status: 'Ошибка входа!'});
                }
                let payload = {
                    id: user.id
                };
                let token = jwt.encode(payload, config.secret); // line 10 passport-config
                res.json({token: token});
            })

    })};*/
