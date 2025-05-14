---
title: GitLab
---

<TutorialBlock url="/docs/tutorials/gitops-gitlab-workflow/" title="Database GitOps with GitLab CI" />

Visit [bytebase-sample/gitops-example](https://gitlab.com/bytebase-sample/gitops-example) for a complete example.

## check

```yaml
sql-review:
  stage: test
  image: bytebase/bytebase-action:latest@sha256:fbf827248bb28ecb366f9484974bbe6426a6ddd5aa279105f81c8555a4062734
  variables:
    BYTEBASE_URL: "https://demo.bytebase.com"
    BYTEBASE_SERVICE_ACCOUNT: "ci@service.bytebase.com"
    BYTEBASE_SERVICE_ACCOUNT_SECRET: "bbs_iqysPHMqhNpG4rQ5SFEJ"
    BYTEBASE_PROJECT: "projects/project-sample"
    BYTEBASE_TARGETS: "instances/test-sample-instance/databases/hr_test"
    FILE_PATTERN: "migration/*.sql"
  script:
    - bytebase-action check --url "$BYTEBASE_URL" --service-account "$BYTEBASE_SERVICE_ACCOUNT" --service-account-secret "$BYTEBASE_SERVICE_ACCOUNT_SECRET" --project "$BYTEBASE_PROJECT" --targets "$BYTEBASE_TARGETS"  --file-pattern "$FILE_PATTERN" 
  artifacts:
    reports:
      codequality: bytebase_codequality.json
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - changes:
      - migration/*.sql
```

## rollout
```yaml
deploy-to-test:
  stage: deploy
  image: bytebase/bytebase-action:latest@sha256:fbf827248bb28ecb366f9484974bbe6426a6ddd5aa279105f81c8555a4062734
  environment: test
  variables:
    BYTEBASE_URL: "https://demo.bytebase.com"
    BYTEBASE_SERVICE_ACCOUNT: "ci@service.bytebase.com"
    BYTEBASE_SERVICE_ACCOUNT_SECRET: "bbs_iqysPHMqhNpG4rQ5SFEJ"
    BYTEBASE_PROJECT: "projects/project-sample"
    BYTEBASE_TARGETS: "instances/test-sample-instance/databases/hr_test,instances/prod-sample-instance/databases/hr_prod"
    BYTEBASE_TARGET_STAGE: environments/test
    FILE_PATTERN: "migration/*.sql"
  script:
    - bytebase-action rollout --url "$BYTEBASE_URL" --service-account "$BYTEBASE_SERVICE_ACCOUNT" --service-account-secret "$BYTEBASE_SERVICE_ACCOUNT_SECRET" --project "$BYTEBASE_PROJECT" --targets "$BYTEBASE_TARGETS"  --file-pattern "$FILE_PATTERN" --target-stage "$BYTEBASE_TARGET_STAGE" --output "./bytebase-metadata.json"
  artifacts:
    paths:
      - bytebase-metadata.json
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH && $CI_PIPELINE_SOURCE == "push"'
  
deploy-to-prod:
  needs: [deploy-to-test]
  stage: deploy
  image: bytebase/bytebase-action:latest@sha256:fbf827248bb28ecb366f9484974bbe6426a6ddd5aa279105f81c8555a4062734
  environment: prod
  variables:
    BYTEBASE_URL: "https://demo.bytebase.com"
    BYTEBASE_SERVICE_ACCOUNT: "ci@service.bytebase.com"
    BYTEBASE_SERVICE_ACCOUNT_SECRET: "bbs_iqysPHMqhNpG4rQ5SFEJ"
    BYTEBASE_PROJECT: "projects/project-sample"
    BYTEBASE_TARGET_STAGE: environments/prod
  script:
    - PLAN=$(jq -r '.plan' bytebase-metadata.json)
    - if [ "$PLAN" = "null" ]; then echo "no change needed. exit." && exit 0; fi
    - bytebase-action rollout --url "$BYTEBASE_URL" --service-account "$BYTEBASE_SERVICE_ACCOUNT" --service-account-secret "$BYTEBASE_SERVICE_ACCOUNT_SECRET" --project "$BYTEBASE_PROJECT" --target-stage "$BYTEBASE_TARGET_STAGE" --plan "$PLAN"
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH && $CI_PIPELINE_SOURCE == "push"'
```