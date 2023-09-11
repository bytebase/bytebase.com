import getMetadata from '@/utils/get-metadata';

import Link from '@/components/shared/link';

import Route from '@/lib/route';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.TERMS);

export default function Page() {
  return (
    <>
      <h1 className="font-title text-90 font-semibold leading-none lg:text-68 md:text-56 sm:text-40">
        Terms of service
      </h1>
      <p className="text-gray-50 sm:my-3">
        Last modified: <time>Feb 11, 2022</time>
      </p>
      <p className="sm:mt-3">
        This Services Agreement is an agreement between Bytebase (as defined below) and you or the
        entity you represent (&ldquo;you&rdquo; or &ldquo;your&rdquo;), which contains the terms and
        conditions that govern your use of the Software (as defined below). By clicking &ldquo;I
        Accept,&rdquo; or by downloading, installing, or otherwise accessing or using the Software,
        you agree that you have read and understood, and, as a condition to your use of the
        Software, you agree to be bound by the following terms and conditions. If you are not
        eligible, or do not agree to the terms, then you do not have our permission to download
        and/or use the Software.
      </p>
      <h2>1. Definitions</h2>
      <p>
        <strong>&quot;Agreement&quot;</strong> means, collectively, the terms and conditions laid
        out on this page (these &ldquo;Terms&rdquo;), along with any order for Software
        (&ldquo;Order Form&rdquo;) and all other applicable rules, policies, and procedures that we
        may publish from time to time on the Site, including but not limited to our{' '}
        <Link href={Route.PRIVACY}>Privacy Policy</Link>.
      </p>
      <p>
        <strong>&quot;Content&quot;</strong> means any content made available through the Software,
        including but not limited to text (including Documentation), data, articles, images,
        photographs, videos, applications, software
      </p>
      <p>
        <strong>&quot;Documentation&quot;</strong> means the documentation regarding the Software
        that we make available for use at{' '}
        <Link href={Route.DOCS}>https://www.bytebase.com/docs</Link>.
      </p>
      <p>
        <strong>&quot;Instance&quot;</strong> means the self-hosted instance of the Software that
        you create or use in order to manage Your Database.
      </p>
      <p>
        <strong>&quot;Site&quot;</strong> means our website located at bytebase.com, and all
        content, services, and products provided by us at or through the Site (or any subdomain or
        successor site).
      </p>
      <p>
        <strong>&quot;Software&quot;</strong> means, collectively, the software provided by us for
        download via the Site and for installation on your equipment, including but not limited to
        the self-hosted Bytebase software and CLI and library.
      </p>
      <p>
        <strong>&quot;Bytebase&quot;</strong>, <strong>&quot;we&quot;</strong>, or{' '}
        <strong>&quot;us&quot;</strong> refers to Bytebase (HongKong) Limited, as well as its
        affiliates.
      </p>
      <p>
        <strong>&quot;You&quot;</strong> refers to the individual person, company, or organization
        that has visited or is using the Software, that accesses an Instance, or that directs the
        use of the Instance. If you&rsquo;re entering into the Agreement on behalf of your company
        or organization (your <strong>&quot;Organization&quot;</strong>), you represent and warrant
        that you&rsquo;re authorized to bind that company or organization to the Agreement and that
        you&rsquo;ve read, understood, and agree to be bound by the Agreement on that company or
        organization&rsquo;s behalf.
      </p>
      <p>
        <strong>&quot;Your Database&quot;</strong> means the database that you manage via the
        Software.
      </p>
      <h2>2. Account terms</h2>
      <h3>2.1 Account Responsibility and Security.</h3>
      <h4>1. Generally.</h4>
      <ol type="a">
        <li>
          To register to use the Software, you must create a username and password and provide us
          with the information requested in the registration process. You must provide complete and
          accurate information during the registration process and agree to update your information
          to ensure it remains accurate. You are responsible for (a) keeping your account
          credentials secure at all times and (b) not disclosing your account credentials to any
          other person nor permit anyone to access your account at any time. You must contact us
          immediately if you believe that there was any unauthorized access to your account or if
          your account information is lost or stolen.
        </li>
        <li>
          If you&rsquo;re entering into the Agreement on behalf of your Organization, your
          Organization has administrative control of all Instances tied to the Organization. You are
          or your Organization is fully responsible for your Instance and all Content posted under
          it.
        </li>
      </ol>
      <h4>2. Age Limitation.</h4>
      <ol type="a">
        <li>
          In order to create an Instance, you must be at least eighteen (18) years old and we do not
          permit any users under thirteen (13) years old to use our Software for any purpose. If we
          discover that an Instance is being used by a user under thirteen (13) years old, we will
          notify you that the Instance must immediately be shut down.
        </li>
        <li>
          By agreeing to these Terms, you represent and warrant to us that: (a) you are at least 18
          years old; (b) you have not previously been suspended or removed from the Site; and (c)
          your registration and your use of the Software is in compliance with any and all
          applicable laws and regulations.
        </li>
      </ol>
      <h4>3. Security</h4>
      <p>
        You&rsquo;re responsible for the security of your Instance when using our Software. While we
        may offer tools to help you maintain your Instance&rsquo;s security, these are not
        guaranteed to work. You&rsquo;re responsible for all Content posted on your Instance under
        your user account, even if you didn&rsquo;t post it. We have no liability of any kind for
        any loss or damage from your failure to secure your Instance.
      </p>
      <h2>3. Acceptable use</h2>
      <h3>3.1 License from Us to You.</h3>
      <p>
        The source code for our Software is publicly available at{' '}
        <Link href="https://github.com/bytebase" target="_blank">
          https://github.com/bytebase
        </Link>
        . Your rights to access and use that code is covered by the software license in that
        repository.
      </p>
      <h3>3.2 Restrictions.</h3>
      <p>You may not, and may not permit any third-party to:</p>
      <ol>
        <li>
          Redistribute, encumber, sell, rent, lease, sublicense, or otherwise transfer rights to all
          or any part of the Software.
        </li>
        <li>
          Use the Software for any illegal or unlawful purpose or any purpose that violates this
          Agreement.
        </li>
        <li>Use the Software to cause damage or injury to any person or property.</li>
        <li>Use the Software to build similar or competitive products or services.</li>
        <li>
          Interfere with or damage the proper functioning of other users&rsquo; use or enjoyment of
          the Software.
        </li>
        <li>
          Tamper with, hack, or otherwise disrupt any computer system, server, or networked device
          associated with the Software.
        </li>
        <li>Permit a number of users of the Software more than permitted by us.</li>
        <li>
          Use any release of the Software that is more than two (2) versions older than the then-
          most-current release of the Software.
        </li>
      </ol>
      <h3>3.3 Ownership; Proprietary Rights.</h3>
      <p>
        The Site, and Software are owned and operated by Bytebase. The visual interfaces, graphics,
        design, compilation, information, data, computer code (including source code or object
        code), products, software, services, and all other elements (
        <strong>&quot;Materials&quot;</strong>) provided by Bytebase are protected by intellectual
        property and other laws. All Materials are the property of Bytebase or its third party
        licensors. You acknowledge that the Site, and the Software are protected by copyrights,
        trademarks, service marks, international treaties, and/or other proprietary rights and laws
        and that all ownership and intellectual property rights in the Site, and the Software, and
        all related trade names, service marks, logos, domain names do and shall, as between you and
        Bytebase, belong exclusively to Bytebase. Except as expressly provided herein, these Terms
        grant you no right, title, license, or interest in any intellectual property owned or
        licensed by Bytebase, including (but not limited to) the Site, and the Software.
      </p>
      <h3>3.4 Ideas.</h3>
      <p>
        You may submit comments or ideas about the Software, such as how to improve it. By
        submitting a comment or idea, you agree that your disclosure is gratuitous, unsolicited and
        without restriction and will not place us under any fiduciary or other obligation, and that
        we are free to use the comment or idea without any additional compensation to you. By
        acceptance of your submission, we do not waive any rights to use similar ideas we already
        had or obtained from other sources.
      </p>
      <h3>3.5 Beta Software.</h3>
      <p>
        We may make beta and experimental products, features, and Documentation available to you on
        an early access basis (<strong>&quot;Beta Software&quot;</strong>). Beta Software is not
        generally available and may contain bugs, defects, and errors. We provide Beta Software
        &ldquo;as is,&rdquo; without warranties, and may discontinue the Beta Software at any time.
        Our service level agreements do not apply to Beta Software. If and when the Beta Software
        becomes generally available, you will have the option to pay for the software or discontinue
        its use. We may use your feedback about Beta Software. You acknowledge and agree that
        Bytebase may engage other third-party service providers to provide services to Bytebase in
        connection with our provision of the Software.
      </p>
      <h2>4. Usage data</h2>
      <p>
        We may collect data derived from your use of the Software (
        <strong>&ldquo;Usage Data&rdquo;</strong>). A specific list of Usage Data that we receive
        from self-hosted instances is always available in our{' '}
        <Link href={Route.DOCS}>Documentation</Link> and in the site-admin area on your Instance.
        You acknowledge and agree that Usage Data is owned solely and exclusively by us, and that we
        may use it for any legal purpose, including for purposes of operating, analyzing, improving,
        or marketing our products. If we share or publicly disclose any information constituting or
        derived from Usage Data (e.g., in marketing materials), we will aggregate or mask that
        information to avoid identification.
      </p>
      <h2>5. Data protection</h2>
      <p>
        Please read our <Link href={Route.PRIVACY}>Privacy Policy</Link> carefully for details
        relating to how we collect, use, and disclose personal information you provide to us in
        connection with your use of the Software. We have implemented, and the Software contains,
        commercially reasonable technical and organizational measures designed to secure Your
        Database and any other information you provide that is stored on your Instance (which we do
        not have access to), and any information that we do have access to (such as support emails
        you send to us, Usage Data, etc.), from accidental loss and from unauthorized access, use,
        alteration or disclosure. However, we cannot guarantee that unauthorized third parties will
        never be able to defeat those measures or use your information for improper purposes. You
        understand that internet technologies have the inherent potential for disclosure. You
        acknowledge that you store sensitive information on your Instance, or provide any sensitive
        information to us at your own risk.
      </p>
      <h2>6. Confidentiality</h2>
      <h3>6.1 Definition.</h3>
      <p>
        <strong>&quot;Confidential Information&quot;</strong> means all non-public information
        disclosed by us to you, or vice-versa, that is designated by the discloser as confidential
        or that reasonably should be considered confidential given the nature of the information or
        circumstances of its disclosure.
      </p>
      <h3>6.2 Exclusions.</h3>
      <p>Confidential Information does not include any information that:</p>
      <ol>
        <li>Was or becomes publicly known through no fault of the receiving party.</li>
        <li>
          Was rightfully known or becomes rightfully known to the receiving party without
          confidential restriction from a third-party that has a right to disclose it.
        </li>
        <li>
          Is approved by the disclosing party for disclosure without restriction in a written
          document or electronic record.
        </li>
        <li>
          The receiving party independently develops without access to or use of the other
          party&rsquo;s Confidential Information.
        </li>
      </ol>
      <h3>6.3 Restrictions on Use and Disclosure.</h3>
      <p>
        Neither party will use the other party&rsquo;s Confidential Information except as permitted
        under this Agreement. Each party agrees to maintain in confidence and protect the other
        party&rsquo;s Confidential Information using at least the same degree of care as it uses for
        its own information of a similar nature, but in any event at least a reasonable degree of
        care. Each party agrees to take all reasonable precautions to prevent any unauthorized
        disclosure of the other party&rsquo;s Confidential Information, including, without
        limitation, disclosing such Confidential Information only to its employees, independent
        contractors, consultants, and legal and financial advisors (collectively,{' '}
        <strong>&quot;Representatives&quot;</strong>) who (i) have a need to know such information,
        and (ii) are subject to confidentiality obligations at least as protective of the
        Confidential Information as the terms of this Agreement. Each party is responsible for all
        acts and omissions of its Representatives. The foregoing obligations will not restrict
        either party from disclosing Confidential Information of the other party if required by any
        governmental body, so long as, to the extent allowed under applicable law, the party
        required to make the disclosure gives reasonable notice to the other party to enable it to
        contest the requirement. The restrictions set forth in this Section will survive the
        termination or expiration of this Agreement.
      </p>
      <h2>7. Term; Termination</h2>
      <h3>7.1 Subscription Period.</h3>
      <p>
        Unless otherwise stated in an Order Form, this Agreement starts on the earlier of the date
        on which you: (a) agree to the terms and conditions of this Agreement; or (b) first set up
        an Instance and will continue in effect until either you or we terminate it (the
        <strong>&quot;Subscription Period&quot;</strong>).
      </p>
      <h3>7.2 Termination for Breach.</h3>
      <p>
        If a party fails to cure a material breach of the Agreement within thirty (30) days after
        receiving written notice of breach, the other party may then terminate the Agreement within
        the following thirty (30) days. We will refund you any prepaid, unused fees.
      </p>
      <h3>7.3 Termination for Convenience.</h3>
      <p>
        Either party may terminate this Agreement, for any reason or for no reason, provided that
        you are responsible for all prepaid fees and fees you commit to in an Order Form. If we
        terminate the Agreement under this section, we will refund you for all prepaid fees for the
        remainder of the Subscription Period.
      </p>
      <h3>7.4 Termination without Notification.</h3>
      <p>
        Bytebase reserves the right to immediately suspend your access to or use of the Software or
        terminate this Agreement without notification if:
      </p>
      <ol type="a">
        <li>
          We believe that there is a significant threat to the functionality, security, integrity,
          or availability of the Software or to Bytebase&rsquo;s other customers.
        </li>
        <li>We believe that you are violating the Agreement.</li>
        <li>We need to do so to comply with the Law or requests of governmental bodies.</li>
        <li>
          We believe that you cease to operate in the ordinary course, make an assignment for the
          benefit of creditors or similar disposition of your assets, or become the subject of any
          bankruptcy, reorganization, liquidation, dissolution or similar proceeding.
        </li>
      </ol>
      <h3>7.5 Effect of Termination; Survival.</h3>
      <p>
        Upon termination of this Agreement, you may no longer use the Software, and if any fees were
        owed prior to termination, you must pay those fees immediately. Any provisions of this
        Agreement that, by their terms or their nature, should survive the termination of this
        Agreement shall so survive. For purposes of clarity, your right to use the Software will not
        survive any termination of this Agreement.
      </p>
      <h2>8. Fees</h2>
      <h3>8.1 Pricing.</h3>
      <p>
        You are responsible for paying any applicable fees as set forth on our{' '}
        <Link href={Route.PRICING}>Pricing and Payment Terms</Link> or in an Order Form and
        applicable taxes associated with the Software in a timely manner with a valid payment
        method. Unless otherwise stated in an Order Form, you will pay all invoices within thirty
        (30) days of receipt. You agree that we may charge for any such fees owed. You are required
        to keep your billing information current.
      </p>
      <h3>8.2 Term.</h3>
      <p>
        Authorization to charge your chosen payment method account will remain in effect until you
        cancel or modify your preference. You agree that charges may be accumulated as incurred and
        may be submitted as one or more aggregate charges during or at the end of the applicable
        billing cycle.
      </p>
      <h3>8.3 Responsibility for Charges.</h3>
      <p>
        You are responsible for all charges incurred by usage of your Instance (whether made by you
        or anyone who may use your Instance, such as your co- workers, colleagues, team-members,
        etc.). If your payment method fails or you are past due on amounts owed, we may collect fees
        owed using other collection mechanisms. You are also responsible for paying any governmental
        taxes imposed on your use of the Software, including, but not limited to, sales, use, or
        value-added taxes.
      </p>
      <h3>8.4 No Refunds.</h3>
      <p>
        All fees and charges are earned upon receipt by us and are nonrefundable unless negotiated
        otherwise, except (a) as expressly set forth herein, and/or (b) as required by applicable
        law.
      </p>
      <h3>8.5 Renewals.</h3>
      <p>
        Unless otherwise stated in an Order Form, your subscription will be automatically renew for
        one (1) year terms at the then-current fees and your credit card account (or other payment
        method account) will be charged without further authorization from you, absent sixty (60)
        day written notice of non-renewal prior to the end of your current subscription term.
      </p>
      <h2>9. Third party services and software</h2>
      <p>
        We do not share Your Database with third-party services, unless you enable the integration.
        We make no warranties of any kind with regard to anything that is contained on or accessible
        through them. Access and use of Third Party Services is solely at your own risk. The
        Software may contain copyrighted software of our licensors (
        <strong>&ldquo;Third Party Software&rdquo;</strong>). The licensors retain all right, title,
        and interest in and to such Third Party Software and all copies thereof. Your use of any
        Third Party Software is subject to the terms and conditions of this Agreement, and any other
        terms and conditions in any Third Party Software documentation or printed materials
        (including EULAs). If there&rsquo;s ever a conflict between the terms of this Agreement and
        the terms applicable to any Third Party Software, and the conflict relates to the use of
        that Third Party Software, their terms and conditions will govern the conflict.
      </p>
      <h2>10. No warranties; disclaimer</h2>
      <p>
        THE SOFTWARE, AND ANY OTHER SOFTWARE, APPLICATIONS, PRODUCTS, AND SOFTWARE MADE AVAILABLE ON
        OR IN CONNECTION WITH THE SOFTWARE ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS
        AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR
        OTHERWISE. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, TO THE FULLEST EXTENT
        PERMISSIBLE UNDER APPLICABLE LAW, BYTEBASE DISCLAIMS, ON BEHALF OF ITSELF AND ITS LICENSORS,
        ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY
        IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NONINFRINGEMENT.
        FURTHER, WE DO NOT WARRANT THAT THE SOFTWARE OR ANY PART THEREOF (OR YOUR ACCESS THERETO)
        WILL BE UNINTERRUPTED, FREE OF INACCURACIES, ERRORS, BUGS, OR FREE FROM VIRUSES OR OTHER
        HARMFUL COMPONENTS, WILL MEET YOUR REQUIREMENTS, OR THAT DEFECTS WILL BE CORRECTED. CERTAIN
        JURISDICTIONS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION
        OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS,
        EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS AS
        PROVIDED BY LAW.
      </p>
      <h2>11. Limitation of liability</h2>
      <p>
        UNDER NO CIRCUMSTANCES WILL EITHER PARTY (OR ITS AFFILIATES, EMPLOYEES, AGENTS, LICENSORS,
        SUCCESSORS, OR ASSIGNS) BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL, CONSEQUENTIAL,
        PUNITIVE, RELIANCE, OR EXEMPLARY DAMAGES (INCLUDING WITHOUT LIMITATION LOSSES OR LIABILITY
        RESULTING FROM LOSS OF DATA, LOSS OF REVENUE, ANTICIPATED PROFITS, LOSS OF GOODWILL, COST OF
        REPLACEMENT SOFTWARE, OR LOSS OF BUSINESS OPPORTUNITY) THAT RESULT FROM YOUR USE OR YOUR
        INABILITY TO USE THE SOFTWARE, OR ANY OTHER INTERACTIONS WITH US, HOWEVER CAUSED AND
        REGARDLESS OF THE THEORY OF LIABILITY OR WHETHER ARISING OUT OF THE USE OF OR INABILITY TO
        USE SOFTWARE OR OTHERWISE AND EVEN IF WE OR A BYTEBASE-AUTHORIZED REPRESENTATIVE HAS BEEN
        ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. APPLICABLE LAW MAY NOT ALLOW THE LIMITATION OR
        EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR
        EXCLUSION MAY NOT APPLY TO YOU. IN SUCH CASES, OUR LIABILITY WILL BE LIMITED TO THE FULLEST
        EXTENT PERMITTED BY APPLICABLE LAW. IN NO EVENT WILL EACH PARTY&rsquo;S (OR ITS AFFILIATES,
        EMPLOYEES, AGENTS, LICENSORS, SUCCESSORS, OR ASSIGNS&rsquo;) TOTAL LIABILITY FOR ALL
        DAMAGES, LOSSES, AND CAUSES OF ACTION ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE
        OF THE SOFTWARE, INCLUDING WITHOUT LIMITATION YOUR INTERACTIONS WITH OTHER USERS, (WHETHER
        IN CONTRACT, TORT INCLUDING NEGLIGENCE, WARRANTY, OR OTHERWISE) EXCEED THE AMOUNT PAID OR
        PAYABLE BY YOU, IF ANY, FOR THE SOFTWARE DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING
        THE EVENT THAT GAVE RISE TO THE CLAIM (EXCLUSIVE OF TAX).
      </p>
      <p>
        You acknowledge and agree that we have offered our products and services, set our prices,
        and entered into the Agreement in reliance upon the disclaimers of warranty and the
        limitations of liability set forth herein, that the disclaimers of warranty and the
        limitations of liability set forth herein reflect a reasonable and fair allocation of risk
        between the parties (including the risk that a contract remedy may fail of its essential
        purpose and cause consequential loss), and that the disclaimers of warranty and the
        limitations of liability set forth herein form an essential basis of the bargain between you
        and us.
      </p>
      <h2>12. Force Majeure and Exemption of Liability</h2>
      <h3>
        12.1 You understand and agree that, in the process of using the Software, you may encounter
        the following circumstances that may result in service interruptions. Bytebase will be
        exempted from the liability for losses caused to you under any of the following
        circumstances:
      </h3>
      <ol type="a">
        <li>
          Force majeure, including but not limited to natural disasters, government actions,
          adjustments or promulgation of policies, laws, or regulations, strikes, unrests, and other
          unforeseeable, unavoidable, and insurmountable objective conditions.
        </li>
        <li>
          The acts or omissions of a basic operator, including but not limited to the technical
          adjustment of telecommunications sector, destruction of the telecommunications or power
          lines by others, and the installation, modification, and maintenance of telecommunications
          networks or power resources by the telecommunications or electricity sector.
        </li>
        <li>
          Cyber security incidents, such as the destruction of computer viruses, Trojan horses, or
          other malicious programs, or hacking attacks.
        </li>
        <li>
          Your improper operation or the failure of your computer software, system, hardware and
          communication lines.
        </li>
        <li>
          Service interruptions, as a result of a decrease in access speed out of the occasional
          blockage of the operator&rsquo;s backbone path, during server configuration or user
          program installation.
        </li>
        <li>
          Service interruptions resulting from corresponding measures taken in accordance with the
          regulatory requirements of the competent authority, such as the ban or similar notice
          involving your account, services, or devices issued by the competent authority.
        </li>
        <li>
          Other circumstances that are not caused by the fault of Bytebase or cannot be controlled
          or reasonably foreseen by Bytebase.
        </li>
      </ol>
      <h3>12.2</h3>
      <p>
        In the event of a force majeure event, the obligations of the parties hereunder shall be
        suspended within the scope and duration of such force majeure event. Neither party will be
        held liable for such force majeure event. The party claiming a force majeure event shall, no
        later than fifteen (15) days upon occurrence of such force majeure event, notify the other
        party of the force majeure event and provide the other party with a written certificate of
        the force majeure event confirmed by the relevant authority, and shall strive to minimize
        the impact of such force majeure event. In case of a force majeure event, both parties shall
        immediately negotiate a solution. If such force majeure event lasts more than thirty (30)
        days and has a material adverse impact on the performance of this Agreement, either party
        may terminate this Agreement.
      </p>
      <h3>12.3</h3>
      <p>In no event shall a force majeure event release you from your payment obligation.</p>
      <h2>13. Indemnification</h2>
      <h3>13.1 By You.</h3>
      <p>
        You agree to defend us and our affiliates, directors, officers, employees, and contractors
        from and against any third-party claims, proceedings, demands, and investigations and
        indemnify us for damages, attorney&rsquo;s fees, and costs arising from Your Database or
        Content, your use of the Software in violation of the Agreement including any data or work
        transmitted or received by you, your violation of the Agreement or applicable laws, your
        infringement of any third-party intellectual property or other right of any person or
        entity, or any other party&rsquo;s access and use of the Software with your unique username,
        password, or other appropriate security code.
      </p>
      <h3>13.2 By Bytebase.</h3>
      <p>
        We agree to defend you and your affiliates, directors, officers, employees, and contractors
        from and against any third-party claims, proceedings, demands, and investigations and
        indemnify you for damages, attorney&rsquo;s fees, and costs arising from your use of the
        Software or Documentation in accordance with this Agreement that infringes or
        misappropriates such third-party&rsquo;s intellectual property rights, except for claims
        arising from (a) Your Database or Content, (b) your use of the Software in violation of the
        Agreement, or (c) any modification, combination, or development of the Software not
        performed by us.
      </p>
      <h3>13.3 Procedure.</h3>
      <p>
        Each party must give the other prompt written notice of any defense or indemnity sought and
        reasonable cooperation in the defense. The defending party will have sole control of the
        defense and settlement, provided that neither party may enter into a settlement placing any
        material obligation of any kind, including any admission of liability or payment of any
        amount, on the other party without the other party&rsquo;s prior written approval, not to be
        unreasonably withheld, conditioned, or delayed.
      </p>
      <h2>14. Modifications</h2>
      <h3>14.1</h3>
      <p>
        We reserve the right to change, modify, or update the Software at any time, to impose
        additional restrictions or limitations, or to change, modify or update the fees charged for
        all or a portion of the Software. You agree that Bytebase has no responsibility or liability
        for the deletion or failure to store any data or other content maintained or transmitted by
        the Software. Bytebase may decide what features to include in the Software and whether to
        make them optional or mandatory. You further acknowledge that Bytebase reserves the right to
        change these general practices and limits at any time, in its sole discretion, with or
        without notice.
      </p>
      <h3>14.2</h3>
      <p>
        We also reserve the right to update the Agreement (including these Terms) from time to time.
        When we change the Agreement (including these Terms) in a material manner, we will update
        the ‘last modified&rsquo; date at the top of this page and notify you that material changes
        have been made to the Agreement. Your continued use of the Software after any such change
        constitutes your acceptance of the new Terms of Service, unless you have signed an Order
        Form with us where the terms in effect as of your Order Date will apply. If you have
        purchased a subscription to use the Software, any change to these Terms will be effective
        with respect to such Software upon the renewal of your subscription, unless otherwise stated
        in an Order Form.
      </p>
      <h2>15. Export Control</h2>
      <p>
        Both parties undertake to abide by the export control laws and regulations of the United
        Nations, China, the United States, and other countries applicable to this Agreement. You
        undertake not to use the products or services provided by Bytebase for purposes prohibited
        by applicable export control laws and regulations, and that, without the permission of the
        competent authorities, you and other individuals or entities authorized by you to use
        Bytebase products or services will not provide controlled technologies, software, or
        services to the entities or individuals prohibited by applicable export control laws and
        regulations through Bytebase products or services.
      </p>
      <h2>16. Miscellaneous</h2>
      <h3>16.1 Governing Law and Jurisdiction.</h3>
      <p>
        This Agreement is governed by the laws of the Hong Kong Special Administrative Region
        without regard to conflicts of law principles. Where any dispute between the parties arises
        from the content of this Agreement or the implementation hereof, the parties shall try their
        best to resolve it through friendly negotiation. If no agreement is reached through
        negotiation, each party agrees to submit to the exclusive jurisdiction of, and venue in, the
        courts in the Hong Kong Special Administrative Region in any dispute arising out of or
        relating to this Agreement.
      </p>
      <h3>16.2 Notices and Electronic Communications.</h3>
      <p>
        Any notice, request, consent, claim, demand, or other communication to be given or delivered
        to a party under or by reason of a provision of this Agreement shall be in writing in
        accordance with this Section 16.2. Bytebase may provide you with notice under this Agreement
        by (a) posting a notice on the Site or (b) sending a message to the email address then
        associated with your account. Notices provided by posting on the Site will be effective upon
        posting and notices provided by email will be effective when Bytebase sends out the email.
        You agree that any electronic communication will satisfy any applicable legal communication
        requirements, including that such communications be in writing. It is your responsibility to
        keep the email address associated with your account current. You may provide us with notice
        under this Agreement via email at{' '}
        <Link href="mailto:support@bytebase.com">support@bytebase.com</Link>.
      </p>
      <h3>16.3 Waiver.</h3>
      <p>
        Our failure to exercise or enforce any right or provision of the Agreement will not
        constitute a waiver of such right or provision. Any waiver of any provision of the Agreement
        will be effective only if in writing and signed by us.
      </p>
      <h3>16.4 Severability.</h3>
      <p>
        If any provision of the Agreement is held to be unlawful, void, or for any reason
        unenforceable, then that provision will be limited or eliminated from the Agreement to the
        minimum extent necessary and will not affect the validity and enforceability of any
        remaining provisions; except that in the event of unenforceability of the universal Class
        Action/Jury Trial Waiver, the entire arbitration agreement shall be unenforceable.
      </p>
      <h3>16.5 Assignment.</h3>
      <p>
        The Agreement and any rights and licenses granted hereunder, may not be transferred or
        assigned by either party without written consent, except in connection with a merger,
        acquisition, reorganization, or sale of substantially all assets.
      </p>
      <h3>16.6 Survival.</h3>
      <p>
        Upon termination of the Agreement, any provision which, by its nature or express terms
        should survive, shall survive such termination or expiration.
      </p>
      <h3>16.7 Headings.</h3>
      <p>
        The heading references herein are for convenience only, do not constitute a part of the
        Agreement, and will not be deemed to limit or affect any of the provisions here of.
      </p>
      <h3>16.8 Marketing and Publicity.</h3>
      <p>
        We may freely refer to your Organization and your relationship with us in connection with
        publicizing and marketing our products and services, including using your
        Organization&rsquo;s name and logo to identify your Organization as a customer and using
        product testimonials and quotes your Organization&rsquo;s representatives may provide to us.
      </p>
      <h3>16.9 Entire Agreement.</h3>
      <p>
        This, including the agreements incorporated by reference, constitutes the entire agreement
        between you and us relating to the subject matter herein and will not be modified except in
        writing, signed by both parties, or by a change made by us as set forth in the Agreement.
      </p>
      <h3>16.10 Disclosures.</h3>
      <p>
        The Software is offered by Bytebase (HongKong) Limited and can be reached via email at{' '}
        <Link href="mailto:support@bytebase.com">support@bytebase.com</Link>.
      </p>
    </>
  );
}
