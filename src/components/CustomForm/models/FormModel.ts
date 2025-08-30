import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("El nombre es obligatorio").min(3, "El nombre debe tener al menos 3 caracteres"),
  price: yup.number().typeError("El precio debe ser un número válido").required().min(0, "El precio no puede ser negativo").required(),
  stock: yup.number().typeError("El precio debe ser un número válido").required().min(0, "El stock no puede ser negativo").required()
});

export type FormValues = yup.InferType<typeof schema>;