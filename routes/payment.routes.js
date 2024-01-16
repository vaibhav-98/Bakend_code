import { Router} from 'express'
import { allPayment, buyScription, cancelSubscription, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controllers.js';
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router ();

router
      .route('/razorpay-key')
      .get(isLoggedIn,getRazorpayApiKey)
   
router
     .route('/subscribe')
     .post(isLoggedIn,buyScription)

router
    .route('/verify')
    .post(isLoggedIn,authorizedRoles('ADMIN'),verifySubscription)     

router
     .route('/unsubscribe')
     .post(isLoggedIn,cancelSubscription)
router
     .route('/')
     .get(isLoggedIn,allPayment)


export default router;  
