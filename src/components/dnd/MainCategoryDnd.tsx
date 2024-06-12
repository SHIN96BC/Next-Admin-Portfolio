'use client'

import Box from "@mui/material/Box";
import {ChangeEvent, ReactNode, useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";
import SubCategoryDnd from "@Src/components/dnd/SubCategoryDnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {getMainItemStyle, getMainListStyle, Reorder} from "@Src/utils/dnd/category";
import styled from "@mui/material/styles/styled";
import {SelectedCategory} from "@Src/features/classification/category/CategoryManagement";

const CategoryItem = styled(Box)(() => ({
  padding: '8px 0px 8px 0px',
  cursor: 'pointer',
  position: 'relative',
}));

type CategoryItemContainerProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  children: ReactNode
}

const CategoryItemContainer = ({ children }: CategoryItemContainerProps): ReactNode => {
  return (
    <Box>
      <input hidden type="checkbox" />
      { children }
    </Box>
  )
};

type MoveArgs = {
  startIndex: number;
  endIndex: number;
};

export interface CategoryDnd {
  id: string;
  content: string;
  subCategories: CategoryDnd[] | [];
}

type Props = {
  categories: CategoryDnd[];
  selectedCategory: SelectedCategory;
  handleChangeCategory: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeCategories: (categories: CategoryDnd[]) => void;
  // category
};

export default function MainCategoryDnd({ categories, selectedCategory, handleChangeCategory, handleChangeCategories }: Props) {

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ type, source, destination }: DropResult) => {
    console.log('>>> source', source);
    console.log('>>> destination', destination);

    // dropped outside the list
    if (!destination) {
      //console.log("no-change");
      return;
    }

    if (type === "CATEGORY") {
      const newCategories = Reorder(
        categories,
        source.index,
        destination.index
      );

      handleChangeCategories(newCategories);
    } else {

      const subCategories = Reorder(
        categories[parseInt(type, 10)].subCategories,
        source.index,
        destination.index
      );

      const newCategories = JSON.parse(JSON.stringify(categories));

      newCategories[type].subCategories = subCategories;

      handleChangeCategories(newCategories);
    }
  };

  // --- requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // react-beautiful-dnd를 렌더링 하기전에 requestAnimationFrame를 먼저 초기화 시켜야 함
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  // --- requestAnimationFrame 초기화 END

  console.log('selectedCategoryId', selectedCategory);

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      // onDragUpdate={onDragUpdate}
    >
      <Droppable droppableId="droppable" type="CATEGORY">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getMainListStyle(snapshot.isDraggingOver)}
          >
            {categories.map((category, index) => (
              <Draggable
                key={category.id}
                draggableId={category.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getMainItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <CategoryItem
                      bgcolor={ selectedCategory.id === category.id ? '#1677ff' : '' }
                      color={ selectedCategory.id === category.id ? '#FFF' : '' }
                    >
                      <input
                        {...provided.dragHandleProps}
                        id={category.id}
                        className="CATEGORY"
                        value={category.id}
                        type="checkbox"
                        style={{
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          position: 'absolute',
                          margin: 0,
                          // cursor: 'pointer',
                          top: 0,
                        }}
                        onChange={handleChangeCategory}
                      />
                      {category.content}
                      <span {...provided.dragHandleProps}>
                        <DragIndicatorIcon sx={{ float: 'left' }}/>
                        {/*<FontAwesomeIcon*/}
                        {/*  icon={"grip-vertical"}*/}
                        {/*  style={{ float: "left" }}*/}
                        {/*/>*/}
                      </span>
                    </CategoryItem>
                    <SubCategoryDnd
                      selectedCategory={selectedCategory}
                      categoryNum={index}
                      category={category}
                      handleChangeCategoryId={handleChangeCategory}
                    />
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