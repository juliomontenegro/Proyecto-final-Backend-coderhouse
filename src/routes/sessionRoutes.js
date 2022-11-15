import{Router}from'express';
import passport from 'passport';
import {upload}  from '../utils.js';
import { sessionController } from '../controllers/sessionController.js';




const router=Router();


router.post('/register',upload.single('avatar'),passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}),sessionController.register);

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}),sessionController.login);

router.get('/loginfail',sessionController.loginFail);

//loguin current
router.get("/current", sessionController.getCurrent);

//logout
router.get("/logout", sessionController.getLogout);




export default router;