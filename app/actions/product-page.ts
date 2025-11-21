import { db } from "../../lib/db/db";
import {
  products as productsTable,
  productVariants as variantsTable,
  productImages as imagesTable,
} from "@/lib/db/schema";
import { error } from "console";
import { eq } from "drizzle-orm";


export async function getProductFromID(productId:string){
    try{
        const [productInfo]= await db.select()
      .from(productsTable)
      .where(eq(productsTable.id, productId));
      return productInfo;
    }
    catch{
        throw error;
    }
}