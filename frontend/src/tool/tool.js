export const FirstLetterUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ReplaceUnderscoreSpace(str) {
    if (typeof str === 'string') {
        return str.replace(/_/g, ' ');
    } else {
        return '';
    }
}
