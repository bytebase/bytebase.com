import getMetadata from '@/utils/get-metadata';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.SUB_PROCESSORS);

export default function Page() {
  return (
    <>
      <h1 className="font-title text-90 font-semibold leading-none lg:text-68 md:text-56 sm:text-40">
        Subprocessors
      </h1>
      <p className="text-gray-50 sm:my-3">
        Last modified: <time>Jan 6, 2024</time>
      </p>
      <p>
        As a software vendor, we collaborate with trusted third-party service providers
        (subprocessors) to enhance the functionality, security, and performance of our products and
        services.
      </p>
      <table>
        <tr>
          <th>Vendor</th>
          <th>Location</th>
          <th>Purpose</th>
          <th>Reference</th>
        </tr>
        <tr>
          <td>Cloudflare</td>
          <td>US</td>
          <td>DNS</td>
          <td>https://www.cloudflare.com/cloudflare-customer-dpa/</td>
        </tr>
        <tr>
          <td>Google Cloud</td>
          <td>US</td>
          <td>Hosting</td>
          <td>https://cloud.google.com/terms/data-processing-addendum</td>
        </tr>
        <tr>
          <td>Linear</td>
          <td>US</td>
          <td>Ticketing</td>
          <td>https://linear.app/dpa</td>
        </tr>
        <tr>
          <td>Mailchimp</td>
          <td>US</td>
          <td>Email</td>
          <td>https://mailchimp.com/legal/data-processing-addendum/</td>
        </tr>
        <tr>
          <td>Paddle</td>
          <td>UK</td>
          <td>Payment</td>
          <td>https://www.paddle.com/legal/data-processing-addendum</td>
        </tr>
        <tr>
          <td>Render</td>
          <td>US</td>
          <td>Hosting</td>
          <td>https://trust.render.com/</td>
        </tr>
      </table>
    </>
  );
}
