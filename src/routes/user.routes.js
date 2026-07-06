const { Router } = require("express");
const router = Router();
const controller = require("../controllers/user.controller");

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:nickName", controller.getByNick);
router.put("/:nickName", controller.update);
router.delete("/:nickName", controller.remove);
router.post("/:nickName/follow", controller.follow);
router.post("/:nickName/unfollow", controller.unfollow);

module.exports = router;
