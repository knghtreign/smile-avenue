import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Phone, RefreshCw } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Smile Avenue Dental Clinic rendering error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#DCE8B8] text-[#122342] flex flex-col items-center justify-center p-6 text-center font-general">
          <div className="max-w-md bg-white p-8 rounded-3xl shadow-xl border-2 border-[#122342]/10 space-y-4">
            <h2 className="text-2xl font-black font-satoshi text-[#122342]">
              {CLINIC_INFO.name}
            </h2>
            <p className="text-sm font-medium text-[#122342]/80">
              We encountered a temporary display issue. You can refresh the page or reach our Sector 44 clinic directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#122342] text-white text-xs font-black uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#F4E94A] text-[#122342] text-xs font-black uppercase tracking-wider hover:bg-[#ebd931] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
