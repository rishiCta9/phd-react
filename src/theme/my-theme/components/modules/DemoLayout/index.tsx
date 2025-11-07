import * as React from 'react';
import { ModuleFields, TextField } from '@hubspot/cms-components/fields';
import { Island } from '@hubspot/cms-components';
// @ts-ignore
import DemoLayoutInteractive from './DemoLayoutInteractive?island';
import '../../../styles/globals.css';

export function Component({ fieldValues }) {
  const { mainTitle } = fieldValues;

  return (
    <Island
      module={DemoLayoutInteractive}
      hydrateOn="load"
      mainTitle={mainTitle}
    />
  );
}

export const fields = (
  <ModuleFields
    children={
      <>
        <TextField
          name="mainTitle"
          label="Main Title"
          default="EVENT UPDATES"
        />
      </>
    }
  />
);

export const meta = {
  label: 'Demo Layout with Sidebar',
};
