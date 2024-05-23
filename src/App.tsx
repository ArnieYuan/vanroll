import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Title from './components/layout/Title';
import FlowContainer from './containers/FlowContainer';
import { FiberEditor, ImageMapEditor } from './editors';

function App() {
	return (
		<div className="rde-main">
			<Helmet>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="Interactive video presenter. Developed with react.js, ant.design, fabric.js "
				/>
				<link rel="manifest" href="./manifest.json" />
				<link rel="shortcut icon" href="./favicon.ico" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
				<title>Vanroll - Interactive Video Presenter</title>
			</Helmet>
			<Router>
				<div className="rde-title">
					<Title />
				</div>
				<Routes>
					<Route path="/edit" element={<FlowContainer><div className="rde-content"><ImageMapEditor /></div></FlowContainer>} />
					<Route path="/adjust" element={<FlowContainer><div className="rde-content"><FiberEditor /></div></FlowContainer>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
