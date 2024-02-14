FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=root
VOLUME /var/lib/mysql
# COPY --from=mysql:8.0 /etc/mysql/my.cnf /etc/mysql/my.cnf
# COPY --from=mysql:8.0 /docker-entrypoint-initdb.d/* /docker-entrypoint-initdb.d/
# RUN rm -rf /docker-entrypoint-initdb.d/*
# COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
CMD ["mysqld"]