import { hot } from 'react-hot-loader/root'; // before React
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Title from './components/layout/Title';
import ModeContext from './contexts/ModeContext';
import { FiberEditor, ImageMapEditor } from './editors';

function App() {
	const basename = process.env.REACT_APP_BASENAME || '';

	return (
		<div className="rde-main">
			<Router basename={basename}>
				<div className="rde-title">
					<Title />
				</div>
				<Routes>
					<Route path="/edit" element={<ModeContext.Provider><div className="rde-content"><ImageMapEditor /></div></ModeContext.Provider>} />
					<Route path="/present" element={<ModeContext.Provider><div className="rde-content"><FiberEditor /></div></ModeContext.Provider>} />
				</Routes>
			</Router>
		</div>
	);
}

export default hot(App);
