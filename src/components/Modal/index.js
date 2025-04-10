import React, { useState, useEffect } from "react";
import "./styles.css";
import Tag from '../TagInput';

export default function Modal({ isOpen, onClose, addTask, taskToEdit, onEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responsibles, setResponsibles] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    if (isOpen && taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setResponsibles(taskToEdit.responsibles || []);
      setDueDate(taskToEdit.dueDate || '');
    } else if (isOpen) {
      setTitle("");
      setDescription("");
      setResponsibles([]);
      setDueDate("");
    }
    console.log('meus dados', taskToEdit);
  }, [isOpen, taskToEdit]);
  
  if (!isOpen) return null;
  
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "O título é obrigatório.";
    if (!description.trim()) newErrors.description = "A descrição é obrigatória.";
    if (responsibles.length < 3) newErrors.responsibles = "Adicione pelo menos 3 responsáveis.";
    if (!dueDate) {
      newErrors.dueDate = "A data limite é obrigatória.";
    } else if (new Date(dueDate) < new Date(new Date().toDateString())) {
      newErrors.dueDate = "A data limite não pode ser no passado.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const normalizedStatus = (taskToEdit?.status || "ideias").toLowerCase().replace(" ", "-");
      const newTask = {
        title,
        description,
        responsibles,
        dueDate,
        status: normalizedStatus,
        id: taskToEdit?.id || Date.now(),
      };

      console.log("🧪 Submetendo tarefa:", newTask);
  
      if (taskToEdit && onEdit) {
        onEdit(newTask); 
      } else {
        addTask(newTask); 
      }
  
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2 className="modal-title">Adicionar tarefa</h2>
        <p className="modal-subtitle">Preencha os detalhes da nova tarefa</p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="title" className="shields-label">Título da tarefa</label>
          <input
            id="title"
            type="text"
            className={`input-field ${errors.title ? 'input-error' : ''}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
            }}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}

          <label htmlFor="description" className="shields-label">Descrição da tarefa</label>
          <textarea
            id="description"
            className={`textarea-field ${errors.description ? 'input-error' : ''}`}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
            }}
          ></textarea>
          {errors.description && <p className="error-text">{errors.description}</p>}

          <label htmlFor="responsibles" className="shields-label">Responsáveis</label>
          <Tag id="responsibles" value={responsibles} error={!!errors.responsibles} onChange={(val) => {
            setResponsibles(val);
            if (errors.responsibles) setErrors(prev => ({ ...prev, responsibles: undefined }));
          }} />
          {errors.responsibles && <p className="error-text">{errors.responsibles}</p>}

          <div className="dueDate-container">
            <label htmlFor="dueDate" className="shields-label">Data limite</label>
            <input
              id="dueDate"
              type="date"
              className={`input-field !w-[204px] !h-10 ${errors.dueDate ? 'input-error' : ''}`}
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                if (errors.dueDate) setErrors(prev => ({ ...prev, dueDate: undefined }));
              }}
            />
            {errors.dueDate && <p className="error-text">{errors.dueDate}</p>}
          </div>

          <button type="submit" className="submit-button">
            {taskToEdit ? 'Salvar alterações' : 'Adicionar tarefa'}
          </button>
        </form>

      </div>
    </div>
  );
}
