// https://github.com/Klerith/bolt-product-editor

import { Navigate, useParams } from "react-router";

import { useProduct } from "@/admin/hooks/useProduct";
import { ProductForm } from "./ui/ProductForm";

// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   slug: string;
//   stock: number;
//   sizes: string[];
//   gender: string;
//   tags: string[];
//   images: string[];
// }

export const AdminProductPage = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: product,
    handleSubmitForm,
  } = useProduct(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  if (isError) {
    return <Navigate to={"/admin/products"} />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to={"/admin/products"} />;
  }

  return (
    <ProductForm
      title={title}
      subTitle={subtitle}
      product={product}
      onSubmit={handleSubmitForm}
    />
  );
};
