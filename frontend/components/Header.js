import Link from 'next/link';

import { CloseSVG, PersonAddSVG, CheckSVG } from '../icons';

const Header = ({ currentUser }) => {
	const links = [
		!currentUser && { label: 'Registrar', href: '/auth/signup', svg: <PersonAddSVG /> },
		!currentUser && { label: 'Entrar', href: '/auth/signin', svg: <CheckSVG /> },
		currentUser && { label: 'Sair', href: '/auth/signout', svg: <CloseSVG /> }
	]
		.filter((linkConfig) => linkConfig)
		.map(({ label, href, svg }) => {
			return (
				<Link key={href} href={href}>
					<a className="btn btn__icon">
						{svg}
						{label}
					</a>
				</Link>
			);
		});

	return (
		<header className="header">
			<h3 className="header__h2">SUPERO :: Repositório de Livros</h3>
			<div className="form__action">{links}</div>
		</header>
	);
};

export default Header;
