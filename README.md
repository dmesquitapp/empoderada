# Empoderada Moda Feminina

## Setup
- A porta padrão é a 3000 podendo ser alterada através da variável de ambiente ```PORT```
- O banco de dados utilizado é o MySQL e pode ser configurado através do arquivo docker: ```Dockerfile```
### Instalar dependências
```sh 
npm install
```

### Build Database
```sh 
docker build -t empoderada-database:latest .
```

### Run Database
```sh 
docker run --name empoderada_db -p 3306:3306 -d empoderada-database:latest 
```

### Minify arquivos javascript
```sh 
npm run build
```

### Executar aplicação em desenvolvimento
```sh 
npm run serve
```
