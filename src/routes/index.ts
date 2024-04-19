import express from 'express';
import { authRoute } from './login.routes';
import { diversityExternalRoutes } from './diversityExternal.routes';
import { diversityInternalRoutes } from './diversityInternal.routes';
import { userRoutes } from './user.routes';

const router = express.Router();

router.use(
    diversityExternalRoutes,
    authRoute,
    diversityInternalRoutes,
    userRoutes    
);

export default router;
