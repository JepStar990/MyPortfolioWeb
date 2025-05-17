import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { apiRequest } from "@/lib/queryClient";

const formSchema = insertMessageSchema.extend({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { ref, inView } = useIntersectionObserver({ triggerOnce: true });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <section id="contact" ref={ref} className="py-20">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeIn("up", 0.3)} className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block mb-3 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 px-3 py-1 rounded-full text-sm font-medium">Get In Touch</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-dark-600 dark:text-dark-300">Interested in working together? Have a project in mind? Feel free to reach out!</p>
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.4)}
          className="dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden border border-dark-200 dark:border-dark-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8 lg:p-12">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center"
                    disabled={isPending}
                  >
                    <span>Send Message</span>
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-primary-600 dark:bg-primary-700 p-6 md:p-8 lg:p-12 flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="text-primary bg-white/20 p-3 rounded-full mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-primary/80">Gauteng, GP</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary bg-white/20 p-3 rounded-full mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-primary/80">zwiswamuridili990@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary bg-white/20 p-3 rounded-full mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-secondary-600 dark:text-secondary-400">Phone</h4>
                    <p className="text-primary/80 text-secondary-600 dark:text-secondary-400">+27 791443397</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <h4 className="font-medium mb-4">Follow Me!</h4>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white/80 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200">
                    <i className="ri-linkedin-fill"></i>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white/80 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200">
                    <i className="ri-github-fill"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white/80 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200">
                    <i className="ri-twitter-fill"></i>
                  </a>
                  <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white/80 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200">
                    <i className="ri-medium-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
