### docmaster server

This server is a `graphQL` server that was built with `django` and `graphene`. It allows the frontend to interact with it using `graphql-file-uploads` to manipulate the documents that are send by the client with the help of `sessions` which are automatically created for each `request` and send them back to the client over a graphql request.

<p align ="center">
<img src="logo.png" alt= "alt" width= "300" />
</p>

Here is what `docmaster` do with documents.

1. Read PDF Meta Data ✅
2. Write Meta Data to PDF ✅
3. Convert Word Documents to PDF's ✅
4. Convert PDF Documents to Word ✅
5. Extract Images from PDF ✅
6. Extract Text from PDF ❌
7. Merge 2 or More PDFs ✅
8. Compressing PDFs ✅
9. Reading Watermarks from PDFs ❌
10. Adding Watermarks to PDFs ❌
11. Reading Annotations from PDFs ❌
12. Adding Annotations to PDFs ❌
13. Managing Sessions ✅

> The APIs that are marked "✅" are the one that are available for now and the one that are marked "❌" are not available and will be implemented in the future.

### API Endpoint

The GraphQL api endpoint is served at:

```shell
http://127.0.0.1:3001/graphql/

#  OR
http://localhost:3001/graphql/
```

### Example of Request using `cURL`

### uploading multiple files example

```shell
curl http://localhost:3001/graphql/  -F operations='{ "query": "mutation UploadFile($files: [Upload]!){ uploadFile(files: $files){ success } }", "variables": { "files":[ null, null ] } }' -F map='{ "0": ["variables.files.0"], "1": ["variables.files.1"] }' -F 0=@README.md -F 1=@LICENSE
```

### word to pdf

```shell
curl http://localhost:3001/graphql/  -F operations='{ "query": "mutation ConvertDocToPDF($input: ConvertWordDocToPDFInputType!){ convertDocToPDF(input: $input){ success } } ", "variables": { "input" : { "file": null, "saveName": "hello" } } }' -F map='{ "0": ["variables.input.file"] }' -F 0=@README.md
```

### pdf to word

```shell
curl http://localhost:3001/graphql/ -F operations='{"query":"mutation ConvertDocToPDF($input: ConvertWordDocToPDFInputType!){ convertDocToPDF(input: $input){ success } }","variables":{"input":{"file":null,"saveName":"hello"}}}' -F map='{ "0": ["variables.input.file"] }' -F 0=@README.md
```

### doc info

```shell
mutation ConvertPDFToDoc($input: ConvertPDFToWordDocInputType!) {convertPDFToDocx(input: $input) {success error { message field } response{ url } } }

```

### Languages

The server was build using the following language:

```shell
- python
```

### Credits

I give all the credits to [`pypdf2`](https://pypdf2.readthedocs.io/en/stable/index.html) and [`docx2pdf`](https://pypi.org/project/docx2pdf/) which exposes beautiful packages to make this project successful.
