
const dict = {
    m: 1e6,
    k: 1e3
}

export default function useRatingCount(ratingCount) {
    for (let key in dict) {
        const value = dict[key]
        if (ratingCount >= value) return `${(ratingCount / value).toFixed(1)}${key}`
    }
    return ratingCount
}
