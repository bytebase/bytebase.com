---
title: Lightweight Directory Access Protocol (LDAP)
---

Lightweight Directory Access Protocol (LDAP) is a vendor-neutral software protocol used to lookup information or devices within a network. Bytebase supports using LDAP for configuring Single Sign-On (SSO).

## Configuration

Basic information:

* **Name**: the display name shown to your users (e.g. `JumpCloud`)
* **Identity Provider ID**: a human-readable unique string, only lower-case alphabets and hyphens are allowed (e.g. `jumpcloud`)
* **Domain**: the domain name to scope associated users (e.g. `jumpcloud.com`, optional)

Identity provider information:

* **Host**: the host of LDAP server (e.g. `ldap.jumpcloud.com`)
* **Port**: the port number of the LDAP server, usually 389 for StartTLS and 636 for LDAPS
* **Bind DN**: the Distinguished Name (DN) of the user to bind as a service account to perform search requests (e.g. `uid=system,ou=Users,dc=jumpcloud,dc=com`)
* **Bind Password**: the password of the user to bind as a service account
* **Base DN**: the base Distinguished Name (DN) to search for users (e.g. `ou=users,dc=jumpcloud,dc=com`)
* **User Filter**: the filter to search for users (e.g. `(uid=%s)`, where `%s` will be subsituted by the username)
* **Security protocol**: the security protocol to be used for establishing connections with the LDAP server

User information field mapping:

* **Email**: the attribute to be used as the Bytebase user email address (e.g. `mail`)
* **Display name**: the attribute to be used as the Bytebase user display name (e.g. `displayName`, optional)
* **Phone**: the attribute to be used as the Bytebase user phone number (e.g. `phone`, optional)

### JumpCloud

1. Follow the JumpCloud [Use Cloud LDAP](https://jumpcloud.com/support/use-cloud-ldap) to create an LDAP binding user and add Users to the LDAP directory.
1. In Bytebase, go to **Settings > SSO** to create a new LDAP provider (all values are examples):
   - **Name**: `JumpCloud`
   - **Identity Provider ID**: `jumpcloud`
   - **Domain**: `jumpcloud.com`
   - **Host**: `ldap.jumpcloud.com`
   - **Port**: `389`
   - **Bind DN**: `uid=REDACTED,ou=Users,o=REDACTED,dc=jumpcloud,dc=com`
   - **Bind Password**: `REDACTED`
   - **Base DN**: `ou=Users,o=REDACTED,dc=jumpcloud,dc=com`
   - **User Filter**: `(&(objectClass=posixAccount)(uid=%s))`
   - **Security protocol** `StartTLS`
   - **Email**: `mail`
   - **Display name**: `displayName`

### Okta

1. Follow the Okta [Enable the LDAP interface](https://help.okta.com/en-us/Content/Topics/Directory/LDAP-interface-enable.htm) to enable LDAP interface for your directory.
1. In Bytebase, go to **Settings > SSO** to create a new LDAP provider (all values are examples):
   - **Name**: `Okta`
   - **Identity Provider ID**: `okta`
   - **Domain**: `okta.com`
   - **Host**: `REDACTED.ldap.okta.com`
   - **Port**: `389`
   - **Bind DN**: `uid=REDACTED,ou=users,dc=REDACTED,dc=okta,dc=com`
   - **Bind Password**: `REDACTED`
   - **Base DN**: `ou=users,dc=REDACTED,dc=okta,dc=com`
   - **User Filter**: `(&(objectClass=inetOrgPerson)(uid=%s))`
   - **Security protocol** `StartTLS`
   - **Email**: `mail`
   - **Display name**: `cn`

