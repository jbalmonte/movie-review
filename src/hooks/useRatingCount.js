

function getRatingCount(n) {
    const dict = {
        m: 1e6,
        k: 1e3
    }
    for (let key in dict) {
        const value = dict[key]
        if (n >= value) {
            const result = n / value
            return `${result.toFixed((result + "").length < 3)}${key}`
        }
    }
    return n
}

export default function useRatingCount(ratingCount, type) {
    return type === 'func' ? getRatingCount : getRatingCount(ratingCount)
}
