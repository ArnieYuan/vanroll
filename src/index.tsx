import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import enUS from 'antd/lib/locale-provider/en_US';
import App from './App';
import { register } from './serviceWorker';
import i18next from 'i18next';
import { i18nClient } from './i18n';

const antResources = {
	ko: koKR,
	'ko-KR': koKR,
	en: enUS,
	'en-US': enUS,
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

i18nClient();

ReactDOM.render(
	<ConfigProvider locale={antResources[i18next.language]}>
		<App />
	</ConfigProvider >,
	document.getElementById('root'));

register();
