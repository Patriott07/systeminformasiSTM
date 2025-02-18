export const verifyAdmin = (req, res, next) => {
    const user = req.user; // user dari headers

    // console.log({token})
    if (req.user.role != "admin") return res.json(401, { error: 'UnAuthorized Action. Youre not admin' })
    next();

};
