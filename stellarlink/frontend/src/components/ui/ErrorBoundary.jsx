import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Button from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled Application Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#FAF8FF] p-4 text-[#0F172A]">
          <div className="w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 text-center shadow-xl space-y-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 mx-auto">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[#0F172A]">
                Application Error Detected
              </h2>
              <p className="text-xs text-[#64748B] leading-relaxed">
                StellarLink encountered an unexpected runtime exception. The error log has been captured safely.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E2E8F0] text-left text-xs font-mono text-rose-600 overflow-x-auto max-h-32">
                {this.state.error.message}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={this.handleReload}
                className="w-full flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Page
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
