import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Formik form submitted:", values);
    alert("Registration Successful ✅ (Formik)");
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form className="p-4 border rounded w-80 mx-auto mt-6">
        <h2 className="text-xl font-bold mb-4">Formik Registration Form</h2>

        <div className="mb-2">
          <label className="block">Username:</label>
          <Field type="text" name="username" className="border p-2 w-full" />
          <ErrorMessage name="username" component="div" className="text-red-500" />
        </div>

        <div className="mb-2">
          <label className="block">Email:</label>
          <Field type="email" name="email" className="border p-2 w-full" />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>

        <div className="mb-2">
          <label className="block">Password:</label>
          <Field type="password" name="password" className="border p-2 w-full" />
          <ErrorMessage name="password" component="div" className="text-red-500" />
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default FormikForm;
