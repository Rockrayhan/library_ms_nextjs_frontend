import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookIcon,
  Check,
  DollarSign,
  LayoutDashboard,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    name: "Extensive Library",
    icon: <BookIcon className="text-indigo-600 w-8 h-8" />,
  },
  {
    name: "Flexible Subscriptions",
    icon: <DollarSign className="text-indigo-600 w-8 h-8" />,
  },
  {
    name: "Secure Payments",
    icon: <LayoutDashboard className="text-indigo-600 w-8 h-8" />,
  },
  {
    name: "Personal Dashboard",
    icon: <Smartphone className="text-indigo-600 w-8 h-8" />,
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 space-y-20">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        About Easy-Library
      </h1>

      <Card className="hover:shadow-2xl transition-transform duration-500 ease-in-out transform hover:-translate-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Text */}
          <div className="p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-semibold mb-4">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                At <strong>Easy-Library</strong>, our mission is to make reading
                accessible to everyone. We strive to provide a modern,
                user-friendly library experience where users can easily explore,
                borrow, and enjoy books across various genres. Our subscription
                model ensures flexible access to books while promoting literacy
                and learning.
              </p>
            </CardContent>
          </div>

          {/* Right: Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
            <Image
              src="/about.jpg"
              alt="Our Mission"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Card>

      {/* Section 2: Our Services */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.name}
              className="flex flex-col items-center justify-center p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-gray-200 dark:border-gray-700"
            >
              {service.icon}
              <CardTitle className="text-lg font-semibold mt-4">
                {service.name}
              </CardTitle>
              <CardContent className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                {service.name === "Extensive Library" &&
                  "Access thousands of books across multiple genres and languages."}
                {service.name === "Flexible Subscriptions" &&
                  "Choose monthly or yearly subscription plans that suit your needs."}
                {service.name === "Secure Payments" &&
                  "Pay safely online via Stripe, hassle-free and encrypted."}
                {service.name === "Personal Dashboard" &&
                  "Track borrowed books, history, and subscription in one place."}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 3: Why Choose Us */}
      <Card className="hover:shadow-2xl transition-transform duration-500 ease-in-out transform hover:-translate-y-2">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">
            Why Choose Easy-Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
            Easy-Library combines technology and simplicity to create an
            outstanding reading experience. Here’s why our users love us:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <Check className="text-indigo-600 mt-1" size={20} />
              Intuitive interface with fast search and easy navigation
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <Check className="text-indigo-600 mt-1" size={20} />
              Quick access to book details, borrowing, and subscription
              management
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <Check className="text-indigo-600 mt-1" size={20} />
              Responsive design for seamless use on desktop and mobile devices
            </li>
            <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <Check className="text-indigo-600 mt-1" size={20} />
              Reliable customer support to assist with any questions or issues
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
