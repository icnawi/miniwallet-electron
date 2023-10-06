import { MuiThemeProvider } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Main } from './Main/Main';
import { NotFound } from './NotFound/NotFound';
import { getTheme, routes } from '../config';

export const App = () => {
  const colors = useStoreState(state => state.common.tokenConfig.styles.colors);
  const initWeb3 = useStoreActions(actions => actions.common.onConnectToMetamask);

  React.useEffect(() => {
    initWeb3();
  }, [initWeb3]);

  return (
    <MuiThemeProvider theme={getTheme({ colors })}>
      <Switch>
        <Route exact path={[routes.root, routes.tutorial, routes.compliance]} component={Main} />
        <Route path="*" component={NotFound} />
      </Switch>
    </MuiThemeProvider>
  );
};
