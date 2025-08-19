import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Same mock API used earlier
function mockRegister(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.email && payload.password && payload.username) {
        resolve({ id: Date.now(), token: "mock-token-123", ...payload });
      } else {
        reject(new Error("Missing fields"));
      }
    }, 900);
  });
}

const Schema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
});

export default function FormikForm() {
  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui, sans-serif" }}>
      <h2>Registration (Formik + Yup)</h2>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
          setStatus(null);
          try {
            const result = await mockRegister(values);
            setStatus({ ok: true, msg: `Registered! User ID: ${result.id}` });
            resetForm();
          } catch (err) {
            setStatus({ ok: false, msg: err.message || "Registration failed" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form noValidate>
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="username">Username</label><br />
              <Field id="username" name="username" placeholder="e.g. leocode" />
              <div style={{ minHeight: 18 }}>
                <ErrorMessage name="username" component="small" style={{ color: "crimson" }} />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label htmlFor="email">Email</label><br />
              <Field id="email" name="email" type="email" placeholder="e.g. you@example.com" />
              <div style={{ minHeight: 18 }}>
                <ErrorMessage name="email" component="small" style={{ color: "crimson" }} />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label htmlFor="password">Password</label><br />
              <Field id="password" name="password" type="password" placeholder="Min 6 characters" />
              <div style={{ minHeight: 18 }}>
                <ErrorMessage name="password" component="small" style={{ color: "crimson" }} />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} style={{ padding: "10px 14px" }}>
              {isSubmitting ? "Submitting..." : "Register"}
            </button>

            {status?.msg && (
              <p style={{ marginTop: 12, color: status.ok ? "green" : "crimson" }}>
                {status.msg}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
