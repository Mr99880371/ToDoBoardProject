import React from "react";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import SortableItem from "../SortableItem";
import "./styles.css";

type Task = {
  id: string;
  title: string;
  description: string;
  responsibles: string[];
  dueDate: string;
  status: "ideias" | "a-fazer" | "fazendo" | "feito";
};

type ColumnsProps = {
  columnId: string;
  title: string;
  tasks: Task[];
  onDeleteTask: (columnId: string, index: number) => void;
  onEditTask: (task: Task) => void;
  activeTask: Task | null;
  handleOpenDetailsModal: (taskId: string) => void;
};

export default function Columns({ columnId, title, tasks, onDeleteTask, onEditTask, activeTask, handleOpenDetailsModal }: ColumnsProps) {

  const { setNodeRef } = useDroppable({
    id: columnId,
    data: {
      sortable: {
        containerId: columnId,
      },
    },
  });

  return (
    <div className={`column-container ${columnId}`}>
      <h2 className="column-title">{title}</h2>
      {tasks.length > 0 && (
        <h3 className="column-subtitle">
          {tasks.length > 1 ? `${tasks.length} tarefas` : '1 tarefa'}
        </h3>
      )}
      <SortableContext id={columnId} items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} data-id={columnId} data-droppable className="column-content flex flex-col gap-3 min-h-[100px]">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <SortableItem
                key={task.id}
                task={task}
                index={index}
                columnId={columnId}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                activeTask={activeTask}
                onClick={handleOpenDetailsModal}
              />
            ))
          ) : (
            <div className="text-gray-500 text-left text-sm italic mb-3">Nenhuma tarefa</div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
