import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

export default function App() {
  return (
    <>
      <RegistrationForm />
      <hr style={{ margin: "3rem 0" }} />
      <FormikForm />
    </>
  );
}
