export interface Atc {
    atcCode: string,
    descriptions: {
        [languageCode: string]: string
    }
}