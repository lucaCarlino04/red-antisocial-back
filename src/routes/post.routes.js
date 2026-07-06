const { Router } = require("express");
const router = Router();
const controller = require("../controllers/post.controller");
const upload = require("../middleware/upload");
const {checkCache, deleteCache} = require("../middleware/redis.middleware")

router.post("/", upload.array("images"), controller.create);
router.get("/", controller.list);
router.get("/:id", checkCache, controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", deleteCache, controller.remove);
router.put("/:id/images", upload.array("images"), controller.addImages);
router.delete("/:id/images", controller.removeImages);
router.put("/:id/tags", controller.addTags);
router.delete("/:id/tags", controller.removeTags);

module.exports = router;
