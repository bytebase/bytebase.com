import getMetadata from '@/utils/get-metadata';

import Image from 'next/image';
import Link from '@/components/shared/link';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.SECURITY);

export default function Page() {
  return (
    <>
      <h1 className="font-title text-90 font-semibold leading-none lg:text-68 md:text-56 sm:text-40">
        Bytebase Security Details
      </h1>
      <h2 id="general">General practices</h2>
      <ul>
        <li>Access to all internal systems is protected by multi-factor authentication.</li>
        <li>
          Access is restricted to those who require it to perform their job, and is regularly
          reviewed and revoked upon termination or when no longer needed.
        </li>
        <li>
          The entire codebase is open-sourced on{' '}
          <Link href="https://github.com/bytebase/bytebase">GitHub</Link>. Code reviews are
          mandatory for all code changes.
        </li>
        <li>The software components are monitored for CVEs.</li>
        <li>3rd party conducts penetration tests annually.</li>
        <li>We don&apos;t copy production data to external devices such as personal laptops.</li>
      </ul>
      <h2 id="architecture">Bytebase overall architecture</h2>
      <ul>
        <li>Backend is written in Go.</li>
        <li>Frontend is written in TypeScript and Vue3.</li>
        <li>Metadata is stored in PostgreSQL.</li>
        <li>
          The Bytebase release is a single Go binary that uses Go embedding to embed the frontend
          assets as well as the PostgreSQL binary. In another word, one can start Bytebase simply by{' '}
          <strong>
            <i>./bytebase</i>
          </strong>
          .
        </li>
        <li>
          One can store the metadata in an external PostgreSQL instance instead of the embedded one.
        </li>
      </ul>
      <h2 id="cloud">Bytebase Cloud</h2>
      <Image
        src="/images/arch-cloud.webp"
        width={1417}
        height={875}
        alt="Bytebase Cloud architecture"
      />
      <ul>
        <li>
          All infrastructure is hosted on Google Cloud Platform us-central region and managed
          through Terraform.
        </li>
        <li>
          Each customer Bytebase workspace is running inside a separate container managed by Google
          Container Engine (GKE).
        </li>
        <li>
          The metadata is stored in a shared pool of Google Cloud SQL PostgreSQL instances. Storing
          metadata in a dedicated PostgreSQL instance is available in our Enterprise plan upon
          request.
        </li>
        <li>
          User authentication with the <Link href="https://hub.bytebase.com">Bytebase Hub</Link> is
          via <Link href="https://auth0.com">Auth0</Link>.
        </li>
        <li>
          Anonymous usage metrics are collected and sent to Segment. Collection can be disabled upon
          request in our Enterprise plan.
        </li>
        <li>
          The customer Bytebase workspace will be deactivated automatically if there is no traffic in
          48 hours. The data will be purged in 60 days after deactivation.
        </li>
      </ul>
      <h2 id="self-host">Bytebase self-hosted</h2>
      <Image
        src="/images/arch-self-hosted.webp"
        width={1030}
        height={360}
        alt="Bytebase self-hosted architecture"
      />
      <ul>
        <li>
          The architecture is similar to Bytebase Cloud. You can run Bytebase inside docker or on
          bare-metal.
        </li>
        <li>
          Anonymous usage metrics are collected and sent to Segment. Collection can be disabled in the workspace setting.
        </li>
      </ul>
      <h2>Shared practices between Bytebase Cloud and self-hosted</h2>
      <ul>
        <li>
          The registered email and name of the first member is sent to Bytebase. We use this to
          contact regarding sales opportunity, security updates, policy updates, and product
          updates.
        </li>
        <li>
          User/password authentication is enabled by default.{' '}
          <Link href="/docs/administration/sso/overview/">SSO </Link>with the Bytebase workspace is
          configurable via OAuth, OIDC, or LDAP. <Link href="/docs/administration/2fa/">2FA</Link>{' '}
          and <Link href="/docs/administration/sign-in-restriction/">Sign-in restriction</Link> can
          be further enforced in the Enterprise plan.
        </li>
      </ul>
      <h2 id="faq">FAQ</h2>
      <h3>Which certification does Bytebase have?</h3>
      <p> SOC 2 Type II.</p>
      <h3>Which data does Bytebase store?</h3>
      Bytebase stores the following data:
      <ul>
        <li>Database connection info.</li>
        <li>Database schema.</li>
        <li>
          Slow query statistics if <Link href="/docs/slow-query/overview/">slow query report</Link>{' '}
          is enabled.
        </li>
      </ul>
      <h3>How do I report a potential vulnerability or security concern?</h3>
      <p>
        Please contact us by e-mail at{' '}
        <Link href="mailto:support@bytebase.com">support@bytebase.com</Link> and we&apos;ll get back
        to you ASAP.
      </p>
    </>
  );
}
