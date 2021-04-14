import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import Render from './components/Render';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Render/>
        </QueryClientProvider>
    );
}

export default App;
