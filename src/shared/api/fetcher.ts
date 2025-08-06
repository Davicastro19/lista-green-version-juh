/* eslint-disable @typescript-eslint/no-unused-vars */
// utils/httpService.ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
import Cookies from 'js-cookie';
import { BASE_URL, TOKEN } from '../constants/urls';

interface RequestOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  queryParams?: Record<string, string | number | boolean>;
}

class HttpService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(endpoint: string, queryParams?: Record<string, string | number | boolean>): string {
    // Cria a URL com base no BASE_URL já configurado
    const url = new URL(`${this.baseUrl}${endpoint}`);

    // Adiciona os  parâmetros de consulta (se houver)
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }



  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers, body, queryParams } = options;

    const token = Cookies.get(TOKEN); // Use o nome do cookie que armazena o token

    const url = this.buildUrl(endpoint, queryParams);


    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', // Inclui o token, se disponível
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, fetchOptions);

    if (response.status === 401) {
      // Se o status for 401 (Unauthorized), remove o cookie e redireciona
      Cookies.remove(TOKEN); // Remove o cookie do token
      if (window.location.pathname !== '/' && window.location.pathname !== '/login') {
        window.location.href = '/'; // Redireciona para a página inicial
      }
      throw new Error('Unauthorized - Redirecting to login');
    }
    if (!response.ok) {
      let errorMessage = `Erro HTTP ${response.status}`;
      try {
        const errorJson = await response.json();
        errorMessage = errorJson.message || errorMessage;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (_: any) {
        // Se não for um JSON válido, não faz nada
      }
      throw new Error(errorMessage);
    }


    return response.json() as Promise<T>;
  }

  get<T>(endpoint: string, queryParams?: Record<string, string | number | boolean>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', queryParams });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

const httpService = new HttpService(BASE_URL);
export default httpService;
