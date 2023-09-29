// function that generates random user order so that the user list is different every day

const User = require("../models/user");

const randomizeUserDb = async () => {
    const users = await User.find({ state: true, role: "USER_ROLE" });
    const randomUsers = users.sort(() => Math.random() - 0.5);
    const promises = [];
    randomUsers.forEach((user, index) => {
        user.order = index + 1;
        promises.push(user.save());
    });

    await Promise.all(promises);

    return randomUsers; 
}


module.exports = {
    randomizeUserDb
};