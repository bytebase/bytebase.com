---
title: How to install Local Postgres on Mac, Ubuntu, CentOS, or Windows
---

A local Postgres database is installed and running on your own computer or server, allows developers to work offline without depending on a remote server, and also enables them to quickly iterate on changes without risking data loss or corruption.

Below is a tutorial on how to install it on Mac, Ubuntu, CentOS, and Windows.

## Install on Mac

### GUI

Check out [Top 3 Free Tools to Start a Local Database Instance on Mac](/blog/free-tools-to-start-local-database-on-mac).

### Homebrew

If you want a GUI tool,

The easiest way to install Postgres on a Mac is to use Homebrew. If you don't have Homebrew installed, you can install it by running the following command in your terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once you have Homebrew installed, you can install Postgres by running the command

```bash
brew install postgresql
```

After Postgres is installed, you can start the database server by running this command, which will start the server and make it available to your local machine.

```bash
brew services start postgresql
```

With the Postgres server running, you can create a new database by running the following command, make sure to replace "mydatabase" with the name you want to give your database.

```bash
createdb mydatabase
```

Run this command to connect to the database you just created.

```bash
psql mydatabase
```

## Install on Ubuntu (apt-get)

The following command will install the latest version of Postgres available in the Ubuntu package repository.

```bash
sudo apt-get install postgresql
```

After Postgres is installed, you can start the database server by running the following command, which will start the server and make it available to your local machine.

```bash
sudo service postgresql start
```

By default, Postgres creates a user account with the same name as your system user, but with no password. To create a user account, you can run the command and follow the prompts to create a new user account.

```bash
sudo -u postgres createuser --interactive
```

You can also set a password for the user account to connect to the Postgres console, run

```bash
sudo -u postgres psql
```

and then run (replacing "username" and "password" with the username and password you want to use)

```sql
ALTER USER username WITH PASSWORD 'password';
```

With the Postgres server running and a user account created, you can create a new database with the following (replacing "mydatabase" with the name you want to give your database, and "myuser" with the username you created in the last step)

```bash
createdb mydatabase -O myuser
```

Now connect to your new database using the psql command (again, replacing "mydatabase" with the name of your database, and "myuser" with the username you created).

```bash
psql mydatabase -U myuser
```

Once you're connected to your database, you can create tables and add data to them using SQL commands.

## Install on CentOS (yum)

Open a terminal window on your CentOS machine. You can do this by pressing Ctrl+Alt+T on your keyboard.

Update the package list and upgrade any installed packages by running the following commands:

```bash
sudo yum update
```

Install Postgres:

```bash
sudo yum install postgresql-server postgresql-contrib
```

Initialize the database:

```bash
sudo postgresql-setup initdb
```

Start the Postgres Service:

```bash
sudo systemctl start postgresql
```

And enable Postgres to start on Boot:

```bash
sudo systemctl enable postgresql
```

Create a new user:

```bash
sudo -u postgres createuser --interactive
```

Optionally, you can set a password for the new user:

```bash
sudo -u postgres psql
postgres=# \password <user_name>
```

Create a new database:

```bash
sudo -u postgres createdb <database_name>
```

## Install on Windows

1. Download the Postgres installer for Windows from the [official website](https://www.postgresql.org/download/windows/).
1. Run the downloaded installer and follow the installation wizard.
1. During the installation, you will be prompted to set a password for the default Postgres user, which is called "postgres". Make sure to remember this password, as you will need it later.
1. After the installation is complete, open the "pgAdmin" tool, which should have been installed along with Postgres.
1. In pgAdmin, click on the "Servers" node in the left-hand sidebar, and then right-click on the "Postgres" server that should appear in the main panel.
1. From the context menu, select "Connect Server".
1. In the "Connect to Server" dialog, enter the following information:
   1. Host: localhost
   2. Port: 5432
   3. Username: postgres
   4. Password: (the password you set during installation)
1. Click "OK" to connect to the Postgres server.
1. Once you are connected, you can create a new database by right-clicking on the "Databases" node in the left-hand sidebar, and selecting "Create > Database".
1. In the "Create - Database" dialog, enter a name for the new database, and click "Save".

That's it! You should now have a working Postgres database on your own machine, and you can start using it with your preferred client or by using the command line.

## More Postgres Tools

If you are trying to learn more about Postgres, or simply looking for tools to help you better work with and manage Postgres, be sure to check these out:

1. [Top Free Tools to Start a Local Database Instance on Mac](/blog/free-tools-to-start-local-database-on-mac)
1. [Top SQL AI Tools](/blog/top-sql-ai-tools/)
1. [Top Postgres Extensions](/blog/top-postgres-extension/)
1. [Top Postgres GUI Clients](/blog/top-postgres-gui-client/)
1. [Postgres vs. MySQL](/blog/postgres-vs-mysql/)
1. [Postgres vs. MongoDB](/blog/postgres-vs-mongodb/)
