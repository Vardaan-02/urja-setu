import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Combobox } from "@/components/ui/combo-box";
import { FileUpload } from "@/components/ui/file-upload";

export interface Product {
  seller: string;
}

const options = [{value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"}];


export default function AddProduct() {
  const [textAreas, setTextAreas] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0)
  const [category,setCategory] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const addTextArea = () => {
    setTextAreas([...textAreas, ""]);
  };

  const updateTextArea = (index: number, value: string) => {
    const updatedTextAreas = [...textAreas];
    updatedTextAreas[index] = value;
    setTextAreas(updatedTextAreas);
  };

  const removeTextArea = (index: number) => {
    const updatedTextAreas = textAreas.filter((_, i) => i !== index);
    setTextAreas(updatedTextAreas);
  };

  return (
    <motion.div
      className="bg-green-50 p-2 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="p-4 bg-white/30 shadow-xl rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PlusCircle className="mr-2" /> Add New Product
        </h2>
        <form className="space-y-4">
          <div>
            <Label
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </Label>
            <Input
              type="text"
              id="product-name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Product Name"
            />
          </div>
          <div>
            <Label
              htmlFor="product-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Description
            </Label>
            <Textarea
              id="product-description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product description"
            />
          </div>
          <div>
            <Label
              htmlFor="product-features"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Features
            </Label>
            <AnimatePresence>
              {textAreas.map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative mt-2"
                >
                  <Textarea
                    value={text}
                    onChange={(e) => updateTextArea(index, e.target.value)}
                    placeholder="Write something..."
                    className="col-auto w-full h-12 p-2 pr-10 border rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                  />
                  <Button
                    onClick={() => removeTextArea(index)}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent absolute top-2 right-2 text-gray-400 hover:text-black transition-colors duration-200"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            <Button
              onClick={addTextArea}
              className="w-full flex items-center justify-center mt-2 hover:bg-background"
              variant="outline"
              type="button"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Text Area
            </Button>
          </div>
          <div>
            <Label
              htmlFor="selling-price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Selling Price
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                min={0}
                max={10000}
                step={100}
                value={[price]}
                onValueChange={(value) => setPrice(value[0])}
                className="w-full"
              />
              <div className="text-center text-2xl font-bold flex items-center h-full">
                {formatPrice(price)}
              </div>
            </div>
          </div>
          <div>
            <Label
              htmlFor="product-condition"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Condition
            </Label>
            <Input
              type="text"
              id="product-condition"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="New"
            />
          </div>
          <div>
            <Label
              htmlFor="product-image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image
            </Label>
            <FileUpload onChange={handleFileUpload} />
          </div>
          <div>
            <Label
              htmlFor="product-category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </Label>
            <Combobox value={category} onChange={setCategory} options={options} className="w-[360px]"/>
          </div>
          <div>
            <Label
              htmlFor="product-discount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Discount
            </Label>
            <Input
              type="text"
              id="product-discount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="eg: 10 means 10%"
            />
          </div>
          <motion.button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Product
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
