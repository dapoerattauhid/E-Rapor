import React from "react";

type Props = { children: React.ReactNode };

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h2 className="text-lg font-bold">Terjadi error pada halaman</h2>
          <pre className="mt-4 whitespace-pre-wrap bg-red-50 p-4 rounded">{String(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children as JSX.Element;
  }
}

export default ErrorBoundary;
