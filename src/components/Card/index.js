import React from 'react';
import './styles.css';
import { X, Pencil } from "lucide-react";
import { getDueDateInfo } from '../../utils/getDueDateInfo';
import clsx from "clsx";

interface CardProps {
    id: string;
    title: string;
    description: string;
    responsibles: string[];
    dueDate: string;
    status: "ideias" | "a-fazer" | "fazendo" | "feito";
    onClick: () => void;
    onDelete: () => void;
    onEdit: () => void;
  }

export default function Card({
    id,
    title,
    description,
    responsibles,
    dueDate,
    status,
    onClick,
    onDelete,
    onEdit
  } : CardProps) {
    const { formattedDate, statusText, colorClass, isOverdue } = 
      getDueDateInfo(dueDate);

      console.log("Card renderizado com ID:", id);

    const isDone = status === "feito";
    const prazoLabel = isDone
     ? (isOverdue ? "Fora do prazo"
      : "Dentro do prazo") 
      : statusText;
    const prazoColor = isDone
     ? (isOverdue 
      ? "text-red-500" 
      : "text-green-600") 
      : colorClass;

    return (
    <div  
      key={id}
      className={clsx(
        "card-container",
        isDone && "border border-green-500"
      )}
      onClick={onClick}
    >
      
      <div className="card-buttons">
        {onEdit && (
          <button
            className="p-1 text-gray-400 hover:text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Pencil size={16} />
          </button>
        )}
        <button
          className="p-1 text-gray-400 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <X size={16} />
        </button>
      </div>
      
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>

      <div className="card-dueDate">
        <span className="text-gray-500">Data limite: {formattedDate}</span>
        <span className={clsx("ml-2 font-medium", prazoColor)}>{prazoLabel}</span>
      </div>

      <div className="card-responsibles">
        {responsibles.map((name, index) => (
          <span key={index} className="responsible-tag">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}