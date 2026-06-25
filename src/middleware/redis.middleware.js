const client = require("../redis");

const checkCache = async (req, res, next) => {
    try {
        const id = req.params.id ?? -1;
        const data = await client.get(id);
        if (data) {
            console.log("El dato estaba en caché")
            return res.status(200).json(JSON.parse(data));
        }
        next();
    } catch (err) {
        next(err);
    }
};

// const checkAllCache = async (req, res, next) => {
    
// }

const deleteCache = async(req, res, next) => {
    try {
        const id = req.params.id ?? -1;
        await client.del(id);
        next();
    } catch (err) {
        next(err);
    }

}

module.exports = {checkCache, deleteCache};
