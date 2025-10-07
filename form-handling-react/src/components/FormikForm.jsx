// src/components/FormikForm.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUserApi } from "./mockApi";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required."),
  email: Yup.string().email("Invalid email address.").required("Email is required."),
  password: Yup.string().min(6, "Password must be at least 6 characters.").required("Password is required."),
});

export default function FormikForm() {
  const [status, setStatus] = useState(null);

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-md shadow-sm mt-6">
      <h2 className="text-xl font-semibold mb-4">Formik Registration Form</h2>

      {status && (
        <div
          className={`mb-3 p-2 rounded ${status.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {status.message}
        </div>
      )}

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setStatus(null);
          try {
            const result = await registerUserApi(values);
            setStatus({ type: "success", message: `Registered (id=${result.id}) via Formik` });
            resetForm();
          } catch (err) {
            setStatus({ type: "error", message: err?.message || "Registration failed" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <label className="block mb-1">Username</label>
            <Field name="username" className="w-full mb-2 p-2 border rounded" placeholder="Your username" />
            <ErrorMessage name="username" component="div" className="text-red-600 text-sm mb-2" />

            <label className="block mb-1">Email</label>
            <Field name="email" type="email" className="w-full mb-2 p-2 border rounded" placeholder="you@example.com" />
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm mb-2" />

            <label className="block mb-1">Password</label>
            <Field name="password" type="password" className="w-full mb-2 p-2 border rounded" placeholder="Minimum 6 characters" />
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm mb-2" />

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded text-white ${isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
              >
                {isSubmitting ? "Registering..." : "Register (Formik)"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatus(null);
                }}
                className="px-3 py-2 border rounded"
              >
                Clear status
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
