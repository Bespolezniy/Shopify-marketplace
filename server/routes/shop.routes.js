import express from "express"

import authCtrl from "../controllers/auth.controller"
import userCtrl from "../controllers/user.controller"
import shopCtrl from "../controllers/shop.controller"

const router = express.Router()

router.param("userId", userCtrl.userByID)
router.param("shopId", shopCtrl.shopByID)

router.route("/api/shops/by/:userId")
  .post(
    authCtrl.requireSignin, 
    authCtrl.hasAuthorization,
    userCtrl.isSeller, 
    shopCtrl.create
)

router.route("/api/shops")
  .get(shopCtrl.list)

router.route("/api/shops/by/:userId")
  .get(
    authCtrl.requireSignin, 
    authCtrl.hasAuthorization, 
    shopCtrl.listByOwner
  )

router.route("/api/shop/:shopId")
  .get(shopCtrl.read)

router.route("/api/shops/:shopId")
  .put(
    authCtrl.requireSignin, 
    shopCtrl.isOwner, 
    shopCtrl.update
  )

router.route("/api/shops/:shopId")
  .delete(
    authCtrl.requireSignin, 
    shopCtrl.isOwner, 
    shopCtrl.remove
  )

export default router