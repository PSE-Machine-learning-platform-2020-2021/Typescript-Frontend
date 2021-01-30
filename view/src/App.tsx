import React from 'react'
import {Link,Route} from 'react-router-dom'
import './App.css';
import ReferringPage from './pages/ReferringPage'
import FinishPage from './pages/FinishPage'
import DataCollectionPage from './pages/DataCollectionPage'
import DeliveryPage from './pages/DeliveryPage'
import ModelCreationPage from './pages/ModelCreationPage'
import StartPage from './pages/StartPage'
import VisualizationPage from './pages/VisualizationPage'
function App() {
  return (
    <div>
				<div className="row">
						<div className="page-header"><h2>React Router Demo</h2></div>
				</div>
				<div className="row">
						<div className="list-group">
							<Link className="list-group-item" to="/ReferringPage">ReferringPage</Link>
							<Link className="list-group-item" to="/FinishPage">FinishPage</Link>
							<Link className="list-group-item" to="/DataCollectionPage">DataCollectionPage</Link>
							<Link className="list-group-item" to="/DeliveryPage">DeliveryPage</Link>
							<Link className="list-group-item" to="/ModelCreationPage">ModelCreationPage</Link>
							<Link className="list-group-item" to="/StartPage">StartPage</Link>
							<Link className="list-group-item" to="/VisualizationPage">VisualizationPage</Link>
						</div>
						<div className="checkPage">
								<Route path="/ReferringPage" component={ReferringPage}/>
								<Route path="/FinishPage" component={FinishPage}/>
								<Route path="/DataCollectionPage" component={DataCollectionPage}/>
								<Route path="/DeliveryPage" component={DeliveryPage}/>
								<Route path="/ModelCreationPage" component={ModelCreationPage}/>
								<Route path="/StartPage" component={StartPage}/>
								<Route path="/VisualizationPage" component={VisualizationPage}/>
						</div>
				</div>
			</div>
  );
}

export default App;
