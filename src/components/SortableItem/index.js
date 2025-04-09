import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from '../Card';

export default function SortableItem({ task, index, columnId, onDeleteTask, onEditTask, activeTask, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    data: { sortable: { containerId: columnId, index } },
  });

  const isDragging = activeTask?.id === task.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "12px",
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        id={task.id}
        title={task.title}
        description={task.description}
        dueDate={task.dueDate}
        responsibles={task.responsibles}
        status={task.status}
        onClick={() => onClick(task.id)}
        onDelete={() => onDeleteTask(columnId, index)}
        onEdit={() => onEditTask(task)}
      />
    </div>
  );
}
