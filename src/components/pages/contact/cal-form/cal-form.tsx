'use client';

import Cal, { getCalApi } from '@calcom/embed-react';

import { useEffect } from 'react';

const CalForm = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', { styles: { branding: { brandColor: '#5647EB' } }, hideEventTypeDetails: false });
    })();
  }, []);

  return (
    <Cal
      calLink="tianzhou/bytebase-product-walkthrough"
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
    />
  );
};

export default CalForm;
