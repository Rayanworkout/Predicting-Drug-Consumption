export const FirstLetterUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const ReplaceUnderscoreSpace = (string) => {
    return string.replace("_", " ")
}