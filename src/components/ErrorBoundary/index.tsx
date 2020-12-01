import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo }: any = this.state;
    if (hasError) {
      const errorDetails =
        process.env.NODE_ENV === 'development' ? (
          <details className="preserve-space">
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        ) : null;

      // You can render any custom fallback UI
      return (
        <div className="error-container">
          <h2 className="error">An unexpected error has occurred.</h2>
          {errorDetails}
        </div>
      );
    }

    return this.props.children;
  }
}
