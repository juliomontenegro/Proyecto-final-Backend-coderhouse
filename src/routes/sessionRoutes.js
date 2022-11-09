import{Router}from'express';
import passport from 'passport';
import {upload}  from '../utils.js';
import { debugLogger } from "../utils.js";




const router=Router();


router.post('/register',upload.single('avatar'),passport.authenticate('register',{failureRedirect:'/api/sessions/registerfail'}), async (req, res) => {
  
    res.send({ status: 'success', payload: req.user._id })
});
router.get('/registerfail', async (req, res) => {
    debugLogger.info("Register failed");
    res.status(500).send({ status: 'error', error: 'Register failed' });
});

router.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginfail'}),async(req,res)=>{
    req.session.user ={
        name:req.user.name,
        email:req.user.email,
        avatar:req.user.avatar,
        id:req.user._id,
        idCart:null
    }
    debugLogger.info("Login success");
    res.send({status:"success",payload:req.user._id})
})
router.get('/loginfail',(req,res)=>{
    console.log("login failed");
    res.send({status:"error",error:"Login failed"})
})

//loguin current
router.get("/current", (req, res) => {
    res.send({ user: req.session.user });
});
//logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send({ user: null });
});




export default router;