"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  MapPin,
  Bed,
  Utensils,
  HelpCircle,
  CheckCircle,
  Clock,
  CalendarDays,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  // Personal Details
  prefix: string
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  gender: string
  email: string
  alternateEmail: string
  mobile: string
  alternateMobile: string
  whatsappMobile: string
  designation: string
  cpcLevel: string
  idProofType: string
  idProofNumber: string

  // Program Schedule
  attendInaugural: string
  day2Session1: string
  day2Session2: string
  day3Session1: string
  day3Session2: string

  // Travel Details
  checkinCity: string
  checkinDate: string
  checkinTime: string
  checkoutCity: string
  checkoutDate: string
  checkoutTime: string
  requireTransport: string

  // Accommodation
  requireAccommodation: string
  accommodationAddress: string

  // Special Assistance
  specialAssistance: string
  assistanceDetails: string
  mealPreference: string
}

const steps = [
  { id: 1, title: "Personal Details", icon: User, description: "Basic information as per ID" },
  { id: 2, title: "Program Schedule", icon: Calendar, description: "Session preferences" },
  { id: 3, title: "Travel Details", icon: MapPin, description: "Check-in/out information" },
  { id: 4, title: "Accommodation", icon: Bed, description: "Stay arrangements" },
  { id: 5, title: "Preferences", icon: Utensils, description: "Meals & assistance" },
]

const RoundClock = ({
  value,
  onChange,
  minTime,
  maxTime,
  disabled = false,
  className = "",
}: {
  value: string
  onChange: (time: string) => void
  minTime?: string
  maxTime?: string
  disabled?: boolean
  className?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedHour, setSelectedHour] = useState(12)
  const [selectedMinute, setSelectedMinute] = useState(0)
  const [period, setPeriod] = useState<"AM" | "PM">("PM")

  useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(":").map(Number)
      const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
      setSelectedHour(hour12)
      setSelectedMinute(minutes)
      setPeriod(hours >= 12 ? "PM" : "AM")
    }
  }, [value])

  const formatTime = (hour: number, minute: number, period: "AM" | "PM") => {
    const hour24 = period === "AM" ? (hour === 12 ? 0 : hour) : hour === 12 ? 12 : hour + 12
    return `${hour24.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  }

  const isTimeValid = (hour: number, minute: number, period: "AM" | "PM") => {
    const timeString = formatTime(hour, minute, period)
    if (minTime && timeString < minTime) return false
    if (maxTime && timeString > maxTime) return false
    return true
  }

  const handleTimeSelect = () => {
    if (isTimeValid(selectedHour, selectedMinute, period)) {
      const timeString = formatTime(selectedHour, selectedMinute, period)
      onChange(timeString)
      setIsOpen(false)
    }
  }

  const displayTime = value
    ? new Date(`2000-01-01T${value}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "Select time"

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full h-12 px-4 border-2 rounded-lg bg-white/50 flex items-center justify-between transition-all duration-200",
          disabled
            ? "border-slate-200 text-slate-400 cursor-not-allowed"
            : "border-slate-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
          isOpen && "border-blue-500 ring-2 ring-blue-200",
        )}
      >
        <span className="font-medium">{displayTime}</span>
        <Clock className="w-4 h-4 text-blue-600" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 p-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-center space-x-8">
            {/* Hour Selection */}
            <div className="flex flex-col items-center">
              <label className="text-xs font-semibold text-slate-600 mb-2">Hour</label>
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100"></div>
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full rounded-full text-center font-bold text-lg text-blue-700 bg-transparent border-0 outline-none cursor-pointer appearance-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-2xl font-bold text-slate-400">:</div>

            {/* Minute Selection */}
            <div className="flex flex-col items-center">
              <label className="text-xs font-semibold text-slate-600 mb-2">Minute</label>
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-green-100 bg-gradient-to-br from-green-50 to-green-100"></div>
                <select
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full rounded-full text-center font-bold text-lg text-green-700 bg-transparent border-0 outline-none cursor-pointer appearance-none"
                >
                  {Array.from({ length: 60 }, (_, i) => i)
                    .filter((m) => m % 15 === 0)
                    .map((minute) => (
                      <option key={minute} value={minute}>
                        {minute.toString().padStart(2, "0")}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* AM/PM Selection */}
            <div className="flex flex-col items-center">
              <label className="text-xs font-semibold text-slate-600 mb-2">Period</label>
              <div className="flex flex-col space-y-1">
                <button
                  type="button"
                  onClick={() => setPeriod("AM")}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                    period === "AM"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200",
                  )}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setPeriod("PM")}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                    period === "PM"
                      ? "bg-purple-500 text-white shadow-lg"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200",
                  )}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Time Validation Message */}
          {!isTimeValid(selectedHour, selectedMinute, period) && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium text-center">
                {minTime &&
                  formatTime(selectedHour, selectedMinute, period) < minTime &&
                  `Time must be after ${new Date(`2000-01-01T${minTime}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`}
                {maxTime &&
                  formatTime(selectedHour, selectedMinute, period) > maxTime &&
                  `Time must be before ${new Date(`2000-01-01T${maxTime}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleTimeSelect}
              disabled={!isTimeValid(selectedHour, selectedMinute, period)}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                isTimeValid(selectedHour, selectedMinute, period)
                  ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed",
              )}
            >
              Select Time
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function EsticRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    prefix: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    alternateEmail: "",
    mobile: "",
    alternateMobile: "",
    whatsappMobile: "",
    designation: "",
    cpcLevel: "",
    idProofType: "",
    idProofNumber: "",
    attendInaugural: "",
    day2Session1: "",
    day2Session2: "",
    day3Session1: "",
    day3Session2: "",
    checkinCity: "",
    checkinDate: "",
    checkinTime: "",
    checkoutCity: "",
    checkoutDate: "",
    checkoutTime: "",
    requireTransport: "",
    requireAccommodation: "",
    accommodationAddress: "",
    specialAssistance: "",
    assistanceDetails: "",
    mealPreference: "",
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.prefix) newErrors.prefix = "Prefix is required"
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
      if (!formData.gender) newErrors.gender = "Gender is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
      if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
      if (!formData.whatsappMobile.trim()) newErrors.whatsappMobile = "WhatsApp number is required"
      if (!formData.designation.trim()) newErrors.designation = "Designation is required"
      if (!formData.cpcLevel.trim()) newErrors.cpcLevel = "7th CPC Level is required"
      if (!formData.idProofType) newErrors.idProofType = "ID proof type is required"
      if (!formData.idProofNumber.trim()) newErrors.idProofNumber = "ID proof number is required"
    } else if (currentStep === 2) {
      if (!formData.attendInaugural) newErrors.attendInaugural = "Please select your attendance preference"
      if (!formData.day2Session1) newErrors.day2Session1 = "Please select a session"
      if (!formData.day2Session2) newErrors.day2Session2 = "Please select a session"
      if (!formData.day3Session1) newErrors.day3Session1 = "Please select a session"
      if (!formData.day3Session2) newErrors.day3Session2 = "Please select a session"
    } else if (currentStep === 3) {
      if (!formData.checkinCity.trim()) newErrors.checkinCity = "Check-in city is required"
      if (!formData.checkinDate) newErrors.checkinDate = "Check-in date is required"
      if (!formData.checkinTime) newErrors.checkinTime = "Check-in time is required"
      if (!formData.checkoutCity.trim()) newErrors.checkoutCity = "Check-out city is required"
      if (!formData.checkoutDate) newErrors.checkoutDate = "Check-out date is required"
      if (!formData.checkoutTime) newErrors.checkoutTime = "Check-out time is required"
      if (!formData.requireTransport) newErrors.requireTransport = "Please select transport preference"
    } else if (currentStep === 4) {
      if (!formData.requireAccommodation) newErrors.requireAccommodation = "Please select accommodation preference"
      if (formData.requireAccommodation === "no" && !formData.accommodationAddress.trim()) {
        newErrors.accommodationAddress = "Accommodation address is required"
      }
    } else if (currentStep === 5) {
      if (!formData.specialAssistance) newErrors.specialAssistance = "Please select special assistance preference"
      if (formData.specialAssistance === "yes" && !formData.assistanceDetails.trim()) {
        newErrors.assistanceDetails = "Please specify the assistance required"
      }
      if (!formData.mealPreference) newErrors.mealPreference = "Meal preference is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      console.log("[v0] Form submitted successfully:", formData)
      alert("Registration submitted successfully! Thank you for registering for ESTIC 2025.")
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-3 text-balance">
            ESTIC 2025
          </h1>
          <p className="text-xl text-slate-700 font-medium text-balance">Participants Information Registration</p>
          <p className="text-sm text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
            Please fill in the following details accurately IN CAPITALS as per your valid government-issued Photo ID
            proof.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id
              const isHovered = hoveredStep === step.id

              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center space-y-3 flex-1 cursor-pointer transition-all duration-300",
                    index < steps.length - 1 && "relative",
                    isHovered && "scale-105",
                  )}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => {
                    if (step.id < currentStep) {
                      setCurrentStep(step.id)
                    }
                  }}
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center border-3 transition-all duration-300 shadow-lg",
                      isCompleted
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 text-white shadow-green-200"
                        : isCurrent
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white shadow-blue-200 animate-pulse"
                          : "bg-white border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600",
                      isHovered && !isCompleted && !isCurrent && "border-blue-400 text-blue-600 shadow-blue-100",
                    )}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                  </div>
                  <div className="text-center">
                    <p
                      className={cn(
                        "text-sm font-semibold transition-colors duration-300",
                        isCurrent ? "text-blue-700" : isCompleted ? "text-green-700" : "text-slate-600",
                        isHovered && "text-blue-600",
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-500 hidden sm:block mt-1">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute top-7 left-1/2 w-full h-1 -translate-y-1/2 transition-all duration-500 rounded-full",
                        isCompleted ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-slate-200",
                      )}
                      style={{ left: "50%", width: "calc(100% - 3.5rem)" }}
                    />
                  )}
                </div>
              )
            })}
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 bg-slate-200" />
            <div
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md ring-1 ring-slate-200/50">
          <CardHeader className="text-center bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
            <CardTitle className="text-3xl text-slate-800 font-bold">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-slate-600 text-lg">{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="prefix" className="text-sm font-semibold text-slate-700">
                      Prefix *
                    </Label>
                    <Select value={formData.prefix} onValueChange={(value) => updateFormData("prefix", value)}>
                      <SelectTrigger
                        className={cn(
                          "h-12 border-2 transition-all duration-200 bg-white/50",
                          errors.prefix
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                          focusedField === "prefix" && "ring-2 ring-blue-200",
                        )}
                        onFocus={() => setFocusedField("prefix")}
                        onBlur={() => setFocusedField(null)}
                      >
                        <SelectValue placeholder="Select prefix" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mr">Mr.</SelectItem>
                        <SelectItem value="ms">Ms.</SelectItem>
                        <SelectItem value="dr">Dr.</SelectItem>
                        <SelectItem value="prof">Prof.</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.prefix && <p className="text-sm text-red-600 font-medium">{errors.prefix}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value.toUpperCase())}
                      placeholder="FIRST NAME"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 uppercase font-medium bg-white/50",
                        errors.firstName
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "firstName" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("firstName")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="middleName" className="text-sm font-semibold text-slate-700">
                      Middle Name
                    </Label>
                    <Input
                      id="middleName"
                      value={formData.middleName}
                      onChange={(e) => updateFormData("middleName", e.target.value.toUpperCase())}
                      placeholder="MIDDLE NAME"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 uppercase font-medium bg-white/50 border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "middleName" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("middleName")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value.toUpperCase())}
                      placeholder="LAST NAME"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 uppercase font-medium bg-white/50",
                        errors.lastName
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "lastName" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("lastName")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <CalendarDays className="w-4 h-4 text-blue-600" />
                      Date of Birth (DD/MM/YYYY) *
                    </Label>
                    <div className="relative">
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        className={cn(
                          "h-12 border-2 transition-all duration-200 font-medium bg-white/50 pl-4",
                          errors.dateOfBirth
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                          focusedField === "dateOfBirth" && "ring-2 ring-blue-200 scale-[1.02]",
                        )}
                        onFocus={() => setFocusedField("dateOfBirth")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Gender *</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => updateFormData("gender", value)}
                      className="flex flex-row space-x-8 pt-2"
                    >
                      {[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-3 group">
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="w-5 h-5 border-2 border-slate-400 text-blue-600 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-500 transition-colors"
                          />
                          <Label
                            htmlFor={option.value}
                            className="font-medium text-slate-700 group-hover:text-blue-700 cursor-pointer transition-colors"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.gender && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                {/* ... existing code for remaining fields with similar enhancements ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Email ID *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="email@example.com"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 font-medium bg-white/50",
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "email" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="alternateEmail" className="text-sm font-semibold text-slate-700">
                      Alternate Email ID
                    </Label>
                    <Input
                      id="alternateEmail"
                      type="email"
                      value={formData.alternateEmail}
                      onChange={(e) => updateFormData("alternateEmail", e.target.value)}
                      placeholder="alternate@example.com"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 font-medium bg-white/50 border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "alternateEmail" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("alternateEmail")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="mobile" className="text-sm font-semibold text-slate-700">
                      Mobile Number (with country code) *
                    </Label>
                    <Input
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => updateFormData("mobile", e.target.value)}
                      placeholder="+91 9876543210"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 font-medium bg-white/50",
                        errors.mobile
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "mobile" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("mobile")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.mobile && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="alternateMobile" className="text-sm font-semibold text-slate-700">
                      Alternate Mobile Number
                    </Label>
                    <Input
                      id="alternateMobile"
                      value={formData.alternateMobile}
                      onChange={(e) => updateFormData("alternateMobile", e.target.value)}
                      placeholder="+91 9876543210"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 font-medium bg-white/50 border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "alternateMobile" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("alternateMobile")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="whatsappMobile" className="text-sm font-semibold text-slate-700">
                      WhatsApp Enabled Mobile Number *
                    </Label>
                    <Input
                      id="whatsappMobile"
                      value={formData.whatsappMobile}
                      onChange={(e) => updateFormData("whatsappMobile", e.target.value)}
                      placeholder="+91 9876543210"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 font-medium bg-white/50",
                        errors.whatsappMobile
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "whatsappMobile" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("whatsappMobile")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.whatsappMobile && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.whatsappMobile}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="designation" className="text-sm font-semibold text-slate-700">
                      Designation *
                    </Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => updateFormData("designation", e.target.value.toUpperCase())}
                      placeholder="DESIGNATION"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 uppercase font-medium bg-white/50",
                        errors.designation
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "designation" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("designation")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.designation && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.designation}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="cpcLevel" className="text-sm font-semibold text-slate-700">
                      7th CPC (LEVEL/BAND) *
                    </Label>
                    <Input
                      id="cpcLevel"
                      value={formData.cpcLevel}
                      onChange={(e) => updateFormData("cpcLevel", e.target.value)}
                      placeholder="Level/Band"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 font-medium bg-white/50",
                        errors.cpcLevel
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "cpcLevel" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("cpcLevel")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.cpcLevel && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.cpcLevel}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="idProofType" className="text-sm font-semibold text-slate-700">
                      ID Proof Type *
                    </Label>
                    <Select
                      value={formData.idProofType}
                      onValueChange={(value) => updateFormData("idProofType", value)}
                    >
                      <SelectTrigger
                        className={cn(
                          "h-12 border-2 transition-all duration-200 bg-white/50",
                          errors.idProofType
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                          focusedField === "idProofType" && "ring-2 ring-blue-200",
                        )}
                        onFocus={() => setFocusedField("idProofType")}
                        onBlur={() => setFocusedField(null)}
                      >
                        <SelectValue placeholder="Select ID proof type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                        <SelectItem value="voter">Voter ID</SelectItem>
                        <SelectItem value="pan">PAN Card</SelectItem>
                        <SelectItem value="driving">Driving License</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.idProofType && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.idProofType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="idProofNumber" className="text-sm font-semibold text-slate-700">
                      ID Proof Number *
                    </Label>
                    <Input
                      id="idProofNumber"
                      value={formData.idProofNumber}
                      onChange={(e) => updateFormData("idProofNumber", e.target.value.toUpperCase())}
                      placeholder="ID PROOF NUMBER"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 uppercase font-medium bg-white/50",
                        errors.idProofNumber
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "idProofNumber" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("idProofNumber")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.idProofNumber && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.idProofNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Program Schedule */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-slate-700">
                      Are you willing to attend Inaugural Programme by Hon'ble Prime Minister? *
                    </Label>
                    <RadioGroup
                      value={formData.attendInaugural}
                      onValueChange={(value) => updateFormData("attendInaugural", value)}
                      className="flex flex-row space-x-8 pt-2"
                    >
                      {[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-3 group">
                          <RadioGroupItem
                            value={option.value}
                            id={`inaugural-${option.value}`}
                            className="w-5 h-5 border-2 border-slate-400 text-blue-600 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-500 transition-colors"
                          />
                          <Label
                            htmlFor={`inaugural-${option.value}`}
                            className="font-medium text-slate-700 group-hover:text-blue-700 cursor-pointer transition-colors"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.attendInaugural && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.attendInaugural}
                      </p>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      DAY 02 - 04 NOV 2025 (Tuesday)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700">
                          Parallel Technical Sessions (11:00-13:00) *
                        </Label>
                        <Select
                          value={formData.day2Session1}
                          onValueChange={(value) => updateFormData("day2Session1", value)}
                        >
                          <SelectTrigger
                            className={cn(
                              "h-12 border-2 transition-all duration-200 bg-white/70",
                              errors.day2Session1
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                            )}
                          >
                            <SelectValue placeholder="Select session" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quantum">Quantum Science & Technology</SelectItem>
                            <SelectItem value="bio-manufacturing">Bio-Manufacturing</SelectItem>
                            <SelectItem value="energy">Energy, Environment & Climate</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.day2Session1 && (
                          <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                            {errors.day2Session1}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700">
                          Parallel Technical Sessions (16:00-18:00) *
                        </Label>
                        <Select
                          value={formData.day2Session2}
                          onValueChange={(value) => updateFormData("day2Session2", value)}
                        >
                          <SelectTrigger
                            className={cn(
                              "h-12 border-2 transition-all duration-200 bg-white/70",
                              errors.day2Session2
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                            )}
                          >
                            <SelectValue placeholder="Select session" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ai">Artificial Intelligence</SelectItem>
                            <SelectItem value="blue-economy">Blue Economy</SelectItem>
                            <SelectItem value="health">Health & Medical Technologies</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.day2Session2 && (
                          <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                            {errors.day2Session2}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      DAY 03 - 05 NOV 2025 (Wednesday)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700">
                          Parallel Technical Sessions (11:00-13:00) *
                        </Label>
                        <Select
                          value={formData.day3Session1}
                          onValueChange={(value) => updateFormData("day3Session1", value)}
                        >
                          <SelectTrigger
                            className={cn(
                              "h-12 border-2 transition-all duration-200 bg-white/70",
                              errors.day3Session1
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                            )}
                          >
                            <SelectValue placeholder="Select session" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="materials">Advanced Materials & Manufacturing</SelectItem>
                            <SelectItem value="communications">Digital Communications</SelectItem>
                            <SelectItem value="space">Space Technologies</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.day3Session1 && (
                          <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                            {errors.day3Session1}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700">
                          Parallel Technical Sessions (15:30-17:30) *
                        </Label>
                        <Select
                          value={formData.day3Session2}
                          onValueChange={(value) => updateFormData("day3Session2", value)}
                        >
                          <SelectTrigger
                            className={cn(
                              "h-12 border-2 transition-all duration-200 bg-white/70",
                              errors.day3Session2
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                            )}
                          >
                            <SelectValue placeholder="Select session" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="agriculture">Emerging Agriculture Technologies</SelectItem>
                            <SelectItem value="electronics">Electronics & Semiconductor Manufacturing</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.day3Session2 && (
                          <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                            {errors.day3Session2}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                    <div className="flex items-start space-x-4">
                      <HelpCircle className="w-6 h-6 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-slate-800">Session Selection Guidelines</h4>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                          Please select your preferred technical sessions for each time slot. These sessions will cover
                          cutting-edge research and developments in various fields of science and technology.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ... existing code for other steps ... */}

            {/* Step 3: Travel Details */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="checkinCity" className="text-sm font-semibold text-slate-700">
                      Check-in City *
                    </Label>
                    <Input
                      id="checkinCity"
                      value={formData.checkinCity}
                      onChange={(e) => updateFormData("checkinCity", e.target.value)}
                      placeholder="City name"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 font-medium bg-white/50",
                        errors.checkinCity
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "checkinCity" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("checkinCity")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.checkinCity && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.checkinCity}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="checkinDate"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Preferred Check-in Date *
                    </Label>
                    <Select
                      value={formData.checkinDate}
                      onValueChange={(value) => updateFormData("checkinDate", value)}
                    >
                      <SelectTrigger
                        className={cn(
                          "h-12 border-2 transition-all duration-200 bg-white/50",
                          errors.checkinDate
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                          focusedField === "checkinDate" && "ring-2 ring-blue-200",
                        )}
                        onFocus={() => setFocusedField("checkinDate")}
                        onBlur={() => setFocusedField(null)}
                      >
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="02-nov">02 Nov 2025</SelectItem>
                        <SelectItem value="03-nov">03 Nov 2025</SelectItem>
                        <SelectItem value="04-nov">04 Nov 2025</SelectItem>
                        <SelectItem value="05-nov">05 Nov 2025</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.checkinDate && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.checkinDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="checkinTime"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-blue-600" />
                      Check-in Time *
                      <span className="text-xs text-slate-500 font-normal block">
                        (For 02 Nov 2025, Check-in only After 12 Noon)
                      </span>
                    </Label>
                    <RoundClock
                      value={formData.checkinTime}
                      onChange={(time) => updateFormData("checkinTime", time)}
                      minTime={formData.checkinDate === "02-nov" ? "12:00" : undefined}
                      className={cn(errors.checkinTime && "border-red-400")}
                    />
                    {errors.checkinTime && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.checkinTime}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="checkoutCity" className="text-sm font-semibold text-slate-700">
                      Check-out City *
                    </Label>
                    <Input
                      id="checkoutCity"
                      value={formData.checkoutCity}
                      onChange={(e) => updateFormData("checkoutCity", e.target.value)}
                      placeholder="City name"
                      className={cn(
                        "h-12 border-2 transition-all duration-200 font-medium bg-white/50",
                        errors.checkoutCity
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "checkoutCity" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("checkoutCity")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.checkoutCity && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.checkoutCity}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="checkoutDate"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Check-out Date *
                    </Label>
                    <Select
                      value={formData.checkoutDate}
                      onValueChange={(value) => updateFormData("checkoutDate", value)}
                    >
                      <SelectTrigger
                        className={cn(
                          "h-12 border-2 transition-all duration-200 bg-white/50",
                          errors.checkoutDate
                            ? "border-red-400 focus:border-red-500"
                            : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                          focusedField === "checkoutDate" && "ring-2 ring-blue-200",
                        )}
                        onFocus={() => setFocusedField("checkoutDate")}
                        onBlur={() => setFocusedField(null)}
                      >
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="03-nov">03 Nov 2025</SelectItem>
                        <SelectItem value="04-nov">04 Nov 2025</SelectItem>
                        <SelectItem value="05-nov">05 Nov 2025</SelectItem>
                        <SelectItem value="06-nov">06 Nov 2025</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.checkoutDate && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.checkoutDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="checkoutTime"
                      className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-blue-600" />
                      Check-out Time *
                      <span className="text-xs text-slate-500 font-normal block">
                        (For 06 Nov 2025, Check-Out Before 11AM)
                      </span>
                    </Label>
                    <RoundClock
                      value={formData.checkoutTime}
                      onChange={(time) => updateFormData("checkoutTime", time)}
                      maxTime={formData.checkoutDate === "06-nov" ? "11:00" : undefined}
                      className={cn(errors.checkoutTime && "border-red-400")}
                    />
                    {errors.checkoutTime && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.checkoutTime}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Do you require Local Transport? *</Label>
                  <RadioGroup
                    value={formData.requireTransport}
                    onValueChange={(value) => updateFormData("requireTransport", value)}
                    className="flex flex-row space-x-8 pt-2"
                  >
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 group">
                        <RadioGroupItem
                          value={option.value}
                          id={`transport-${option.value}`}
                          className="w-5 h-5 border-2 border-slate-400 text-blue-600 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-500 transition-colors"
                        />
                        <Label
                          htmlFor={`transport-${option.value}`}
                          className="font-medium text-slate-700 group-hover:text-blue-700 cursor-pointer transition-colors"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.requireTransport && (
                    <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                      {errors.requireTransport}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Accommodation */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Do you require Accommodation? *</Label>
                  <RadioGroup
                    value={formData.requireAccommodation}
                    onValueChange={(value) => updateFormData("requireAccommodation", value)}
                    className="flex flex-row space-x-8 pt-2"
                  >
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 group">
                        <RadioGroupItem
                          value={option.value}
                          id={`accommodation-${option.value}`}
                          className="w-5 h-5 border-2 border-slate-400 text-blue-600 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-500 transition-colors"
                        />
                        <Label
                          htmlFor={`accommodation-${option.value}`}
                          className="font-medium text-slate-700 group-hover:text-blue-700 cursor-pointer transition-colors"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.requireAccommodation && (
                    <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                      {errors.requireAccommodation}
                    </p>
                  )}
                </div>

                {formData.requireAccommodation === "no" && (
                  <div className="space-y-3">
                    <Label htmlFor="accommodationAddress" className="text-sm font-semibold text-slate-700">
                      Please provide your accommodation Address *
                    </Label>
                    <Textarea
                      id="accommodationAddress"
                      value={formData.accommodationAddress}
                      onChange={(e) => updateFormData("accommodationAddress", e.target.value)}
                      placeholder="Enter your accommodation address"
                      rows={3}
                      className={cn(
                        "h-24 border-2 transition-all duration-200 font-medium bg-white/50 resize-none",
                        errors.accommodationAddress
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "accommodationAddress" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("accommodationAddress")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.accommodationAddress && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.accommodationAddress}
                      </p>
                    )}
                  </div>
                )}

                <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                  <div className="flex items-start space-x-4">
                    <HelpCircle className="w-6 h-6 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-800">Accommodation Information</h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        If you select "Yes", accommodation will be arranged by the organizers. If you select "No",
                        please provide your own accommodation details above.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Preferences */}
            {currentStep === 5 && (
              <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Special Assistance Required *</Label>
                  <RadioGroup
                    value={formData.specialAssistance}
                    onValueChange={(value) => updateFormData("specialAssistance", value)}
                    className="flex flex-row space-x-8 pt-2"
                  >
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 group">
                        <RadioGroupItem
                          value={option.value}
                          id={`assistance-${option.value}`}
                          className="w-5 h-5 border-2 border-slate-400 text-blue-600 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-500 transition-colors"
                        />
                        <Label
                          htmlFor={`assistance-${option.value}`}
                          className="font-medium text-slate-700 group-hover:text-blue-700 cursor-pointer transition-colors"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.specialAssistance && (
                    <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                      {errors.specialAssistance}
                    </p>
                  )}
                </div>

                {formData.specialAssistance === "yes" && (
                  <div className="space-y-3">
                    <Label htmlFor="assistanceDetails" className="text-sm font-semibold text-slate-700">
                      What kind of Special Assistance Required? (Please specify) *
                    </Label>
                    <Textarea
                      id="assistanceDetails"
                      value={formData.assistanceDetails}
                      onChange={(e) => updateFormData("assistanceDetails", e.target.value)}
                      placeholder="Please describe the special assistance you require"
                      rows={3}
                      className={cn(
                        "h-24 border-2 transition-all duration-200 font-medium bg-white/50 resize-none",
                        errors.assistanceDetails
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500 hover:border-blue-400",
                        focusedField === "assistanceDetails" && "ring-2 ring-blue-200 scale-[1.02]",
                      )}
                      onFocus={() => setFocusedField("assistanceDetails")}
                      onBlur={() => setFocusedField(null)}
                    />
                    {errors.assistanceDetails && (
                      <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                        {errors.assistanceDetails}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Meal Preference *</Label>
                  <RadioGroup
                    value={formData.mealPreference}
                    onValueChange={(value) => updateFormData("mealPreference", value)}
                    className="space-y-3"
                  >
                    {[
                      { value: "veg", label: "Vegetarian" },
                      { value: "non-veg", label: "Non-Vegetarian" },
                      { value: "vegan", label: "Vegan" },
                      { value: "jain", label: "Jain Meal" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-3 group">
                        <RadioGroupItem
                          value={option.value}
                          id={`meal-${option.value}`}
                          className="w-5 h-5 border-2 border-slate-400 text-blue-600 focus:ring-2 focus:ring-blue-200 group-hover:border-blue-500 transition-colors"
                        />
                        <Label
                          htmlFor={`meal-${option.value}`}
                          className="font-medium text-slate-700 group-hover:text-blue-700 cursor-pointer transition-colors"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.mealPreference && (
                    <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-2 duration-200">
                      {errors.mealPreference}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-4">
                    <Calendar className="w-6 h-6 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-800">Registration Summary</h4>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Please review all your information before submitting. You can go back to previous steps to make
                        changes if needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={cn(
                  "flex items-center space-x-3 h-12 px-6 border-2 transition-all duration-200 bg-white/50",
                  currentStep === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-slate-100 hover:border-slate-400 hover:scale-105 active:scale-95",
                )}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Previous</span>
              </Button>

              {currentStep < steps.length ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-3 h-12 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <span className="font-medium">Next Step</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center space-x-3 h-12 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <span className="font-medium">Submit Registration</span>
                  <CheckCircle className="w-5 h-5" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-600 bg-white/30 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
          <p className="font-semibold">ESTIC 2025 - Excellence in Science, Technology & Innovation Conference</p>
          <p className="mt-2">For technical support, please contact the organizing committee.</p>
        </div>
      </div>
    </div>
  )
}
