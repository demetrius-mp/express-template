# express-template

## Extras

### How to create a PostgreSQL database using a docker container.

Run the following command to pull the PostgreSQL docker image:

```bash
docker pull postgres
```

To create a container using the PostgreSQL image, run the following command:

```bash
docker run --name <container-name> -e POSTGRES_PASSWORD=<postgres-password> -d -p 5432:5432 postgres
```

1. `<container-name>` is the name you want to give the container
2. `<postgres-password` is the password you will use to connect to the database
3. `5432:5432` is the port I chose for this tutorial, you may want to use another

To start the container run:

```bash
docker start <container-name>
```

To stop the container run:

```bash
docker stop <container-name>
```

To start a bash within the container, run:

```bash
docker exec -it <container-name> bash
```

To enter into the `psql` mode, run the following command, and enter the password when prompted:

```bash
psql -p 5432 -U postgres -W
```

To exit the psql mode, or the container's bash, press `ctrl + d`.
