import { useNavigate } from "react-router-dom";
import ProductCard from "./product-card";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebouce";

interface ProductGridProps {
  category: string;
  currentPage: number;
  priceRange: Array<number>;
  setPriceRange: React.Dispatch<React.SetStateAction<Array<number>>>;
}

interface Product {
  id: number;
  title: string;
  price: number;
  condition: string;
  seller: string;
  image: string;
  category: string;
}

export default function ProductGrid({
  category,
  currentPage,
  priceRange,
}: ProductGridProps) {
  const navigate = useNavigate();
  const productsPerPage = 12;

  // const debouncedPriceRange:Array<number> = useDebounce(priceRange, [0, 1000]);

  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>();
  const [currentProducts, setCurrentProducts] = useState<Array<Product>>();
  const [totalPages, setTotalPages] = useState<number>();
  const debouncedPriceRange = useDebounce(priceRange);

  useEffect(() => {
    const image = [
      "https://www.weareteachers.com/wp-content/uploads/plastic-bottle-fairy-house-night-lights-680.jpg", "https://www.wastewiseproductsinc.com/wp-content/uploads/2014/02/coffee-can-planters.jpg","https://www.bhg.com/thmb/XAZVTUe7N7rZaOKuFyv28Zp6eMs=/550x0/filters:no_upscale():strip_icc()/101169186-81a603c6109643edb4170339d73d0ed1.jpg?height=200&width=200","https://transjardins.org/wp-content/uploads/2017/11/recup-562x424.jpg" 
    ]
    const products = [
      {
        id: 1,
        title: "Recycled Wood Coffee Table",
        price: 129.99,
        condition: "Like New",
        seller: "EcoFurniture",
        image: "https://www.weareteachers.com/wp-content/uploads/plastic-bottle-fairy-house-night-lights-680.jpg",
        category: "Furniture",
      },
      {
        id: 2,
        title: "Refurbished Smartphone",
        price: 299.99,
        condition: "Gently Used",
        seller: "TechRecycle",
        image: "https://www.wastewiseproductsinc.com/wp-content/uploads/2014/02/coffee-can-planters.jpg",
        category: "Electronics",
      },
      {
        id: 3,
        title: "Upcycled Denim Jacket",
        price: 59.99,
        condition: "Like New",
        seller: "GreenThreads",
        image:
          "https://www.bhg.com/thmb/XAZVTUe7N7rZaOKuFyv28Zp6eMs=/550x0/filters:no_upscale():strip_icc()/101169186-81a603c6109643edb4170339d73d0ed1.jpg?height=200&width=200",
        category: "Clothing",
      },
      // Add more products here to test pagination
      ...[...Array(100)].map((_, index) => ({
        id: index + 4,
        title: `Product ${index + 4}`,
        price: Math.random() * 900 + 50,
        condition: Math.random() > 0.5 ? "Like New" : "Gently Used",
        seller: `Seller ${index + 4}`,
        image: image[Math.floor(Math.random() * 4)],
        category: ["Furniture", "Electronics", "Clothing"][
          Math.floor(Math.random() * 3)
        ],
      })),
    ];
    console.log(debouncedPriceRange);
    setFilteredProducts(
      products.filter((p) => {
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
      })
    );
  }, [debouncedPriceRange,category,priceRange]);

  useEffect(()=>{
    if(filteredProducts){
      setCurrentProducts(filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      ))
    }
  }, [filteredProducts,currentPage])

  useEffect(()=>{
    if(filteredProducts){
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage))
    }
  }, [filteredProducts])

  const handlePageChange = (page: number) => {
    navigate(`/marketplace/category/${category}/page/${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
