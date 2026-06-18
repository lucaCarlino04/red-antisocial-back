const { Router } = require("express");
const router = Router();
const controller = require("../controllers/post.controller");

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.put("/:id/imagenes", controller.addImages);
router.delete("/:id/imagenes", controller.removeImages);
router.put("/:id/etiquetas", controller.addTags);
router.delete("/:id/etiquetas", controller.removeTags);

module.exports = router;
