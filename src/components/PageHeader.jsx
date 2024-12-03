import Button from "./UI/Button";

export default function PageHeader({
  title,
  buttonLabel,
  buttonOnClick,
}) {
  return (
    <div className="flex justify-between items-center xl:pb-10 lg:pb-8 md:pb-6 sm:pb-4 pb-3">
      <h1 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg border-b-2 border-primary">
        {title}
      </h1>
      {buttonLabel && (
        <Button
          className="button__outline--primary rounded-md text-sm leading-none"
          onClick={buttonOnClick}
          type='button'
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
