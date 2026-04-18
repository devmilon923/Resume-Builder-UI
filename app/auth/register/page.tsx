"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, FieldPath, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import z from "zod";

function RegisterPage() {
  const [step, setStep] = useState<number>(3);
  const [activeField, setActiveField] = useState<
    FieldPath<z.infer<typeof schema>>[]
  >([]);
  // Zod schema
  const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one special character (!@#$%^&*)",
      ),
    gender: z.enum(["Male", "Female", "Others"], {
      error: "Please select your gender",
    }),
    profession: z.enum(["Student", "Teacher", "Doctor", "Engineer"], {
      error: "Please select your profession",
    }),
    address: z.string().min(4, "Address must be at least 4 characters long"),
    isRemember: z.boolean(),
  });
  // Profession
  interface EmojiChoiceOption {
    value: z.infer<typeof schema.shape.profession>;
    emoji: string;
    label: string;
    description?: string;
  }
  const professionOptions: EmojiChoiceOption[] = [
    {
      value: "Student",
      emoji:
        "https://img.icons8.com/?size=100&id=12197&format=png&color=000000",
      label: "Student",
      description: "Select if you are a student",
    },
    {
      value: "Teacher",
      emoji:
        "https://img.icons8.com/?size=100&id=owZ150JlNlBu&format=png&color=000000",
      label: "Teacher",
      description: "Select if you are a teacher",
    },
    {
      value: "Doctor",
      emoji:
        "https://img.icons8.com/?size=100&id=fhnv2wJYtCWH&format=png&color=000000",
      label: "Doctor",
      description: "Select if you are a doctor",
    },
    {
      value: "Engineer",
      emoji:
        "https://img.icons8.com/?size=100&id=41237&format=png&color=000000",
      label: "Engineer",
      description: "Select if you are an engineer",
    },
  ];
  interface GenderEmojiChoiceOption {
    value: z.infer<typeof schema.shape.gender>;
    emoji: string;
    label: string;
    description?: string;
  }
  const genderOptions: GenderEmojiChoiceOption[] = [
    {
      value: "Male",
      emoji:
        "https://img.icons8.com/?size=100&id=18738&format=png&color=000000",
      label: "Male",
      description: "Select if you are a male",
    },
    {
      value: "Female",
      emoji:
        "https://img.icons8.com/?size=100&id=23256&format=png&color=000000",
      label: "Female",
      description: "Select if you are a female",
    },
    {
      value: "Others",
      emoji:
        "https://img.icons8.com/?size=100&id=vri4BrW3A8Uj&format=png&color=000000",
      label: "Others",
      description: "Select if you are others",
    },
  ];
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      isRemember: false,
    },
  });
  useEffect(() => {
    if (step === 1) {
      setActiveField(["name", "address"]);
    } else if (step === 2) {
      setActiveField(["password"]);
    } else if (step === 3) {
      setActiveField(["profession", "gender"]);
    } else if (step === 4) {
      setActiveField(["email"]);
    }
  }, [step]);

  const stepValidation = async () => {
    const isValid = await form.trigger(activeField);
    return isValid;
  };
  const goNext = async () => {
    const isValid = await stepValidation();
    if (isValid) {
      setStep(step + 1);
    }
  };
  const goBack = async () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const selectedProfession = form.watch("profession");
  const selectedGender = form.watch("gender");
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };
  return (
    <div className="max-w-xl mx-auto my-12">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold text-slate-800">
              Registration
            </span>
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Step {step} of 4
            </span>
          </div>
          <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            />
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">
              {Math.round((step / 4) * 100)}% Complete
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {step === 1 && (
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <Input placeholder="Enter your name" {...field} />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <Input {...field} placeholder="Enter your address" />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>Step 2</CardHeader>
                <CardContent>
                  <Field>
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                          {fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />
                  </Field>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel className="flex flex-col items-center w-full text-xl">
                        Gender
                      </FieldLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between">
                        {genderOptions.map((gender, index) => {
                          const isSelected = selectedGender === gender.value;
                          return (
                            <motion.button
                              key={gender.value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              type="button"
                              onClick={() => field.onChange(gender.value)}
                              className={`relative cursor-pointer group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 h-40 ${
                                isSelected
                                  ? "border-green-500 bg-green-50 shadow-md"
                                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                              }`}
                            >
                              <div className="mb-4 bg-slate-50 rounded-full p-3 group-hover:bg-green-100 transition-colors duration-300">
                                <img
                                  src={gender.emoji}
                                  alt={gender.label}
                                  className={`w-12 h-12 object-contain transition-all duration-300 ${!isSelected && "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"}`}
                                />
                              </div>
                              <h3
                                className={`text-sm font-bold transition-colors duration-300 ${isSelected ? "text-green-700" : "text-slate-600"}`}
                              >
                                {gender.label}
                              </h3>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                                {gender.description}
                              </p>

                              <AnimatePresence>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 45 }}
                                    className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1.5 shadow-lg border-2 border-white"
                                  >
                                    <Check className="w-3 h-3 stroke-3" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          );
                        })}
                      </div>
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                      <FieldDescription>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ad distinctio adipisci porro expedita voluptatem
                        consectetur voluptate nemo commodi itaque reprehenderit.
                      </FieldDescription>
                    </Field>
                  )}
                />
                <Controller
                  name="profession"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel className="flex flex-col items-center w-full text-xl">
                        Profession
                      </FieldLabel>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between">
                        {professionOptions.map((profession, index) => {
                          const isSelected =
                            selectedProfession === profession.value;
                          return (
                            <motion.button
                              key={profession.value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              type="button"
                              onClick={() => field.onChange(profession.value)}
                              className={`relative cursor-pointer group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 h-40 ${
                                isSelected
                                  ? "border-green-500 bg-green-50 shadow-md"
                                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                              }`}
                            >
                              <div className="mb-4 bg-slate-50 rounded-full p-3 group-hover:bg-green-100 transition-colors duration-300">
                                <img
                                  src={profession.emoji}
                                  alt={profession.label}
                                  className={`w-12 h-12 object-contain transition-all duration-300 ${!isSelected && "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"}`}
                                />
                              </div>
                              <h3
                                className={`text-sm font-bold transition-colors duration-300 ${isSelected ? "text-green-700" : "text-slate-600"}`}
                              >
                                {profession.label}
                              </h3>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                                {profession.description}
                              </p>

                              <AnimatePresence>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 45 }}
                                    className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1.5 shadow-lg border-2 border-white"
                                  >
                                    <Check className="w-3 h-3 stroke-3" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          );
                        })}
                      </div>
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                      <FieldDescription>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ad distinctio adipisci porro expedita voluptatem
                        consectetur voluptate nemo commodi itaque reprehenderit.
                      </FieldDescription>
                    </Field>
                  )}
                />
              </div>
            )}
            {step === 4 && (
              <Field>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                      {fieldState.error && (
                        <FieldError>{fieldState.error.message}</FieldError>
                      )}
                      <FieldDescription>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ad distinctio adipisci porro expedita voluptatem
                        consectetur voluptate nemo commodi itaque reprehenderit.
                      </FieldDescription>
                    </Field>
                  )}
                />
              </Field>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button className="cursor-pointer" onClick={goBack}>
            Back
          </Button>
          <Button className="cursor-pointer" onClick={goNext}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
