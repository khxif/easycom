import { Router } from 'express';
import * as DepartmentControllers from '../controllers/department-controllers';

const router = Router();

router.get('/', DepartmentControllers.getAllDepartments);
router.post('/', DepartmentControllers.createDepartment);

export default router;
