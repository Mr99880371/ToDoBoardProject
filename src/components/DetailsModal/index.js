import React, { useEffect, useState } from "react";
import "./styles.css";
import clsx from "clsx";
import { getDueDateInfo } from "../../utils/getDueDateInfo";

export default function DetailsModal({ id, modalOpen, onClose, status }) {
  const [taskData, setTaskData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!modalOpen || !id) return;

    async function fetchTaskDetails() {
      setIsLoading(true);
      try {
        const response = await fetch("https://api.npoint.io/21c80c25ed65b6f3484f");
        const data = await response.json();
    
        // Transforma ID do card em número (1, 2, 3...)
        const cardIndex = Number(id) - 1;
    
        // Garante que mesmo com mais cards que dados, os dados se repitam circularmente
        const mappedTask = data[cardIndex % data.length];
    
        setTimeout(() => {
          setTaskData(mappedTask);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Erro ao buscar detalhes da tarefa:", error);
        setIsLoading(false);
      }
    
      if (!modalOpen) {
        setTaskData(null);
      }
    }
  
    fetchTaskDetails();
  }, [modalOpen, id]);

  console.log(taskData);

  const { statusText, colorClass, isOverdue } = getDueDateInfo(taskData?.date);
  const isDone = status === "feito";
  const prazoLabel = isDone
    ? isOverdue ? "Fora do prazo" : "Dentro do prazo"
    : statusText;
  const prazoColor = isDone
    ? isOverdue ? "text-red-500" : "text-green-600"
    : colorClass;

  if (!modalOpen) return null;

  return (
    <div key={id} className="details-modal-overlay">
      <div className="details-modal-content">
        <button className="details-modal-close" onClick={onClose}>✕</button>

        {isLoading ? (
          <div className="details-modal-loading">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500" />
          </div>
        ) : (
          <>
            <h2 className="details-modal-title">{taskData?.title || "Sem título"}</h2>
            <p className="details-modal-subtitle">Responsáveis: {taskData?.responsible?.join(", ")}</p>

            <div className="details-modal-dueDate">
              <span className="text-gray-500">Data limite: {taskData?.date ? new Date(taskData.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : "Sem data"}</span>
              <span className={clsx("ml-2 font-medium", prazoColor)}>{prazoLabel}</span>
            </div>

            <div className="details-modal-text">
              <p>{taskData?.description || "Sem descrição disponível."}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
