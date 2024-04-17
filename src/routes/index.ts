import express from 'express';
import { authRoute } from './login.routes';
import { diversityExternalRoutes } from './diversityExternal.routes';
import { diversityinternalRoutes } from './diversityInternal.routes';
import { userRoutes } from './user.routes';
import { applicantDemographicsroutes } from './applicantDemographics.routes';
import { employeeDemographicsroutes } from './employeeDemographics.routes';
//import {AuthController} from '../controllers/AuthController'

const router = express.Router();

router.use(
    diversityExternalRoutes,
    authRoute,
    diversityinternalRoutes,
    userRoutes,
    employeeDemographicsroutes,
    applicantDemographicsroutes
    
);

export default router;
