Contributing
============
  
Before you contribute code, please make sure it conforms to the PSR-2 coding standard and that the unit tests still pass. The easiest way to contribute is to work on your own fork.

If you do this, you can run the following commands to check if everything is ready to submit.

<br />

In order to load the dependencies, you should run composer:

```bash
npm install
```

<br />

This package follows the [JavaScript Standard Style](hhttps://standardjs.com/) coding standard.

To test if your contribution passes the standard, you can use the command:

```bash
npm run standard-dev
```

Which should give you no output, indicating that there are no coding standard errors.

<br />

You can write your own tests and add them to the `spec` directory.

To run the test command:

```bash
npm run test:jasmine
```

Which should give you no failures or errors.

<br />

You can build a dev version with (including mapping):

```bash
npm run compile-dev
```

Or the final version with:

```bash
npm run compile
```

<br />

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
