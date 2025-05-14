---
title: GitHub
---

<TutorialBlock url="/docs/tutorials/gitops-github-workflow/" title="Database GitOps with GitHub Actions" />

<HintBlock type="info">

To reach your self-hosted Bytebase from GitHub Actions, you can choose either options:

1. Tunnel GitHub Actions using [Cloudflare Zero Trust](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) with [Cloudflare Warp GitHub Actions](https://github.com/marketplace/actions/setup-cloudflare-warp).

1. Use [self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners).

</HintBlock>

Visit [bytebase/example-gitops-github-flow](https://github.com/bytebase/example-gitops-github-flow) for a complete example.

## check

```yaml
name: SQL review on pull request using bytebase-action image

on:
  pull_request:
    branches:
      - main
    paths:
      - "migrations/*.sql"

jobs:
  check-release-on-prod:
    permissions:
        pull-requests: write # write permission required to allow the action writes the check results to the comment.
    runs-on: ubuntu-latest # use self-hosted machines if your Bytebase runs in internal networks.
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Check release
        uses: docker://bytebase/bytebase-action:latest
        env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # set GITHUB_TOKEN because the 'Check release' step needs it to comment the pull request with check results.
            BYTEBASE_URL: https://demo.bytebase.com
            BYTEBASE_SERVICE_ACCOUNT: ci@service.bytebase.com
            BYTEBASE_SERVICE_ACCOUNT_SECRET: ${{secrets.BYTEBASE_SERVICE_ACCOUNT_SECRET}}
            BYTEBASE_PROJECT: "projects/project-sample"
            BYTEBASE_TARGETS: "instances/prod-sample-instance/databases/hr_prod"
            FILE_PATTERN: "migrations/*.sql"
        with:
          entrypoint: bytebase-action
          args: check --url ${{ env.BYTEBASE_URL }} --service-account ${{ env.BYTEBASE_SERVICE_ACCOUNT }} --project ${{ env.BYTEBASE_PROJECT }} --targets ${{ env.BYTEBASE_TARGETS }} --file-pattern ${{ env.FILE_PATTERN }}
```

## rollout

```yaml
name: Rollout using bytebase-action image

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build app and upload
        run: |
          echo "Building..."
          echo "Build done!"
          echo "Uploading..."
          echo "Upload done!"
  deploy-to-test:
    needs: build
    runs-on: ubuntu-latest # use self-hosted machines if your Bytebase runs in internal networks.
    environment: test
    container:
      image: docker://bytebase/bytebase-action:latest
    outputs:
      bytebase-plan: ${{ steps.set-output.outputs.plan }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: rollout
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BYTEBASE_URL: https://demo.bytebase.com
          BYTEBASE_SERVICE_ACCOUNT: ci@service.bytebase.com
          BYTEBASE_SERVICE_ACCOUNT_SECRET: ${{secrets.BYTEBASE_SERVICE_ACCOUNT_SECRET}}
          BYTEBASE_PROJECT: "projects/project-sample"
          BYTEBASE_TARGETS: "instances/test-sample-instance/databases/hr_test,instances/prod-sample-instance/databases/hr_prod"
          BYTEBASE_TARGET_STAGE: environments/test
          FILE_PATTERN: "migrations/*.sql"
          BYTEBASE_OUTPUT: ${{ runner.temp }}/bytebase-metadata.json
        run: |
          bytebase-action rollout --url=${{ env.BYTEBASE_URL }} --service-account=${{ env.BYTEBASE_SERVICE_ACCOUNT }} --service-account-secret=${{ env.BYTEBASE_SERVICE_ACCOUNT_SECRET }} --project=${{ env.BYTEBASE_PROJECT }} --file-pattern=${{ env.FILE_PATTERN }} --targets=${{ env.BYTEBASE_TARGETS }} --target-stage=${{ env.BYTEBASE_TARGET_STAGE }} --output=${{ env.BYTEBASE_OUTPUT }}
      - name: Set output
        id: set-output
        run: |
          PLAN=$(jq -r .plan ${{ runner.temp }}/bytebase-metadata.json)
          echo "plan=$PLAN" >> $GITHUB_OUTPUT
      - name: Deploy app
        run: |
          echo "Deploying app to test environment..."
          echo "Deploy app to test environment done!"
  deploy-to-prod:
    needs: deploy-to-test
    runs-on: ubuntu-latest
    environment: prod
    container:
      image: docker://bytebase/bytebase-action:latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: rollout
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BYTEBASE_URL: https://demo.bytebase.com
          BYTEBASE_SERVICE_ACCOUNT: ci@service.bytebase.com
          BYTEBASE_SERVICE_ACCOUNT_SECRET: ${{secrets.BYTEBASE_SERVICE_ACCOUNT_SECRET}}
          BYTEBASE_PROJECT: "projects/project-sample"
          BYTEBASE_TARGET_STAGE: environments/prod
        run: |
          bytebase-action rollout --url=${{ env.BYTEBASE_URL }} --service-account=${{ env.BYTEBASE_SERVICE_ACCOUNT }} --service-account-secret=${{ env.BYTEBASE_SERVICE_ACCOUNT_SECRET }} --project=${{ env.BYTEBASE_PROJECT }} --target-stage=${{ env.BYTEBASE_TARGET_STAGE }}  --plan=${{ needs.deploy-to-test.outputs.bytebase-plan }}
      - name: Deploy app
        run: |
          echo "Deploying app to prod environment..."
          echo "Deploy app to prod environment done!"
```