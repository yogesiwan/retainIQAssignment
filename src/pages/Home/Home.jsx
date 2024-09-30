import React, { useState } from "react";
import "./Home.css";
import { CiSettings, CiCreditCard1, CiImageOn } from "react-icons/ci";
import { LuShirt } from "react-icons/lu";
import { IoFlashOutline } from "react-icons/io5";
import { GiPaperWindmill } from "react-icons/gi";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";
import { RiDeleteBin3Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaCheckCircle } from "react-icons/fa";

const Home = () => {
  // State variables
  const [states, setStates] = useState([{ id: Date.now(), variants: ["."] }]); // Array of states with their variants
  const [variantCount, setVariantCount] = useState(1); // Number of variants per state
  const [isHoveredId, setIsHoveredId] = useState(null); // ID of the hovered state for UI effects
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the visibility of the image selection modal
  const [selectedVariant, setSelectedVariant] = useState(null); // Currently selected variant for updates
  const [idx, setidx] = useState(0); // Index of the selected state for image updates
  const [varidx, setvaridx] = useState(0); // Index of the selected variant for image updates
  const [showVarRemove, setShowVarRemove] = useState(-1); // Controls visibility of the variant removal options

  // Sample images to choose from for variants
  const imageOptions = [
    ".",
    "https://cdn.marvel.com/u/prod/marvel/i/mg/3/e0/661e9b6428e34/standard_incredible.jpg",
    "https://cdn.marvel.com/u/prod/marvel/i/mg/3/50/537ba56d31087/standard_incredible.jpg",
    "https://cdn.marvel.com/u/prod/marvel/i/mg/9/30/538cd33e15ab7/standard_incredible.jpg",
    "https://cdn.marvel.com/u/prod/marvel/i/mg/5/c0/537ba730e05e0/standard_incredible.jpg",
    "https://cdn.marvel.com/u/prod/marvel/i/mg/1/c0/537ba2bfd6bab/standard_incredible.jpg",
    "https://cdn.marvel.com/u/prod/marvel/i/mg/6/b0/662c2568c6e0f/standard_incredible.jpg",
    "https://cdn.marvel.com/u/prod/marvel/i/mg/6/90/54ad7297b0a59/standard_incredible.jpg",
    "https://cdn.marvel.com/u/prod/marvel/i/mg/c/10/537ba5ff07aa4/standard_incredible.jpg",
    "https://cdn.marvel.com/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/standard_incredible.jpg",
  ];
  const showAlert = (message) => {
    const alertBox = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = message; // Set custom alert message
    alertBox.style.display = "flex"; // Show the custom alert box

    // Automatically hide the alert box after 2 seconds
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 700);
  };
  // Function to add a new state (row) with empty variants
  const addState = () => {
    const lastStateVariantsLength =
      states.length > 0 ? states[states.length - 1].variants.length : 0; // Get the length of the last state's variants
    const newVariants = Array(lastStateVariantsLength).fill("."); // Create new variants initialized to "."
    setStates([...states, { id: Date.now(), variants: newVariants }]); // Add new state to the list
    showAlert("New state added!");
  };

  // Function to remove a specific state (row) based on its ID
  const removeState = (id) => {
    if(states.length==1){
      showAlert("Ek to rehne do ")
    }
    else{
    setStates(states.filter((state) => state.id !== id)); // Filter out the state with the given ID
    showAlert("State removed!");
    }
  };

  // Function to add a new variant (column) to each state
  const addVariant = () => {
    setStates(
      states.map((state) => ({
        ...state,
        variants: [...state.variants, "."], // Add an empty string to the variants array of each state
      }))
    );
    setVariantCount(variantCount + 1); // Increment the variant count
    showAlert("Variant added!");
  };

  // Function to remove a specific variant (column) from a state
  const removeVariant = (stateId, variantIndex) => {
    setStates(
      states.map((state) =>
        state.id === stateId
          ? {
              ...state,
              variants: state.variants.filter(
                (_, index) => index !== variantIndex // Remove the variant at the specified index
              ),
            }
          : state
      )
      
    );
    showAlert("Variant removed!");
    
  };

  // Function to open the modal for image selection
  const openImageSelector = (index, variantIndex) => {
    setidx(index); // Set the index of the state
    setvaridx(variantIndex); // Set the index of the variant
    setIsModalOpen(true); // Open the modal
  };

  // Function to set the selected image to the corresponding variant
  const setAvatar = (image) => {
    let varIndex = varidx; // Capture the current variant index
    setStates(
      states.map((state, index) =>
        index === idx
          ? {
              ...state,
              variants: state.variants.map(
                (variant, vIndex) => (vIndex === varIndex ? image : variant) // Update the selected variant with the new image
              ),
            }
          : state
      )
    );
    setIsModalOpen(false); // Close the modal after selection
  };

  // Function to close the modal
  const closeImageSelector = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Function to handle the drag-and-drop functionality
  const onDragEnd = (result) => {
    if (!result.destination) return; // Exit if there is no destination

    const reorderedStates = Array.from(states); // Create a copy of the states array
    const [removed] = reorderedStates.splice(result.source.index, 1); // Remove the dragged state from its original position
    reorderedStates.splice(result.destination.index, 0, removed); // Add the removed state to its new position
    setStates(reorderedStates); // Update the state with the new order
  };

  // Functions to show/hide variant removal options
  const varRemoveShowfn = (i) => {
    setShowVarRemove(i); // Show the removal options for the specified variant index
  };

  const varRemoveCancelfn = () => {
    setShowVarRemove(-1); // Hide the removal options
  };

  // Function to remove a variant and update the state
  const varRemovefn = (variantIndex) => {
    setStates(
      states.map((state) => ({
        ...state,
        variants: state.variants.filter((_, index) => index !== variantIndex), // Remove the specified variant
      }))
    );
    setVariantCount(variantCount - 1); // Decrement the variant count
    varRemoveCancelfn(); // Close the variant removal options
  };

  return (
    <div className="main-container">
      <div id="custom-alert" className="alert-box" style={{ display: 'none' }}>
        <FaCheckCircle className="check-icon" /> 
        <div className="alert-content">
          <p id="alert-message">zzz</p>
        </div>
      </div>

      <div className="sidebar">
        <GiPaperWindmill className="icon windmill" />
        <IoFlashOutline className="icon" />
        <CiImageOn className="icon" />
        <LuShirt className="icon" />
        <div className="sidebar-bottom">
          <CiCreditCard1 className="icon" />
          <CiSettings className="icon" />
        </div>
      </div>
      <div className="content-area">
        <div className="top-bar">Top Bar</div>
        <div className="main-content">
          <div className="main-content-top">
            <div className="main-content-top-left">
              <FaArrowLeft className="diff others"></FaArrowLeft>
              <div className="text">
                <h1>Test 3_staging</h1>
                <div className="line-break1"></div>
              </div>
              <div>
                <button className="btn">Primary Feed</button>
              </div>
            </div>
            <div className="main-content-top-right">
              <button className="btn">Publish Feed</button>
            </div>
          </div>
          <div className="line-break"></div>

          {/* Table scroll container */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  className="table-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {/* Table header */}
                  <div className="table-headers">
                    <div className="product-filter">Product Filters</div>
                    <div className="headers">
                      {Array.from({ length: variantCount }, (_, i) => (
                        <div key={i} className="header">
                          {i === 0 ? "Primary Variant" : `Variant ${i + 1}`}
                          <BsThreeDotsVertical
                            className="triple-h"
                            onClick={() => {
                              varRemoveShowfn(i);
                            }}
                          />
                          {showVarRemove === i ? (
                            <div className="remover">
                              <div
                                className="remove"
                                onClick={() => {
                                  varRemovefn(i);
                                }}
                              >
                                Remove
                              </div>
                              <div
                                className="cancel"
                                onClick={() => {
                                  varRemoveCancelfn();
                                }}
                              >
                                Cancel
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Table content (rows) */}
                  {states.map((state, index) => (
                    <Draggable
                      key={state.id}
                      draggableId={state.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="state-row"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          onMouseEnter={() => setIsHoveredId(state.id)}
                          onMouseLeave={() => setIsHoveredId(null)}
                        >
                          <div
                            className="drag-handle"
                            {...provided.dragHandleProps}
                          >
                            {isHoveredId === state.id && (
                              <span
                                className="dustbin"
                                onClick={() => removeState(state.id)}
                              >
                                <RiDeleteBin3Line />
                              </span>
                            )}
                            <div className="row-numbering">
                              <span className="row-number">{index + 1}</span>
                              <TbGridDots className="triple-dot" />
                              <div className="row-numbering-line"></div>
                            </div>
                          </div>

                          {/* Variant columns */}
                          <div className="variant-columns">
                            <div className="product-filters">
                              Apply Product Filters
                            </div>
                            <div className="row-numbering-line"></div>
                            {Array.from(
                              { length: variantCount },
                              (_, variantIndex) => (
                                <React.Fragment key={variantIndex}>
                                  <div className="variant">
                                    <div className="variant-img">
                                      {state.variants[variantIndex] !== "." ? (
                                        <>
                                          <img
                                            src={state.variants[variantIndex]}
                                            alt="Variant"
                                          />
                                          <div className="pencil">
                                            <FaRegEdit
                                              className="pencil-icon"
                                              onClick={() =>
                                                openImageSelector(
                                                  index,
                                                  variantIndex
                                                )
                                              }
                                            />
                                          </div>
                                        </>
                                      ) : (
                                        <div></div>
                                      )}
                                      {state.variants[variantIndex] === "." ? (
                                        <button
                                          className="plus-icon"
                                          onClick={() =>
                                            openImageSelector(
                                              index,
                                              variantIndex
                                            )
                                          }
                                        >
                                          <FaPlus />
                                          Add Design
                                        </button>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="row-numbering-line"></div>
                                </React.Fragment>
                              )
                            )}
                          </div>

                          <button
                            className="variant-add"
                            onClick={() => addVariant(state.id)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <button className="variant-add" onClick={addState}>
                    <FaPlus />
                  </button>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* Image Selection Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Select an Image</h2>
            <div className="image-options">
              {imageOptions.map((image, index) =>
                index == 0 ? (
                  <div className="no-image" onClick={() => setAvatar(image)}>
                    No Image
                  </div>
                ) : (
                  <img
                    key={index}
                    src={image}
                    alt={`Option ${index}`}
                    onClick={() => setAvatar(image)}
                    className="image-option"
                  />
                )
              )}
            </div>
            <button className="btn" onClick={closeImageSelector}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
