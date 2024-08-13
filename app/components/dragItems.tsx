"use client";
// DraggableItems.js
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FaMinus } from "react-icons/fa6";
import { TbEqual } from "react-icons/tb";

export type Input = {
  id: string;
  label: string;
  icon: React.ReactElement;
  type: string;
};

const INPUT_OPTIONS: Input[] = [
  {
    id: "input-short-answer",
    label: "Short answer",
    icon: <FaMinus />,
    type: "text-input",
  },
  {
    id: "input-long-answer",
    label: "Long answer",
    icon: <TbEqual />,
    type: "text-input",
  },
];

type DraggableItemProps = {
  id: string;
  label: string;
  icon: React.ReactElement;
  type: string;
};

const DraggableItem = ({ id, label, icon, type }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `drag-btn-${id}`,
    data: {
      type,
      label,
      id,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="flex align-center gap-2 p-1 radius-2 shadow-2xl bg-card"
      style={style}
      {...attributes}
      {...listeners}
    >
      {icon}
      <p>{label}</p>
    </div>
  );
};

export function DraggableItems() {
  return (
    <div className="p-2 flex flex-col gap-1">
      {INPUT_OPTIONS.map((item) => (
        <DraggableItem
          key={item.id}
          icon={item.icon}
          id={item.id}
          label={item.label}
          type={item.type}
        />
      ))}
    </div>
  );
}
