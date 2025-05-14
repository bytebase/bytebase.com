---
title: Bitbucket
---

Visit [example](https://bitbucket.org/p0nyyy/cicd/src/main/) for a complete example.

## check

```yaml
pipelines:
  pull-requests:
    "**":
      - step:
          name: Bytebase SQL Review
          image: bytebase/bytebase-action:3.6.2
          script:
            - export BYTEBASE_URL="https://demo.bytebase.com"
            - export BYTEBASE_SERVICE_ACCOUNT="ci@service.bytebase.com"
            - export BYTEBASE_SERVICE_ACCOUNT_SECRET="bbs_iqysPHMqhNpG4rQ5SFEJ"
            - export BYTEBASE_PROJECT="projects/project-sample"
            - export BYTEBASE_TARGETS="instances/test-sample-instance/databases/hr_test"
            - export FILE_PATTERN="migration/*.sql"
            - bytebase-action check --url "$BYTEBASE_URL" --service-account "$BYTEBASE_SERVICE_ACCOUNT" --project "$BYTEBASE_PROJECT" --targets "$BYTEBASE_TARGETS" --file-pattern "$FILE_PATTERN"
```

## rollout

```yaml
pipelines:
  branches:
    main:
      - stage:
          name: deploy to test
          deployment: test
          steps:
            - step:
                image: bytebase/bytebase-action:3.6.2
                script:
                  - export BYTEBASE_URL="https://demo.bytebase.com"
                  - export BYTEBASE_SERVICE_ACCOUNT="ci@service.bytebase.com"
                  - export BYTEBASE_SERVICE_ACCOUNT_SECRET="bbs_iqysPHMqhNpG4rQ5SFEJ"
                  - export BYTEBASE_PROJECT="projects/project-sample"
                  - export BYTEBASE_TARGETS="instances/test-sample-instance/databases/hr_test,instances/prod-sample-instance/databases/hr_prod"
                  - export FILE_PATTERN="migration/*.sql"
                  - export BYTEBASE_TARGET_STAGE="environments/test"
                  - bytebase-action rollout --url "$BYTEBASE_URL" --service-account "$BYTEBASE_SERVICE_ACCOUNT" --service-account-secret "$BYTEBASE_SERVICE_ACCOUNT_SECRET" --project "$BYTEBASE_PROJECT" --targets "$BYTEBASE_TARGETS"  --file-pattern "$FILE_PATTERN" --target-stage "$BYTEBASE_TARGET_STAGE" --output "./bytebase-metadata.json"
                artifacts:
                  - bytebase-metadata.json
      - stage:
          name: deploy to prod
          deployment: prod
          trigger: manual
          steps:
            - step:
                image: bytebase/bytebase-action:3.6.2
                script:
                  - export BYTEBASE_URL="https://demo.bytebase.com"
                  - export BYTEBASE_SERVICE_ACCOUNT="ci@service.bytebase.com"
                  - export BYTEBASE_SERVICE_ACCOUNT_SECRET="bbs_iqysPHMqhNpG4rQ5SFEJ"
                  - export BYTEBASE_PROJECT="projects/project-sample"
                  - export BYTEBASE_TARGET_STAGE="environments/prod"
                  - PLAN=$(jq -r '.plan' bytebase-metadata.json)
                  - if [ "$PLAN" = "null" ]; then echo "no change needed. exit." && exit 0; fi
                  - bytebase-action rollout --url "$BYTEBASE_URL" --service-account "$BYTEBASE_SERVICE_ACCOUNT" --service-account-secret "$BYTEBASE_SERVICE_ACCOUNT_SECRET" --project "$BYTEBASE_PROJECT" --target-stage "$BYTEBASE_TARGET_STAGE" --plan "$PLAN"
```
