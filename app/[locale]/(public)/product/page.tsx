import ProductsHome from "@/app/[locale]/components/home/ProductsHome/ProductsHome";

const page = () => {
  return (
    <div>
      <ProductsHome limit={24} />
    </div>
  );
};

export default page;
