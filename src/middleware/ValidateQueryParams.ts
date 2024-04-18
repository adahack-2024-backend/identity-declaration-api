import { Request, Response, NextFunction } from 'express';
import { BooleanString } from '../enums/BooleanString';

interface ExtendedRequest extends Request {
    parsedQuery: {
        lgbtqia?: boolean | null;
        parent?: boolean | null;
        isInternalResponse?: boolean | null;
    }
}

function parseBooleanQueryParam(param: string): boolean | null | undefined {
    if (param === BooleanString.TRUE) return true;
    if (param === BooleanString.FALSE) return false;
    if (param === BooleanString.NULL) return null;
    return undefined;    
}

export const validateQueryParamsMiddleware = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const originalLgbtqia = req.query.lgbtqia as string;
    const originalParent = req.query.parent as string;
    const originalIsInternalResponse = req.query.isInternalResponse as string;

    req.parsedQuery = {
        lgbtqia: parseBooleanQueryParam(originalLgbtqia),
        parent: parseBooleanQueryParam(originalParent),
        isInternalResponse: parseBooleanQueryParam(originalIsInternalResponse)
    };

    const errors: string[] = [];
    if (req.parsedQuery.lgbtqia === undefined && originalLgbtqia !== undefined) {
        errors.push("Invalid value for 'lgbtqia'; must be 'true', 'false', or 'null'.");
    }
    if (req.parsedQuery.parent === undefined && originalParent !== undefined) {
        errors.push("Invalid value for 'parent'; must be 'true', 'false', or 'null'.");
    }
    if (req.parsedQuery.isInternalResponse === undefined && originalIsInternalResponse !== undefined) {
        errors.push("Invalid value for 'isInternalResponse'; must be 'true', 'false', or 'null'.");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            errors
        });
    }
    next(); 
};
