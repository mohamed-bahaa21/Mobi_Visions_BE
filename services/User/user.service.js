const addUser = (User) => ({ email, billingID, plan, endDate, otp, verified }) => {
    // if (!email || !billingID || !plan || !endDate || !otp) { throw new Error('Missing Data. Please provide values for email, billingID, plan') }
    console.log(email);
    console.log(otp);
    if (!email) { throw new Error('Missing Data. Please provide values for email number') }

    const user = new User({ email, billingID, plan, endDate, otp, verified })
    return user.save()
}

const getUsers = (User) => () => {
    return User.find({})
}

const getUserByEmail = (User) => async (email) => {
    return await User.findOne({ email: email }).populate('otp')
}

const getUserByBillingID = (User) => async (billingID) => {
    return await User.findOne({ billingID })
}

const updatePlan = (User) => (email, plan) => {
    return User.findOneAndUpdate({ email, plan })
}

module.exports = (User) => {
    return {
        addUser: addUser(User),
        getUsers: getUsers(User),
        getUserByEmail: getUserByEmail(User),
        updatePlan: updatePlan(User),
        getUserByBillingID: getUserByBillingID(User)
    }
}
