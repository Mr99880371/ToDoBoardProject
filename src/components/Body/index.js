import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import './styles.css';
import MainButton from '../MainButton';
import Modal from '../Modal';
import Columns from '../Columns';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Card from '../Card';

export default function Body() {
  const containerRef = useRef(null);
  const [activeTask, setActiveTask] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("toDo-columns");
    const parsed = saved ? JSON.parse(saved) : {};
    return {
      ideias: parsed.ideias || [],
      "a-fazer": parsed["a-fazer"] || [],
      fazendo: parsed.fazendo || [],
      feito: parsed.feito || [],
    };
  });

  useEffect(() => {
    localStorage.setItem("toDo-columns", JSON.stringify(columns));
  }, [columns]);

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 1
    );
  };

  useEffect(() => {
    updateScrollButtons();
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => {
    setIsOpen(false);
    setTaskToEdit(null);
  };

  const handleAddTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: newTask.id || Date.now(),
    };
    setColumns(prev => ({
      ...prev,
      ideias: [...(prev.ideias || []), taskWithId]
    }));
  };

  const handleEditTask = (updatedTask) => {
    console.log("Recebido para editar:", updatedTask);
    setColumns(prevColumns => {
      const newColumns = { ...prevColumns };
      for (const columnId in newColumns) {
        const taskIndex = newColumns[columnId].findIndex(task => task.id === updatedTask.id);
        if (taskIndex !== -1) {
          newColumns[columnId][taskIndex] = updatedTask;
          break;
        }
      }
      return newColumns;
    });
    setTaskToEdit(null);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setTimeout(() => setIsOpen(true), 0);
  };

  const handleDeleteTask = (columnId, index) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: prev[columnId].filter((_, i) => i !== index),
    }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
  
    const sourceContainer = active.data.current?.sortable?.containerId;
    const sourceIndex = active.data.current?.sortable?.index;
  
    if (!sourceContainer || sourceIndex === undefined) return;
  
    const task = columns[sourceContainer][sourceIndex];
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourceContainer = active.data.current?.sortable?.containerId;
    const destinationContainer = over.data.current?.sortable?.containerId;
    const sourceIndex = active.data.current?.sortable?.index;
    const destinationIndex = over.data.current?.sortable?.index;

    if (sourceContainer == null || destinationContainer == null) return;

    if (sourceContainer === destinationContainer) {
      setColumns(prev => ({
        ...prev,
        [sourceContainer]: arrayMove(prev[sourceContainer], sourceIndex, destinationIndex),
      }));
    } else {
      setColumns(prev => {
        const sourceItems = [...prev[sourceContainer]];
        const destItems = [...prev[destinationContainer]];
        const [movedTask] = sourceItems.splice(sourceIndex, 1);
        movedTask.status = destinationContainer;
        destItems.splice(destinationIndex, 0, movedTask);
        return {
          ...prev,
          [sourceContainer]: sourceItems,
          [destinationContainer]: destItems,
        };
      });
    }
    setActiveTask(null);
  };

  return (
    <>
      <MainButton label="Adicionar tarefa" onClick={handleOpenModal} />
      {isOpen && ( 
        <Modal 
          isOpen={isOpen} 
          onClose={handleCloseModal} 
          addTask={handleAddTask}
          taskToEdit={taskToEdit}
          onEdit={handleEditTask}
        />

      )}
      <div className="board-container relative">
        <div className="absolute right-4 flex gap-2 z-20">
          <button
            onClick={scrollLeft}
            className={`p-2 rounded-full transition-colors duration-300 shadow ${
              canScrollLeft ? "bg-white" : "bg-gray-200"
            }`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={scrollRight}
            className={`p-2 rounded-full transition-colors duration-300 shadow ${
              canScrollRight ? "bg-white" : "bg-gray-200"
            }`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div
            ref={containerRef}
            className="board-scroll"
          >
            <div className="flex gap-8 min-w-fit mx-auto px-8">
              <Columns columnId="ideias" title="Idéias" tasks={columns.ideias} onDeleteTask={handleDeleteTask} onEditTask={handleEdit} activeTask={activeTask} />
              <Columns columnId="a-fazer" title="A fazer" tasks={columns["a-fazer"]} onDeleteTask={handleDeleteTask} onEditTask={handleEdit} activeTask={activeTask} />
              <Columns columnId="fazendo" title="Fazendo" tasks={columns.fazendo} onDeleteTask={handleDeleteTask} onEditTask={handleEdit} activeTask={activeTask} />
              <Columns columnId="feito" title="Feito" tasks={columns.feito} onDeleteTask={handleDeleteTask} onEditTask={handleEdit} activeTask={activeTask} />
            </div>
          </div>

          <DragOverlay>
            {activeTask ? (
              <Card
                id={activeTask.id}
                title={activeTask.title}
                description={activeTask.description}
                dueDate={activeTask.dueDate}
                responsibles={activeTask.responsibles}
                status={activeTask.status}
                onClick={() => {}}
                onDelete={() => {}}
                onEdit={() => {}}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
