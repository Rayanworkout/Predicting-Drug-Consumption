export const FirstLetterUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ReplaceUnderscoreSpace(str) {
    return str ? str.replace(/_/g, ' ') : '';
}