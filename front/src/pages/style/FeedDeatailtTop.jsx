import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import FeedDetailWrapper from './FeedDetailWrapper';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/feed/:feedId" component={FeedDetailWrapperWithParams} />
        </Switch>
      </div>
    </Router>
  );
};

const FeedDetailWrapperWithParams = (props) => {
  const { feedId } = useParams();
  return <FeedDetailWrapper feedId={feedId} />;
};

export default App;
