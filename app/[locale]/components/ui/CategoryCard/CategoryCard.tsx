import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  slug?: string;
  id: string;
  name_en: string;
  name_ar: string;
  isRtl: boolean;
}

const CategoryCard = ({
  imageSrc,
  imageAlt,
  title,
  slug,
  id,
  name_en,
  name_ar,
  isRtl,
}: CategoryCardProps) => {
  return (
    <div key={id} className="category-card">
      <Link href={`/categories/${slug}`}>
        <div className="image relative aspect-square overflow-hidden lg:rounded-lg">
          <Image
            src={imageSrc}
            alt={isRtl ? name_ar : name_en}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="text absolute top-0 left-0 size-full bg-black/50 hover:bg-black/0 transition-colors duration-300 flex items-center justify-center text-white text-2xl font-semibold z-10">
            {isRtl ? name_ar : name_en}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
