import Header from '../components/Header'
import Main from '../components/Main'
import Info from '../components/Info'

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main />
      <Info />
    </div>
  );
}