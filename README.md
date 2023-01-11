# pdf-master

📄😷 pdf-master is a tool that is used to manipulate pdf documents.

```shell
curl http://localhost:3001/graphql/  -F operations='{ "query": "mutation UploadFile($files: [Upload]!){ uploadFile(files: $files){ success } }", "variables": { "files":[ null, null ] } }' -F map='{ "0": ["variables.files.0"], "1": ["variables.files.1"] }' -F 0=@README.md -F 1=@LICENSE
```

### word to pdf

```shell
curl http://localhost:3001/graphql/  -F operations='{ "query": "mutation ConvertDocToPDF($input: ConvertWordDocToPDFInputType!){ convertDocToPDF(input: $input){ success } } ", "variables": { "input" : { "file": null, "saveName": "hello" } } }' -F map='{ "0": ["variables.input.file"] }' -F 0=@README.md
```

curl http://localhost:3001/graphql/ -F operations='{"query":"mutation ConvertDocToPDF($input: ConvertWordDocToPDFInputType!){ convertDocToPDF(input: $input){ success } }","variables":{"input":{"file":null,"saveName":"hello"}}}' -F map='{ "0": ["variables.input.file"] }' -F 0=@README.md

### doc info

```shell

```

### medge

```shell

```
