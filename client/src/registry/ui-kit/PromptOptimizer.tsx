import React, { useState } from 'react';
import { api } from '../../connectors/api';

interface Props {
    prompt: string;
    onAccept: (optimizedPrompt: string) => void;
}

export const PromptOptimizer: React.FC<Props> = ({ prompt, onAccept }) => {
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizedPrompt, setOptimizedPrompt] = useState<string | null>(null);
    const [showComparison, setShowComparison] = useState(false);

    const handleOptimize = async () => {
        if (!prompt.trim()) {
            alert('Please enter a prompt first');
            return;
        }

        setIsOptimizing(true);
        try {
            const response = await api.post('/api/ai/optimize-prompt', { prompt });
            setOptimizedPrompt(response.data.optimizedPrompt);
            setShowComparison(true);
        } catch (error) {
            console.error('Failed to optimize prompt:', error);
            alert('Failed to optimize prompt. Please try again.');
        } finally {
            setIsOptimizing(false);
        }
    };

    const handleAccept = () => {
        if (optimizedPrompt) {
            onAccept(optimizedPrompt);
            setShowComparison(false);
            setOptimizedPrompt(null);
        }
    };

    const handleReject = () => {
        setShowComparison(false);
        setOptimizedPrompt(null);
    };

    return (
        <div className="mb-4">
            <button
                onClick={handleOptimize}
                disabled={isOptimizing || !prompt.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
                <span>🪄</span>
                {isOptimizing ? 'Optimizing...' : 'Optimize Prompt'}
            </button>

            {showComparison && optimizedPrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Prompt Optimization</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Original Prompt
                                </label>
                                <div className="bg-gray-700 rounded p-3 text-gray-300">
                                    {prompt}
                                </div>
                            </div>

                            <div className="border-t border-gray-600 pt-4">
                                <label className="block text-sm font-medium text-green-400 mb-2">
                                    ✨ Optimized Prompt
                                </label>
                                <div className="bg-gray-700 rounded p-3 text-white">
                                    {optimizedPrompt}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleAccept}
                                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            >
                                ✓ Accept
                            </button>
                            <button
                                onClick={handleReject}
                                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                            >
                                ✗ Keep Original
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptOptimizer;
