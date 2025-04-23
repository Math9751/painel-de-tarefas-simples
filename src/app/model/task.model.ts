export interface Subtask {
    descricao: string;
    completo: boolean;
  }
  
  export interface Task {
    id: number; // Identificador único
    titulo: string;
    descricao: string;
    status: 'Pendente' | 'Concluída';
    prazo?: Date; // Data de entrega (opcional)
    subtarefas: Subtask[];
  }
  