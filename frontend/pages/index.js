import buildClient from '../api/buildClient';

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Você está logado</h1> : <h1>Você não está logado</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data: currentUser } = await client.get('/api/users/currentuser');

  return currentUser;
};

export default LandingPage;
