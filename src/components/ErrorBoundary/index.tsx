import React, { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

interface MainState {
  hasError: boolean;
  error?: string | null;
  errorInfo?: string | null;
}

export default class ErrorBoundary extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
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
        process.env.NODE_ENV === "development" ? (
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
