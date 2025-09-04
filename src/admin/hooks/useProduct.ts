import { useQuery } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/getProductById.action";
import type { Product } from "@/types/interfaces/product.interface";

export const useProduct = (id: string) => {
  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleSubmitForm = async (productLike: Partial<Product>) => {
    console.log({ productLike });
  };

  return {
    ...query,
    handleSubmitForm,
  };
};
