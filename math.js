// TODO: input validation.

/** 
 * Returns the product of 1..n inclusively
 * @param {number} n 
 * @returns {number} Factorial of `n`, 1 if `n` is 0
 */
function factorial(n) {
    let result = 1; 
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

/** 
 * Calculates the number of possible subsets of a collection where the subsets are all a given length
 * Otherwise known as nCk or n Choose k.
 * 
 * @param {Array|number} n - Your collection, or length of a collection.
 * @param {number} k - length of subsets.
 * @returns {number} The count of unique subsets
 */
function binomialCoefficient(n, k) {
    return Array.isArray(n)
        ? binomialCoefficient(n.length, k)
        : factorial(n) 
            / (factorial(k) * factorial(n - k));
}

/**
 * Calculates the probability of getting exactly `r` successes in `n` trials 
 * of a binomial experiment with success probability `p`.
 *
 * @param {number} p - The probability of success on a single trial.
 * @param {number} r - The number of successes.
 * @param {number} n - The number of trials.
 * @returns {number} The probability of exactly `r` successes in `n` trials.
 */
function binomialDistribution(p, r, n) {
    return binomialCoefficient(n, r) 
        * Math.pow(p, r) 
        * Math.pow((1 - p), (n - r));
}

/**
 * Calculates the probability of rolling a certain number of winning sides
 * with a specified number of dice and sides per die. Defaults to d6.
 *
 * @param {number} diceCount - The total number of dice being rolled.
 * @param {number} [winningSides=1] - The number of winning sides on each die.
 * @param {number} [winsNeeded=1] - The number of winning rolls needed to achieve success.
 * @param {number} [sides=6] - The number of sides on each die.
 * @returns {number} The probability of achieving the required number of wins, expressed as a percentage.
 *
 * @example
 * // Chance of flipping 3 coins and getting heads on each.
 * // Remember, coins are just 2 sided dice.
 * const chance = calcChance(3, 1, 3, 2);
 * console.log(`${chance}% chance of success`);
 * // 12.5% chance of success
 */
function calcChance(diceCount, winningSides=1, winsNeeded=1, sides=6) {
    //probability of rolling any given value.
    const winProbability = winningSides / sides; 
    
    // this first line is just range(winsNeeded, dice + 1)
    return [...Array(diceCount - winsNeeded + 1).keys()].map( (i) => i + winsNeeded ) 
        .map( (r) => binomialDistribution(winProbability, r, diceCount))
        .reduce( (pv, cv,) => pv + cv, 0) 
        * 100;
}
