import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-4 space-y-24">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      {/* Section 1: Contact Form with Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <Image
            src="/contact.jpg"
            alt="Contact"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right: Contact Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Section 2: Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center p-6 hover:shadow-xl transition-transform transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
          <Mail className="w-8 h-8 text-indigo-600 mb-2" />
          <CardTitle>Email</CardTitle>
          <CardContent className="text-gray-700 dark:text-gray-300 text-center text-sm">
            support@easy-library.com
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 hover:shadow-xl transition-transform transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
          <Phone className="w-8 h-8 text-indigo-600 mb-2" />
          <CardTitle>Phone</CardTitle>
          <CardContent className="text-gray-700 dark:text-gray-300 text-center text-sm">
            +880 123 456 789
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center p-6 hover:shadow-xl transition-transform transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
          <MapPin className="w-8 h-8 text-indigo-600 mb-2" />
          <CardTitle>Address</CardTitle>
          <CardContent className="text-gray-700 dark:text-gray-300 text-center text-sm">
            Dhaka, Bangladesh
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Our Location Map */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Our Location</h2>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d90.412345!3d23.810123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf123456789%3A0xabcdef123456!2sDhaka%2C+Bangladesh!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
