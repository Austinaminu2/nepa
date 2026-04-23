import React, { useState, useEffect } from 'react';
import ClassificationResult from '../components/ClassificationResult';
import { announceToScreenReader } from '../utils/accessibility';

interface ClassificationResultData {
  id: string;
  category: string;
  confidence: number;
  description: string;
  timestamp: Date;
}

const IndexPage: React.FC = () => {
  const [results, setResults] = useState<ClassificationResultData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  const handleClassify = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to classify');
      announceToScreenReader('Please enter text to classify', 'assertive');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call to classification service
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to classify text');
      }

      const data = await response.json();

      const newResult: ClassificationResultData = {
        id: Date.now().toString(),
        category: data.category || 'Unknown',
        confidence: data.confidence || 0,
        description: data.description || 'Classification completed',
        timestamp: new Date(),
      };

      setResults(prev => [newResult, ...prev]);
      setInputText('');

      // Announce the new result
      announceToScreenReader(
        `New classification result: ${newResult.category} with ${Math.round(newResult.confidence * 100)}% confidence.`,
        'polite'
      );

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      announceToScreenReader(`Classification failed: ${errorMessage}`, 'assertive');
    } finally {
      setLoading(false);
    }
  };

  const handleClearResults = () => {
    setResults([]);
    announceToScreenReader('All classification results cleared', 'polite');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">NEPA Classification Tool</h1>
        <p className="text-center text-muted-foreground">
          Enter text to get AI-powered classification results
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <section
          className="mb-8"
          aria-labelledby="input-section"
        >
          <h2 id="input-section" className="sr-only">Text Input Section</h2>

          <div className="bg-card border border-border rounded-lg p-6 shadow">
            <label
              htmlFor="classification-input"
              className="block text-lg font-semibold mb-4"
            >
              Enter Text to Classify
            </label>

            <textarea
              id="classification-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste text here for classification..."
              className="w-full h-32 p-3 border border-border rounded-md bg-background text-foreground resize-none focus:ring-2 focus:ring-ring focus:border-transparent"
              aria-describedby="input-help"
            />

            <p id="input-help" className="text-sm text-muted-foreground mt-2">
              Enter any text you want to classify. The AI will analyze it and provide a category with confidence score.
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleClassify}
                disabled={loading}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-describedby="classify-button-help"
              >
                {loading ? 'Classifying...' : 'Classify Text'}
              </button>

              {results.length > 0 && (
                <button
                  onClick={handleClearResults}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                  aria-describedby="clear-button-help"
                >
                  Clear Results
                </button>
              )}
            </div>

            <div className="sr-only" id="classify-button-help">
              Click to send the text for classification analysis
            </div>
            <div className="sr-only" id="clear-button-help">
              Click to remove all classification results from the display
            </div>
          </div>
        </section>

        <section aria-labelledby="results-section">
          <h2 id="results-section" className="sr-only">Classification Results</h2>
          <ClassificationResult
            results={results}
            loading={loading}
            error={error}
          />
        </section>
      </main>
    </div>
  );
};

export default IndexPage;