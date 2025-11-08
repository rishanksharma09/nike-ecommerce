import { db } from "../../lib/db/db";
import { eq } from "drizzle-orm";

export async function getProductListingData() {
  try {
    const productRows = await db.query.products.findMany({
      where: (products, { eq }) => eq(products.is_published, true),
    });

    return productRows;
  } catch (error) {
    console.error("Error fetching product listing data:", error);
    throw new Error("Failed to fetch product listing data");
  }
}


