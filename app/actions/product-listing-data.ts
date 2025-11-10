import { colors } from "@/lib/db/schema";
import { db } from "../../lib/db/db";
import { get } from "http";



export async function getProductListingData() {
  try {
    const productRows = await db.query.products.findMany({
      with: {
        productImages: {
          columns: { id: true, url: true },
        },
        productVariants: {
          columns: { id: true, price: true },
        },
      },
      where: (products, { eq }) => eq(products.is_published, true),
    });


    return  productRows;
  } catch (error) {
    console.error("Error fetching product listing data:", error);
    throw error;
  }
}
export const getColorsLength = async (productId: string) => {
  try {
      const colors =await db.query.productVariants.findMany({
        where: (productVariants, { eq }) => eq(productVariants.productId, productId),
        columns: { colorId: true },
      });
      return colors.length;
    }
    catch (error) {
      console.error("Error fetching colors for product:", error);
      return 0;
    }
}

export async function getProductListingDataWithColorLength() {
  try {
    const productRows = await getProductListingData();

    const productsWithColors = await Promise.all(
      productRows.map(async (product) => ({
        ...product,
        colors: await getColorsLength(product.id)
      }))
    );

    return  productsWithColors;
  } catch (error) {
    console.error("Error fetching product listing data:", error);
    throw error;
  }
}


