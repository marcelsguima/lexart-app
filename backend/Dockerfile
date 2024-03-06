FROM postgres:latest

ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=123456
ENV POSTGRES_DB=lexDB

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
