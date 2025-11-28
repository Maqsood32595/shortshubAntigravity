
// Auto-generated hook for Video Upload
// Source: features/video-upload.yaml

import { useStore } from '../../core/state';
import { api } from '../../connectors/api';

export const useVideoUpload = () => {
  const store = useStore();
  
  // State selectors
  const uploads = (store as any).uploads;
  const uploadProgress = (store as any).uploadProgress;
  
  // Actions
  
  const uploadVideo = async (...args: any[]) => {
    try {
      const result = await api.post('/api/video-upload/uploadVideo', ...args);
      return result.data;
    } catch (error) {
      console.error('uploadVideo failed:', error);
      throw error;
    }
  };
  
  return {
    uploads,
    uploadProgress,
    uploadVideo
  };
};
