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
        const response = await fetch("https://api.npoint.io/21c80c25ed65b6f3484f"); // obtém todos
        const data = await response.json();
        console.log("dd", data);
        // Normalização dos IDs para sequência baseada na ordem do array
        const normalized = data.map((item, index) => ({
          ...item,
          id: String(index + 1)
        }));

        console.log("ID recebido:", id);
        console.log("IDs normalizados:", normalized.map(t => t.id));

        // Busca a tarefa com o ID equivalente ao do card clicado
        const task = normalized.find(task => task.id === String(id));
        setTimeout(() => {
          setTaskData(task);
          setIsLoading(false); // garante um tempinho do loader
        }, 800);
      } catch (error) {
        console.error("Erro ao buscar detalhes da tarefa:", error);
        setIsLoading(false);
      } 
      
      if (!modalOpen) {
        setTaskData(null); // limpa ao fechar
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
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500" />
          </div>
        ) : (
          <>
            <h2 className="details-modal-title">{taskData?.title || "Sem título"}</h2>
            <p className="details-modal-subtitle">Responsáveis: {taskData?.responsible?.join(", ")}</p>

            <div className="flex justify-between items-center border border-dashed rounded-full px-4 py-1 text-sm mt-4">
              <span className="text-gray-500">Data limite: {taskData?.date}</span>
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
