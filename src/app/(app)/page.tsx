import { getNewProducts, getTrendingProducts } from "@/lib/data";
import { Categories, Header, NewArrival, TrendingProducts } from "@/components/home";

const Page = async () => {

  const newProducts = await getNewProducts(2);
  const trendingProducts = await getTrendingProducts(2);  


  return (<>
    <Header />
    <div className="sepretor absolute w-full h-60 -translate-y-56 bg-gradient-to-b from-transparent via-[hsl(109,78%,84%)] to-[hsl(109,78%,84%)]"></div>

    <main className="relative bgred-300 -top-40">
      <NewArrival products={newProducts} />
      <Categories />
      <TrendingProducts products={trendingProducts} />
    </main>

  </>)
}

export default Page;
