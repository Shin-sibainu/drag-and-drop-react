import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";

function App() {
  return (
    <DragDropContext>
      <Droppable droppableId="droppable">
        <Draggable></Draggable>
      </Droppable>
    </DragDropContext>
  );
}

export default App;
