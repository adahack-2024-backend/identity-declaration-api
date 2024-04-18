import { Request, Response, NextFunction } from 'express';
import { BooleanString } from '../enums/BooleanString';

interface CustomRequest extends Request {
    parsedQuery: {
        lgbtqia?: boolean | null | undefined;
        parent?: boolean | null| undefined;
        isInternalResponse?: boolean | null| undefined;
    };
}

function parseBooleanQueryParam(param: string): boolean | null | undefined {
    if (param === BooleanString.TRUE) return true;
    if (param === BooleanString.FALSE) return false;
    if (param === BooleanString.NULL) return null;
    return null;    
}

export const validateQueryParamsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as CustomRequest;
    customReq.parsedQuery = {};

    const originalLgbtqia = req.query.lgbtqia as string;
    const originalParent = req.query.parent as string;
    const originalIsInternalResponse = req.query.isInternalResponse as string;

    customReq.parsedQuery.lgbtqia = parseBooleanQueryParam(originalLgbtqia);
    customReq.parsedQuery.parent = parseBooleanQueryParam(originalParent);
    customReq.parsedQuery.isInternalResponse = parseBooleanQueryParam(originalIsInternalResponse);

    const errors: string[] = [];
    if (customReq.parsedQuery.lgbtqia === undefined && originalLgbtqia !== undefined) {
        errors.push("Invalid value for 'lgbtqia'; must be 'true', 'false', or 'null'.");
    }
    if (customReq.parsedQuery.parent === undefined && originalParent !== undefined) {
        errors.push("Invalid value for 'parent'; must be 'true', 'false', or 'null'.");
    }
    if (customReq.parsedQuery.isInternalResponse === undefined && originalIsInternalResponse !== undefined) {
        errors.push("Invalid value for 'isInternalResponse'; must be 'true', 'false', or 'null'.");
    }

    if (errors.length > 0) {
        res.status(400).json({
            status: 'error',
            errors
        });
    } else {
        next();
    }
};
