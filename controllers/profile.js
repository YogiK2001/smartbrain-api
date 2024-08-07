const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not Found')
            }
        })
        .catch(err => res.status(404).json('error getting user'));
    if (!found) {
        res.status(404).json('Not Found');
    }
}

// export default handleProfile;
module.exports.handleProfile = handleProfile;