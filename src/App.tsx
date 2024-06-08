import { hot } from 'react-hot-loader/root'; // before React
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Title from './components/layout/Title';
import { LocalStorageProvider } from './contexts/LocalStorageContext';
import { ImageMapEditor } from './editors';
import Presenter from './presenter';
import { ImageGallery } from './gallery';

function App() {
	const basename = process.env.REACT_APP_BASENAME || '';
	return (
		<LocalStorageProvider>
			<div className="rde-main">
				<Router basename={basename}>
					<Routes>
						<Route path="/" element={<><div className="rde-title"><Title /></div><ImageGallery /></>} />
						<Route path="/edit" element={<ImageMapEditor />} />
						<Route path="/present" element={<Presenter />} />
					</Routes>
				</Router>
			</div>
		</LocalStorageProvider>
	);
}

export default hot(App);
