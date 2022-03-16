# Persistr Demo

A simple example that shows how to use Persistr on the server side to create a simple web service.

This is a vanilla JavaScript example using Node.js and Express.

## About the demo

The demo shows a web service that implements a simple book library lending service. The service provides an API with these endpoints:

GET /books?status=all|available|loaned
List out what books are in the library. Optionally filter by whether books are available for loan or have been loaned already.

POST /books/gift
Gift a book to the library.

POST /books/:id/loan
Loan out a book.

POST /books/:id/return
Return a book.

POST /books/:id/retire
Retire a book.

## About the implementation

There is only one domain object with four events. There are three projections that maintain the lists of what books are available.

Domain objects:
- book

Events:
- gifted
- retired
- loaned
- returned

Projections:
- all books
- available books
- loaned books
- retired books

## Running the demo

Run `npm ci` to install dependencies:

```
npm ci
```

Then run the demo on the command-line by using `npm start`:

```
npm start
```

## Interacting with the demo

The demo runs an HTTP API on port 8080. Make calls to the endpoints described above. For simplicity, TLS/HTTPS is not used.

## License

See the [LICENSE](LICENSE) file for license rights and limitations (GPL).
