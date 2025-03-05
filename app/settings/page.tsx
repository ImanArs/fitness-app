import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const faqs = [
    {
      question: "How do I track my workout progress?",
      answer:
        "Your workout progress is automatically tracked on the dashboard. You can see statistics like completed workouts, total workout time, and more.",
    },
    {
      question: "Can I create custom workouts?",
      answer:
        "Custom workout creation is coming in a future update. For now, you can choose from our pre-designed workout programs.",
    },
    {
      question: "How are calories calculated?",
      answer:
        "Calorie calculations are based on exercise intensity, duration, and average energy expenditure for each exercise type.",
    },
    {
      question: "Can I sync with other fitness apps?",
      answer:
        "We're working on integration with popular fitness apps and wearables. This feature will be available soon.",
    },
  ];

  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="animate-in-delay-100 rounded-[12px]">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="animate-in-delay-200 rounded-[12px]">
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-4">
          <p>
            Our Stay Strong app is committed to protecting your privacy. We
            collect minimal data necessary to provide our services.
          </p>
          <p>
            We do not sell your personal information to third parties. Your
            workout data is stored securely and used only to improve your
            experience.
          </p>
          <p>
            You can request deletion of your account and associated data at any
            time through the app settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
