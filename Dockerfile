# Derivando da imagem oficial do MySQL
FROM mysql:8

# Adicionando os scripts SQL para serem executados na criação do banco
COPY ./script/ /docker-entrypoint-initdb.d/
ENV MYSQL_ROOT_PASSWORD "modafeminina"
ENV MYSQL_DATABASE "Empoderada"
ENV TZ "America/Sao_Paulo"