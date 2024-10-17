import EditProduct from "@/components/pages/admin/EditProduct"
import { getProductData } from "@/lib/data"

interface Props {
  params: {
    productid: string
  }
}

const Page = async ({ params }: Props) => {
  const productData = await getProductData(params.productid)  

  return <EditProduct product={productData!} productId={params.productid} />
}

export default Page
