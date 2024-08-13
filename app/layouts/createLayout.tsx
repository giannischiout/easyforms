/* eslint-disable no-console */
"use client";
import { ReactNode } from "react";
import { Button } from "@nextui-org/button";
import { EyeIcon } from "@nextui-org/shared-icons";
import { MdPublishedWithChanges } from "react-icons/md";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import useStore from "@/app/store/dragItemsStore";
import { DraggableItems } from "@/app/components/dragItems";

export default function CreateLayout({ children }: { children: ReactNode }) {
  const items = useStore((state) => state.sortableItems);
  const addItem = useStore((state) => state.addItem);
  const reorderItems = useStore((state) => state.reorderItems);
  const handleDragEnd = (event: DragEndEvent) => {
    const data = event.active.data.current;

    const { active, over } = event;

    if (data?.sortable?.containerId === "sortable_bucket") {
      if (active?.id === over?.id) return;

      const oldIndex = items.findIndex((item) => item.uuid === active?.id);
      const newIndex = items.findIndex((item) => item.uuid === over?.id);

      reorderItems(oldIndex, newIndex);

      return;
    }
    if (data && event.over?.id === "droppable_container") {
      addItem(data);
    }
  };

  return (
    <DndContext id="dnd-provider" onDragEnd={handleDragEnd}>
      <div className="w-full h-[100vh] flex flex-col">
        <Nav />
        <main className="flex flex-1 h-[calc(100vh-60px)] overflow-hidden bg-white">
          <DragSidebar />
          <section className=" w-full h-full flex items-center justify-center overflow-y-auto">
            {children}
          </section>
          <aside className="w-[250px] bg-background">aside</aside>
        </main>
      </div>
    </DndContext>
  );
}

export function Nav() {
  return (
    <nav className="shadow p-2 h-[60px] bg-background border-b border-backgroundBorder flex items-center justify-end">
      <div className="flex gap-2">
        <Button size="sm" startContent={<EyeIcon />}>
          preview
        </Button>
        <Button
          color="primary"
          size="sm"
          startContent={<MdPublishedWithChanges />}
        >
          publish
        </Button>
      </div>
    </nav>
  );
}

export function DragSidebar() {
  return (
    <aside className="w-[250px] bg-background">
      <DraggableItems />
    </aside>
  );
}
