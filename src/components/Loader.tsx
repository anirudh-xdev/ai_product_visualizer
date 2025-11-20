import React from 'react';

/**
 * Custom Loader Component
 * 
 * A flexible, modern loader component with multiple variants and sizes.
 * 
 * @example
 * // Basic spinner
 * <Loader />
 * 
 * // With text
 * <Loader text="Loading..." subtext="Please wait" />
 * 
 * // Different variants
 * <Loader variant="dots" size="lg" />
 * <Loader variant="gradient" size="xl" text="Generating..." />
 * 
 * // Full screen loader
 * <Loader fullScreen text="Loading application..." />
 * 
 * // Pre-configured loaders
 * <SpinnerLoader size="md" />
 * <ButtonLoader /> // For buttons
 * <InlineLoader /> // For inline use
 */

export type LoaderVariant = 'spinner' | 'dots' | 'pulse' | 'bars' | 'gradient';
export type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';

interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  text?: string;
  subtext?: string;
  className?: string;
  fullScreen?: boolean;
}

const sizeClasses: Record<LoaderSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const textSizeClasses: Record<LoaderSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

export const Loader: React.FC<LoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  text,
  subtext,
  className = '',
  fullScreen = false,
}) => {
  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <div className="absolute inset-0 border-4 border-base-300 rounded-full"></div>
            <div className={`absolute inset-0 border-4 border-transparent border-t-brand-primary rounded-full animate-spin`}></div>
          </div>
        );

      case 'dots':
        return (
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${sizeClasses[size]} bg-brand-primary rounded-full animate-pulse`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s',
                }}
              ></div>
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <div className="absolute inset-0 bg-brand-primary rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 bg-brand-secondary rounded-full animate-pulse"></div>
          </div>
        );

      case 'bars':
        return (
          <div className="flex items-end gap-1 h-12">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 bg-linear-to-t from-brand-primary to-brand-secondary rounded-t animate-pulse"
                style={{
                  height: `${60 + i * 15}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.8s',
                }}
              ></div>
            ))}
          </div>
        );

      case 'gradient':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <div className="absolute inset-0 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full animate-spin opacity-75 blur-sm"></div>
            <div className="absolute inset-1 bg-white rounded-full"></div>
            <div className="absolute inset-2 bg-linear-to-r from-brand-primary to-brand-secondary rounded-full animate-pulse"></div>
          </div>
        );

      default:
        return null;
    }
  };

  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {renderLoader()}
      {text && (
        <p className={`mt-4 font-semibold text-content-100 ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
      {subtext && (
        <p className={`mt-2 text-content-300 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {subtext}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

// Pre-configured loader components for common use cases
export const SpinnerLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="spinner" {...props} />
);

export const DotsLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="dots" {...props} />
);

export const PulseLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="pulse" {...props} />
);

export const BarsLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="bars" {...props} />
);

export const GradientLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="gradient" {...props} />
);

// Button loader (small spinner for buttons)
export const ButtonLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`animate-spin h-5 w-5 text-white ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Inline loader (for small spaces)
export const InlineLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex items-center ${className}`}>
    <div className="w-4 h-4 border-2 border-base-300 border-t-brand-primary rounded-full animate-spin"></div>
  </div>
);

