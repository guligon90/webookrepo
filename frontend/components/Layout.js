import Head from 'next/head';

const Layout = ({ children }) => {
	return (
		<main className="layout">
			<Head>
				<title>SUPERO | Book Repository App</title>
			</Head>
			{children}
		</main>
	);
};

export default Layout;
