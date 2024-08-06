Level-1-3-table

<h1></h1> This folder contains the mini library for creating the table.</h1>

<p>To use this library, you must bind the "data_table.js" to your HTML document
and "data_table_style.css" for the default style of the table.
The HTML document must also contain the HTML div element with "id" attribute.
This HTML element will be a container for future table</p>

<p>You must call the function DataTable(config, users).<br>
Function takes two arguments with data to fill table: <br>
1. The "config" argument must contain an object with two keys: "parent"
   and "columns". The "parent" key value contains the container ID
   for a table. The "columns" key value contains the reference to an array
   of the objects with the number of the columns for future table and its headings<br>
2. The "data" argument must contain an array of the objects with data to fill
 the rows with the table</p>

 <p>This project contains the file test.js and index.html for testing the work of the library.
 The file index.html contains container for future table. All needed files are binded.
 The file test.js contains an example how of working with a library</p>
