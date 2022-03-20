/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';

// Importing pages
import { DashboardLayout } from './pages/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './routes/PrivateRoute';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Cortex"
        defaultTitle="Pattarai | Cortex"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A ERP application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute path="/dashboard" component={DashboardLayout} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
