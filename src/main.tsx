import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { BrowserRouter } from "react-router";
import App from './App.tsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider
        client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>

)
