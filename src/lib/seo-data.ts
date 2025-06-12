import Route from '@/lib/route';

const SEO_DATA = {
  INDEX: {
    title: 'Database DevSecOps | Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: '',
  },
  SCHEMA_MIGRATION: {
    title: 'Schema Migration | Liquibase, Flyway alternative',
    description:
      'GUI-based database schema migration with access control, batch change and collaboration | Liquibase, Flyway alternative',
    pathname: `${Route.SCHEMA_MIGRATION}/`,
  },
  SQL_EDITOR: {
    title: 'SQL Editor | DBeaver, Navicat, TablePlus, MySQL Workbench, pgAdmin alternative',
    description:
      'Secure-first SQL Editor with data access control and masking | DBeaver, Navicat, TablePlus, MySQL Workbench, pgAdmin alternative',
    pathname: `${Route.SQL_EDITOR}/`,
  },
  DATA_MASKING: {
    title: 'Dynamic Data Masking for MySQL, PostgreSQL, Oracle, TiDB and more',
    description: 'Dynamic Data Masking for MySQL, PostgreSQL, Oracle, TiDB and more',
    pathname: `${Route.DATA_MASKING}/`,
  },
  BATCH_CHANGE: {
    title: 'Batch Change Databases',
    description: 'Multi-environments, multi-regions, multi-tenants',
    pathname: `${Route.BATCH_CHANGE}/`,
  },
  ABOUT: {
    title: 'About Us',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.ABOUT}/`,
  },
  DEMO: {
    title: 'Demo',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DEMO}/`,
  },
  PRICING: {
    title: 'Bytebase Pricing',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.PRICING}/`,
  },
  RESOURCES: {
    title: 'Bytebase Resources',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.RESOURCES}/`,
  },
  BLOG: {
    title: 'Blog',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.BLOG}/`,
  },
  DATABASE_GLOSSARY: {
    title: 'Database Glossary',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_GLOSSARY}/`,
  },
  TERMS: {
    title: 'Bytebase Terms of Service',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.TERMS}/`,
  },
  PARTNER: {
    title: 'Bytebase Partner Program',
    description: 'Grow your business with the Bytebase Partnership program',
    pathname: `${Route.PARTNER}/`,
  },
  PRIVACY: {
    title: 'Bytebase Privacy Policy',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.PRIVACY}/`,
  },
  SECURITY: {
    title: 'Bytebase Security Details',
    description: 'The security details for the Bytebase product',
    pathname: `${Route.SECURITY}/`,
  },
  SLA: {
    title: 'Service Level Agreement',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.SLA}/`,
  },
  SUB_PROCESSORS: {
    title: 'Subprocessors',
    description: 'List of Bytebase subprocessors.',
    pathname: `${Route.SUB_PROCESSORS}/`,
  },
  DBA: {
    title: 'Bytebase for DBA',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DBA}/`,
  },
  DEVELOPER: {
    title: 'Bytebase for Developer',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DEVELOPER}/`,
  },
  TECHLEAD: {
    title: 'Bytebase for Tech Lead',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.TECHLEAD}/`,
  },
  CONTACTS: {
    title: 'Bytebase Contact',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONTACTS}/`,
  },
  VIEW_LIVE_DEMO: {
    title: 'View Live Demo',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.VIEW_LIVE_DEMO}/`,
  },
  REQUEST_DEMO: {
    title: 'Request a Demo',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.REQUEST_DEMO}/`,
  },
  CONFIRM_DEMO: {
    title: 'Demo Booking Confirmed',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONFIRM_DEMO}/`,
  },
  CONFIRM_VIEW_LIVE_DEMO: {
    title: 'Live Demo is Activated',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONFIRM_VIEW_LIVE_DEMO}/`,
  },
  CONFIRM_INQUIRY: {
    title: 'We Have Received Your Inquiry',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONFIRM_INQUIRY}/`,
  },
  CONFIRM_MESSAGE: {
    title: 'Your Message Has Been Sent',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONFIRM_MESSAGE}/`,
  },
  LIQUIBASE: {
    title: 'Liquibase Alternative',
    description: 'Liquibase alternative with GitOps, batch change, and collaboration',
    pathname: `${Route.ALTERNATIVE_LIQUIBASE}/`,
  },
  FLYWAY: {
    title: 'Flyway Alternative',
    description: 'Flyway alternative with GitOps, batch change, and collaboration',
    pathname: `${Route.ALTERNATIVE_FLYWAY}/`,
  },
  DATAGRIP: {
    title: 'DataGrip Alternative',
    description: 'DataGrip alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_DATAGRIP}/`,
  },
  DBEAVER: {
    title: 'DBeaver Alternative',
    description: 'DBeaver Alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_DBEAVER}/`,
  },
  MYSQL_WORKBENCH: {
    title: 'MySQL Workbench Alternative',
    description: 'MySQL Workbench alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_MYSQL_WORKBENCH}/`,
  },
  NAVICAT: {
    title: 'Navicat Alternative',
    description: 'Navicat alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_NAVICAT}/`,
  },
  PGADMIN: {
    title: 'pgAdmin Alternative',
    description: 'pgAdmin alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_PGADMIN}/`,
  },
  PHPMYADMIN: {
    title: 'phpMyAdmin Alternative',
    description: 'phpMyAdmin alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_PHPMYADMIN}/`,
  },
  TABLEPLUS: {
    title: 'TablePlus Alternative',
    description: 'TablePlus alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_TABLEPLUS}/`,
  },
};

export default SEO_DATA;
