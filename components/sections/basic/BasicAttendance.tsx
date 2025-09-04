"use client";

import { useState, useRef, type FormEvent } from "react";
import { useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { basicDemoData } from "./data/basic-demo-data";

export function BasicAttendance() {
  //const [name, setName] = useState("")
  //const [attendance, setAttendance] = useState<string | null>(null)
  //const [companions, setCompanions] = useState("")
  //const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    response: "",
    companions: "",
    phone: "",
  });
  //const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Validación básica
    if (!formData.name.trim() || !formData.response || !formData.phone.trim()) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    // Crear mensaje para WhatsApp
    const phoneNumber = "5213231068420"; // +52 1 323 106 8420
    let message = `¡Hola! Confirmación de asistencia:\n\n`;
    message += `👤 Nombre: ${formData.name}\n`;
    message += `📅 Respuesta: ${
      formData.response === "yes"
        ? "✅ Sí podré asistir"
        : "❌ No podré asistir"
    }\n`;

    if (formData.response === "yes" && formData.companions.trim()) {
      message += `👥 Acompañantes: ${formData.companions}\n`;
    }

    message += `📱 Teléfono: ${formData.phone}\n\n`;
    message += `¡Gracias por confirmar! 💕`;

    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    //setIsSubmitted(true)
    setIsSubmitting(false);
    console.log("Datos de confirmación:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      style={{
      background: `linear-gradient(to bottom, rgba(200, 191, 247, 0.7), rgba(200, 191, 247, 0.7)), url('/images/mariposas1.png')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "scroll",
      backgroundRepeat: "no-repeat",
    }}
      className="py-16 px-4"
    >
      <div
        ref={ref}
        style={{
          backgroundColor: "#C8BFE780",
        }}
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 p-8 rounded-xl ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="section-title">{basicDemoData.attendance.title}</h2>

        <div className="mt-4 mb-8 text-center text-slate-600">
          <p className="text-lg">Favor de Confirmar antes del evento</p>
          <p className="text-lg font-medium my-2">
            &lt;{basicDemoData.event.restrictions}&gt;
          </p>
          <p className="text-lg">{basicDemoData.attendance.subtitle}</p>
        </div>

        <div className="bg-slate-100 rounded-lg shadow-md p-6 md:p-8 mt-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <Label htmlFor="name" className="text-black">
                {basicDemoData.attendance.fields.name}
              </Label>
              <Input
                id="name"
                placeholder="Ingresa tu nombre"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-base mb-2 block">
                {basicDemoData.attendance.fields.response}
              </Label>
              <RadioGroup
                value={formData.response || ""}
                onValueChange={(value) => handleInputChange("response", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label className="text-black" htmlFor="no">
                    {basicDemoData.attendance.fields.responseOptions.no}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label className="text-black" htmlFor="yes">
                    {basicDemoData.attendance.fields.responseOptions.yes}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="companions" className="text-base text-black">
                {basicDemoData.attendance.fields.companions}
              </Label>
              <Textarea
                id="companions"
                placeholder="Nombre y apellido"
                value={formData.companions}
                onChange={(e) =>
                  handleInputChange("companions", e.target.value)
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-base text-black">
                {basicDemoData.attendance.fields.phone}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Para enviarte algún aviso de importancia."
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div className="text-center pt-4">
              <Button
                type="submit"
                className="w-full bg-black hover:bg-primary-light text-white py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR RESPUESTA"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
