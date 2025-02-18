export const HeightConverter = (stringInches: string): string => {
    const intInches = parseInt(stringInches);
    const feet = Math.floor(intInches / 12);
    const inches = intInches % 12;
    return `${feet}"${inches}'`;
}

export const WeightConverter = (stringLbs: string): string => {
    return `${stringLbs} lbs`;
}

