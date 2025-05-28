import React from "react";

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Page not Accessible
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
          Sorry, we couldn’t find/access the page you’re looking for.
        </p>
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <a
            href="/"
            style={{
              borderRadius: "0.375rem",
              backgroundColor: "#4f46e5", // Indigo-600
              padding: "0.625rem 1.375rem",
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "white",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // shadow-xs
              textDecoration: "none",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
          >
            Go back home
          </a>
          <a href="/contact" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
