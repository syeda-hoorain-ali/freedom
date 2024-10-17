import Cart from '@/components/pages/Cart'
import { getCart, getCartProducts } from '@/lib/data';

const Page = async () => {

  const cart = await getCart();
  const cartProducts = await getCartProducts(cart)

  return <Cart products={cartProducts} />
}

export default Page
