import {Router} from 'express';
import {viewController} from '../controllers/viewController.js';



const router = Router();

router.get('/',viewController.getHome);
  
router.get('/register', viewController.getRegister);
  
router.get('/login', viewController.getLogin);

router.get('/admin', viewController.getAdmin);

router.get('/orders', viewController.getAllOrders);






  export default router;