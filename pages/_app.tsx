import '../styles/globals.css'
import React, { FC , StrictMode} from 'react';
import type { AppProps } from 'next/app';
import styled, { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UiKitProvider } from 'ui-kit';
import { AppBar, AppNav } from 'src/layout';
import { LoginModal } from 'src/features/login';
import { QuizModal } from 'src/features/quiz';
import { RootStoreProvider } from 'src/store';
import { ApiContextProvider } from 'src/context/ApiContext';

const Html = styled.div``;

const Body = styled.main.attrs(() => ({ className: 'min-h-screen flex flex-col' }))``;

const Content = styled.article.attrs(() => ({ className: 'flex grow relative' }))``;

const Navigation = styled.aside.attrs(() => ({ className: 'max-h-screen sticky top-0 left-0' }))``;

const Header = styled.header.attrs(() => ({ className: 'block' }))``;

const Footer = styled.footer.attrs(() => ({ className: 'block' }))``;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (fAttempts: number, error: any) => fAttempts < 1 && error.response.status !== 403
    }
  }
});

const theme = {};

const App: FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RootStoreProvider hydrationData={pageProps.hydrationData}>
          <ApiContextProvider>
            <UiKitProvider>
              <ThemeProvider theme={theme}>
                <Html id="root">
                  <Body>
                    <Header><AppBar /></Header>
                    <Content>
                      <Navigation><AppNav /></Navigation>
                      <Component {...pageProps} />
                    </Content>
                    <Footer>footer</Footer>
                    <LoginModal />
                    <QuizModal />
                  </Body>
                </Html>
              </ThemeProvider>
            </UiKitProvider>
          </ApiContextProvider>
        </RootStoreProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

export default App;
