import getMetadata from '@/utils/get-metadata';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.SLA);

export default function Page() {
  return (
    <>
      <h1 className="font-title text-90 font-semibold leading-none lg:text-68 md:text-56 sm:text-40">
        Service Level Agreement
      </h1>
      <p>
        The SLA times listed are the time frames in which you can expect the first response.
        Bytebase Support will make a best effort to resolve any issues to your satisfaction as
        quickly as possible. However, the SLA times are not to be considered as an expected
        time-to-resolution. The SLAs apply to generally available products and exclude beta
        features. Premium support / enhanced SLAs are available as an add-on for our Enterprise
        plans.
      </p>
      <table>
        <tr>
          <th>Severity</th>
          <th>First Response time</th>
          <th>Support Availability</th>
        </tr>
        <tr>
          <td>Emergency (Your Bytebase instance is completely unusable)</td>
          <td>Within 2 business hours of becoming aware of the issue</td>
          <td>24x5 (Monday - Friday)</td>
        </tr>
        <tr>
          <td>
            Highly Degraded (Important features unavailable or extremely slow; No acceptable
            workaround)
          </td>
          <td>Within 4 business hours of becoming aware of the issue</td>
          <td>24x5 (Monday - Friday)</td>
        </tr>
        <tr>
          <td>Medium Impact</td>
          <td>Within 8 business hours of becoming aware of the issue</td>
          <td>8x5 (Monday - Friday)</td>
        </tr>
        <tr>
          <td>Low Impact</td>
          <td>Within 2 business days of becoming aware of the issue</td>
          <td>8x5 (Monday - Friday)</td>
        </tr>
      </table>
      <ul>
        <li>
          <strong>Business Hours:</strong> Defined as 8:00 AM to 5:00 PM Pacific Time (PT), Monday
          through Friday, excluding public holidays observed in the United States.
        </li>
        <li>
          <strong>24x5 Support:</strong> Refers to support services available 24 hours a day, Monday
          through Friday Pacific Time (PT), excluding public holidays observed in the United States.
        </li>
        <li>
          <strong>8x5 Support:</strong> Refers to support services available during Business Hours.
        </li>
      </ul>
    </>
  );
}
