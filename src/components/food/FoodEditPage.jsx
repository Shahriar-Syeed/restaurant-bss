import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loader/Loading.jsx";
import PageHeader from "../PageHeader.jsx";
import defaultImage from "../../assets/default-image-preview.png";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import TextArea from "../UI/TextArea.jsx";
import Select from "../UI/Select.jsx";
import {
  getSingleFoodItem,
  setSingleFoodNull,
  updateSingleFoodItem,
} from "../../store/food-actions.js";
import { foodActions } from "../../store/food-slice.js";
import { convertBase64 } from "../../store/employee-actions.js";
import useFormValidation from "../../customHooks/useFormValidation.js";
import validateFoodEntry from "../utility/foodValidationUtility.js";
import Modal from "../UI/Modal.jsx";
import { modalActions } from "../../store/modal-slice.js";
import apiUrl from "../../apiUrl/ApiUrl.jsx";

export default function FoodEditPage() {
  const foodImageRef = useRef();
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const foodData = useSelector((state) => state.foods.singleFoodItem);
  const isLoading = useSelector((state) => state.foods.loading);
  const previewImage = useSelector((state) => state.foods.preview);

  const { formData, errors, handleChange, handleBlur, hasError } =
    useFormValidation(
      {
        name: foodData?.name,
        description: foodData?.description,
        price: foodData?.price,
        discount: foodData?.discount,
        discountPrice: foodData?.discountPrice,
      },
      validateFoodEntry,
      ["price", "discount", "discountPrice"]
    );

  // Modal
  const modalId = useSelector((state) => state.modal.id);
  const isOpen = useSelector((state) => state.modal.open);

  function openModal() {
    dispatch(modalActions.id("food-edit-confirmation"));
    dispatch(modalActions.open());
  }

  function closeModal() {
    dispatch(modalActions.close());
    dispatch(modalActions.id(null));
  }

  const DISCOUNT_OPTION = [
    { value: 0, label: "None" },
    { value: 1, label: "Flat" },
    { value: 2, label: "Percentage" },
  ];

  useEffect(() => {
    dispatch(getSingleFoodItem(param.foodId));
  }, []);

  function onSelectFile(event) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    foodImageRef.current = file;
    dispatch(foodActions.showPreview(URL.createObjectURL(file)));
  }
  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.target.files[0];
      foodImageRef.current = file;
      dispatch(foodActions.showPreview(URL.createObjectURL(file)));
      event.dataTransfer.clearData();
    }
  }

  async function submitEditedValues(data) {
    try {
      const res = await dispatch(
        updateSingleFoodItem(param.foodId, { ...data })
      );

      console.log(res);

      res === "success" && dispatch(setSingleFoodNull());
      res === "success" && navigate("../");
    } catch (error) {
      console.error("Failed to update designation:", error);
    }
  }
  async function handleEdit(e) {
    e.preventDefault();
    if (!hasError()) {
      const fetchData = new FormData(e.target);
      const initialData = Object.fromEntries(fetchData.entries());

      delete initialData.foodImage;
      const data = {
        ...initialData,
        discount: Number(initialData.discount),
        discountType: Number(initialData.discountType),
        discountPrice: Number(initialData.discountPrice),
        price: Number(initialData.price),
      };
      const conditionCheck =
        foodData?.discountType ===
          DISCOUNT_OPTION.find((option) => option.value === data?.discountType)
            ?.label &&
        foodData?.discount === data.discount &&
        foodData?.discountPrice === data.discountPrice &&
        foodData?.price === data.price &&
        foodData?.description === data.description &&
        !foodImageRef?.current;
      console.log("conditionCheck", conditionCheck);

      if (conditionCheck) {
        dispatch(setSingleFoodNull());
        navigate("../");
        return;
      }

      if (window.confirm("Do you really want to change food information?")) {
        delete initialData.foodImage;
        let finalData = {};
        console.log(foodImageRef, data);
        if (foodImageRef?.current) {
          finalData = {
            ...data,
            base64: (await convertBase64(foodImageRef?.current)) ?? "",
            image: foodImageRef?.current?.name ?? "",
          };
        } else {
          finalData = {
            ...data,
            base64: "",
          };
        }
        openModal({ ...finalData });
      }
    }
  }

  return (
    <>
      {modalId === "food-edit-confirmation" && (
        <Modal open={isOpen} onClose={closeModal}>
          <h3 className="md:text-xl mb-3">
            Are you sure you want to edit this food?
          </h3>

          <div className="modal-action p-2 flex justify-end gap-2 flex-wrap">
            <Button
              className="button__outline--primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
              onClick={closeModal}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="button-primary sm:py-2 sm:px-4 es:py-1.5 es:px-3 py-2 px-2 text-xs es:text-sm sm:text-base rounded-lg"
              type="button"
              onClick={submitEditedValues}
            >
              Confirm
            </Button>
          </div>
        </Modal>
      )}
      {isLoading && <Loading fullHeightWidth />}

      <PageHeader
        title="Edit Food"
        buttonLabel="Back"
        buttonOnClick={() => {
          dispatch(setSingleFoodNull());
          return navigate("../");
        }}
      />
      <form onSubmit={handleEdit}>
        <section className="grid lg:grid-cols-12 md:grid-cols-2 gap-x-4 gap-y-5 bg-white xl:p-10 lg:p-8 md:p-6 sm:p-4 p-3 rounded">
          <h2 className="col-start-1 lg:col-end-9 md:-col-end-1 font-bold">
            <u>Id : {foodData?.id}</u>
          </h2>
          <div className="lg:col-start-9 lg:col-end-13 md:col-start-1 md:-col-end-1 lg:row-start-1 lg:row-span-3">
            <div
              className="relative flex justify-center items-center border-dashed border border-gray-200 hover:border-gray-400"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <Input
                type="file"
                hidden
                id="foodImage"
                name="image"
                labelClass="absolute top-0 bottom-0 left-0 right-0 opacity-0 z-30 cursor-pointer"
                onChange={onSelectFile}
              >
                {""}
              </Input>
              <div className="overflow-hidden max-w-48 rounded-lg">
                <img
                  src={
                    previewImage
                      ? previewImage
                      : foodData?.image
                      ? `${apiUrl.getFoodImage}${foodData?.image}`
                      : defaultImage
                  }
                  alt={foodData?.name}
                  className="w-full object-cover rounded-lg "
                />
              </div>
            </div>
          </div>
          <div className="lg:col-start-1 lg:col-end-9 md:col-start-1 md:-col-end-1">
            <Input
              placeholder={foodData?.name}
              defaultValue={foodData?.name}
              className="placeholder:text-stone-500 border border-solid border-stone-500 rounded p-0.5 lg:flex-1 w-full lg:w-auto"
              outerClassName="lg:flex gap-3 items-center"
              labelClass="font-bold block"
              id="name"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Food Name:
            </Input>
            {errors?.name && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-28">
                {errors?.name}
              </span>
            )}
          </div>
          <div className="lg:col-start-1 lg:col-end-9 md:col-start-1 md:-col-end-1">
            <TextArea
              placeholder={foodData?.description}
              defaultValue={foodData?.description}
              className="placeholder:text-stone-500 border border-solid border-stone-500 rounded p-0.5 w-full"
              labelClass="font-bold block text-stone-900"
              id="description"
              label
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Description:
            </TextArea>
            {errors?.description && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-4">
                {errors?.description}
              </span>
            )}
          </div>
          <div className="lg:col-start-1 lg:col-end-4">
            <Input
              placeholder={foodData?.price}
              defaultValue={foodData?.price}
              className="placeholder:text-stone-500 border border-solid border-stone-500 rounded p-0.5 w-full"
              labelClass="font-bold"
              errorClass="absolute text-xs text-red-600 py-0.5 ps-3"
              id="price"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Price in(&#2547;):
            </Input>
            {errors?.price && (
              <span className="absolute text-xs text-red-600 py-0.5 ps-3">
                {errors?.price}
              </span>
            )}
          </div>
          <div className="lg:col-start-4 lg:col-end-7">
            <Select
              value={
                DISCOUNT_OPTION?.find(
                  (option) => option.label === foodData?.discountType
                )?.value
              }
              label="Discount Type:"
              className="placeholder:text-stone-500 border border-solid border-stone-500 rounded w-full p-1.5"
              outerClassName="block "
              labelClassName="text-stone-900 font-bold"
              labelClass="font-bold block"
              id="discountType"
              options={DISCOUNT_OPTION}
              selectedOption={foodData?.discountType}
            />
          </div>
          <div className="lg:col-start-7 lg:col-end-10">
            <Input
              defaultValue={foodData?.discount}
              placeholder={foodData?.discount}
              className="placeholder:text-stone-500 border border-solid border-stone-500 rounded p-0.5 w-full"
              outerClassName="block "
              labelClassName="text-stone-900 font-bold"
              labelClass="font-bold block"
              id="discount"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Discount :
            </Input>
          </div>
          <div className="lg:col-start-10 lg:col-end-13 pt-1">
            <Input
              placeholder={foodData?.discountPrice}
              defaultValue={foodData?.discountPrice}
              className="placeholder:text-stone-500 border border-solid border-stone-500 rounded p-0.5 w-full"
              outerClassName="block "
              labelClassName="text-stone-900 font-bold"
              labelClass="font-bold block"
              id="discountPrice"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Discount Price (&#2547;) :
            </Input>
          </div>
          <div className="col-start-1 -col-end-1 pt-1">
            <Button
              type="submit"
              className="button-primary w-full py-2 text-white rounded "
            >
              Submit
            </Button>
          </div>
        </section>
      </form>
    </>
  );
}
