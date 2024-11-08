import Input from "../UI/Input.jsx";
import InputFloating from "../UI/InputFloating.jsx";
import defaultImage from "../../assets/default-image-preview.png";
import CustomSelect from "../UI/CustomSelect.jsx";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button.jsx";
import PageHeader from "../PageHeader.jsx";
import { modalActions } from "../../store/modal-slice.js";
import Modal from "../UI/Modal.jsx";
import { useNavigate } from "react-router-dom";
import { foodActions } from "../../store/food-slice.js";
import { createFood } from "../../store/food-actions.js";
import { useEffect, useState } from "react";
import TextAreaFloating from "../UI/TextAreaFloating.jsx";

export default function FoodAddPage() {
  
  const [price, setPrice] = useState(0);
  const [disableDiscountFields, setDisableDiscountFields] = useState(true);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedFoodImage = useSelector(
    (state) => state.foods.selectedFoodImage
  );
  const selectedOption = useSelector(
    (state) => state.customSelect.selectedOption
  );
  const errorMessage = useSelector((state) => state.foods.error);
  const previewImage = useSelector((state)=> state.foods.preview);

  const discountOption =[
    {value:'684219', label: 'None', sendingValue: 0},
    {value:'984948944', label: 'Flat', sendingValue: 1},
    {value:'6548', label: 'Percentage', sendingValue: 2},

  ];
  // Modal
  const isOpen = useSelector((state) => state.modal.open);

  function openModal() {
    dispatch(modalActions.open());
  }
  function closeModal() {
    dispatch(modalActions.close());
  }
  function onSelectFile(event){
    if (!event.target.files || event.target.files.length === 0) {
      return;
    };
    dispatch(foodActions.selectedFoodImage(event.target.files[0]));
  }
  function handleDrop (event){
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dispatch(foodActions.selectedFoodImage(event.dataTransfer.files[0]));
      event.dataTransfer.clearData();
    } 
  }
  function handleDiscountSelect(event){
    console.log('selectedOption add food', selectedOption, event,)
    if(event.sendingValue === 0)  {
      setDisableDiscountFields(()=>true);
      setDiscountPrice(()=>0);
      setDiscount(()=>0);
    }else {
      setDisableDiscountFields(()=>false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();


    const fetchData = new FormData(event.target);
    const data = {...Object.fromEntries(fetchData.entries()), discountPrice: discountPrice};
    console.log('food data', data);
    const result = await dispatch(createFood(data, selectedFoodImage));
    console.log("result",result)
    if (result === 200) {
      navigate("../");
    }    
  }
  useEffect(()=>{
    if(selectedOption?.sendingValue === 1){
      setDiscountPrice(()=>(price - discount));
    }else if ( selectedOption?.sendingValue === 2 ){
      setDiscountPrice(()=> (price - (price * (discount / 100))));
    } 
    
  },[discount, price, selectedOption])
  useEffect(() => {
    if (!selectedFoodImage) {
      dispatch(foodActions.showPreview(undefined));
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFoodImage);
    dispatch(foodActions.showPreview(objectUrl));

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFoodImage, dispatch]);

  return (
    <>

      <Modal open={isOpen} onClose={closeModal}>
        <h1>Failed!</h1>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <p>Invalid Password or Username</p>
        )}
        <div className="modal-action p-2">
          <Button
            className="float-end button-primary px-4 py-2 rounded-lg"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </Modal>
    <PageHeader title='Add Table' />
    <form onSubmit={handleSubmit} className="bg-white">
      <div className="grid lg:grid-cols-12 lg:gap-4 gap-4 bg-white xl:p-10 lg:p-8 md:p-6 sm:p-4 p-3 rounded">
        <div
          className="lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:row-span-4 border-dashed border border-gray-200 hover:border-gray-400 relative min-h-36 rounded"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="h-full flex items-center justify-center">
            <Input
              type="file"
              hidden
              id="foodImage"
              name="image"
              labelClass="absolute top-0 bottom-0 left-0 right-0 opacity-0 z-40 cursor-pointer"
              onChange={onSelectFile}
            >{''}</Input>
            <img src={previewImage ? previewImage : defaultImage} className="h-40" />
          </div>
        </div>
        <div className="lg:col-start-1 lg:col-end-9 lg:row-start-1">
          <InputFloating id="FoodName" name="name" >Food Name</InputFloating>
        </div>
        <div className="lg:col-start-1 lg:col-end-9 row-start-2 row-end-5">
          <TextAreaFloating id="descriptionOfFood" name="description">Description</TextAreaFloating>
        </div>
        <div className="lg:col-start-1 lg:col-end-4 lg:row-start-5">
          <InputFloating id="foodPrice" name="price" onChange={(e)=>setPrice(e.target.value)}>Price</InputFloating>
        </div>

        <div className="lg:col-start-4 lg:col-end-7 lg:row-start-5">
          <CustomSelect
            id="foodDiscountType"
            name="discountType"
            label="Select Discount Type"
            options={discountOption}
            onChanged={(e)=>handleDiscountSelect(e)}
          />
        </div>
        
        <div className="lg:col-start-7 lg:col-end-10 lg:row-start-5">
          <InputFloating id="foodDiscount" name="discount" type='number' disabled={disableDiscountFields} value={ discount} onChange={(e)=>setDiscount(e.target.value)}>Discount in (&#2547;) </InputFloating>
        </div>
        
       
        <div className="lg:col-start-10 lg:col-end-13 lg:row-start-5">
          <InputFloating id="foodDiscountPrice" name="discountPrice" type='number' disabled={true} value={discountPrice}  >Discount Price</InputFloating>
        </div>
       
        <div className="lg:col-start-1 lg:-col-end-1">
          <Button
            type="submit"
            className="button-primary w-full py-2 text-white rounded "
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </form>
    </>
  );
}
