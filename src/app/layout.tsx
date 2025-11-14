import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Header from '@quizer/components/header/header';
import RootProvider from '@quizer/providers/root-provider';
import './globals.css';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@quizer/ui/theme';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'English Quiz Generator - AI-Powered Language Tests',
  description:
    'Create personalized English quizzes with AI-generated questions. Practice grammar, vocabulary, and more at any difficulty level.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={roboto.variable}>
      <body>
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: false }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RootProvider>
              <Header />
              <main>{children}</main>
            </RootProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
