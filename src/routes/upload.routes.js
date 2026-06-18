const { Router } = require("express");
const router = Router();
const controller = require("../controllers/uploadController");
const upload = require("../middleware/upload");

router.post("/", upload.single("imagen"), controller.uploadImage);
router.delete("/:filename", controller.deleteImageFromServer);

module.exports = router;
