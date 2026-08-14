import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Contact" }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (R) => R.required(), initialValue: "Bring the idea. I'll handle the rest." }),
    defineField({ name: "intro", title: "Intro text", type: "text", rows: 3, validation: (R) => R.required(), initialValue: "From strategy and design to development and launch, your project is handled from start to finish." }),
    defineField({ name: "formLabel", title: "Form label", type: "string", initialValue: "Project enquiry" }),
    defineField({ name: "services", title: "Service options", type: "array", of: [{ type: "string" }], validation: (R) => R.required().min(1) }),
    defineField({ name: "budgets", title: "Budget options", type: "array", of: [{ type: "string" }], validation: (R) => R.required().min(1) }),
    defineField({ name: "timelines", title: "Timeline options", type: "array", of: [{ type: "string" }], validation: (R) => R.required().min(1) }),
    defineField({ name: "whatsappNumber", title: "WhatsApp number", type: "string", description: "Include country code without +", initialValue: "2349167802170" }),
    defineField({ name: "email", title: "Contact email", type: "string", initialValue: "theojediji@gmail.com" }),
    defineField({ name: "location", title: "Location", type: "string", initialValue: "Akure, Nigeria" }),
    defineField({ name: "responseTime", title: "Response time", type: "string", initialValue: "Within 24 hours" }),
    defineField({ name: "helpTitle", title: "Help card title", type: "string", initialValue: "Not sure what you need?" }),
    defineField({ name: "helpText", title: "Help card text", type: "text", rows: 3, initialValue: "Select Not sure yet and describe the business problem. I'll help you choose the right direction." }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
