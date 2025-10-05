import { User, Turma, Aluno, Questao, Simulado, DashboardStats } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    nome: 'Admin Sistema',
    email: 'admin@escola.com',
    matricula: 'ADM001',
    role: 'admin',
    cpf: '000.000.000-00'
  },
  {
    id: '2',
    nome: 'Prof. Maria Silva',
    email: 'maria@escola.com',
    matricula: 'PROF001',
    role: 'professor',
    cpf: '111.111.111-11',
    turmas: ['1', '2']
  },
  {
    id: '3',
    nome: 'João Santos',
    email: 'joao@escola.com',
    matricula: 'ALU001',
    role: 'aluno',
    cpf: '222.222.222-22',
    turmas: ['1']
  }
];

export const mockTurmas: Turma[] = [
  {
    id: '1',
    nome: '3º Ano A - Ensino Médio',
    ano: '2025',
    periodo: 'Manhã',
    professorId: '2',
    alunosIds: Array.from({ length: 40 }, (_, i) => `aluno-${i + 1}`),
    desempenho: 85,
  },
  {
    id: '2',
    nome: '2º Ano B - Ensino Médio',
    ano: '2025',
    periodo: 'Tarde',
    professorId: '2',
    alunosIds: Array.from({ length: 35 }, (_, i) => `aluno-${i + 41}`),
    desempenho: 70,
  }
];

const nomesBrasileiros = [
  'Ana Silva', 'Bruno Santos', 'Carlos Oliveira', 'Daniela Costa', 'Eduardo Lima',
  'Fernanda Souza', 'Gabriel Alves', 'Helena Martins', 'Igor Ferreira', 'Juliana Rocha',
  'Lucas Pereira', 'Mariana Gomes', 'Nicolas Ribeiro', 'Olivia Cardoso', 'Pedro Carvalho',
  'Rafaela Dias', 'Samuel Barbosa', 'Thiago Mendes', 'Valentina Pinto', 'William Araujo',
  'Aline Moreira', 'Bernardo Castro', 'Camila Fernandes', 'Diego Rodrigues', 'Elisa Soares',
  'Fabio Monteiro', 'Giovana Teixeira', 'Henrique Nunes', 'Isabela Ramos', 'João Vieira',
  'Larissa Correia', 'Mateus Cardoso', 'Natalia Cavalcanti', 'Otavio Campos', 'Patricia Duarte',
  'Rafael Azevedo', 'Sophia Freitas', 'Tiago Cunha', 'Vanessa Moura', 'Yuri Nogueira'
];

export const mockAlunos: Aluno[] = Array.from({ length: 40 }, (_, i) => ({
  id: `aluno-${i + 1}`,
  nome: nomesBrasileiros[i % nomesBrasileiros.length],
  matricula: `ALU${String(i + 1).padStart(3, '0')}`,
  foto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`,
  turmaId: '1',
  email: `aluno${i + 1}@escola.com`,
  cpf: `${String(i + 1).padStart(3, '0')}.${String(i + 1).padStart(3, '0')}.${String(i + 1).padStart(3, '0')}-${String(i % 100).padStart(2, '0')}`,
  desempenho: 40 + Math.floor(Math.random() * 60), // Valores entre 40 e 99
}));

export const questoes: Questao[] = [
  {
    id: 'q1',
    disciplina: 'Matemática',
    tema: 'Equações do 2º Grau',
    dificuldade: 'medio',
    tipo: 'multipla_escolha',
    enunciado: 'Qual é o valor de x na equação x² - 5x + 6 = 0?',
    alternativas: ['x = 1 ou x = 6', 'x = 2 ou x = 3', 'x = -2 ou x = -3', 'x = 1 ou x = -6', 'x = 0 ou x = 5'],
    alternativaCorreta: 1,
    tags: ['álgebra', 'equações', 'fundamental'],
    professorId: '2'
  },
  {
    id: 'q2',
    disciplina: 'Português',
    tema: 'Figuras de Linguagem',
    dificuldade: 'facil',
    tipo: 'verdadeiro_falso',
    enunciado: 'A metáfora é uma figura de linguagem que consiste na comparação implícita entre dois elementos.',
    respostaCorreta: true,
    tags: ['literatura', 'linguagem'],
    professorId: '2'
  },
  {
    id: 'q3',
    disciplina: 'Física',
    tema: 'Cinemática',
    dificuldade: 'dificil',
    tipo: 'multipla_escolha',
    enunciado: 'Um corpo em movimento retilíneo uniforme percorre 100m em 5s. Qual sua velocidade média?',
    alternativas: ['10 m/s', '15 m/s', '20 m/s', '25 m/s', '30 m/s'],
    alternativaCorreta: 2,
    tags: ['mecânica', 'movimento', 'ENEM'],
    professorId: '2'
  }
];

export const simulados: Simulado[] = [
  {
    id: 's1',
    nome: 'Simulado ENEM - Matemática e Português',
    turmasIds: ['1'],
    questoesIds: ['q1', 'q2', 'q3'],
    dataInicio: new Date('2025-01-15'),
    dataFim: new Date('2025-01-22'),
    duracao: 180,
    professorId: '2',
    status: 'publicado'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalAlunos: 450,
  totalProfessores: 32,
  turmasAtivas: 18,
  simuladosAtivos: 5
};

