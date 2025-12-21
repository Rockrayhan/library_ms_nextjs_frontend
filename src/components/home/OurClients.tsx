import Image from "next/image";

const OurClients = () => {
  return (
    <section className="py-24 bg-gray-900">
      <h2 className="text-center text-3xl font-semibold mb-12">Our Clients</h2>

      <div className="grid grid-cols-2 md:grid-cols-6  items-center justify-center">
        <Image
          src="/client-image1.png"
          alt="client"
          width={120}
          height={120}
          className="mx-auto object-contain"
        />
        <Image
          src="/client-image2.png"
          alt="client"
          width={120}
          height={120}
          className="mx-auto object-contain"
        />
        <Image
          src="/client-image3.png"
          alt="client"
          width={120}
          height={120}
          className="mx-auto object-contain"
        />
        <Image
          src="/client-image4.png"
          alt="client"
          width={120}
          height={120}
          className="mx-auto object-contain"
        />
        <Image
          src="/client-image5.png"
          alt="client"
          width={120}
          height={120}
          className="mx-auto object-contain"
        />

        <Image
          src="/client-image1.png"
          alt="client"
          width={120}
          height={120}
          className="mx-auto object-contain"
        />
      </div>
    </section>
  );
};

export default OurClients;
