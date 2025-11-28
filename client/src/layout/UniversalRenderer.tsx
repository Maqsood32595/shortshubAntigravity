import React, { Suspense } from 'react';
import { getComponent, hasComponent } from '../registry';
import { useStore } from '../core/state';
import { api } from '../connectors/api';
import { useNavigate } from 'react-router-dom';

export interface ConfigNode {
    id?: string;
    type: string;
    props?: Record<string, any>;
    children?: ConfigNode[];
    conditional?: string; // State path to check (e.g., "upload.inProgress")
}

interface Props {
    node: ConfigNode;
}

export const UniversalRenderer: React.FC<Props> = ({ node }) => {
    const state = useStore();
    const navigate = useNavigate();

    // Define auth handlers to be used by JSON layouts
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log('🔵 Registration attempt:', {
            email: data.email,
            name: data.name,
            hasPassword: !!data.password
        });

        try {
            const response = await api.post('/api/auth/register', data);
            console.log('✅ Registration successful:', response.data);
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error: any) {
            console.error('❌ Registration failed:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                message: error.message,
                code: error.code
            });

            // Handle specific error cases
            if (error.code === 'ERR_NETWORK' || !error.response) {
                alert('Network error: Unable to connect to server. Please check if the backend is running on port 5002.');
            } else if (error.response?.status === 409) {
                alert('User already exists. Please login instead.');
                navigate('/login');
            } else if (error.response?.status === 400) {
                const errorMsg = error.response?.data?.error || 'Invalid registration data';
                alert(`Registration failed: ${errorMsg}`);
            } else {
                const errorMsg = error.response?.data?.error || error.message || 'Unknown error';
                alert(`Registration failed: ${errorMsg}`);
            }
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log('🔵 Login attempt:', {
            email: data.email,
            hasPassword: !!data.password,
            apiBaseURL: api.defaults.baseURL
        });

        try {
            console.log('🌐 Sending POST to /api/auth/login...');
            const response = await api.post('/api/auth/login', data);

            console.log('📦 Login response received:', {
                status: response.status,
                statusText: response.statusText,
                hasData: !!response.data,
                hasToken: !!response.data?.token,
                hasUser: !!response.data?.user
            });

            if (response.data?.token) {
                const user = {
                    ...response.data.user,
                    token: response.data.token
                };

                localStorage.setItem('auth_token', response.data.token);
                // Update global state
                state.setUser(user);

                console.log('✅ Token saved and state updated');
                console.log('🚀 Navigating to /dashboard...');
                navigate('/dashboard');
            } else {
                console.error('❌ No token in response:', response.data);
                alert('Login failed: Server did not return authentication token');
            }
        } catch (error: any) {
            console.error('❌ Login failed:', {
                name: error.name,
                message: error.message,
                code: error.code,
                status: error.response?.status,
                statusText: error.response?.statusText,
                responseData: error.response?.data,
                stack: error.stack
            });

            // Handle specific error cases
            if (error.code === 'ERR_NETWORK' || !error.response) {
                alert('Network error: Unable to connect to server. Please check if the backend is running on port 5002.');
            } else if (error.response?.status === 401) {
                alert('Invalid email or password. Please try again.');
            } else if (error.response?.status === 400) {
                const errorMsg = error.response?.data?.error || 'Invalid login data';
                alert(`Login failed: ${errorMsg}`);
            } else {
                const errorMsg = error.response?.data?.error || error.message || 'Unknown error';
                alert(`Login failed: ${errorMsg}. Check console for details.`);
            }
        }
    };

    const handleVideoUpload = (videoId: string) => {
        console.log('✅ Video uploaded successfully:', videoId);
        alert('Video uploaded successfully!');
        navigate('/library');
    };

    // Check conditional rendering
    if (node.conditional) {
        const shouldRender = evaluateConditional(node.conditional, state);
        if (!shouldRender) return null;
    }

    // Get component from registry
    const Component = getComponent(node.type);

    // Process props (replace dataSource with actual data)
    const processedProps = processProps(node.props || {}, state, { handleRegister, handleLogin, handleVideoUpload });

    // Render children if they exist
    const children = node.children?.map((child, index) => (
        <UniversalRenderer key={child.id || index} node={child} />
    ));

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children && children.length > 0 ? (
                <Component {...processedProps}>
                    {children}
                </Component>
            ) : (
                <Component {...processedProps} />
            )}
        </Suspense>
    );
};

// Helper: Evaluate conditional (e.g., "upload.inProgress")
const evaluateConditional = (path: string, state: any): boolean => {
    const parts = path.split('.');
    let value = state;

    for (const part of parts) {
        if (value === undefined || value === null) return false;
        value = value[part];
    }

    return !!value;
};

// Helper: Process props (replace placeholders with state data)
const processProps = (props: Record<string, any>, state: any, context: any = {}): Record<string, any> => {
    const processed = { ...props };
    const { handleRegister, handleLogin } = context;

    // Handle dataSource
    if (props.dataSource) {
        const data = getDataFromSource(props.dataSource, state);
        processed.data = data;
        delete processed.dataSource;
    }

    // Handle generic event handlers (on*)
    Object.keys(props).forEach(key => {
        if (key.startsWith('on') && typeof props[key] === 'string') {
            try {
                // Check if it's a direct reference to a context function
                if (props[key] === 'handleRegister' && handleRegister) {
                    processed[key] = handleRegister;
                } else if (props[key] === 'handleLogin' && handleLogin) {
                    processed[key] = handleLogin;
                } else if (props[key] === 'handleVideoUpload' && context.handleVideoUpload) {
                    processed[key] = context.handleVideoUpload;
                } else {
                    // Create a function with access to context
                    const func = new Function('handleRegister', 'handleLogin', 'handleVideoUpload', 'event', `
                        return (${props[key]})(event);
                    `);
                    processed[key] = (e: any) => func(handleRegister, handleLogin, context.handleVideoUpload, e);
                }
            } catch (error) {
                console.warn(`Failed to evaluate ${key}:`, props[key], error);
                delete processed[key];
            }
        }
    });

    // Handle children as string
    if (props.children && typeof props.children === 'string' && !props.children.startsWith('[')) {
        // Keep string children as-is (they're text content)
        processed.children = props.children;
    }

    return processed;
};

// Helper: Get data from state or API
const getDataFromSource = (source: string, state: any): any => {
    // If it's a state key, get from state
    if (source.startsWith('state.')) {
        const key = source.replace('state.', '');
        return state[key];
    }

    // Otherwise it's an API endpoint (handled by component)
    return source;
};
