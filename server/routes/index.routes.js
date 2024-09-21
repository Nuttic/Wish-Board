const router = require("express").Router();
const authRouter = require("./auth.routes");
const tokenRouter = require("./token.routes");
const wishRouter = require('./wish.routes')

router.use("/auth", authRouter);
router.use("/tokens", tokenRouter);
router.use('/wishes', wishRouter)
module.exports = router;
