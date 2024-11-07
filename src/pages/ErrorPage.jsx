import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An Error occurred!";
  let message = "Something went wrong!";

  if (error.status === 404) {
    title = "404, Not found!";
    message = "Could not find resource or page";
  }

  return (
    <section className="min-h-dvh grid place-items-center text-red-600 bg-stone-900">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100px"
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto mb-3"
        >
          <path
            d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z"
            stroke="#cc080b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 9V13"
            stroke="#cc080b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 17.0195V17"
            stroke="#cc080b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-3xl font-bold ">{title}</h1>
        <p className="text-lg">{message}</p>
      </div>
    </section>
  );
}
