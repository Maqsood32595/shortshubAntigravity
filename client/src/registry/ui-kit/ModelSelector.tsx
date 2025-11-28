import React, { useState } from 'react';

interface Model {
    id: string;
    name: string;
    provider: string;
    maxDuration: number;
    resolution: string;
    icon: string;
}

interface Props {
    value: string;
    onChange: (modelId: string) => void;
}

const MODELS: Model[] = [
    {
        id: 'veo2',
        name: 'Veo 2',
        provider: 'Google',
        maxDuration: 10,
        resolution: '1080p',
        icon: '🎬'
    },
    {
        id: 'runway-gen3',
        name: 'Gen-3 Alpha',
        provider: 'Runway',
        maxDuration: 10,
        resolution: '1080p',
        icon: '🎯'
    },
    {
        id: 'kling',
        name: 'Kling AI',
        provider: 'Kuaishou',
        maxDuration: 10,
        resolution: '1080p',
        icon: '⚡'
    },
    {
        id: 'luma',
        name: 'Dream Machine',
        provider: 'Luma AI',
        maxDuration: 5,
        resolution: '720p',
        icon: '💫'
    }
];

export const ModelSelector: React.FC<Props> = ({ value, onChange }) => {
    const selectedModel = MODELS.find(m => m.id === value) || MODELS[0];

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
                AI Model
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                {MODELS.map((model) => (
                    <option key={model.id} value={model.id}>
                        {model.icon} {model.name} - {model.provider} (Max: {model.maxDuration}s, {model.resolution})
                    </option>
                ))}
            </select>
            <div className="mt-2 text-sm text-gray-400">
                <p>✨ <strong>{selectedModel.name}</strong> by {selectedModel.provider}</p>
                <p>📊 Max Duration: {selectedModel.maxDuration}s • Resolution: {selectedModel.resolution}</p>
            </div>
        </div>
    );
};

export default ModelSelector;
