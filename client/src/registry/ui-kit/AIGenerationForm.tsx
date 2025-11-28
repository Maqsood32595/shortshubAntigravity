import React, { useState, useEffect } from 'react';
import { api } from '../../connectors/api';
import ModelSelector from './ModelSelector';
import PromptOptimizer from './PromptOptimizer';
import GenerationOptions from './GenerationOptions';
import GenerationQueue from './GenerationQueue';

interface GenerationJob {
    id: string;
    model: string;
    prompt: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    videoUrl?: string;
    error?: string;
    createdAt: string;
}

export const AIGenerationForm: React.FC = () => {
    const [model, setModel] = useState('veo2');
    const [prompt, setPrompt] = useState('');
    const [options, setOptions] = useState({
        duration: 5,
        aspectRatio: '16:9' as '16:9' | '9:16' | '1:1',
        style: 'Cinematic',
        cameraMovement: 'Static',
        quality: 'balanced' as 'fast' | 'balanced' | 'quality'
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [jobs, setJobs] = useState<GenerationJob[]>([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get('/api/ai/jobs');
            // Ensure we always set an array
            setJobs(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            // Set empty array on error
            setJobs([]);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            alert('Please enter a prompt');
            return;
        }

        setIsGenerating(true);
        try {
            const response = await api.post('/api/ai/generate', {
                model,
                prompt,
                options
            });

            // Add new job to list
            setJobs(prev => [response.data.job, ...prev]);

            // Clear prompt
            setPrompt('');

            alert('Generation started! Check the queue on the right.');
        } catch (error: any) {
            console.error('Generation failed:', error);
            alert(error.response?.data?.error || 'Failed to start generation');
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePromptAccept = (optimizedPrompt: string) => {
        setPrompt(optimizedPrompt);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
            {/* Left Panel - Generation Controls */}
            <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Create AI Video</h2>

                {/* Model Selection */}
                <ModelSelector value={model} onChange={setModel} />

                {/* Prompt Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Video Prompt
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the video you want to create... e.g., 'A majestic lion walking through golden savanna at sunset'"
                        rows={6}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400">
                            {prompt.length} characters
                        </span>
                        <PromptOptimizer prompt={prompt} onAccept={handlePromptAccept} />
                    </div>
                </div>

                {/* Generation Options */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Generation Options</h3>
                    <GenerationOptions value={options} onChange={setOptions} />
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    {isGenerating ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⚙️</span>
                            Generating...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <span>🎬</span>
                            Generate Video
                        </span>
                    )}
                </button>

                <div className="mt-4 p-3 bg-blue-900 bg-opacity-30 border border-blue-700 rounded text-sm text-blue-200">
                    <p className="font-medium mb-1">💡 Tip:</p>
                    <p>Use the Prompt Optimizer to enhance your prompts with more detail and cinematic language!</p>
                </div>
            </div>

            {/* Right Panel - Queue & Results */}
            <div className="lg:col-span-3 bg-gray-800 rounded-lg p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Generation Status</h2>
                <GenerationQueue jobs={jobs} onRefresh={fetchJobs} />
            </div>
        </div>
    );
};

export default AIGenerationForm;
