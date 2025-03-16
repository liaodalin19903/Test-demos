
import { CUDModalProps } from '../index'

const useMapToFormInitialValues = (props: CUDModalProps): { [key: string]: unknown } => {
    const initialValues: { [key: string]: unknown } = {};
    for (const fieldName in props.fields) {
        const fieldConfig = props.fields[fieldName];
        if (fieldConfig.data!== undefined) {
            initialValues[fieldName] = fieldConfig.data;
        }
    }
    return initialValues;
}

export {
  useMapToFormInitialValues
}
