"use client";
import "./PlayHome.css";
import VideoCard from "../../components/VideoCard/VideoCard";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface PlayHomeProps {
  videoArr: any;
  isReordermode: Boolean;
  order: any;
  setOrder: any;
  lastPlayedId: any;
}

const PlayHome: React.FC<PlayHomeProps> = ({
  isReordermode,
  videoArr,
  order,
  setOrder,
  lastPlayedId,
}) => {
  const router = useRouter();
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setOrder((items: any) => {
        const oldIndex = items.findIndex((i: any) => i.id === active.id);
        const newIndex = items.findIndex((i: any) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleThumbnailClick = (idx: number) => {
    router.push(`/playvideo?id=${videoArr[idx].id}`);
  };

  if (!isReordermode) {
    return (
      <div className="tiles-cnt">
        {videoArr.map((i: any, index: any) => {
          return (
            <VideoCard
              key={index}
              src={i.thumbnail}
              title={i.title}
              onClick={() => handleThumbnailClick(index)}
              lastPlayed={i.id === lastPlayedId}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="scrollable-dnd">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={order} strategy={rectSortingStrategy}>
            <div className="tiles-cnt--scrollable">
              {order.map((i: any, index: number) => (
                <SortableVideoCard
                  key={index}
                  id={i.id}
                  src={i.thumbnail}
                  title={i.title}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay />
        </DndContext>
      </div>
    );
  }
};

const SortableVideoCard = (props: any) => {
  const sortable = useSortable({ id: props.id });
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <VideoCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={props.id}
      src={props.src}
      title={props.title}
    />
  );
};

export default PlayHome;
