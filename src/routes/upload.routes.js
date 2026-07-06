const { Router } = require("express");
const router = Router();
const controller = require("../controllers/upload.controller");
const upload = require("../middleware/upload");

router.post("/", upload.array("imagenes", 4), controller.uploadImages);
router.delete("/:filename", controller.deleteImageFromServer);

module.exports = router;
