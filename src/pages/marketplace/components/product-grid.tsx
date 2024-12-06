import { useNavigate } from "react-router-dom";
import ProductCard from "./product-card";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebouce";
import { Product } from "./product-showcase";

interface ProductGridProps {
  category: string;
  currentPage: number;
  priceRange: Array<number>;
  products?: Product[]
  setPriceRange: React.Dispatch<React.SetStateAction<Array<number>>>;
}

export default function ProductGrid({
  category,
  currentPage,
  priceRange,
  products,
}: ProductGridProps) {
  const navigate = useNavigate();
  const productsPerPage = 12;

  // const debouncedPriceRange:Array<number> = useDebounce(priceRange, [0, 1000]);
  
  const debouncedPriceRange = useDebounce(priceRange);
  const [currentProducts, setCurrentProducts] = useState<Array<Product>>();
  const [totalPages, setTotalPages] = useState<number>();

  useEffect(()=>{
    setCurrentProducts(
    products?.filter((p) => {
        if(category == "All"){
          return p.price <= priceRange[1] && p.price >= priceRange[0];
        }
        else{
            return (
              p.category === category &&
              p.price <= priceRange[1] &&
              p.price >= priceRange[0]
            );
        }
      }))
  }, [debouncedPriceRange, products, category, priceRange])

  useEffect(()=>{
    if(products){
      setCurrentProducts(products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      ))
    }
  }, [products,currentPage])

  useEffect(()=>{
    if(products){
      setTotalPages(Math.ceil(products.length / productsPerPage))
    }
  }, [products])

  const handlePageChange = (page: number) => {
    navigate(`/marketplace/category/${category}/page/${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-green-50 p-6 rounded-2xl shadow-md">
        {currentProducts && currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
