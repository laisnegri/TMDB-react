import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TelaInicial from '../views/Trending';

export default function Routes() {
    return (
      <Router>
        <Switch>
            <Route path="/" component={TelaInicial}/>
        </Switch>
    </Router>
  );
}
