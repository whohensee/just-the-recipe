# Making database upgrades to production

We can create database backups using `pg_dump`, which should be done before any major migration. These should not be pushed to github, as they expose the entire database.