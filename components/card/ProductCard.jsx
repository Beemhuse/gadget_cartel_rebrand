import Image from 'next/image';
import { FaRegStar, FaRegEye, FaOpencart } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="bg-white   shadow-md rounded-lg overflow-hidden relative group">
      {/* Product Image with Overlay */}
      <div className="relative max-w-lg ">
        <Image
          src={product.images[0]?.asset.url || '/default-image.jpg'} // Fallback for missing image
          alt={product.title}
          width={200}
          height={200}
          className="w-full max-w-sm object-cover"
        />
        
        {/* Hover Content */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-4">
            <button className="text-black bg-white p-4 text-xl">
              <FaRegStar />
            </button>
            <button
              onClick={() => onViewDetails(product.slug.current)}
              className="text-black bg-white p-4 text-xl"
            >
              <FaRegEye />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="text-black bg-white p-4 text-xl"
            >
              <FaOpencart />
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 text-center">
        <h4 className="text-xl font-semibold mb-2">{product.title}</h4>
        <span className="text-gray-500">{product.price}</span>
        {/* Review Stars */}
        <ul className="flex justify-center mt-2 space-x-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <li key={i}>
              <FaRegStar />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
