import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { registerCompany, getCompany, getCompanyById, updateCompany} from '../controllers/company.controller.js';

const router = express.Router();    

router.route('/register').post(isAuth, registerCompany);
router.route('/get').get(isAuth, getCompany);
router.route('/get/:id').get(isAuth, getCompanyById);
router.route('/update/:id').post(isAuth, updateCompany);

export default router;