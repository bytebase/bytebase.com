1. In your GitHub repository `test-bb-gitops`, create a folder `bytebase`, then create an sql file `202404151600_create_table_t1.sql`.

   Paste the sql script in it.

   ```text
   CREATE TABLE t1 (
      "id" INTEGER NOT NULL
   );
   ```

1. Create a new branch for this commit and start a pull request. Click **Merge pull request** to merge the new branch into the main branch.
   ![gh-create-table](/content/docs/tutorials/database-change-management-share/gh-create-table.webp)

1. Go to Bytebase, and go into project `Sample Project`. You’ll find there is a new `Push Event` and a new issue created.
   ![bb-push-notification-only](/content/docs/tutorials/database-change-management-share/bb-push-notification-only.webp)

1. Click and go to the issue page, you’ll see

   1. The issue is created via GitHub.com, there's a link to the GitHub commit.
   1. The SQL is exactly the one we have committed to the GitHub repository.
   1. The SQL has passed the automatic task checks and rollout automatically.
   1. Since there're two databases in the project, the system will build a pipeline to run against them sequentially.

     ![bb-issue-done](/content/docs/tutorials/database-change-management-share/bb-issue-done###db###.webp)

1. Click **View change**, you can view the schema diff.
   ![bb-schema-diff](/content/docs/tutorials/database-change-management-share/bb-schema-diff###db###.webp)

###db###