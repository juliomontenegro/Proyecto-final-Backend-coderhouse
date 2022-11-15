import {Router} from 'express';
import {viewController} from '../controllers/viewController.js';



const router = Router();

router.get('/',viewController.getHome);
  
  router.get('/register', viewController.getRegister);
  
  router.get('/login', viewController.getLogin);
  
  router.get('/logout', viewController.getLogout);



  export default router;