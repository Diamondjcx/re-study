export const flatten = (arr) => {
    if(!arr.length) return;
    return arr.reduce(
        (total, item) => 
            Array.isArray(item) ? [...total, ...flatten(item)]: [...total, item],
        []
    )
} 