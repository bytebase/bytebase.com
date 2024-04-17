1. Go to Bytebase homepage, and click **Integration > GitOps** on the left sidebar. Choose `GitHub.com` as **Git provider**. What we need is a github **personal access token**.
   ![bb-gitops-no-access-token](/content/docs/tutorials/database-change-management-share/bb-gitops-no-access-token.webp)

1. Go to your GitHub account. Click your avatar and then click **Settings** on the menu. Click **Developer settings** on the left sidebar, and then click **Personal access tokens > Fine-grained tokens**.
   ![gh-fine-grained-tokens](/content/docs/tutorials/database-change-management-share/gh-fine-grained-tokens.webp)

1. Click **Generate new token**, fill in the fields and check the scopes according to the description on Bytebase. Click **Generate token**.

1. Copy the token and paste it back into Bytebase **Integration > GitOps**. Click **Confirm and add**.
   ![bb-gitops-access-token](/content/docs/tutorials/database-change-management-share/bb-gitops-access-token.webp)