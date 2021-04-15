import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import RenderContainer from './containers/RenderContainer';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RenderContainer/>
        </QueryClientProvider>
    );
}

export default App;
