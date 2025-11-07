import * as React from 'react';
import {
  ModuleFields,
  TextField,
  ChoiceField,
} from '@hubspot/cms-components/fields';
import { Island } from '@hubspot/cms-components';
import { SidebarProvider } from '../../ui/sidebar.js';
// @ts-ignore
import SidebarInteractive from './SidebarInteractive?island';

export function SidebarContentComponent({ fieldValues }) {
  const { title, showFooter } = fieldValues;

  return (
    <Island
      module={SidebarInteractive}
      hydrateOn="load"
      title={title}
      showFooter={showFooter}
    />
  );
}

export function Component({ fieldValues }) {
  return (
    <SidebarProvider className="h-screen">
      <SidebarContentComponent fieldValues={fieldValues} />
    </SidebarProvider>
  );
}

export const fields = (
  <ModuleFields
    children={
      <>
        <TextField name="title" label="Title" default="ABUNDANCEHUB" />
        <ChoiceField
          name="showFooter"
          label="Show Footer"
          default="true"
          choices={[
            ['true', 'Yes'],
            ['false', 'No'],
          ]}
        />
      </>
    }
  />
);

export const meta = {
  label: 'Sidebar Component',
};
