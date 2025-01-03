---
title: Password Restriction
feature_name: PASSWORD
---

This document explains the **Password Restriction** on Bytebase accounts.

## Default restriction

When signing up for an account, whether you're an Enterprise Plan or Community plan user, you must follow these default restrictions:

- Minimum length for password should no less than 8 characters
- The password must contain at least one letter, regardless of upper case or lower case

Passwords must be typed in manually and cannot be pasted. You will need to repeat the password to confirm it.

If your password or confirmation violates any restriction, the corresponding bar and comment will turn red until the password is corrected.

You can toggle the visibility of your password by clicking the eye icon on the input bar. If the password is visible, the confirmation will also be visible, and vice versa.

![pwd-violate](/content/docs/administration/password/pwd-violate.webp)

The restrictions above can be seen when your mouse hovers over the `?` icon by the `Password should follow restriction setting` comment on **Password** bar. The tooltips tells whether you've violated a rule by a `!` or `tick` icon.

![pwd-restrictions](/content/docs/administration/password/pwd-restrictions.webp)

## Restriction Configuration

Enterprise Plan users can configure custom password restrictions.

Go to **Settings** -> **General** from the left side bar in Workspace. Scroll down to the **Account** section, where you can alter the minimum length or components of your password. You can also decide whether users should reset their password after the first login or after a specified number of days.

![pwd-configuration](/content/docs/administration/password/pwd-configuration.webp)
