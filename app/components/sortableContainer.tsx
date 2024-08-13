import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

import useStore from "@/app/store/dragItemsStore";
import { SortableItem } from "@/app/components/sortableItem";

export function SortableBucketContainer() {
  const sortableItems = useStore((state) => state.sortableItems);
  const { setNodeRef, isOver } = useDroppable({ id: "droppable_container" });

  return (
    <SortableContext
      id="sortable_bucket"
      items={sortableItems.map((item) => item.uuid)}
      strategy={verticalListSortingStrategy}
    >
      <ul
        ref={setNodeRef}
        className={`bg-black ${isOver && "border-dashed border-red-400"} w-[80%] h-[80%] `}
      >
        {sortableItems.map((item) => (
          <SortableItem id={item.id} />
        ))}
      </ul>
    </SortableContext>
  );
}
