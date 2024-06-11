# Todo Generator and Benchmarking

This README provides instructions on how to use the `todo-generator.js` tool to generate random todos in any source code, as well as how to benchmark the `todo-parser.js` and `cust-todo-parser.js` scripts.

## Prerequisites

Before getting started, ensure that you have the following installed on your system:

- Node.js
- NPM (Node Package Manager)

## Installation and Generation of Random Todos

1. Clone the `source code` repository to the `benchmarking` directory:

```shell
git clone https://github.com/facebook/react
```

2. Adjust the parameters in `todo-generator.js` to set number of comments to generate per file.

3. Run the `todo-generator.js`, placing it outside the source code directory:

```shell
node todo-generator.js
```

## Benchmarking Todo Parsers

To benchmark the `todo-parser.js` and `cust-todo-parser.js` scripts, follow these steps:

1. Open the `benchmarking` directory in your preferred code editor.

2. Ensure `todo-parser.js` and `cust-todo-parser.js` are outside the source code where we generated the random ToDos  

3. Run the `todo-parser.js` script:

```shell
node todo-parser.js
```

4. The benchmarking results will be displayed, providing insights into the performance of the `todo-parser.js` script.

5. Repeat the same steps for the `cust-todo-parser.js` script:

```shell
node cust-todo-parser.js
```

6. Compare the benchmarking results to evaluate the performance of the two scripts.



## **Leasot script:** 

- Total execution time: 3.968 seconds 
- Total TODOs found: 8143

## **Custom Script:**

- Total parsing time: 2.001 seconds
- Overall execution time (including file saving): 2.032 seconds
- Total TODOs found: 9667