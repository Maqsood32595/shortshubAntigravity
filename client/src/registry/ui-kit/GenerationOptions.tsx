import React from 'react';

interface Options {
    duration: number;
    aspectRatio: '16:9' | '9:16' | '1:1';
    style: string;
    cameraMovement: string;
    seed?: string;
    quality: 'fast' | 'balanced' | 'quality';
}

interface Props {
    value: Options;
    onChange: (options: Options) => void;
}

const STYLES = [
    'Cinematic',
    'Realistic',
    'Anime',
    'Cartoon',
    'Abstract',
    'Documentary',
    'Horror',
    'Fantasy'
];

const CAMERA_MOVEMENTS = [
    'Static',
    'Pan Left',
    'Pan Right',
    'Zoom In',
    'Zoom Out',
    'Tracking',
    'Orbit',
    'Handheld'
];

export const GenerationOptions: React.FC<Props> = ({ value, onChange }) => {
    const [showAdvanced, setShowAdvanced] = React.useState(false);

    const updateOption = (key: keyof Options, val: any) => {
        onChange({ ...value, [key]: val });
    };

    return (
        <div className="space-y-6">
            {/* Duration */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration: {value.duration}s
                </label>
                <input
                    type="range"
                    min="2"
                    max="10"
                    step="1"
                    value={value.duration}
                    onChange={(e) => updateOption('duration', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>2s</span>
                    <span>10s</span>
                </div>
            </div>

            {/* Aspect Ratio */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {(['16:9', '9:16', '1:1'] as const).map((ratio) => (
                        <button
                            key={ratio}
                            onClick={() => updateOption('aspectRatio', ratio)}
                            className={`px-4 py-2 rounded-lg border transition-colors ${value.aspectRatio === ratio
                                    ? 'bg-blue-600 border-blue-500 text-white'
                                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            {ratio}
                        </button>
                    ))}
                </div>
            </div>

            {/* Style */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Style
                </label>
                <select
                    value={value.style}
                    onChange={(e) => updateOption('style', e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2"
                >
                    {STYLES.map((style) => (
                        <option key={style} value={style}>
                            {style}
                        </option>
                    ))}
                </select>
            </div>

            {/* Camera Movement */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Camera Movement
                </label>
                <select
                    value={value.cameraMovement}
                    onChange={(e) => updateOption('cameraMovement', e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2"
                >
                    {CAMERA_MOVEMENTS.map((movement) => (
                        <option key={movement} value={movement}>
                            {movement}
                        </option>
                    ))}
                </select>
            </div>

            {/* Advanced Settings */}
            <div>
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                    {showAdvanced ? '▼' : '▶'} Advanced Settings
                </button>

                {showAdvanced && (
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-700">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Quality/Speed Trade-off
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {(['fast', 'balanced', 'quality'] as const).map((quality) => (
                                    <button
                                        key={quality}
                                        onClick={() => updateOption('quality', quality)}
                                        className={`px-3 py-1 text-sm rounded border transition-colors ${value.quality === quality
                                                ? 'bg-blue-600 border-blue-500 text-white'
                                                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                            }`}
                                    >
                                        {quality.charAt(0).toUpperCase() + quality.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Seed (optional, for reproducibility)
                            </label>
                            <input
                                type="text"
                                value={value.seed || ''}
                                onChange={(e) => updateOption('seed', e.target.value)}
                                placeholder="Leave empty for random"
                                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerationOptions;
