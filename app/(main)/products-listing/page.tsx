
import { getProductListingDataWithColorLength} from "@/app/actions/product-listing-data";

import ProductListing from "@/app/Components/ProductListing";

export default async function Page() {

  const productRows = await getProductListingDataWithColorLength();

  return <ProductListing productRows={productRows} />
  
}