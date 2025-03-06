import React from "react";

const Page404 = () => {
  //! State

  //! Function

  //! Render
  return (
    <div className="flex h-[100vh] w-[100vw] items-center justify-center">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Oops! Page Not Found!</span>
        <p className="text-center text-muted-foreground">
          It seems like the page you're looking for <br />
          does not exist or might have been removed.
        </p>
        <div className="mt-6 flex gap-4">
          <a href="/">
            <button className="[&_svg]:size-4 inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0">
              Back to Home
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Page404);
