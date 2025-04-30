// pages/_app.js
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Add the SpeedInsights component to track performance */}
      <SpeedInsights />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
