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
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import z from "zod";

function RegisterPage() {
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);
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
      setActiveField(["name"]);
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
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Field>
                        <FieldLabel className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                          <User className="w-4 h-4 text-green-600" />
                          Full Name
                        </FieldLabel>
                        <div className="relative group">
                          <Input
                            placeholder="Type your full name here..."
                            className="pl-4 h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all duration-300 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 pr-10"
                            {...field}
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-focus-within:text-green-400 transition-colors duration-300">
                            {!fieldState.error && field.value && (
                              <Check className="w-5 h-5" />
                            )}
                          </div>
                        </div>
                        <AnimatePresence mode="wait">
                          {fieldState.error && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <FieldError className="mt-2 ml-1 text-xs font-medium flex items-center gap-1">
                                {fieldState.error.message}
                              </FieldError>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Field>
                    </motion.div>
                  )}
                />
              </FieldGroup>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-green-600" />
                          Password
                        </FieldLabel>
                        <div className="relative group">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password..."
                            className="pl-4 h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all duration-300 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 pr-12"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-600 transition-colors duration-200 cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <AnimatePresence mode="wait">
                          {fieldState.error && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <FieldError className="mt-2 ml-1 text-xs font-medium">
                                {fieldState.error.message}
                              </FieldError>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Field>
                    );
                  }}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                initial="hidden"
                animate="visible"
                className="space-y-10"
              >
                {/* Gender Section */}
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-6 w-1 bg-green-500 rounded-full" />
                        <FieldLabel className="text-xl font-bold text-slate-800">
                          Gender
                        </FieldLabel>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {genderOptions.map((gender) => {
                          const isSelected = selectedGender === gender.value;
                          return (
                            <motion.button
                              key={gender.value}
                              variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: { y: 0, opacity: 1 },
                              }}
                              whileHover={{ scale: 1.02, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                              type="button"
                              onClick={() => field.onChange(gender.value)}
                              className={`relative cursor-pointer group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 h-40 ${
                                isSelected
                                  ? "border-green-500 bg-green-50 shadow-lg shadow-green-100"
                                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
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
                        <FieldError className="mt-2">
                          {fieldState.error.message}
                        </FieldError>
                      )}
                      <FieldDescription className="mt-4 text-slate-400 text-[10px] italic">
                        Please select the gender you most identify with for
                        personalized content.
                      </FieldDescription>
                    </Field>
                  )}
                />

                {/* Profession Section */}
                <Controller
                  name="profession"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-6 w-1 bg-green-500 rounded-full" />
                        <FieldLabel className="text-xl font-bold text-slate-800">
                          Profession
                        </FieldLabel>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {professionOptions.map((profession) => {
                          const isSelected =
                            selectedProfession === profession.value;
                          return (
                            <motion.button
                              key={profession.value}
                              variants={{
                                hidden: { y: 20, opacity: 0 },
                                visible: { y: 0, opacity: 1 },
                              }}
                              whileHover={{ scale: 1.02, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                              type="button"
                              onClick={() => field.onChange(profession.value)}
                              className={`relative cursor-pointer group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 h-40 ${
                                isSelected
                                  ? "border-green-500 bg-green-50 shadow-lg shadow-green-100"
                                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-md"
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
                        <FieldError className="mt-2">
                          {fieldState.error.message}
                        </FieldError>
                      )}
                      <FieldDescription className="mt-4 text-slate-400 text-[10px] italic">
                        Selecting your profession helps us tailor your
                        experience to your specific career path.
                      </FieldDescription>
                    </Field>
                  )}
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel className="text-sm font-bold text-slate-700 mb-2 ml-1 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-green-600" />
                        Email Address
                      </FieldLabel>
                      <div className="relative group">
                        <Input
                          placeholder="john@example.com"
                          className="pl-4 h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all duration-300 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 pr-10"
                          {...field}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-focus-within:text-green-400 transition-colors duration-300">
                          {!fieldState.error && field.value && (
                            <Check className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      <AnimatePresence mode="wait">
                        {fieldState.error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <FieldError className="mt-2 ml-1 text-xs font-medium">
                              {fieldState.error.message}
                            </FieldError>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <FieldDescription className="mt-4 text-slate-400 text-[10px] leading-relaxed">
                        We'll send you a verification link to this email address
                        once you complete the registration.
                      </FieldDescription>
                    </Field>
                  )}
                />
              </motion.div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t border-slate-100 p-6 bg-slate-50/50">
          <Button
            variant="ghost"
            className={`cursor-pointer gap-2 transition-all rounded-full px-8 duration-300 ${step === 1 ? "opacity-0 pointer-events-none" : "hover:bg-white hover:shadow-sm"}`}
            onClick={goBack}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {step < 4 ? (
            <Button
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-8 rounded-full shadow-lg shadow-green-200 transition-all duration-300 group gap-2"
              onClick={goNext}
            >
              Next Step
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-10 rounded-xl shadow-lg shadow-green-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={(e) => {
                // Since this button is inside the form, handleSubmit will run if we don't preventDefault
                // But we want to make sure the last step is valid too
                if (step === 4) {
                  // form.handleSubmit(onSubmit)(e) is handled by type="submit"
                }
              }}
            >
              Complete Registration
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
