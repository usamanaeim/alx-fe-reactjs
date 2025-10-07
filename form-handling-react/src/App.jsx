// src/App.jsx
import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Form Handling Demo</h1>

        {/* Controlled version */}
        <RegistrationForm />

        {/* Formik version */}
        <FormikForm />
      </div>
    </div>
  );
}

export default App;
