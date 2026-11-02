
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Heart,
  BookText,
  FlaskConical,
  Landmark,
  Baby,
  Library,
} from "lucide-react";

const features = [
  {
    icon: <BookOpen size={28} />,
    title: "Easy Book Borrowing",
    description: "Borrow your favorite books with just a few clicks.",
  },
  {
    icon: <Clock size={28} />,
    title: "Flexible Reading",
    description: "Enjoy books at your own pace and return them easily.",
  },
  {
    icon: <Heart size={28} />,
    title: "Made for Readers",
    description: "A simple and friendly place for every book lover.",
  },
];

const categories = [
  { name: "Fiction", icon: <BookText size={30} /> },
  { name: "Science", icon: <FlaskConical size={30} /> },
  { name: "History", icon: <Landmark size={30} /> },
  { name: "Kids", icon: <Baby size={30} /> },
  { name: "Others", icon: <Library size={30} /> },
];

const ExtraSections = () => {
  return (
    <>
      {/* Why Choose BookNook */}
      <section className="bg-[#f4f3ed] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-[#245c45]">
              Why Choose BookNook?
            </h2>
            <p className="mt-3 text-gray-600">
              A simple and enjoyable reading experience for everyone.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex justify-center text-[#245c45]">
                  {feature.icon}
                </div>

                <h3 className="mb-3 text-xl font-semibold text-[#245c45]">
                  {feature.title}
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Categories */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-[#245c45]">
              Explore Book Categories
            </h2>
            <p className="mt-3 text-gray-600">
              Find books that match your interests.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/books?category=${category.name}`}
                className="flex flex-col items-center gap-4 rounded-xl border border-[#e8e5dc] bg-[#faf9f6] p-7 text-center transition hover:-translate-y-1 hover:border-[#245c45] hover:shadow-md"
              >
                <div className="text-[#245c45]">{category.icon}</div>

                <h3 className="font-semibold text-[#343a35]">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExtraSections;
