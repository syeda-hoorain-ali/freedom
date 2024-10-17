import NotFound from "@/app/not-found";
import Product from "@/components/pages/Product";
import { getProduct } from "@/lib/data";

interface Props {
  params: {
    id: string;
  }
}

const Page = async ({ params }: Props) => {

  const product = await getProduct(params.id);
  if (!product) return <NotFound />

  return <Product product={product} />
}

export default Page
