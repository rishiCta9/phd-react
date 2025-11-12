import React from 'react';
import { Island } from '@hubspot/cms-components';
import { ModuleFields } from '@hubspot/cms-components/fields';
// @ts-ignore
import ContactDetailInteractive from './ContactDetailInteractive?island';

export function Component({ fieldValues }) {
  // Pass HUBSPOT_FRONTEND_URL to the interactive component
  React.useEffect(() => {
    if (fieldValues?.hubspotFrontendUrl) {
      (window as any).HUBSPOT_FRONTEND_URL = fieldValues.hubspotFrontendUrl;
    }
  }, [fieldValues?.hubspotFrontendUrl]);

  // Pass FRONTEND_URL to the interactive component
  React.useEffect(() => {
    if (fieldValues?.frontendUrl) {
      (window as any).FRONTEND_URL = fieldValues.frontendUrl;
    }
  }, [fieldValues?.frontendUrl]);

  return <Island module={ContactDetailInteractive} hydrateOn="load" />;
}

export const fields = <ModuleFields children={<></>} />;

export const meta = {
  label: 'Contact Detail',
};
