export interface SubmissionData {
    ageGroupCode: string;
    genderCode: string;
    ethnicityCode: string;
    disabilityCode: string;
    lgbtqia: boolean;
    parent: boolean;
    isInternalResponse?: boolean;
}