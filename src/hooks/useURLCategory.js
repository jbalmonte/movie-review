import categories from "../constant/categories"

export default function useURLCategory(name) {
    return categories[name]
}