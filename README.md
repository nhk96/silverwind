# Silverwind Digital Assignment 1 & 2

For assignment 1, the code is written in ReactJS, to run, please install relevant packages by running the command below:

```
npm install
```

After everything is installed, please run:

```
npm run start
```

Then you're good to go.

I started the task on 29 April 2023, 6AM and the code finished around 7:30AM for both Assignment 1 and Assignment 2.

For assignment 2, the code is as follow:

```
  function getNextCheeryYear(year) {
    if (year < 0 || typeof year !== "number") {
      return console.log("Not a valid year");
    }
    //convert year to string
    year = year.toString();
    //split the year into an array of digits
    let digits = year.split("");
    // if digits contain 2 of the same number, then the year is not cheery
    if (
      digits[0] === digits[1] ||
      digits[0] === digits[2] ||
      digits[0] === digits[3] ||
      digits[1] === digits[2] ||
      digits[1] === digits[3] ||
      digits[2] === digits[3]
    ) {
      return console.log(year + " is not a Cheery year");
    } else {
      return console.log(year + " is a Cheery year");
    }
  }
```
