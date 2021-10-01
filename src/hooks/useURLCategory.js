import categories from "../constant/categories"

export default function useURLCategory(name) {
    const target = categories.find(category => category.path === name)
    return { category: target.label, apiCategory: target.apiPath }
}