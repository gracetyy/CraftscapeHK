// Real HTTP API Service to replace mock backend/api.ts
import type { Craft, Product, Event, Order, Artisan, MessageThread } from '../types';
import { authService } from './authService';

const API_BASE_URL = 'http://localhost:3001/api';

// Helper function for making HTTP requests
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options?.headers as Record<string, string>,
        };

        // Add authentication token if available
        const token = authService.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            if (response.status === 401 && authService.isAuthenticated()) {
                // Token might be expired, logout user
                authService.logout();
                window.location.reload();
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        const method = (options?.method || 'GET').toString().toUpperCase();
        const isPublicGet = method === 'GET' && !endpoint.includes('/orders') && !endpoint.includes('/messages') && !endpoint.includes('/ai/');
        // Fallback to mock data only for GET requests to public resources
        if (isPublicGet) {
            return fallbackToMockData<T>(endpoint);
        }
        throw error;
    }
}

// Fallback to constants.ts data when backend is unavailable
async function fallbackToMockData<T>(endpoint: string): Promise<T> {
    console.warn(`Falling back to mock data for ${endpoint}`);
    
    // Dynamic import to avoid circular dependencies
    const { CRAFTS, PRODUCTS, EVENTS, ORDERS, ARTISANS, MESSAGE_THREADS } = await import('../constants');
    
    if (endpoint === '/crafts') return CRAFTS as T;
    if (endpoint === '/products') return PRODUCTS as T;
    if (endpoint === '/events') return EVENTS as T;
    if (endpoint === '/orders') return ORDERS as T;
    if (endpoint === '/artisans') return ARTISANS as T;
    if (endpoint === '/messages') return MESSAGE_THREADS as T;
    
    throw new Error(`No fallback data available for ${endpoint}`);
}

// API Functions
export const getCrafts = async (): Promise<Craft[]> => {
    return apiRequest<Craft[]>('/crafts');
};

export const getProducts = async (): Promise<Product[]> => {
    return apiRequest<Product[]>('/products');
};

export const getEvents = async (): Promise<Event[]> => {
    return apiRequest<Event[]>('/events');
};

export const getOrders = async (): Promise<Order[]> => {
    return apiRequest<Order[]>('/orders');
};

export const getArtisans = async (): Promise<Artisan[]> => {
    return apiRequest<Artisan[]>('/artisans');
};

export const getMessageThreads = async (): Promise<MessageThread[]> => {
    return apiRequest<MessageThread[]>('/messages');
};

/**
 * AI Image Generation API
 * This calls the backend endpoint that securely handles the AI API key
 */
export const generateCraftImageApi = async (craftName: string, userPrompt: string): Promise<string> => {
    try {
        const response = await apiRequest<{ imageUrl: string }>('/ai/generate-image', {
            method: 'POST',
            body: JSON.stringify({ craftName, userPrompt }),
        });
        
        return response.imageUrl;
    } catch (error) {
        console.error('Failed to generate craft image:', error);
        throw new Error('Failed to generate image. Please try again later.');
    }
};
