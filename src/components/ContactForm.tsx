"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      toast.success("Your message has been submitted successfully!");
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-8 md:p-10 rounded-xl shadow-lg space-y-6"
    >
      <Input
        type="text"
        placeholder="Your Name"
        required
        className="h-12 text-base"
      />
      <Input
        type="email"
        placeholder="Your Email"
        required
        className="h-12 text-base"
      />
      <Textarea
        placeholder="Your Message"
        required
        rows={6}
        className="text-base"
      />
      <Button
        type="submit"
        className="w-full py-3 text-lg"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
