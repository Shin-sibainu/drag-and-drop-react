import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";

/* 連番で10個生成 */
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

/* 並び替え */
const reorder = (list, statIndex, endIndex) => {};

/* スタイル */
const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  widht: 250,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid} 0`,
  background: isDragging ? "lightgreen" : "grey",

  ...draggableStyle, //あらかじめ用意されている。
});

function App() {
  const [items] = useState(getItems(10));
  // useEffect(() => {
  //   console.log(items);
  // }, []);
  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    reorder(items, result.source.index, result.destination.index);
  };

  return (
    <DragDropContext>
      <Droppable droppableId="droppable" onDragEnd={onDragEnd}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
