/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './app/(dashboard)/layout';
import { DashboardPage } from './app/(dashboard)/dashboard/page';
import { ProjectsPage } from './app/(dashboard)/projects/page';
import { TemplatesPage } from './app/(dashboard)/templates/page';
import { SocialPage } from './app/(dashboard)/social/page';
import { SettingsPage } from './app/(dashboard)/settings/page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
