import Link from "next/link";

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
      className="p-2 border border-black rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-sky-400 hover:text-white duration-200 cursor-pointer size-55 "
    >
      <img src={imageSrc} alt={imageAlt} width={50} height={50} />
      <h3>{title}</h3>
    </Link>
  );
};

export default CategoryCard;
