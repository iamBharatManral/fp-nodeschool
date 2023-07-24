const addNumbers = args =>
    args.reduce(
        (acc, val) => parseInt(acc) + parseInt(val), 0
    )

console.log(addNumbers(process.argv.slice(2)))
