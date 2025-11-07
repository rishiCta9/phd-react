import React from 'react';
import { Island } from '@hubspot/cms-components';
import { ModuleFields } from '@hubspot/cms-components/fields';
// @ts-ignore
import ContactsList from './ContactsList?island';

export function Component() {
  return <Island module={ContactsList} hydrateOn="load" />;
}

export const fields = <ModuleFields children={<></>} />;

export const meta = {
  label: 'Contacts List',
};
