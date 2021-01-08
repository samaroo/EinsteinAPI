const availablePaths = (req, res) => {
    res.json({
        availablePaths: [
            "/{serverID}",
            "/{serverID}/reactRoleMessages"
        ]
    });
};

module.exports = availablePaths;