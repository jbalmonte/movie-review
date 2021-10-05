

function getRatingCount(n) {
    const dict = {
        m: 1e6,
        k: 1e3
    }
    for (let key in dict) {
        const value = dict[key]
        if (n >= value) return `${(n / value).toFixed(1)}${key}`
    }
    return n
}

export default function useRatingCount(ratingCount, type) {
    return type === 'func' ? getRatingCount : getRatingCount(ratingCount)
}
