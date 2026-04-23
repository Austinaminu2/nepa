import React, { useState, useEffect } from 'react';
import { announceToScreenReader } from '../utils/accessibility';

interface ClassificationResult {
  id: string;
  category: string;
  confidence: number;
  description: string;
  timestamp: Date;
}

interface ClassificationResultProps {
  results: ClassificationResult[];
  loading: boolean;
  error: string | null;
}

const ClassificationResult: React.FC<ClassificationResultProps> = ({
  results,
  loading,
  error
}) => {
  const [previousResultsCount, setPreviousResultsCount] = useState(0);

  useEffect(() => {
    if (results.length !== previousResultsCount) {
      const newResultsCount = results.length - previousResultsCount;
      if (newResultsCount > 0) {
        announceToScreenReader(
          `New classification results loaded. ${newResultsCount} new result${newResultsCount > 1 ? 's' : ''} available.`,
          'polite'
        );
      }
      setPreviousResultsCount(results.length);
    }
  }, [results.length, previousResultsCount]);

  useEffect(() => {
    if (error) {
      announceToScreenReader(`Error loading classification results: ${error}`, 'assertive');
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      announceToScreenReader('Loading classification results...', 'polite');
    } else {
      announceToScreenReader('Classification results loaded.', 'polite');
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="classification-results" aria-live="polite" aria-atomic="true">
        <div className="loading" role="status" aria-label="Loading classification results">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-center mt-2">Loading classification results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="classification-results" aria-live="assertive" aria-atomic="true">
        <div className="error" role="alert" aria-label={`Error: ${error}`}>
          <p className="text-red-500 text-center">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="classification-results">
      <h2 className="text-2xl font-bold mb-4">Classification Results</h2>

      {/* Live region for dynamic updates */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {results.length > 0
          ? `${results.length} classification result${results.length > 1 ? 's' : ''} displayed.`
          : 'No classification results available.'
        }
      </div>

      {results.length === 0 ? (
        <p className="text-center text-muted-foreground">No classification results available.</p>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <article
              key={result.id}
              className="border border-border rounded-lg p-4 bg-card"
              aria-labelledby={`result-${result.id}-category`}
              aria-describedby={`result-${result.id}-description`}
            >
              <header className="flex justify-between items-start mb-2">
                <h3
                  id={`result-${result.id}-category`}
                  className="text-lg font-semibold text-card-foreground"
                >
                  {result.category}
                </h3>
                <span
                  className="text-sm text-muted-foreground"
                  aria-label={`Confidence: ${Math.round(result.confidence * 100)}%`}
                >
                  {Math.round(result.confidence * 100)}% confidence
                </span>
              </header>

              <p
                id={`result-${result.id}-description`}
                className="text-muted-foreground mb-2"
              >
                {result.description}
              </p>

              <time
                className="text-xs text-muted-foreground"
                dateTime={result.timestamp.toISOString()}
                aria-label={`Classified on ${result.timestamp.toLocaleString()}`}
              >
                {result.timestamp.toLocaleString()}
              </time>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassificationResult;