import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  slug?: string;
}

const CategoryCard = ({
  imageSrc,
  imageAlt,
  title,
  slug,
}: CategoryCardProps) => {
  return (
    <Link
      href={`/categories/${slug}`}
      className="group flex flex-col items-center justify-center gap-4 p-4 
             size-50 shrink-0 rounded-xl border cursor-pointer transition-all duration-500
             bg-white border-black text-black hover:bg-black hover:text-white
             dark:bg-zinc-900 dark:border-zinc-700 dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={50}
        height={50}
        className="transition-all duration-500 
               group-hover:invert 
               dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-0"
      />

      <h3 className="font-medium text-center transition-colors duration-500">
        {title}
      </h3>
    </Link>
  );
};

export default CategoryCard;
