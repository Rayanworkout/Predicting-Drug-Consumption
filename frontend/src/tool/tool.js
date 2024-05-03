export const FirstLetterUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ReplaceUnderscoreSpace(str) {
    return str ? str.replace(/_/g, ' ') : '';
}

export const dataArray = () => ({
        consumption:[
            {
                "used in last week": 271,
                "used in last day": 149,
                "used in last month": 121,
                "used in last year": 75,
                "never used": 14,
                "used in last decade": 13
            },
            {
                "never used": 16,
                "used over a decade ago": 3,
                "used in last decade": 3,
                "used in last day": 2,
                "used in last year": 1,
                "used in last month": 1
            },
            {
                "never used": 34,
                "used in last day": 23,
                "used in last decade": 11,
                "used over a decade ago": 10,
                "used in last year": 8,
                "used in last week": 8,
                "used in last month": 5
            }
        ]
    })