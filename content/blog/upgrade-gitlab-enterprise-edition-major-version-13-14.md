---
title: How to Upgrade GitLab from 13 to 14
author: Tianzhou
updated_at: 2021/12/15 08:29:42
feature_image: /content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-13-to-14.webp
tags: How-To
integrations: GitLab
description: GitLab upgrade from 13 to 14
---

> Conducting a major version upgrade of a self-managed software is always like a shitshow.

_(Though we are conducting a GitLab EE upgrade from version 13 to 14, the following steps should apply to GitLab CE / other major version upgrade as well)_

You can jump to **the Major Upgrade** section if you just want to learn the upgrade steps. Here is what we did:

1. Read the gitlab upgrade guide
2. Backup data
3. Upgrade (1st try)
4. Rollback
5. Upgrade (2nd try)

**_We made the mistake of not reading the GitLab upgrade guide carefully, thus having the extra step 4 and 5. Please don't repeat our mistake_**

## Background

[Bytebase](https://bytebase.com) is an open source database schema change and version control tool for teams. We have native [VCS integration](/docs/vcs-integration/overview) with GitLab CE/EE from day 1.
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/frontpage.webp)
User can visit our live [demo site](/view-live-demo) from the landing page. And we did curate the demo data to let our potential customers better understand our VCS integration feature.
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/issue-detail-vcs.webp)
If visitor clicks the commit hash, she will be navigated to that GitLab commit triggering the Bytebase pipeline.
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/vcs.webp)

## The Problem

Besides complementing our demo, our GitLab instance is also used by our team members to work on GitLab integration features. And last week, we received an [issue report](https://github.com/bytebase/bytebase/issues/108#issuecomment-987166197) telling our VCS integration is broken, and it turns out it's related to the default OAuth token expiration change introduced in [GitLab 14.3](https://about.gitlab.com/releases/2021/09/22/gitlab-14-3-released/#oauth-access-tokens-issued-with-expiration-by-default)
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/oauth.webp)
This is a sane change from GitLab. However, when Bytebase developed this feature, the latest major version was GitLab 13. That version has no expiration time set on the access token, and our implementation didn't properly handle the case when the access token expires. In order to facilitate testing this GitLab new feature, we decide to upgrade our managed GitLab instance to the new version.

## The Major Upgrade

Overall steps

1. **Carefully** read [GitLab upgrade guide](https://docs.gitlab.com/ee/update/) (read the fxxking manual)
2. **Backup your data**! If you mess up the upgrade (and we did), you can still restore to the originally state and restart again.
3. Follow the upgrade guide to conduct the upgrade.

### Step 1 - Read the Upgrade Guide

GitLab's upgrade guide is pretty well written, e.g. it clearly lists the [upgrade path](https://docs.gitlab.com/ee/update/#upgrade-paths)
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-upgrade-path.webp)
On the other hand, GitLab itself is already a monster and conducting a major upgrade is still a daunting task. For our particular case, we are upgrading from 13.12.2 to the latest version (14.5.2 at the time).

### Step 2 - Backup Data

Our GitLab instance runs on AWS EC2 using EBS as the storage. So we stopped the instance, took a snapshot, waited for the snapshot completion and started the instance again.
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/aws-backup.webp)The created snapshot

### Step 3 - The Upgrade (1st try)

GitLab has clearly described the general required major version [upgrade steps](https://docs.gitlab.com/ee/update/#upgrading-to-a-new-major-version):
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/upgrade-major-version.webp)
We are already on 13.12.2 which is the latest minor version of the preceding major version, so we can skip the 1st step. So our identified upgrade path is:

> **13.12.2 -> 14.0.z (latest first minor version of 14) -> 14 latest**

**Part 1 - 13.12.2 -> 14.0.z**

Visit [GitLab docker hub](https://hub.docker.com/r/gitlab/gitlab-ee/tags?page=1&name=14.0) to find its latest 14.0.z version which is 14.0.12
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-14-docker-image.webp)
**Pull the 14.0.12 ee image**

`docker pull gitlab/gitlab-ee:14.0.12-ee.0`

**Stop the existing container and start the 14.0.12 version**

`docker stop gitlab`

`docker rm gitlab`

`sudo docker run --detach --hostname gitlab.bytebase.com --publish 8080:80 --publish 22:22 --name gitlab --restart always --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 --volume /srv/gitlab/config:/etc/gitlab --volume /srv/gitlab/logs:/var/log/gitlab --volume /srv/gitlab/data:/var/opt/gitlab gitlab/gitlab-ee:14.0.12-ee.0`

**Verify the running version**
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-version.webp)
**Part 2 - 14.0.z  -> 14 latest**

> **We were too hurry to proceed to part 2 and made the mistake**

**Pull the latest image**

`docker pull gitlab/gitlab-ee:latest`

**Stop the existing container and start the latest version**

`docker stop gitlab`

`docker rm gitlab`

`sudo docker run --detach --hostname gitlab.bytebase.com --publish 8080:80 --publish 22:22 --name gitlab --restart always --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 --volume /srv/gitlab/config:/etc/gitlab --volume /srv/gitlab/logs:/var/log/gitlab --volume /srv/gitlab/data:/var/opt/gitlab gitlab/gitlab-ee:latest`

**PANIC, GitLab failed to start and kept crash looping 😫**

Use `docker logs -f gitlab` to view the log and quickly realize we missed one critical steps already mentioned in the upgrade guide.
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-14-upgrade-attention.webp)![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-background-migration.webp)
And it's also mentioned in the major upgrade overview.
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/upgrade-major-version.webp)
And we still managed to miss those 😮‍💨

## Step 4 - The Rollback

Guess we are probably not alone and GitLab does provide a dedicated [troubleshooting guide](https://docs.gitlab.com/ee/user/admin_area/monitoring/background_migrations.html#troubleshooting)
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-upgrade-troubleshoot.webp)![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-upgrade-rollback.webp)

> **Fortunately, we took a snapshot in Step 1, so it's easier to just restore that snapshot.**

Follow the [Amazon EBS restoring guide](https://docs.aws.amazon.com/prescriptive-guidance/latest/backup-recovery/restore.html)
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/aws-restore-ebs.webp)
Verified that the restore works and we are going to take 2nd try.

## Step 5 - The Upgrade (2nd try)

The steps are almost the same as our 1st try, except that we need to pause after upgrading to14.0.z, **we need to wait until all background migrations complete.**
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-wait-background-migration.webp)
Only after that, we proceed to upgrade from 14.0.z to the latest version. This time everything works smoothly.
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-version2.webp)
And all these effort is just for getting this little checkbox. What a journey!
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/gitlab-oauth-token-expire.webp)
BTW, our [monitoring](https://status.bytebase.com/) does respond promptly (provided by [betteruptime.com](https://betteruptime.com/)) along the path, you can see we have experienced 5 downtimes 😵
![_](/content/blog/upgrade-gitlab-enterprise-edition-major-version-13-14/monitoring-downtime.webp)

## The takeaway

### For GitLab

1. GitLab is actually doing a pretty good job documenting the upgrade process. I would say for such a complex product single-handedly supporting $10 billion dollar market cap, I am pretty amazed. On the other hand, I would hope they could stress asking user to do a backup.
2. Offering a UI-based upgrade wizard would still be desired though 😋.
3. GitLab's [release notes](https://about.gitlab.com/releases/2021/09/22/gitlab-14-3-released/#oauth-access-tokens-issued-with-expiration-by-default) is very well written 👍.

### For folks doing the GitLab major upgrade or any other software major upgrade

1. Always creating a backup beforehand.
2. Read the fxxking manual (RTFM) and follow the manual **carefully, step by step** when conducting the upgrade.

### For Bytebase

Like our GitLab upgrade story shows, software (especially on-premises self-managed deployment) upgrade is hard. That's mainly because of the database schema/state migration and this is also what [Bytebase](https://bytebase.com) is trying to tackle. It's good for our team to feel the pain and understand the challenge to provide a smooth upgrading experience and safe rollback plan.

Let's turn the shitshow 💩 into a carnival 🎡
