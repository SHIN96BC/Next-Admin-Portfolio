// a little function to help us with reordering the result
export function Reorder<T> (list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const getMainListStyle = (isDraggingOver: boolean) => ({
  // background: isDraggingOver ? "#f5f5f5" : "",
  padding: 8,
  width: '100%'
});

const grid = 6;
export const getMainItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    textAlign: "",

    // change background colour if dragging
    // background: isDragging ? "#f5f5f5" : "",
    border: isDragging ? '1px solid #bfbfbf': '',

    // styles we need to apply on draggables
    ...draggableStyle
  };
};

export const getSubItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: `0px ${grid * 2}px 0px ${grid * 2}px`,
    margin: `0 0 ${grid}px 0`,
    textAlign: "",

    // change background colour if dragging
    // background: isDragging ? "#f5f5f5" : "",
    // border: isDragging ? '1px solid #bfbfbf': '',

    // styles we need to apply on draggables
    ...draggableStyle
  };
};

export const getSubListStyle = (isDraggingOver: boolean) => ({
  // background: isDraggingOver ? "#1677ff" : "",
  border: isDraggingOver ? '1px dashed #bfbfbf': '',
  padding: 4,
  width: '100%'
});