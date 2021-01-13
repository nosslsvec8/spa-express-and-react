import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: !!error,
            errorInfo
        })
    }

    render() {
        if (this.state.hasError) {
            return <h2>Oops, something went wrong!</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
