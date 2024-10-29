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
        time-to-resolution. The SLAs apply to the Enterprise plan and exclude beta features. Premium
        support are available as an add-on.
      </p>
      <table>
        <tr>
          <th>Severity</th>
          <th>Standard</th>
          <th>Premium</th>
        </tr>
        <tr>
          <td>Urgent (Your Bytebase instance is completely unusable)</td>
          <td>2h (24x5 Monday - Friday)</td>
          <td>1h (24x5 Monday - Friday)</td>
        </tr>
        <tr>
          <td>High (Important features unavailable or extremely slow; No acceptable workaround)</td>
          <td>4h (24x5 Monday - Friday)</td>
          <td>2h (24x5 Monday - Friday)</td>
        </tr>
        <tr>
          <td>
            Medium (Important features unavailable or somewhat slowed, but a workaround is
            available)
          </td>
          <td>16h (8x5 Monday - Friday)</td>
          <td>8h (8x5 Monday - Friday)</td>
        </tr>
        <tr>
          <td>
            Low (Questions or clarifications around features with minimal or no business impact)
          </td>
          <td>2d (8x5 Monday - Friday)</td>
          <td>1d (8x5 Monday - Friday)</td>
        </tr>
      </table>
      <ul>
        <li>
          <strong>Initial Response:</strong> Acknowledgment or preliminary assistance to customer
          inquiries.
        </li>
        <li>
          <strong>24x5:</strong> Support services available 24 hours a day, Monday through Friday,
          Pacific Time (PT), excluding public holidays observed in the United States.
        </li>
        <li>
          <strong>8x5:</strong> Support services available from 9:00 AM to 5:00 PM, Monday through
          Friday, Pacific Time (PT), excluding public holidays observed in the United States.
        </li>
      </ul>
    </>
  );
}
