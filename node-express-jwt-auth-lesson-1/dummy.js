const input = prompt("Enter the String ").toLowerCase()
const countVowels = (input) => {
    let count = 0;
    const vowels = "aeiou";
    for (let i in input) {
        if (vowels.includes(i)) {
            count += 1;
        }
    }
    return count;
}

console.log(countVowels(input));