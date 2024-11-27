import { DrugTranslationToCreate } from "./drug-translation-to-create";
/**
 * To use on Drug POST.
 * 
 * Example:
{
"atcName": "M01A",
"translations": {
        "en_US": {
            "name": "Ibuprofen",
            "indication": "Pain relief",
            "benefitsAvoid": "Reduces inflammation",
            "reasonWhyToAvoid": "Allergic reactions",
            "alternativeProposalPrescribe": "Acetaminophen",
            "atcDescription":"TEST"
        },
        "es_ES": {
            "name": "Ibuprofeno",
            "indication": "Alivio del dolor",
            "benefitsAvoid": "Reduce la inflamación",
            "reasonWhyToAvoid": "Reacciones alérgicas",
            "alternativeProposalPrescribe": "Paracetamol",
            "atcDescription":"TEST"
        }
    },
    "sanitaryAlerts": [
        "https://example.com/drowsiness_warning",
        "https://example.com/dosage_recommendation"
    ]
}
 */
export interface Drug {
    atcName: string;
    translations: DrugTranslationToCreate;
    sanitaryAlerts: string[];
}