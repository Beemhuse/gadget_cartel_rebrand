import { client } from '@/sanity/lib/client';
import Image from 'next/image';

// Dynamic route component for category
export default async function CategoryPage({ params }) {
  const { slug } = params; // Get slug from the route params

  // Fetch items for the given category slug
  const items = await client.fetch(
    `*[_type == "product" && category->slug.current == $slug]{
      title,
      description,
      image
    }`,
    { slug }
  );

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Items in {slug}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={160}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
}
