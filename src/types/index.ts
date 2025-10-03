export type UserRole = 'admin' | 'professor' | 'aluno';

export interface User {
  id: string;
  nome: string;
  email: string;
  matricula: string;
  role: UserRole;
  foto?: string;
  cpf?: string;
  turmas?: string[];
}

export interface Turma {
  id: string;
  nome: string;
  ano: string;
  periodo: string;
  professorId: string;
  alunosIds: string[];
}

export interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  foto: string;
  turmaId: string;
  email: string;
  cpf: string;
}

export interface AvaliacaoComportamental {
  id: string;
  alunoId: string;
  professorId: string;
  data: Date;
  assiduidade: number;
  participacao: number;
  responsabilidade: number;
  sociabilidade: number;
  observacoes?: string;
}

export interface Questao {
  id: string;
  disciplina: string;
  tema: string;
  dificuldade: 'facil' | 'medio' | 'dificil';
  tipo: 'multipla_escolha' | 'verdadeiro_falso';
  enunciado: string;
  alternativas?: string[];
  alternativaCorreta?: number;
  respostaCorreta?: boolean;
  tags: string[];
  professorId: string;
}

export interface Simulado {
  id: string;
  nome: string;
  turmasIds: string[];
  questoesIds: string[];
  dataInicio: Date;
  dataFim: Date;
  duracao: number;
  professorId: string;
  status: 'rascunho' | 'publicado' | 'finalizado';
}

export interface RespostaSimulado {
  id: string;
  simuladoId: string;
  alunoId: string;
  respostas: { [questaoId: string]: number | boolean };
  dataInicio: Date;
  dataFinalizacao?: Date;
  nota?: number;
  acertos?: number;
}

export interface DashboardStats {
  totalAlunos: number;
  totalProfessores: number;
  turmasAtivas: number;
  simuladosAtivos: number;
}
