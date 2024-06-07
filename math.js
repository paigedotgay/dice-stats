function factorial(n) {
    if (BigInt(n) <= 1n) {
       return 1n
    } else {
       return (BigInt(n) * factorial(BigInt(n) - 1n))
    }
}

/** Calculates the number of possible subsets of a collection (n) where the subsets are all a given length (k)
 *  Otherwise known as nCk or n Choose k.
 *  n can either be an actual collection (Array) or just the length of a hypothetical collection
 */
function binomailCoefficient(n, k) {
    if (Array.isArray(n)) {
        return binomailCoefficient(n.length, k)
    } else {
        return factorial(n) / (factorial(k) * factorial(n - k))
    }
}