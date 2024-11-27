/**
 * Subelement of @interface Drug
 */
export interface DrugTranslationToCreate{
    [languageCode: string]: {
        name: string;
        indication: string;
        benefitsAvoid: string;
        reasonWhyToAvoid: string;
        alternativeProposalPrescribe: string;
    }
}