'use client'

import {Draggable, Droppable} from "@hello-pangea/dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {getSubItemStyle, getSubListStyle} from "@Src/utils/dnd/category";
import {CategoryDnd} from "@Src/components/dnd/MainCategoryDnd";
import {ChangeEvent} from "react";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import {SelectedCategory} from "@Src/features/classification/category/CategoryManagement";

const CategorySubItem = styled(Box)(() => ({
  padding: '8px 12px 8px 12px',
  cursor: 'pointer',
  position: 'relative',
}));

interface Props {
  selectedCategory: SelectedCategory;
  category: CategoryDnd;
  categoryNum: number;
  handleChangeCategoryId: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SubCategoryDnd({ selectedCategory, category, categoryNum, handleChangeCategoryId }: Props) {
  return (
    <Droppable droppableId={`droppable${category.id}`} type={`${categoryNum}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getSubListStyle(snapshot.isDraggingOver)}
        >
          {category.subCategories.map((subCategory, index) => {
            return (
              <Draggable
                key={`${categoryNum}${index}`}
                draggableId={`${categoryNum}${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...getSubItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      ),
                      // backgroundColor: selectedCategory.id === subCategory.id ? '#1677ff' : '',
                      // color: selectedCategory.id === subCategory.id ? '#FFF' : '',
                    }}
                  >
                    <Box sx={{
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      position: 'relative',
                      py: 1,
                      backgroundColor: selectedCategory.id === subCategory.id ? '#1677ff' : '',
                      color: selectedCategory.id === subCategory.id ? '#FFF' : '',
                      border: snapshot.isDragging ? '1px solid #bfbfbf': '',
                    }}>
                      <input
                        id={subCategory.id}
                        className={`${categoryNum}`}
                        value={subCategory.id}
                        type="checkbox"
                        style={{
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          position: 'absolute',
                          margin: 0,
                          cursor: 'pointer',
                          top: 0,
                        }}
                        onChange={handleChangeCategoryId}
                      />
                      <span {...provided.dragHandleProps}>
                      <DragIndicatorIcon sx={{ float: 'left' }}/>
                        {/*<FontAwesomeIcon*/}
                        {/*  icon={"grip-vertical"}*/}
                        {/*  style={{ float: "left" }}*/}
                        {/*/>*/}
                    </span>
                      {subCategory.content}
                    </Box>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}