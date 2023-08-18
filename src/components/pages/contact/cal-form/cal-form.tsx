'use client';

import Cal from '@calcom/embed-react';

const CalForm = () => {
  return (
    <Cal
      calLink="adela-bytebase/30min"
      config={{ theme: 'light', branding: { brandColor: '#5647EB' } }}
    />
  );
};

export default CalForm;
