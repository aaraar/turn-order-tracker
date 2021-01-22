// Components
import Head from 'next/head';
import TurnOrder from '@/organisms/TurnOrder';
import Header from '@/organisms/Header';
import Footer from '@/organisms/Footer';

// Styles
import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Turn Order Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <TurnOrder />
      </main>

      <Footer />
    </div>
  );
}
