import React from 'react';
import { Island } from '@hubspot/cms-components';
import { ModuleFields, TextField } from '@hubspot/cms-components/fields';
// @ts-ignore
import AllMembersInteractive from './AllMembersInteractive?island';

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

  return <Island module={AllMembersInteractive} hydrateOn="load" />;
}

export const fields = (
  <ModuleFields>
    <TextField
      name="hubspotFrontendUrl"
      label="HubSpot Frontend URL"
      default="https://cdn2.hubspot.net"
      helpText="The base URL for HubSpot file manager (e.g., https://cdn2.hubspot.net)"
    />
    <TextField
      name="frontendUrl"
      label="Frontend URL"
      default="https://hub-serverless.vercel.app"
      helpText="The base URL for the external API (e.g., https://hub-serverless.vercel.app). The API endpoint will be constructed as {FRONTEND_URL}/api/contacts"
    />
  </ModuleFields>
);

export const meta = {
  label: 'All Members',
};
