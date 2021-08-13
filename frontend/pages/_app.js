import buildClient from '../api/buildClient';
import { Header, Layout } from '../components';

import '../styles/main.scss';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<Layout>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />
		</Layout>
	);
};

AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser');

	let pageProps = {};

	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);
	}

	return {
		pageProps,
		...data
	};
};

export default AppComponent;
