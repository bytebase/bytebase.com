import { COLORS } from '@/components/pages/pricing/table/data/pricing-plans';

export type Plan = {
  title: keyof typeof COLORS;
  description: string;
  additionalDescription?: string;
  buttonText: string;
  buttonUrl: string;
  buttonTheme: 'primary-filled' | 'primary-outline';
  databaseChangeManagement: PricingTableItem;
  sqlEditorDevelopment: PricingTableItem;
  securityCompliance: PricingTableItem;
  administrationSupport: PricingTableItem;
};

export type PricingTableItem = Record<
  string,
  string | boolean | { value: string; tooltip: string }
>;
