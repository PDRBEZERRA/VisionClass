import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const userService = {
  // Listar todos os usuários
  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // Buscar usuário por ID
  async getById(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Criar novo usuário
  async create(data: Partial<User>): Promise<User> {
    const response = await api.post<User>('/users', data);
    return response.data;
  },

  // Atualizar usuário
  async update(id: string, data: Partial<User>): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  // Deletar usuário
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
