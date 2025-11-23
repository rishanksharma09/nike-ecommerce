import { getProductVariants } from "@/app/actions/product-page";
import { normalizeProduct } from "@/app/actions/normalizeProduct";
import ProductInfo from "@/app/Components/ProductInfo";

export default async function ProductPage({
  params,
}: {
  params: { id: string; color: string; size: string };
}) {

  
  const productVariantsInfo = await getProductVariants(params.id);

  
  const normalizedInfo = normalizeProduct(productVariantsInfo);

  return (
    <ProductInfo
      product={normalizedInfo}
      color={params.color}
      size={params.size}
    />
  );
}