# Contributing
  
Before you contribute code, please make sure it conforms to the PSR-2 coding standard and that the unit tests still pass. The easiest way to contribute is to work on your own fork.

If you do this, you can run the following commands to check if everything is ready to submit.


In order to load the dependencies, you should run composer:

```bash
npm install
```


This package follows the [JavaScript Standard Style](hhttps://standardjs.com/) coding standard.

To test if your contribution passes the standard, you can use the command:

```bash
./node_modules/standard/bin/cmd.js --verbose | ./node_modules/snazzy/bin/cmd.js
```

Which should give you no output, indicating that there are no coding standard errors.



You can write your own tests and add them to the `spec` directory.

To run the test command:

```bash
./node_modules/jasmine/bin/jasmine.js
```

Which should give you no failures or errors.


[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
