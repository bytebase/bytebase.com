---
title: "Azure DevOps"
---

<TutorialBlock url="/docs/tutorials/gitops-azure-devops-workflow/" title="Database GitOps with Azure DevOps Pipeline" />

Visit [example](https://dev.azure.com/bytebase-hq/_git/bytebase-example) to see a complete example.

## check

```yaml
variables:
  BYTEBASE_URL: "https://demo.bytebase.com"
  BYTEBASE_SERVICE_ACCOUNT: "ci@service.bytebase.com"
  BYTEBASE_SERVICE_ACCOUNT_SECRET: "bbs_iqysPHMqhNpG4rQ5SFEJ"
  BYTEBASE_PROJECT: "projects/project-sample"
  BYTEBASE_TARGETS: "instances/test-sample-instance/databases/hr_test,instances/prod-sample-instance/databases/hr_prod"
  FILE_PATTERN: "migrations/*.sql"

trigger:
  branches:
    include:
      # Only trigger on main branch.
      # You can change this to your desired branch.
      - main
  paths:
    include:
      # Only trigger on changes to the migrations directory.
      # You can change this to your desired path.
      - migrations/*.sql

# Trigger on open pull requests.
# In Azure Repos Git, this functionality is implemented using branch policies.
# To enable PR validation, navigate to the branch policies for the desired branch, and configure the Build validation policy for that branch.
pr:
  branches:
    include:
      # Only trigger on main branch.
      # You can change this to your desired branch.
      - main
  paths:
    include:
      # Only trigger on changes to the migrations directory.
      # You can change this to your desired path.
      - migrations/*.sql

# The agent pool to use for the pipeline.
# You should specify a different agent pool for production.
pool:
  name: "Azure Pipelines" # Use your own agent pool.

container:
  image: "bytebase/bytebase-action:latest"
  env:
    BYTEBASE_URL: "$(BYTEBASE_URL)"
    BYTEBASE_SERVICE_ACCOUNT: "$(BYTEBASE_SERVICE_ACCOUNT)"
    BYTEBASE_SERVICE_ACCOUNT_SECRET: "$(BYTEBASE_SERVICE_ACCOUNT_SECRET)"
    BYTEBASE_PROJECT: "$(BYTEBASE_PROJECT)"
    BYTEBASE_TARGETS: "$(BYTEBASE_TARGETS)"
    FILE_PATTERN: "$(FILE_PATTERN)"

steps:
  - script: bytebase-action check --url "$(BYTEBASE_URL)" --service-account "$(BYTEBASE_SERVICE_ACCOUNT)" --project "$(BYTEBASE_PROJECT)" --targets "$(BYTEBASE_TARGETS)" --file-pattern "$(FILE_PATTERN)"
    displayName: "Run SQL Review"
    env:
      BYTEBASE_SERVICE_ACCOUNT_SECRET: "$(BYTEBASE_SERVICE_ACCOUNT_SECRET)"
```

## rollout

```yaml
variables:
  bytebaseUrl: "https://demo.bytebase.com"
  bytebaseServiceAccount: "ci@service.bytebase.com"
  bytebasePassword: "bbs_iqysPHMqhNpG4rQ5SFEJ" # Please use secret variable in Azure DevOps for production.
  bytebaseProject: "projects/project-sample"
  bytebaseTargets: "instances/test-sample-instance/databases/hr_test,instances/prod-sample-instance/databases/hr_prod"
  filePattern: "migrations/*.sql"

trigger:
  branches:
    include:
      # Only trigger on main branch.
      # You can change this to your desired branch.
      - main

# The agent pool to use for the pipeline.
# You should specify a different agent pool for production.
pool:
  name: "Azure Pipelines" # Use your own agent pool.

stages:
  - stage: Test
    displayName: "Test Stage"
    jobs:
      - job: Build
        steps:
          # Add your build steps here.
          - script: |
              echo "Building the application..."
            displayName: "Build application"
            name: buildAppTask
      - deployment: DeployToTest
        displayName: "Rollout Test Stage"
        environment: "test"
        dependsOn:
          - Build
        container:
          image: "bytebase/bytebase-action:latest-debian"
        strategy:
          runOnce:
            deploy:
              steps:
                - checkout: self
                - script: |
                    bytebase-action rollout --url "$BYTEBASE_URL" --service-account "$BYTEBASE_SERVICE_ACCOUNT" --service-account-secret "$BYTEBASE_SERVICE_ACCOUNT_SECRET" --project "$BYTEBASE_PROJECT" --targets "$BYTEBASE_TARGETS"  --file-pattern "$FILE_PATTERN" --target-stage "$BYTEBASE_TARGET_STAGE" --output "./bytebase-metadata.json"
                  displayName: "Rollout"
                  name: rolloutTask
                  env:
                    BYTEBASE_URL: "$(bytebaseUrl)"
                    BYTEBASE_SERVICE_ACCOUNT: "$(bytebaseServiceAccount)"
                    BYTEBASE_SERVICE_ACCOUNT_SECRET: "$(bytebasePassword)"
                    BYTEBASE_PROJECT: "$(bytebaseProject)"
                    BYTEBASE_TARGETS: "$(bytebaseTargets)"
                    BYTEBASE_TARGET_STAGE: "environments/test" # The expected target stage to rollout.
                    FILE_PATTERN: "$(filePattern)"
                - publish: "$(System.DefaultWorkingDirectory)/bytebase-metadata.json"
                  artifact: bytebase-metadata
                  displayName: "Publish bytebase metadata"
                  name: publishBytebaseMetadataTask

  - stage: Prod
    displayName: "Prod Stage"
    dependsOn: Test
    condition: succeeded('Test')
    jobs:
      - job: Build
        steps:
          # Add your build steps here.
          - script: |
              echo "Building the application..."
            displayName: "Build application"
            name: buildAppTask
      - deployment: DeployToProd
        displayName: "Rollout Prod Stage"
        environment: "prod"
        dependsOn:
          - Build
        container:
          image: "bytebase/bytebase-action:latest-debian"
        strategy:
          runOnce:
            deploy:
              steps:
                - checkout: self
                - download: current
                  artifact: 'bytebase-metadata'
                  patterns: '**/bytebase-metadata.json'
                  displayName: "Download bytebase metadata"
                  name: downloadBytebaseMetadataTask
                - script: |
                    PLAN=$(cat $(System.DefaultWorkingDirectory)/bytebase-metadata/bytebase-metadata.json | jq -r '.plan')
                    bytebase-action rollout --url "$BYTEBASE_URL" --service-account "$BYTEBASE_SERVICE_ACCOUNT" --service-account-secret "$BYTEBASE_SERVICE_ACCOUNT_SECRET" --project "$BYTEBASE_PROJECT" --target-stage "$BYTEBASE_TARGET_STAGE" --plan "$PLAN"
                  displayName: "Rollout"
                  name: rolloutTask
                  env:
                    BYTEBASE_URL: "$(bytebaseUrl)"
                    BYTEBASE_SERVICE_ACCOUNT: "$(bytebaseServiceAccount)"
                    BYTEBASE_SERVICE_ACCOUNT_SECRET: "$(bytebasePassword)"
                    BYTEBASE_PROJECT: "$(bytebaseProject)"
                    BYTEBASE_TARGET_STAGE: "environments/prod" # The expected target stage to rollout.
```
