import BackIcon from "./svg/BackIcon.jsx";
import Button from "./UI/Button.jsx";

export default function PageHeader({ title, buttonLabel, buttonOnClick }) {
  return (
    <div className="flex justify-between items-center xl:pb-10 lg:pb-8 md:pb-6 sm:pb-4 pb-3">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl  border-b-2 border-primary">
        {title}
      </h1>
      {buttonLabel && (
        <Button
          className={`button__outline--primary rounded-md text-xs es:text-sm md:text-base leading-none md:py-2 md:px-4 es:py-1.5 es:px-3 py-1 px-2`}
          onClick={buttonOnClick}
          type="button"
        >
          {buttonLabel === "Back" && (
            <>
              <BackIcon className="w-3 md:w-3.5 lg:w-5" />
              <span className="hidden es:inline">{buttonLabel}</span>
            </>
          )}
          {buttonLabel !== "Back" && buttonLabel}
        </Button>
      )}
    </div>
  );
}
