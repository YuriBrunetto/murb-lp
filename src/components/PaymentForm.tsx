"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const paymentSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  cardNumber: z
    .string()
    .regex(/^\d{16,}$/, "Número do Cartão deve conter no mínimo 16 dígitos"),
  expiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Data de validade deve ser MM/AA"),
  cvc: z
    .string()
    .regex(/^\d{3,4}$/, "Código de segurança deve conter 3 ou 4 dígitos"),
  email: z.string().email("E-mail inválido").optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export function PaymentForm() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: "",
      cardNumber: "",
      expiration: "",
      cvc: "",
      email: "",
    },
  });

  function onSubmit(data: PaymentFormValues) {
    console.log("Dados enviados:", data);
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Titular do Cartão</FormLabel>
                <FormControl>
                  <Input placeholder="João Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Cartão</FormLabel>
                <FormControl>
                  <Input placeholder="0000 0000 0000 0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Validade (MM/AA)</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/AA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Segurança</FormLabel>
                  <FormControl>
                    <Input placeholder="CVC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="nome@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer font-bold">
            Pagar R$29,99
          </Button>

          <p className="text-center text-xs text-zinc-500">
            Ao clicar em "Pagar", você concorda com os{" "}
            <a
              href="javascript:;"
              title="Termos de Serviço"
              className="text-zinc-800"
            >
              Termos de Serviço
            </a>{" "}
            e com a{" "}
            <a
              href="javascript:;"
              title="Termos de Serviço"
              className="text-zinc-800"
            >
              Política de Privacidade
            </a>{" "}
            da Murb.
          </p>
        </form>
      </Form>
    </div>
  );
}
