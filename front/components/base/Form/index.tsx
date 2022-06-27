import InternalForm from "./InternalForm";
import FormItem from "./FormItem";

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Item: typeof FormItem;

}


const Form = InternalForm as FormInterface
Form.Item = FormItem;

export default Form;