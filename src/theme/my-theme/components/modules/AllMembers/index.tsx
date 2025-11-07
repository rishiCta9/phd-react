import React from 'react';
import { Island } from '@hubspot/cms-components';
import { ModuleFields } from '@hubspot/cms-components/fields';
// @ts-ignore
import AllMembersInteractive from './AllMembersInteractive?island';

export function Component() {
  return <Island module={AllMembersInteractive} hydrateOn="load" />;
}

export const fields = <ModuleFields children={<></>} />;

export const meta = {
  label: 'All Members',
};
