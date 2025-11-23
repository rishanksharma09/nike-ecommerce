import { db } from "../../lib/db/db";
import {
  products as productsTable,
  productVariants as variantsTable,
  productImages as imagesTable,
} from "@/lib/db/schema";
import { error } from "console";
import { eq } from "drizzle-orm";



export async function getProductVariants(productId:string){
  try{
    const [productInfo]= await db.select()
      .from(productsTable)
      .where(eq(productsTable.id, productId));

    if(!productInfo){
      return null;
    }

    const productVariants = await db.query.productVariants.findMany({
      with: {
        productImages: {
          columns: { id: true, url: true },
        },
        colors: {
          columns: { id: true, name: true },
        },
        sizes:{
          columns:{id:true, name:true},
        }
      },
      where: (productVariants, { eq }) => eq(productVariants.productId,productId),
    });
    return {productInfo, productVariants}
  }
  catch(err){
    throw err;
  }
}