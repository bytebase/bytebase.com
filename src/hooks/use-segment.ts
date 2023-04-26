import { useCallback, useEffect, useState } from 'react';

import { Analytics, AnalyticsBrowser } from '@segment/analytics-next';

import { tinyCookie } from '../utils/cookie';

const PAGE_PREFIX = 'main-site';

type Metric = {
  page: (name: string | null | undefined) => void;
  track: (name: string) => void;
  identify: (email: string, traits: any, options: any) => void;
};

const createSegmentMetric = (analytics: Analytics): Metric => {
  const page = (name: string | null | undefined) => {
    const pageName = name || '';
    const [id, locale] = pageName.split('___');
    const parameter = {
      ...metricParameter,
      locale,
    };

    const query = new URLSearchParams(parameter).toString();

    analytics.page(id ? `${PAGE_PREFIX}.${id}` : PAGE_PREFIX, {
      ...parameter,
      search: `?${query}`,
      url: window.location.href.split('?')[0] + `?${query}`,
    });
  };

  const track = (name: string) => {
    analytics.track(name, {
      ...metricParameter,
    });
  };

  const identify = (email: string, traits: any, options: any) => {
    analytics?.identify(
      {
        email: email,
        ...metricParameter,
        ...(traits || {}),
      },
      options,
    );
  };

  const metricParameter = {
    source: tinyCookie().get('source'),
    utm_source: tinyCookie().get('utm_source'),
    utm_medium: tinyCookie().get('utm_medium'),
    utm_campaign: tinyCookie().get('utm_campaign'),
  };

  return { page, track, identify };
};

const useSegment = () => {
  const [analytics, setAnalytics] = useState<Metric | null>(null);
  const [analyticsForNewsletter, setAnalyticsForNewsletter] = useState<Metric | null>(null);

  const loadAnalytics = useCallback((writeKey: string, setter: any) => {
    AnalyticsBrowser.load({ writeKey })
      .then(([response]: any) => {
        setter(createSegmentMetric(response));
      })
      .catch((e: any) => {
        // eslint-disable-next-line no-console
        console.log('error loading segment', e);
      });
  }, []);

  useEffect(() => {
    loadAnalytics('EEgWyVTmuufXUJMulZ2EGgfN2VBy0EBP', setAnalytics);
    loadAnalytics('CVXXNXv3EzfQPYqHoYvlDDDOXmKa9XOj', setAnalyticsForNewsletter);
  }, [loadAnalytics]);

  return { analytics, analyticsForNewsletter };
};

export default useSegment;
