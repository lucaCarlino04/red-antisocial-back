const { Router } = require("express");
const router = Router();
const controller = require("../controllers/tag.controller");

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
