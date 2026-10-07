import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("El nombre es obligatorio").min(3, "El nombre debe tener al menos 3 caracteres"),
  price: yup.number().typeError("El precio debe ser un número válido").required("El precio es obligatorio").min(0, "El precio no puede ser negativo"),
  stock: yup.number().typeError("El stock debe ser un número válido").required("El stock es obligatorio").min(0, "El stock no puede ser negativo")
});

export type FormValues = yup.InferType<typeof schema>;