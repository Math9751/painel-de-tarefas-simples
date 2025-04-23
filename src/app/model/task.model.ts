export interface Subtask {
    descricao: string;
    completo: boolean;
  }
  
  export interface Task {
    completed: boolean;
    id: number; // Identificador único
    titulo: string;
    descricao: string;
    status: 'Pendente' | 'Concluída';
    prazo?: Date; // Data de entrega (opcional)
    subtarefas: Subtask[];
  }
  